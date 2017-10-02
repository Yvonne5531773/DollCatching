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
	var ropeC = Composites.stack(changeVal, 0, 2, 2, 10, 10, function(x, y) {
		return Bodies.rectangle(x - 20, y, 50, 20, {
			collisionFilter: { group: group },
			chamfer: 3, //节点的四角弧度
		});
	});

	var arm = Bodies.rectangle(120, 100, 50, 20, {
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
		length: 0
	});
	Composite.add(ropeC, Constraint.create({
		bodyB: ropeC.bodies[0],
		pointB: { x: -20, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		stiffness: 0.5 //弹簧, 0是线
	}));
	World.add(world, [ropeC]);

	//连接
	var ragdoll = Example.sprites.ragdoll(100, 0, 1.3);
	// var ragdoll = Example.sprites.ragdoll(window.innerWidth/2-50, window.innerHeight/2);
	var ragdollConstraint = Constraint.create({
		bodyA: ropeC.bodies[ropeC.bodies.length-1],
		bodyB: ragdoll.bodies[0],
		pointA: { x: 25, y:0 },
		pointB: { x: 0, y: -30 },
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

Example.sprites.ragdoll = function(x, y, scale, options) {
	scale = typeof scale === 'undefined' ? 1 : scale;

	var Body = Matter.Body,
		Bodies = Matter.Bodies,
		Constraint = Matter.Constraint,
		Composite = Matter.Composite,
		Common = Matter.Common;

	var headOptions = Common.extend({
		label: 'head',
		collisionFilter: {
			group: Body.nextGroup(true)
		},
		chamfer: {
			radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale]
		},
		render: {
			fillStyle: '#FFBC42'
		}
	}, options);

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

	var leftLegOptions = Common.extend({
		label: 'left-leg',
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

	var leftLowerLegOptions = Common.extend({}, leftLegOptions, {
		render: {
			fillStyle: '#E59B12'
		}
	});

	var rightLegOptions = Common.extend({
		label: 'right-leg',
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

	var rightLowerLegOptions = Common.extend({}, rightLegOptions, {
		render: {
			fillStyle: '#E59B12'
		}
	});

	var head = Bodies.rectangle(x, y - 60 * scale, 34 * scale, 40 * scale, headOptions);
	var chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
	var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
	var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
	var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
	var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
	// var leftUpperLeg = Bodies.rectangle(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, leftLegOptions);
	// var leftLowerLeg = Bodies.rectangle(x - 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, leftLowerLegOptions);
	// var rightUpperLeg = Bodies.rectangle(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, rightLegOptions);
	// var rightLowerLeg = Bodies.rectangle(x + 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, rightLowerLegOptions);

	var chestToRightUpperArm = Constraint.create({
		bodyA: chest,
		pointA: {
			x: 24 * scale,
			y: -23 * scale
		},
		pointB: {
			x: 0,
			y: -8 * scale
		},
		bodyB: rightUpperArm,
		stiffness: 0.6,
		render: {
			visible: false
		}
	});

	var chestToLeftUpperArm = Constraint.create({
		bodyA: chest,
		pointA: {
			x: -24 * scale,
			y: -23 * scale
		},
		pointB: {
			x: 0,
			y: -8 * scale
		},
		bodyB: leftUpperArm,
		stiffness: 0.6,
		render: {
			visible: false
		}
	});

	// var chestToLeftUpperLeg = Constraint.create({
	// 	bodyA: chest,
	// 	pointA: {
	// 		x: -10 * scale,
	// 		y: 30 * scale
	// 	},
	// 	pointB: {
	// 		x: 0,
	// 		y: -10 * scale
	// 	},
	// 	bodyB: leftUpperLeg,
	// 	stiffness: 0.6,
	// 	render: {
	// 		visible: false
	// 	}
	// });
	//
	// var chestToRightUpperLeg = Constraint.create({
	// 	bodyA: chest,
	// 	pointA: {
	// 		x: 10 * scale,
	// 		y: 30 * scale
	// 	},
	// 	pointB: {
	// 		x: 0,
	// 		y: -10 * scale
	// 	},
	// 	bodyB: rightUpperLeg,
	// 	stiffness: 0.6,
	// 	render: {
	// 		visible: false
	// 	}
	// });

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

	// var upperToLowerLeftLeg = Constraint.create({
	// 	bodyA: leftUpperLeg,
	// 	bodyB: leftLowerLeg,
	// 	pointA: {
	// 		x: 0,
	// 		y: 20 * scale
	// 	},
	// 	pointB: {
	// 		x: 0,
	// 		y: -20 * scale
	// 	},
	// 	stiffness: 0.6,
	// 	render: {
	// 		visible: false
	// 	}
	// });
	//
	// var upperToLowerRightLeg = Constraint.create({
	// 	bodyA: rightUpperLeg,
	// 	bodyB: rightLowerLeg,
	// 	pointA: {
	// 		x: 0,
	// 		y: 20 * scale
	// 	},
	// 	pointB: {
	// 		x: 0,
	// 		y: -20 * scale
	// 	},
	// 	stiffness: 0.6,
	// 	render: {
	// 		visible: false
	// 	}
	// });

	// var legToLeg = Constraint.create({
	// 	bodyA: leftLowerLeg,
	// 	bodyB: rightLowerLeg,
	// 	stiffness: 0.01,
	// 	render: {
	// 		visible: false
	// 	}
	// });

	var person = Composite.create({
		bodies: [
			chest, leftLowerArm, leftUpperArm,
			rightLowerArm, rightUpperArm,
			// leftLowerLeg,
			// rightLowerLeg, leftUpperLeg, rightUpperLeg
		],
		constraints: [
			upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm,
			chestToRightUpperArm,
			// upperToLowerLeftLeg,
			// upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
			// legToLeg
		]
	});

	return person;

	// var headOptions = {friction: 1,frictionAir:.09,collisionFilter: {group: group}};
	// var chestOptions = {friction: 1,frictionAir:.09,collisionFilter: {group: group}};
	// var armOptions = {friction: 1, frictionAir: .09,collisionFilter: {group: group}};
	// var legOptions = {friction: 1, frictionAir: .09,collisionFilter: {group: group}};
	// var head  = Bodies.circle(x, y-70, 30, headOptions);
	// var chest = Bodies.rectangle(x,y,60, 80,chestOptions);//40,120
	// var rightUpperArm = Bodies.rectangle(x+40, y-20, 20, 40,armOptions);
	// var rightLowerArm = Bodies.rectangle(x+40, y+20, 20, 60,armOptions);
	// var leftUpperArm = Bodies.rectangle(x-40, y-20, 20, 40,armOptions);
	// var leftLowerArm = Bodies.rectangle(x-40, y+20, 20, 60,armOptions);
	// var leftUpperLeg = Bodies.rectangle(x-20, y+60, 20, 40,legOptions);
	// var rightUpperLeg = Bodies.rectangle(x+20, y+60, 20, 40,legOptions);
	// var leftLowerLeg = Bodies.rectangle(x-20, y+100, 20, 60,legOptions);
	// var rightLowerLeg = Bodies.rectangle(x+20, y+100, 20, 60,legOptions);
	//
	// var legTorso = Body.create({
	// 	parts: [chest, leftUpperLeg, rightUpperLeg],
	// 	collisionFilter: {group: group},
	// });
	//
	// var chestToRightUpperArm = Constraint.create({
	// 	bodyA: legTorso,
	// 	pointA: { x: 25, y: -40 },
	// 	pointB: {x:-5, y:-10},
	// 	bodyB: rightUpperArm,
	// 	stiffness: .4,
	// 	length: 2
	// });
	// var chestToLeftUpperArm = Constraint.create({
	// 	bodyA: legTorso,
	// 	pointA: { x: -25, y: -40 },
	// 	pointB: {x:5, y:-10},
	// 	bodyB: leftUpperArm,
	// 	stiffness: .4,
	// 	length: 2
	// });
	//
	// var upperToLowerRightArm = Constraint.create({
	// 	bodyA: rightUpperArm,
	// 	bodyB: rightLowerArm,
	// 	pointA: {x:0,y: 15},
	// 	pointB: {x:0, y:-20},
	// 	stiffness: .2
	// });
	//
	// var upperToLowerLeftArm= Constraint.create({
	// 	bodyA: leftUpperArm,
	// 	bodyB: leftLowerArm,
	// 	pointA: {x:0,y: 15},
	// 	pointB: {x:0, y:-20},
	// 	stiffness: .2,
	// 	length: 1
	// });
	//
	// var upperToLowerLeftLeg= Constraint.create({
	// 	bodyA: legTorso,
	// 	bodyB: leftLowerLeg,
	// 	pointA: {x:-20,y: 60},
	// 	pointB: {x:0, y:-25},
	// 	stiffness: .4
	// });
	//
	// var upperToLowerRightLeg= Constraint.create({
	// 	bodyA: legTorso,
	// 	bodyB: rightLowerLeg,
	// 	pointA: {x:20,y: 60},
	// 	pointB: {x:0, y:-25},
	// 	stiffness: .4
	// });
	//
	// var headContraint = Constraint.create({
	// 	bodyA: head,
	// 	pointA:{x:0, y: 20},
	// 	pointB: {x:0, y:-50},
	// 	bodyB: legTorso,
	// 	stiffness: .7
	// });
	//
	// return Composite.create({
	// 	bodies: [
	// 		legTorso,
	// 		head,
	// 		leftLowerArm,
	// 		leftUpperArm,
	// 		rightLowerArm,
	// 		rightUpperArm,
	// 		leftLowerLeg,
	// 		rightLowerLeg
	// 	],
	// 	constraints: [
	// 		headContraint,
	// 		chestToLeftUpperArm,
	// 		chestToRightUpperArm,
	// 		upperToLowerLeftArm,
	// 		upperToLowerRightArm,
	// 		upperToLowerLeftLeg,
	// 		upperToLowerRightLeg
	// 	]
	// });
};