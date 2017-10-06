var Example = Example || {};

Example.sprites = function() {
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
		Svg = Matter.Svg;

	// create engine
	var engine = Engine.create(),
		world = engine.world;

	// create renderer
	// 整个屏幕所占用的大小
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 1000,
			height: 800,
			background: '#0f0f13',
			showAngleIndicator: false,
			wireframes: false
		}
	});

	Render.run(render);

	// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);

	// add bodies
	var offset = 10,
		options = {
			isStatic: true
		};

	world.bodies = [];

	// these static walls will not be rendered in this sprites example, see options
	World.add(world, [
		Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
		Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
		Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
		Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
	]);

	var stack = Composites.stack(20, 20, 15, 4, 0, 0, function(x, y) {
		if (Common.random() < 0.25) {
			return Bodies.rectangle(x, y, 64, 64, {
				render: {
					strokeStyle: '#ff4a74',
					sprite: {
						texture: './img/hamburger.png'
					}
				}
			});
		} else if(Common.random() > 0.25 && Common.random() < 0.45){
			return Bodies.rectangle(x, y, 38, 38, {
				render: {
					strokeStyle: '#ffffff',
					sprite: {
						texture: './img/red.png'
					}
				}
			});
		}else if(Common.random() > 0.45 && Common.random() < 0.65){
			//三角形, 第三个参数代表边数
			return Bodies.polygon(x, y, Math.round(3), Common.random(20, 50), {
				render: {
					strokeStyle: '#ffffff',
					sprite: {
						texture: './img/sandwich.png'
					}
				}
			});
		} else if(Common.random() > 0.65 && Common.random() < 0.85){
			return Bodies.circle(x, y, 30, {
				density: 0.0005,
				frictionAir: 0,
				restitution: 0,
				friction: 0,
				render: {
					sprite: {
						texture: './img/coin.png'
					}
				}
			});
		} else {
			return Bodies.circle(x, y, 32, {
				density: 0.0005,
				frictionAir: 0,
				restitution: 0,
				friction: 0,
				render: {
					sprite: {
						texture: './img/liebao.png'
					}
				}
			});
		}
	});

	//池
	World.add(world, stack);

	//弹簧
	var changeVal = 400;
	var group = Body.nextGroup(true),
		counter = -1;
	//链的个数，属性
	var ropeC = Composites.stack(changeVal, 0, 2, 1, 0, 10, function(x, y) {
		return Bodies.rectangle(x, y, 30, 15, {
			collisionFilter: { group: group },
			chamfer: 0.5, //节点的四角弧度
		});
	});

	var arm = Bodies.rectangle(400, 100, 40, 25, {
		render: {
			strokeStyle: '#ffffff',
			sprite: {
				texture: './img/arm.png'
			}
		}
	});
	ropeC.bodies.push(arm)

	//链，length：节点长度
	Composites.chain(ropeC, 0.5, 0, -0.5, 0, {
		stiffness: 1,
		length: 0, //连接处的长度
		render: {
			visible: false
		}
	});
	Composite.add(ropeC, Constraint.create({
		bodyB: ropeC.bodies[0],
		pointB: { x: -20, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		// stiffness: 0.03, //弹簧, 0是线
		stiffness: 0.015,
		damping: 1,
		length: 10,
		render: {
			visible: true,
			sprite: {
				// texture: './img/liebao.png'
			}
		}
	}));
	console.log('ropeC', ropeC.constraints[2])

	var vertexSets = [],
		ragdoll,
		color = Common.choose(['#556270', '#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58']);
	$.get('./svg/iconmonstr-check-mark-8-icon.svg').done(function(data) {
		$(data).find('path').each(function(i, path) {
			vertexSets.push(Svg.pathToVertices(path, 30));
		});

		//连接, 第三个参数是爪子的大小比例, (400,100)-初始位置
		ragdoll = Example.sprites.ragdoll(400, 100, 1.1, {}, vertexSets);
		var ragdollConstraint = Constraint.create({
			bodyA: ropeC.bodies[ropeC.bodies.length-1],
			bodyB: ragdoll.bodies[0],
			pointA: { x: 28, y: 0 },
			pointB: { x: 0, y: -20 }, //爪子的连接位置
			stiffness: 0,
			length: 0
		});

		//爪子出现
		setTimeout(function(){
			World.add(world, [ropeC, ragdoll, ragdollConstraint]);
		}, 800)

		console.log('ragdoll:', ragdoll)
	});

	//夹角, 0.5->90°，1->180°
	// Body.rotate(ragdoll.bodies[1], -Math.PI * 0.5, {
	// 	x: ragdoll.bodies[1].position.x - 100,
	// 	y: ragdoll.bodies[1].position.y
	// });

	var hasCatched = false;
	Events.on(engine, 'beforeUpdate', function(event) {
		//链条摇摆的调整
		// counter += 0.03;
		// if (counter < 0) {
		// 	return;
		// }
		// var px = 400 + 100 * Math.sin(counter);
		// // body is static so must manually update velocity for friction to work
		// // console.log('counter:', counter)
		// // console.log('px:', px)
		// // console.log('px - ropeC.bodies[0].position.x:', px - ropeC.bodies[0].position.x)
		// Body.setVelocity(ropeC.bodies[0], { x: px - ropeC.bodies[0].position.x, y: 0 }); //速度
		// Body.setPosition(ropeC.bodies[0], { x: px, y: ropeC.bodies[0].position.y });
		// console.log('setAngle:', ragdoll.bodies[0].angle)

		if(!ragdoll || ragdoll.length <= 0) return
		//初始爪子状态
		// if(!hasCatched){
		// 	Body.setAngle(ragdoll.bodies[1], 0.5);
		// 	Body.setAngle(ragdoll.bodies[2], 2);
		// 	Body.setAngle(ragdoll.bodies[3], -0.5);
		// 	Body.setAngle(ragdoll.bodies[4], -3);
		// }
		// if(!hasCatched){
		// 	Body.setAngle(ragdoll.bodies[1], -1);
		// 	Body.setAngle(ragdoll.bodies[2], 2);
		// 	Body.setAngle(ragdoll.bodies[3], 0.8);
		// 	Body.setAngle(ragdoll.bodies[4], -3);
		// }
		if(!hasCatched){
			console.log('!hasCatched')
			Body.setAngle(ragdoll.bodies[1], 0.5);
			Body.setAngle(ragdoll.bodies[2], 3.5);
			Body.setAngle(ragdoll.bodies[3], -0.4);
			Body.setAngle(ragdoll.bodies[4], -3.5);
		}else{
			Body.setAngle(ragdoll.bodies[1], -0.7);
			Body.setAngle(ragdoll.bodies[2], 2);
			Body.setAngle(ragdoll.bodies[3], 0.7);
			Body.setAngle(ragdoll.bodies[4], -2.2);
		}

		// ragdoll.constraints[2].pointB.y = -38*1.1

		//抓娃娃状态
		setTimeout(function(){
			// ragdoll.constraints[2].length = 20
			// ragdoll.constraints[3].length = 20
			// Body.setAngle(ragdoll.bodies[1], -0.8);
			// Body.setAngle(ragdoll.bodies[3], 0.8);
			hasCatched = true
		}, 6000)

		Body.set(ragdoll.bodies[1], 'friction', 1)
		Body.set(ragdoll.bodies[3], 'friction', 1)
		// Body.set(ragdoll.bodies[1], 'frictionAir', 1)
		// ropeC.constraints[2].length = 160
	});

	//线
	// add damped soft global constraint
	// var body = Bodies.polygon(400, 100, 4, 30);
	// var constraint = Constraint.create({
	// 	pointA: { x: 400, y: 120 },
	// 	bodyB: ropeC.bodies[0],
	// 	pointB: { x: -10, y: -10 },
	// 	stiffness: 0.001,
	// 	damping: 0.05
	// });

	// add mouse control
	var mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

	World.add(world, mouseConstraint);

	//爪子伸下去后增加压力
	Events.on(mouseConstraint, 'mouseup', function(event) {
		var mousePosition = event.mouse.position;
		console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);

		var py = 300 + 100 * Math.sin(engine.timing.timestamp * 0.002);
		console.log('mouseup', ragdoll.bodies[0]);
		// Body.setVelocity(ragdoll.bodies[0], { x: 0, y: py - ragdoll.bodies[0].position.y });
		// Body.setVelocity(ragdoll.bodies[0], { x: 0, y: 10 });
		// Body.setPosition(ragdoll.bodies[0], { x: 404, y: 403 });
		console.log('ropeC.constraints[2]', ropeC.constraints[2]);
		// ropeC.constraints[2].length = 200
	});

	// keep the mouse in sync with rendering
	render.mouse = mouse;

	// fit the render viewport to the scene
	// 可控制空间所占用的大小
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 600 }
	});

	// context for MatterTools.Demo
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

