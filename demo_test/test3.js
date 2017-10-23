
var Engine = Matter.Engine,
	World = Matter.World,
	Events = Matter.Events,
	Bodies = Matter.Bodies;
Constraint = Matter.Constraint;


var firstcoll = false;
var secondcoll = false;


// create a Matter.js engine
var engine = Engine.create(document.body, {
	render: {
		options: {
			wireframes: true,
			background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-bk2.jpg',
			//enableSleeping: true,
			//positionIterations: 1,
			//velocityIterations: 1,
			pixelRatio: 1,
			showDebug: true,
			width: 1200,
			height: 800
		}
	}
});

engine.world.bounds.max.x = Infinity;
engine.world.bounds.max.y = Infinity;
var shelfA = Bodies.rectangle(40, 200, 100, 20, { isStatic: true, mass: 1000, friction: 0.99 });
var shelfB = Bodies.rectangle(520, 200, 300, 20, { isStatic: true, mass: 1000, friction: 0.99 });

var options = { chamfer: { radius: 5 }, mass: 10, friction: 0.9 };

var tableA = Bodies.rectangle(40, 565, 100, 40, { isStatic: true, mass: 1000, friction: 0.99 });
var tableB = Bodies.rectangle(725, 565, 500, 40, { isStatic: true, mass: 1000, friction: 0.99 });

// create two boxes and a ground
var dominoBookA = Bodies.rectangle(280, 530, 20, 80, { chamfer: { radius: 5 }, mass: 50, friction: 0.3, label: 'bookA' });
var dominoBookB = Bodies.rectangle(320, 530, 20, 80, { chamfer: { radius: 5 }, mass: 50, friction: 0.3 });
var dominoBookC = Bodies.rectangle(360, 530, 20, 80, { chamfer: { radius: 5 }, mass: 50, friction: 0.3 });
var dominoBookD = Bodies.rectangle(400, 530, 20, 80, { chamfer: { radius: 5 }, mass: 50, friction: 0.3, label: 'bookD' });

var book = Bodies.rectangle(350, 560, 180, 40, { chamfer: { radius: 4 }, mass: 50, friction: 0.8 });

var ground = Bodies.rectangle(500, 600, 1000, 30, { isStatic: true, friction: 0.6 });

// add all of the bodies to the world
World.add(engine.world, [/*cellphone, switchPlay, ballA, pendulumA, ballB, pendulumB, plane, fan,*/ shelfA, shelfB, tableA, /*dominoATableA, dominoBTableA,*/ tableB, /*dominoATableB, dominoATableC,*/ book, dominoBookA, dominoBookB, dominoBookC, dominoBookD, ground/*, mixer*/]);

// run the engine
Engine.run(engine);

moveBook = function (dx) {
	Matter.Body.applyForce(book, { x: 0, y: 0 }, { x: (-0.01 * dx), y: 0 });
}

document.body.addEventListener('keydown', function (e) {
	if (e.keyCode == 39) {
		Matter.Body.applyForce(book, { x: 0, y: 0 }, { x: 1, y: 0 });
	}

	if (e.keyCode == 38) {
		//Matter.Body.rotate(dominoATableA, Math.PI * 0.1);
	}

	if (e.keyCode == 37) {
		Matter.Body.applyForce(book, { x: 0, y: 0 }, { x: -1, y: 0 });
	}

	if (e.keyCode == 40) {
		//Matter.Body.applyForce(plane, { x: 0, y: 0 }, { x: 0.04, y: -0.02 });
	}
});