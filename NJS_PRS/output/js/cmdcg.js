var cmdcAlert=function(e){var t={closeAll:!1,content:"",buttons:{}},o=$.extend(t,e),r={},a=$('<div class="simpleAlert">'),n=$('<div class="simpleAlertShelter">'),i=$('<div class="simpleAlertBody">'),l=$('<img class="simpleAlertBodyClose" height="14" width="14"/>');$('<p class="simpleAlertBodyContent">'+o.content+"</p>");return r.init=function(){for(var e=0,t=!1,r=[],l=0;l<2;l++)for(var d in o.buttons)switch(l){case 0:r.push(d);break;case 1:t=r.length<=1,e++;var s=$('<a class="simpleAlertBtn simpleAlertBtn'+e+'"></a>'),c=$('<div class="simpleAlertFlash"></div>');s.bind("click",o.buttons[d]),i.bind("click",o.buttons[d]),c.bind("click",o.buttons[d]),i.append(s)}a.append(n).append(i).append(c),$("body").append(a),i.show().animate({opacity:"1"},350)},l.bind("click",function(){o.closeAll=!1,r.close()}),r.close=function(){o.closeAll?$(".simpleAlert").remove():i.animate({marginTop:"-188px",opacity:"0"},200,function(){$(".simpleAlert").last().remove()})},r.init(),r},CMDCG=CMDCG||{};CMDCG["do"]=function(){function e(){CMDCG["do"].raf=window.requestAnimationFrame(e),t.update(D,5)}var t=Matter.Engine,o=Matter.Render,r=Matter.Runner,a=Matter.Body,n=Matter.Composite,i=Matter.Composites,l=Matter.Common,d=Matter.Constraint,s=Matter.MouseConstraint,c=Matter.Mouse,C=Matter.World,m=Matter.Events,p=Matter.Bodies,u=(Matter.Vertices,Matter.Svg,Matter.Query,Matter.Sleeping,CMDC.clearSource),g=CMDC.timeout,M=CMDC.playAgain,b=CMDC.sourceLinkRoot,f=CMDC.tmallLink;CMDCG["do"].disappearSTO={},CMDCG["do"].sto1={},CMDCG["do"].sto1p5={},CMDCG["do"].sto0p3={},CMDCG["do"].sto1p8={},CMDCG["do"].sto0p2={},CMDCG["do"].sto1p2={},CMDCG["do"].sto2={},CMDCG["do"].clicked=!1,CMDCG["do"].redAlertShow=!1,CMDCG["do"].ragdollMove=!1,CMDCG["do"].raf={},CMDCG["do"].engineCallback={},CMDCG["do"].createRagdoll=function(e,t,o,r,i){var s=.8,c=.6;o="undefined"==typeof o?1:o;var C=l.extend({label:"chest",collisionFilter:{group:a.nextGroup(!0)},chamfer:{radius:[10*o,10*o,16*o,16*o]},render:{visible:!1},frictionAir:0},r),m=l.extend({label:"left-arm",collisionFilter:{group:a.nextGroup(!0)},chamfer:{radius:10*o},render:{fillStyle:"#bdbabb",visible:!1,sprite:{xScale:c,yScale:c,texture:b+"img/left-upper-arm.png"}},timeScale:s},r),u=l.extend({},m,{label:"left-lower-arm",render:{fillStyle:"#cfcdd2",visible:!1,sprite:{xScale:c,yScale:c,texture:b+"img/left-bottom-arm.png"}},chamfer:{radius:6*o}}),g=l.extend({label:"right-arm",collisionFilter:{group:a.nextGroup(!0)},chamfer:{radius:10*o},render:{fillStyle:"#bdbabb",visible:!1,sprite:{xScale:c,yScale:c,texture:b+"img/right-upper-arm.png"}},timeScale:s},r),M=l.extend({},g,{label:"right-lower-arm",render:{fillStyle:"#cfcdd2",visible:!1,sprite:{xScale:c,yScale:c,texture:b+"img/right-bottom-arm.png"}},chamfer:{radius:6*o}}),f=p.rectangle(e,t,70*o,25*o,C),D=p.rectangle(e+45*o,t-10*o,17*o,54*o,g),G=p.rectangle(e+45*o,t+20*o,14*o,86*o,M),h=p.rectangle(e-45*o,t-10*o,17*o,54*o,m),v=p.rectangle(e-45*o,t+20*o,14*o,86*o,u),S=d.create({label:"CHEST_TO_RIGHT_UPPER",bodyA:f,pointA:{x:24*o,y:0},pointB:{x:-5,y:-45*o},bodyB:D,angularStiffness:.4,length:0,render:{anchors:!1,visible:!1}}),y=d.create({label:"CHEST_TO_LEFT_UPPER",bodyA:f,pointA:{x:-24*o,y:0},pointB:{x:5,y:-45*o},bodyB:h,angularStiffness:.4,length:0,render:{anchors:!1,visible:!1}}),x=d.create({label:"UPPER_TO_LOWER_RIGHT",bodyA:D,bodyB:G,pointA:{x:0,y:20*o},pointB:{x:-8,y:-38*o},angularStiffness:1,render:{visible:!1,anchors:!1},length:0}),A=d.create({label:"UPPER_TO_LOWER_LEFT",bodyA:h,bodyB:v,pointA:{x:0,y:20*o},pointB:{x:8,y:-38*o},angularStiffness:1,render:{visible:!1,anchors:!1},length:0});return n.create({bodies:[f,v,h,G,D],constraints:[A,x,y,S]})},CMDCG["do"].createStacks=function(e){var t=.05,o=.6,r=15,a=.65,n="stack";return i.stack(e.x,e.y,e.columns,e.rows,0,0,function(e,i){return l.random()<.3?p.rectangle(e+25*l.random(),i+5*l.random(),36,46,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/rred.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.3&&l.random()<.6?p.rectangle(e+25*l.random(),i+l.random(),36,46,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/pred.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.6&&l.random()<.65?p.rectangle(e+25*l.random(),i+15*l.random(),30,40,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/ggift.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.65&&l.random()<.7?p.rectangle(e+25*l.random(),i+15*l.random(),30,40,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/pgift.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.7&&l.random()<.75?p.rectangle(e+25*l.random(),i+4*l.random(),30,40,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/bgift.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.75&&l.random()<.8?p.rectangle(e+25*l.random(),i+4*l.random(),30,44,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/obag.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.8&&l.random()<.85?p.rectangle(e+25*l.random(),i+3*l.random(),30,44,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"img/pbag.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):l.random()>.85&&l.random()<.9?p.rectangle(e+25*l.random(),i+44*l.random(),30,44,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"/img/rbag.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)}):p.rectangle(e+25*l.random(),i+4*l.random(),30,44,{label:n,render:{sprite:{xScale:a,yScale:a,texture:b+"/img/rred.png"}},chamfer:{radius:r},timeScale:o,mass:t,angle:-Math.PI*l.random(0,1)})})},CMDCG["do"].setVisible=function(){O.render.visible=!0;for(var e=0;e<I.bodies.length;e++)I.bodies[e].render.visible=!0;for(var t=0;t<F.bodies.length;t++){var o=F.bodies[t];"chest"!==o.label&&(o.render.visible=!0)}},CMDCG["do"].openNewWindow=function(e,t){var o=document.createElement("a");o.setAttribute("href",e),o.setAttribute("target","blank"),o.setAttribute("id",t),document.getElementById(t)||document.body.appendChild(o),o.click()},CMDCG["do"].clickFun=function(e){if(!CMDCG["do"].clicked&&CMDCG["do"].ragdollMove){CMDCG["do"].ragdollMove=!1,CMDCG["do"].clicked=!0,O.stiffness=.005;var t=setInterval(function(){O.length>=200&&clearInterval(t),O.length+=30},80);CMDCG["do"].sto1=setTimeout(function(){L=!0,CMDCG["do"].sto1p5=setTimeout(function(){O.length=20,CMDCG["do"].sto1p8=setTimeout(function(){$(".simpleAlert").length>0||(CMDCG["do"].redAlertShow=!0,CMDCG["do"].alert=cmdcAlert({buttons:{gotmall:function(){window.open(f),CMDCG["do"].closeFun("receive"),CMDC.Interface.reportClick("click4",1)}}}),CMDCG["do"].setBodiesStatic(D,!0))},1.8*g)},1.5*g)},g),CMDC.Interface.reportClick(e)}},CMDCG["do"].closeFun=function(e){"disappear"!==e&&cmdcCookie.setToday("cmdcg",1),CMDCG["do"].disappearSTO&&clearTimeout(CMDCG["do"].disappearSTO),CMDCG["do"].sto1&&clearTimeout(CMDCG["do"].sto1),CMDCG["do"].sto1p5&&clearTimeout(CMDCG["do"].sto1p5),CMDCG["do"].sto0p3&&clearTimeout(CMDCG["do"].sto0p3),CMDCG["do"].sto1p8&&clearTimeout(CMDCG["do"].sto1p8),CMDCG["do"].sto0p2&&clearTimeout(CMDCG["do"].sto0p2),CMDCG["do"].sto1p2&&clearTimeout(CMDCG["do"].sto1p2),CMDCG["do"].sto2&&clearTimeout(CMDCG["do"].sto2),cancelAnimationFrame(CMDCG["do"].raf),setTimeout(function(){m.off(D,"beforeUpdate",CMDCG["do"].engineCallback)},g),$("body").css("overflow-y","auto"),window.scrollTo(255,0),u(),C.clear(G),$("#cm-d-c").remove(),$(".cm-dc-class").remove(),$("#cm-d-c-style").remove(),$(".simpleAlert").remove(),CMDCG["do"].unbindEvents(),CMDCG["do"].alert&&CMDCG["do"].alert.close(),CMDC.Interface.close(e)},CMDCG["do"].bindEvents=function(){$(".cm-dc-middle").bind("click mouseover mouseout",function(e){"mouseover"===e.type?CMDCG["do"].disappearSTO&&clearTimeout(CMDCG["do"].disappearSTO):"mouseout"===e.type?CMDCG["do"].disappear():"click"===e.type&&CMDCG["do"].clickFun("click1")}),$(".cm-dc-start-btn").bind("click mouseover mouseout",function(){"mouseover"===event.type?CMDCG["do"].disappearSTO&&clearTimeout(CMDCG["do"].disappearSTO):"mouseout"===event.type?CMDCG["do"].disappear():"click"===event.type&&CMDCG["do"].clickFun("click2")}),$(".cm-dc-close").bind("click",function(){!CMDCG["do"].redAlertShow&&CMDCG["do"].closeFun("exit1"),CMDCG["do"].redAlertShow&&CMDCG["do"].closeFun("exit2")})},CMDCG["do"].unbindEvents=function(){$(".cm-dc-middle").unbind("click mouseover mouseout"),$(".cm-dc-start-btn").unbind("click mouseover mouseout"),$(".cm-dc-close").unbind("click")},CMDCG["do"].setBodiesStatic=function(e,t){for(var o,r=n.allBodies(e.world),i=!1,l=!1,d=0;d<r.length;d++)o=r[d],o.position.y<=400&&!~["chest","left-arm","right-arm"].indexOf(o.label)?("stack"===o.label&&(i=!0),a.setStatic(o,t)):("left-lower-arm"===o.label||"right-lower-arm"===o.label)&&o.position.y>430&&(l=!0);i&&CMDC.Interface.reportClick("click3"),!i&&l&&CMDC.Interface.reportClick("click3")},CMDCG["do"].disappear=function(){CMDCG["do"].disappearSTO=setTimeout(function(){!CMDCG["do"].clicked&&CMDCG["do"].closeFun("disappear")},20*g)},CMDCG["do"].disappear();var D=t.create({}),G=D.world,h=o.create({element:document.body,engine:D,options:{width:1180,height:document.documentElement.clientHeight,background:"transparent",showAngleIndicator:!1,wireframes:!1}}),v=r.create(),S={isStatic:!0,background:"transparent",render:{fillStyle:"#f84851"}},y=10,x=.01;o.run(h),r.run(v,D),G.bodies=[],$("#cm-d-c").css("min-width",1180),C.add(G,[p.rectangle(400,450+y,800.5+2*y,x,S),p.rectangle(800+y,300,x,600.5+2*y,S),p.rectangle(-y,300,x,600.5+2*y,S)]);var A={x:5,y:300,columns:14,rows:1},k=CMDCG["do"].createStacks(A);C.add(G,k),CMDCG["do"].sto0p2=setTimeout(function(){C.add(G,[F,_,I]),CMDCG["do"].sto1p2=setTimeout(function(){CMDCG["do"].setVisible()},1.5*g),CMDCG["do"].sto2=setTimeout(function(){CMDCG["do"].ragdollMove=!0},2*g)},.2*g);var T=400,w=a.nextGroup(!0),B=-1,I=i.stack(T,38,1,1,0,10,function(e,t){return p.rectangle(e,t,25,15,{label:"component",collisionFilter:{group:w},chamfer:.5,render:{visible:!1,sprite:{xScale:.66,yScale:.66,texture:b+"img/connect.png"}}})}),E=p.rectangle(T,100,35,55,{label:"arm",render:{visible:!1,sprite:{xScale:.66,yScale:.66,texture:b+"img/chest.png"}}});I.bodies.push(E),i.chain(I,.5,0,-.5,0,{length:0,render:{visible:!1}}),n.add(I,d.create({label:"spring",bodyB:I.bodies[0],pointB:{x:-5,y:0},pointA:{x:I.bodies[0].position.x,y:I.bodies[0].position.y},stiffness:.009,damping:1,length:0,render:{visible:!1,lineWidth:4,strokeStyle:"#3442c7"}}));var F,P=[],O=I.constraints[1];F=CMDCG["do"].createRagdoll(400,100,1.1,{},P);var R,_=d.create({bodyA:I.bodies[I.bodies.length-1],bodyB:F.bodies[0],pointA:{x:28,y:0},pointB:{x:0,y:-5},length:0,render:{visible:!1},stiffness:1}),L=!1,U=.5,H=-.5,W=2,V=-2,q=O.pointA.x;CMDCG["do"].engineCallback=m.on(D,"beforeUpdate",function(e){if(F&&!(F.length<=0)&&(L?(M?(W+=.03,V-=.03,U+=.01,H-=.01,W>=2&&(W=2,V=-2),U>=.5&&(U=.5,H=-.5,L=!1,CMDCG["do"].ragdollMove=!0,M=!1,O.stiffness=.009)):(W-=.02,V+=.02,U-=.01,H+=.01,W<=.75&&(W=.75,V=-.75),U<=-.95&&(U=-.95,H=.95)),a.setAngle(F.bodies[1],U),a.setAngle(F.bodies[2],W),a.setAngle(F.bodies[3],H),a.setAngle(F.bodies[4],V)):(a.setAngle(F.bodies[1],.5),a.setAngle(F.bodies[2],2.2),a.setAngle(F.bodies[3],-.5),a.setAngle(F.bodies[4],-2.2)),CMDCG["do"].ragdollMove)){if(B+=.0135,B<0)return;R=q+200*Math.sin(B),CMDCG["do"].clicked||(O.pointA.x=R)}});var N=c.create(h.canvas);s.create(D,{mouse:N,constraint:{stiffness:.2,render:{visible:!1}}});return h.mouse=N,o.lookAt(h,{min:{x:0,y:0},max:{x:800,y:600}}),e(),CMDCG["do"].bindEvents(),CMDC.Interface.reportShow("winpop"),{engine:D,runner:v,render:h,canvas:h.canvas,stop:function(){Matter.Render.stop(h),Matter.Runner.stop(v)}}};