//爪子
//捉住有两个因素，1.改变节点角度，2.改变摩擦力
Example.sprites.ragdoll = function(x, y, scale, options, vertexSets) {
	scale = typeof scale === 'undefined' ? 1 : scale;

	var Body = Matter.Body,
		Bodies = Matter.Bodies,
		Constraint = Matter.Constraint,
		Composite = Matter.Composite,
		Common = Matter.Common;

	var chestOptions = Common.extend({
		label: 'chest',
		collisionFilter: {
			group: Body.nextGroup(true)
		},
		chamfer: {
			radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale]
		},
		render: {
			fillStyle: '#E0A423',
			sprite: {
				// texture: './img/liebao.png'
			}
		}
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
			fillStyle: '#FFBC42'
		}
	}, options);

	var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
		label: 'left-lower-arm',
		render: {
			fillStyle: '#E59B12'
		}
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
			fillStyle: '#FFBC42'
		}
	}, options);

	var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
		label: 'right-lower-arm',
		render: {
			fillStyle: '#E59B12'
		}
	});

	var chest = Bodies.rectangle(x, y, 55 * scale, 30 * scale, chestOptions);
	var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
	var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
	var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
	var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
	// var leftLowerArm = Bodies.fromVertices(400, 80, vertexSets, {
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
			// y: -18 * scale
			y: -38 * scale
		},
		bodyB: rightUpperArm,
		stiffness: 0.6,
		angularStiffness: 0.3,
		length: 0,
		render: {
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
			// y: -18 * scale
			y: -38 * scale
		},
		bodyB: leftUpperArm,
		stiffness: 0.6,
		angularStiffness: 0.3,
		length: 0,
		render: {
			visible: false
		}
	});

	var upperToLowerRightArm = Constraint.create({
		label: 'UPPER_TO_LOWER_RIGHT',
		bodyA: rightUpperArm,
		bodyB: rightLowerArm,
		pointA: {
			x: 0,
			y: 15 * scale
		},
		pointB: {
			x: 0,
			y: -25 * scale
		},
		stiffness: 0.6,
		angularStiffness: 1.6,  //节点的角硬度
		render: {
			visible: false
		}
	});

	var upperToLowerLeftArm = Constraint.create({
		label: 'UPPER_TO_LOWER_LEFT',
		bodyA: leftUpperArm,
		bodyB: leftLowerArm,
		pointA: {
			x: 0,
			y: 15 * scale
		},
		pointB: {
			x: 0,
			y: -25 * scale
		},
		stiffness: 0.6,
		angularStiffness: 1.6,
		render: {
			visible: false
		}
	});

	var person = Composite.create({
		bodies: [
			chest, leftLowerArm, leftUpperArm,
			rightLowerArm, rightUpperArm,
		],
		constraints: [
			upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm,
			chestToRightUpperArm,
		]
	});

	return person;
};