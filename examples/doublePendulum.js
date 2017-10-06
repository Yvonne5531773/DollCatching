var Example = Example || {};

Example.doublePendulum = function() {
	var Engine = Matter.Engine,
		Events = Matter.Events,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Body = Matter.Body,
		Composite = Matter.Composite,
		Composites = Matter.Composites,
		Constraint = Matter.Constraint,
		MouseConstraint = Matter.MouseConstraint,
		Mouse = Matter.Mouse,
		World = Matter.World,
		Bodies = Matter.Bodies,
		Vector = Matter.Vector;

	// create engine
	var engine = Engine.create(),
		world = engine.world;

	// create renderer
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: 800,
			height: 600,
			wireframes: false,
			background: '#0f0f13'
		}
	});

	Render.run(render);

	// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);

	// add bodies
	var group = Body.nextGroup(true),
		length = 200,
		width = 25;

	var pendulum = Composites.stack(350, 160, 2, 1, -20, 0, function(x, y) {
		return Bodies.rectangle(x, y, length, width, {
			collisionFilter: { group: group },
			frictionAir: 0,
			chamfer: 5,
			render: {
				fillStyle: 'transparent',
				lineWidth: 1
			}
		});
	});

	pendulum.bodies[0].render.strokeStyle = '#4af272';
	pendulum.bodies[1].render.strokeStyle = '#334ee6';

	world.gravity.scale = 0.002;

	Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
		stiffness: 0.9,
		length: 0,
		angularStiffness: 0.7,
		render: {
			strokeStyle: '#f00831'
		}
	});

	Composite.add(pendulum, Constraint.create({
		bodyB: pendulum.bodies[0],
		pointB: { x: -length * 0.42, y: 0 },
		pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
		stiffness: 0.9,
		length: 0,
		render: {
			strokeStyle: '#94435a'
		}
	}));

	var lowerArm = pendulum.bodies[1];

	Body.rotate(lowerArm, -Math.PI * 0.3, {
		x: lowerArm.position.x - 100,
		y: lowerArm.position.y
	});

	World.add(world, pendulum);

	var trail = [], counter = -1;
	console.log('pendulum.bodies[1]:', pendulum.bodies[1])
	Events.on(engine, 'beforeUpdate', function(event) {
		counter += 0.03;
		if (counter < 0) {
			return;
		}
		var px = 400 + 100 * Math.sin(counter);
		// Body.setVelocity(pendulum.bodies[0], { x: 100, y: 0 });
		// console.log('px', px)
		// console.log('pendulum.bodies[1].position.y', pendulum.bodies[1].position.y)
		// Body.setPosition(pendulum.bodies[0], { x: 100, y: 340 });
		// Body.setPosition(pendulum.bodies[1], { x: px, y: pendulum.bodies[1].position.y });
		// console.log('setAngle:', pendulum.bodies[1].angle)
		Body.setAngle(pendulum.bodies[1], 3);
		Body.set(pendulum.bodies[1], 'frictionAir', 1)
		console.log('pendulum.bodies[1] frictionAir:', pendulum.bodies[1].frictionAir)
		// Body.rotate(ragdoll.bodies[1], -Math.PI * 1, {
		// 		x: ragdoll.bodies[1].position.x ,
		// 		y: ragdoll.bodies[1].position.y
		// });
	});

	Events.on(render, 'afterRender', function() {
		trail.unshift({
			position: Vector.clone(lowerArm.position),
			speed: lowerArm.speed
		});

		Render.startViewTransform(render);
		render.context.globalAlpha = 0.7;

		for (var i = 0; i < trail.length; i += 1) {
			var point = trail[i].position,
				speed = trail[i].speed;

			var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
			render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
			render.context.fillRect(point.x, point.y, 2, 2);
		}

		render.context.globalAlpha = 1;
		Render.endViewTransform(render);

		if (trail.length > 2000) {
			trail.pop();
		}
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

	// keep the mouse in sync with rendering
	render.mouse = mouse;

	// fit the render viewport to the scene
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 700, y: 600 }
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