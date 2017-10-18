
var svg_data = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 800 600" style="enable-background:new 0 0 800 600;" xml:space="preserve"> <path d="M556,320.4c-9.4-22.3-22.7-41.3-39.9-56.9c-17.2-15.6-37.4-27.3-60.5-35.1c-23.1-7.8-48.1-11.7-75-11.7 c-2.7,0-5.8,0.1-9.3,0.4c-3.5,0.3-7.1,0.4-10.9,0.4c-4.3,0.5-8.6,0.8-12.9,0.8V109.4h201.7V11h-10v88.4H337.5v128.9h10 c4.5,0,9.1-0.3,13.5-0.8c3.9,0,7.6-0.2,11.1-0.4c3.2-0.2,6.1-0.4,8.5-0.4c25.7,0,49.8,3.8,71.8,11.2c21.7,7.3,40.9,18.4,57,33 c16,14.5,28.6,32.5,37.4,53.4c8.8,21,13.3,44.5,13.3,69.9c0,30-5.6,56.6-16.7,79.1c-11.1,22.5-26.5,41.6-45.6,56.7 c-19.4,15.3-42.2,27.1-67.8,35c-25.8,8-53.9,12.1-83.4,12.1c-11.2,0-23.4-1.2-36.2-3.5c-13-2.3-26.1-5.3-38.7-8.7 c-12.6-3.4-24.3-7.2-34.9-11.4c-6.9-2.7-13.2-5.3-18.7-7.8l26.2-65c8.9,4.2,20.1,8.6,34,13.3c20,6.8,41.3,10.2,63.3,10.2 c18.6,0,36.1-2.3,52-6.8c16.1-4.6,30.3-11.4,42.3-20.1c12.2-8.9,21.9-20.1,28.8-33.3c6.9-13.2,10.4-28.4,10.4-45 c0-32.8-13.2-59-39.2-77.9c-25-18.1-62.4-27.3-111.2-27.3c-5.9,0-12.8,0.1-20.9,0.4c-7.9,0.3-15.5,0.7-22.6,1.2 c-4.6,0.3-9.4,0.5-14.3,0.7V11h-10v295.3c8.6,0,16.9-0.3,25-0.8c7-0.5,14.4-0.9,22.2-1.2c7.8-0.3,14.7-0.4,20.6-0.4 c46.8,0,81.9,8.5,105.3,25.4c23.4,16.9,35.1,40.2,35.1,69.8c0,15.1-3.1,28.5-9.3,40.3c-6.2,11.8-14.8,21.8-25.8,29.9 c-11,8.1-24.1,14.3-39.1,18.6c-15.1,4.3-31.5,6.5-49.2,6.5c-21,0-41-3.2-60.1-9.7c-19.1-6.5-33.2-12.4-42.4-17.8l-33.9,83.9 c7.5,3.8,16.8,7.8,27.8,12.1c11,4.3,23,8.2,35.9,11.7s26.1,6.5,39.5,8.9c13.4,2.4,26.1,3.6,37.9,3.6c30.7,0,59.4-4.2,86.3-12.5 c26.9-8.3,50.6-20.6,71-36.7c20.4-16.1,36.6-36.2,48.4-60.1c11.8-23.9,17.8-51.8,17.8-83.5C570.2,367.4,565.4,342.8,556,320.4z"/> </svg>';

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

	//构造物品
	DC.do.createStacks = function(){
		return Composites.stack(-60, 0, 24, 6, 0, 0, function(x, y) {
			if (Common.random() < 0.05) {
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 28, 18, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: sourceLinkRoot + 'img/double11_1.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			}
			else if(Common.random() > 0.05 && Common.random() < 0.1){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*30, 26, 26, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/f8e6bdd1572a5e8a2e2f73d8c52b1bf6.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.1 && Common.random() < 0.15){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 24, 32, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: sourceLinkRoot + 'img/red.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.15 && Common.random() < 0.2){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 26, 26, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: sourceLinkRoot + 'img/gift.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			}  else if(Common.random() > 0.2 && Common.random() < 0.25){
				return Bodies.circle(x+Common.random()*15, y+Common.random()*5, 18, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: sourceLinkRoot + 'img/coin.png'
						}
					},
					friction: 0.7
				});
			} else if(Common.random() > 0.25 && Common.random() < 0.3){
				return Bodies.circle(x+Common.random()*15, y+Common.random()*10, 14, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: sourceLinkRoot + 'img/duck.png'
						}
					},
					friction: 0.7
				});
			}else if(Common.random() > 0.3 && Common.random() < 0.35){
				return Bodies.circle(x+Common.random()*15, y+Common.random()*5, 18, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/bd2bd1fb94a20ca2f9eea1088925050a.png'
						}
					},
					friction: 0.7
				});
			}else if(Common.random() > 0.35 && Common.random() < 0.4){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 30, 40, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/24af186e46de0d872942ef2709f83b71.gif'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.4 && Common.random() < 0.45){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*45, 40, 20, {
					render: {
						sprite: {
							xScale: 0.5,
							yScale: 0.5,
							texture: '//act.cmcmcdn.com/upload/201710/2a126249ff498557a38cc920a64481c7.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.45 && Common.random() < 0.5){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*40, 30, 25, {
					render: {
						sprite: {
							xScale: 0.7,
							yScale: 0.7,
							texture: sourceLinkRoot + 'img/10.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.5 && Common.random() < 0.55){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*32, 40, 25, {
					render: {
						sprite: {
							xScale: 0.7,
							yScale: 0.7,
							texture: sourceLinkRoot + 'img/500.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.55 && Common.random() < 0.6){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*44, 40, 25, {
					render: {
						sprite: {
							xScale: 0.7,
							yScale: 0.7,
							texture: sourceLinkRoot + '/img/100.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.6 && Common.random() < 0.65){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*21, 65, 25, {
					render: {
						sprite: {
							xScale: 0.7,
							yScale: 0.7,
							texture: sourceLinkRoot + '/img/10000.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.65 && Common.random() < 0.7){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*29, 30, 25, {
					render: {
						sprite: {
							xScale: 0.7,
							yScale: 0.7,
							texture: sourceLinkRoot + '/img/50.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.7 && Common.random() < 0.75){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 30, 30, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/25cd325bae7818e30a4d4676ec0880bf.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			} else if(Common.random() > 0.75 && Common.random() < 0.8){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 30, 30, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/c1fede413fbd7b3de23a771472e67d29.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			}else if(Common.random() > 0.8 && Common.random() < 0.85){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 30, 30, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/9de67782c268517089e6d031af85405c.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			}else if(Common.random() > 0.85 && Common.random() < 0.9){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 30, 30, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/45991158829180f3a86597a0ef781c3a.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			}else if(Common.random() > 0.95 && Common.random() < 1){
				return Bodies.rectangle(x+Common.random()*15, y+Common.random()*15, 30, 30, {
					render: {
						sprite: {
							xScale: 0.8,
							yScale: 0.8,
							texture: '//act.cmcmcdn.com/upload/201710/328c7178f239ce35264850419510b3be.png'
						}
					},
					chamfer: { radius: 5 },
					friction: 0.7
				});
			}else {
				return Bodies.circle(x+Common.random()*15, y+Common.random()*15, 18, {
					render: {
						sprite: {
							xScale: 0.7,
							yScale: 0.7,
							texture: sourceLinkRoot + 'img/liebao.png'
						}
					},
					friction: 0.7
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

	var ragdollShow = false, ragdollMove = false;
	// create engine
	var engine = Engine.create({
			// enableSleeping: true
		}),
		world = engine.world,
		timeout = 1000

	// create renderer
	// 整个屏幕所占用的大小
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
			// width: Math.max(document.documentElement.clientWidth, 1000),
			// height: Math.max(document.documentElement.clientHeight, 800),
			background: 'transparent',
			showAngleIndicator: false,
			wireframes: false
		}
	});

	Render.run(render);

	// create runner
	var runner = Runner.create();
	Runner.run(runner, engine);

	// add bodies
	var options = {
		isStatic: true,
		render: {
			fillStyle: '#c6c6c6'
		}
	};

	world.bodies = [];

	//设置运行范围
	$('#d-c').css('min-width', document.documentElement.clientWidth)
	var width = document.documentElement.clientWidth,
		height = document.documentElement.clientHeight,
		offset = width* 0.2;
	var range = Bodies.rectangle(0, height*0.62, width*3, 0.01, options);
	// range = Bodies.rectangle(0, height-offset, width+offset, 48, options);
	World.add(world, [
		range,
		// Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options), //上
		// Bodies.rectangle(0, 600 + offset, 800.5 + 2 * offset, 50.5, options), //下
		// Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options), //右
		// Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)  //左
	]);
	var dblChoseAlert, clicked = false,
		clickFun = function() {
			if(clicked){
				$('#switch1').prop("checked", false)
				return
			}
			ragdollMove = false
			clicked = true
			//禁止鼠标操作
			// World.remove(world, mouseConstraint);
			//弹簧伸长
			spring.length = 280
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
									playAgain = true;
									$('#switch1').prop("checked", true)
									dblChoseAlert.close();
								},
								"退出": function () {
									dblChoseAlert.close();
									World.clear(world)
									$('#d-c').remove()
								}
							}
						})
					}, timeout * 3)
				}, timeout * 3)
			}, timeout)
		}
	$('.start-btn').click(clickFun)

	var stack = DC.do.createStacks();
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

	//物品池
	World.add(world, stack);
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
	var explosion = function(engine) {
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
	};
	setTimeout(function(){
		explosion(engine);
	}, timeout* 1.2)

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
			collisionFilter: { group: group },
			chamfer: 0.5, //节点的四角弧度
			render: {
				sprite: {
					xScale: 0.6,
					yScale: 0.6,
					texture: sourceLinkRoot + 'img/component.png'
				}
			}
		});
	});

	var arm = Bodies.rectangle(400, 100, 40, 25, {
		render: {
			strokeStyle: '#3c3f41',
			sprite: {
				xScale: 0.8,
				yScale: 0.8,
				texture: sourceLinkRoot + 'img/arm.png'
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
		label: 'spring',
		bodyB: ropeC.bodies[0],
		pointB: { x: -20, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		stiffness: 0.01, //弹簧, 0是线
		damping: 1,
		length: 10,
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
	ragdoll = DC.do.ragdoll(400, 100, 1.1, {}, vertexSets);
	var ragdollConstraint = Constraint.create({
		bodyA: ropeC.bodies[ropeC.bodies.length-1],
		bodyB: ragdoll.bodies[0],
		pointA: { x: 28, y: 0 },
		pointB: { x: 0, y: -7 }, //爪子的连接位置
		length: 0,
		render: {
			visible: false,
		}
	});

	//爪子出现
	setTimeout(function(){
		World.add(world, [ropeC, ragdoll, ragdollConstraint]);
		//开始按钮出现
		$('.start-btn').css('display', 'block');
		ragdollShow = true
		setTimeout(function(){
			ragdollMove = true
		}, timeout)
	}, timeout*5)

	var catched = false,
		x = 0.5, y = -0.5,
		i = 3.5, j = -3.5,
		spring_x = spring.pointA.x, springPx;

	Events.on(engine, 'beforeUpdate', function(event) {
		if(!ragdoll || ragdoll.length <= 0) return
		//初始爪子状态
		if(!catched){
			Body.setAngle(ragdoll.bodies[1], 0.5); //左上
			Body.setAngle(ragdoll.bodies[2], 3.3); //左下
			Body.setAngle(ragdoll.bodies[3], -0.5); //右上
			Body.setAngle(ragdoll.bodies[4], -3.3); //右下
		}else{
			if(playAgain){
				i += 0.03;j -= 0.03;x += 0.01;y -= 0.01
				if(i >= 3.5) {
					i = 3.5;j = -3.5;
				}
				if(x >= 0.5){
					x = 0.5; y = -0.5;
					catched = false;
					ragdollMove = true;
					playAgain = false;
					clicked = false;
					World.add(world, mouseConstraint);
				}
			}else{
				i -= 0.02;j += 0.02;x -= 0.01;y += 0.01
				if(i <= 1.2) {
					i = 1.2;j = -1.2;
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
			counter += 0.012
			if (counter < 0) return
			springPx = spring_x + 250 * Math.sin(counter);
			!clicked && (spring.pointA.x = springPx)
		}
	});

	// Events.on(render, 'afterRender', function() {
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
	// 	context.lineWidth = 0.5;
	// 	// context.stroke();
	// 	for (var i = 0; i < collisions.length; i++) {
	// 		var collision = collisions[i];
	// 		// Sleeping.set(collision.bodyA, false)
	// 		context.rect(collision.bodyA.position.x - 4.5, collision.bodyA.position.y - 4.5, 8, 8);
	// 	}
	// 	// context.fillStyle = 'rgba(255,165,0,0.7)';
	// 	// context.fill();
	// 	Render.endViewTransform(render);
	// });

	// add mouse control
	var mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 1,  //0-鼠标不能捕获
				render: {
					visible: false
				}
			}
		});

	World.add(world, mouseConstraint);

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
	});

	// keep the mouse in sync with rendering
	render.mouse = mouse;

	// fit the render viewport to the scene
	// 可控制空间所占用的大小
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 600 }
	});

	//关闭按钮事件
	$('.d-c-close').click(function(){
		World.clear(world)
		$('#d-c').remove()
	})

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

