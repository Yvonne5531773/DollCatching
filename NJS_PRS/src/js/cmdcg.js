
var cmdcAlert=function(e){var t={closeAll:!1,content:"",buttons:{}},l=$.extend(t,e),n={},s=$('<div class="simpleAlert">'),i=$('<div class="simpleAlertShelter">'),c=$('<div class="simpleAlertBody">'),o=$('<img class="simpleAlertBodyClose" height="14" width="14"/>'), a=$('<p class="simpleAlertBodyContent">'+l.content+"</p>");return n.init=function(){for(var e=0,t=!1,n=[],o=0;o<2;o++)for(var p in l.buttons)switch(o){case 0:n.push(p);break;case 1:t=n.length<=1,e++;var r=$('<a class="simpleAlertBtn simpleAlertBtn'+e+'">'+"</a>");var f=$('<div class="simpleAlertFlash'+'">'+"</div>");r.bind("click", l.buttons[p]), c.bind("click", l.buttons[p]), f.bind("click", l.buttons[p]), c.append(r)}s.append(i).append(c).append(f),$("body").append(s),c.show().animate({ opacity:"1"}, 350)},o.bind("click",function(){l.closeAll=!1,n.close()}),n.close=function(){l.closeAll?$(".simpleAlert").remove():c.animate({marginTop:"-188px",opacity:"0"},200,function(){$(".simpleAlert").last().remove()})},n.init(),n};

var CMDCG = CMDCG || {};

