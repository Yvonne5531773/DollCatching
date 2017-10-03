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
		Bodies = Matter.Bodies;

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
				frictionAir: 0.06,
				restitution: 0.3,
				friction: 0.01,
				render: {
					sprite: {
						texture: './img/coin.png'
					}
				}
			});
		} else {
			return Bodies.circle(x, y, 32, {
				density: 0.0005,
				frictionAir: 0.06,
				restitution: 0.3,
				friction: 0.01,
				render: {
					sprite: {
						texture: './img/liebao.png'
					}
				}
			});
		}
	});

	World.add(world, stack);

	//弹簧
	var changeVal = 400;
	var group = Body.nextGroup(true),
		counter = -1;
	//链的个数，属性
	var ropeC = Composites.stack(changeVal, 0, 2, 2, 0, 10, function(x, y) {
		return Bodies.rectangle(x-20, y, 30, 15, {
			collisionFilter: { group: group },
			chamfer: 0.5, //节点的四角弧度
		});
	});

	var arm = Bodies.rectangle(120, 100, 40, 25, {
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
		stiffness: 0,
		length: 0,
	});
	Composite.add(ropeC, Constraint.create({
		bodyB: ropeC.bodies[0],
		pointB: { x: -20, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		stiffness: 0, //弹簧, 0是线
		length: 0
	}));
	World.add(world, [ropeC]);

	//连接, 第三个参数是爪子的大小比例
	var ragdoll = Example.sprites.ragdoll(100, 100, 1.1);
	var ragdollConstraint = Constraint.create({
		bodyA: ropeC.bodies[ropeC.bodies.length-1],
		bodyB: ragdoll.bodies[0],
		pointA: { x: 32, y: 0 },
		pointB: { x: 0, y: -5 }, //爪子的连接位置
		stiffness: 0,
		length: 0
	});
	World.add(world, [ragdoll, ragdollConstraint]);

	Events.on(engine, 'beforeUpdate', function(event) {
		// counter += 0.03;
		// if (counter < 0) {
		// 	return;
		// }
		// var px = 400 + 100 * Math.sin(counter);
		// // body is static so must manually update velocity for friction to work
		// // console.log('counter:', counter)
		// // console.log('px:', px)
		// // console.log('px - ropeC.bodies[0].position.x:', px - ropeC.bodies[0].position.x)
		// Body.setVelocity(ropeC.bodies[0], { x: px - ropeC.bodies[0].position.x, y: 0 });
		// Body.setPosition(ropeC.bodies[0], { x: px, y: ropeC.bodies[0].position.y });
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
Example.sprites.ragdoll = function(x, y, scale, options) {
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
			fillStyle: '#E0A423'
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
		render: {
			fillStyle: '#E59B12'
		}
	});

	var chest = Bodies.rectangle(x, y, 55 * scale, 30 * scale, chestOptions);
	var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
	var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
	var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
	var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);

	var chestToRightUpperArm = Constraint.create({
		bodyA: chest,
		pointA: {
			x: 24 * scale,
			y: 0  //与手的位置
		},
		pointB: {
			x: 0,
			y: -10 * scale
		},
		bodyB: rightUpperArm,
		stiffness: 0,
		length: 20,
		render: {
			visible: true //弹簧是否显示
		}
	});

	var chestToLeftUpperArm = Constraint.create({
		bodyA: chest,
		pointA: {
			x: -24 * scale,
			y: 0
		},
		pointB: {
			x: 0,
			y: -18 * scale
		},
		bodyB: leftUpperArm,
		stiffness: 0,
		length: 20,
		render: {
			visible: true
		}
	});

	var upperToLowerRightArm = Constraint.create({
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
		render: {
			visible: false
		}
	});

	var upperToLowerLeftArm = Constraint.create({
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