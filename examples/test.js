var svg_data = '<?xml version="1.0" encoding="utf-8"?>\n' +
	'<!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n' +
	'<svg version="1.1" id="图层_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
	'\t viewBox="0 0 406 239.5" style="enable-background:new 0 0 406 239.5;" xml:space="preserve">\n' +
	'<path d="M254.5,62.5h-93c-42.6,0-50.6-9.6-55.9-16c-0.7-0.9-1.4-1.7-2.1-2.4C97.4,38,80.3,17.9,76.3,12.9c-0.5-0.6-5-6-13.3-9.8\n' +
	'\tl1.2-2.7c6.8,3.1,12.1,7.7,14.4,10.6c3.9,4.9,20.9,24.9,26.9,30.9c0.8,0.8,1.5,1.7,2.3,2.6c4.9,5.9,12.4,14.9,53.6,14.9h93\n' +
	'\tc27.2,0,34.8-5.4,52.9-26.5c1.8-2.1,3.5-4.2,5.3-6.2c9.3-11.1,18.1-21.7,29.4-27.1l1.3,2.7c-10.7,5.1-19.3,15.4-28.4,26.3\n' +
	'\tc-1.7,2.1-3.5,4.2-5.3,6.3C291.8,55.8,283.6,62.5,254.5,62.5z"/>\n' +
	'<path d="M366.5,239.5h-329C13,239.5,2,233.1,2,195C2,157.5,0,66.9,0,66l0-22c0-9.2,1.4-22.8,13.6-33.9l2,2.2C4.3,22.6,3,35.3,3,44\n' +
	'\tv22c0,0.9,2,91.4,2,129c0,37.4,10.4,41.5,32.5,41.5h329c34.5,0,34.5-18.2,34.5-37.5c0-8.8,0.6-51.5,1.1-89.3\n' +
	'\tC402.6,78.5,403,49,403,44c0-12.9-4.2-23.4-12.4-31.3l2.1-2.2C401.4,18.9,406,30.5,406,44c0,5-0.4,34.5-0.9,65.8\n' +
	'\tc-0.5,37.7-1.1,80.5-1.1,89.2C404,218,404,239.5,366.5,239.5z"/>\n' +
	'</svg>\n';

var Example = Example || {};
Example.five = function() {
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

	var engine = Engine.create(),
		world = engine.world,
		runner = Runner.create(),
		vertices,
		vertexSets = [],
		stacks,
		render = Render.create({
			element: document.body,
			engine: engine,
			options: {
				wireframes: false,
				background: 'transparent',
				width: 1400,
				height: 800
			}
		});

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
					var forceMagnitude = 0.04* body.mass;
					Body.applyForce(body, body.position, {
						x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
						y: -forceMagnitude + Common.random() * -forceMagnitude
					});
				}
			}
		}
	};

	Render.run(render);
	Runner.run(runner, engine);

	$(svg_data).find('path').each(function(i, path) {
		vertexSets.push(Svg.pathToVertices(path, 10));
	});

	vertices = Bodies.fromVertices(400, 350, vertexSets, {
		isStatic: true,
		render: {
			fillStyle: 'transparent',
			strokeStyle: 'transparent',
			lineWidth: 0
		}
	}, true);

	var body1 = Bodies.circle(370, 260, 20, { isStatic: true })
	var body2 = Bodies.circle(452, 260, 20, { isStatic: true })

	var body3 = Bodies.circle(263, 220, 18, { isStatic: true })
	var body4 = Bodies.circle(339, 220, 18, { isStatic: true })
	var body5 = Bodies.circle(413, 220, 18, { isStatic: true })
	var body6 = Bodies.circle(491, 220, 18, { isStatic: true })
	var body7 = Bodies.circle(570, 220, 18, { isStatic: true })

	var body8 = Bodies.circle(308, 180, 12, { isStatic: true })
	var body9 = Bodies.circle(370, 165, 12, { isStatic: true })
	var body10 = Bodies.circle(455, 165, 12, { isStatic: true })
	var body11 = Bodies.circle(524, 180, 12, { isStatic: true })

	var body12 = Bodies.circle(173, 230, 12, { isStatic: true })
	var body13 = Bodies.circle(170, 281, 18, { isStatic: true })
	var body14 = Bodies.circle(120, 315, 12, { isStatic: true })
	var body15 = Bodies.circle(160, 355, 18, { isStatic: true })

	var body16 = Bodies.circle(638, 230, 12, { isStatic: true })
	var body17 = Bodies.circle(644, 281, 18, { isStatic: true })
	var body18 = Bodies.circle(698, 315, 12, { isStatic: true })
	var body19 = Bodies.circle(660, 355, 18, { isStatic: true })

	stacksLeft = Composites.stack(230, -3000, 1, 63, 3, 5, function(x, y, column, row, lastBody, i) {
		if (Query.point([vertices], { x: x, y: y }).length === 0) {
			return Bodies.polygon(x, y, 8, 14, {
				label: 'stack',
				frictionAir: .02,
				friction: 0.01,
				restitution: 0.001,  //恢复原状
				mass: 0.3,
				timeScale: 0.9,
				render: {
					fillStyle: [ "#4285F4", "#EA4335", "#FBBC05", "#FFFFFF", '#66DD00'][Math.round(Math.random() * 4)]
				}
			});
		}
	})
	stacksRight = Composites.stack(560, -3000, 1, 63, 3, 5, function(x, y, column, row, lastBody, i) {
		if (Query.point([vertices], { x: x, y: y }).length === 0) {
			return Bodies.polygon(x, y, 8, 14, {
				label: 'stack',
				frictionAir: .02,
				friction: 0.01,
				restitution: 0.001,  //恢复原状
				mass: 0.3,
				timeScale: 0.9,
				render: {
					fillStyle: [ "#4285F4", "#EA4335", "#FBBC05", "#FFFFFF", '#66DD00'][Math.round(Math.random() * 4)]
				}
			});
		}
	})

	World.add(world, vertices);
	World.add(world, stacksLeft);
	World.add(world, stacksRight);
	World.add(world, [body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12, body13, body14, body15, body16, body17, body18, body19])

	var counter = 0
	Events.on(engine, 'afterUpdate', function(event) {
		// counter += 1;
		// if (counter === 30)
		// 	Body.setStatic(body1, true);
	})

	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 800 }
	});

	function enginRun() {
		window.requestAnimationFrame(enginRun);
		Engine.update(engine, 1000 / 60, 1);
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
	}
};

// five()