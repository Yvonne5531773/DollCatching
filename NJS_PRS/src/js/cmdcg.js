
var CMDCG = CMDCG || {};

CMDCG.do = function() {
	var Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Body = Matter.Body,
		Composite = Matter.Composite,
		Composites = Matter.Composites,
		Common = Matter.Common,
		Constraint = Matter.Constraint,
		MouseConstraint = Matter.MouseConstraint,
		Mouse = Matter.Mouse,
		World = Matter.World,
		Events = Matter.Events,
		Bodies = Matter.Bodies,
		Vertices = Matter.Vertices,
		Svg = Matter.Svg,
		Query = Matter.Query,
		Sleeping = Matter.Sleeping;

	var clearSource = CMDC.clearSource,
		eventOff = CMDC.eventOff,
		timeout = CMDC.timeout,
		playAgain = CMDC.playAgain,
		sourceLinkRoot = CMDC.sourceLinkRoot;

	//爪子构造
	//捉住有两个因素，1.改变节点角度，2.改变摩擦力
	CMDCG.do.createRagdoll = function(x, y, scale, options, vertexSets) {
		var massVal = 1.5,
			frictionAirVal = 0.01,
			timeScaleVal = 0.8,
			scaleVal = 0.6;
		scale = typeof scale === 'undefined' ? 1 : scale;
		var chestOptions = Common.extend({
			label: 'chest',
			collisionFilter: {
				group: Body.nextGroup(true)
			},
			chamfer: {
				radius: [10 * scale, 10 * scale, 16 * scale, 16 * scale]
			},
			render: {
				visible: false,
				sprite: {
					// xScale: scaleVal,
					// yScale: scaleVal,
					texture: sourceLinkRoot + 'img/flash.png'
				}
			},
			frictionAir: 0
		}, options);
		var leftArmOptions = Common.extend({
			label: 'left-arm',
			collisionFilter: {
				group: Body.nextGroup(true)
			},
			chamfer: {
				radius: 10 * scale
			},
			render: {
				fillStyle: '#bdbabb',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/left-upper-arm.png'
				}
			},
			// stiffness: 0.7,
			// mass: massVal,
			// frictionAir: frictionAirVal,
			timeScale: timeScaleVal
		}, options);
		var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
			label: 'left-lower-arm',
			render: {
				fillStyle: '#cfcdd2',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/left-bottom-arm.png'
				}
			},
			chamfer: {
				radius: 6 * scale
			},
			// friction: 0.7,
			// mass: massVal,
			// timeScale: timeScaleVal
		});
		var rightArmOptions = Common.extend({
			label: 'right-arm',
			collisionFilter: {
				group: Body.nextGroup(true)
			},
			chamfer: {
				radius: 10 * scale
			},
			render: {
				fillStyle: '#bdbabb',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/right-upper-arm.png'
				}
			},
			// stiffness: 0.7,
			// mass: massVal,
			// frictionAir: frictionAirVal,
			timeScale: timeScaleVal
		}, options);
		var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
			label: 'right-lower-arm',
			render: {
				fillStyle: '#cfcdd2',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/right-bottom-arm.png'
				}
			},
			chamfer: {
				radius: 6 * scale
			},
			// friction: 0.7,
			// mass: massVal,
			// frictionAir: frictionAirVal,
			// timeScale: timeScaleVal
		});
		var chest = Bodies.rectangle(x, y, 70 * scale, 25 * scale, chestOptions);
		var rightUpperArm = Bodies.rectangle(x + 45 * scale, y - 10 * scale, 17 * scale, 54 * scale, rightArmOptions);
		var rightLowerArm = Bodies.rectangle(x + 45 * scale, y + 20 * scale, 14 * scale, 86 * scale, rightLowerArmOptions);
		var leftUpperArm = Bodies.rectangle(x - 45 * scale, y - 10 * scale, 17 * scale, 54 * scale, leftArmOptions);
		var leftLowerArm = Bodies.rectangle(x - 45 * scale, y + 20 * scale, 14 * scale, 86 * scale, leftLowerArmOptions);
		// var leftLowerArm = Bodies.fromVertices(x - 39 * scale, y + 25 * scale, vertexSets, {
		// 	render: {
		// 		fillStyle: '#556270',
		// 		strokeStyle: '#556270',
		// 		lineWidth: 1
		// 	}
		// }, true)
		var chestToRightUpperArm = Constraint.create({
			label: 'CHEST_TO_RIGHT_UPPER',
			bodyA: chest,
			pointA: {
				x: 24 * scale,
				y: 0  //与手的位置
			},
			pointB: {
				x: -5,
				y: -45 * scale
			},
			bodyB: rightUpperArm,
			// stiffness: 0.8,
			angularStiffness: 0.4, //跟上部分爪子的硬度有关
			length: 0,
			render: {
				anchors: false,
				visible: false //弹簧是否显示
			}
		});
		var chestToLeftUpperArm = Constraint.create({
			label: 'CHEST_TO_LEFT_UPPER',
			bodyA: chest,
			pointA: {
				x: -24 * scale,
				y: 0
			},
			pointB: {
				x: 5,
				y: -45 * scale
			},
			bodyB: leftUpperArm,
			// stiffness: 0.8,
			angularStiffness: 0.4,
			length: 0,
			render: {
				anchors: false,
				visible: false
			}
		});
		var upperToLowerRightArm = Constraint.create({
			label: 'UPPER_TO_LOWER_RIGHT',
			bodyA: rightUpperArm,
			bodyB: rightLowerArm,
			pointA: {
				x: 0,
				y: 20 * scale
			},
			pointB: {
				x: -8,
				y: -38 * scale
			},
			// stiffness: 0.6,
			angularStiffness: 1,  //节点的角硬度
			render: {
				visible: false,
				anchors: false //锚点
			},
			length: 0
		});
		var upperToLowerLeftArm = Constraint.create({
			label: 'UPPER_TO_LOWER_LEFT',
			bodyA: leftUpperArm,
			bodyB: leftLowerArm,
			pointA: {
				x: 0,
				y: 20 * scale
			},
			pointB: {
				x: 8,
				y: -38 * scale
			},
			// stiffness: 0.6,
			angularStiffness: 1,
			render: {
				visible: false,
				anchors: false
			},
			length: 0
		});

		return Composite.create({
			bodies: [
				chest, leftLowerArm, leftUpperArm,
				rightLowerArm, rightUpperArm,
			],
			constraints: [
				upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm,
				chestToRightUpperArm,
			]
		});
	};

	//构造物品
	CMDCG.do.createStacks = function(criteria){
		var massVal = 0.05,
			timeScaleVal = 0.6,
			radiusVal = 15;
		return Composites.stack(criteria.x, criteria.y, criteria.columns, criteria.rows, 0, 0, function(x, y) {
			if (Common.random() < 0.3) {
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*5, 36, 46, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/rred.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1),
				});
			}
			else if(Common.random() > 0.3 && Common.random() < 0.5){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random(), 36, 46, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/pred.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.5 && Common.random() < 0.55){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random(), 30, 40, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/rgift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.55 && Common.random() < 0.6){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*15, 30, 40, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/ggift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			}else if(Common.random() > 0.65 && Common.random() < 0.7){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*15, 30, 40, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/pgift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.7 && Common.random() < 0.75){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*4, 30, 40, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/bgift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.75 && Common.random() < 0.8){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*4, 30, 44, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/obag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.8 && Common.random() < 0.9){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*3, 30, 44, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/pbag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.9 && Common.random() < 0.95){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*44, 30, 44, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + '/img/rbag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else{
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*4, 30, 44, {
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + '/img/gbag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			}
		});
	}

	//设置显示
	CMDCG.do.setVisible = function(){
		spring.render.visible = true
		for(var i = 0; i < ropeC.bodies.length; i++){
			ropeC.bodies[i].render.visible = true
		}
		for(var r = 0; r < ragdoll.bodies.length; r++){
			var body = ragdoll.bodies[r]
			body.label!=='chest' && (body.render.visible = true)
		}
	}

	var ragdollShow = false,
		ragdollMove = false,
		scaleoffest = 0.55;
	var	engine = Engine.create({
		// velocityIterations: 1,
		// constraintIterations: 1,
		// positionIterations: 1
		// enableSleeping: true
		// timeScale: 0.8
	});
	var	world = engine.world;
	// 整个屏幕所占用的大小
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 1180,
			height: document.documentElement.clientHeight,
			background: 'transparent',
			showAngleIndicator: false,
			wireframes: false
		}
	});
	var runner = Runner.create();
	var options = {
		isStatic: true,
		background: 'transparent',
		render: {
			fillStyle: '#f84851'
		}
	};
	var offset = 10, thick = 0.01;

	Render.run(render);
	Runner.run(runner, engine);

	world.bodies = [];
	//设置运行范围 围墙
	$('#cm-d-c').css('min-width', 1180)
	World.add(world, [
		// bottomWall,
		// leftWall,
		// rightWall
		//3-厚度 4-高度
		// Bodies.rectangle(400, 50, 800.5 + 2 * offset, 10.5, options), //上
		Bodies.rectangle(400, 470 + offset, 800.5 + 2 * offset, thick, options), //下
		Bodies.rectangle(800 + offset, 300, thick, 600.5 + 2 * offset, options), //右
		Bodies.rectangle(-offset, 300, thick, 600.5 + 2 * offset, options)  //左
	]);

	var dblChoseAlert, clicked = false,
		clickFun = function() {
			if(clicked){
				return
			}
			ragdollMove = false
			clicked = true
			//禁止鼠标操作
			// World.remove(world, mouseConstraint);
			spring.stiffness = 0.005
			//弹簧伸长
			var si = setInterval(function(){
				if(spring.length >= 200) clearInterval(si)
				spring.length += 30
			}, 80)
			//抓娃娃状态
			setTimeout(function () {
				catched = true
				setTimeout(function () {
					spring.length = 20
					//光芒出现
					setTimeout(function(){
						ragdoll.bodies[0].label === 'chest' && (ragdoll.bodies[0].render.visible = true)
					}, timeout* 0.5)

					setTimeout(function () {
						//防止多次出现提示框出
						// if($('.simpleAlert').length > 0) return;
						// dblChoseAlert = simpleAlert({
						// 	"content": "游戏结束啦！",
						// 	"buttons": {
						// 		"再玩一次": function () {
						// 			setBodiesStatic(engine, false)
						// 			playAgain = true;
						// 			dblChoseAlert.close();
						// 		},
						// 		"退出": function () {
						// 			clearSource()
						// 			eventOff = true
						// 			dblChoseAlert.close()
						// 			World.clear(world)
						// 			$('#cm-d-c').remove()
						// 		}
						// 	}
						// })
						setBodiesStatic(engine, true)
					}, timeout * 3)
				}, timeout * 1.5)
			}, timeout)
		}
	$('.start-btn').click(clickFun)

	//物品池, 最好不超过40个
	var	criteria = {
			x: 5,
			y: 300,
			columns: 24,
			rows: 1,
		}
	var stack = CMDCG.do.createStacks(criteria);
	World.add(world, stack);

	//爪子整体构造连接, 延迟
	setTimeout(function(){
		//控制显示层级
		World.add(world, [ragdoll, ragdollConstraint, ropeC]);
		ragdollShow = true
		setTimeout(function(){
			ragdollMove = true;
		}, timeout* 1.5)
		setTimeout(function(){
			CMDCG.do.setVisible()
		}, timeout)
	}, timeout* 0.3)

	// setTimeout(function(){
	// 	//物品散开
	// 	explosion(engine);
	// 	//爪子出现
	// 	setTimeout(function(){
	// 		World.add(world, [ropeC, ragdoll, ragdollConstraint, upperWall]);
	// 		//开始按钮出现
	// 		$('.start-btn').css('display', 'block');
	// 		ragdollShow = true
	// 		setTimeout(function(){
	// 			ragdollMove = true;
	// 		}, timeout)
	// 	}, timeout* 3)
	// }, timeout* 3)

	//开始按钮位置
	// var bodyStart = Bodies.circle(width*0.4, height*0.1, 25, {
	// 	density: 0.0005,
	// 	frictionAir: 0.01,
	// 	restitution: 0,
	// 	friction: 0,
	// 	render: {
	// 		sprite: {
	// 			texture: sourceLinkRoot + 'img/double11_2.png'
	// 		}
	// 	}
	// })
	// Body.setStatic(bodyStart, true);
	// setTimeout(function(){
	// 	World.add(world, bodyStart);
	// }, timeout* 4)

	// var five;
	// var vertexs = [];
	// $(svg_data).find('path').each(function(i, path) {
	// 	vertexs.push(Vertices.scale(Svg.pathToVertices(path, 30), 0.8, 0.8));
	// });
	// five = Bodies.fromVertices(400, 400, vertexs, {
	// 	isStatic: true,
	// 	render: {
	// 		fillStyle: 'transparent',
	// 		strokeStyle: 'transparent',
	// 		lineWidth: 0
	// 	}
	// }, true);
	// World.add(world, five);
	// setTimeout(function(){
	// 	World.add(world, Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options))
	// 	World.remove(world, five);
	// 	World.add(world, stack);
	// }, timeout*6)

	//物品散开
	var explosion = function(engine, b) {
		if(b){
			var fm = 0.0025* b.mass;
			Body.applyForce(b, b.position, {
				x: (fm + Common.random() * fm) * Common.choose([1, -1]),
				y: -fm + Common.random() * -fm
			});
		}else{
			var bodies = Composite.allBodies(engine.world);
			for (var i = 0; i < bodies.length; i++) {
				var body = bodies[i];
				if (!body.isStatic && body.position.y >= 100) {
					var forceMagnitude = 0.05* body.mass;
					Body.applyForce(body, body.position, {
						x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
						y: -forceMagnitude + Common.random() * -forceMagnitude
					});
				}
			}
		}
	};

	//设置静态
	var setBodiesStatic = function(engine, bool){
		var bodies = Composite.allBodies(engine.world);
		for (var i = 0; i < bodies.length; i++) {
			var body = bodies[i];
			if (body.position.y <= 400 && !~['chest', 'left-arm', 'right-arm', ].indexOf(body.label)) {
				Body.setStatic(body, bool);
			}
		}
	}

	//弹簧
	var changeVal = 400;
	var group = Body.nextGroup(true),
		counter = -1;
	//链的个数，属性
	var ropeC = Composites.stack(changeVal, 45, 1, 1, 0, 10, function(x, y) {
		return Bodies.rectangle(x, y, 25, 15, {
			label: 'component',
			collisionFilter: { group: group },
			chamfer: 0.5, //节点的四角弧度
			render: {
				visible: false,
				sprite: {
					xScale: 0.66,
					yScale: 0.66,
					texture: sourceLinkRoot + 'img/connect.png',
				}
			},
		});
	});
	var arm = Bodies.rectangle(changeVal, 100, 35, 55, {
		label: 'arm',
		render: {
			visible: false,
			sprite: {
				xScale: 0.66,
				yScale: 0.66,
				texture: sourceLinkRoot + 'img/chest.png',
			}
		},
	});
	ropeC.bodies.push(arm)

	//链，length：节点长度
	Composites.chain(ropeC, 0.5, 0, -0.5, 0, {
		length: 0, //连接处的长度
		render: {
			visible: false
		}
	});
	Composite.add(ropeC, Constraint.create({
		label: 'spring',
		bodyB: ropeC.bodies[0],
		pointB: { x: -5, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		stiffness: 0.009, //弹簧, 0是线
		damping: 1,
		length: 0,
		render: {
			visible: false,
			lineWidth: 4,
			strokeStyle: '#3442c7', //弹簧颜色
		}
	}));

	var vertexSets = [], spring = ropeC.constraints[1],
		ragdoll,
		color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

	//连接, 第三个参数是爪子的大小比例, (400,100)-初始位置
	ragdoll = CMDCG.do.createRagdoll(400, 100, 1.1, {}, vertexSets);
	var ragdollConstraint = Constraint.create({
		bodyA: ropeC.bodies[ropeC.bodies.length-1],
		bodyB: ragdoll.bodies[0],
		pointA: { x: 28, y: 0 },
		pointB: { x: 0, y: -5 }, //爪子的连接位置
		length: 0,
		render: {
			visible: false,
		},
		stiffness: 1,
		// angularStiffness: 1
	});

	var catched = false,
		x = 0.5, y = -0.5,
		i = 2, j = -2,
		spring_x = spring.pointA.x, springPx;

	Events.on(engine, 'beforeUpdate', function(event) {
		if(!ragdoll || ragdoll.length <= 0 || eventOff) return
		//初始爪子状态
		if(!catched){
			Body.setAngle(ragdoll.bodies[1], 0.5); //左下
			Body.setAngle(ragdoll.bodies[2], 2.2); //左上
			Body.setAngle(ragdoll.bodies[3], -0.5); //右下
			Body.setAngle(ragdoll.bodies[4], -2.2); //右上
		}else{
			if(playAgain){
				i += 0.03;j -= 0.03;x += 0.01;y -= 0.01
				if(i >= 2) {
					i = 2;j = -2;
				}
				if(x >= 0.5){
					x = 0.5; y = -0.5;
					catched = false;
					ragdollMove = true;
					playAgain = false;
					clicked = false;
					spring.stiffness = 0.009
					// World.add(world, mouseConstraint);
				}
			}else{
				i -= 0.02;j += 0.02;x -= 0.01;y += 0.01
				if(i <= 0.75) { //值越小，上臂收缩的角度越大
					i = 0.75;j = -0.75;
				}
				if(x <= -0.95){
					x = -0.95; y = 0.95;
				}
			}
			Body.setAngle(ragdoll.bodies[1], x);
			Body.setAngle(ragdoll.bodies[2], i);
			Body.setAngle(ragdoll.bodies[3], y);
			Body.setAngle(ragdoll.bodies[4], j);
		}
		//弹簧滑动
		if(ragdollMove){
			//控制速度
			counter += 0.01
			if (counter < 0) return
			springPx = spring_x + 200 * Math.sin(counter);
			if(!clicked){
				spring.pointA.x = springPx
				// ragdoll.bodies[0].position.x = springPx
			}
		}
	});

	// Events.on(render, 'afterRender', function() {
	// 	if(!ragdollShow || catched || eventOff) return
	// 	var mouse = mouseConstraint.mouse,
	// 		context = render.context,
	// 		bodies = Composite.allBodies(engine.world),
	// 		startPoint = { x: 400, y: 100 },
	// 		endPoint = mouse.position;
	// 	var collisions = Query.ray(bodies, startPoint, endPoint);
	// 	Render.startViewTransform(render);
	// 	context.beginPath();
	// 	context.moveTo(startPoint.x, startPoint.y);
	// 	context.lineTo(endPoint.x, endPoint.y);
	// 	if (collisions.length > 0) {
	// 		context.strokeStyle = '#fff';
	// 	} else {
	// 		context.strokeStyle = '#555';
	// 	}
	// 	//线
	// 	// context.lineWidth = 1.5;
	// 	// context.stroke();
	// 	for (var i = 0; i < collisions.length; i++) {
	// 		var collision = collisions[i];
	// 		// Sleeping.set(collision.bodyA, false)
	// 		//过滤超过一定高度的物品
	// 		//过滤爪子
	// 		collision && !~['chest', 'left-arm', 'right-arm', 'right-lower-arm', 'left-lower-arm', 'component', 'arm', 'spring'].indexOf(collision.body.label) && (collision.body.position.y >= 450 && explosion(engine, collision.bodyA))
	// 		// context.rect(collision.bodyA.position.x - 4.5, collision.bodyA.position.y - 4.5, 8, 8);
	// 	}
	// 	// context.fillStyle = 'rgba(255,165,0,0.7)';
	// 	// context.fill();
	// 	Render.endViewTransform(render);
	// });

	var mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,  //0-鼠标不能捕获
				render: {
					visible: false
				}
			}
		});

	//允许scroll
	// mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
	// mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
	//允许鼠标拖动
	// World.add(world, mouseConstraint);

	//爪子伸下去后增加压力
	Events.on(mouseConstraint, 'mouseup', function(event) {
		//点击获取body id
		// var mouse = mouseConstraint.mouse,
		// 	bodies = Composite.allBodies(engine.world),
		// 	startPoint = { x: 400, y: 100 },
		// 	endPoint = mouse.position;
		// var collisions = Query.ray(bodies, startPoint, endPoint);
		// for (var i = 0; i < collisions.length; i++) {
		// 	console.log('mouseup collisions', collisions[i].bodyA)
		// }
		if(!ragdollShow) return
		clickFun()
	});
	render.mouse = mouse;

	// 可控制空间所占用的大小
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 600 }
	});

	//开始按钮事件
	$('.cm-dc-start-btn').click(function(){
		if(!ragdollShow) return
		clickFun()
	})
	//关闭按钮事件
	$('.cm-dc-close').click(function(){
		clearSource()
		eventOff = true
		World.clear(world)
		$('#cm-d-c').remove()
		$('.cm-dc-class').remove()
		$('#cm-d-c-style').remove()
		$('.simpleAlert').remove()
	})

	//更改鼠标样式
	$('#cm-d-c').css({cursor:"url('https://www.duba.com/static/v2/images/point.cur'),auto"})


	//减少引擎更新时间
	function enginRun() {
		window.requestAnimationFrame(enginRun);
		Engine.update(engine, 1000 / 300);
	}
	enginRun()

	return {
		engine: engine,
		runner: runner,
		render: render,
		canvas: render.canvas,
		stop: function() {
			Matter.Render.stop(render);
			Matter.Runner.stop(runner);
		}
	};
};
