var svg_data = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 800 600" style="enable-background:new 0 0 800 600;" xml:space="preserve"> <path d="M556,320.4c-9.4-22.3-22.7-41.3-39.9-56.9c-17.2-15.6-37.4-27.3-60.5-35.1c-23.1-7.8-48.1-11.7-75-11.7 c-2.7,0-5.8,0.1-9.3,0.4c-3.5,0.3-7.1,0.4-10.9,0.4c-4.3,0.5-8.6,0.8-12.9,0.8V109.4h201.7V11h-10v88.4H337.5v128.9h10 c4.5,0,9.1-0.3,13.5-0.8c3.9,0,7.6-0.2,11.1-0.4c3.2-0.2,6.1-0.4,8.5-0.4c25.7,0,49.8,3.8,71.8,11.2c21.7,7.3,40.9,18.4,57,33 c16,14.5,28.6,32.5,37.4,53.4c8.8,21,13.3,44.5,13.3,69.9c0,30-5.6,56.6-16.7,79.1c-11.1,22.5-26.5,41.6-45.6,56.7 c-19.4,15.3-42.2,27.1-67.8,35c-25.8,8-53.9,12.1-83.4,12.1c-11.2,0-23.4-1.2-36.2-3.5c-13-2.3-26.1-5.3-38.7-8.7 c-12.6-3.4-24.3-7.2-34.9-11.4c-6.9-2.7-13.2-5.3-18.7-7.8l26.2-65c8.9,4.2,20.1,8.6,34,13.3c20,6.8,41.3,10.2,63.3,10.2 c18.6,0,36.1-2.3,52-6.8c16.1-4.6,30.3-11.4,42.3-20.1c12.2-8.9,21.9-20.1,28.8-33.3c6.9-13.2,10.4-28.4,10.4-45 c0-32.8-13.2-59-39.2-77.9c-25-18.1-62.4-27.3-111.2-27.3c-5.9,0-12.8,0.1-20.9,0.4c-7.9,0.3-15.5,0.7-22.6,1.2 c-4.6,0.3-9.4,0.5-14.3,0.7V11h-10v295.3c8.6,0,16.9-0.3,25-0.8c7-0.5,14.4-0.9,22.2-1.2c7.8-0.3,14.7-0.4,20.6-0.4 c46.8,0,81.9,8.5,105.3,25.4c23.4,16.9,35.1,40.2,35.1,69.8c0,15.1-3.1,28.5-9.3,40.3c-6.2,11.8-14.8,21.8-25.8,29.9 c-11,8.1-24.1,14.3-39.1,18.6c-15.1,4.3-31.5,6.5-49.2,6.5c-21,0-41-3.2-60.1-9.7c-19.1-6.5-33.2-12.4-42.4-17.8l-33.9,83.9 c7.5,3.8,16.8,7.8,27.8,12.1c11,4.3,23,8.2,35.9,11.7s26.1,6.5,39.5,8.9c13.4,2.4,26.1,3.6,37.9,3.6c30.7,0,59.4-4.2,86.3-12.5 c26.9-8.3,50.6-20.6,71-36.7c20.4-16.1,36.6-36.2,48.4-60.1c11.8-23.9,17.8-51.8,17.8-83.5C570.2,367.4,565.4,342.8,556,320.4z"/> </svg>';

var Example = Example || {};
Example.five = function() {
	var Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Composites = Matter.Composites,
		Common = Matter.Common,
		MouseConstraint = Matter.MouseConstraint,
		Mouse = Matter.Mouse,
		World = Matter.World,
		Query = Matter.Query,
		Svg = Matter.Svg,
		Bodies = Matter.Bodies;

	// create engine
	var engine = Engine.create(),
		world = engine.world;

	// create renderer
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			wireframes: false,
			background: 'transparent',
			width: Math.min(document.documentElement.clientWidth, 800),
			height: Math.min(document.documentElement.clientHeight, 600)
		}
	});

	Render.run(render);

	// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);

	// add bodies
	var five;
	var vertexSets = [];

	$(svg_data).find('path').each(function(i, path) {
		vertexSets.push(Svg.pathToVertices(path, 20));
	});

	five = Bodies.fromVertices(400, 500, vertexSets, {
		isStatic: true,
		render: {
			fillStyle: 'transparent',
			strokeStyle: 'transparent',
			lineWidth: 0
		}
	}, true);

	World.add(world, five);

	var massVal = 0.02,
		timeScaleVal = 0.6,
		radiusVal = 15,
		scaleoffest = 0.75;
	World.add(world, Composites.stack(280, -3800, 2, 110, 3, 5, function(x, y) {
		if (Query.point([five], { x: x, y: y }).length === 0) {
			return Bodies.polygon(x, y, 6, 12, {
				// frictionAir: .02,
				// friction: 0.01,
				// restitution: 0,
				timeScale: timeScaleVal,
				mass: massVal,
				render: {
					fillStyle: ["#FFFFFF", "#4285F4", "#EA4335", "#FBBC05", "#34A853"][Math.round(Math.random() * 4)]
				}
			});
		}
	}));
	// fit the render viewport to the scene
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 800 }
	});

	function enginRun() {
		window.requestAnimationFrame(enginRun);
		Engine.update(engine, 1000 / 600, 1);
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

// five()