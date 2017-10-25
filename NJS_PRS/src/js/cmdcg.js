
var DC = DC || {};

DC.do = function() {
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
		bhObj = CMDC.bhObj,
		playAgain = CMDC.playAgain,
		sourceLinkRoot = CMDC.sourceLinkRoot;

	//爪子构造
	//捉住有两个因素，1.改变节点角度，2.改变摩擦力
	DC.do.createRagdoll = function(x, y, scale, options, vertexSets) {
		var massVal = 1.5,
			frictionAirVal = 0.01,
			timeScaleVal = 0.8;
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
				sprite: {
					xScale: 0.7,
					yScale: 0.7,
					texture: sourceLinkRoot + 'img/chest.png'
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
				fillStyle: '#bdbabb'
			},
			// stiffness: 0.7,
			// mass: massVal,
			// frictionAir: frictionAirVal,
			timeScale: timeScaleVal
		}, options);
		var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
			label: 'left-lower-arm',
			render: {
				fillStyle: '#cfcdd2'
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
				fillStyle: '#bdbabb'
			},
			// stiffness: 0.7,
			// mass: massVal,
			// frictionAir: frictionAirVal,
			timeScale: timeScaleVal
		}, options);
		var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
			label: 'right-lower-arm',
			render: {
				fillStyle: '#cfcdd2'
			},
			chamfer: {
				radius: 6 * scale
			},
			// friction: 0.7,
			// mass: massVal,
			// frictionAir: frictionAirVal,
			// timeScale: timeScaleVal
		});
		var chest = Bodies.rectangle(x, y, 45 * scale, 30 * scale, chestOptions);
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
				x: 0,
				y: -32 * scale
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
				x: 0,
				y: -32 * scale
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
				x: 0,
				y: -36 * scale
			},
			// stiffness: 0.6,
			angularStiffness: 1,  //节点的角硬度
			render: {
				visible: true,
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
				x: 0,
				y: -36 * scale
			},
			// stiffness: 0.6,
			angularStiffness: 1,
			render: {
				visible: true,
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
	DC.do.createStacks = function(criteria){
		var massVal = 0.1, timeScaleVal = 0.5;
		return Composites.stack(criteria.x, criteria.y, criteria.columns, criteria.rows, 0, 0, function(x, y) {
			if (Common.random() < 0.05) {
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 26, 16, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: sourceLinkRoot + 'img/double11_1.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}
			else if(Common.random() > 0.05 && Common.random() < 0.1){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*30, 24, 24, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/f8e6bdd1572a5e8a2e2f73d8c52b1bf6.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.1 && Common.random() < 0.15){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 22, 30, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: sourceLinkRoot + 'img/red.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.15 && Common.random() < 0.2){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 24, 24, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: sourceLinkRoot + 'img/gift.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}  else if(Common.random() > 0.2 && Common.random() < 0.25){
				return Bodies.circle(x+Common.random()*15, y+Common.random()*5, 16, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: sourceLinkRoot + 'img/coin.png'
						}
					},
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.25 && Common.random() < 0.3){
				return Bodies.circle(x+Common.random()*15, y+Common.random()*10, 12, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: sourceLinkRoot + 'img/duck.png'
						}
					},
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}else if(Common.random() > 0.3 && Common.random() < 0.35){
				return Bodies.circle(x+Common.random()*15, y+Common.random()*5, 16, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/bd2bd1fb94a20ca2f9eea1088925050a.png'
						}
					},
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}else if(Common.random() > 0.35 && Common.random() < 0.4){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 38, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/24af186e46de0d872942ef2709f83b71.gif'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.4 && Common.random() < 0.45){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*45, 38, 18, {
					render: {
						sprite: {
							xScale: 0.5-scaleoffest,
							yScale: 0.5-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/2a126249ff498557a38cc920a64481c7.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.45 && Common.random() < 0.5){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*40, 28, 23, {
					render: {
						sprite: {
							xScale: 0.7-scaleoffest,
							yScale: 0.7-scaleoffest,
							texture: sourceLinkRoot + 'img/10.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.5 && Common.random() < 0.55){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*32, 38, 23, {
					render: {
						sprite: {
							xScale: 0.7-scaleoffest,
							yScale: 0.7-scaleoffest,
							texture: sourceLinkRoot + 'img/500.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.55 && Common.random() < 0.6){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*44, 38, 23, {
					render: {
						sprite: {
							xScale: 0.7-scaleoffest,
							yScale: 0.7-scaleoffest,
							texture: sourceLinkRoot + '/img/100.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.6 && Common.random() < 0.65){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*21, 63, 23, {
					render: {
						sprite: {
							xScale: 0.7-scaleoffest,
							yScale: 0.7-scaleoffest,
							texture: sourceLinkRoot + '/img/10000.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.65 && Common.random() < 0.7){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*29, 28, 23, {
					render: {
						sprite: {
							xScale: 0.7-scaleoffest,
							yScale: 0.7-scaleoffest,
							texture: sourceLinkRoot + '/img/50.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.7 && Common.random() < 0.75){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 28, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/25cd325bae7818e30a4d4676ec0880bf.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			} else if(Common.random() > 0.75 && Common.random() < 0.8){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 28, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/c1fede413fbd7b3de23a771472e67d29.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}else if(Common.random() > 0.8 && Common.random() < 0.85){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 28, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/9de67782c268517089e6d031af85405c.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}else if(Common.random() > 0.85 && Common.random() < 0.9){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 28, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/45991158829180f3a86597a0ef781c3a.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}else if(Common.random() > 0.95 && Common.random() < 1){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 28, {
					render: {
						sprite: {
							xScale: 0.8-scaleoffest,
							yScale: 0.8-scaleoffest,
							texture: '//act.cmcmcdn.com/upload/201710/328c7178f239ce35264850419510b3be.png'
						}
					},
					chamfer: { radius: 5 },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}else {
				return Bodies.circle(x+Common.random()*15, y+Common.random()*15, 16, {
					render: {
						sprite: {
							xScale: 0.7-scaleoffest,
							yScale: 0.7-scaleoffest,
							texture: sourceLinkRoot + 'img/liebao.png'
						}
					},
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal
				});
			}
			// else if(Common.random() > 0.45 && Common.random() < 0.5){
			// 	//三角形, 第三个参数代表边数
			// 	return Bodies.polygon(x, y, Math.round(3), Common.random(20, 50), {
			// 		render: {
			// 			sprite: {
			// 				texture: sourceLinkRoot + 'img/sandwich.png'
			// 			}
			// 		}
			// 	});
			// }
		});
	}

	var ragdollShow = false,
		ragdollMove = false,
		scaleoffest = 0.1;
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
	var width = document.documentElement.clientWidth,
		offset = 10, thick = 0.01;

	Render.run(render);
	Runner.run(runner, engine);

	world.bodies = [];
	//设置运行范围 围墙
	$('#cm-d-c').css('min-width', 1180)
	var bottomWall = Bodies.rectangle(0, 600, width* 3, thick, options),
		upperWall = Bodies.rectangle(0, 0, width* 3, thick, options),
		leftWall = Bodies.rectangle(-width* 0.13+offset, 300, thick, 620, options), //3-厚度 4-高度
		rightWall = Bodies.rectangle(width* 0.6+offset, 300, thick, 620, options); //3-厚度 4-高度
	World.add(world, [
		// bottomWall,
		// leftWall,
		// rightWall
		// Bodies.rectangle(0, 0, 800.5 + 2 * offset, thick, options), //上
		Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, thick, options), //下
		Bodies.rectangle(800 + offset, 300, thick, 600.5 + 2 * offset, options), //右
		Bodies.rectangle(-offset, 300, thick, 600.5 + 2 * offset, options)  //左
	]);

	var dblChoseAlert, clicked = false,
		clickFun = function() {
			if(clicked){
				!playAgain && $('#cm-dc-switch1').prop("checked", false)
				playAgain && $('#cm-dc-switch1').prop("checked", true)
				return
			}
			ragdollMove = false
			clicked = true
			//禁止鼠标操作
			// World.remove(world, mouseConstraint);
			//弹簧伸长
			// setInterval(function(){
			// 	if(spring.length >= 400) return
			// 	spring.length += 30
			// }, 100)
			spring.stiffness = 0.005
			spring.length = 350
			//抓娃娃状态
			setTimeout(function () {
				catched = true
				setTimeout(function () {
					spring.length = 10
					setTimeout(function () {
						//防止多次现提示框出
						if($('.simpleAlert').length > 0) return;
						dblChoseAlert = simpleAlert({
							"content": "游戏结束啦！",
							"buttons": {
								"再玩一次": function () {
									setBodiesStatic(engine, false)
									playAgain = true;
									$('#cm-dc-switch1').prop("checked", true)
									dblChoseAlert.close();
								},
								"退出": function () {
									clearSource()
									eventOff = true
									dblChoseAlert.close()
									World.clear(world)
									$('#cm-d-c').remove()
									bhObj.dispose()
								}
							}
						})
						setBodiesStatic(engine, true)
					}, timeout * 3)
				}, timeout * 2.5)
			}, timeout)
		}
	$('.start-btn').click(clickFun)

	//物品池, 最好不超过40个
	var	criteria = {
			x: 0,
			y: 400,
			columns: 28,
			rows: 2,
		}
	var stack = DC.do.createStacks(criteria);
	World.add(world, stack);

	//爪子出现
	setTimeout(function(){
		World.add(world, [ropeC, ragdoll, ragdollConstraint,]);
		// World.add(world, [ropeC, ragdoll, ragdollConstraint, upperWall]);
		//开始按钮出现
		$('.start-btn').css('display', 'block');
		ragdollShow = true
		setTimeout(function(){
			ragdollMove = true;
		}, timeout)
	}, timeout)

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

	//svg加入元素；2代表两行, 280->横坐标，-3100->纵坐标
	// World.add(world, Composites.stack(300, -2500, 3, 58, 3, 5, function(x, y) {
	// 	if (Query.point([five], { x: x, y: y }).length === 0) {
	// 		// return Bodies.polygon(x, y, 6, 12, {
	// 		// 	frictionAir: 0.02,
	// 		// 	friction: 0.01,
	// 		// 	restitution: 0,
	// 		// 	render: {
	// 		// 		fillStyle: ["#FFFFFF", "#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 4)]
	// 		// 	}
	// 		// });
	// 		if (Common.random() < 0.3) {
	// 			return Bodies.circle(x, y, 10, {
	// 				density: 0.0005,
	// 				frictionAir: 0.01,
	// 				restitution: 0,
	// 				friction: 0,
	// 				render: {
	// 					sprite: {
	// 						texture: './img/tmall.png'
	// 					}
	// 				}
	// 			});
	// 		}else if(Common.random() > 0.3 && Common.random() < 0.6){
	// 			return Bodies.rectangle(x, y, 18, 26, {
	// 				frictionAir: 0.01,
	// 				render: {
	// 					strokeStyle: '#ffffff',
	// 					sprite: {
	// 						texture: './img/red2.png'
	// 					}
	// 				}
	// 			})
	// 		}else{
	// 			return Bodies.circle(x, y, 10, {
	// 				density: 0.0005,
	// 				frictionAir: 0.01,
	// 				restitution: 0,
	// 				friction: 0,
	// 				render: {
	// 					sprite: {
	// 						texture: './img/taobao2.png'
	// 					}
	// 				}
	// 			});
	// 		}
	// 	}
	// }));

	//弹簧
	var changeVal = 400;
	var group = Body.nextGroup(true),
		counter = -1;
	//链的个数，属性
	var ropeC = Composites.stack(changeVal, 0, 2, 1, 0, 10, function(x, y) {
		return Bodies.rectangle(x, y, 30, 15, {
			label: 'component',
			collisionFilter: { group: group },
			chamfer: 0.5, //节点的四角弧度
			render: {
				sprite: {
					xScale: 0.6,
					yScale: 0.6,
					texture: sourceLinkRoot + 'img/component.png'
				}
			},
			frictionAirVal: 0
		});
	});
	var arm = Bodies.rectangle(400, 100, 40, 25, {
		label: 'arm',
		render: {
			strokeStyle: '#3c3f41',
			sprite: {
				xScale: 0.8,
				yScale: 0.8,
				texture: sourceLinkRoot + 'img/arm.png'
			}
		},
		frictionAirVal: 0
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
		pointB: { x: -20, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		stiffness: 0.009, //弹簧, 0是线
		damping: 1,
		length: 0,
		render: {
			visible: true,
			lineWidth: 1.5,
			strokeStyle: '#29a3f1', //弹簧颜色
		}
	}));

	var vertexSets = [], spring = ropeC.constraints[2],
		ragdoll,
		color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);

	//连接, 第三个参数是爪子的大小比例, (400,100)-初始位置
	ragdoll = DC.do.createRagdoll(400, 100, 1.1, {}, vertexSets);
	var ragdollConstraint = Constraint.create({
		bodyA: ropeC.bodies[ropeC.bodies.length-1],
		bodyB: ragdoll.bodies[0],
		pointA: { x: 28, y: 0 },
		pointB: { x: 0, y: -7 }, //爪子的连接位置
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
				if(i <= 1) {
					i = 1;j = -1;
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
	mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
	mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
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
		$('#cm-dc-switch1').prop("checked", false);
		clickFun()
	});
	render.mouse = mouse;

	// 可控制空间所占用的大小
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 600 }
	});

	//关闭按钮事件
	$('.cm-d-c-close').click(function(){
		clearSource()
		eventOff = true
		World.clear(world)
		$('#cm-d-c').remove()
		bhObj.dispose()
	})

	//更改鼠标样式
	$('#cm-d-c').css({cursor:"url('https://www.duba.com/static/v2/images/point.cur'),auto"})


	//减少引擎更新时间
	function enginRun() {
		window.requestAnimationFrame(enginRun);
		Engine.update(engine, 1000 / 200);
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