//爪子构造
//捉住有两个因素，1.改变节点角度，2.改变摩擦力
DC.do.ragdoll = function(x, y, scale, options, vertexSets) {
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
			radius: [10 * scale, 10 * scale, 16 * scale, 16 * scale]
		},
		render: {
			sprite: {
				xScale: 0.7,
				yScale: 0.7,
				texture: sourceLinkRoot + 'img/chest.png'
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
			fillStyle: '#bdbabb'
		},
	}, options);

	var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
		label: 'left-lower-arm',
		render: {
			fillStyle: '#cfcdd2'
		},
		friction: 0.7
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
		}
	}, options);

	var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
		label: 'right-lower-arm',
		render: {
			fillStyle: '#cfcdd2'
		},
		stiffness: 1,
		friction: 0.7
	});

	var chest = Bodies.rectangle(x, y, 45 * scale, 30 * scale, chestOptions);
	var rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 18 * scale, 54 * scale, rightArmOptions);
	var rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 16 * scale, 78 * scale, rightLowerArmOptions);
	var leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 18 * scale, 54 * scale, leftArmOptions);
	var leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 16 * scale, 78 * scale, leftLowerArmOptions);
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
		// angularStiffness: 0.3, //跟上部分爪子的硬度有关
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
		// angularStiffness: 0.3,
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
			y: -32 * scale
		},
		stiffness: 0.6,
		angularStiffness: 1.2,  //节点的角硬度
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
			y: -32 * scale
		},
		stiffness: 0.6,
		angularStiffness: 1.2,
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
