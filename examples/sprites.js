var svg_data = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 800 600" style="enable-background:new 0 0 800 600;" xml:space="preserve"> <path d="M556,320.4c-9.4-22.3-22.7-41.3-39.9-56.9c-17.2-15.6-37.4-27.3-60.5-35.1c-23.1-7.8-48.1-11.7-75-11.7 c-2.7,0-5.8,0.1-9.3,0.4c-3.5,0.3-7.1,0.4-10.9,0.4c-4.3,0.5-8.6,0.8-12.9,0.8V109.4h201.7V11h-10v88.4H337.5v128.9h10 c4.5,0,9.1-0.3,13.5-0.8c3.9,0,7.6-0.2,11.1-0.4c3.2-0.2,6.1-0.4,8.5-0.4c25.7,0,49.8,3.8,71.8,11.2c21.7,7.3,40.9,18.4,57,33 c16,14.5,28.6,32.5,37.4,53.4c8.8,21,13.3,44.5,13.3,69.9c0,30-5.6,56.6-16.7,79.1c-11.1,22.5-26.5,41.6-45.6,56.7 c-19.4,15.3-42.2,27.1-67.8,35c-25.8,8-53.9,12.1-83.4,12.1c-11.2,0-23.4-1.2-36.2-3.5c-13-2.3-26.1-5.3-38.7-8.7 c-12.6-3.4-24.3-7.2-34.9-11.4c-6.9-2.7-13.2-5.3-18.7-7.8l26.2-65c8.9,4.2,20.1,8.6,34,13.3c20,6.8,41.3,10.2,63.3,10.2 c18.6,0,36.1-2.3,52-6.8c16.1-4.6,30.3-11.4,42.3-20.1c12.2-8.9,21.9-20.1,28.8-33.3c6.9-13.2,10.4-28.4,10.4-45 c0-32.8-13.2-59-39.2-77.9c-25-18.1-62.4-27.3-111.2-27.3c-5.9,0-12.8,0.1-20.9,0.4c-7.9,0.3-15.5,0.7-22.6,1.2 c-4.6,0.3-9.4,0.5-14.3,0.7V11h-10v295.3c8.6,0,16.9-0.3,25-0.8c7-0.5,14.4-0.9,22.2-1.2c7.8-0.3,14.7-0.4,20.6-0.4 c46.8,0,81.9,8.5,105.3,25.4c23.4,16.9,35.1,40.2,35.1,69.8c0,15.1-3.1,28.5-9.3,40.3c-6.2,11.8-14.8,21.8-25.8,29.9 c-11,8.1-24.1,14.3-39.1,18.6c-15.1,4.3-31.5,6.5-49.2,6.5c-21,0-41-3.2-60.1-9.7c-19.1-6.5-33.2-12.4-42.4-17.8l-33.9,83.9 c7.5,3.8,16.8,7.8,27.8,12.1c11,4.3,23,8.2,35.9,11.7s26.1,6.5,39.5,8.9c13.4,2.4,26.1,3.6,37.9,3.6c30.7,0,59.4-4.2,86.3-12.5 c26.9-8.3,50.6-20.6,71-36.7c20.4-16.1,36.6-36.2,48.4-60.1c11.8-23.9,17.8-51.8,17.8-83.5C570.2,367.4,565.4,342.8,556,320.4z"/> </svg>';

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
		Vertices = Matter.Vertices,
		Svg = Matter.Svg,
		Query = Matter.Query;

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
		// Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
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

	var explosion = function(engine) {
		var bodies = Composite.allBodies(engine.world);
		for (var i = 0; i < bodies.length; i++) {
			var body = bodies[i];
			if (!body.isStatic && body.position.y >= 300) {
				var forceMagnitude = 0.05 * body.mass;
				Body.applyForce(body, body.position, {
					x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
					y: -forceMagnitude + Common.random() * -forceMagnitude
				});
			}
		}
	};

	//池
	// World.add(world, stack);
	var five;
	var vertexs = [];
	$(svg_data).find('path').each(function(i, path) {
		vertexs.push(Vertices.scale(Svg.pathToVertices(path, 30), 0.8, 0.8));
	});
	five = Bodies.fromVertices(400, 400, vertexs, {
		isStatic: true,
		render: {
			fillStyle: 'transparent',
			strokeStyle: 'transparent',
			lineWidth: 0
		}
	}, true);
	World.add(world, five);
	setTimeout(function(){
		World.add(world, Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options))
		World.remove(world, five);
		World.add(world, stack);
	}, 6000)
	setTimeout(function(){
		explosion(engine);
	}, 7000)

	//2代表两行, 280->横坐标，-3100->纵坐标
	World.add(world, Composites.stack(300, -2500, 2, 68, 3, 5, function(x, y) {
		if (Query.point([five], { x: x, y: y }).length === 0) {
			return Bodies.polygon(x, y, 6, 12, {
				frictionAir: 0.02,
				friction: 0.01,
				restitution: 0,
				render: {
					fillStyle: ["#FFFFFF", "#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 4)]
				}
			});
		}
	}));

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
			var points = Svg.pathToVertices(path, 30);
			vertexSets.push(Vertices.scale(points, 0.2, 0.2));
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
		}, 8300)

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
		}, 8000)

		Body.set(ragdoll.bodies[1], 'friction', 1)
		Body.set(ragdoll.bodies[3], 'friction', 1)
		// Body.set(ragdoll.bodies[1], 'frictionAir', 1)
		// ropeC.constraints[2].length = 160
	});

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