CMDCG.do = function() {
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
		Bodies = Matter.Bodies
		// Vertices = Matter.Vertices,
		// Svg = Matter.Svg,
		// Query = Matter.Query,
		// Sleeping = Matter.Sleeping;

	var clearSource = CMDC.clearSource,
		timeout = CMDC.timeout,
		playAgain = CMDC.playAgain,
		sourceLinkRoot = CMDC.sourceLinkRoot,
		tmallLink = CMDC.tmallLink;

	CMDCG.do.disappearSTO = {}
	CMDCG.do.sto1 = {}
	CMDCG.do.sto1p5 = {}
	CMDCG.do.sto0p3 = {}
	CMDCG.do.sto1p8 = {}
	CMDCG.do.sto0p2 = {}
	CMDCG.do.sto1p2 = {}
	CMDCG.do.sto2 = {}
	CMDCG.do.clicked = false
	CMDCG.do.redAlertShow = false
	CMDCG.do.ragdollMove = false
	CMDCG.do.raf = {}
	CMDCG.do.engineCallback = {}

	//爪子构造
	//捉住有两个因素，1.改变节点角度，2.改变摩擦力
	CMDCG.do.createRagdoll = function(x, y, scale, options, vertexSets) {
		var massVal = 0.6,
			frictionAirVal = 0.01,
			timeScaleVal = 0.8,
			scaleVal = 0.6;
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
				visible: false,
			},
			mass: massVal,
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
				fillStyle: '#bdbabb',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/left-upper-arm.png'
				}
			},
			// stiffness: 0.7,
			mass: massVal,
			// frictionAir: frictionAirVal,
			timeScale: timeScaleVal
		}, options);
		var leftLowerArmOptions = Common.extend({}, leftArmOptions, {
			label: 'left-lower-arm',
			render: {
				fillStyle: '#cfcdd2',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/left-bottom-arm.png'
				}
			},
			chamfer: {
				radius: 6 * scale
			},
			mass: massVal,
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
				fillStyle: '#bdbabb',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/right-upper-arm.png'
				}
			},
			// stiffness: 0.7,
			mass: massVal,
			timeScale: timeScaleVal
		}, options);
		var rightLowerArmOptions = Common.extend({}, rightArmOptions, {
			label: 'right-lower-arm',
			render: {
				fillStyle: '#cfcdd2',
				visible: false,
				sprite: {
					xScale: scaleVal,
					yScale: scaleVal,
					texture: sourceLinkRoot + 'img/right-bottom-arm.png'
				}
			},
			chamfer: {
				radius: 6 * scale
			},
			mass: massVal,
			// friction: 0.7,
			// mass: massVal,
			// timeScale: timeScaleVal
		});
		var chest = Bodies.rectangle(x, y, 70 * scale, 25 * scale, chestOptions);
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
				x: -5,
				y: -45 * scale
			},
			bodyB: rightUpperArm,
			// stiffness: 0.8,
			angularStiffness: 0.4, //跟上部分爪子的硬度有关
			length: 0,
			render: {
				anchors: false,
				visible: false //弹簧是否显示
			},
		});
		var chestToLeftUpperArm = Constraint.create({
			label: 'CHEST_TO_LEFT_UPPER',
			bodyA: chest,
			pointA: {
				x: -24 * scale,
				y: 0
			},
			pointB: {
				x: 5,
				y: -45 * scale
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
				x: -8,
				y: -38 * scale
			},
			// stiffness: 0.6,
			angularStiffness: 1,  //节点的角硬度
			render: {
				visible: false,
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
				x: 8,
				y: -38 * scale
			},
			// stiffness: 0.6,
			angularStiffness: 1,
			render: {
				visible: false,
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
	CMDCG.do.createStacks = function(criteria){
		var massVal = 0.02,
			timeScaleVal = 0.6,
			radiusVal = 15,
			scaleoffest = 0.65,
			label = 'stack';
		return Composites.stack(criteria.x, criteria.y, criteria.columns, criteria.rows, 0, 0, function(x, y) {
			if (Common.random() < 0.3) {
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*5, 36, 46, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/rred.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1),
				});
			} else if(Common.random() > 0.3 && Common.random() < 0.6){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random(), 36, 46, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/pred.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.6 && Common.random() < 0.65){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*15, 30, 40, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/ggift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			}else if(Common.random() > 0.65 && Common.random() < 0.7){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*15, 30, 40, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/pgift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.7 && Common.random() < 0.75){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*4, 30, 40, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/bgift.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.75 && Common.random() < 0.8){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*4, 30, 44, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/obag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.8 && Common.random() < 0.85){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*3, 30, 44, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + 'img/pbag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else if(Common.random() > 0.85 && Common.random() < 0.9){
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*44, 30, 44, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + '/img/rbag.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			} else{
				return Bodies.rectangle(x+Common.random()*25, y+Common.random()*4, 30, 44, {
					label: label,
					render: {
						sprite: {
							xScale: scaleoffest,
							yScale: scaleoffest,
							texture: sourceLinkRoot + '/img/rred.png'
						}
					},
					chamfer: { radius: radiusVal },
					// friction: 0.7,
					timeScale: timeScaleVal,
					mass: massVal,
					angle: -Math.PI * Common.random(0, 1)
				});
			}
		});
	}

	//设置显示
	CMDCG.do.setVisible = function(){
		spring.render.visible = true
		for(var i = 0; i < ropeC.bodies.length; i++){
			ropeC.bodies[i].render.visible = true
		}
		for(var r = 0; r < ragdoll.bodies.length; r++){
			var body = ragdoll.bodies[r]
			body.label!=='chest' && (body.render.visible = true)
		}
	}

	CMDCG.do.openNewWindow = function(url, id){
		var a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute('target', 'blank');
		a.setAttribute('id', id);

		if(!document.getElementById(id)) {
			document.body.appendChild(a);
		}
		a.click();
	}

	CMDCG.do.clickFun = function(action) {
		if (CMDCG.do.clicked || !CMDCG.do.ragdollMove) {
			return
		}
		CMDCG.do.ragdollMove = false
		CMDCG.do.clicked = true
		//禁止鼠标操作
		// World.remove(world, mouseConstraint);
		spring.stiffness = 0.005
		//弹簧伸长
		var si = setInterval(function () {
			if (spring.length >= 200) clearInterval(si)
			spring.length += 30
		}, 80)
		//抓娃娃状态
		CMDCG.do.sto1 = setTimeout(function () {
			catched = true
			CMDCG.do.sto1p5 = setTimeout(function () {
				spring.length = 20
				//光芒出现
				// CMDCG.do.sto0p3 = setTimeout(function () {
				// 	ragdoll.bodies[0].label === 'chest' && (ragdoll.bodies[0].render.visible = true)
				// }, timeout * 0.3)
				CMDCG.do.sto1p8 = setTimeout(function () {
					//防止多次出现提示框出
					if ($('.simpleAlert').length > 0) return;
					CMDCG.do.redAlertShow = true
					CMDCG.do.alert = cmdcAlert({
						"buttons": {
							"gotmall": function () {
								// CMDCG.do.setBodiesStatic(engine, false)
								// playAgain = true;
								window.open(tmallLink)
								CMDCG.do.closeFun('receive')
								CMDC.Interface.reportClick('click5', 1)
							}
						}
					})
					CMDCG.do.setBodiesStatic(engine, true)
				}, timeout * 1.2)
			}, timeout * 1.5)
		}, timeout)
		CMDC.Interface.reportClick(action)
	}

	CMDCG.do.closeFun = function(action) {
		action !== 'disappear' && cmdcCookie.setToday('cmdcg', 1);

		CMDCG.do.disappearSTO && clearTimeout(CMDCG.do.disappearSTO)
		CMDCG.do.sto1 && clearTimeout(CMDCG.do.sto1)
		CMDCG.do.sto1p5 && clearTimeout(CMDCG.do.sto1p5)
		CMDCG.do.sto0p3 && clearTimeout(CMDCG.do.sto0p3)
		CMDCG.do.sto1p8 && clearTimeout(CMDCG.do.sto1p8)
		CMDCG.do.sto0p2 && clearTimeout(CMDCG.do.sto0p2)
		CMDCG.do.sto1p2 && clearTimeout(CMDCG.do.sto1p2)
		CMDCG.do.sto2 && clearTimeout(CMDCG.do.sto2)

		//清除事件
		cancelAnimationFrame(CMDCG.do.raf)
		setTimeout(function () {
			Events.off(engine, 'beforeUpdate', CMDCG.do.engineCallback)
		}, timeout)

		//显示scroll
		$('body').css('overflow-y', 'auto')
		//返回顶部
		window.scrollTo(255, 0)
		//清除加载的文件
		clearSource()
		World.clear(world)
		$('#cm-d-c').remove()
		$('.cm-dc-class').remove()
		$('#cm-d-c-style').remove()
		$('.simpleAlert').remove()
		CMDCG.do.unbindEvents()
		//关闭弹窗红包
		CMDCG.do.alert && CMDCG.do.alert.close()
		CMDC.Interface.close(action)
	}

	CMDCG.do.bindEvents = function(){
		//屏幕事件 点击/移入/移出
		$('.cm-dc-middle').bind('click mouseover mouseout', function(event){
			if(event.type === "mouseover"){
				CMDCG.do.disappearSTO && clearTimeout(CMDCG.do.disappearSTO)
			}else if(event.type === "mouseout"){
				CMDCG.do.disappear()
			}else if(event.type === "click"){
				CMDCG.do.clickFun('click1')
			}
		})
		//抓取按钮事件 点击/移入/移出
		$('.cm-dc-start-btn, .cm-dc-start-small-btn').bind('click mouseover mouseout', function(){
			if(event.type === "mouseover"){
				CMDCG.do.disappearSTO && clearTimeout(CMDCG.do.disappearSTO)
			}else if(event.type === "mouseout"){
				CMDCG.do.disappear()
			}else if(event.type === "click"){
				CMDCG.do.clickFun('click2')
			}
		})
		//关闭按钮事件
		$('.cm-dc-close, .cm-dc-close-small').bind('click', function(){
			//红包出现前/出现后
			!CMDCG.do.redAlertShow && CMDCG.do.closeFun('exit1')
			CMDCG.do.redAlertShow && CMDCG.do.closeFun('exit2')
		})
		//键盘事件
		document.onkeydown = function(event) {
			CMDCG.do.clickFun('click4')
		};
		//两边点击事件
		$('.cm-dc-left, .cm-dc-right').bind('click', function(){
			window.open(tmallLink)
			CMDC.Interface.reportClick('click6', 1)
		})
		$('.cm-dc-left').bind('mouseover', function(){
			$('.cm-dc-11logo-left').css('background-image', "url(" + sourceLinkRoot + "img/11logo-hover.png)")
		})
		$('.cm-dc-left').bind('mouseout', function(){
			$('.cm-dc-11logo-left').css('background-image', "url(" + sourceLinkRoot + "img/11logo.png)")
		})
		$('.cm-dc-right').bind('mouseover', function(){
			$('.cm-dc-11logo-right').css('background-image', "url(" + sourceLinkRoot + "img/11logo-hover.png)")
		})
		$('.cm-dc-right').bind('mouseout', function(){
			$('.cm-dc-11logo-right').css('background-image', "url(" + sourceLinkRoot + "img/11logo.png)")
		})
	}

	CMDCG.do.unbindEvents = function(){
		$('.cm-dc-middle').unbind('click mouseover mouseout')
		$('.cm-dc-start-btn, .cm-dc-start-small-btn').unbind('click mouseover mouseout')
		$('.cm-dc-close, .cm-dc-close-small').unbind('click')
		document.onkeydown = function(event) {};
		$('.cm-dc-left, .cm-dc-right').unbind('click mouseover mouseout')
	}

	//设置静态
	CMDCG.do.setBodiesStatic = function(engine, bool){
		var bodies = Composite.allBodies(engine.world),
			body,
			includeStack = false,
			notStatic = false;
		for (var i = 0; i < bodies.length; i++) {
			body = bodies[i]
			if (body.position.y <= 400 && !~['chest', 'left-arm', 'right-arm', ].indexOf(body.label)) {
				body.label === 'stack' && (includeStack = true)
				Body.setStatic(body, bool);
			}else if((body.label==='left-lower-arm'||body.label==='right-lower-arm') && body.position.y > 405){
				notStatic = true
			}
		}
		//判断是否抓住红包
		includeStack && CMDC.Interface.reportClick('click3')
		!includeStack && notStatic && CMDC.Interface.reportClick('click3')
	}

	//自动消失
	CMDCG.do.disappear = function(){
		CMDCG.do.disappearSTO = setTimeout(function(){
			!CMDCG.do.clicked && CMDCG.do.closeFun('disappear')
		}, timeout* 20)
	}

	CMDCG.do.disappear()

	var	engine = Engine.create({
		// positionIterations: 10,
		// velocityIterations: 10,
		// constraintIterations: 10,
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
	var offset = 10, thick = 0.01;

	Render.run(render);
	Runner.run(runner, engine);

	world.bodies = [];
	//设置运行范围
	$('#cm-d-c').css('min-width', 1180)
	World.add(world, [
		//3-厚度 4-高度
		// Bodies.rectangle(400, 50, 800.5 + 2 * offset, 10.5, options), //上
		Bodies.rectangle(400, 450 + offset, 800.5 + 2 * offset, thick, options), //下
		Bodies.rectangle(800 + offset, 300, thick, 600.5 + 2 * offset, options), //右
		Bodies.rectangle(-offset, 300, thick, 600.5 + 2 * offset, options)  //左
	]);

	//物品池, 最好不超过40个
	var	criteria = {
			x: 5,
			y: 350,
			columns: 15,
			rows: 1,
		}
	var stack = CMDCG.do.createStacks(criteria);
	World.add(world, stack);

	//爪子整体构造连接, 延迟
	CMDCG.do.sto0p2 = setTimeout(function(){
		//控制显示层级
		World.add(world, [ragdoll, ragdollConstraint, ropeC]);
		CMDCG.do.sto1p2 = setTimeout(function(){
			CMDCG.do.setVisible()
		}, timeout* 1.5)
		CMDCG.do.sto2 = setTimeout(function(){
			CMDCG.do.ragdollMove = true;
		}, timeout* 2)
	}, timeout* 0.2)

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

	//弹簧
	var changeVal = 400, armY = 10;
	var group = Body.nextGroup(true),
		counter = -1;
	//链的个数，属性
	var ropeC = Composites.stack(changeVal, armY, 1, 1, 0, 10, function(x, y) {
		return Bodies.rectangle(x, y, 25, 15, {
			label: 'component',
			collisionFilter: { group: group },
			chamfer: 0.5, //节点的四角弧度
			render: {
				visible: false,
				sprite: {
					xScale: 0.66,
					yScale: 0.66,
					texture: sourceLinkRoot + 'img/connect.png',
				}
			},
		});
	});

	var arm = Bodies.rectangle(changeVal, 100, 35, 55, {
		label: 'arm',
		render: {
			visible: false,
			sprite: {
				xScale: 0.66,
				yScale: 0.66,
				texture: sourceLinkRoot + 'img/chest.png',
			}
		},
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
		pointB: { x: -5, y: 0 },
		pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
		stiffness: 0.05, //弹簧, 0是线
		// stiffness: 0.009, //弹簧, 0是线
		damping: 1,
		length: 100,
		render: {
			visible: false,
			lineWidth: 4,
			strokeStyle: '#3442c7' //弹簧颜色
		}
	}));

	var vertexSets = [],
		spring = ropeC.constraints[1],
		ragdoll;

	//连接, 第三个参数是爪子的大小比例, (400,100)-初始位置
	ragdoll = CMDCG.do.createRagdoll(400, 100, 1.1, {}, vertexSets);
	var ragdollConstraint = Constraint.create({
		bodyA: ropeC.bodies[ropeC.bodies.length-1],
		bodyB: ragdoll.bodies[0],
		pointA: { x: 28, y: 0 },
		pointB: { x: 0, y: -5 }, //爪子的连接位置
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
	var changeImg = false
	CMDCG.do.engineCallback = Events.on(engine, 'beforeUpdate', function(event) {
		if(!ragdoll || ragdoll.length <= 0) return
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
					CMDCG.do.ragdollMove = true;
					playAgain = false;
					spring.stiffness = 0.009
				}
			}else{
				i -= 0.02;j += 0.02;x -= 0.01;y += 0.01
				if(i <= 0.75) { //值越小，上臂收缩的角度越大
					i = 0.75;j = -0.75;
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
		if(CMDCG.do.ragdollMove){
			//控制速度，值越大速度越快
			counter += 0.0135
			if (counter < 0) return
			springPx = spring_x + 200 * Math.sin(counter);
			if(!CMDCG.do.clicked){
				spring.pointA.x = springPx
			}
		}
		//动态改变底部图片大小
		if(window.innerHeight <= 800 && !changeImg){
			cmdcObj.botEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/control-small.png' + ')'
			cmdcObj.botEL.style.height = '180px'
			cmdcObj.buttonEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/button-small.png' + ')'
			cmdcObj.buttonEL.classList.contains('cm-dc-start-btn') && cmdcObj.buttonEL.classList.remove('cm-dc-start-btn');
			cmdcObj.rockerEL.classList.contains('cm-dc-rocker') && cmdcObj.rockerEL.classList.remove('cm-dc-rocker');
			cmdcObj.buttonEL.classList.toggle('cm-dc-start-small-btn');
			cmdcObj.rockerEL.classList.toggle('cm-dc-rocker-small');
			cmdcObj.rockerEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/rocker-small.png' + ')'
			cmdcObj.bottombakEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/allbodies-small.png' + ')'
			cmdcObj.bottombakEL.style.height = '215px'
			cmdcObj.closeEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/close-small.png' + ')'
			cmdcObj.closeEL.classList.contains('cm-dc-close') && cmdcObj.closeEL.classList.remove('cm-dc-close');
			cmdcObj.closeEL.classList.toggle('cm-dc-close-small');
			clearInterval(cmdcObj.si)
			cmdcObj.changeRockerSmall()
			changeImg = true
		}else if(window.innerHeight > 800 && changeImg){
			cmdcObj.botEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/control.png' + ')'
			cmdcObj.botEL.style.height = '240px'
			cmdcObj.buttonEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/button.png' + ')'
			cmdcObj.buttonEL.classList.contains('cm-dc-start-small-btn') && cmdcObj.buttonEL.classList.remove('cm-dc-start-small-btn');
			cmdcObj.rockerEL.classList.contains('cm-dc-rocker-small') && cmdcObj.rockerEL.classList.remove('cm-dc-rocker-small');
			cmdcObj.buttonEL.classList.toggle('cm-dc-start-btn');
			cmdcObj.rockerEL.classList.toggle('cm-dc-rocker');
			cmdcObj.rockerEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/rocker.png' + ')'
			cmdcObj.bottombakEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/allbodies.png' + ')'
			cmdcObj.bottombakEL.style.height = '300px'
			cmdcObj.closeEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/close.png' + ')'
			cmdcObj.closeEL.classList.contains('cm-dc-close-small') && cmdcObj.closeEL.classList.remove('cm-dc-close-small');
			cmdcObj.closeEL.classList.toggle('cm-dc-close');
			clearInterval(cmdcObj.sis)
			cmdcObj.changeRocker()
			changeImg = false
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
	// mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
	// mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
	//允许鼠标拖动
	// World.add(world, mouseConstraint);

	//爪子伸下去后增加压力
	// Events.on(mouseConstraint, 'mouseup', function(event) {
	// 	CMDCG.do.clickFun()
	// 	CMDC.Interface.reportClick('click', 2)
	// });
	render.mouse = mouse;

	// 可控制空间所占用的大小
	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 600 }
	});

	//减少引擎更新时间
	function enginRun() {
		CMDCG.do.raf = window.requestAnimationFrame(enginRun);
		Engine.update(engine, 1000 / 60, 1);
	}
	enginRun()

	//绑定事件
	CMDCG.do.bindEvents()

	//完全加载完进行展示上报
	CMDC.Interface.reportShow('winpop')

	//滚动到指定位置
	$('.link_break')[1] && window.scrollTo(255, $('.link_break')[1].offsetTop)

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
