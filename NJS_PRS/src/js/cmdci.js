!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Matter=e()}}(function(){return function e(t,n,o){function i(s,a){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(r)return r(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[s]={exports:{}};t[s][0].call(d.exports,function(e){var n=t[s][1][e];return i(n?n:e)},d,d.exports,e,t,n,o)}return n[s].exports}for(var r="function"==typeof require&&require,s=0;s<o.length;s++)i(o[s]);return i}({1:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vertices"),r=e("../geometry/Vector"),s=e("../core/Sleeping"),a=(e("../render/Render"),e("../core/Common")),l=e("../geometry/Bounds"),c=e("../geometry/Axes");!function(){o._inertiaScale=4,o._nextCollidingGroupId=1,o._nextNonCollidingGroupId=-1,o._nextCategory=1,o.create=function(t){var n={id:a.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:i.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0},lineWidth:0}},o=a.extend(n,t);return e(o,t),o},o.nextGroup=function(e){return e?o._nextNonCollidingGroupId--:o._nextCollidingGroupId++},o.nextCategory=function(){return o._nextCategory=o._nextCategory<<1,o._nextCategory};var e=function(e,t){t=t||{},o.set(e,{bounds:e.bounds||l.create(e.vertices),positionPrev:e.positionPrev||r.clone(e.position),anglePrev:e.anglePrev||e.angle,vertices:e.vertices,parts:e.parts||[e],isStatic:e.isStatic,isSleeping:e.isSleeping,parent:e.parent||e}),i.rotate(e.vertices,e.angle,e.position),c.rotate(e.axes,e.angle),l.update(e.bounds,e.vertices,e.velocity),o.set(e,{axes:t.axes||e.axes,area:t.area||e.area,mass:t.mass||e.mass,inertia:t.inertia||e.inertia});var n=e.isStatic?"#2e2b44":a.choose(["#006BA6","#0496FF","#FFBC42","#D81159","#8F2D56"]),s="#000";e.render.fillStyle=e.render.fillStyle||n,e.render.strokeStyle=e.render.strokeStyle||s,e.render.sprite.xOffset+=-(e.bounds.min.x-e.position.x)/(e.bounds.max.x-e.bounds.min.x),e.render.sprite.yOffset+=-(e.bounds.min.y-e.position.y)/(e.bounds.max.y-e.bounds.min.y)};o.set=function(e,t,n){var i;"string"==typeof t&&(i=t,t={},t[i]=n);for(i in t)if(n=t[i],t.hasOwnProperty(i))switch(i){case"isStatic":o.setStatic(e,n);break;case"isSleeping":s.set(e,n);break;case"mass":o.setMass(e,n);break;case"density":o.setDensity(e,n);break;case"inertia":o.setInertia(e,n);break;case"vertices":o.setVertices(e,n);break;case"position":o.setPosition(e,n);break;case"angle":o.setAngle(e,n);break;case"velocity":o.setVelocity(e,n);break;case"angularVelocity":o.setAngularVelocity(e,n);break;case"parts":o.setParts(e,n);break;default:e[i]=n}},o.setStatic=function(e,t){for(var n=0;n<e.parts.length;n++){var o=e.parts[n];o.isStatic=t,t?(o._original={restitution:o.restitution,friction:o.friction,mass:o.mass,inertia:o.inertia,density:o.density,inverseMass:o.inverseMass,inverseInertia:o.inverseInertia},o.restitution=0,o.friction=1,o.mass=o.inertia=o.density=1/0,o.inverseMass=o.inverseInertia=0,o.positionPrev.x=o.position.x,o.positionPrev.y=o.position.y,o.anglePrev=o.angle,o.angularVelocity=0,o.speed=0,o.angularSpeed=0,o.motion=0):o._original&&(o.restitution=o._original.restitution,o.friction=o._original.friction,o.mass=o._original.mass,o.inertia=o._original.inertia,o.density=o._original.density,o.inverseMass=o._original.inverseMass,o.inverseInertia=o._original.inverseInertia,delete o._original)}},o.setMass=function(e,t){e.mass=t,e.inverseMass=1/e.mass,e.density=e.mass/e.area},o.setDensity=function(e,t){o.setMass(e,t*e.area),e.density=t},o.setInertia=function(e,t){e.inertia=t,e.inverseInertia=1/e.inertia},o.setVertices=function(e,t){t[0].body===e?e.vertices=t:e.vertices=i.create(t,e),e.axes=c.fromVertices(e.vertices),e.area=i.area(e.vertices),o.setMass(e,e.density*e.area);var n=i.centre(e.vertices);i.translate(e.vertices,n,-1),o.setInertia(e,o._inertiaScale*i.inertia(e.vertices,e.mass)),i.translate(e.vertices,e.position),l.update(e.bounds,e.vertices,e.velocity)},o.setParts=function(e,n,r){var s;for(n=n.slice(0),e.parts.length=0,e.parts.push(e),e.parent=e,s=0;s<n.length;s++){var a=n[s];a!==e&&(a.parent=e,e.parts.push(a))}if(1!==e.parts.length){if(r="undefined"==typeof r||r){var l=[];for(s=0;s<n.length;s++)l=l.concat(n[s].vertices);i.clockwiseSort(l);var c=i.hull(l),d=i.centre(c);o.setVertices(e,c),i.translate(e.vertices,d)}var u=t(e);e.area=u.area,e.parent=e,e.position.x=u.centre.x,e.position.y=u.centre.y,e.positionPrev.x=u.centre.x,e.positionPrev.y=u.centre.y,o.setMass(e,u.mass),o.setInertia(e,u.inertia),o.setPosition(e,u.centre)}},o.setPosition=function(e,t){var n=r.sub(t,e.position);e.positionPrev.x+=n.x,e.positionPrev.y+=n.y;for(var o=0;o<e.parts.length;o++){var s=e.parts[o];s.position.x+=n.x,s.position.y+=n.y,i.translate(s.vertices,n),l.update(s.bounds,s.vertices,e.velocity)}},o.setAngle=function(e,t){var n=t-e.angle;e.anglePrev+=n;for(var o=0;o<e.parts.length;o++){var s=e.parts[o];s.angle+=n,i.rotate(s.vertices,n,e.position),c.rotate(s.axes,n),l.update(s.bounds,s.vertices,e.velocity),o>0&&r.rotateAbout(s.position,n,e.position,s.position)}},o.setVelocity=function(e,t){e.positionPrev.x=e.position.x-t.x,e.positionPrev.y=e.position.y-t.y,e.velocity.x=t.x,e.velocity.y=t.y,e.speed=r.magnitude(e.velocity)},o.setAngularVelocity=function(e,t){e.anglePrev=e.angle-t,e.angularVelocity=t,e.angularSpeed=Math.abs(e.angularVelocity)},o.translate=function(e,t){o.setPosition(e,r.add(e.position,t))},o.rotate=function(e,t,n){if(n){var i=Math.cos(t),r=Math.sin(t),s=e.position.x-n.x,a=e.position.y-n.y;o.setPosition(e,{x:n.x+(s*i-a*r),y:n.y+(s*r+a*i)}),o.setAngle(e,e.angle+t)}else o.setAngle(e,e.angle+t)},o.scale=function(e,n,r,s){for(var a=0;a<e.parts.length;a++){var d=e.parts[a];i.scale(d.vertices,n,r,e.position),d.axes=c.fromVertices(d.vertices),e.isStatic||(d.area=i.area(d.vertices),o.setMass(d,e.density*d.area),i.translate(d.vertices,{x:-d.position.x,y:-d.position.y}),o.setInertia(d,i.inertia(d.vertices,d.mass)),i.translate(d.vertices,{x:d.position.x,y:d.position.y})),l.update(d.bounds,d.vertices,e.velocity)}if(e.circleRadius&&(n===r?e.circleRadius*=n:e.circleRadius=null),!e.isStatic){var u=t(e);e.area=u.area,o.setMass(e,u.mass),o.setInertia(e,u.inertia)}},o.update=function(e,t,n,o){var s=Math.pow(t*n*e.timeScale,2),a=1-e.frictionAir*n*e.timeScale,d=e.position.x-e.positionPrev.x,u=e.position.y-e.positionPrev.y;e.velocity.x=d*a*o+e.force.x/e.mass*s,e.velocity.y=u*a*o+e.force.y/e.mass*s,e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.position.x+=e.velocity.x,e.position.y+=e.velocity.y,e.angularVelocity=(e.angle-e.anglePrev)*a*o+e.torque/e.inertia*s,e.anglePrev=e.angle,e.angle+=e.angularVelocity,e.speed=r.magnitude(e.velocity),e.angularSpeed=Math.abs(e.angularVelocity);for(var p=0;p<e.parts.length;p++){var f=e.parts[p];i.translate(f.vertices,e.velocity),p>0&&(f.position.x+=e.velocity.x,f.position.y+=e.velocity.y),0!==e.angularVelocity&&(i.rotate(f.vertices,e.angularVelocity,e.position),c.rotate(f.axes,e.angularVelocity),p>0&&r.rotateAbout(f.position,e.angularVelocity,e.position,f.position)),l.update(f.bounds,f.vertices,e.velocity)}},o.applyForce=function(e,t,n){e.force.x+=n.x,e.force.y+=n.y;var o={x:t.x-e.position.x,y:t.y-e.position.y};e.torque+=o.x*n.y-o.y*n.x};var t=function(e){for(var t={mass:0,area:0,inertia:0,centre:{x:0,y:0}},n=1===e.parts.length?0:1;n<e.parts.length;n++){var o=e.parts[n];t.mass+=o.mass,t.area+=o.area,t.inertia+=o.inertia,t.centre=r.add(t.centre,r.mult(o.position,o.mass!==1/0?o.mass:1))}return t.centre=r.div(t.centre,t.mass!==1/0?t.mass:e.parts.length),t}}()},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31}],2:[function(e,t,n){var o={};t.exports=o;var i=e("../core/Events"),r=e("../core/Common"),s=e("./Body");!function(){o.create=function(e){return r.extend({id:r.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{}},e)},o.setModified=function(e,t,n,i){if(e.isModified=t,n&&e.parent&&o.setModified(e.parent,t,n,i),i)for(var r=0;r<e.composites.length;r++){var s=e.composites[r];o.setModified(s,t,n,i)}},o.add=function(e,t){var n=[].concat(t);i.trigger(e,"beforeAdd",{object:t});for(var s=0;s<n.length;s++){var a=n[s];switch(a.type){case"body":if(a.parent!==a){r.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}o.addBody(e,a);break;case"constraint":o.addConstraint(e,a);break;case"composite":o.addComposite(e,a);break;case"mouseConstraint":o.addConstraint(e,a.constraint)}}return i.trigger(e,"afterAdd",{object:t}),e},o.remove=function(e,t,n){var r=[].concat(t);i.trigger(e,"beforeRemove",{object:t});for(var s=0;s<r.length;s++){var a=r[s];switch(a.type){case"body":o.removeBody(e,a,n);break;case"constraint":o.removeConstraint(e,a,n);break;case"composite":o.removeComposite(e,a,n);break;case"mouseConstraint":o.removeConstraint(e,a.constraint)}}return i.trigger(e,"afterRemove",{object:t}),e},o.addComposite=function(e,t){return e.composites.push(t),t.parent=e,o.setModified(e,!0,!0,!1),e},o.removeComposite=function(e,t,n){var i=r.indexOf(e.composites,t);if(i!==-1&&(o.removeCompositeAt(e,i),o.setModified(e,!0,!0,!1)),n)for(var s=0;s<e.composites.length;s++)o.removeComposite(e.composites[s],t,!0);return e},o.removeCompositeAt=function(e,t){return e.composites.splice(t,1),o.setModified(e,!0,!0,!1),e},o.addBody=function(e,t){return e.bodies.push(t),o.setModified(e,!0,!0,!1),e},o.removeBody=function(e,t,n){var i=r.indexOf(e.bodies,t);if(i!==-1&&(o.removeBodyAt(e,i),o.setModified(e,!0,!0,!1)),n)for(var s=0;s<e.composites.length;s++)o.removeBody(e.composites[s],t,!0);return e},o.removeBodyAt=function(e,t){return e.bodies.splice(t,1),o.setModified(e,!0,!0,!1),e},o.addConstraint=function(e,t){return e.constraints.push(t),o.setModified(e,!0,!0,!1),e},o.removeConstraint=function(e,t,n){var i=r.indexOf(e.constraints,t);if(i!==-1&&o.removeConstraintAt(e,i),n)for(var s=0;s<e.composites.length;s++)o.removeConstraint(e.composites[s],t,!0);return e},o.removeConstraintAt=function(e,t){return e.constraints.splice(t,1),o.setModified(e,!0,!0,!1),e},o.clear=function(e,t,n){if(n)for(var i=0;i<e.composites.length;i++)o.clear(e.composites[i],t,!0);return t?e.bodies=e.bodies.filter(function(e){return e.isStatic}):e.bodies.length=0,e.constraints.length=0,e.composites.length=0,o.setModified(e,!0,!0,!1),e},o.allBodies=function(e){for(var t=[].concat(e.bodies),n=0;n<e.composites.length;n++)t=t.concat(o.allBodies(e.composites[n]));return t},o.allConstraints=function(e){for(var t=[].concat(e.constraints),n=0;n<e.composites.length;n++)t=t.concat(o.allConstraints(e.composites[n]));return t},o.allComposites=function(e){for(var t=[].concat(e.composites),n=0;n<e.composites.length;n++)t=t.concat(o.allComposites(e.composites[n]));return t},o.get=function(e,t,n){var i,r;switch(n){case"body":i=o.allBodies(e);break;case"constraint":i=o.allConstraints(e);break;case"composite":i=o.allComposites(e).concat(e)}return i?(r=i.filter(function(e){return e.id.toString()===t.toString()}),0===r.length?null:r[0]):null},o.move=function(e,t,n){return o.remove(e,t),o.add(n,t),e},o.rebase=function(e){for(var t=o.allBodies(e).concat(o.allConstraints(e)).concat(o.allComposites(e)),n=0;n<t.length;n++)t[n].id=r.nextId();return o.setModified(e,!0,!0,!1),e},o.translate=function(e,t,n){for(var i=n?o.allBodies(e):e.bodies,r=0;r<i.length;r++)s.translate(i[r],t);return o.setModified(e,!0,!0,!1),e},o.rotate=function(e,t,n,i){for(var r=Math.cos(t),a=Math.sin(t),l=i?o.allBodies(e):e.bodies,c=0;c<l.length;c++){var d=l[c],u=d.position.x-n.x,p=d.position.y-n.y;s.setPosition(d,{x:n.x+(u*r-p*a),y:n.y+(u*a+p*r)}),s.rotate(d,t)}return o.setModified(e,!0,!0,!1),e},o.scale=function(e,t,n,i,r){for(var a=r?o.allBodies(e):e.bodies,l=0;l<a.length;l++){var c=a[l],d=c.position.x-i.x,u=c.position.y-i.y;s.setPosition(c,{x:i.x+d*t,y:i.y+u*n}),s.scale(c,t,n)}return o.setModified(e,!0,!0,!1),e},o.bounds=function(e){for(var t=Matter.Composite.allBodies(e),n=[],o=0;o<t.length;o+=1){var i=t[o];n.push(i.bounds.min,i.bounds.max)}return Matter.Bounds.create(n)}}()},{"../core/Common":14,"../core/Events":16,"./Body":1}],3:[function(e,t,n){var o={};t.exports=o;var i=e("./Composite"),r=(e("../constraint/Constraint"),e("../core/Common"));!function(){o.create=function(e){var t=i.create(),n={label:"World",gravity:{x:0,y:1,scale:.001},bounds:{min:{x:-(1/0),y:-(1/0)},max:{x:1/0,y:1/0}}};return r.extend(t,n,e)}}()},{"../constraint/Constraint":12,"../core/Common":14,"./Composite":2}],4:[function(e,t,n){var o={};t.exports=o,function(){o.create=function(e){return{id:o.id(e),vertex:e,normalImpulse:0,tangentImpulse:0}},o.id=function(e){return e.body.id+"_"+e.index}}()},{}],5:[function(e,t,n){var o={};t.exports=o;var i=e("./SAT"),r=e("./Pair"),s=e("../geometry/Bounds");!function(){o.collisions=function(e,t){for(var n=[],a=t.pairs.table,l=0;l<e.length;l++){var c=e[l][0],d=e[l][1];if((!c.isStatic&&!c.isSleeping||!d.isStatic&&!d.isSleeping)&&o.canCollide(c.collisionFilter,d.collisionFilter)&&s.overlaps(c.bounds,d.bounds))for(var u=c.parts.length>1?1:0;u<c.parts.length;u++)for(var p=c.parts[u],f=d.parts.length>1?1:0;f<d.parts.length;f++){var m=d.parts[f];if(p===c&&m===d||s.overlaps(p.bounds,m.bounds)){var v,y=r.id(p,m),g=a[y];v=g&&g.isActive?g.collision:null;var x=i.collides(p,m,v);x.collided&&n.push(x)}}}return n},o.canCollide=function(e,t){return e.group===t.group&&0!==e.group?e.group>0:0!==(e.mask&t.category)&&0!==(t.mask&e.category)}}()},{"../geometry/Bounds":26,"./Pair":7,"./SAT":11}],6:[function(e,t,n){var o={};t.exports=o;var i=e("./Pair"),r=e("./Detector"),s=e("../core/Common");!function(){o.create=function(e){var t={controller:o,detector:r.collisions,buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return s.extend(t,e)},o.update=function(n,o,i,r){var s,p,f,m,v,y=i.world,g=n.buckets,x=!1;for(s=0;s<o.length;s++){var h=o[s];if((!h.isSleeping||r)&&!(h.bounds.max.x<y.bounds.min.x||h.bounds.min.x>y.bounds.max.x||h.bounds.max.y<y.bounds.min.y||h.bounds.min.y>y.bounds.max.y)){var b=t(n,h);if(!h.region||b.id!==h.region.id||r){h.region&&!r||(h.region=b);var w=e(b,h.region);for(p=w.startCol;p<=w.endCol;p++)for(f=w.startRow;f<=w.endRow;f++){v=a(p,f),m=g[v];var S=p>=b.startCol&&p<=b.endCol&&f>=b.startRow&&f<=b.endRow,C=p>=h.region.startCol&&p<=h.region.endCol&&f>=h.region.startRow&&f<=h.region.endRow;!S&&C&&C&&m&&d(n,m,h),(h.region===b||S&&!C||r)&&(m||(m=l(g,v)),c(n,m,h))}h.region=b,x=!0}}}x&&(n.pairsList=u(n))},o.clear=function(e){e.buckets={},e.pairs={},e.pairsList=[]};var e=function(e,t){var o=Math.min(e.startCol,t.startCol),i=Math.max(e.endCol,t.endCol),r=Math.min(e.startRow,t.startRow),s=Math.max(e.endRow,t.endRow);return n(o,i,r,s)},t=function(e,t){var o=t.bounds,i=Math.floor(o.min.x/e.bucketWidth),r=Math.floor(o.max.x/e.bucketWidth),s=Math.floor(o.min.y/e.bucketHeight),a=Math.floor(o.max.y/e.bucketHeight);return n(i,r,s,a)},n=function(e,t,n,o){return{id:e+","+t+","+n+","+o,startCol:e,endCol:t,startRow:n,endRow:o}},a=function(e,t){return"C"+e+"R"+t},l=function(e,t){var n=e[t]=[];return n},c=function(e,t,n){for(var o=0;o<t.length;o++){var r=t[o];if(!(n.id===r.id||n.isStatic&&r.isStatic)){var s=i.id(n,r),a=e.pairs[s];a?a[2]+=1:e.pairs[s]=[n,r,1]}}t.push(n)},d=function(e,t,n){t.splice(s.indexOf(t,n),1);for(var o=0;o<t.length;o++){var r=t[o],a=i.id(n,r),l=e.pairs[a];l&&(l[2]-=1)}},u=function(e){var t,n,o=[];t=s.keys(e.pairs);for(var i=0;i<t.length;i++)n=e.pairs[t[i]],n[2]>0?o.push(n):delete e.pairs[t[i]];return o}}()},{"../core/Common":14,"./Detector":5,"./Pair":7}],7:[function(e,t,n){var o={};t.exports=o;var i=e("./Contact");!function(){o.create=function(e,t){var n=e.bodyA,i=e.bodyB,r=e.parentA,s=e.parentB,a={id:o.id(n,i),bodyA:n,bodyB:i,contacts:{},activeContacts:[],separation:0,isActive:!0,isSensor:n.isSensor||i.isSensor,timeCreated:t,timeUpdated:t,inverseMass:r.inverseMass+s.inverseMass,friction:Math.min(r.friction,s.friction),frictionStatic:Math.max(r.frictionStatic,s.frictionStatic),restitution:Math.max(r.restitution,s.restitution),slop:Math.max(r.slop,s.slop)};return o.update(a,e,t),a},o.update=function(e,t,n){var r=e.contacts,s=t.supports,a=e.activeContacts,l=t.parentA,c=t.parentB;if(e.collision=t,e.inverseMass=l.inverseMass+c.inverseMass,e.friction=Math.min(l.friction,c.friction),e.frictionStatic=Math.max(l.frictionStatic,c.frictionStatic),e.restitution=Math.max(l.restitution,c.restitution),e.slop=Math.max(l.slop,c.slop),a.length=0,t.collided){for(var d=0;d<s.length;d++){var u=s[d],p=i.id(u),f=r[p];f?a.push(f):a.push(r[p]=i.create(u))}e.separation=t.depth,o.setActive(e,!0,n)}else e.isActive===!0&&o.setActive(e,!1,n)},o.setActive=function(e,t,n){t?(e.isActive=!0,e.timeUpdated=n):(e.isActive=!1,e.activeContacts.length=0)},o.id=function(e,t){return e.id<t.id?"A"+e.id+"B"+t.id:"A"+t.id+"B"+e.id}}()},{"./Contact":4}],8:[function(e,t,n){var o={};t.exports=o;var i=e("./Pair"),r=e("../core/Common");!function(){var e=1e3;o.create=function(e){return r.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},e)},o.update=function(e,t,n){var o,s,a,l,c=e.list,d=e.table,u=e.collisionStart,p=e.collisionEnd,f=e.collisionActive,m=[];for(u.length=0,p.length=0,f.length=0,l=0;l<t.length;l++)o=t[l],o.collided&&(s=i.id(o.bodyA,o.bodyB),m.push(s),a=d[s],a?(a.isActive?f.push(a):u.push(a),i.update(a,o,n)):(a=i.create(o,n),d[s]=a,u.push(a),c.push(a)));for(l=0;l<c.length;l++)a=c[l],a.isActive&&r.indexOf(m,a.id)===-1&&(i.setActive(a,!1,n),p.push(a))},o.removeOld=function(t,n){var o,i,r,s,a=t.list,l=t.table,c=[];for(s=0;s<a.length;s++)o=a[s],i=o.collision,i.bodyA.isSleeping||i.bodyB.isSleeping?o.timeUpdated=n:n-o.timeUpdated>e&&c.push(s);for(s=0;s<c.length;s++)r=c[s]-s,o=a[r],delete l[o.id],a.splice(r,1)},o.clear=function(e){return e.table={},e.list.length=0,e.collisionStart.length=0,e.collisionActive.length=0,e.collisionEnd.length=0,e}}()},{"../core/Common":14,"./Pair":7}],9:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vector"),r=e("./SAT"),s=e("../geometry/Bounds"),a=e("../factory/Bodies"),l=e("../geometry/Vertices");!function(){o.ray=function(e,t,n,o){o=o||1e-100;for(var l=i.angle(t,n),c=i.magnitude(i.sub(t,n)),d=.5*(n.x+t.x),u=.5*(n.y+t.y),p=a.rectangle(d,u,c,o,{angle:l}),f=[],m=0;m<e.length;m++){var v=e[m];if(s.overlaps(v.bounds,p.bounds))for(var y=1===v.parts.length?0:1;y<v.parts.length;y++){var g=v.parts[y];if(s.overlaps(g.bounds,p.bounds)){var x=r.collides(g,p);if(x.collided){x.body=x.bodyA=x.bodyB=v,f.push(x);break}}}}return f},o.region=function(e,t,n){for(var o=[],i=0;i<e.length;i++){var r=e[i],a=s.overlaps(r.bounds,t);(a&&!n||!a&&n)&&o.push(r)}return o},o.point=function(e,t){for(var n=[],o=0;o<e.length;o++){var i=e[o];if(s.contains(i.bounds,t))for(var r=1===i.parts.length?0:1;r<i.parts.length;r++){var a=i.parts[r];if(s.contains(a.bounds,t)&&l.contains(a.vertices,t)){n.push(i);break}}}return n}}()},{"../factory/Bodies":23,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29,"./SAT":11}],10:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vertices"),r=e("../geometry/Vector"),s=e("../core/Common"),a=e("../geometry/Bounds");!function(){o._restingThresh=4,o._restingThreshTangent=6,o._positionDampen=.9,o._positionWarming=.8,o._frictionNormalMultiplier=5,o.preSolvePosition=function(e){var t,n,o;for(t=0;t<e.length;t++)n=e[t],n.isActive&&(o=n.activeContacts.length,n.collision.parentA.totalContacts+=o,n.collision.parentB.totalContacts+=o)},o.solvePosition=function(e,t){var n,i,s,a,l,c,d,u,p,f=r._temp[0],m=r._temp[1],v=r._temp[2],y=r._temp[3];for(n=0;n<e.length;n++)i=e[n],i.isActive&&!i.isSensor&&(s=i.collision,a=s.parentA,l=s.parentB,c=s.normal,d=r.sub(r.add(l.positionImpulse,l.position,f),r.add(a.positionImpulse,r.sub(l.position,s.penetration,m),v),y),i.separation=r.dot(c,d));for(n=0;n<e.length;n++)i=e[n],i.isActive&&!i.isSensor&&(s=i.collision,a=s.parentA,l=s.parentB,c=s.normal,p=(i.separation-i.slop)*t,(a.isStatic||l.isStatic)&&(p*=2),a.isStatic||a.isSleeping||(u=o._positionDampen/a.totalContacts,a.positionImpulse.x+=c.x*p*u,a.positionImpulse.y+=c.y*p*u),l.isStatic||l.isSleeping||(u=o._positionDampen/l.totalContacts,l.positionImpulse.x-=c.x*p*u,l.positionImpulse.y-=c.y*p*u))},o.postSolvePosition=function(e){for(var t=0;t<e.length;t++){var n=e[t];if(n.totalContacts=0,0!==n.positionImpulse.x||0!==n.positionImpulse.y){for(var s=0;s<n.parts.length;s++){var l=n.parts[s];i.translate(l.vertices,n.positionImpulse),a.update(l.bounds,l.vertices,n.velocity),l.position.x+=n.positionImpulse.x,l.position.y+=n.positionImpulse.y}n.positionPrev.x+=n.positionImpulse.x,n.positionPrev.y+=n.positionImpulse.y,r.dot(n.positionImpulse,n.velocity)<0?(n.positionImpulse.x=0,n.positionImpulse.y=0):(n.positionImpulse.x*=o._positionWarming,n.positionImpulse.y*=o._positionWarming)}}},o.preSolveVelocity=function(e){var t,n,o,i,s,a,l,c,d,u,p,f,m,v,y=r._temp[0],g=r._temp[1];for(t=0;t<e.length;t++)if(o=e[t],o.isActive&&!o.isSensor)for(i=o.activeContacts,s=o.collision,a=s.parentA,l=s.parentB,c=s.normal,d=s.tangent,n=0;n<i.length;n++)u=i[n],p=u.vertex,f=u.normalImpulse,m=u.tangentImpulse,0===f&&0===m||(y.x=c.x*f+d.x*m,y.y=c.y*f+d.y*m,a.isStatic||a.isSleeping||(v=r.sub(p,a.position,g),a.positionPrev.x+=y.x*a.inverseMass,a.positionPrev.y+=y.y*a.inverseMass,a.anglePrev+=r.cross(v,y)*a.inverseInertia),l.isStatic||l.isSleeping||(v=r.sub(p,l.position,g),l.positionPrev.x-=y.x*l.inverseMass,l.positionPrev.y-=y.y*l.inverseMass,l.anglePrev-=r.cross(v,y)*l.inverseInertia))},o.solveVelocity=function(e,t){for(var n=t*t,i=r._temp[0],a=r._temp[1],l=r._temp[2],c=r._temp[3],d=r._temp[4],u=r._temp[5],p=0;p<e.length;p++){var f=e[p];if(f.isActive&&!f.isSensor){var m=f.collision,v=m.parentA,y=m.parentB,g=m.normal,x=m.tangent,h=f.activeContacts,b=1/h.length;v.velocity.x=v.position.x-v.positionPrev.x,v.velocity.y=v.position.y-v.positionPrev.y,y.velocity.x=y.position.x-y.positionPrev.x,y.velocity.y=y.position.y-y.positionPrev.y,v.angularVelocity=v.angle-v.anglePrev,y.angularVelocity=y.angle-y.anglePrev;for(var w=0;w<h.length;w++){var S=h[w],C=S.vertex,A=r.sub(C,v.position,a),P=r.sub(C,y.position,l),B=r.add(v.velocity,r.mult(r.perp(A),v.angularVelocity),c),M=r.add(y.velocity,r.mult(r.perp(P),y.angularVelocity),d),k=r.sub(B,M,u),I=r.dot(g,k),T=r.dot(x,k),V=Math.abs(T),_=s.sign(T),R=(1+f.restitution)*I,E=s.clamp(f.separation+I,0,1)*o._frictionNormalMultiplier,L=T,F=1/0;V>f.friction*f.frictionStatic*E*n&&(F=V,L=s.clamp(f.friction*_*n,-F,F));var O=r.cross(A,g),q=r.cross(P,g),W=b/(v.inverseMass+y.inverseMass+v.inverseInertia*O*O+y.inverseInertia*q*q);if(R*=W,L*=W,I<0&&I*I>o._restingThresh*n)S.normalImpulse=0;else{var D=S.normalImpulse;S.normalImpulse=Math.min(S.normalImpulse+R,0),R=S.normalImpulse-D}if(T*T>o._restingThreshTangent*n)S.tangentImpulse=0;else{var N=S.tangentImpulse;S.tangentImpulse=s.clamp(S.tangentImpulse+L,-F,F),L=S.tangentImpulse-N}i.x=g.x*R+x.x*L,i.y=g.y*R+x.y*L,v.isStatic||v.isSleeping||(v.positionPrev.x+=i.x*v.inverseMass,v.positionPrev.y+=i.y*v.inverseMass,v.anglePrev+=r.cross(A,i)*v.inverseInertia),y.isStatic||y.isSleeping||(y.positionPrev.x-=i.x*y.inverseMass,y.positionPrev.y-=i.y*y.inverseMass,y.anglePrev-=r.cross(P,i)*y.inverseInertia)}}}}}()},{"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],11:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vertices"),r=e("../geometry/Vector");!function(){o.collides=function(t,o,s){var a,l,c,d,u=!1;if(s){var p=t.parent,f=o.parent,m=p.speed*p.speed+p.angularSpeed*p.angularSpeed+f.speed*f.speed+f.angularSpeed*f.angularSpeed;u=s&&s.collided&&m<.2,d=s}else d={collided:!1,bodyA:t,bodyB:o};if(s&&u){var v=d.axisBody,y=v===t?o:t,g=[v.axes[s.axisNumber]];if(c=e(v.vertices,y.vertices,g),d.reused=!0,c.overlap<=0)return d.collided=!1,d}else{if(a=e(t.vertices,o.vertices,t.axes),a.overlap<=0)return d.collided=!1,d;if(l=e(o.vertices,t.vertices,o.axes),l.overlap<=0)return d.collided=!1,d;a.overlap<l.overlap?(c=a,d.axisBody=t):(c=l,d.axisBody=o),d.axisNumber=c.axisNumber}d.bodyA=t.id<o.id?t:o,d.bodyB=t.id<o.id?o:t,d.collided=!0,d.depth=c.overlap,d.parentA=d.bodyA.parent,d.parentB=d.bodyB.parent,t=d.bodyA,o=d.bodyB,r.dot(c.axis,r.sub(o.position,t.position))<0?d.normal={x:c.axis.x,y:c.axis.y}:d.normal={x:-c.axis.x,y:-c.axis.y},d.tangent=r.perp(d.normal),d.penetration=d.penetration||{},d.penetration.x=d.normal.x*d.depth,d.penetration.y=d.normal.y*d.depth;var x=n(t,o,d.normal),h=[];if(i.contains(t.vertices,x[0])&&h.push(x[0]),i.contains(t.vertices,x[1])&&h.push(x[1]),h.length<2){var b=n(o,t,r.neg(d.normal));i.contains(o.vertices,b[0])&&h.push(b[0]),h.length<2&&i.contains(o.vertices,b[1])&&h.push(b[1])}return h.length<1&&(h=[x[0]]),d.supports=h,d};var e=function(e,n,o){for(var i,s,a=r._temp[0],l=r._temp[1],c={overlap:Number.MAX_VALUE},d=0;d<o.length;d++){if(s=o[d],t(a,e,s),t(l,n,s),i=Math.min(a.max-l.min,l.max-a.min),i<=0)return c.overlap=i,c;i<c.overlap&&(c.overlap=i,c.axis=s,c.axisNumber=d)}return c},t=function(e,t,n){for(var o=r.dot(t[0],n),i=o,s=1;s<t.length;s+=1){var a=r.dot(t[s],n);a>i?i=a:a<o&&(o=a)}e.min=o,e.max=i},n=function(e,t,n){for(var o,i,s,a,l=Number.MAX_VALUE,c=r._temp[0],d=t.vertices,u=e.position,p=0;p<d.length;p++)i=d[p],c.x=i.x-u.x,c.y=i.y-u.y,o=-r.dot(n,c),o<l&&(l=o,s=i);var f=s.index-1>=0?s.index-1:d.length-1;i=d[f],c.x=i.x-u.x,c.y=i.y-u.y,l=-r.dot(n,c),a=i;var m=(s.index+1)%d.length;return i=d[m],c.x=i.x-u.x,c.y=i.y-u.y,o=-r.dot(n,c),o<l&&(a=i),[s,a]}}()},{"../geometry/Vector":28,"../geometry/Vertices":29}],12:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vertices"),r=e("../geometry/Vector"),s=e("../core/Sleeping"),a=e("../geometry/Bounds"),l=e("../geometry/Axes"),c=e("../core/Common");!function(){o._warming=.4,o._torqueDampen=1,o._minLength=1e-6,o.create=function(e){var t=e;t.bodyA&&!t.pointA&&(t.pointA={x:0,y:0}),t.bodyB&&!t.pointB&&(t.pointB={x:0,y:0});var n=t.bodyA?r.add(t.bodyA.position,t.pointA):t.pointA,o=t.bodyB?r.add(t.bodyB.position,t.pointB):t.pointB,i=r.magnitude(r.sub(n,o));t.length="undefined"!=typeof t.length?t.length:i,t.id=t.id||c.nextId(),t.label=t.label||"Constraint",t.type="constraint",t.stiffness=t.stiffness||(t.length>0?1:.7),t.damping=t.damping||0,t.angularStiffness=t.angularStiffness||0,t.angleA=t.bodyA?t.bodyA.angle:t.angleA,t.angleB=t.bodyB?t.bodyB.angle:t.angleB,t.plugin={};var s={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return 0===t.length&&t.stiffness>.1?(s.type="pin",s.anchors=!1):t.stiffness<.9&&(s.type="spring"),t.render=c.extend(s,t.render),t},o.preSolveAll=function(e){for(var t=0;t<e.length;t+=1){var n=e[t],o=n.constraintImpulse;n.isStatic||0===o.x&&0===o.y&&0===o.angle||(n.position.x+=o.x,n.position.y+=o.y,n.angle+=o.angle)}},o.solveAll=function(e,t){for(var n=0;n<e.length;n+=1){var i=e[n],r=!i.bodyA||i.bodyA&&i.bodyA.isStatic,s=!i.bodyB||i.bodyB&&i.bodyB.isStatic;(r||s)&&o.solve(e[n],t)}for(n=0;n<e.length;n+=1)i=e[n],r=!i.bodyA||i.bodyA&&i.bodyA.isStatic,s=!i.bodyB||i.bodyB&&i.bodyB.isStatic,r||s||o.solve(e[n],t)},o.solve=function(e,t){var n=e.bodyA,i=e.bodyB,s=e.pointA,a=e.pointB;if(n||i){n&&!n.isStatic&&(r.rotate(s,n.angle-e.angleA,s),e.angleA=n.angle),i&&!i.isStatic&&(r.rotate(a,i.angle-e.angleB,a),e.angleB=i.angle);var l=s,c=a;if(n&&(l=r.add(n.position,s)),i&&(c=r.add(i.position,a)),l&&c){var d=r.sub(l,c),u=r.magnitude(d);u<o._minLength&&(u=o._minLength);var p,f,m,v,y,g=(u-e.length)/u,x=e.stiffness<1?e.stiffness*t:e.stiffness,h=r.mult(d,g*x),b=(n?n.inverseMass:0)+(i?i.inverseMass:0),w=(n?n.inverseInertia:0)+(i?i.inverseInertia:0),S=b+w;if(e.damping){var C=r.create();m=r.div(d,u),y=r.sub(i&&r.sub(i.position,i.positionPrev)||C,n&&r.sub(n.position,n.positionPrev)||C),v=r.dot(m,y)}n&&!n.isStatic&&(f=n.inverseMass/b,n.constraintImpulse.x-=h.x*f,n.constraintImpulse.y-=h.y*f,n.position.x-=h.x*f,n.position.y-=h.y*f,e.damping&&(n.positionPrev.x-=e.damping*m.x*v*f,n.positionPrev.y-=e.damping*m.y*v*f),p=r.cross(s,h)/S*o._torqueDampen*n.inverseInertia*(1-e.angularStiffness),n.constraintImpulse.angle-=p,n.angle-=p),i&&!i.isStatic&&(f=i.inverseMass/b,i.constraintImpulse.x+=h.x*f,i.constraintImpulse.y+=h.y*f,i.position.x+=h.x*f,i.position.y+=h.y*f,e.damping&&(i.positionPrev.x+=e.damping*m.x*v*f,i.positionPrev.y+=e.damping*m.y*v*f),p=r.cross(a,h)/S*o._torqueDampen*i.inverseInertia*(1-e.angularStiffness),i.constraintImpulse.angle+=p,i.angle+=p)}}},o.postSolveAll=function(e){for(var t=0;t<e.length;t++){var n=e[t],c=n.constraintImpulse;if(!(n.isStatic||0===c.x&&0===c.y&&0===c.angle)){s.set(n,!1);for(var d=0;d<n.parts.length;d++){var u=n.parts[d];i.translate(u.vertices,c),d>0&&(u.position.x+=c.x,u.position.y+=c.y),0!==c.angle&&(i.rotate(u.vertices,c.angle,n.position),l.rotate(u.axes,c.angle),d>0&&r.rotateAbout(u.position,c.angle,n.position,u.position)),a.update(u.bounds,u.vertices,n.velocity)}c.angle*=o._warming,c.x*=o._warming,c.y*=o._warming}}}}()},{"../core/Common":14,"../core/Sleeping":22,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],13:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vertices"),r=e("../core/Sleeping"),s=e("../core/Mouse"),a=e("../core/Events"),l=e("../collision/Detector"),c=e("./Constraint"),d=e("../body/Composite"),u=e("../core/Common"),p=e("../geometry/Bounds");!function(){o.create=function(t,n){var i=(t?t.mouse:null)||(n?n.mouse:null);i||(t&&t.render&&t.render.canvas?i=s.create(t.render.canvas):n&&n.element?i=s.create(n.element):(i=s.create(),u.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var r=c.create({label:"Mouse Constraint",pointA:i.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),l={type:"mouseConstraint",mouse:i,element:null,body:null,constraint:r,collisionFilter:{category:1,mask:4294967295,group:0}},p=u.extend(l,n);return a.on(t,"beforeUpdate",function(){var n=d.allBodies(t.world);o.update(p,n),e(p)}),p},o.update=function(e,t){var n=e.mouse,o=e.constraint,s=e.body;if(0===n.button){if(o.bodyB)r.set(o.bodyB,!1),o.pointA=n.position;else for(var c=0;c<t.length;c++)if(s=t[c],p.contains(s.bounds,n.position)&&l.canCollide(s.collisionFilter,e.collisionFilter))for(var d=s.parts.length>1?1:0;d<s.parts.length;d++){var u=s.parts[d];if(i.contains(u.vertices,n.position)){o.pointA=n.position,o.bodyB=e.body=s,o.pointB={x:n.position.x-s.position.x,y:n.position.y-s.position.y},o.angleB=s.angle,r.set(s,!1),a.trigger(e,"startdrag",{mouse:n,body:s});break}}}else o.bodyB=e.body=null,o.pointB=null,s&&a.trigger(e,"enddrag",{mouse:n,body:s})};var e=function(e){var t=e.mouse,n=t.sourceEvents;n.mousemove&&a.trigger(e,"mousemove",{mouse:t}),n.mousedown&&a.trigger(e,"mousedown",{mouse:t}),n.mouseup&&a.trigger(e,"mouseup",{mouse:t}),s.clearSourceEvents(t)}}()},{"../body/Composite":2,"../collision/Detector":5,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../core/Sleeping":22,"../geometry/Bounds":26,"../geometry/Vertices":29,"./Constraint":12}],14:[function(e,t,n){var o={};t.exports=o,function(){o._nextId=0,o._seed=0,o._nowStartTime=+new Date,o.extend=function(e,t){var n,i;"boolean"==typeof t?(n=2,i=t):(n=1,i=!0);for(var r=n;r<arguments.length;r++){var s=arguments[r];if(s)for(var a in s)i&&s[a]&&s[a].constructor===Object?e[a]&&e[a].constructor!==Object?e[a]=s[a]:(e[a]=e[a]||{},
	o.extend(e[a],i,s[a])):e[a]=s[a]}return e},o.clone=function(e,t){return o.extend({},t,e)},o.keys=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var n in e)t.push(n);return t},o.values=function(e){var t=[];if(Object.keys){for(var n=Object.keys(e),o=0;o<n.length;o++)t.push(e[n[o]]);return t}for(var i in e)t.push(e[i]);return t},o.get=function(e,t,n,o){t=t.split(".").slice(n,o);for(var i=0;i<t.length;i+=1)e=e[t[i]];return e},o.set=function(e,t,n,i,r){var s=t.split(".").slice(i,r);return o.get(e,t,0,-1)[s[s.length-1]]=n,n},o.shuffle=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(o.random()*(t+1)),i=e[t];e[t]=e[n],e[n]=i}return e},o.choose=function(e){return e[Math.floor(o.random()*e.length)]},o.isElement=function(e){return e instanceof HTMLElement},o.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)},o.isFunction=function(e){return"function"==typeof e},o.isPlainObject=function(e){return"object"==typeof e&&e.constructor===Object},o.isString=function(e){return"[object String]"===toString.call(e)},o.clamp=function(e,t,n){return e<t?t:e>n?n:e},o.sign=function(e){return e<0?-1:1},o.now=function(){if(window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return new Date-o._nowStartTime},o.random=function(t,n){return t="undefined"!=typeof t?t:0,n="undefined"!=typeof n?n:1,t+e()*(n-t)};var e=function(){return o._seed=(9301*o._seed+49297)%233280,o._seed/233280};o.colorToNumber=function(e){return e=e.replace("#",""),3==e.length&&(e=e.charAt(0)+e.charAt(0)+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2)),parseInt(e,16)},o.logLevel=1,o.log=function(){console&&o.logLevel>0&&o.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},o.info=function(){console&&o.logLevel>0&&o.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},o.warn=function(){console&&o.logLevel>0&&o.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},o.nextId=function(){return o._nextId++},o.indexOf=function(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1},o.map=function(e,t){if(e.map)return e.map(t);for(var n=[],o=0;o<e.length;o+=1)n.push(t(e[o]));return n},o.topologicalSort=function(e){var n=[],o=[],i=[];for(var r in e)o[r]||i[r]||t(r,o,i,e,n);return n};var t=function(e,n,o,i,r){var s=i[e]||[];o[e]=!0;for(var a=0;a<s.length;a+=1){var l=s[a];o[l]||n[l]||t(l,n,o,i,r)}o[e]=!1,n[e]=!0,r.push(e)};o.chain=function(){for(var e=[],t=0;t<arguments.length;t+=1){var n=arguments[t];n._chained?e.push.apply(e,n._chained):e.push(n)}var o=function(){for(var t,n=new Array(arguments.length),o=0,i=arguments.length;o<i;o++)n[o]=arguments[o];for(o=0;o<e.length;o+=1){var r=e[o].apply(t,n);"undefined"!=typeof r&&(t=r)}return t};return o._chained=e,o},o.chainPathBefore=function(e,t,n){return o.set(e,t,o.chain(n,o.get(e,t)))},o.chainPathAfter=function(e,t,n){return o.set(e,t,o.chain(o.get(e,t),n))}}()},{}],15:[function(e,t,n){var o={};t.exports=o;var i=e("../body/World"),r=e("./Sleeping"),s=e("../collision/Resolver"),a=e("../render/Render"),l=e("../collision/Pairs"),c=(e("./Metrics"),e("../collision/Grid")),d=e("./Events"),u=e("../body/Composite"),p=e("../constraint/Constraint"),f=e("./Common"),m=e("../body/Body");!function(){o.create=function(e,t){t=f.isElement(e)?t:e,e=f.isElement(e)?e:null,t=t||{},(e||t.render)&&f.warn("Engine.create: engine.render is deprecated (see docs)");var n={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},timing:{timestamp:0,timeScale:1},broadphase:{controller:c}},o=f.extend(n,t);if(e||o.render){var r={element:e,controller:a};o.render=f.extend(r,o.render)}return o.render&&o.render.controller&&(o.render=o.render.controller.create(o.render)),o.render&&(o.render.engine=o),o.world=t.world||i.create(o.world),o.pairs=l.create(),o.broadphase=o.broadphase.controller.create(o.broadphase),o.metrics=o.metrics||{extended:!1},o},o.update=function(o,i,a){i=i||1e3/60,a=a||1;var c,f=o.world,m=o.timing,v=o.broadphase,y=[];m.timestamp+=i*m.timeScale;var g={timestamp:m.timestamp};d.trigger(o,"beforeUpdate",g);var x=u.allBodies(f),h=u.allConstraints(f);for(o.enableSleeping&&r.update(x,m.timeScale),t(x,f.gravity),n(x,i,m.timeScale,a,f.bounds),p.preSolveAll(x),c=0;c<o.constraintIterations;c++)p.solveAll(h,m.timeScale);p.postSolveAll(x),v.controller?(f.isModified&&v.controller.clear(v),v.controller.update(v,x,o,f.isModified),y=v.pairsList):y=x,f.isModified&&u.setModified(f,!1,!1,!0);var b=v.detector(y,o),w=o.pairs,S=m.timestamp;for(l.update(w,b,S),l.removeOld(w,S),o.enableSleeping&&r.afterCollisions(w.list,m.timeScale),w.collisionStart.length>0&&d.trigger(o,"collisionStart",{pairs:w.collisionStart}),s.preSolvePosition(w.list),c=0;c<o.positionIterations;c++)s.solvePosition(w.list,m.timeScale);for(s.postSolvePosition(x),p.preSolveAll(x),c=0;c<o.constraintIterations;c++)p.solveAll(h,m.timeScale);for(p.postSolveAll(x),s.preSolveVelocity(w.list),c=0;c<o.velocityIterations;c++)s.solveVelocity(w.list,m.timeScale);return w.collisionActive.length>0&&d.trigger(o,"collisionActive",{pairs:w.collisionActive}),w.collisionEnd.length>0&&d.trigger(o,"collisionEnd",{pairs:w.collisionEnd}),e(x),d.trigger(o,"afterUpdate",g),o},o.merge=function(e,t){if(f.extend(e,t),t.world){e.world=t.world,o.clear(e);for(var n=u.allBodies(e.world),i=0;i<n.length;i++){var s=n[i];r.set(s,!1),s.id=f.nextId()}}},o.clear=function(e){var t=e.world;l.clear(e.pairs);var n=e.broadphase;if(n.controller){var o=u.allBodies(t);n.controller.clear(n),n.controller.update(n,o,e,!0)}};var e=function(e){for(var t=0;t<e.length;t++){var n=e[t];n.force.x=0,n.force.y=0,n.torque=0}},t=function(e,t){var n="undefined"!=typeof t.scale?t.scale:.001;if((0!==t.x||0!==t.y)&&0!==n)for(var o=0;o<e.length;o++){var i=e[o];i.isStatic||i.isSleeping||(i.force.y+=i.mass*t.y*n,i.force.x+=i.mass*t.x*n)}},n=function(e,t,n,o,i){for(var r=0;r<e.length;r++){var s=e[r];s.isStatic||s.isSleeping||m.update(s,t,n,o)}}}()},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Grid":6,"../collision/Pairs":8,"../collision/Resolver":10,"../constraint/Constraint":12,"../render/Render":31,"./Common":14,"./Events":16,"./Metrics":18,"./Sleeping":22}],16:[function(e,t,n){var o={};t.exports=o;var i=e("./Common");!function(){o.on=function(e,t,n){for(var o,i=t.split(" "),r=0;r<i.length;r++)o=i[r],e.events=e.events||{},e.events[o]=e.events[o]||[],e.events[o].push(n);return n},o.off=function(e,t,n){if(!t)return void(e.events={});"function"==typeof t&&(n=t,t=i.keys(e.events).join(" "));for(var o=t.split(" "),r=0;r<o.length;r++){var s=e.events[o[r]],a=[];if(n&&s)for(var l=0;l<s.length;l++)s[l]!==n&&a.push(s[l]);e.events[o[r]]=a}},o.trigger=function(e,t,n){var o,r,s,a;if(e.events){n||(n={}),o=t.split(" ");for(var l=0;l<o.length;l++)if(r=o[l],s=e.events[r]){a=i.clone(n,!1),a.name=r,a.source=e;for(var c=0;c<s.length;c++)s[c].apply(e,[a])}}}}()},{"./Common":14}],17:[function(e,t,n){var o={};t.exports=o;var i=e("./Plugin"),r=e("./Common");!function(){o.name="matter-js",o.version="0.13.0",o.uses=[],o.used=[],o.use=function(){i.use(o,Array.prototype.slice.call(arguments))},o.before=function(e,t){return e=e.replace(/^Matter./,""),r.chainPathBefore(o,e,t)},o.after=function(e,t){return e=e.replace(/^Matter./,""),r.chainPathAfter(o,e,t)}}()},{"./Common":14,"./Plugin":20}],18:[function(e,t,n){},{"../body/Composite":2,"./Common":14}],19:[function(e,t,n){var o={};t.exports=o;var i=e("../core/Common");!function(){o.create=function(t){var n={};return t||i.log("Mouse.create: element was undefined, defaulting to document.body","warn"),n.element=t||document.body,n.absolute={x:0,y:0},n.position={x:0,y:0},n.mousedownPosition={x:0,y:0},n.mouseupPosition={x:0,y:0},n.offset={x:0,y:0},n.scale={x:1,y:1},n.wheelDelta=0,n.button=-1,n.pixelRatio=n.element.getAttribute("data-pixel-ratio")||1,n.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},n.mousemove=function(t){var o=e(t,n.element,n.pixelRatio),i=t.changedTouches;i&&(n.button=0,t.preventDefault()),n.absolute.x=o.x,n.absolute.y=o.y,n.position.x=n.absolute.x*n.scale.x+n.offset.x,n.position.y=n.absolute.y*n.scale.y+n.offset.y,n.sourceEvents.mousemove=t},n.mousedown=function(t){var o=e(t,n.element,n.pixelRatio),i=t.changedTouches;i?(n.button=0,t.preventDefault()):n.button=t.button,n.absolute.x=o.x,n.absolute.y=o.y,n.position.x=n.absolute.x*n.scale.x+n.offset.x,n.position.y=n.absolute.y*n.scale.y+n.offset.y,n.mousedownPosition.x=n.position.x,n.mousedownPosition.y=n.position.y,n.sourceEvents.mousedown=t},n.mouseup=function(t){var o=e(t,n.element,n.pixelRatio),i=t.changedTouches;i&&t.preventDefault(),n.button=-1,n.absolute.x=o.x,n.absolute.y=o.y,n.position.x=n.absolute.x*n.scale.x+n.offset.x,n.position.y=n.absolute.y*n.scale.y+n.offset.y,n.mouseupPosition.x=n.position.x,n.mouseupPosition.y=n.position.y,n.sourceEvents.mouseup=t},n.mousewheel=function(e){n.wheelDelta=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),e.preventDefault()},o.setElement(n,n.element),n},o.setElement=function(e,t){e.element=t,t.addEventListener("mousemove",e.mousemove),t.addEventListener("mousedown",e.mousedown),t.addEventListener("mouseup",e.mouseup),t.addEventListener("mousewheel",e.mousewheel),t.addEventListener("DOMMouseScroll",e.mousewheel),t.addEventListener("touchmove",e.mousemove),t.addEventListener("touchstart",e.mousedown),t.addEventListener("touchend",e.mouseup)},o.clearSourceEvents=function(e){e.sourceEvents.mousemove=null,e.sourceEvents.mousedown=null,e.sourceEvents.mouseup=null,e.sourceEvents.mousewheel=null,e.wheelDelta=0},o.setOffset=function(e,t){e.offset.x=t.x,e.offset.y=t.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y},o.setScale=function(e,t){e.scale.x=t.x,e.scale.y=t.y,e.position.x=e.absolute.x*e.scale.x+e.offset.x,e.position.y=e.absolute.y*e.scale.y+e.offset.y};var e=function(e,t,n){var o,i,r=t.getBoundingClientRect(),s=document.documentElement||document.body.parentNode||document.body,a=void 0!==window.pageXOffset?window.pageXOffset:s.scrollLeft,l=void 0!==window.pageYOffset?window.pageYOffset:s.scrollTop,c=e.changedTouches;return c?(o=c[0].pageX-r.left-a,i=c[0].pageY-r.top-l):(o=e.pageX-r.left-a,i=e.pageY-r.top-l),{x:o/(t.clientWidth/(t.width||t.clientWidth)*n),y:i/(t.clientHeight/(t.height||t.clientHeight)*n)}}}()},{"../core/Common":14}],20:[function(e,t,n){var o={};t.exports=o;var i=e("./Common");!function(){o._registry={},o.register=function(e){if(o.isPlugin(e)||i.warn("Plugin.register:",o.toString(e),"does not implement all required fields."),e.name in o._registry){var t=o._registry[e.name],n=o.versionParse(e.version).number,r=o.versionParse(t.version).number;n>r?(i.warn("Plugin.register:",o.toString(t),"was upgraded to",o.toString(e)),o._registry[e.name]=e):n<r?i.warn("Plugin.register:",o.toString(t),"can not be downgraded to",o.toString(e)):e!==t&&i.warn("Plugin.register:",o.toString(e),"is already registered to different plugin object")}else o._registry[e.name]=e;return e},o.resolve=function(e){return o._registry[o.dependencyParse(e).name]},o.toString=function(e){return"string"==typeof e?e:(e.name||"anonymous")+"@"+(e.version||e.range||"0.0.0")},o.isPlugin=function(e){return e&&e.name&&e.version&&e.install},o.isUsed=function(e,t){return e.used.indexOf(t)>-1},o.isFor=function(e,t){var n=e["for"]&&o.dependencyParse(e["for"]);return!e["for"]||t.name===n.name&&o.versionSatisfies(t.version,n.range)},o.use=function(e,t){if(e.uses=(e.uses||[]).concat(t||[]),0===e.uses.length)return void i.warn("Plugin.use:",o.toString(e),"does not specify any dependencies to install.");for(var n=o.dependencies(e),r=i.topologicalSort(n),s=[],a=0;a<r.length;a+=1)if(r[a]!==e.name){var l=o.resolve(r[a]);l?o.isUsed(e,l.name)||(o.isFor(l,e)||(i.warn("Plugin.use:",o.toString(l),"is for",l["for"],"but installed on",o.toString(e)+"."),l._warned=!0),l.install?l.install(e):(i.warn("Plugin.use:",o.toString(l),"does not specify an install function."),l._warned=!0),l._warned?(s.push("🔶 "+o.toString(l)),delete l._warned):s.push("✅ "+o.toString(l)),e.used.push(l.name)):s.push("❌ "+r[a])}s.length>0&&i.info(s.join("  "))},o.dependencies=function(e,t){var n=o.dependencyParse(e),r=n.name;if(t=t||{},!(r in t)){e=o.resolve(e)||e,t[r]=i.map(e.uses||[],function(t){o.isPlugin(t)&&o.register(t);var r=o.dependencyParse(t),s=o.resolve(t);return s&&!o.versionSatisfies(s.version,r.range)?(i.warn("Plugin.dependencies:",o.toString(s),"does not satisfy",o.toString(r),"used by",o.toString(n)+"."),s._warned=!0,e._warned=!0):s||(i.warn("Plugin.dependencies:",o.toString(t),"used by",o.toString(n),"could not be resolved."),e._warned=!0),r.name});for(var s=0;s<t[r].length;s+=1)o.dependencies(t[r][s],t);return t}},o.dependencyParse=function(e){if(i.isString(e)){var t=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;return t.test(e)||i.warn("Plugin.dependencyParse:",e,"is not a valid dependency string."),{name:e.split("@")[0],range:e.split("@")[1]||"*"}}return{name:e.name,range:e.range||e.version}},o.versionParse=function(e){var t=/^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;t.test(e)||i.warn("Plugin.versionParse:",e,"is not a valid version or range.");var n=e.split("-");e=n[0];var o=isNaN(Number(e[0])),r=o?e.substr(1):e,s=i.map(r.split("."),function(e){return Number(e)});return{isRange:o,version:r,range:e,operator:o?e[0]:"",parts:s,prerelease:n[1],number:1e8*s[0]+1e4*s[1]+s[2]}},o.versionSatisfies=function(e,t){t=t||"*";var n=o.versionParse(t),i=n.parts,r=o.versionParse(e),s=r.parts;if(n.isRange){if("*"===n.operator||"*"===e)return!0;if("~"===n.operator)return s[0]===i[0]&&s[1]===i[1]&&s[2]>=i[2];if("^"===n.operator)return i[0]>0?s[0]===i[0]&&r.number>=n.number:i[1]>0?s[1]===i[1]&&s[2]>=i[2]:s[2]===i[2]}return e===t||"*"===e}}()},{"./Common":14}],21:[function(e,t,n){var o={};t.exports=o;var i=e("./Events"),r=e("./Engine"),s=e("./Common");!function(){var e,t;if("undefined"!=typeof window&&(e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,t=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),!e){var n;e=function(e){n=setTimeout(function(){e(s.now())},1e3/60)},t=function(){clearTimeout(n)}}o.create=function(e){var t={fps:60,correction:1,deltaSampleSize:60,counterTimestamp:0,frameCounter:0,deltaHistory:[],timePrev:null,timeScalePrev:1,frameRequestId:null,isFixed:!1,enabled:!0},n=s.extend(t,e);return n.delta=n.delta||1e3/n.fps,n.deltaMin=n.deltaMin||1e3/n.fps,n.deltaMax=n.deltaMax||1e3/(.5*n.fps),n.fps=1e3/n.delta,n},o.run=function(t,n){return"undefined"!=typeof t.positionIterations&&(n=t,t=o.create()),function i(r){t.frameRequestId=e(i),r&&t.enabled&&o.tick(t,n,r)}(),t},o.tick=function(e,t,n){var o,s=t.timing,a=1,l={timestamp:s.timestamp};i.trigger(e,"beforeTick",l),i.trigger(t,"beforeTick",l),e.isFixed?o=e.delta:(o=n-e.timePrev||e.delta,e.timePrev=n,e.deltaHistory.push(o),e.deltaHistory=e.deltaHistory.slice(-e.deltaSampleSize),o=Math.min.apply(null,e.deltaHistory),o=o<e.deltaMin?e.deltaMin:o,o=o>e.deltaMax?e.deltaMax:o,a=o/e.delta,e.delta=o),0!==e.timeScalePrev&&(a*=s.timeScale/e.timeScalePrev),0===s.timeScale&&(a=0),e.timeScalePrev=s.timeScale,e.correction=a,e.frameCounter+=1,n-e.counterTimestamp>=1e3&&(e.fps=e.frameCounter*((n-e.counterTimestamp)/1e3),e.counterTimestamp=n,e.frameCounter=0),i.trigger(e,"tick",l),i.trigger(t,"tick",l),t.world.isModified&&t.render&&t.render.controller&&t.render.controller.clear&&t.render.controller.clear(t.render),i.trigger(e,"beforeUpdate",l),r.update(t,o,a),i.trigger(e,"afterUpdate",l),t.render&&t.render.controller&&(i.trigger(e,"beforeRender",l),i.trigger(t,"beforeRender",l),t.render.controller.world(t.render),i.trigger(e,"afterRender",l),i.trigger(t,"afterRender",l)),i.trigger(e,"afterTick",l),i.trigger(t,"afterTick",l)},o.stop=function(e){t(e.frameRequestId)},o.start=function(e,t){o.run(e,t)}}()},{"./Common":14,"./Engine":15,"./Events":16}],22:[function(e,t,n){var o={};t.exports=o;var i=e("./Events");!function(){o._motionWakeThreshold=.18,o._motionSleepThreshold=.08,o._minBias=.9,o.update=function(e,t){for(var n=t*t*t,i=0;i<e.length;i++){var r=e[i],s=r.speed*r.speed+r.angularSpeed*r.angularSpeed;if(0===r.force.x&&0===r.force.y){var a=Math.min(r.motion,s),l=Math.max(r.motion,s);r.motion=o._minBias*a+(1-o._minBias)*l,r.sleepThreshold>0&&r.motion<o._motionSleepThreshold*n?(r.sleepCounter+=1,r.sleepCounter>=r.sleepThreshold&&o.set(r,!0)):r.sleepCounter>0&&(r.sleepCounter-=1)}else o.set(r,!1)}},o.afterCollisions=function(e,t){for(var n=t*t*t,i=0;i<e.length;i++){var r=e[i];if(r.isActive){var s=r.collision,a=s.bodyA.parent,l=s.bodyB.parent;if(!(a.isSleeping&&l.isSleeping||a.isStatic||l.isStatic)&&(a.isSleeping||l.isSleeping)){var c=a.isSleeping&&!a.isStatic?a:l,d=c===a?l:a;!c.isStatic&&d.motion>o._motionWakeThreshold*n&&o.set(c,!1)}}}},o.set=function(e,t){var n=e.isSleeping;t?(e.isSleeping=!0,e.sleepCounter=e.sleepThreshold,e.positionImpulse.x=0,e.positionImpulse.y=0,e.positionPrev.x=e.position.x,e.positionPrev.y=e.position.y,e.anglePrev=e.angle,e.speed=0,e.angularSpeed=0,e.motion=0,n||i.trigger(e,"sleepStart")):(e.isSleeping=!1,e.sleepCounter=0,n&&i.trigger(e,"sleepEnd"))}}()},{"./Events":16}],23:[function(e,t,n){(function(n){var o={};t.exports=o;var i=e("../geometry/Vertices"),r=e("../core/Common"),s=e("../body/Body"),a=e("../geometry/Bounds"),l=e("../geometry/Vector"),c="undefined"!=typeof window?window.decomp:"undefined"!=typeof n?n.decomp:null;!function(){o.rectangle=function(e,t,n,o,a){a=a||{};var l={label:"Rectangle Body",position:{x:e,y:t},vertices:i.fromPath("L 0 0 L "+n+" 0 L "+n+" "+o+" L 0 "+o)};if(a.chamfer){var c=a.chamfer;l.vertices=i.chamfer(l.vertices,c.radius,c.quality,c.qualityMin,c.qualityMax),delete a.chamfer}return s.create(r.extend({},l,a))},o.trapezoid=function(e,t,n,o,a,l){l=l||{},a*=.5;var c,d=(1-2*a)*n,u=n*a,p=u+d,f=p+u;c=a<.5?"L 0 0 L "+u+" "+-o+" L "+p+" "+-o+" L "+f+" 0":"L 0 0 L "+p+" "+-o+" L "+f+" 0";var m={label:"Trapezoid Body",position:{x:e,y:t},vertices:i.fromPath(c)};if(l.chamfer){var v=l.chamfer;m.vertices=i.chamfer(m.vertices,v.radius,v.quality,v.qualityMin,v.qualityMax),delete l.chamfer}return s.create(r.extend({},m,l))},o.circle=function(e,t,n,i,s){i=i||{};var a={label:"Circle Body",circleRadius:n};s=s||25;var l=Math.ceil(Math.max(10,Math.min(s,n)));return l%2===1&&(l+=1),o.polygon(e,t,l,n,r.extend({},a,i))},o.polygon=function(e,t,n,a,l){if(l=l||{},n<3)return o.circle(e,t,a,l);for(var c=2*Math.PI/n,d="",u=.5*c,p=0;p<n;p+=1){var f=u+p*c,m=Math.cos(f)*a,v=Math.sin(f)*a;d+="L "+m.toFixed(3)+" "+v.toFixed(3)+" "}var y={label:"Polygon Body",position:{x:e,y:t},vertices:i.fromPath(d)};if(l.chamfer){var g=l.chamfer;y.vertices=i.chamfer(y.vertices,g.radius,g.quality,g.qualityMin,g.qualityMax),delete l.chamfer}return s.create(r.extend({},y,l))},o.fromVertices=function(e,t,n,o,d,u,p){var f,m,v,y,g,x,h,b,w;for(o=o||{},m=[],d="undefined"!=typeof d&&d,u="undefined"!=typeof u?u:.01,p="undefined"!=typeof p?p:10,c||r.warn("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull."),r.isArray(n[0])||(n=[n]),b=0;b<n.length;b+=1)if(y=n[b],v=i.isConvex(y),v||!c)y=v?i.clockwiseSort(y):i.hull(y),m.push({position:{x:e,y:t},vertices:y});else{var S=y.map(function(e){return[e.x,e.y]});c.makeCCW(S),u!==!1&&c.removeCollinearPoints(S,u);var C=c.quickDecomp(S);for(g=0;g<C.length;g++){var A=C[g],P=A.map(function(e){return{x:e[0],y:e[1]}});p>0&&i.area(P)<p||m.push({position:i.centre(P),vertices:P})}}for(g=0;g<m.length;g++)m[g]=s.create(r.extend(m[g],o));if(d){var B=5;for(g=0;g<m.length;g++){var M=m[g];for(x=g+1;x<m.length;x++){var k=m[x];if(a.overlaps(M.bounds,k.bounds)){var I=M.vertices,T=k.vertices;for(h=0;h<M.vertices.length;h++)for(w=0;w<k.vertices.length;w++){var V=l.magnitudeSquared(l.sub(I[(h+1)%I.length],T[w])),_=l.magnitudeSquared(l.sub(I[h],T[(w+1)%T.length]));V<B&&_<B&&(I[h].isInternal=!0,T[w].isInternal=!0)}}}}}return m.length>1?(f=s.create(r.extend({parts:m.slice(0)},o)),s.setPosition(f,{x:e,y:t}),f):m[0]}}()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../body/Body":1,"../core/Common":14,"../geometry/Bounds":26,"../geometry/Vector":28,"../geometry/Vertices":29}],24:[function(e,t,n){var o={};t.exports=o;var i=e("../body/Composite"),r=e("../constraint/Constraint"),s=e("../core/Common"),a=e("../body/Body"),l=e("./Bodies");!function(){o.stack=function(e,t,n,o,r,s,l){for(var c,d=i.create({label:"Stack"}),u=e,p=t,f=0,m=0;m<o;m++){for(var v=0,y=0;y<n;y++){var g=l(u,p,y,m,c,f);if(g){var x=g.bounds.max.y-g.bounds.min.y,h=g.bounds.max.x-g.bounds.min.x;x>v&&(v=x),a.translate(g,{x:.5*h,y:.5*x}),u=g.bounds.max.x+r,i.addBody(d,g),c=g,f+=1}else u+=r}p+=v+s,u=e}return d},o.chain=function(e,t,n,o,a,l){for(var c=e.bodies,d=1;d<c.length;d++){var u=c[d-1],p=c[d],f=u.bounds.max.y-u.bounds.min.y,m=u.bounds.max.x-u.bounds.min.x,v=p.bounds.max.y-p.bounds.min.y,y=p.bounds.max.x-p.bounds.min.x,g={bodyA:u,pointA:{x:m*t,y:f*n},bodyB:p,pointB:{x:y*o,y:v*a}},x=s.extend(g,l);i.addConstraint(e,r.create(x))}return e.label+=" Chain",e},o.mesh=function(e,t,n,o,a){var l,c,d,u,p,f=e.bodies;for(l=0;l<n;l++){for(c=1;c<t;c++)d=f[c-1+l*t],u=f[c+l*t],i.addConstraint(e,r.create(s.extend({bodyA:d,bodyB:u},a)));if(l>0)for(c=0;c<t;c++)d=f[c+(l-1)*t],u=f[c+l*t],i.addConstraint(e,r.create(s.extend({bodyA:d,bodyB:u},a))),o&&c>0&&(p=f[c-1+(l-1)*t],i.addConstraint(e,r.create(s.extend({bodyA:p,bodyB:u},a)))),o&&c<t-1&&(p=f[c+1+(l-1)*t],i.addConstraint(e,r.create(s.extend({bodyA:p,bodyB:u},a))))}return e.label+=" Mesh",e},o.pyramid=function(e,t,n,i,r,s,l){return o.stack(e,t,n,i,r,s,function(t,o,s,c,d,u){var p=Math.min(i,Math.ceil(n/2)),f=d?d.bounds.max.x-d.bounds.min.x:0;if(!(c>p)){c=p-c;var m=c,v=n-1-c;if(!(s<m||s>v)){1===u&&a.translate(d,{x:(s+(n%2===1?1:-1))*f,y:0});var y=d?s*f:0;return l(e+y+s*r,o,s,c,d,u)}}})},o.newtonsCradle=function(e,t,n,o,s){for(var a=i.create({label:"Newtons Cradle"}),c=0;c<n;c++){var d=1.9,u=l.circle(e+c*(o*d),t+s,o,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),p=r.create({pointA:{x:e+c*(o*d),y:t},bodyB:u});i.addBody(a,u),i.addConstraint(a,p)}return a},o.car=function(e,t,n,o,s){var c=a.nextGroup(!0),d=20,u=.5*-n+d,p=.5*n-d,f=0,m=i.create({label:"Car"}),v=l.rectangle(e,t,n,o,{collisionFilter:{group:c},chamfer:{radius:.5*o},density:2e-4}),y=l.circle(e+u,t+f,s,{collisionFilter:{group:c},friction:.8}),g=l.circle(e+p,t+f,s,{collisionFilter:{group:c},friction:.8}),x=r.create({bodyB:v,pointB:{x:u,y:f},bodyA:y,stiffness:1,length:0}),h=r.create({bodyB:v,pointB:{x:p,y:f},bodyA:g,stiffness:1,length:0});return i.addBody(m,v),i.addBody(m,y),i.addBody(m,g),i.addConstraint(m,x),i.addConstraint(m,h),m},o.softBody=function(e,t,n,i,r,a,c,d,u,p){u=s.extend({inertia:1/0},u),p=s.extend({stiffness:.2,render:{type:"line",anchors:!1}},p);var f=o.stack(e,t,n,i,r,a,function(e,t){return l.circle(e,t,d,u)});return o.mesh(f,n,i,c,p),f.label="Soft Body",f}}()},{"../body/Body":1,"../body/Composite":2,"../constraint/Constraint":12,"../core/Common":14,"./Bodies":23}],25:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vector"),r=e("../core/Common");!function(){o.fromVertices=function(e){for(var t={},n=0;n<e.length;n++){var o=(n+1)%e.length,s=i.normalise({x:e[o].y-e[n].y,y:e[n].x-e[o].x}),a=0===s.y?1/0:s.x/s.y;a=a.toFixed(3).toString(),t[a]=s}return r.values(t)},o.rotate=function(e,t){if(0!==t)for(var n=Math.cos(t),o=Math.sin(t),i=0;i<e.length;i++){var r,s=e[i];r=s.x*n-s.y*o,s.y=s.x*o+s.y*n,s.x=r}}}()},{"../core/Common":14,"../geometry/Vector":28}],26:[function(e,t,n){var o={};t.exports=o,function(){o.create=function(e){var t={min:{x:0,y:0},max:{x:0,y:0}};return e&&o.update(t,e),t},o.update=function(e,t,n){e.min.x=1/0,e.max.x=-(1/0),e.min.y=1/0,e.max.y=-(1/0);for(var o=0;o<t.length;o++){var i=t[o];i.x>e.max.x&&(e.max.x=i.x),i.x<e.min.x&&(e.min.x=i.x),i.y>e.max.y&&(e.max.y=i.y),i.y<e.min.y&&(e.min.y=i.y)}n&&(n.x>0?e.max.x+=n.x:e.min.x+=n.x,n.y>0?e.max.y+=n.y:e.min.y+=n.y)},o.contains=function(e,t){return t.x>=e.min.x&&t.x<=e.max.x&&t.y>=e.min.y&&t.y<=e.max.y},o.overlaps=function(e,t){return e.min.x<=t.max.x&&e.max.x>=t.min.x&&e.max.y>=t.min.y&&e.min.y<=t.max.y},o.translate=function(e,t){e.min.x+=t.x,e.max.x+=t.x,e.min.y+=t.y,e.max.y+=t.y},o.shift=function(e,t){var n=e.max.x-e.min.x,o=e.max.y-e.min.y;e.min.x=t.x,e.max.x=t.x+n,e.min.y=t.y,e.max.y=t.y+o}}()},{}],27:[function(e,t,n){var o={};t.exports=o;e("../geometry/Bounds");!function(){o.pathToVertices=function(t,n){var o,i,r,s,a,l,c,d,u,p,f,m,v=[],y=0,g=0,x=0;n=n||15;var h=function(e,t,n){var o=n%2===1&&n>1;if(!u||e!=u.x||t!=u.y){u&&o?(f=u.x,m=u.y):(f=0,m=0);var i={x:f+e,y:m+t};!o&&u||(u=i),v.push(i),g=f+e,x=m+t}},b=function(e){var t=e.pathSegTypeAsLetter.toUpperCase();if("Z"!==t){switch(t){case"M":case"L":case"T":case"C":case"S":case"Q":g=e.x,x=e.y;break;case"H":g=e.x;break;case"V":x=e.y}h(g,x,e.pathSegType)}};for(e(t),r=t.getTotalLength(),l=[],o=0;o<t.pathSegList.numberOfItems;o+=1)l.push(t.pathSegList.getItem(o));for(c=l.concat();y<r;){if(p=t.getPathSegAtLength(y),a=l[p],a!=d){for(;c.length&&c[0]!=a;)b(c.shift());d=a}switch(a.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":s=t.getPointAtLength(y),h(s.x,s.y,0)}y+=n}for(o=0,i=c.length;o<i;++o)b(c[o]);return v};var e=function(e){for(var t,n,o,i,r,s,a=e.pathSegList,l=0,c=0,d=a.numberOfItems,u=0;u<d;++u){var p=a.getItem(u),f=p.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(f))"x"in p&&(l=p.x),"y"in p&&(c=p.y);else switch("x1"in p&&(o=l+p.x1),"x2"in p&&(r=l+p.x2),"y1"in p&&(i=c+p.y1),"y2"in p&&(s=c+p.y2),"x"in p&&(l+=p.x),"y"in p&&(c+=p.y),f){case"m":a.replaceItem(e.createSVGPathSegMovetoAbs(l,c),u);break;case"l":a.replaceItem(e.createSVGPathSegLinetoAbs(l,c),u);break;case"h":a.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(l),u);break;case"v":a.replaceItem(e.createSVGPathSegLinetoVerticalAbs(c),u);break;case"c":a.replaceItem(e.createSVGPathSegCurvetoCubicAbs(l,c,o,i,r,s),u);break;case"s":a.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(l,c,r,s),u);break;case"q":a.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(l,c,o,i),u);break;case"t":a.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(l,c),u);break;case"a":a.replaceItem(e.createSVGPathSegArcAbs(l,c,p.r1,p.r2,p.angle,p.largeArcFlag,p.sweepFlag),u);break;case"z":case"Z":l=t,c=n}"M"!=f&&"m"!=f||(t=l,n=c)}}}()},{"../geometry/Bounds":26}],28:[function(e,t,n){var o={};t.exports=o,function(){o.create=function(e,t){return{x:e||0,y:t||0}},o.clone=function(e){return{x:e.x,y:e.y}},o.magnitude=function(e){return Math.sqrt(e.x*e.x+e.y*e.y)},o.magnitudeSquared=function(e){return e.x*e.x+e.y*e.y},o.rotate=function(e,t,n){var o=Math.cos(t),i=Math.sin(t);n||(n={});var r=e.x*o-e.y*i;return n.y=e.x*i+e.y*o,n.x=r,n},o.rotateAbout=function(e,t,n,o){var i=Math.cos(t),r=Math.sin(t);o||(o={});var s=n.x+((e.x-n.x)*i-(e.y-n.y)*r);return o.y=n.y+((e.x-n.x)*r+(e.y-n.y)*i),o.x=s,o},o.normalise=function(e){var t=o.magnitude(e);return 0===t?{x:0,y:0}:{x:e.x/t,y:e.y/t}},o.dot=function(e,t){return e.x*t.x+e.y*t.y},o.cross=function(e,t){return e.x*t.y-e.y*t.x},o.cross3=function(e,t,n){return(t.x-e.x)*(n.y-e.y)-(t.y-e.y)*(n.x-e.x)},o.add=function(e,t,n){return n||(n={}),n.x=e.x+t.x,n.y=e.y+t.y,n},o.sub=function(e,t,n){return n||(n={}),n.x=e.x-t.x,n.y=e.y-t.y,n},o.mult=function(e,t){return{x:e.x*t,y:e.y*t}},o.div=function(e,t){return{x:e.x/t,y:e.y/t}},o.perp=function(e,t){return t=t===!0?-1:1,{x:t*-e.y,y:t*e.x}},o.neg=function(e){return{x:-e.x,y:-e.y}},o.angle=function(e,t){return Math.atan2(t.y-e.y,t.x-e.x)},o._temp=[o.create(),o.create(),o.create(),o.create(),o.create(),o.create()]}()},{}],29:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Vector"),r=e("../core/Common");!function(){o.create=function(e,t){for(var n=[],o=0;o<e.length;o++){var i=e[o],r={x:i.x,y:i.y,index:o,body:t,isInternal:!1};n.push(r)}return n},o.fromPath=function(e,t){var n=/L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi,i=[];return e.replace(n,function(e,t,n){i.push({x:parseFloat(t),y:parseFloat(n)})}),o.create(i,t)},o.centre=function(e){for(var t,n,r,s=o.area(e,!0),a={x:0,y:0},l=0;l<e.length;l++)r=(l+1)%e.length,t=i.cross(e[l],e[r]),n=i.mult(i.add(e[l],e[r]),t),a=i.add(a,n);return i.div(a,6*s)},o.mean=function(e){for(var t={x:0,y:0},n=0;n<e.length;n++)t.x+=e[n].x,t.y+=e[n].y;return i.div(t,e.length)},o.area=function(e,t){for(var n=0,o=e.length-1,i=0;i<e.length;i++)n+=(e[o].x-e[i].x)*(e[o].y+e[i].y),o=i;return t?n/2:Math.abs(n)/2},o.inertia=function(e,t){for(var n,o,r=0,s=0,a=e,l=0;l<a.length;l++)o=(l+1)%a.length,n=Math.abs(i.cross(a[o],a[l])),r+=n*(i.dot(a[o],a[o])+i.dot(a[o],a[l])+i.dot(a[l],a[l])),s+=n;return t/6*(r/s)},o.translate=function(e,t,n){var o;if(n)for(o=0;o<e.length;o++)e[o].x+=t.x*n,e[o].y+=t.y*n;else for(o=0;o<e.length;o++)e[o].x+=t.x,e[o].y+=t.y;return e},o.rotate=function(e,t,n){if(0!==t){for(var o=Math.cos(t),i=Math.sin(t),r=0;r<e.length;r++){var s=e[r],a=s.x-n.x,l=s.y-n.y;s.x=n.x+(a*o-l*i),s.y=n.y+(a*i+l*o)}return e}},o.contains=function(e,t){for(var n=0;n<e.length;n++){var o=e[n],i=e[(n+1)%e.length];if((t.x-o.x)*(i.y-o.y)+(t.y-o.y)*(o.x-i.x)>0)return!1}return!0},o.scale=function(e,t,n,r){if(1===t&&1===n)return e;r=r||o.centre(e);for(var s,a,l=0;l<e.length;l++)s=e[l],a=i.sub(s,r),e[l].x=r.x+a.x*t,e[l].y=r.y+a.y*n;return e},o.chamfer=function(e,t,n,o,s){t=t||[8],t.length||(t=[t]),n="undefined"!=typeof n?n:-1,o=o||2,s=s||14;for(var a=[],l=0;l<e.length;l++){var c=e[l-1>=0?l-1:e.length-1],d=e[l],u=e[(l+1)%e.length],p=t[l<t.length?l:t.length-1];if(0!==p){var f=i.normalise({x:d.y-c.y,y:c.x-d.x}),m=i.normalise({x:u.y-d.y,y:d.x-u.x}),v=Math.sqrt(2*Math.pow(p,2)),y=i.mult(r.clone(f),p),g=i.normalise(i.mult(i.add(f,m),.5)),x=i.sub(d,i.mult(g,v)),h=n;n===-1&&(h=1.75*Math.pow(p,.32)),h=r.clamp(h,o,s),h%2===1&&(h+=1);for(var b=Math.acos(i.dot(f,m)),w=b/h,S=0;S<h;S++)a.push(i.add(i.rotate(y,w*S),x))}else a.push(d)}return a},o.clockwiseSort=function(e){var t=o.mean(e);return e.sort(function(e,n){return i.angle(t,e)-i.angle(t,n)}),e},o.isConvex=function(e){var t,n,o,i,r=0,s=e.length;if(s<3)return null;for(t=0;t<s;t++)if(n=(t+1)%s,o=(t+2)%s,i=(e[n].x-e[t].x)*(e[o].y-e[n].y),i-=(e[n].y-e[t].y)*(e[o].x-e[n].x),i<0?r|=1:i>0&&(r|=2),3===r)return!1;return 0!==r||null},o.hull=function(e){var t,n,o=[],r=[];for(e=e.slice(0),e.sort(function(e,t){var n=e.x-t.x;return 0!==n?n:e.y-t.y}),n=0;n<e.length;n+=1){for(t=e[n];r.length>=2&&i.cross3(r[r.length-2],r[r.length-1],t)<=0;)r.pop();r.push(t)}for(n=e.length-1;n>=0;n-=1){for(t=e[n];o.length>=2&&i.cross3(o[o.length-2],o[o.length-1],t)<=0;)o.pop();o.push(t)}return o.pop(),r.pop(),o.concat(r)}}()},{"../core/Common":14,"../geometry/Vector":28}],30:[function(e,t,n){var o=t.exports=e("../core/Matter");o.Body=e("../body/Body"),o.Composite=e("../body/Composite"),o.World=e("../body/World"),o.Contact=e("../collision/Contact"),o.Detector=e("../collision/Detector"),o.Grid=e("../collision/Grid"),o.Pairs=e("../collision/Pairs"),o.Pair=e("../collision/Pair"),o.Query=e("../collision/Query"),o.Resolver=e("../collision/Resolver"),o.SAT=e("../collision/SAT"),o.Constraint=e("../constraint/Constraint"),o.MouseConstraint=e("../constraint/MouseConstraint"),o.Common=e("../core/Common"),o.Engine=e("../core/Engine"),o.Events=e("../core/Events"),o.Mouse=e("../core/Mouse"),o.Runner=e("../core/Runner"),o.Sleeping=e("../core/Sleeping"),o.Plugin=e("../core/Plugin"),o.Bodies=e("../factory/Bodies"),o.Composites=e("../factory/Composites"),o.Axes=e("../geometry/Axes"),o.Bounds=e("../geometry/Bounds"),o.Svg=e("../geometry/Svg"),o.Vector=e("../geometry/Vector"),o.Vertices=e("../geometry/Vertices"),o.Render=e("../render/Render"),o.RenderPixi=e("../render/RenderPixi"),o.World.add=o.Composite.add,
	o.World.remove=o.Composite.remove,o.World.addComposite=o.Composite.addComposite,o.World.addBody=o.Composite.addBody,o.World.addConstraint=o.Composite.addConstraint,o.World.clear=o.Composite.clear,o.Engine.run=o.Runner.run},{"../body/Body":1,"../body/Composite":2,"../body/World":3,"../collision/Contact":4,"../collision/Detector":5,"../collision/Grid":6,"../collision/Pair":7,"../collision/Pairs":8,"../collision/Query":9,"../collision/Resolver":10,"../collision/SAT":11,"../constraint/Constraint":12,"../constraint/MouseConstraint":13,"../core/Common":14,"../core/Engine":15,"../core/Events":16,"../core/Matter":17,"../core/Metrics":18,"../core/Mouse":19,"../core/Plugin":20,"../core/Runner":21,"../core/Sleeping":22,"../factory/Bodies":23,"../factory/Composites":24,"../geometry/Axes":25,"../geometry/Bounds":26,"../geometry/Svg":27,"../geometry/Vector":28,"../geometry/Vertices":29,"../render/Render":31,"../render/RenderPixi":32}],31:[function(e,t,n){var o={};t.exports=o;var i=e("../core/Common"),r=e("../body/Composite"),s=e("../geometry/Bounds"),a=e("../core/Events"),l=e("../collision/Grid"),c=e("../geometry/Vector"),d=e("../core/Mouse");!function(){var e,t;"undefined"!=typeof window&&(e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(function(){e(i.now())},1e3/60)},t=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),o.create=function(e){var t={controller:o,engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,options:{width:800,height:600,pixelRatio:1,background:"#18181d",wireframeBackground:"#0f0f13",hasBounds:!!e.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},r=i.extend(t,e);return r.canvas&&(r.canvas.width=r.options.width||r.canvas.width,r.canvas.height=r.options.height||r.canvas.height),r.mouse=e.mouse,r.engine=e.engine,r.canvas=r.canvas||n(r.options.width,r.options.height),r.context=r.canvas.getContext("2d"),r.textures={},r.bounds=r.bounds||{min:{x:0,y:0},max:{x:r.canvas.width,y:r.canvas.height}},1!==r.options.pixelRatio&&o.setPixelRatio(r,r.options.pixelRatio),i.isElement(r.element)?r.element.appendChild(r.canvas):i.log("Render.create: options.element was undefined, render.canvas was created but not appended","warn"),r},o.run=function(t){!function n(i){t.frameRequestId=e(n),o.world(t)}()},o.stop=function(e){t(e.frameRequestId)},o.setPixelRatio=function(e,t){var n=e.options,o=e.canvas;"auto"===t&&(t=u(o)),n.pixelRatio=t,o.setAttribute("data-pixel-ratio",t),o.width=n.width*t,o.height=n.height*t,o.style.width=n.width+"px",o.style.height=n.height+"px",e.context.scale(t,t)},o.lookAt=function(e,t,n,o){o="undefined"==typeof o||o,t=i.isArray(t)?t:[t],n=n||{x:0,y:0};for(var r={min:{x:1/0,y:1/0},max:{x:-(1/0),y:-(1/0)}},s=0;s<t.length;s+=1){var a=t[s],l=a.bounds?a.bounds.min:a.min||a.position||a,c=a.bounds?a.bounds.max:a.max||a.position||a;l&&c&&(l.x<r.min.x&&(r.min.x=l.x),c.x>r.max.x&&(r.max.x=c.x),l.y<r.min.y&&(r.min.y=l.y),c.y>r.max.y&&(r.max.y=c.y))}var u=r.max.x-r.min.x+2*n.x,p=r.max.y-r.min.y+2*n.y,f=e.canvas.height,m=e.canvas.width,v=m/f,y=u/p,g=1,x=1;y>v?x=y/v:g=v/y,e.options.hasBounds=!0,e.bounds.min.x=r.min.x,e.bounds.max.x=r.min.x+u*g,e.bounds.min.y=r.min.y,e.bounds.max.y=r.min.y+p*x,o&&(e.bounds.min.x+=.5*u-u*g*.5,e.bounds.max.x+=.5*u-u*g*.5,e.bounds.min.y+=.5*p-p*x*.5,e.bounds.max.y+=.5*p-p*x*.5),e.bounds.min.x-=n.x,e.bounds.max.x-=n.x,e.bounds.min.y-=n.y,e.bounds.max.y-=n.y,e.mouse&&(d.setScale(e.mouse,{x:(e.bounds.max.x-e.bounds.min.x)/e.canvas.width,y:(e.bounds.max.y-e.bounds.min.y)/e.canvas.height}),d.setOffset(e.mouse,e.bounds.min))},o.startViewTransform=function(e){var t=e.bounds.max.x-e.bounds.min.x,n=e.bounds.max.y-e.bounds.min.y,o=t/e.options.width,i=n/e.options.height;e.context.scale(1/o,1/i),e.context.translate(-e.bounds.min.x,-e.bounds.min.y)},o.endViewTransform=function(e){e.context.setTransform(e.options.pixelRatio,0,0,e.options.pixelRatio,0,0)},o.world=function(e){var t,n=e.engine,i=n.world,u=e.canvas,p=e.context,m=e.options,v=r.allBodies(i),y=r.allConstraints(i),g=m.wireframes?m.wireframeBackground:m.background,x=[],h=[],b={timestamp:n.timing.timestamp};if(a.trigger(e,"beforeRender",b),e.currentBackground!==g&&f(e,g),p.globalCompositeOperation="source-in",p.fillStyle="transparent",p.fillRect(0,0,u.width,u.height),p.globalCompositeOperation="source-over",m.hasBounds){for(t=0;t<v.length;t++){var w=v[t];s.overlaps(w.bounds,e.bounds)&&x.push(w)}for(t=0;t<y.length;t++){var S=y[t],C=S.bodyA,A=S.bodyB,P=S.pointA,B=S.pointB;C&&(P=c.add(C.position,S.pointA)),A&&(B=c.add(A.position,S.pointB)),P&&B&&(s.contains(e.bounds,P)||s.contains(e.bounds,B))&&h.push(S)}o.startViewTransform(e),e.mouse&&(d.setScale(e.mouse,{x:(e.bounds.max.x-e.bounds.min.x)/e.canvas.width,y:(e.bounds.max.y-e.bounds.min.y)/e.canvas.height}),d.setOffset(e.mouse,e.bounds.min))}else h=y,x=v;!m.wireframes||n.enableSleeping&&m.showSleeping?o.bodies(e,x,p):(m.showConvexHulls&&o.bodyConvexHulls(e,x,p),o.bodyWireframes(e,x,p)),m.showBounds&&o.bodyBounds(e,x,p),(m.showAxes||m.showAngleIndicator)&&o.bodyAxes(e,x,p),m.showPositions&&o.bodyPositions(e,x,p),m.showVelocity&&o.bodyVelocity(e,x,p),m.showIds&&o.bodyIds(e,x,p),m.showSeparations&&o.separations(e,n.pairs.list,p),m.showCollisions&&o.collisions(e,n.pairs.list,p),m.showVertexNumbers&&o.vertexNumbers(e,x,p),m.showMousePosition&&o.mousePosition(e,e.mouse,p),o.constraints(h,p),m.showBroadphase&&n.broadphase.controller===l&&o.grid(e,n.broadphase,p),m.showDebug&&o.debug(e,p),m.hasBounds&&o.endViewTransform(e),a.trigger(e,"afterRender",b)},o.debug=function(e,t){var n=t,o=e.engine,i=o.world,s=o.metrics,a=e.options,l=(r.allBodies(i),"    ");if(o.timing.timestamp-(e.debugTimestamp||0)>=500){var c="";s.timing&&(c+="fps: "+Math.round(s.timing.fps)+l),e.debugString=c,e.debugTimestamp=o.timing.timestamp}if(e.debugString){n.font="12px Arial",a.wireframes?n.fillStyle="rgba(255,255,255,0.5)":n.fillStyle="rgba(0,0,0,0.5)";for(var d=e.debugString.split("\n"),u=0;u<d.length;u++)n.fillText(d[u],50,50+18*u)}},o.constraints=function(e,t){for(var n=t,o=0;o<e.length;o++){var r=e[o];if(r.render.visible&&r.pointA&&r.pointB){var s,a,l=r.bodyA,d=r.bodyB;if(s=l?c.add(l.position,r.pointA):r.pointA,"pin"===r.render.type)n.beginPath(),n.arc(s.x,s.y,3,0,2*Math.PI),n.closePath();else{if(a=d?c.add(d.position,r.pointB):r.pointB,n.beginPath(),n.moveTo(s.x,s.y),"spring"===r.render.type)for(var u,p=c.sub(a,s),f=c.perp(c.normalise(p)),m=Math.ceil(i.clamp(r.length/5,12,20)),v=1;v<m;v+=1)u=v%2===0?1:-1,n.lineTo(s.x+p.x*(v/m)+f.x*u*4,s.y+p.y*(v/m)+f.y*u*4);n.lineTo(a.x,a.y)}r.render.lineWidth&&(n.lineWidth=r.render.lineWidth,n.strokeStyle=r.render.strokeStyle,n.stroke()),r.render.anchors&&(n.fillStyle=r.render.strokeStyle,n.beginPath(),n.arc(s.x,s.y,3,0,2*Math.PI),n.arc(a.x,a.y,3,0,2*Math.PI),n.closePath(),n.fill())}}},o.bodyShadows=function(e,t,n){for(var o=n,i=(e.engine,0);i<t.length;i++){var r=t[i];if(r.render.visible){if(r.circleRadius)o.beginPath(),o.arc(r.position.x,r.position.y,r.circleRadius,0,2*Math.PI),o.closePath();else{o.beginPath(),o.moveTo(r.vertices[0].x,r.vertices[0].y);for(var s=1;s<r.vertices.length;s++)o.lineTo(r.vertices[s].x,r.vertices[s].y);o.closePath()}var a=r.position.x-.5*e.options.width,l=r.position.y-.2*e.options.height,c=Math.abs(a)+Math.abs(l);o.shadowColor="rgba(0,0,0,0.15)",o.shadowOffsetX=.05*a,o.shadowOffsetY=.05*l,o.shadowBlur=1+12*Math.min(1,c/1e3),o.fill(),o.shadowColor=null,o.shadowOffsetX=null,o.shadowOffsetY=null,o.shadowBlur=null}}},o.bodies=function(e,t,n){var o,i,r,s,a=n,l=(e.engine,e.options),c=l.showInternalEdges||!l.wireframes;for(r=0;r<t.length;r++)if(o=t[r],o.render.visible)for(s=o.parts.length>1?1:0;s<o.parts.length;s++)if(i=o.parts[s],i.render.visible){if(l.showSleeping&&o.isSleeping?a.globalAlpha=.5*i.render.opacity:1!==i.render.opacity&&(a.globalAlpha=i.render.opacity),i.render.sprite&&i.render.sprite.texture&&!l.wireframes){var d=i.render.sprite,u=p(e,d.texture);a.translate(i.position.x,i.position.y),a.rotate(i.angle),a.drawImage(u,u.width*-d.xOffset*d.xScale,u.height*-d.yOffset*d.yScale,u.width*d.xScale,u.height*d.yScale),a.rotate(-i.angle),a.translate(-i.position.x,-i.position.y)}else{if(i.circleRadius)a.beginPath(),a.arc(i.position.x,i.position.y,i.circleRadius,0,2*Math.PI);else{a.beginPath(),a.moveTo(i.vertices[0].x,i.vertices[0].y);for(var f=1;f<i.vertices.length;f++)!i.vertices[f-1].isInternal||c?a.lineTo(i.vertices[f].x,i.vertices[f].y):a.moveTo(i.vertices[f].x,i.vertices[f].y),i.vertices[f].isInternal&&!c&&a.moveTo(i.vertices[(f+1)%i.vertices.length].x,i.vertices[(f+1)%i.vertices.length].y);a.lineTo(i.vertices[0].x,i.vertices[0].y),a.closePath()}l.wireframes?(a.lineWidth=1,a.strokeStyle="#bbb",a.stroke()):(a.fillStyle=i.render.fillStyle,i.render.lineWidth&&(a.lineWidth=i.render.lineWidth,a.strokeStyle=i.render.strokeStyle,a.stroke()),a.fill())}a.globalAlpha=1}},o.bodyWireframes=function(e,t,n){var o,i,r,s,a,l=n,c=e.options.showInternalEdges;for(l.beginPath(),r=0;r<t.length;r++)if(o=t[r],o.render.visible)for(a=o.parts.length>1?1:0;a<o.parts.length;a++){for(i=o.parts[a],l.moveTo(i.vertices[0].x,i.vertices[0].y),s=1;s<i.vertices.length;s++)!i.vertices[s-1].isInternal||c?l.lineTo(i.vertices[s].x,i.vertices[s].y):l.moveTo(i.vertices[s].x,i.vertices[s].y),i.vertices[s].isInternal&&!c&&l.moveTo(i.vertices[(s+1)%i.vertices.length].x,i.vertices[(s+1)%i.vertices.length].y);l.lineTo(i.vertices[0].x,i.vertices[0].y)}l.lineWidth=1,l.strokeStyle="#bbb",l.stroke()},o.bodyConvexHulls=function(e,t,n){var o,i,r,s=n;for(s.beginPath(),i=0;i<t.length;i++)if(o=t[i],o.render.visible&&1!==o.parts.length){for(s.moveTo(o.vertices[0].x,o.vertices[0].y),r=1;r<o.vertices.length;r++)s.lineTo(o.vertices[r].x,o.vertices[r].y);s.lineTo(o.vertices[0].x,o.vertices[0].y)}s.lineWidth=1,s.strokeStyle="rgba(255,255,255,0.2)",s.stroke()},o.vertexNumbers=function(e,t,n){var o,i,r,s=n;for(o=0;o<t.length;o++){var a=t[o].parts;for(r=a.length>1?1:0;r<a.length;r++){var l=a[r];for(i=0;i<l.vertices.length;i++)s.fillStyle="rgba(255,255,255,0.2)",s.fillText(o+"_"+i,l.position.x+.8*(l.vertices[i].x-l.position.x),l.position.y+.8*(l.vertices[i].y-l.position.y))}}},o.mousePosition=function(e,t,n){var o=n;o.fillStyle="rgba(255,255,255,0.8)",o.fillText(t.position.x+"  "+t.position.y,t.position.x+5,t.position.y-5)},o.bodyBounds=function(e,t,n){var o=n,i=(e.engine,e.options);o.beginPath();for(var r=0;r<t.length;r++){var s=t[r];if(s.render.visible)for(var a=t[r].parts,l=a.length>1?1:0;l<a.length;l++){var c=a[l];o.rect(c.bounds.min.x,c.bounds.min.y,c.bounds.max.x-c.bounds.min.x,c.bounds.max.y-c.bounds.min.y)}}i.wireframes?o.strokeStyle="rgba(255,255,255,0.08)":o.strokeStyle="rgba(0,0,0,0.1)",o.lineWidth=1,o.stroke()},o.bodyAxes=function(e,t,n){var o,i,r,s,a=n,l=(e.engine,e.options);for(a.beginPath(),i=0;i<t.length;i++){var c=t[i],d=c.parts;if(c.render.visible)if(l.showAxes)for(r=d.length>1?1:0;r<d.length;r++)for(o=d[r],s=0;s<o.axes.length;s++){var u=o.axes[s];a.moveTo(o.position.x,o.position.y),a.lineTo(o.position.x+20*u.x,o.position.y+20*u.y)}else for(r=d.length>1?1:0;r<d.length;r++)for(o=d[r],s=0;s<o.axes.length;s++)a.moveTo(o.position.x,o.position.y),a.lineTo((o.vertices[0].x+o.vertices[o.vertices.length-1].x)/2,(o.vertices[0].y+o.vertices[o.vertices.length-1].y)/2)}l.wireframes?(a.strokeStyle="indianred",a.lineWidth=1):(a.strokeStyle="rgba(255, 255, 255, 0.4)",a.globalCompositeOperation="overlay",a.lineWidth=2),a.stroke(),a.globalCompositeOperation="source-over"},o.bodyPositions=function(e,t,n){var o,i,r,s,a=n,l=(e.engine,e.options);for(a.beginPath(),r=0;r<t.length;r++)if(o=t[r],o.render.visible)for(s=0;s<o.parts.length;s++)i=o.parts[s],a.arc(i.position.x,i.position.y,3,0,2*Math.PI,!1),a.closePath();for(l.wireframes?a.fillStyle="indianred":a.fillStyle="rgba(0,0,0,0.5)",a.fill(),a.beginPath(),r=0;r<t.length;r++)o=t[r],o.render.visible&&(a.arc(o.positionPrev.x,o.positionPrev.y,2,0,2*Math.PI,!1),a.closePath());a.fillStyle="rgba(255,165,0,0.8)",a.fill()},o.bodyVelocity=function(e,t,n){var o=n;o.beginPath();for(var i=0;i<t.length;i++){var r=t[i];r.render.visible&&(o.moveTo(r.position.x,r.position.y),o.lineTo(r.position.x+2*(r.position.x-r.positionPrev.x),r.position.y+2*(r.position.y-r.positionPrev.y)))}o.lineWidth=3,o.strokeStyle="cornflowerblue",o.stroke()},o.bodyIds=function(e,t,n){var o,i,r=n;for(o=0;o<t.length;o++)if(t[o].render.visible){var s=t[o].parts;for(i=s.length>1?1:0;i<s.length;i++){var a=s[i];r.font="12px Arial",r.fillStyle="rgba(255,255,255,0.5)",r.fillText(a.id,a.position.x+10,a.position.y-10)}}},o.collisions=function(e,t,n){var o,i,r,s,a=n,l=e.options;for(a.beginPath(),r=0;r<t.length;r++)if(o=t[r],o.isActive)for(i=o.collision,s=0;s<o.activeContacts.length;s++){var c=o.activeContacts[s],d=c.vertex;a.rect(d.x-1.5,d.y-1.5,3.5,3.5)}for(l.wireframes?a.fillStyle="rgba(255,255,255,0.7)":a.fillStyle="orange",a.fill(),a.beginPath(),r=0;r<t.length;r++)if(o=t[r],o.isActive&&(i=o.collision,o.activeContacts.length>0)){var u=o.activeContacts[0].vertex.x,p=o.activeContacts[0].vertex.y;2===o.activeContacts.length&&(u=(o.activeContacts[0].vertex.x+o.activeContacts[1].vertex.x)/2,p=(o.activeContacts[0].vertex.y+o.activeContacts[1].vertex.y)/2),i.bodyB===i.supports[0].body||i.bodyA.isStatic===!0?a.moveTo(u-8*i.normal.x,p-8*i.normal.y):a.moveTo(u+8*i.normal.x,p+8*i.normal.y),a.lineTo(u,p)}l.wireframes?a.strokeStyle="rgba(255,165,0,0.7)":a.strokeStyle="orange",a.lineWidth=1,a.stroke()},o.separations=function(e,t,n){var o,i,r,s,a,l=n,c=e.options;for(l.beginPath(),a=0;a<t.length;a++)if(o=t[a],o.isActive){i=o.collision,r=i.bodyA,s=i.bodyB;var d=1;s.isStatic||r.isStatic||(d=.5),s.isStatic&&(d=0),l.moveTo(s.position.x,s.position.y),l.lineTo(s.position.x-i.penetration.x*d,s.position.y-i.penetration.y*d),d=1,s.isStatic||r.isStatic||(d=.5),r.isStatic&&(d=0),l.moveTo(r.position.x,r.position.y),l.lineTo(r.position.x+i.penetration.x*d,r.position.y+i.penetration.y*d)}c.wireframes?l.strokeStyle="rgba(255,165,0,0.5)":l.strokeStyle="orange",l.stroke()},o.grid=function(e,t,n){var o=n,r=e.options;r.wireframes?o.strokeStyle="rgba(255,180,0,0.1)":o.strokeStyle="rgba(255,180,0,0.5)",o.beginPath();for(var s=i.keys(t.buckets),a=0;a<s.length;a++){var l=s[a];if(!(t.buckets[l].length<2)){var c=l.split(/C|R/);o.rect(.5+parseInt(c[1],10)*t.bucketWidth,.5+parseInt(c[2],10)*t.bucketHeight,t.bucketWidth,t.bucketHeight)}}o.lineWidth=1,o.stroke()},o.inspector=function(e,t){var n,o=(e.engine,e.selected),i=e.render,r=i.options;if(r.hasBounds){var s=i.bounds.max.x-i.bounds.min.x,a=i.bounds.max.y-i.bounds.min.y,l=s/i.options.width,c=a/i.options.height;t.scale(1/l,1/c),t.translate(-i.bounds.min.x,-i.bounds.min.y)}for(var d=0;d<o.length;d++){var u=o[d].data;switch(t.translate(.5,.5),t.lineWidth=1,t.strokeStyle="rgba(255,165,0,0.9)",t.setLineDash([1,2]),u.type){case"body":n=u.bounds,t.beginPath(),t.rect(Math.floor(n.min.x-3),Math.floor(n.min.y-3),Math.floor(n.max.x-n.min.x+6),Math.floor(n.max.y-n.min.y+6)),t.closePath(),t.stroke();break;case"constraint":var p=u.pointA;u.bodyA&&(p=u.pointB),t.beginPath(),t.arc(p.x,p.y,10,0,2*Math.PI),t.closePath(),t.stroke()}t.setLineDash([]),t.translate(-.5,-.5)}null!==e.selectStart&&(t.translate(.5,.5),t.lineWidth=1,t.strokeStyle="rgba(255,165,0,0.6)",t.fillStyle="rgba(255,165,0,0.1)",n=e.selectBounds,t.beginPath(),t.rect(Math.floor(n.min.x),Math.floor(n.min.y),Math.floor(n.max.x-n.min.x),Math.floor(n.max.y-n.min.y)),t.closePath(),t.stroke(),t.fill(),t.translate(-.5,-.5)),r.hasBounds&&t.setTransform(1,0,0,1,0,0)};var n=function(e,t){var n=document.createElement("canvas");return n.width=e,n.height=t,n.oncontextmenu=function(){return!1},n.onselectstart=function(){return!1},n},u=function(e){var t=e.getContext("2d"),n=window.devicePixelRatio||1,o=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1;return n/o},p=function(e,t){var n=e.textures[t];return n?n:(n=e.textures[t]=new Image,n.src=t,n)},f=function(e,t){var n=t;/(jpg|gif|png)$/.test(t)&&(n="url("+t+")"),e.canvas.style.background=n,e.canvas.style.backgroundSize="contain",e.currentBackground=t}}()},{"../body/Composite":2,"../collision/Grid":6,"../core/Common":14,"../core/Events":16,"../core/Mouse":19,"../geometry/Bounds":26,"../geometry/Vector":28}],32:[function(e,t,n){var o={};t.exports=o;var i=e("../geometry/Bounds"),r=e("../body/Composite"),s=e("../core/Common"),a=e("../core/Events"),l=e("../geometry/Vector");!function(){var e,t;"undefined"!=typeof window&&(e=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(function(){e(s.now())},1e3/60)},t=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),o.create=function(e){s.warn("RenderPixi.create: Matter.RenderPixi is deprecated (see docs)");var t={controller:o,engine:null,element:null,frameRequestId:null,canvas:null,renderer:null,container:null,spriteContainer:null,pixiOptions:null,options:{width:800,height:600,background:"#fafafa",wireframeBackground:"#222",hasBounds:!1,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1}},n=s.extend(t,e),i=!n.options.wireframes&&"transparent"===n.options.background;return n.pixiOptions=n.pixiOptions||{view:n.canvas,transparent:i,antialias:!0,backgroundColor:e.background},n.mouse=e.mouse,n.engine=e.engine,n.renderer=n.renderer||new PIXI.WebGLRenderer(n.options.width,n.options.height,n.pixiOptions),n.container=n.container||new PIXI.Container,n.spriteContainer=n.spriteContainer||new PIXI.Container,n.canvas=n.canvas||n.renderer.view,n.bounds=n.bounds||{min:{x:0,y:0},max:{x:n.options.width,y:n.options.height}},a.on(n.engine,"beforeUpdate",function(){o.clear(n)}),n.textures={},n.sprites={},n.primitives={},n.container.addChild(n.spriteContainer),s.isElement(n.element)?n.element.appendChild(n.canvas):s.warn('No "render.element" passed, "render.canvas" was not inserted into document.'),n.canvas.oncontextmenu=function(){return!1},n.canvas.onselectstart=function(){return!1},n},o.run=function(t){!function n(i){t.frameRequestId=e(n),o.world(t)}()},o.stop=function(e){t(e.frameRequestId)},o.clear=function(e){for(var t=e.container,n=e.spriteContainer;t.children[0];)t.removeChild(t.children[0]);for(;n.children[0];)n.removeChild(n.children[0]);var o=e.sprites["bg-0"];e.textures={},e.sprites={},e.primitives={},e.sprites["bg-0"]=o,o&&t.addChildAt(o,0),e.container.addChild(e.spriteContainer),e.currentBackground=null,t.scale.set(1,1),t.position.set(0,0)},o.setBackground=function(e,t){if(e.currentBackground!==t){var n=t.indexOf&&t.indexOf("#")!==-1,o=e.sprites["bg-0"];if(n){var i=s.colorToNumber(t);e.renderer.backgroundColor=i,o&&e.container.removeChild(o)}else if(!o){var r=d(e,t);o=e.sprites["bg-0"]=new PIXI.Sprite(r),o.position.x=0,o.position.y=0,e.container.addChildAt(o,0)}e.currentBackground=t}},o.world=function(e){var t,n=e.engine,s=n.world,a=e.renderer,c=e.container,d=e.options,u=r.allBodies(s),p=r.allConstraints(s),f=[];d.wireframes?o.setBackground(e,d.wireframeBackground):o.setBackground(e,d.background);var m=e.bounds.max.x-e.bounds.min.x,v=e.bounds.max.y-e.bounds.min.y,y=m/e.options.width,g=v/e.options.height;if(d.hasBounds){for(t=0;t<u.length;t++){var x=u[t];x.render.sprite.visible=i.overlaps(x.bounds,e.bounds)}for(t=0;t<p.length;t++){var h=p[t],b=h.bodyA,w=h.bodyB,S=h.pointA,C=h.pointB;b&&(S=l.add(b.position,h.pointA)),w&&(C=l.add(w.position,h.pointB)),S&&C&&(i.contains(e.bounds,S)||i.contains(e.bounds,C))&&f.push(h)}c.scale.set(1/y,1/g),c.position.set(-e.bounds.min.x*(1/y),-e.bounds.min.y*(1/g))}else f=p;for(t=0;t<u.length;t++)o.body(e,u[t]);for(t=0;t<f.length;t++)o.constraint(e,f[t]);a.render(c)},o.constraint=function(e,t){var n=(e.engine,t.bodyA),o=t.bodyB,i=t.pointA,r=t.pointB,a=e.container,l=t.render,c="c-"+t.id,d=e.primitives[c];return d||(d=e.primitives[c]=new PIXI.Graphics),l.visible&&t.pointA&&t.pointB?(s.indexOf(a.children,d)===-1&&a.addChild(d),d.clear(),d.beginFill(0,0),d.lineStyle(l.lineWidth,s.colorToNumber(l.strokeStyle),1),n?d.moveTo(n.position.x+i.x,n.position.y+i.y):d.moveTo(i.x,i.y),o?d.lineTo(o.position.x+r.x,o.position.y+r.y):d.lineTo(r.x,r.y),void d.endFill()):void d.clear()},o.body=function(e,t){var o=(e.engine,t.render);if(o.visible)if(o.sprite&&o.sprite.texture){var i="b-"+t.id,r=e.sprites[i],a=e.spriteContainer;r||(r=e.sprites[i]=n(e,t)),s.indexOf(a.children,r)===-1&&a.addChild(r),r.position.x=t.position.x,r.position.y=t.position.y,r.rotation=t.angle,r.scale.x=o.sprite.xScale||1,r.scale.y=o.sprite.yScale||1}else{var l="b-"+t.id,d=e.primitives[l],u=e.container;d||(d=e.primitives[l]=c(e,t),d.initialAngle=t.angle),s.indexOf(u.children,d)===-1&&u.addChild(d),d.position.x=t.position.x,d.position.y=t.position.y,d.rotation=t.angle-d.initialAngle}};var n=function(e,t){var n=t.render,o=n.sprite.texture,i=d(e,o),r=new PIXI.Sprite(i);return r.anchor.x=t.render.sprite.xOffset,r.anchor.y=t.render.sprite.yOffset,r},c=function(e,t){var n,o=t.render,i=e.options,r=new PIXI.Graphics,a=s.colorToNumber(o.fillStyle),l=s.colorToNumber(o.strokeStyle),c=s.colorToNumber(o.strokeStyle),d=s.colorToNumber("#bbb"),u=s.colorToNumber("#CD5C5C");r.clear();for(var p=t.parts.length>1?1:0;p<t.parts.length;p++){n=t.parts[p],i.wireframes?(r.beginFill(0,0),r.lineStyle(1,d,1)):(r.beginFill(a,1),r.lineStyle(o.lineWidth,l,1)),r.moveTo(n.vertices[0].x-t.position.x,n.vertices[0].y-t.position.y);for(var f=1;f<n.vertices.length;f++)r.lineTo(n.vertices[f].x-t.position.x,n.vertices[f].y-t.position.y);r.lineTo(n.vertices[0].x-t.position.x,n.vertices[0].y-t.position.y),r.endFill(),(i.showAngleIndicator||i.showAxes)&&(r.beginFill(0,0),i.wireframes?r.lineStyle(1,u,1):r.lineStyle(1,c),r.moveTo(n.position.x-t.position.x,n.position.y-t.position.y),r.lineTo((n.vertices[0].x+n.vertices[n.vertices.length-1].x)/2-t.position.x,(n.vertices[0].y+n.vertices[n.vertices.length-1].y)/2-t.position.y),r.endFill())}return r},d=function(e,t){var n=e.textures[t];return n||(n=e.textures[t]=PIXI.Texture.fromImage(t)),n}}()},{"../body/Composite":2,"../core/Common":14,"../core/Events":16,"../geometry/Bounds":26,"../geometry/Vector":28}]},{},[30])(30)});

!function t(n,r,e){function i(u,c){if(!r[u]){if(!n[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(o)return o(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var s=r[u]={exports:{}};n[u][0].call(s.exports,function(t){var r=n[u][1][t];return i(r?r:t)},s,s.exports,t,n,r,e)}return r[u].exports}for(var o="function"==typeof require&&require,u=0;u<e.length;u++)i(e[u]);return i}({1:[function(t,n,r){(function(n){"use strict";function r(t,n,r){t[n]||Object[e](t,n,{writable:!0,configurable:!0,value:r})}if(t(327),t(328),t(2),n._babelPolyfill)throw new Error("only one instance of babel-polyfill is allowed");n._babelPolyfill=!0;var e="defineProperty";r(String.prototype,"padLeft","".padStart),r(String.prototype,"padRight","".padEnd),"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(t){[][t]&&r(Array,t,Function.call.bind([][t]))})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2,327:327,328:328}],2:[function(t,n,r){t(130),n.exports=t(23).RegExp.escape},{130:130,23:23}],3:[function(t,n,r){n.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},{}],4:[function(t,n,r){var e=t(18);n.exports=function(t,n){if("number"!=typeof t&&"Number"!=e(t))throw TypeError(n);return+t}},{18:18}],5:[function(t,n,r){var e=t(128)("unscopables"),i=Array.prototype;void 0==i[e]&&t(42)(i,e,{}),n.exports=function(t){i[e][t]=!0}},{128:128,42:42}],6:[function(t,n,r){n.exports=function(t,n,r,e){if(!(t instanceof n)||void 0!==e&&e in t)throw TypeError(r+": incorrect invocation!");return t}},{}],7:[function(t,n,r){var e=t(51);n.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},{51:51}],8:[function(t,n,r){"use strict";var e=t(119),i=t(114),o=t(118);n.exports=[].copyWithin||function(t,n){var r=e(this),u=o(r.length),c=i(t,u),f=i(n,u),a=arguments.length>2?arguments[2]:void 0,s=Math.min((void 0===a?u:i(a,u))-f,u-c),l=1;for(f<c&&c<f+s&&(l=-1,f+=s-1,c+=s-1);s-- >0;)f in r?r[c]=r[f]:delete r[c],c+=l,f+=l;return r}},{114:114,118:118,119:119}],9:[function(t,n,r){"use strict";var e=t(119),i=t(114),o=t(118);n.exports=function(t){for(var n=e(this),r=o(n.length),u=arguments.length,c=i(u>1?arguments[1]:void 0,r),f=u>2?arguments[2]:void 0,a=void 0===f?r:i(f,r);a>c;)n[c++]=t;return n}},{114:114,118:118,119:119}],10:[function(t,n,r){var e=t(39);n.exports=function(t,n){var r=[];return e(t,!1,r.push,r,n),r}},{39:39}],11:[function(t,n,r){var e=t(117),i=t(118),o=t(114);n.exports=function(t){return function(n,r,u){var c,f=e(n),a=i(f.length),s=o(u,a);if(t&&r!=r){for(;a>s;)if(c=f[s++],c!=c)return!0}else for(;a>s;s++)if((t||s in f)&&f[s]===r)return t||s||0;return!t&&-1}}},{114:114,117:117,118:118}],12:[function(t,n,r){var e=t(25),i=t(47),o=t(119),u=t(118),c=t(15);n.exports=function(t,n){var r=1==t,f=2==t,a=3==t,s=4==t,l=6==t,h=5==t||l,v=n||c;return function(n,c,p){for(var d,g,y=o(n),m=i(y),b=e(c,p,3),w=u(m.length),S=0,x=r?v(n,w):f?v(n,0):void 0;w>S;S++)if((h||S in m)&&(d=m[S],g=b(d,S,y),t))if(r)x[S]=g;else if(g)switch(t){case 3:return!0;case 5:return d;case 6:return S;case 2:x.push(d)}else if(s)return!1;return l?-1:a||s?s:x}}},{118:118,119:119,15:15,25:25,47:47}],13:[function(t,n,r){var e=t(3),i=t(119),o=t(47),u=t(118);n.exports=function(t,n,r,c,f){e(n);var a=i(t),s=o(a),l=u(a.length),h=f?l-1:0,v=f?-1:1;if(r<2)for(;;){if(h in s){c=s[h],h+=v;break}if(h+=v,f?h<0:l<=h)throw TypeError("Reduce of empty array with no initial value")}for(;f?h>=0:l>h;h+=v)h in s&&(c=n(c,s[h],h,a));return c}},{118:118,119:119,3:3,47:47}],14:[function(t,n,r){var e=t(51),i=t(49),o=t(128)("species");n.exports=function(t){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)||(n=void 0),e(n)&&(n=n[o],null===n&&(n=void 0))),void 0===n?Array:n}},{128:128,49:49,51:51}],15:[function(t,n,r){var e=t(14);n.exports=function(t,n){return new(e(t))(n)}},{14:14}],16:[function(t,n,r){"use strict";var e=t(3),i=t(51),o=t(46),u=[].slice,c={},f=function(t,n,r){if(!(n in c)){for(var e=[],i=0;i<n;i++)e[i]="a["+i+"]";c[n]=Function("F,a","return new F("+e.join(",")+")")}return c[n](t,r)};n.exports=Function.bind||function(t){var n=e(this),r=u.call(arguments,1),c=function(){var e=r.concat(u.call(arguments));return this instanceof c?f(n,e.length,e):o(n,e,t)};return i(n.prototype)&&(c.prototype=n.prototype),c}},{3:3,46:46,51:51}],17:[function(t,n,r){var e=t(18),i=t(128)("toStringTag"),o="Arguments"==e(function(){return arguments}()),u=function(t,n){try{return t[n]}catch(r){}};n.exports=function(t){var n,r,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=u(n=Object(t),i))?r:o?e(n):"Object"==(c=e(n))&&"function"==typeof n.callee?"Arguments":c}},{128:128,18:18}],18:[function(t,n,r){var e={}.toString;n.exports=function(t){return e.call(t).slice(8,-1)}},{}],19:[function(t,n,r){"use strict";var e=t(72).f,i=t(71),o=t(93),u=t(25),c=t(6),f=t(39),a=t(55),s=t(57),l=t(100),h=t(29),v=t(66).fastKey,p=t(125),d=h?"_s":"size",g=function(t,n){var r,e=v(n);if("F"!==e)return t._i[e];for(r=t._f;r;r=r.n)if(r.k==n)return r};n.exports={getConstructor:function(t,n,r,a){var s=t(function(t,e){c(t,s,n,"_i"),t._t=n,t._i=i(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=e&&f(e,r,t[a],t)});return o(s.prototype,{clear:function(){for(var t=p(this,n),r=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete r[e.i];t._f=t._l=void 0,t[d]=0},"delete":function(t){var r=p(this,n),e=g(r,t);if(e){var i=e.n,o=e.p;delete r._i[e.i],e.r=!0,o&&(o.n=i),i&&(i.p=o),r._f==e&&(r._f=i),r._l==e&&(r._l=o),r[d]--}return!!e},forEach:function(t){p(this,n);for(var r,e=u(t,arguments.length>1?arguments[1]:void 0,3);r=r?r.n:this._f;)for(e(r.v,r.k,this);r&&r.r;)r=r.p},has:function(t){return!!g(p(this,n),t)}}),h&&e(s.prototype,"size",{get:function(){return p(this,n)[d]}}),s},def:function(t,n,r){var e,i,o=g(t,n);return o?o.v=r:(t._l=o={i:i=v(n,!0),k:n,v:r,p:e=t._l,n:void 0,r:!1},t._f||(t._f=o),e&&(e.n=o),t[d]++,"F"!==i&&(t._i[i]=o)),t},getEntry:g,setStrong:function(t,n,r){a(t,n,function(t,r){this._t=p(t,n),this._k=r,this._l=void 0},function(){for(var t=this,n=t._k,r=t._l;r&&r.r;)r=r.p;return t._t&&(t._l=r=r?r.n:t._t._f)?"keys"==n?s(0,r.k):"values"==n?s(0,r.v):s(0,[r.k,r.v]):(t._t=void 0,s(1))},r?"entries":"values",!r,!0),l(n)}}},{100:100,125:125,25:25,29:29,39:39,55:55,57:57,6:6,66:66,71:71,72:72,93:93}],20:[function(t,n,r){var e=t(17),i=t(10);n.exports=function(t){return function(){if(e(this)!=t)throw TypeError(t+"#toJSON isn't generic");return i(this)}}},{10:10,17:17}],21:[function(t,n,r){"use strict";var e=t(93),i=t(66).getWeak,o=t(7),u=t(51),c=t(6),f=t(39),a=t(12),s=t(41),l=t(125),h=a(5),v=a(6),p=0,d=function(t){return t._l||(t._l=new g)},g=function(){this.a=[]},y=function(t,n){return h(t.a,function(t){return t[0]===n})};g.prototype={get:function(t){var n=y(this,t);if(n)return n[1]},has:function(t){return!!y(this,t)},set:function(t,n){var r=y(this,t);r?r[1]=n:this.a.push([t,n])},"delete":function(t){var n=v(this.a,function(n){return n[0]===t});return~n&&this.a.splice(n,1),!!~n}},n.exports={getConstructor:function(t,n,r,o){var a=t(function(t,e){c(t,a,n,"_i"),t._t=n,t._i=p++,t._l=void 0,void 0!=e&&f(e,r,t[o],t)});return e(a.prototype,{"delete":function(t){if(!u(t))return!1;var r=i(t);return r===!0?d(l(this,n))["delete"](t):r&&s(r,this._i)&&delete r[this._i]},has:function(t){if(!u(t))return!1;var r=i(t);return r===!0?d(l(this,n)).has(t):r&&s(r,this._i)}}),a},def:function(t,n,r){var e=i(o(n),!0);return e===!0?d(t).set(n,r):e[t._i]=r,t},ufstore:d}},{12:12,125:125,39:39,41:41,51:51,6:6,66:66,7:7,93:93}],22:[function(t,n,r){"use strict";var e=t(40),i=t(33),o=t(94),u=t(93),c=t(66),f=t(39),a=t(6),s=t(51),l=t(35),h=t(56),v=t(101),p=t(45);n.exports=function(t,n,r,d,g,y){var m=e[t],b=m,w=g?"set":"add",S=b&&b.prototype,x={},_=function(t){var n=S[t];o(S,t,"delete"==t?function(t){return!(y&&!s(t))&&n.call(this,0===t?0:t)}:"has"==t?function(t){return!(y&&!s(t))&&n.call(this,0===t?0:t)}:"get"==t?function(t){return y&&!s(t)?void 0:n.call(this,0===t?0:t)}:"add"==t?function(t){return n.call(this,0===t?0:t),this}:function(t,r){return n.call(this,0===t?0:t,r),this})};if("function"==typeof b&&(y||S.forEach&&!l(function(){(new b).entries().next()}))){var E=new b,O=E[w](y?{}:-0,1)!=E,M=l(function(){E.has(1)}),P=h(function(t){new b(t)}),F=!y&&l(function(){for(var t=new b,n=5;n--;)t[w](n,n);return!t.has(-0)});P||(b=n(function(n,r){a(n,b,t);var e=p(new m,n,b);return void 0!=r&&f(r,g,e[w],e),e}),b.prototype=S,S.constructor=b),(M||F)&&(_("delete"),_("has"),g&&_("get")),(F||O)&&_(w),y&&S.clear&&delete S.clear}else b=d.getConstructor(n,t,g,w),u(b.prototype,r),c.NEED=!0;return v(b,t),x[t]=b,i(i.G+i.W+i.F*(b!=m),x),y||d.setStrong(b,t,g),b}},{101:101,33:33,35:35,39:39,40:40,45:45,51:51,56:56,6:6,66:66,93:93,94:94}],23:[function(t,n,r){var e=n.exports={version:"2.5.0"};"number"==typeof __e&&(__e=e)},{}],24:[function(t,n,r){"use strict";var e=t(72),i=t(92);n.exports=function(t,n,r){n in t?e.f(t,n,i(0,r)):t[n]=r}},{72:72,92:92}],25:[function(t,n,r){var e=t(3);n.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,i){return t.call(n,r,e,i)}}return function(){return t.apply(n,arguments)}}},{3:3}],26:[function(t,n,r){"use strict";var e=t(35),i=Date.prototype.getTime,o=Date.prototype.toISOString,u=function(t){return t>9?t:"0"+t};n.exports=e(function(){return"0385-07-25T07:06:39.999Z"!=o.call(new Date(-5e13-1))})||!e(function(){o.call(new Date(NaN))})?function(){if(!isFinite(i.call(this)))throw RangeError("Invalid time value");var t=this,n=t.getUTCFullYear(),r=t.getUTCMilliseconds(),e=n<0?"-":n>9999?"+":"";return e+("00000"+Math.abs(n)).slice(e?-6:-4)+"-"+u(t.getUTCMonth()+1)+"-"+u(t.getUTCDate())+"T"+u(t.getUTCHours())+":"+u(t.getUTCMinutes())+":"+u(t.getUTCSeconds())+"."+(r>99?r:"0"+u(r))+"Z"}:o},{35:35}],27:[function(t,n,r){"use strict";var e=t(7),i=t(120),o="number";n.exports=function(t){if("string"!==t&&t!==o&&"default"!==t)throw TypeError("Incorrect hint");return i(e(this),t!=o)}},{120:120,7:7}],28:[function(t,n,r){n.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},{}],29:[function(t,n,r){n.exports=!t(35)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{35:35}],30:[function(t,n,r){var e=t(51),i=t(40).document,o=e(i)&&e(i.createElement);n.exports=function(t){return o?i.createElement(t):{}}},{40:40,51:51}],31:[function(t,n,r){n.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],32:[function(t,n,r){var e=t(81),i=t(78),o=t(82);n.exports=function(t){var n=e(t),r=i.f;if(r)for(var u,c=r(t),f=o.f,a=0;c.length>a;)f.call(t,u=c[a++])&&n.push(u);return n}},{78:78,81:81,82:82}],33:[function(t,n,r){var e=t(40),i=t(23),o=t(42),u=t(94),c=t(25),f="prototype",a=function(t,n,r){var s,l,h,v,p=t&a.F,d=t&a.G,g=t&a.S,y=t&a.P,m=t&a.B,b=d?e:g?e[n]||(e[n]={}):(e[n]||{})[f],w=d?i:i[n]||(i[n]={}),S=w[f]||(w[f]={});d&&(r=n);for(s in r)l=!p&&b&&void 0!==b[s],h=(l?b:r)[s],v=m&&l?c(h,e):y&&"function"==typeof h?c(Function.call,h):h,b&&u(b,s,h,t&a.U),w[s]!=h&&o(w,s,v),y&&S[s]!=h&&(S[s]=h)};e.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,n.exports=a},{23:23,25:25,40:40,42:42,94:94}],34:[function(t,n,r){var e=t(128)("match");n.exports=function(t){var n=/./;try{"/./"[t](n)}catch(r){try{return n[e]=!1,!"/./"[t](n)}catch(i){}}return!0}},{128:128}],35:[function(t,n,r){n.exports=function(t){try{return!!t()}catch(n){return!0}}},{}],36:[function(t,n,r){"use strict";var e=t(42),i=t(94),o=t(35),u=t(28),c=t(128);n.exports=function(t,n,r){var f=c(t),a=r(u,f,""[t]),s=a[0],l=a[1];o(function(){var n={};return n[f]=function(){return 7},7!=""[t](n)})&&(i(String.prototype,t,s),e(RegExp.prototype,f,2==n?function(t,n){return l.call(t,this,n)}:function(t){return l.call(t,this)}))}},{128:128,28:28,35:35,42:42,94:94}],37:[function(t,n,r){"use strict";var e=t(7);n.exports=function(){var t=e(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},{7:7}],38:[function(t,n,r){"use strict";function e(t,n,r,a,s,l,h,v){for(var p,d,g=s,y=0,m=!!h&&c(h,v,3);y<a;){if(y in r){if(p=m?m(r[y],y,n):r[y],d=!1,o(p)&&(d=p[f],d=void 0!==d?!!d:i(p)),d&&l>0)g=e(t,n,p,u(p.length),g,l-1)-1;else{if(g>=9007199254740991)throw TypeError();t[g]=p}g++}y++}return g}var i=t(49),o=t(51),u=t(118),c=t(25),f=t(128)("isConcatSpreadable");n.exports=e},{118:118,128:128,25:25,49:49,51:51}],39:[function(t,n,r){var e=t(25),i=t(53),o=t(48),u=t(7),c=t(118),f=t(129),a={},s={},r=n.exports=function(t,n,r,l,h){var v,p,d,g,y=h?function(){return t}:f(t),m=e(r,l,n?2:1),b=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(o(y)){for(v=c(t.length);v>b;b++)if(g=n?m(u(p=t[b])[0],p[1]):m(t[b]),g===a||g===s)return g}else for(d=y.call(t);!(p=d.next()).done;)if(g=i(d,m,p.value,n),g===a||g===s)return g};r.BREAK=a,r.RETURN=s},{118:118,129:129,25:25,48:48,53:53,7:7}],40:[function(t,n,r){var e=n.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},{}],41:[function(t,n,r){var e={}.hasOwnProperty;n.exports=function(t,n){return e.call(t,n)}},{}],42:[function(t,n,r){var e=t(72),i=t(92);n.exports=t(29)?function(t,n,r){return e.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},{29:29,72:72,92:92}],43:[function(t,n,r){var e=t(40).document;n.exports=e&&e.documentElement},{40:40}],44:[function(t,n,r){n.exports=!t(29)&&!t(35)(function(){return 7!=Object.defineProperty(t(30)("div"),"a",{get:function(){return 7}}).a})},{29:29,30:30,35:35}],45:[function(t,n,r){var e=t(51),i=t(99).set;n.exports=function(t,n,r){var o,u=n.constructor;return u!==r&&"function"==typeof u&&(o=u.prototype)!==r.prototype&&e(o)&&i&&i(t,o),t}},{51:51,99:99}],46:[function(t,n,r){n.exports=function(t,n,r){var e=void 0===r;switch(n.length){case 0:return e?t():t.call(r);case 1:return e?t(n[0]):t.call(r,n[0]);case 2:return e?t(n[0],n[1]):t.call(r,n[0],n[1]);case 3:return e?t(n[0],n[1],n[2]):t.call(r,n[0],n[1],n[2]);case 4:return e?t(n[0],n[1],n[2],n[3]):t.call(r,n[0],n[1],n[2],n[3])}return t.apply(r,n)}},{}],47:[function(t,n,r){var e=t(18);n.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},{18:18}],48:[function(t,n,r){var e=t(58),i=t(128)("iterator"),o=Array.prototype;n.exports=function(t){return void 0!==t&&(e.Array===t||o[i]===t)}},{128:128,58:58}],49:[function(t,n,r){var e=t(18);n.exports=Array.isArray||function(t){return"Array"==e(t)}},{18:18}],50:[function(t,n,r){var e=t(51),i=Math.floor;n.exports=function(t){return!e(t)&&isFinite(t)&&i(t)===t}},{51:51}],51:[function(t,n,r){n.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},{}],52:[function(t,n,r){var e=t(51),i=t(18),o=t(128)("match");n.exports=function(t){var n;return e(t)&&(void 0!==(n=t[o])?!!n:"RegExp"==i(t))}},{128:128,18:18,51:51}],53:[function(t,n,r){var e=t(7);n.exports=function(t,n,r,i){try{return i?n(e(r)[0],r[1]):n(r)}catch(o){var u=t["return"];throw void 0!==u&&e(u.call(t)),o}}},{7:7}],54:[function(t,n,r){"use strict";var e=t(71),i=t(92),o=t(101),u={};t(42)(u,t(128)("iterator"),function(){return this}),n.exports=function(t,n,r){t.prototype=e(u,{next:i(1,r)}),o(t,n+" Iterator")}},{101:101,128:128,42:42,71:71,92:92}],55:[function(t,n,r){"use strict";var e=t(60),i=t(33),o=t(94),u=t(42),c=t(41),f=t(58),a=t(54),s=t(101),l=t(79),h=t(128)("iterator"),v=!([].keys&&"next"in[].keys()),p="@@iterator",d="keys",g="values",y=function(){return this};n.exports=function(t,n,r,m,b,w,S){a(r,n,m);var x,_,E,O=function(t){if(!v&&t in A)return A[t];switch(t){case d:return function(){return new r(this,t)};case g:return function(){return new r(this,t)}}return function(){return new r(this,t)}},M=n+" Iterator",P=b==g,F=!1,A=t.prototype,j=A[h]||A[p]||b&&A[b],N=j||O(b),I=b?P?O("entries"):N:void 0,T="Array"==n?A.entries||j:j;if(T&&(E=l(T.call(new t)),E!==Object.prototype&&E.next&&(s(E,M,!0),e||c(E,h)||u(E,h,y))),P&&j&&j.name!==g&&(F=!0,N=function(){return j.call(this)}),e&&!S||!v&&!F&&A[h]||u(A,h,N),f[n]=N,f[M]=y,b)if(x={values:P?N:O(g),keys:w?N:O(d),entries:I},S)for(_ in x)_ in A||o(A,_,x[_]);else i(i.P+i.F*(v||F),n,x);return x}},{101:101,128:128,33:33,41:41,42:42,54:54,58:58,60:60,79:79,94:94}],56:[function(t,n,r){var e=t(128)("iterator"),i=!1;try{var o=[7][e]();o["return"]=function(){i=!0},Array.from(o,function(){throw 2})}catch(u){}n.exports=function(t,n){if(!n&&!i)return!1;var r=!1;try{var o=[7],u=o[e]();u.next=function(){return{done:r=!0}},o[e]=function(){return u},t(o)}catch(c){}return r}},{128:128}],57:[function(t,n,r){n.exports=function(t,n){return{value:n,done:!!t}}},{}],58:[function(t,n,r){n.exports={}},{}],59:[function(t,n,r){var e=t(81),i=t(117);n.exports=function(t,n){for(var r,o=i(t),u=e(o),c=u.length,f=0;c>f;)if(o[r=u[f++]]===n)return r}},{117:117,81:81}],60:[function(t,n,r){n.exports=!1},{}],61:[function(t,n,r){var e=Math.expm1;n.exports=!e||e(10)>22025.465794806718||e(10)<22025.465794806718||e(-2e-17)!=-2e-17?function(t){return 0==(t=+t)?t:t>-1e-6&&t<1e-6?t+t*t/2:Math.exp(t)-1}:e},{}],62:[function(t,n,r){var e=t(65),i=Math.pow,o=i(2,-52),u=i(2,-23),c=i(2,127)*(2-u),f=i(2,-126),a=function(t){return t+1/o-1/o};n.exports=Math.fround||function(t){var n,r,i=Math.abs(t),s=e(t);return i<f?s*a(i/f/u)*f*u:(n=(1+u/o)*i,r=n-(n-i),r>c||r!=r?s*(1/0):s*r)}},{65:65}],63:[function(t,n,r){n.exports=Math.log1p||function(t){return(t=+t)>-1e-8&&t<1e-8?t-t*t/2:Math.log(1+t)}},{}],64:[function(t,n,r){n.exports=Math.scale||function(t,n,r,e,i){return 0===arguments.length||t!=t||n!=n||r!=r||e!=e||i!=i?NaN:t===1/0||t===-(1/0)?t:(t-n)*(i-e)/(r-n)+e}},{}],65:[function(t,n,r){n.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},{}],66:[function(t,n,r){var e=t(124)("meta"),i=t(51),o=t(41),u=t(72).f,c=0,f=Object.isExtensible||function(){return!0},a=!t(35)(function(){return f(Object.preventExtensions({}))}),s=function(t){u(t,e,{value:{i:"O"+ ++c,w:{}}})},l=function(t,n){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,e)){if(!f(t))return"F";if(!n)return"E";s(t)}return t[e].i},h=function(t,n){if(!o(t,e)){if(!f(t))return!0;if(!n)return!1;s(t)}return t[e].w},v=function(t){return a&&p.NEED&&f(t)&&!o(t,e)&&s(t),t},p=n.exports={KEY:e,NEED:!1,fastKey:l,getWeak:h,onFreeze:v}},{124:124,35:35,41:41,51:51,72:72}],67:[function(t,n,r){var e=t(160),i=t(33),o=t(103)("metadata"),u=o.store||(o.store=new(t(266))),c=function(t,n,r){var i=u.get(t);if(!i){if(!r)return;u.set(t,i=new e)}var o=i.get(n);if(!o){if(!r)return;i.set(n,o=new e)}return o},f=function(t,n,r){var e=c(n,r,!1);return void 0!==e&&e.has(t)},a=function(t,n,r){var e=c(n,r,!1);return void 0===e?void 0:e.get(t)},s=function(t,n,r,e){c(r,e,!0).set(t,n)},l=function(t,n){var r=c(t,n,!1),e=[];return r&&r.forEach(function(t,n){e.push(n)}),e},h=function(t){return void 0===t||"symbol"==typeof t?t:String(t)},v=function(t){i(i.S,"Reflect",t)};n.exports={store:u,map:c,has:f,get:a,set:s,keys:l,key:h,exp:v}},{103:103,160:160,266:266,33:33}],68:[function(t,n,r){var e=t(40),i=t(113).set,o=e.MutationObserver||e.WebKitMutationObserver,u=e.process,c=e.Promise,f="process"==t(18)(u);n.exports=function(){var t,n,r,a=function(){var e,i;for(f&&(e=u.domain)&&e.exit();t;){i=t.fn,t=t.next;try{i()}catch(o){throw t?r():n=void 0,o}}n=void 0,e&&e.enter()};if(f)r=function(){u.nextTick(a)};else if(o){var s=!0,l=document.createTextNode("");new o(a).observe(l,{characterData:!0}),r=function(){l.data=s=!s}}else if(c&&c.resolve){var h=c.resolve();r=function(){h.then(a)}}else r=function(){i.call(e,a)};return function(e){var i={fn:e,next:void 0};n&&(n.next=i),t||(t=i,r()),n=i}}},{113:113,18:18,40:40}],69:[function(t,n,r){"use strict";function e(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e}),this.resolve=i(n),this.reject=i(r)}var i=t(3);n.exports.f=function(t){return new e(t)}},{3:3}],70:[function(t,n,r){"use strict";var e=t(81),i=t(78),o=t(82),u=t(119),c=t(47),f=Object.assign;n.exports=!f||t(35)(function(){var t={},n={},r=Symbol(),e="abcdefghijklmnopqrst";return t[r]=7,e.split("").forEach(function(t){n[t]=t}),7!=f({},t)[r]||Object.keys(f({},n)).join("")!=e})?function(t,n){for(var r=u(t),f=arguments.length,a=1,s=i.f,l=o.f;f>a;)for(var h,v=c(arguments[a++]),p=s?e(v).concat(s(v)):e(v),d=p.length,g=0;d>g;)l.call(v,h=p[g++])&&(r[h]=v[h]);return r}:f},{119:119,35:35,47:47,78:78,81:81,82:82}],71:[function(t,n,r){var e=t(7),i=t(73),o=t(31),u=t(102)("IE_PROTO"),c=function(){},f="prototype",a=function(){var n,r=t(30)("iframe"),e=o.length,i="<",u=">";for(r.style.display="none",t(43).appendChild(r),r.src="javascript:",n=r.contentWindow.document,n.open(),n.write(i+"script"+u+"document.F=Object"+i+"/script"+u),n.close(),a=n.F;e--;)delete a[f][o[e]];return a()};n.exports=Object.create||function(t,n){var r;return null!==t?(c[f]=e(t),r=new c,c[f]=null,r[u]=t):r=a(),void 0===n?r:i(r,n)}},{102:102,30:30,31:31,43:43,7:7,73:73}],72:[function(t,n,r){var e=t(7),i=t(44),o=t(120),u=Object.defineProperty;r.f=t(29)?Object.defineProperty:function(t,n,r){if(e(t),n=o(n,!0),e(r),i)try{return u(t,n,r)}catch(c){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},{120:120,29:29,44:44,7:7}],73:[function(t,n,r){var e=t(72),i=t(7),o=t(81);n.exports=t(29)?Object.defineProperties:function(t,n){i(t);for(var r,u=o(n),c=u.length,f=0;c>f;)e.f(t,r=u[f++],n[r]);return t}},{29:29,7:7,72:72,81:81}],74:[function(t,n,r){"use strict";n.exports=t(60)||!t(35)(function(){var n=Math.random();__defineSetter__.call(null,n,function(){}),delete t(40)[n]})},{35:35,40:40,60:60}],75:[function(t,n,r){var e=t(82),i=t(92),o=t(117),u=t(120),c=t(41),f=t(44),a=Object.getOwnPropertyDescriptor;r.f=t(29)?a:function(t,n){if(t=o(t),n=u(n,!0),f)try{return a(t,n)}catch(r){}if(c(t,n))return i(!e.f.call(t,n),t[n])}},{117:117,120:120,29:29,41:41,44:44,82:82,92:92}],76:[function(t,n,r){var e=t(117),i=t(77).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return i(t)}catch(n){return u.slice()}};n.exports.f=function(t){return u&&"[object Window]"==o.call(t)?c(t):i(e(t))}},{117:117,77:77}],77:[function(t,n,r){var e=t(80),i=t(31).concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return e(t,i)}},{31:31,80:80}],78:[function(t,n,r){r.f=Object.getOwnPropertySymbols},{}],79:[function(t,n,r){var e=t(41),i=t(119),o=t(102)("IE_PROTO"),u=Object.prototype;n.exports=Object.getPrototypeOf||function(t){return t=i(t),e(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},{102:102,119:119,41:41}],80:[function(t,n,r){var e=t(41),i=t(117),o=t(11)(!1),u=t(102)("IE_PROTO");n.exports=function(t,n){var r,c=i(t),f=0,a=[];for(r in c)r!=u&&e(c,r)&&a.push(r);for(;n.length>f;)e(c,r=n[f++])&&(~o(a,r)||a.push(r));return a}},{102:102,11:11,117:117,41:41}],81:[function(t,n,r){var e=t(80),i=t(31);n.exports=Object.keys||function(t){return e(t,i)}},{31:31,80:80}],82:[function(t,n,r){r.f={}.propertyIsEnumerable},{}],83:[function(t,n,r){var e=t(33),i=t(23),o=t(35);n.exports=function(t,n){var r=(i.Object||{})[t]||Object[t],u={};u[t]=n(r),e(e.S+e.F*o(function(){r(1)}),"Object",u)}},{23:23,33:33,35:35}],84:[function(t,n,r){var e=t(81),i=t(117),o=t(82).f;n.exports=function(t){return function(n){for(var r,u=i(n),c=e(u),f=c.length,a=0,s=[];f>a;)o.call(u,r=c[a++])&&s.push(t?[r,u[r]]:u[r]);return s}}},{117:117,81:81,82:82}],85:[function(t,n,r){var e=t(77),i=t(78),o=t(7),u=t(40).Reflect;n.exports=u&&u.ownKeys||function(t){var n=e.f(o(t)),r=i.f;return r?n.concat(r(t)):n}},{40:40,7:7,77:77,78:78}],86:[function(t,n,r){var e=t(40).parseFloat,i=t(111).trim;n.exports=1/e(t(112)+"-0")!==-(1/0)?function(t){var n=i(String(t),3),r=e(n);return 0===r&&"-"==n.charAt(0)?-0:r}:e},{111:111,112:112,40:40}],87:[function(t,n,r){var e=t(40).parseInt,i=t(111).trim,o=t(112),u=/^[-+]?0[xX]/;n.exports=8!==e(o+"08")||22!==e(o+"0x16")?function(t,n){var r=i(String(t),3);return e(r,n>>>0||(u.test(r)?16:10))}:e},{111:111,112:112,40:40}],88:[function(t,n,r){"use strict";var e=t(89),i=t(46),o=t(3);n.exports=function(){for(var t=o(this),n=arguments.length,r=Array(n),u=0,c=e._,f=!1;n>u;)(r[u]=arguments[u++])===c&&(f=!0);return function(){var e,o=this,u=arguments.length,a=0,s=0;if(!f&&!u)return i(t,r,o);if(e=r.slice(),f)for(;n>a;a++)e[a]===c&&(e[a]=arguments[s++]);for(;u>s;)e.push(arguments[s++]);return i(t,e,o)}}},{3:3,46:46,89:89}],89:[function(t,n,r){n.exports=t(40)},{40:40}],90:[function(t,n,r){n.exports=function(t){try{return{e:!1,v:t()}}catch(n){return{e:!0,v:n}}}},{}],91:[function(t,n,r){var e=t(69);n.exports=function(t,n){var r=e.f(t),i=r.resolve;return i(n),r.promise}},{69:69}],92:[function(t,n,r){n.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},{}],93:[function(t,n,r){var e=t(94);n.exports=function(t,n,r){for(var i in n)e(t,i,n[i],r);return t}},{94:94}],94:[function(t,n,r){var e=t(40),i=t(42),o=t(41),u=t(124)("src"),c="toString",f=Function[c],a=(""+f).split(c);t(23).inspectSource=function(t){return f.call(t)},(n.exports=function(t,n,r,c){var f="function"==typeof r;f&&(o(r,"name")||i(r,"name",n)),t[n]!==r&&(f&&(o(r,u)||i(r,u,t[n]?""+t[n]:a.join(String(n)))),t===e?t[n]=r:c?t[n]?t[n]=r:i(t,n,r):(delete t[n],i(t,n,r)))})(Function.prototype,c,function(){return"function"==typeof this&&this[u]||f.call(this)})},{124:124,23:23,40:40,41:41,42:42}],95:[function(t,n,r){n.exports=function(t,n){var r=n===Object(n)?function(t){return n[t]}:n;return function(n){return String(n).replace(t,r)}}},{}],96:[function(t,n,r){n.exports=Object.is||function(t,n){return t===n?0!==t||1/t===1/n:t!=t&&n!=n}},{}],97:[function(t,n,r){"use strict";var e=t(33),i=t(3),o=t(25),u=t(39);n.exports=function(t){e(e.S,t,{from:function(t){var n,r,e,c,f=arguments[1];return i(this),n=void 0!==f,n&&i(f),void 0==t?new this:(r=[],n?(e=0,c=o(f,arguments[2],2),u(t,!1,function(t){r.push(c(t,e++))})):u(t,!1,r.push,r),new this(r))}})}},{25:25,3:3,33:33,39:39}],98:[function(t,n,r){"use strict";var e=t(33);n.exports=function(t){e(e.S,t,{of:function(){for(var t=arguments.length,n=Array(t);t--;)n[t]=arguments[t];return new this(n)}})}},{33:33}],99:[function(t,n,r){var e=t(51),i=t(7),o=function(t,n){if(i(t),!e(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};n.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(n,r,e){try{e=t(25)(Function.call,t(75).f(Object.prototype,"__proto__").set,2),e(n,[]),r=!(n instanceof Array)}catch(i){r=!0}return function(t,n){return o(t,n),r?t.__proto__=n:e(t,n),t}}({},!1):void 0),check:o}},{25:25,51:51,7:7,75:75}],100:[function(t,n,r){"use strict";var e=t(40),i=t(72),o=t(29),u=t(128)("species");n.exports=function(t){var n=e[t];o&&n&&!n[u]&&i.f(n,u,{configurable:!0,get:function(){return this}})}},{128:128,29:29,40:40,72:72}],101:[function(t,n,r){var e=t(72).f,i=t(41),o=t(128)("toStringTag");n.exports=function(t,n,r){t&&!i(t=r?t:t.prototype,o)&&e(t,o,{configurable:!0,value:n})}},{128:128,41:41,72:72}],102:[function(t,n,r){var e=t(103)("keys"),i=t(124);n.exports=function(t){return e[t]||(e[t]=i(t))}},{103:103,124:124}],103:[function(t,n,r){var e=t(40),i="__core-js_shared__",o=e[i]||(e[i]={});n.exports=function(t){return o[t]||(o[t]={})}},{40:40}],104:[function(t,n,r){var e=t(7),i=t(3),o=t(128)("species");n.exports=function(t,n){var r,u=e(t).constructor;return void 0===u||void 0==(r=e(u)[o])?n:i(r)}},{128:128,3:3,7:7}],105:[function(t,n,r){"use strict";var e=t(35);n.exports=function(t,n){return!!t&&e(function(){n?t.call(null,function(){},1):t.call(null)})}},{35:35}],106:[function(t,n,r){var e=t(116),i=t(28);n.exports=function(t){return function(n,r){var o,u,c=String(i(n)),f=e(r),a=c.length;return f<0||f>=a?t?"":void 0:(o=c.charCodeAt(f),o<55296||o>56319||f+1===a||(u=c.charCodeAt(f+1))<56320||u>57343?t?c.charAt(f):o:t?c.slice(f,f+2):(o-55296<<10)+(u-56320)+65536)}}},{116:116,28:28}],107:[function(t,n,r){var e=t(52),i=t(28);n.exports=function(t,n,r){if(e(n))throw TypeError("String#"+r+" doesn't accept regex!");return String(i(t))}},{28:28,52:52}],108:[function(t,n,r){var e=t(33),i=t(35),o=t(28),u=/"/g,c=function(t,n,r,e){var i=String(o(t)),c="<"+n;return""!==r&&(c+=" "+r+'="'+String(e).replace(u,"&quot;")+'"'),c+">"+i+"</"+n+">"};n.exports=function(t,n){var r={};r[t]=n(c),e(e.P+e.F*i(function(){var n=""[t]('"');return n!==n.toLowerCase()||n.split('"').length>3}),"String",r)}},{28:28,33:33,35:35}],109:[function(t,n,r){var e=t(118),i=t(110),o=t(28);n.exports=function(t,n,r,u){var c=String(o(t)),f=c.length,a=void 0===r?" ":String(r),s=e(n);if(s<=f||""==a)return c;var l=s-f,h=i.call(a,Math.ceil(l/a.length));return h.length>l&&(h=h.slice(0,l)),u?h+c:c+h}},{110:110,118:118,28:28}],110:[function(t,n,r){"use strict";var e=t(116),i=t(28);n.exports=function(t){var n=String(i(this)),r="",o=e(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(n+=n))1&o&&(r+=n);return r}},{116:116,28:28}],111:[function(t,n,r){var e=t(33),i=t(28),o=t(35),u=t(112),c="["+u+"]",f="​",a=RegExp("^"+c+c+"*"),s=RegExp(c+c+"*$"),l=function(t,n,r){var i={},c=o(function(){return!!u[t]()||f[t]()!=f}),a=i[t]=c?n(h):u[t];r&&(i[r]=a),e(e.P+e.F*c,"String",i)},h=l.trim=function(t,n){return t=String(i(t)),1&n&&(t=t.replace(a,"")),2&n&&(t=t.replace(s,"")),t};n.exports=l},{112:112,28:28,33:33,35:35}],112:[function(t,n,r){n.exports="\t\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff"},{}],113:[function(t,n,r){var e,i,o,u=t(25),c=t(46),f=t(43),a=t(30),s=t(40),l=s.process,h=s.setImmediate,v=s.clearImmediate,p=s.MessageChannel,d=s.Dispatch,g=0,y={},m="onreadystatechange",b=function(){var t=+this;if(y.hasOwnProperty(t)){var n=y[t];delete y[t],n()}},w=function(t){b.call(t.data)};h&&v||(h=function(t){for(var n=[],r=1;arguments.length>r;)n.push(arguments[r++]);return y[++g]=function(){c("function"==typeof t?t:Function(t),n)},e(g),g},v=function(t){delete y[t]},"process"==t(18)(l)?e=function(t){l.nextTick(u(b,t,1))}:d&&d.now?e=function(t){d.now(u(b,t,1))}:p?(i=new p,o=i.port2,i.port1.onmessage=w,e=u(o.postMessage,o,1)):s.addEventListener&&"function"==typeof postMessage&&!s.importScripts?(e=function(t){s.postMessage(t+"","*")},s.addEventListener("message",w,!1)):e=m in a("script")?function(t){f.appendChild(a("script"))[m]=function(){f.removeChild(this),b.call(t)}}:function(t){setTimeout(u(b,t,1),0)}),n.exports={set:h,clear:v}},{18:18,25:25,30:30,40:40,43:43,46:46}],114:[function(t,n,r){var e=t(116),i=Math.max,o=Math.min;n.exports=function(t,n){return t=e(t),t<0?i(t+n,0):o(t,n)}},{116:116}],115:[function(t,n,r){var e=t(116),i=t(118);n.exports=function(t){if(void 0===t)return 0;var n=e(t),r=i(n);if(n!==r)throw RangeError("Wrong length!");return r}},{116:116,118:118}],116:[function(t,n,r){var e=Math.ceil,i=Math.floor;n.exports=function(t){return isNaN(t=+t)?0:(t>0?i:e)(t)}},{}],117:[function(t,n,r){var e=t(47),i=t(28);n.exports=function(t){return e(i(t))}},{28:28,47:47}],118:[function(t,n,r){var e=t(116),i=Math.min;n.exports=function(t){return t>0?i(e(t),9007199254740991):0}},{116:116}],119:[function(t,n,r){var e=t(28);n.exports=function(t){return Object(e(t))}},{28:28}],120:[function(t,n,r){var e=t(51);n.exports=function(t,n){if(!e(t))return t;var r,i;if(n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!e(i=r.call(t)))return i;if(!n&&"function"==typeof(r=t.toString)&&!e(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},{51:51}],121:[function(t,n,r){"use strict";if(t(29)){var e=t(60),i=t(40),o=t(35),u=t(33),c=t(123),f=t(122),a=t(25),s=t(6),l=t(92),h=t(42),v=t(93),p=t(116),d=t(118),g=t(115),y=t(114),m=t(120),b=t(41),w=t(17),S=t(51),x=t(119),_=t(48),E=t(71),O=t(79),M=t(77).f,P=t(129),F=t(124),A=t(128),j=t(12),N=t(11),I=t(104),T=t(141),R=t(58),L=t(56),k=t(100),C=t(9),D=t(8),G=t(72),U=t(75),W=G.f,V=U.f,B=i.RangeError,z=i.TypeError,Y=i.Uint8Array,q="ArrayBuffer",J="Shared"+q,K="BYTES_PER_ELEMENT",H="prototype",X=Array[H],$=f.ArrayBuffer,Z=f.DataView,Q=j(0),tt=j(2),nt=j(3),rt=j(4),et=j(5),it=j(6),ot=N(!0),ut=N(!1),ct=T.values,ft=T.keys,at=T.entries,st=X.lastIndexOf,lt=X.reduce,ht=X.reduceRight,vt=X.join,pt=X.sort,dt=X.slice,gt=X.toString,yt=X.toLocaleString,mt=A("iterator"),bt=A("toStringTag"),wt=F("typed_constructor"),St=F("def_constructor"),xt=c.CONSTR,_t=c.TYPED,Et=c.VIEW,Ot="Wrong length!",Mt=j(1,function(t,n){
	return Nt(I(t,t[St]),n)}),Pt=o(function(){return 1===new Y(new Uint16Array([1]).buffer)[0]}),Ft=!!Y&&!!Y[H].set&&o(function(){new Y(1).set({})}),At=function(t,n){var r=p(t);if(r<0||r%n)throw B("Wrong offset!");return r},jt=function(t){if(S(t)&&_t in t)return t;throw z(t+" is not a typed array!")},Nt=function(t,n){if(!(S(t)&&wt in t))throw z("It is not a typed array constructor!");return new t(n)},It=function(t,n){return Tt(I(t,t[St]),n)},Tt=function(t,n){for(var r=0,e=n.length,i=Nt(t,e);e>r;)i[r]=n[r++];return i},Rt=function(t,n,r){W(t,n,{get:function(){return this._d[r]}})},Lt=function(t){var n,r,e,i,o,u,c=x(t),f=arguments.length,s=f>1?arguments[1]:void 0,l=void 0!==s,h=P(c);if(void 0!=h&&!_(h)){for(u=h.call(c),e=[],n=0;!(o=u.next()).done;n++)e.push(o.value);c=e}for(l&&f>2&&(s=a(s,arguments[2],2)),n=0,r=d(c.length),i=Nt(this,r);r>n;n++)i[n]=l?s(c[n],n):c[n];return i},kt=function(){for(var t=0,n=arguments.length,r=Nt(this,n);n>t;)r[t]=arguments[t++];return r},Ct=!!Y&&o(function(){yt.call(new Y(1))}),Dt=function(){return yt.apply(Ct?dt.call(jt(this)):jt(this),arguments)},Gt={copyWithin:function(t,n){return D.call(jt(this),t,n,arguments.length>2?arguments[2]:void 0)},every:function(t){return rt(jt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return C.apply(jt(this),arguments)},filter:function(t){return It(this,tt(jt(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return et(jt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return it(jt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){Q(jt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return ut(jt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return ot(jt(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return vt.apply(jt(this),arguments)},lastIndexOf:function(t){return st.apply(jt(this),arguments)},map:function(t){return Mt(jt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return lt.apply(jt(this),arguments)},reduceRight:function(t){return ht.apply(jt(this),arguments)},reverse:function(){for(var t,n=this,r=jt(n).length,e=Math.floor(r/2),i=0;i<e;)t=n[i],n[i++]=n[--r],n[r]=t;return n},some:function(t){return nt(jt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return pt.call(jt(this),t)},subarray:function(t,n){var r=jt(this),e=r.length,i=y(t,e);return new(I(r,r[St]))(r.buffer,r.byteOffset+i*r.BYTES_PER_ELEMENT,d((void 0===n?e:y(n,e))-i))}},Ut=function(t,n){return It(this,dt.call(jt(this),t,n))},Wt=function(t){jt(this);var n=At(arguments[1],1),r=this.length,e=x(t),i=d(e.length),o=0;if(i+n>r)throw B(Ot);for(;o<i;)this[n+o]=e[o++]},Vt={entries:function(){return at.call(jt(this))},keys:function(){return ft.call(jt(this))},values:function(){return ct.call(jt(this))}},Bt=function(t,n){return S(t)&&t[_t]&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)},zt=function(t,n){return Bt(t,n=m(n,!0))?l(2,t[n]):V(t,n)},Yt=function(t,n,r){return!(Bt(t,n=m(n,!0))&&S(r)&&b(r,"value"))||b(r,"get")||b(r,"set")||r.configurable||b(r,"writable")&&!r.writable||b(r,"enumerable")&&!r.enumerable?W(t,n,r):(t[n]=r.value,t)};xt||(U.f=zt,G.f=Yt),u(u.S+u.F*!xt,"Object",{getOwnPropertyDescriptor:zt,defineProperty:Yt}),o(function(){gt.call({})})&&(gt=yt=function(){return vt.call(this)});var qt=v({},Gt);v(qt,Vt),h(qt,mt,Vt.values),v(qt,{slice:Ut,set:Wt,constructor:function(){},toString:gt,toLocaleString:Dt}),Rt(qt,"buffer","b"),Rt(qt,"byteOffset","o"),Rt(qt,"byteLength","l"),Rt(qt,"length","e"),W(qt,bt,{get:function(){return this[_t]}}),n.exports=function(t,n,r,f){f=!!f;var a=t+(f?"Clamped":"")+"Array",l="get"+t,v="set"+t,p=i[a],y=p||{},m=p&&O(p),b=!p||!c.ABV,x={},_=p&&p[H],P=function(t,r){var e=t._d;return e.v[l](r*n+e.o,Pt)},F=function(t,r,e){var i=t._d;f&&(e=(e=Math.round(e))<0?0:e>255?255:255&e),i.v[v](r*n+i.o,e,Pt)},A=function(t,n){W(t,n,{get:function(){return P(this,n)},set:function(t){return F(this,n,t)},enumerable:!0})};b?(p=r(function(t,r,e,i){s(t,p,a,"_d");var o,u,c,f,l=0,v=0;if(S(r)){if(!(r instanceof $||(f=w(r))==q||f==J))return _t in r?Tt(p,r):Lt.call(p,r);o=r,v=At(e,n);var y=r.byteLength;if(void 0===i){if(y%n)throw B(Ot);if(u=y-v,u<0)throw B(Ot)}else if(u=d(i)*n,u+v>y)throw B(Ot);c=u/n}else c=g(r),u=c*n,o=new $(u);for(h(t,"_d",{b:o,o:v,l:u,e:c,v:new Z(o)});l<c;)A(t,l++)}),_=p[H]=E(qt),h(_,"constructor",p)):o(function(){p(1)})&&o(function(){new p((-1))})&&L(function(t){new p,new p(null),new p(1.5),new p(t)},!0)||(p=r(function(t,r,e,i){s(t,p,a);var o;return S(r)?r instanceof $||(o=w(r))==q||o==J?void 0!==i?new y(r,At(e,n),i):void 0!==e?new y(r,At(e,n)):new y(r):_t in r?Tt(p,r):Lt.call(p,r):new y(g(r))}),Q(m!==Function.prototype?M(y).concat(M(m)):M(y),function(t){t in p||h(p,t,y[t])}),p[H]=_,e||(_.constructor=p));var j=_[mt],N=!!j&&("values"==j.name||void 0==j.name),I=Vt.values;h(p,wt,!0),h(_,_t,a),h(_,Et,!0),h(_,St,p),(f?new p(1)[bt]==a:bt in _)||W(_,bt,{get:function(){return a}}),x[a]=p,u(u.G+u.W+u.F*(p!=y),x),u(u.S,a,{BYTES_PER_ELEMENT:n}),u(u.S+u.F*o(function(){y.of.call(p,1)}),a,{from:Lt,of:kt}),K in _||h(_,K,n),u(u.P,a,Gt),k(a),u(u.P+u.F*Ft,a,{set:Wt}),u(u.P+u.F*!N,a,Vt),e||_.toString==gt||(_.toString=gt),u(u.P+u.F*o(function(){new p(1).slice()}),a,{slice:Ut}),u(u.P+u.F*(o(function(){return[1,2].toLocaleString()!=new p([1,2]).toLocaleString()})||!o(function(){_.toLocaleString.call([1,2])})),a,{toLocaleString:Dt}),R[a]=N?j:I,e||N||h(_,mt,I)}}else n.exports=function(){}},{100:100,104:104,11:11,114:114,115:115,116:116,118:118,119:119,12:12,120:120,122:122,123:123,124:124,128:128,129:129,141:141,17:17,25:25,29:29,33:33,35:35,40:40,41:41,42:42,48:48,51:51,56:56,58:58,6:6,60:60,71:71,72:72,75:75,77:77,79:79,8:8,9:9,92:92,93:93}],122:[function(t,n,r){"use strict";function e(t,n,r){var e,i,o,u=Array(r),c=8*r-n-1,f=(1<<c)-1,a=f>>1,s=23===n?W(2,-24)-W(2,-77):0,l=0,h=t<0||0===t&&1/t<0?1:0;for(t=U(t),t!=t||t===D?(i=t!=t?1:0,e=f):(e=V(B(t)/z),t*(o=W(2,-e))<1&&(e--,o*=2),t+=e+a>=1?s/o:s*W(2,1-a),t*o>=2&&(e++,o/=2),e+a>=f?(i=0,e=f):e+a>=1?(i=(t*o-1)*W(2,n),e+=a):(i=t*W(2,a-1)*W(2,n),e=0));n>=8;u[l++]=255&i,i/=256,n-=8);for(e=e<<n|i,c+=n;c>0;u[l++]=255&e,e/=256,c-=8);return u[--l]|=128*h,u}function i(t,n,r){var e,i=8*r-n-1,o=(1<<i)-1,u=o>>1,c=i-7,f=r-1,a=t[f--],s=127&a;for(a>>=7;c>0;s=256*s+t[f],f--,c-=8);for(e=s&(1<<-c)-1,s>>=-c,c+=n;c>0;e=256*e+t[f],f--,c-=8);if(0===s)s=1-u;else{if(s===o)return e?NaN:a?-D:D;e+=W(2,n),s-=u}return(a?-1:1)*e*W(2,s-n)}function o(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function u(t){return[255&t]}function c(t){return[255&t,t>>8&255]}function f(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function a(t){return e(t,52,8)}function s(t){return e(t,23,4)}function l(t,n,r){M(t[N],n,{get:function(){return this[r]}})}function h(t,n,r,e){var i=+r,o=E(i);if(o+n>t[H])throw C(T);var u=t[K]._b,c=o+t[X],f=u.slice(c,c+n);return e?f:f.reverse()}function v(t,n,r,e,i,o){var u=+r,c=E(u);if(c+n>t[H])throw C(T);for(var f=t[K]._b,a=c+t[X],s=e(+i),l=0;l<n;l++)f[a+l]=s[o?l:n-l-1]}var p=t(40),d=t(29),g=t(60),y=t(123),m=t(42),b=t(93),w=t(35),S=t(6),x=t(116),_=t(118),E=t(115),O=t(77).f,M=t(72).f,P=t(9),F=t(101),A="ArrayBuffer",j="DataView",N="prototype",I="Wrong length!",T="Wrong index!",R=p[A],L=p[j],k=p.Math,C=p.RangeError,D=p.Infinity,G=R,U=k.abs,W=k.pow,V=k.floor,B=k.log,z=k.LN2,Y="buffer",q="byteLength",J="byteOffset",K=d?"_b":Y,H=d?"_l":q,X=d?"_o":J;if(y.ABV){if(!w(function(){R(1)})||!w(function(){new R((-1))})||w(function(){return new R,new R(1.5),new R(NaN),R.name!=A})){R=function(t){return S(this,R),new G(E(t))};for(var $,Z=R[N]=G[N],Q=O(G),tt=0;Q.length>tt;)($=Q[tt++])in R||m(R,$,G[$]);g||(Z.constructor=R)}var nt=new L(new R(2)),rt=L[N].setInt8;nt.setInt8(0,2147483648),nt.setInt8(1,2147483649),!nt.getInt8(0)&&nt.getInt8(1)||b(L[N],{setInt8:function(t,n){rt.call(this,t,n<<24>>24)},setUint8:function(t,n){rt.call(this,t,n<<24>>24)}},!0)}else R=function(t){S(this,R,A);var n=E(t);this._b=P.call(Array(n),0),this[H]=n},L=function(t,n,r){S(this,L,j),S(t,R,j);var e=t[H],i=x(n);if(i<0||i>e)throw C("Wrong offset!");if(r=void 0===r?e-i:_(r),i+r>e)throw C(I);this[K]=t,this[X]=i,this[H]=r},d&&(l(R,q,"_l"),l(L,Y,"_b"),l(L,q,"_l"),l(L,J,"_o")),b(L[N],{getInt8:function(t){return h(this,1,t)[0]<<24>>24},getUint8:function(t){return h(this,1,t)[0]},getInt16:function(t){var n=h(this,2,t,arguments[1]);return(n[1]<<8|n[0])<<16>>16},getUint16:function(t){var n=h(this,2,t,arguments[1]);return n[1]<<8|n[0]},getInt32:function(t){return o(h(this,4,t,arguments[1]))},getUint32:function(t){return o(h(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return i(h(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return i(h(this,8,t,arguments[1]),52,8)},setInt8:function(t,n){v(this,1,t,u,n)},setUint8:function(t,n){v(this,1,t,u,n)},setInt16:function(t,n){v(this,2,t,c,n,arguments[2])},setUint16:function(t,n){v(this,2,t,c,n,arguments[2])},setInt32:function(t,n){v(this,4,t,f,n,arguments[2])},setUint32:function(t,n){v(this,4,t,f,n,arguments[2])},setFloat32:function(t,n){v(this,4,t,s,n,arguments[2])},setFloat64:function(t,n){v(this,8,t,a,n,arguments[2])}});F(R,A),F(L,j),m(L[N],y.VIEW,!0),r[A]=R,r[j]=L},{101:101,115:115,116:116,118:118,123:123,29:29,35:35,40:40,42:42,6:6,60:60,72:72,77:77,9:9,93:93}],123:[function(t,n,r){for(var e,i=t(40),o=t(42),u=t(124),c=u("typed_array"),f=u("view"),a=!(!i.ArrayBuffer||!i.DataView),s=a,l=0,h=9,v="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<h;)(e=i[v[l++]])?(o(e.prototype,c,!0),o(e.prototype,f,!0)):s=!1;n.exports={ABV:a,CONSTR:s,TYPED:c,VIEW:f}},{124:124,40:40,42:42}],124:[function(t,n,r){var e=0,i=Math.random();n.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+i).toString(36))}},{}],125:[function(t,n,r){var e=t(51);n.exports=function(t,n){if(!e(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},{51:51}],126:[function(t,n,r){var e=t(40),i=t(23),o=t(60),u=t(127),c=t(72).f;n.exports=function(t){var n=i.Symbol||(i.Symbol=o?{}:e.Symbol||{});"_"==t.charAt(0)||t in n||c(n,t,{value:u.f(t)})}},{127:127,23:23,40:40,60:60,72:72}],127:[function(t,n,r){r.f=t(128)},{128:128}],128:[function(t,n,r){var e=t(103)("wks"),i=t(124),o=t(40).Symbol,u="function"==typeof o,c=n.exports=function(t){return e[t]||(e[t]=u&&o[t]||(u?o:i)("Symbol."+t))};c.store=e},{103:103,124:124,40:40}],129:[function(t,n,r){var e=t(17),i=t(128)("iterator"),o=t(58);n.exports=t(23).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||o[e(t)]}},{128:128,17:17,23:23,58:58}],130:[function(t,n,r){var e=t(33),i=t(95)(/[\\^$*+?.()|[\]{}]/g,"\\$&");e(e.S,"RegExp",{escape:function(t){return i(t)}})},{33:33,95:95}],131:[function(t,n,r){var e=t(33);e(e.P,"Array",{copyWithin:t(8)}),t(5)("copyWithin")},{33:33,5:5,8:8}],132:[function(t,n,r){"use strict";var e=t(33),i=t(12)(4);e(e.P+e.F*!t(105)([].every,!0),"Array",{every:function(t){return i(this,t,arguments[1])}})},{105:105,12:12,33:33}],133:[function(t,n,r){var e=t(33);e(e.P,"Array",{fill:t(9)}),t(5)("fill")},{33:33,5:5,9:9}],134:[function(t,n,r){"use strict";var e=t(33),i=t(12)(2);e(e.P+e.F*!t(105)([].filter,!0),"Array",{filter:function(t){return i(this,t,arguments[1])}})},{105:105,12:12,33:33}],135:[function(t,n,r){"use strict";var e=t(33),i=t(12)(6),o="findIndex",u=!0;o in[]&&Array(1)[o](function(){u=!1}),e(e.P+e.F*u,"Array",{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(5)(o)},{12:12,33:33,5:5}],136:[function(t,n,r){"use strict";var e=t(33),i=t(12)(5),o="find",u=!0;o in[]&&Array(1)[o](function(){u=!1}),e(e.P+e.F*u,"Array",{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(5)(o)},{12:12,33:33,5:5}],137:[function(t,n,r){"use strict";var e=t(33),i=t(12)(0),o=t(105)([].forEach,!0);e(e.P+e.F*!o,"Array",{forEach:function(t){return i(this,t,arguments[1])}})},{105:105,12:12,33:33}],138:[function(t,n,r){"use strict";var e=t(25),i=t(33),o=t(119),u=t(53),c=t(48),f=t(118),a=t(24),s=t(129);i(i.S+i.F*!t(56)(function(t){Array.from(t)}),"Array",{from:function(t){var n,r,i,l,h=o(t),v="function"==typeof this?this:Array,p=arguments.length,d=p>1?arguments[1]:void 0,g=void 0!==d,y=0,m=s(h);if(g&&(d=e(d,p>2?arguments[2]:void 0,2)),void 0==m||v==Array&&c(m))for(n=f(h.length),r=new v(n);n>y;y++)a(r,y,g?d(h[y],y):h[y]);else for(l=m.call(h),r=new v;!(i=l.next()).done;y++)a(r,y,g?u(l,d,[i.value,y],!0):i.value);return r.length=y,r}})},{118:118,119:119,129:129,24:24,25:25,33:33,48:48,53:53,56:56}],139:[function(t,n,r){"use strict";var e=t(33),i=t(11)(!1),o=[].indexOf,u=!!o&&1/[1].indexOf(1,-0)<0;e(e.P+e.F*(u||!t(105)(o)),"Array",{indexOf:function(t){return u?o.apply(this,arguments)||0:i(this,t,arguments[1])}})},{105:105,11:11,33:33}],140:[function(t,n,r){var e=t(33);e(e.S,"Array",{isArray:t(49)})},{33:33,49:49}],141:[function(t,n,r){"use strict";var e=t(5),i=t(57),o=t(58),u=t(117);n.exports=t(55)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,i(1)):"keys"==n?i(0,r):"values"==n?i(0,t[r]):i(0,[r,t[r]])},"values"),o.Arguments=o.Array,e("keys"),e("values"),e("entries")},{117:117,5:5,55:55,57:57,58:58}],142:[function(t,n,r){"use strict";var e=t(33),i=t(117),o=[].join;e(e.P+e.F*(t(47)!=Object||!t(105)(o)),"Array",{join:function(t){return o.call(i(this),void 0===t?",":t)}})},{105:105,117:117,33:33,47:47}],143:[function(t,n,r){"use strict";var e=t(33),i=t(117),o=t(116),u=t(118),c=[].lastIndexOf,f=!!c&&1/[1].lastIndexOf(1,-0)<0;e(e.P+e.F*(f||!t(105)(c)),"Array",{lastIndexOf:function(t){if(f)return c.apply(this,arguments)||0;var n=i(this),r=u(n.length),e=r-1;for(arguments.length>1&&(e=Math.min(e,o(arguments[1]))),e<0&&(e=r+e);e>=0;e--)if(e in n&&n[e]===t)return e||0;return-1}})},{105:105,116:116,117:117,118:118,33:33}],144:[function(t,n,r){"use strict";var e=t(33),i=t(12)(1);e(e.P+e.F*!t(105)([].map,!0),"Array",{map:function(t){return i(this,t,arguments[1])}})},{105:105,12:12,33:33}],145:[function(t,n,r){"use strict";var e=t(33),i=t(24);e(e.S+e.F*t(35)(function(){function t(){}return!(Array.of.call(t)instanceof t)}),"Array",{of:function(){for(var t=0,n=arguments.length,r=new("function"==typeof this?this:Array)(n);n>t;)i(r,t,arguments[t++]);return r.length=n,r}})},{24:24,33:33,35:35}],146:[function(t,n,r){"use strict";var e=t(33),i=t(13);e(e.P+e.F*!t(105)([].reduceRight,!0),"Array",{reduceRight:function(t){return i(this,t,arguments.length,arguments[1],!0)}})},{105:105,13:13,33:33}],147:[function(t,n,r){"use strict";var e=t(33),i=t(13);e(e.P+e.F*!t(105)([].reduce,!0),"Array",{reduce:function(t){return i(this,t,arguments.length,arguments[1],!1)}})},{105:105,13:13,33:33}],148:[function(t,n,r){"use strict";var e=t(33),i=t(43),o=t(18),u=t(114),c=t(118),f=[].slice;e(e.P+e.F*t(35)(function(){i&&f.call(i)}),"Array",{slice:function(t,n){var r=c(this.length),e=o(this);if(n=void 0===n?r:n,"Array"==e)return f.call(this,t,n);for(var i=u(t,r),a=u(n,r),s=c(a-i),l=Array(s),h=0;h<s;h++)l[h]="String"==e?this.charAt(i+h):this[i+h];return l}})},{114:114,118:118,18:18,33:33,35:35,43:43}],149:[function(t,n,r){"use strict";var e=t(33),i=t(12)(3);e(e.P+e.F*!t(105)([].some,!0),"Array",{some:function(t){return i(this,t,arguments[1])}})},{105:105,12:12,33:33}],150:[function(t,n,r){"use strict";var e=t(33),i=t(3),o=t(119),u=t(35),c=[].sort,f=[1,2,3];e(e.P+e.F*(u(function(){f.sort(void 0)})||!u(function(){f.sort(null)})||!t(105)(c)),"Array",{sort:function(t){return void 0===t?c.call(o(this)):c.call(o(this),i(t))}})},{105:105,119:119,3:3,33:33,35:35}],151:[function(t,n,r){t(100)("Array")},{100:100}],152:[function(t,n,r){var e=t(33);e(e.S,"Date",{now:function(){return(new Date).getTime()}})},{33:33}],153:[function(t,n,r){var e=t(33),i=t(26);e(e.P+e.F*(Date.prototype.toISOString!==i),"Date",{toISOString:i})},{26:26,33:33}],154:[function(t,n,r){"use strict";var e=t(33),i=t(119),o=t(120);e(e.P+e.F*t(35)(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}),"Date",{toJSON:function(t){var n=i(this),r=o(n);return"number"!=typeof r||isFinite(r)?n.toISOString():null}})},{119:119,120:120,33:33,35:35}],155:[function(t,n,r){var e=t(128)("toPrimitive"),i=Date.prototype;e in i||t(42)(i,e,t(27))},{128:128,27:27,42:42}],156:[function(t,n,r){var e=Date.prototype,i="Invalid Date",o="toString",u=e[o],c=e.getTime;new Date(NaN)+""!=i&&t(94)(e,o,function(){var t=c.call(this);return t===t?u.call(this):i})},{94:94}],157:[function(t,n,r){var e=t(33);e(e.P,"Function",{bind:t(16)})},{16:16,33:33}],158:[function(t,n,r){"use strict";var e=t(51),i=t(79),o=t(128)("hasInstance"),u=Function.prototype;o in u||t(72).f(u,o,{value:function(t){if("function"!=typeof this||!e(t))return!1;if(!e(this.prototype))return t instanceof this;for(;t=i(t);)if(this.prototype===t)return!0;return!1}})},{128:128,51:51,72:72,79:79}],159:[function(t,n,r){var e=t(72).f,i=Function.prototype,o=/^\s*function ([^ (]*)/,u="name";u in i||t(29)&&e(i,u,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},{29:29,72:72}],160:[function(t,n,r){"use strict";var e=t(19),i=t(125),o="Map";n.exports=t(22)(o,function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var n=e.getEntry(i(this,o),t);return n&&n.v},set:function(t,n){return e.def(i(this,o),0===t?0:t,n)}},e,!0)},{125:125,19:19,22:22}],161:[function(t,n,r){var e=t(33),i=t(63),o=Math.sqrt,u=Math.acosh;e(e.S+e.F*!(u&&710==Math.floor(u(Number.MAX_VALUE))&&u(1/0)==1/0),"Math",{acosh:function(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:i(t-1+o(t-1)*o(t+1))}})},{33:33,63:63}],162:[function(t,n,r){function e(t){return isFinite(t=+t)&&0!=t?t<0?-e(-t):Math.log(t+Math.sqrt(t*t+1)):t}var i=t(33),o=Math.asinh;i(i.S+i.F*!(o&&1/o(0)>0),"Math",{asinh:e})},{33:33}],163:[function(t,n,r){var e=t(33),i=Math.atanh;e(e.S+e.F*!(i&&1/i(-0)<0),"Math",{atanh:function(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},{33:33}],164:[function(t,n,r){var e=t(33),i=t(65);e(e.S,"Math",{cbrt:function(t){return i(t=+t)*Math.pow(Math.abs(t),1/3)}})},{33:33,65:65}],165:[function(t,n,r){var e=t(33);e(e.S,"Math",{clz32:function(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},{33:33}],166:[function(t,n,r){var e=t(33),i=Math.exp;e(e.S,"Math",{cosh:function(t){return(i(t=+t)+i(-t))/2}})},{33:33}],167:[function(t,n,r){var e=t(33),i=t(61);e(e.S+e.F*(i!=Math.expm1),"Math",{expm1:i})},{33:33,61:61}],168:[function(t,n,r){var e=t(33);e(e.S,"Math",{fround:t(62)})},{33:33,62:62}],169:[function(t,n,r){var e=t(33),i=Math.abs;e(e.S,"Math",{hypot:function(t,n){for(var r,e,o=0,u=0,c=arguments.length,f=0;u<c;)r=i(arguments[u++]),f<r?(e=f/r,o=o*e*e+1,f=r):r>0?(e=r/f,o+=e*e):o+=r;return f===1/0?1/0:f*Math.sqrt(o)}})},{33:33}],170:[function(t,n,r){var e=t(33),i=Math.imul;e(e.S+e.F*t(35)(function(){return i(4294967295,5)!=-5||2!=i.length}),"Math",{imul:function(t,n){var r=65535,e=+t,i=+n,o=r&e,u=r&i;return 0|o*u+((r&e>>>16)*u+o*(r&i>>>16)<<16>>>0)}})},{33:33,35:35}],171:[function(t,n,r){var e=t(33);e(e.S,"Math",{log10:function(t){return Math.log(t)*Math.LOG10E}})},{33:33}],172:[function(t,n,r){var e=t(33);e(e.S,"Math",{log1p:t(63)})},{33:33,63:63}],173:[function(t,n,r){var e=t(33);e(e.S,"Math",{log2:function(t){return Math.log(t)/Math.LN2}})},{33:33}],174:[function(t,n,r){var e=t(33);e(e.S,"Math",{sign:t(65)})},{33:33,65:65}],175:[function(t,n,r){var e=t(33),i=t(61),o=Math.exp;e(e.S+e.F*t(35)(function(){return!Math.sinh(-2e-17)!=-2e-17}),"Math",{sinh:function(t){return Math.abs(t=+t)<1?(i(t)-i(-t))/2:(o(t-1)-o(-t-1))*(Math.E/2)}})},{33:33,35:35,61:61}],176:[function(t,n,r){var e=t(33),i=t(61),o=Math.exp;e(e.S,"Math",{tanh:function(t){var n=i(t=+t),r=i(-t);return n==1/0?1:r==1/0?-1:(n-r)/(o(t)+o(-t))}})},{33:33,61:61}],177:[function(t,n,r){var e=t(33);e(e.S,"Math",{trunc:function(t){return(t>0?Math.floor:Math.ceil)(t)}})},{33:33}],178:[function(t,n,r){"use strict";var e=t(40),i=t(41),o=t(18),u=t(45),c=t(120),f=t(35),a=t(77).f,s=t(75).f,l=t(72).f,h=t(111).trim,v="Number",p=e[v],d=p,g=p.prototype,y=o(t(71)(g))==v,m="trim"in String.prototype,b=function(t){var n=c(t,!1);if("string"==typeof n&&n.length>2){n=m?n.trim():h(n,3);var r,e,i,o=n.charCodeAt(0);if(43===o||45===o){if(r=n.charCodeAt(2),88===r||120===r)return NaN}else if(48===o){switch(n.charCodeAt(1)){case 66:case 98:e=2,i=49;break;case 79:case 111:e=8,i=55;break;default:return+n}for(var u,f=n.slice(2),a=0,s=f.length;a<s;a++)if(u=f.charCodeAt(a),u<48||u>i)return NaN;return parseInt(f,e)}}return+n};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(t){var n=arguments.length<1?0:t,r=this;return r instanceof p&&(y?f(function(){g.valueOf.call(r)}):o(r)!=v)?u(new d(b(n)),r,p):b(n)};for(var w,S=t(29)?a(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;S.length>x;x++)i(d,w=S[x])&&!i(p,w)&&l(p,w,s(d,w));p.prototype=g,g.constructor=p,t(94)(e,v,p)}},{111:111,120:120,18:18,29:29,35:35,40:40,41:41,45:45,71:71,72:72,75:75,77:77,94:94}],179:[function(t,n,r){var e=t(33);e(e.S,"Number",{EPSILON:Math.pow(2,-52)})},{33:33}],180:[function(t,n,r){var e=t(33),i=t(40).isFinite;e(e.S,"Number",{isFinite:function(t){return"number"==typeof t&&i(t)}})},{33:33,40:40}],181:[function(t,n,r){var e=t(33);e(e.S,"Number",{isInteger:t(50)})},{33:33,50:50}],182:[function(t,n,r){var e=t(33);e(e.S,"Number",{isNaN:function(t){return t!=t}})},{33:33}],183:[function(t,n,r){var e=t(33),i=t(50),o=Math.abs;e(e.S,"Number",{isSafeInteger:function(t){return i(t)&&o(t)<=9007199254740991}})},{33:33,50:50}],184:[function(t,n,r){var e=t(33);e(e.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},{33:33}],185:[function(t,n,r){var e=t(33);e(e.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},{33:33}],186:[function(t,n,r){var e=t(33),i=t(86);e(e.S+e.F*(Number.parseFloat!=i),"Number",{parseFloat:i})},{33:33,86:86}],187:[function(t,n,r){var e=t(33),i=t(87);e(e.S+e.F*(Number.parseInt!=i),"Number",{parseInt:i})},{33:33,87:87}],188:[function(t,n,r){"use strict";var e=t(33),i=t(116),o=t(4),u=t(110),c=1..toFixed,f=Math.floor,a=[0,0,0,0,0,0],s="Number.toFixed: incorrect invocation!",l="0",h=function(t,n){for(var r=-1,e=n;++r<6;)e+=t*a[r],a[r]=e%1e7,e=f(e/1e7)},v=function(t){for(var n=6,r=0;--n>=0;)r+=a[n],a[n]=f(r/t),r=r%t*1e7},p=function(){for(var t=6,n="";--t>=0;)if(""!==n||0===t||0!==a[t]){var r=String(a[t]);n=""===n?r:n+u.call(l,7-r.length)+r}return n},d=function(t,n,r){return 0===n?r:n%2===1?d(t,n-1,r*t):d(t*t,n/2,r)},g=function(t){for(var n=0,r=t;r>=4096;)n+=12,r/=4096;for(;r>=2;)n+=1,r/=2;return n};e(e.P+e.F*(!!c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!t(35)(function(){c.call({})})),"Number",{toFixed:function(t){var n,r,e,c,f=o(this,s),a=i(t),y="",m=l;if(a<0||a>20)throw RangeError(s);if(f!=f)return"NaN";if(f<=-1e21||f>=1e21)return String(f);if(f<0&&(y="-",f=-f),f>1e-21)if(n=g(f*d(2,69,1))-69,r=n<0?f*d(2,-n,1):f/d(2,n,1),r*=4503599627370496,n=52-n,n>0){for(h(0,r),e=a;e>=7;)h(1e7,0),e-=7;for(h(d(10,e,1),0),e=n-1;e>=23;)v(1<<23),e-=23;v(1<<e),h(1,1),v(2),m=p()}else h(0,r),h(1<<-n,0),m=p()+u.call(l,a);return a>0?(c=m.length,m=y+(c<=a?"0."+u.call(l,a-c)+m:m.slice(0,c-a)+"."+m.slice(c-a))):m=y+m,m}})},{110:110,116:116,33:33,35:35,4:4}],189:[function(t,n,r){"use strict";var e=t(33),i=t(35),o=t(4),u=1..toPrecision;e(e.P+e.F*(i(function(){return"1"!==u.call(1,void 0)})||!i(function(){u.call({})})),"Number",{toPrecision:function(t){var n=o(this,"Number#toPrecision: incorrect invocation!");return void 0===t?u.call(n):u.call(n,t)}})},{33:33,35:35,4:4}],190:[function(t,n,r){var e=t(33);e(e.S+e.F,"Object",{assign:t(70)})},{33:33,70:70}],191:[function(t,n,r){var e=t(33);e(e.S,"Object",{create:t(71)})},{33:33,71:71}],192:[function(t,n,r){var e=t(33);e(e.S+e.F*!t(29),"Object",{defineProperties:t(73)})},{29:29,33:33,73:73}],193:[function(t,n,r){var e=t(33);e(e.S+e.F*!t(29),"Object",{defineProperty:t(72).f})},{29:29,33:33,72:72}],194:[function(t,n,r){var e=t(51),i=t(66).onFreeze;t(83)("freeze",function(t){return function(n){return t&&e(n)?t(i(n)):n}})},{51:51,66:66,83:83}],195:[function(t,n,r){var e=t(117),i=t(75).f;t(83)("getOwnPropertyDescriptor",function(){return function(t,n){return i(e(t),n)}})},{117:117,75:75,83:83}],196:[function(t,n,r){t(83)("getOwnPropertyNames",function(){return t(76).f})},{76:76,83:83}],197:[function(t,n,r){var e=t(119),i=t(79);t(83)("getPrototypeOf",function(){return function(t){return i(e(t))}})},{119:119,79:79,83:83}],198:[function(t,n,r){var e=t(51);t(83)("isExtensible",function(t){return function(n){return!!e(n)&&(!t||t(n))}})},{51:51,83:83}],199:[function(t,n,r){var e=t(51);t(83)("isFrozen",function(t){return function(n){return!e(n)||!!t&&t(n)}})},{51:51,83:83}],200:[function(t,n,r){var e=t(51);t(83)("isSealed",function(t){return function(n){return!e(n)||!!t&&t(n)}})},{51:51,83:83}],201:[function(t,n,r){var e=t(33);e(e.S,"Object",{is:t(96)})},{33:33,96:96}],202:[function(t,n,r){var e=t(119),i=t(81);t(83)("keys",function(){return function(t){return i(e(t))}})},{119:119,81:81,83:83}],203:[function(t,n,r){var e=t(51),i=t(66).onFreeze;t(83)("preventExtensions",function(t){return function(n){return t&&e(n)?t(i(n)):n}})},{51:51,66:66,83:83}],204:[function(t,n,r){var e=t(51),i=t(66).onFreeze;t(83)("seal",function(t){return function(n){return t&&e(n)?t(i(n)):n}})},{51:51,66:66,83:83}],205:[function(t,n,r){var e=t(33);e(e.S,"Object",{setPrototypeOf:t(99).set})},{33:33,99:99}],206:[function(t,n,r){"use strict";var e=t(17),i={};i[t(128)("toStringTag")]="z",i+""!="[object z]"&&t(94)(Object.prototype,"toString",function(){return"[object "+e(this)+"]"},!0)},{128:128,17:17,94:94}],207:[function(t,n,r){var e=t(33),i=t(86);e(e.G+e.F*(parseFloat!=i),{parseFloat:i})},{33:33,86:86}],208:[function(t,n,r){var e=t(33),i=t(87);e(e.G+e.F*(parseInt!=i),{parseInt:i})},{33:33,87:87}],209:[function(t,n,r){"use strict";var e,i,o,u,c=t(60),f=t(40),a=t(25),s=t(17),l=t(33),h=t(51),v=t(3),p=t(6),d=t(39),g=t(104),y=t(113).set,m=t(68)(),b=t(69),w=t(90),S=t(91),x="Promise",_=f.TypeError,E=f.process,O=f[x],M="process"==s(E),P=function(){},F=i=b.f,A=!!function(){try{var n=O.resolve(1),r=(n.constructor={})[t(128)("species")]=function(t){t(P,P)};return(M||"function"==typeof PromiseRejectionEvent)&&n.then(P)instanceof r}catch(e){}}(),j=c?function(t,n){return t===n||t===O&&n===u}:function(t,n){return t===n},N=function(t){var n;return!(!h(t)||"function"!=typeof(n=t.then))&&n},I=function(t,n){if(!t._n){t._n=!0;var r=t._c;m(function(){for(var e=t._v,i=1==t._s,o=0,u=function(n){var r,o,u=i?n.ok:n.fail,c=n.resolve,f=n.reject,a=n.domain;try{u?(i||(2==t._h&&L(t),t._h=1),u===!0?r=e:(a&&a.enter(),r=u(e),a&&a.exit()),r===n.promise?f(_("Promise-chain cycle")):(o=N(r))?o.call(r,c,f):c(r)):f(e)}catch(s){f(s)}};r.length>o;)u(r[o++]);t._c=[],t._n=!1,n&&!t._h&&T(t)})}},T=function(t){y.call(f,function(){var n,r,e,i=t._v,o=R(t);if(o&&(n=w(function(){M?E.emit("unhandledRejection",i,t):(r=f.onunhandledrejection)?r({promise:t,reason:i}):(e=f.console)&&e.error&&e.error("Unhandled promise rejection",i)}),t._h=M||R(t)?2:1),t._a=void 0,o&&n.e)throw n.v})},R=function(t){if(1==t._h)return!1;for(var n,r=t._a||t._c,e=0;r.length>e;)if(n=r[e++],n.fail||!R(n.promise))return!1;return!0},L=function(t){y.call(f,function(){var n;M?E.emit("rejectionHandled",t):(n=f.onrejectionhandled)&&n({promise:t,reason:t._v})})},k=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),I(n,!0))},C=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw _("Promise can't be resolved itself");(n=N(t))?m(function(){var e={_w:r,_d:!1};try{n.call(t,a(C,e,1),a(k,e,1))}catch(i){k.call(e,i)}}):(r._v=t,r._s=1,I(r,!1))}catch(e){k.call({_w:r,_d:!1},e)}}};A||(O=function(t){p(this,O,x,"_h"),v(t),e.call(this);try{t(a(C,this,1),a(k,this,1))}catch(n){k.call(this,n)}},e=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},e.prototype=t(93)(O.prototype,{then:function(t,n){var r=F(g(this,O));return r.ok="function"!=typeof t||t,r.fail="function"==typeof n&&n,r.domain=M?E.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&I(this,!1),r.promise},"catch":function(t){return this.then(void 0,t)}}),o=function(){var t=new e;this.promise=t,this.resolve=a(C,t,1),this.reject=a(k,t,1)},b.f=F=function(t){return j(O,t)?new o(t):i(t)}),l(l.G+l.W+l.F*!A,{Promise:O}),t(101)(O,x),t(100)(x),u=t(23)[x],l(l.S+l.F*!A,x,{reject:function(t){var n=F(this),r=n.reject;return r(t),n.promise}}),l(l.S+l.F*(c||!A),x,{resolve:function(t){return t instanceof O&&j(t.constructor,this)?t:S(this,t)}}),l(l.S+l.F*!(A&&t(56)(function(t){O.all(t)["catch"](P)})),x,{all:function(t){var n=this,r=F(n),e=r.resolve,i=r.reject,o=w(function(){var r=[],o=0,u=1;d(t,!1,function(t){var c=o++,f=!1;r.push(void 0),u++,n.resolve(t).then(function(t){f||(f=!0,r[c]=t,--u||e(r))},i)}),--u||e(r)});return o.e&&i(o.v),r.promise},race:function(t){var n=this,r=F(n),e=r.reject,i=w(function(){d(t,!1,function(t){n.resolve(t).then(r.resolve,e)})});return i.e&&e(i.v),r.promise}})},{100:100,101:101,104:104,113:113,128:128,17:17,23:23,25:25,3:3,33:33,39:39,40:40,51:51,56:56,6:6,60:60,68:68,69:69,90:90,91:91,93:93}],210:[function(t,n,r){var e=t(33),i=t(3),o=t(7),u=(t(40).Reflect||{}).apply,c=Function.apply;e(e.S+e.F*!t(35)(function(){u(function(){})}),"Reflect",{apply:function(t,n,r){var e=i(t),f=o(r);return u?u(e,n,f):c.call(e,n,f)}})},{3:3,33:33,35:35,40:40,7:7}],211:[function(t,n,r){var e=t(33),i=t(71),o=t(3),u=t(7),c=t(51),f=t(35),a=t(16),s=(t(40).Reflect||{}).construct,l=f(function(){function t(){}return!(s(function(){},[],t)instanceof t)}),h=!f(function(){s(function(){})});e(e.S+e.F*(l||h),"Reflect",{construct:function(t,n){o(t),u(n);var r=arguments.length<3?t:o(arguments[2]);if(h&&!l)return s(t,n,r);if(t==r){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var e=[null];return e.push.apply(e,n),new(a.apply(t,e))}var f=r.prototype,v=i(c(f)?f:Object.prototype),p=Function.apply.call(t,v,n);return c(p)?p:v}})},{16:16,3:3,33:33,35:35,40:40,51:51,7:7,71:71}],212:[function(t,n,r){var e=t(72),i=t(33),o=t(7),u=t(120);i(i.S+i.F*t(35)(function(){Reflect.defineProperty(e.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function(t,n,r){o(t),n=u(n,!0),o(r);try{return e.f(t,n,r),!0}catch(i){return!1}}})},{120:120,33:33,35:35,7:7,72:72}],213:[function(t,n,r){var e=t(33),i=t(75).f,o=t(7);e(e.S,"Reflect",{deleteProperty:function(t,n){var r=i(o(t),n);return!(r&&!r.configurable)&&delete t[n]}})},{33:33,7:7,75:75}],214:[function(t,n,r){"use strict";var e=t(33),i=t(7),o=function(t){this._t=i(t),this._i=0;var n,r=this._k=[];for(n in t)r.push(n)};t(54)(o,"Object",function(){var t,n=this,r=n._k;do if(n._i>=r.length)return{value:void 0,done:!0};while(!((t=r[n._i++])in n._t));return{value:t,done:!1}}),e(e.S,"Reflect",{enumerate:function(t){return new o(t)}})},{33:33,54:54,7:7}],215:[function(t,n,r){var e=t(75),i=t(33),o=t(7);i(i.S,"Reflect",{getOwnPropertyDescriptor:function(t,n){return e.f(o(t),n)}})},{33:33,7:7,75:75}],216:[function(t,n,r){var e=t(33),i=t(79),o=t(7);e(e.S,"Reflect",{getPrototypeOf:function(t){return i(o(t))}})},{33:33,7:7,79:79}],217:[function(t,n,r){function e(t,n){var r,c,s=arguments.length<3?t:arguments[2];return a(t)===s?t[n]:(r=i.f(t,n))?u(r,"value")?r.value:void 0!==r.get?r.get.call(s):void 0:f(c=o(t))?e(c,n,s):void 0}var i=t(75),o=t(79),u=t(41),c=t(33),f=t(51),a=t(7);c(c.S,"Reflect",{get:e})},{33:33,41:41,51:51,7:7,75:75,79:79}],218:[function(t,n,r){var e=t(33);e(e.S,"Reflect",{has:function(t,n){return n in t}})},{33:33}],219:[function(t,n,r){var e=t(33),i=t(7),o=Object.isExtensible;e(e.S,"Reflect",{isExtensible:function(t){return i(t),!o||o(t);
}})},{33:33,7:7}],220:[function(t,n,r){var e=t(33);e(e.S,"Reflect",{ownKeys:t(85)})},{33:33,85:85}],221:[function(t,n,r){var e=t(33),i=t(7),o=Object.preventExtensions;e(e.S,"Reflect",{preventExtensions:function(t){i(t);try{return o&&o(t),!0}catch(n){return!1}}})},{33:33,7:7}],222:[function(t,n,r){var e=t(33),i=t(99);i&&e(e.S,"Reflect",{setPrototypeOf:function(t,n){i.check(t,n);try{return i.set(t,n),!0}catch(r){return!1}}})},{33:33,99:99}],223:[function(t,n,r){function e(t,n,r){var f,h,v=arguments.length<4?t:arguments[3],p=o.f(s(t),n);if(!p){if(l(h=u(t)))return e(h,n,r,v);p=a(0)}return c(p,"value")?!(p.writable===!1||!l(v))&&(f=o.f(v,n)||a(0),f.value=r,i.f(v,n,f),!0):void 0!==p.set&&(p.set.call(v,r),!0)}var i=t(72),o=t(75),u=t(79),c=t(41),f=t(33),a=t(92),s=t(7),l=t(51);f(f.S,"Reflect",{set:e})},{33:33,41:41,51:51,7:7,72:72,75:75,79:79,92:92}],224:[function(t,n,r){var e=t(40),i=t(45),o=t(72).f,u=t(77).f,c=t(52),f=t(37),a=e.RegExp,s=a,l=a.prototype,h=/a/g,v=/a/g,p=new a(h)!==h;if(t(29)&&(!p||t(35)(function(){return v[t(128)("match")]=!1,a(h)!=h||a(v)==v||"/a/i"!=a(h,"i")}))){a=function(t,n){var r=this instanceof a,e=c(t),o=void 0===n;return!r&&e&&t.constructor===a&&o?t:i(p?new s(e&&!o?t.source:t,n):s((e=t instanceof a)?t.source:t,e&&o?f.call(t):n),r?this:l,a)};for(var d=(function(t){t in a||o(a,t,{configurable:!0,get:function(){return s[t]},set:function(n){s[t]=n}})}),g=u(s),y=0;g.length>y;)d(g[y++]);l.constructor=a,a.prototype=l,t(94)(e,"RegExp",a)}t(100)("RegExp")},{100:100,128:128,29:29,35:35,37:37,40:40,45:45,52:52,72:72,77:77,94:94}],225:[function(t,n,r){t(29)&&"g"!=/./g.flags&&t(72).f(RegExp.prototype,"flags",{configurable:!0,get:t(37)})},{29:29,37:37,72:72}],226:[function(t,n,r){t(36)("match",1,function(t,n,r){return[function(r){"use strict";var e=t(this),i=void 0==r?void 0:r[n];return void 0!==i?i.call(r,e):new RegExp(r)[n](String(e))},r]})},{36:36}],227:[function(t,n,r){t(36)("replace",2,function(t,n,r){return[function(e,i){"use strict";var o=t(this),u=void 0==e?void 0:e[n];return void 0!==u?u.call(e,o,i):r.call(String(o),e,i)},r]})},{36:36}],228:[function(t,n,r){t(36)("search",1,function(t,n,r){return[function(r){"use strict";var e=t(this),i=void 0==r?void 0:r[n];return void 0!==i?i.call(r,e):new RegExp(r)[n](String(e))},r]})},{36:36}],229:[function(t,n,r){t(36)("split",2,function(n,r,e){"use strict";var i=t(52),o=e,u=[].push,c="split",f="length",a="lastIndex";if("c"=="abbc"[c](/(b)*/)[1]||4!="test"[c](/(?:)/,-1)[f]||2!="ab"[c](/(?:ab)*/)[f]||4!="."[c](/(.?)(.?)/)[f]||"."[c](/()()/)[f]>1||""[c](/.?/)[f]){var s=void 0===/()??/.exec("")[1];e=function(t,n){var r=String(this);if(void 0===t&&0===n)return[];if(!i(t))return o.call(r,t,n);var e,c,l,h,v,p=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,y=void 0===n?4294967295:n>>>0,m=new RegExp(t.source,d+"g");for(s||(e=new RegExp("^"+m.source+"$(?!\\s)",d));(c=m.exec(r))&&(l=c.index+c[0][f],!(l>g&&(p.push(r.slice(g,c.index)),!s&&c[f]>1&&c[0].replace(e,function(){for(v=1;v<arguments[f]-2;v++)void 0===arguments[v]&&(c[v]=void 0)}),c[f]>1&&c.index<r[f]&&u.apply(p,c.slice(1)),h=c[0][f],g=l,p[f]>=y)));)m[a]===c.index&&m[a]++;return g===r[f]?!h&&m.test("")||p.push(""):p.push(r.slice(g)),p[f]>y?p.slice(0,y):p}}else"0"[c](void 0,0)[f]&&(e=function(t,n){return void 0===t&&0===n?[]:o.call(this,t,n)});return[function(t,i){var o=n(this),u=void 0==t?void 0:t[r];return void 0!==u?u.call(t,o,i):e.call(String(o),t,i)},e]})},{36:36,52:52}],230:[function(t,n,r){"use strict";t(225);var e=t(7),i=t(37),o=t(29),u="toString",c=/./[u],f=function(n){t(94)(RegExp.prototype,u,n,!0)};t(35)(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?f(function(){var t=e(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)}):c.name!=u&&f(function(){return c.call(this)})},{225:225,29:29,35:35,37:37,7:7,94:94}],231:[function(t,n,r){"use strict";var e=t(19),i=t(125),o="Set";n.exports=t(22)(o,function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return e.def(i(this,o),t=0===t?0:t,t)}},e)},{125:125,19:19,22:22}],232:[function(t,n,r){"use strict";t(108)("anchor",function(t){return function(n){return t(this,"a","name",n)}})},{108:108}],233:[function(t,n,r){"use strict";t(108)("big",function(t){return function(){return t(this,"big","","")}})},{108:108}],234:[function(t,n,r){"use strict";t(108)("blink",function(t){return function(){return t(this,"blink","","")}})},{108:108}],235:[function(t,n,r){"use strict";t(108)("bold",function(t){return function(){return t(this,"b","","")}})},{108:108}],236:[function(t,n,r){"use strict";var e=t(33),i=t(106)(!1);e(e.P,"String",{codePointAt:function(t){return i(this,t)}})},{106:106,33:33}],237:[function(t,n,r){"use strict";var e=t(33),i=t(118),o=t(107),u="endsWith",c=""[u];e(e.P+e.F*t(34)(u),"String",{endsWith:function(t){var n=o(this,t,u),r=arguments.length>1?arguments[1]:void 0,e=i(n.length),f=void 0===r?e:Math.min(i(r),e),a=String(t);return c?c.call(n,a,f):n.slice(f-a.length,f)===a}})},{107:107,118:118,33:33,34:34}],238:[function(t,n,r){"use strict";t(108)("fixed",function(t){return function(){return t(this,"tt","","")}})},{108:108}],239:[function(t,n,r){"use strict";t(108)("fontcolor",function(t){return function(n){return t(this,"font","color",n)}})},{108:108}],240:[function(t,n,r){"use strict";t(108)("fontsize",function(t){return function(n){return t(this,"font","size",n)}})},{108:108}],241:[function(t,n,r){var e=t(33),i=t(114),o=String.fromCharCode,u=String.fromCodePoint;e(e.S+e.F*(!!u&&1!=u.length),"String",{fromCodePoint:function(t){for(var n,r=[],e=arguments.length,u=0;e>u;){if(n=+arguments[u++],i(n,1114111)!==n)throw RangeError(n+" is not a valid code point");r.push(n<65536?o(n):o(((n-=65536)>>10)+55296,n%1024+56320))}return r.join("")}})},{114:114,33:33}],242:[function(t,n,r){"use strict";var e=t(33),i=t(107),o="includes";e(e.P+e.F*t(34)(o),"String",{includes:function(t){return!!~i(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},{107:107,33:33,34:34}],243:[function(t,n,r){"use strict";t(108)("italics",function(t){return function(){return t(this,"i","","")}})},{108:108}],244:[function(t,n,r){"use strict";var e=t(106)(!0);t(55)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},{106:106,55:55}],245:[function(t,n,r){"use strict";t(108)("link",function(t){return function(n){return t(this,"a","href",n)}})},{108:108}],246:[function(t,n,r){var e=t(33),i=t(117),o=t(118);e(e.S,"String",{raw:function(t){for(var n=i(t.raw),r=o(n.length),e=arguments.length,u=[],c=0;r>c;)u.push(String(n[c++])),c<e&&u.push(String(arguments[c]));return u.join("")}})},{117:117,118:118,33:33}],247:[function(t,n,r){var e=t(33);e(e.P,"String",{repeat:t(110)})},{110:110,33:33}],248:[function(t,n,r){"use strict";t(108)("small",function(t){return function(){return t(this,"small","","")}})},{108:108}],249:[function(t,n,r){"use strict";var e=t(33),i=t(118),o=t(107),u="startsWith",c=""[u];e(e.P+e.F*t(34)(u),"String",{startsWith:function(t){var n=o(this,t,u),r=i(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),e=String(t);return c?c.call(n,e,r):n.slice(r,r+e.length)===e}})},{107:107,118:118,33:33,34:34}],250:[function(t,n,r){"use strict";t(108)("strike",function(t){return function(){return t(this,"strike","","")}})},{108:108}],251:[function(t,n,r){"use strict";t(108)("sub",function(t){return function(){return t(this,"sub","","")}})},{108:108}],252:[function(t,n,r){"use strict";t(108)("sup",function(t){return function(){return t(this,"sup","","")}})},{108:108}],253:[function(t,n,r){"use strict";t(111)("trim",function(t){return function(){return t(this,3)}})},{111:111}],254:[function(t,n,r){"use strict";var e=t(40),i=t(41),o=t(29),u=t(33),c=t(94),f=t(66).KEY,a=t(35),s=t(103),l=t(101),h=t(124),v=t(128),p=t(127),d=t(126),g=t(59),y=t(32),m=t(49),b=t(7),w=t(117),S=t(120),x=t(92),_=t(71),E=t(76),O=t(75),M=t(72),P=t(81),F=O.f,A=M.f,j=E.f,N=e.Symbol,I=e.JSON,T=I&&I.stringify,R="prototype",L=v("_hidden"),k=v("toPrimitive"),C={}.propertyIsEnumerable,D=s("symbol-registry"),G=s("symbols"),U=s("op-symbols"),W=Object[R],V="function"==typeof N,B=e.QObject,z=!B||!B[R]||!B[R].findChild,Y=o&&a(function(){return 7!=_(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,n,r){var e=F(W,n);e&&delete W[n],A(t,n,r),e&&t!==W&&A(W,n,e)}:A,q=function(t){var n=G[t]=_(N[R]);return n._k=t,n},J=V&&"symbol"==typeof N.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof N},K=function(t,n,r){return t===W&&K(U,n,r),b(t),n=S(n,!0),b(r),i(G,n)?(r.enumerable?(i(t,L)&&t[L][n]&&(t[L][n]=!1),r=_(r,{enumerable:x(0,!1)})):(i(t,L)||A(t,L,x(1,{})),t[L][n]=!0),Y(t,n,r)):A(t,n,r)},H=function(t,n){b(t);for(var r,e=y(n=w(n)),i=0,o=e.length;o>i;)K(t,r=e[i++],n[r]);return t},X=function(t,n){return void 0===n?_(t):H(_(t),n)},$=function(t){var n=C.call(this,t=S(t,!0));return!(this===W&&i(G,t)&&!i(U,t))&&(!(n||!i(this,t)||!i(G,t)||i(this,L)&&this[L][t])||n)},Z=function(t,n){if(t=w(t),n=S(n,!0),t!==W||!i(G,n)||i(U,n)){var r=F(t,n);return!r||!i(G,n)||i(t,L)&&t[L][n]||(r.enumerable=!0),r}},Q=function(t){for(var n,r=j(w(t)),e=[],o=0;r.length>o;)i(G,n=r[o++])||n==L||n==f||e.push(n);return e},tt=function(t){for(var n,r=t===W,e=j(r?U:w(t)),o=[],u=0;e.length>u;)!i(G,n=e[u++])||r&&!i(W,n)||o.push(G[n]);return o};V||(N=function(){if(this instanceof N)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0),n=function(r){this===W&&n.call(U,r),i(this,L)&&i(this[L],t)&&(this[L][t]=!1),Y(this,t,x(1,r))};return o&&z&&Y(W,t,{configurable:!0,set:n}),q(t)},c(N[R],"toString",function(){return this._k}),O.f=Z,M.f=K,t(77).f=E.f=Q,t(82).f=$,t(78).f=tt,o&&!t(60)&&c(W,"propertyIsEnumerable",$,!0),p.f=function(t){return q(v(t))}),u(u.G+u.W+u.F*!V,{Symbol:N});for(var nt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;nt.length>rt;)v(nt[rt++]);for(var et=P(v.store),it=0;et.length>it;)d(et[it++]);u(u.S+u.F*!V,"Symbol",{"for":function(t){return i(D,t+="")?D[t]:D[t]=N(t)},keyFor:function(t){if(J(t))return g(D,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){z=!0},useSimple:function(){z=!1}}),u(u.S+u.F*!V,"Object",{create:X,defineProperty:K,defineProperties:H,getOwnPropertyDescriptor:Z,getOwnPropertyNames:Q,getOwnPropertySymbols:tt}),I&&u(u.S+u.F*(!V||a(function(){var t=N();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!J(t)){for(var n,r,e=[t],i=1;arguments.length>i;)e.push(arguments[i++]);return n=e[1],"function"==typeof n&&(r=n),!r&&m(n)||(n=function(t,n){if(r&&(n=r.call(this,t,n)),!J(n))return n}),e[1]=n,T.apply(I,e)}}}),N[R][k]||t(42)(N[R],k,N[R].valueOf),l(N,"Symbol"),l(Math,"Math",!0),l(e.JSON,"JSON",!0)},{101:101,103:103,117:117,120:120,124:124,126:126,127:127,128:128,29:29,32:32,33:33,35:35,40:40,41:41,42:42,49:49,59:59,60:60,66:66,7:7,71:71,72:72,75:75,76:76,77:77,78:78,81:81,82:82,92:92,94:94}],255:[function(t,n,r){"use strict";var e=t(33),i=t(123),o=t(122),u=t(7),c=t(114),f=t(118),a=t(51),s=t(40).ArrayBuffer,l=t(104),h=o.ArrayBuffer,v=o.DataView,p=i.ABV&&s.isView,d=h.prototype.slice,g=i.VIEW,y="ArrayBuffer";e(e.G+e.W+e.F*(s!==h),{ArrayBuffer:h}),e(e.S+e.F*!i.CONSTR,y,{isView:function(t){return p&&p(t)||a(t)&&g in t}}),e(e.P+e.U+e.F*t(35)(function(){return!new h(2).slice(1,void 0).byteLength}),y,{slice:function(t,n){if(void 0!==d&&void 0===n)return d.call(u(this),t);for(var r=u(this).byteLength,e=c(t,r),i=c(void 0===n?r:n,r),o=new(l(this,h))(f(i-e)),a=new v(this),s=new v(o),p=0;e<i;)s.setUint8(p++,a.getUint8(e++));return o}}),t(100)(y)},{100:100,104:104,114:114,118:118,122:122,123:123,33:33,35:35,40:40,51:51,7:7}],256:[function(t,n,r){var e=t(33);e(e.G+e.W+e.F*!t(123).ABV,{DataView:t(122).DataView})},{122:122,123:123,33:33}],257:[function(t,n,r){t(121)("Float32",4,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],258:[function(t,n,r){t(121)("Float64",8,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],259:[function(t,n,r){t(121)("Int16",2,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],260:[function(t,n,r){t(121)("Int32",4,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],261:[function(t,n,r){t(121)("Int8",1,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],262:[function(t,n,r){t(121)("Uint16",2,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],263:[function(t,n,r){t(121)("Uint32",4,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],264:[function(t,n,r){t(121)("Uint8",1,function(t){return function(n,r,e){return t(this,n,r,e)}})},{121:121}],265:[function(t,n,r){t(121)("Uint8",1,function(t){return function(n,r,e){return t(this,n,r,e)}},!0)},{121:121}],266:[function(t,n,r){"use strict";var e,i=t(12)(0),o=t(94),u=t(66),c=t(70),f=t(21),a=t(51),s=t(35),l=t(125),h="WeakMap",v=u.getWeak,p=Object.isExtensible,d=f.ufstore,g={},y=function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},m={get:function(t){if(a(t)){var n=v(t);return n===!0?d(l(this,h)).get(t):n?n[this._i]:void 0}},set:function(t,n){return f.def(l(this,h),t,n)}},b=n.exports=t(22)(h,y,m,f,!0,!0);s(function(){return 7!=(new b).set((Object.freeze||Object)(g),7).get(g)})&&(e=f.getConstructor(y,h),c(e.prototype,m),u.NEED=!0,i(["delete","has","get","set"],function(t){var n=b.prototype,r=n[t];o(n,t,function(n,i){if(a(n)&&!p(n)){this._f||(this._f=new e);var o=this._f[t](n,i);return"set"==t?this:o}return r.call(this,n,i)})}))},{12:12,125:125,21:21,22:22,35:35,51:51,66:66,70:70,94:94}],267:[function(t,n,r){"use strict";var e=t(21),i=t(125),o="WeakSet";t(22)(o,function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return e.def(i(this,o),t,!0)}},e,!1,!0)},{125:125,21:21,22:22}],268:[function(t,n,r){"use strict";var e=t(33),i=t(38),o=t(119),u=t(118),c=t(3),f=t(15);e(e.P,"Array",{flatMap:function(t){var n,r,e=o(this);return c(t),n=u(e.length),r=f(e,0),i(r,e,e,n,0,1,t,arguments[1]),r}}),t(5)("flatMap")},{118:118,119:119,15:15,3:3,33:33,38:38,5:5}],269:[function(t,n,r){"use strict";var e=t(33),i=t(38),o=t(119),u=t(118),c=t(116),f=t(15);e(e.P,"Array",{flatten:function(){var t=arguments[0],n=o(this),r=u(n.length),e=f(n,0);return i(e,n,n,r,0,void 0===t?1:c(t)),e}}),t(5)("flatten")},{116:116,118:118,119:119,15:15,33:33,38:38,5:5}],270:[function(t,n,r){"use strict";var e=t(33),i=t(11)(!0);e(e.P,"Array",{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),t(5)("includes")},{11:11,33:33,5:5}],271:[function(t,n,r){var e=t(33),i=t(68)(),o=t(40).process,u="process"==t(18)(o);e(e.G,{asap:function(t){var n=u&&o.domain;i(n?n.bind(t):t)}})},{18:18,33:33,40:40,68:68}],272:[function(t,n,r){var e=t(33),i=t(18);e(e.S,"Error",{isError:function(t){return"Error"===i(t)}})},{18:18,33:33}],273:[function(t,n,r){var e=t(33);e(e.G,{global:t(40)})},{33:33,40:40}],274:[function(t,n,r){t(97)("Map")},{97:97}],275:[function(t,n,r){t(98)("Map")},{98:98}],276:[function(t,n,r){var e=t(33);e(e.P+e.R,"Map",{toJSON:t(20)("Map")})},{20:20,33:33}],277:[function(t,n,r){var e=t(33);e(e.S,"Math",{clamp:function(t,n,r){return Math.min(r,Math.max(n,t))}})},{33:33}],278:[function(t,n,r){var e=t(33);e(e.S,"Math",{DEG_PER_RAD:Math.PI/180})},{33:33}],279:[function(t,n,r){var e=t(33),i=180/Math.PI;e(e.S,"Math",{degrees:function(t){return t*i}})},{33:33}],280:[function(t,n,r){var e=t(33),i=t(64),o=t(62);e(e.S,"Math",{fscale:function(t,n,r,e,u){return o(i(t,n,r,e,u))}})},{33:33,62:62,64:64}],281:[function(t,n,r){var e=t(33);e(e.S,"Math",{iaddh:function(t,n,r,e){var i=t>>>0,o=n>>>0,u=r>>>0;return o+(e>>>0)+((i&u|(i|u)&~(i+u>>>0))>>>31)|0}})},{33:33}],282:[function(t,n,r){var e=t(33);e(e.S,"Math",{imulh:function(t,n){var r=65535,e=+t,i=+n,o=e&r,u=i&r,c=e>>16,f=i>>16,a=(c*u>>>0)+(o*u>>>16);return c*f+(a>>16)+((o*f>>>0)+(a&r)>>16)}})},{33:33}],283:[function(t,n,r){var e=t(33);e(e.S,"Math",{isubh:function(t,n,r,e){var i=t>>>0,o=n>>>0,u=r>>>0;return o-(e>>>0)-((~i&u|~(i^u)&i-u>>>0)>>>31)|0}})},{33:33}],284:[function(t,n,r){var e=t(33);e(e.S,"Math",{RAD_PER_DEG:180/Math.PI})},{33:33}],285:[function(t,n,r){var e=t(33),i=Math.PI/180;e(e.S,"Math",{radians:function(t){return t*i}})},{33:33}],286:[function(t,n,r){var e=t(33);e(e.S,"Math",{scale:t(64)})},{33:33,64:64}],287:[function(t,n,r){var e=t(33);e(e.S,"Math",{signbit:function(t){return(t=+t)!=t?t:0==t?1/t==1/0:t>0}})},{33:33}],288:[function(t,n,r){var e=t(33);e(e.S,"Math",{umulh:function(t,n){var r=65535,e=+t,i=+n,o=e&r,u=i&r,c=e>>>16,f=i>>>16,a=(c*u>>>0)+(o*u>>>16);return c*f+(a>>>16)+((o*f>>>0)+(a&r)>>>16)}})},{33:33}],289:[function(t,n,r){"use strict";var e=t(33),i=t(119),o=t(3),u=t(72);t(29)&&e(e.P+t(74),"Object",{__defineGetter__:function(t,n){u.f(i(this),t,{get:o(n),enumerable:!0,configurable:!0})}})},{119:119,29:29,3:3,33:33,72:72,74:74}],290:[function(t,n,r){"use strict";var e=t(33),i=t(119),o=t(3),u=t(72);t(29)&&e(e.P+t(74),"Object",{__defineSetter__:function(t,n){u.f(i(this),t,{set:o(n),enumerable:!0,configurable:!0})}})},{119:119,29:29,3:3,33:33,72:72,74:74}],291:[function(t,n,r){var e=t(33),i=t(84)(!0);e(e.S,"Object",{entries:function(t){return i(t)}})},{33:33,84:84}],292:[function(t,n,r){var e=t(33),i=t(85),o=t(117),u=t(75),c=t(24);e(e.S,"Object",{getOwnPropertyDescriptors:function(t){for(var n,r,e=o(t),f=u.f,a=i(e),s={},l=0;a.length>l;)r=f(e,n=a[l++]),void 0!==r&&c(s,n,r);return s}})},{117:117,24:24,33:33,75:75,85:85}],293:[function(t,n,r){"use strict";var e=t(33),i=t(119),o=t(120),u=t(79),c=t(75).f;t(29)&&e(e.P+t(74),"Object",{__lookupGetter__:function(t){var n,r=i(this),e=o(t,!0);do if(n=c(r,e))return n.get;while(r=u(r))}})},{119:119,120:120,29:29,33:33,74:74,75:75,79:79}],294:[function(t,n,r){"use strict";var e=t(33),i=t(119),o=t(120),u=t(79),c=t(75).f;t(29)&&e(e.P+t(74),"Object",{__lookupSetter__:function(t){var n,r=i(this),e=o(t,!0);do if(n=c(r,e))return n.set;while(r=u(r))}})},{119:119,120:120,29:29,33:33,74:74,75:75,79:79}],295:[function(t,n,r){var e=t(33),i=t(84)(!1);e(e.S,"Object",{values:function(t){return i(t)}})},{33:33,84:84}],296:[function(t,n,r){"use strict";var e=t(33),i=t(40),o=t(23),u=t(68)(),c=t(128)("observable"),f=t(3),a=t(7),s=t(6),l=t(93),h=t(42),v=t(39),p=v.RETURN,d=function(t){return null==t?void 0:f(t)},g=function(t){var n=t._c;n&&(t._c=void 0,n())},y=function(t){return void 0===t._o},m=function(t){y(t)||(t._o=void 0,g(t))},b=function(t,n){a(t),this._c=void 0,this._o=t,t=new w(this);try{var r=n(t),e=r;null!=r&&("function"==typeof r.unsubscribe?r=function(){e.unsubscribe()}:f(r),this._c=r)}catch(i){return void t.error(i)}y(this)&&g(this)};b.prototype=l({},{unsubscribe:function(){m(this)}});var w=function(t){this._s=t};w.prototype=l({},{next:function(t){var n=this._s;if(!y(n)){var r=n._o;try{var e=d(r.next);if(e)return e.call(r,t)}catch(i){try{m(n)}finally{throw i}}}},error:function(t){var n=this._s;if(y(n))throw t;var r=n._o;n._o=void 0;try{var e=d(r.error);if(!e)throw t;t=e.call(r,t)}catch(i){try{g(n)}finally{throw i}}return g(n),t},complete:function(t){var n=this._s;if(!y(n)){var r=n._o;n._o=void 0;try{var e=d(r.complete);t=e?e.call(r,t):void 0}catch(i){try{g(n)}finally{throw i}}return g(n),t}}});var S=function(t){s(this,S,"Observable","_f")._f=f(t)};l(S.prototype,{subscribe:function(t){return new b(t,this._f)},forEach:function(t){var n=this;return new(o.Promise||i.Promise)(function(r,e){f(t);var i=n.subscribe({next:function(n){try{return t(n)}catch(r){e(r),i.unsubscribe()}},error:e,complete:r})})}}),l(S,{from:function(t){var n="function"==typeof this?this:S,r=d(a(t)[c]);if(r){var e=a(r.call(t));return e.constructor===n?e:new n(function(t){return e.subscribe(t)})}return new n(function(n){var r=!1;return u(function(){if(!r){try{if(v(t,!1,function(t){if(n.next(t),r)return p})===p)return}catch(e){if(r)throw e;return void n.error(e)}n.complete()}}),function(){r=!0}})},of:function(){for(var t=0,n=arguments.length,r=Array(n);t<n;)r[t]=arguments[t++];return new("function"==typeof this?this:S)(function(t){var n=!1;return u(function(){if(!n){for(var e=0;e<r.length;++e)if(t.next(r[e]),n)return;t.complete()}}),function(){n=!0}})}}),h(S.prototype,c,function(){return this}),e(e.G,{Observable:S}),t(100)("Observable")},{100:100,128:128,23:23,3:3,33:33,39:39,40:40,42:42,6:6,68:68,7:7,93:93}],297:[function(t,n,r){"use strict";var e=t(33),i=t(23),o=t(40),u=t(104),c=t(91);e(e.P+e.R,"Promise",{"finally":function(t){var n=u(this,i.Promise||o.Promise),r="function"==typeof t;return this.then(r?function(r){return c(n,t()).then(function(){return r})}:t,r?function(r){return c(n,t()).then(function(){throw r})}:t)}})},{104:104,23:23,33:33,40:40,91:91}],298:[function(t,n,r){"use strict";var e=t(33),i=t(69),o=t(90);e(e.S,"Promise",{"try":function(t){var n=i.f(this),r=o(t);return(r.e?n.reject:n.resolve)(r.v),n.promise}})},{33:33,69:69,90:90}],299:[function(t,n,r){var e=t(67),i=t(7),o=e.key,u=e.set;e.exp({defineMetadata:function(t,n,r,e){u(t,n,i(r),o(e))}})},{67:67,7:7}],300:[function(t,n,r){var e=t(67),i=t(7),o=e.key,u=e.map,c=e.store;e.exp({deleteMetadata:function(t,n){var r=arguments.length<3?void 0:o(arguments[2]),e=u(i(n),r,!1);if(void 0===e||!e["delete"](t))return!1;if(e.size)return!0;var f=c.get(n);return f["delete"](r),!!f.size||c["delete"](n)}})},{67:67,7:7}],301:[function(t,n,r){var e=t(231),i=t(10),o=t(67),u=t(7),c=t(79),f=o.keys,a=o.key,s=function(t,n){var r=f(t,n),o=c(t);if(null===o)return r;var u=s(o,n);return u.length?r.length?i(new e(r.concat(u))):u:r};o.exp({getMetadataKeys:function(t){return s(u(t),arguments.length<2?void 0:a(arguments[1]))}})},{10:10,231:231,67:67,7:7,79:79}],302:[function(t,n,r){var e=t(67),i=t(7),o=t(79),u=e.has,c=e.get,f=e.key,a=function(t,n,r){var e=u(t,n,r);if(e)return c(t,n,r);var i=o(n);return null!==i?a(t,i,r):void 0};e.exp({getMetadata:function(t,n){return a(t,i(n),arguments.length<3?void 0:f(arguments[2]))}})},{67:67,7:7,79:79}],303:[function(t,n,r){var e=t(67),i=t(7),o=e.keys,u=e.key;e.exp({getOwnMetadataKeys:function(t){return o(i(t),arguments.length<2?void 0:u(arguments[1]))}})},{67:67,7:7}],304:[function(t,n,r){var e=t(67),i=t(7),o=e.get,u=e.key;e.exp({getOwnMetadata:function(t,n){return o(t,i(n),arguments.length<3?void 0:u(arguments[2]))}})},{67:67,7:7}],305:[function(t,n,r){var e=t(67),i=t(7),o=t(79),u=e.has,c=e.key,f=function(t,n,r){var e=u(t,n,r);if(e)return!0;var i=o(n);return null!==i&&f(t,i,r)};e.exp({hasMetadata:function(t,n){return f(t,i(n),arguments.length<3?void 0:c(arguments[2]))}})},{67:67,7:7,79:79}],306:[function(t,n,r){var e=t(67),i=t(7),o=e.has,u=e.key;e.exp({hasOwnMetadata:function(t,n){return o(t,i(n),arguments.length<3?void 0:u(arguments[2]))}})},{67:67,7:7}],307:[function(t,n,r){var e=t(67),i=t(7),o=t(3),u=e.key,c=e.set;e.exp({metadata:function(t,n){return function(r,e){c(t,n,(void 0!==e?i:o)(r),u(e))}}})},{3:3,67:67,7:7}],308:[function(t,n,r){t(97)("Set")},{97:97}],309:[function(t,n,r){t(98)("Set")},{98:98}],310:[function(t,n,r){var e=t(33);e(e.P+e.R,"Set",{toJSON:t(20)("Set")})},{20:20,33:33}],311:[function(t,n,r){"use strict";var e=t(33),i=t(106)(!0);e(e.P,"String",{at:function(t){return i(this,t)}})},{106:106,33:33}],312:[function(t,n,r){"use strict";var e=t(33),i=t(28),o=t(118),u=t(52),c=t(37),f=RegExp.prototype,a=function(t,n){this._r=t,this._s=n};t(54)(a,"RegExp String",function(){var t=this._r.exec(this._s);return{value:t,done:null===t}}),e(e.P,"String",{matchAll:function(t){if(i(this),!u(t))throw TypeError(t+" is not a regexp!");var n=String(this),r="flags"in f?String(t.flags):c.call(t),e=new RegExp(t.source,~r.indexOf("g")?r:"g"+r);return e.lastIndex=o(t.lastIndex),new a(e,n)}})},{118:118,28:28,33:33,37:37,52:52,54:54}],313:[function(t,n,r){"use strict";var e=t(33),i=t(109);e(e.P,"String",{padEnd:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},{109:109,33:33}],314:[function(t,n,r){"use strict";var e=t(33),i=t(109);e(e.P,"String",{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},{109:109,33:33}],315:[function(t,n,r){"use strict";t(111)("trimLeft",function(t){return function(){return t(this,1)}},"trimStart")},{111:111}],316:[function(t,n,r){"use strict";t(111)("trimRight",function(t){return function(){return t(this,2)}},"trimEnd")},{111:111}],317:[function(t,n,r){t(126)("asyncIterator")},{126:126}],318:[function(t,n,r){t(126)("observable")},{126:126}],319:[function(t,n,r){var e=t(33);e(e.S,"System",{global:t(40)})},{33:33,40:40}],320:[function(t,n,r){t(97)("WeakMap")},{97:97}],321:[function(t,n,r){t(98)("WeakMap")},{98:98}],322:[function(t,n,r){t(97)("WeakSet")},{97:97}],323:[function(t,n,r){t(98)("WeakSet")},{98:98}],324:[function(t,n,r){for(var e=t(141),i=t(81),o=t(94),u=t(40),c=t(42),f=t(58),a=t(128),s=a("iterator"),l=a("toStringTag"),h=f.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(v),d=0;d<p.length;d++){var g,y=p[d],m=v[y],b=u[y],w=b&&b.prototype;if(w&&(w[s]||c(w,s,h),w[l]||c(w,l,y),f[y]=h,m))for(g in e)w[g]||o(w,g,e[g],!0)}},{128:128,141:141,40:40,42:42,58:58,81:81,94:94}],325:[function(t,n,r){var e=t(33),i=t(113);e(e.G+e.B,{setImmediate:i.set,clearImmediate:i.clear})},{113:113,33:33}],326:[function(t,n,r){var e=t(40),i=t(33),o=t(46),u=t(88),c=e.navigator,f=!!c&&/MSIE .\./.test(c.userAgent),a=function(t){return f?function(n,r){return t(o(u,[].slice.call(arguments,2),"function"==typeof n?n:Function(n)),r)}:t};i(i.G+i.B+i.F*f,{setTimeout:a(e.setTimeout),setInterval:a(e.setInterval)})},{33:33,40:40,46:46,88:88}],327:[function(t,n,r){t(254),t(191),t(193),t(192),t(195),t(197),t(202),t(196),t(194),t(204),t(203),t(199),t(200),t(198),t(190),t(201),t(205),t(206),t(157),t(159),t(158),t(208),t(207),t(178),t(188),t(189),t(179),t(180),t(181),t(182),t(183),t(184),t(185),t(186),t(187),t(161),t(162),t(163),t(164),t(165),t(166),t(167),t(168),t(169),t(170),t(171),t(172),t(173),t(174),t(175),t(176),t(177),t(241),t(246),t(253),t(244),t(236),t(237),t(242),t(247),t(249),t(232),t(233),t(234),t(235),t(238),t(239),t(240),t(243),t(245),t(248),t(250),t(251),t(252),t(152),t(154),t(153),t(156),t(155),t(140),t(138),t(145),t(142),t(148),t(150),t(137),t(144),t(134),t(149),t(132),t(147),t(146),t(139),t(143),t(131),t(133),t(136),t(135),t(151),t(141),t(224),t(230),t(225),t(226),t(227),t(228),t(229),t(209),t(160),t(231),t(266),t(267),t(255),t(256),t(261),t(264),t(265),t(259),t(262),t(260),t(263),t(257),t(258),t(210),t(211),t(212),t(213),t(214),t(217),t(215),t(216),t(218),t(219),t(220),t(221),t(223),t(222),t(270),t(268),t(269),t(311),t(314),t(313),t(315),t(316),t(312),t(317),t(318),t(292),t(295),t(291),t(289),t(290),t(293),t(294),t(276),t(310),t(275),t(309),t(321),t(323),t(274),t(308),t(320),t(322),t(273),t(319),t(272),t(277),t(278),t(279),t(280),t(281),t(283),t(282),t(284),t(285),t(286),t(288),t(287),t(297),t(298),t(299),t(300),t(302),t(301),t(304),t(303),t(305),t(306),t(307),t(271),t(296),t(326),t(325),t(324),n.exports=t(23)},{131:131,132:132,133:133,134:134,135:135,136:136,137:137,138:138,139:139,140:140,141:141,142:142,143:143,144:144,145:145,146:146,147:147,148:148,149:149,150:150,151:151,152:152,153:153,154:154,155:155,156:156,157:157,158:158,159:159,160:160,161:161,162:162,163:163,164:164,165:165,166:166,167:167,168:168,169:169,170:170,171:171,172:172,173:173,174:174,175:175,176:176,177:177,178:178,179:179,180:180,181:181,182:182,183:183,184:184,185:185,186:186,187:187,188:188,189:189,190:190,191:191,192:192,193:193,194:194,195:195,196:196,197:197,198:198,199:199,200:200,201:201,202:202,203:203,204:204,205:205,206:206,207:207,208:208,209:209,210:210,211:211,212:212,213:213,214:214,215:215,216:216,217:217,218:218,219:219,220:220,221:221,222:222,223:223,224:224,225:225,226:226,227:227,228:228,229:229,23:23,230:230,231:231,232:232,233:233,234:234,235:235,236:236,237:237,238:238,239:239,240:240,241:241,242:242,243:243,244:244,245:245,246:246,247:247,248:248,249:249,250:250,251:251,252:252,253:253,254:254,255:255,256:256,257:257,258:258,259:259,260:260,261:261,262:262,263:263,264:264,265:265,266:266,267:267,268:268,269:269,270:270,271:271,272:272,273:273,274:274,275:275,276:276,277:277,278:278,279:279,280:280,281:281,282:282,283:283,284:284,285:285,286:286,287:287,288:288,289:289,290:290,291:291,292:292,293:293,294:294,295:295,296:296,297:297,298:298,299:299,300:300,301:301,302:302,303:303,304:304,305:305,306:306,307:307,308:308,309:309,310:310,311:311,312:312,313:313,314:314,315:315,316:316,317:317,318:318,319:319,320:320,321:321,322:322,323:323,324:324,325:325,326:326}],328:[function(t,n,r){(function(t){!function(t){"use strict";function r(t,n,r,e){var o=n&&n.prototype instanceof i?n:i,u=Object.create(o.prototype),c=new v(e||[]);return u._invoke=a(t,r,c),u}function e(t,n,r){try{return{type:"normal",arg:t.call(n,r)}}catch(e){return{type:"throw",arg:e}}}function i(){}function o(){}function u(){}function c(t){["next","throw","return"].forEach(function(n){t[n]=function(t){return this._invoke(n,t)}})}function f(n){function r(t,i,o,u){var c=e(n[t],n,i);if("throw"!==c.type){var f=c.arg,a=f.value;return a&&"object"==typeof a&&m.call(a,"__await")?Promise.resolve(a.__await).then(function(t){r("next",t,o,u)},function(t){r("throw",t,o,u)}):Promise.resolve(a).then(function(t){f.value=t,o(f)},u)}u(c.arg)}function i(t,n){function e(){return new Promise(function(e,i){r(t,n,e,i)})}return o=o?o.then(e,e):e()}"object"==typeof t.process&&t.process.domain&&(r=t.process.domain.bind(r));var o;this._invoke=i}function a(t,n,r){var i=O;return function(o,u){if(i===P)throw new Error("Generator is already running");if(i===F){if("throw"===o)throw u;return d()}for(r.method=o,r.arg=u;;){var c=r.delegate;if(c){var f=s(c,r);if(f){if(f===A)continue;return f}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(i===O)throw i=F,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);i=P;var a=e(t,n,r);if("normal"===a.type){if(i=r.done?F:M,a.arg===A)continue;return{value:a.arg,done:r.done}}"throw"===a.type&&(i=F,r.method="throw",r.arg=a.arg)}}}function s(t,n){var r=t.iterator[n.method];if(r===g){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=g,s(t,n),"throw"===n.method))return A;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return A}var i=e(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,A;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=g),n.delegate=null,A):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,A)}function l(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function h(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function v(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(l,this),this.reset(!0)}function p(t){if(t){var n=t[w];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,e=function i(){for(;++r<t.length;)if(m.call(t,r))return i.value=t[r],i.done=!1,i;return i.value=g,i.done=!0,i};return e.next=e}}return{next:d}}function d(){return{value:g,done:!0}}var g,y=Object.prototype,m=y.hasOwnProperty,b="function"==typeof Symbol?Symbol:{},w=b.iterator||"@@iterator",S=b.asyncIterator||"@@asyncIterator",x=b.toStringTag||"@@toStringTag",_="object"==typeof n,E=t.regeneratorRuntime;
	if(E)return void(_&&(n.exports=E));E=t.regeneratorRuntime=_?n.exports:{},E.wrap=r;var O="suspendedStart",M="suspendedYield",P="executing",F="completed",A={},j={};j[w]=function(){return this};var N=Object.getPrototypeOf,I=N&&N(N(p([])));I&&I!==y&&m.call(I,w)&&(j=I);var T=u.prototype=i.prototype=Object.create(j);o.prototype=T.constructor=u,u.constructor=o,u[x]=o.displayName="GeneratorFunction",E.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===o||"GeneratorFunction"===(n.displayName||n.name))},E.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,u):(t.__proto__=u,x in t||(t[x]="GeneratorFunction")),t.prototype=Object.create(T),t},E.awrap=function(t){return{__await:t}},c(f.prototype),f.prototype[S]=function(){return this},E.AsyncIterator=f,E.async=function(t,n,e,i){var o=new f(r(t,n,e,i));return E.isGeneratorFunction(n)?o:o.next().then(function(t){return t.done?t.value:o.next()})},c(T),T[x]="Generator",T[w]=function(){return this},T.toString=function(){return"[object Generator]"},E.keys=function(t){var n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},E.values=p,v.prototype={constructor:v,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=g,this.done=!1,this.delegate=null,this.method="next",this.arg=g,this.tryEntries.forEach(h),!t)for(var n in this)"t"===n.charAt(0)&&m.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=g)},stop:function(){this.done=!0;var t=this.tryEntries[0],n=t.completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(t){function n(n,e){return o.type="throw",o.arg=t,r.next=n,e&&(r.method="next",r.arg=g),!!e}if(this.done)throw t;for(var r=this,e=this.tryEntries.length-1;e>=0;--e){var i=this.tryEntries[e],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=m.call(i,"catchLoc"),c=m.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,n){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc<=this.prev&&m.call(e,"finallyLoc")&&this.prev<e.finallyLoc){var i=e;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=n,i?(this.method="next",this.next=i.finallyLoc,A):this.complete(o)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),A},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),h(r),A}},"catch":function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc===t){var e=r.completion;if("throw"===e.type){var i=e.arg;h(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:p(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=g),A}}}("object"==typeof t?t:"object"==typeof window?window:"object"==typeof self?self:this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);

!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("matter-js"),require("matter-tools")):"function"==typeof define&&define.amd?define(["matter-js","matter-tools"],n):"object"==typeof exports?exports.Demo=n(require("matter-js"),require("matter-tools")):(e.MatterTools=e.MatterTools||{},e.MatterTools.Demo=n(e.Matter,e.MatterTools))}(this,function(e,n){return function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="/demo/lib",n(0)}([function(e,n,t){"use strict";var o=t(1),r=o.Common,i=e.exports={},a=t(2).Gui,s=t(2).Inspector,l=t(3);i._isIOS=window.navigator&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,i._matterLink="http://brm.io/matter-js/",i.create=function(e){var n=Object.assign({example:{instance:null},examples:[],resetOnOrientation:!1,preventZoom:!1,inline:!1,startExample:!0,appendTo:document.body,toolbar:{title:null,url:null,reset:!0,source:!1,inspector:!1,tools:!1,fullscreen:!0,exampleSelect:!1},tools:{inspector:null,gui:null},dom:{}},e||{});return n.examples.length>1&&e.toolbar.exampleSelect!==!1&&(n.toolbar.exampleSelect=!0),i._isIOS&&(n.toolbar.fullscreen=!1),a||(n.toolbar.tools=!1,n.tools.gui=!1),s||(n.toolbar.inspector=!1,n.tools.inspector=!1),n.dom=i._createDom(n),i._bindDom(n),n.inline&&n.dom.root.classList.add("cm-d-c-inline"),n.appendTo&&n.appendTo.appendChild(n.dom.root),n.startExample&&i.start(n,n.startExample),n},i.start=function(e,n){n="string"==typeof n?n:e.examples[0].id,window.location.hash.length>0&&(n=window.location.hash.slice(1)),i.setExampleById(e,n)},i.stop=function(e){e.example&&e.example.instance&&e.example.instance.stop()},i.reset=function(e){r._nextId=0,r._seed=0,i.setExample(e,e.example)},i.setExampleById=function(e,n){var t=e.examples.filter(function(e){return e.id===n})[0];i.setExample(e,t)},i.setExample=function(e,n){if(n){var t=e.example.instance;t&&(t.stop(),t.canvas&&t.canvas.parentElement.removeChild(t.canvas)),window.location.hash=n.id,e.example.instance=null,e.example=n,e.example.instance=t=n.init(e),!t.canvas&&t.render&&(t.canvas=t.render.canvas),t.canvas&&e.dom.root.appendChild(t.canvas),e.dom.exampleSelect.value=n.id,e.dom.buttonSource.href=n.sourceLink||e.url||"#",setTimeout(function(){e.tools.inspector&&i.setInspector(e,!0),e.tools.gui&&i.setGui(e,!0)},500)}else i.setExample(e,e.examples[0])},i.setInspector=function(e,n){if(!n)return i._destroyTools(e,!0,!1),void e.dom.root.classList.toggle("matter-inspect-active",!1);var t=e.example.instance;i._destroyTools(e,!0,!1),e.dom.root.classList.toggle("matter-inspect-active",!0),e.tools.inspector=s.create(t.engine,t.render)},i.setGui=function(e,n){if(!n)return i._destroyTools(e,!1,!0),void e.dom.root.classList.toggle("matter-gui-active",!1);var t=e.example.instance;i._destroyTools(e,!1,!0),e.dom.root.classList.toggle("matter-gui-active",!0),e.tools.gui=a.create(t.engine,t.runner,t.render)},i._destroyTools=function(e,n,t){var o=e.tools.inspector,r=e.tools.gui;n&&o&&o!==!0&&(s.destroy(o),e.tools.inspector=null),t&&r&&r!==!0&&(a.destroy(r),e.tools.gui=null)},i._toggleFullscreen=function(e){var n=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement;n?document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen():(n=e.dom.root,n.requestFullscreen?n.requestFullscreen():n.mozRequestFullScreen?n.mozRequestFullScreen():n.webkitRequestFullscreen&&n.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT))},i._bindDom=function(e){var n=e.dom;if(window.addEventListener("orientationchange",function(){setTimeout(function(){e.resetOnOrientation&&i.reset(e)},300)}),e.preventZoom){document.body.addEventListener("gesturestart",function(e){e.preventDefault()});var t,o=!0;document.body.addEventListener("touchstart",function(e){o||e.preventDefault(),o=!1,clearTimeout(t),t=setTimeout(function(){o=!0},500)})}if(n.exampleSelect&&n.exampleSelect.addEventListener("change",function(){var n=this.options[this.selectedIndex].value;i.setExampleById(e,n)}),n.buttonReset&&n.buttonReset.addEventListener("click",function(){i.reset(e)}),n.buttonInspect&&n.buttonInspect.addEventListener("click",function(){var n=!e.tools.inspector;i.setInspector(e,n)}),n.buttonTools&&n.buttonTools.addEventListener("click",function(){var n=!e.tools.gui;i.setGui(e,n)}),n.buttonFullscreen){n.buttonFullscreen.addEventListener("click",function(){i._toggleFullscreen(e)});var r=function(){var n=document.fullscreen||document.webkitIsFullScreen||document.mozFullScreen;document.body.classList.toggle("matter-is-fullscreen",n),setTimeout(function(){i.setExample(e,e.example)},500)};document.addEventListener("webkitfullscreenchange",r),document.addEventListener("mozfullscreenchange",r),document.addEventListener("fullscreenchange",r)}},i._createDom=function(e){var n=t(4);l.injectStyles(n,"cm-d-c-style");var o=document.createElement("div"),r=e.examples.map(function(e){return'<option value="'+e.id+'">'+e.name+"</option>"}).join(" "),a=e.preventZoom&&i._isIOS?"prevent-zoom-ios":"";o.innerHTML='<div id="cm-d-c" class="cm-d-c '+e.toolbar.title+" "+a+'">       <div class="cm-d-c-header-outer">         <header class="cm-d-c-header">           <div class="cm-d-c-header-inner">             <h1 class="cm-d-c-title">               <a href="'+e.toolbar.url+'" target="_blank">               '+e.toolbar.title+'                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M0 0h24v24H0z" fill="none"/>                   <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>                 </svg>               </a>             </h1>       <div class="cm-cm-d-c-toolbar">               <div class="matter-select-wrapper">                 <select class="matter-example-select matter-select">                   '+r+'                 </select>                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M7 10l5 5 5-5z"/>                   <path d="M0 0h24v24H0z" fill="none"/>                 </svg>               </div>               <button class="matter-btn matter-btn-reset" title="Reset">                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>                   <path d="M0 0h24v24H0z" fill="none"/>                 </svg>               </button>               <a href="#" class="matter-btn matter-btn-source" title="Source" target="_blank">{ }</a>               <button class="matter-btn matter-btn-tools" title="Tools">                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>                   <path d="M0 0h24v24H0z" fill="none"/>                 </svg>               </button>               <button class="matter-btn matter-btn-inspect" title="Inspect">               <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                 <path d="M0 0h24v24H0z" fill="none"/>                 <path d="M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zm7.32.19C16.84 3.05 15.01 2.25 13 2.05v2.02c1.46.18 2.79.76 3.9 1.62l1.42-1.43zM19.93 11h2.02c-.2-2.01-1-3.84-2.21-5.32L18.31 7.1c.86 1.11 1.44 2.44 1.62 3.9zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zM15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm3.31 4.9l1.43 1.43c1.21-1.48 2.01-3.32 2.21-5.32h-2.02c-.18 1.45-.76 2.78-1.62 3.89zM13 19.93v2.02c2.01-.2 3.84-1 5.32-2.21l-1.43-1.43c-1.1.86-2.43 1.44-3.89 1.62zm-7.32-.19C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43z"/>               </svg>               </button>               <button class="matter-btn matter-btn-fullscreen" title="Fullscreen">                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M0 0h24v24H0z" fill="none"/>                   <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>                 </svg>               </button>             </div>             <a class="cm-cm-d-c-link">     </a> <a class="cm-d-c-close"></a>           </div>         </header>       </div>  </div>';var s={root:o.firstElementChild,title:o.querySelector(".cm-d-c-title"),header:o.querySelector(".cm-d-c-header"),exampleSelect:o.querySelector(".matter-example-select"),buttonReset:o.querySelector(".matter-btn-reset"),buttonSource:o.querySelector(".matter-btn-source"),buttonTools:o.querySelector(".matter-btn-tools"),buttonInspect:o.querySelector(".matter-btn-inspect"),buttonFullscreen:o.querySelector(".matter-btn-fullscreen")};return e.toolbar.title||l.domRemove(s.title),e.toolbar.exampleSelect||l.domRemove(s.exampleSelect.parentElement),e.toolbar.reset||l.domRemove(s.buttonReset),e.toolbar.source||l.domRemove(s.buttonSource),e.toolbar.inspector||l.domRemove(s.buttonInspect),e.toolbar.tools||l.domRemove(s.buttonTools),e.toolbar.fullscreen||l.domRemove(s.buttonFullscreen),s}},function(n,t){n.exports=e},function(e,t){e.exports=n},function(e,n){"use strict";var t=e.exports={};t.injectStyles=function(e,n){if(!document.getElementById(n)){var o=document.createElement("div");o.innerHTML='<style id="'+n+'" type="text/css">'+e+"</style>";var r=document.head.querySelector("style:last-of-type");r?t.domInsertBefore(o.firstElementChild,r):document.head.appendChild(o.firstElementChild)}},t.injectScript=function(e,n,t){if(!document.getElementById(n)){var o=document.createElement("script");o.id=n,o.src=e,o.onload=t,document.body.appendChild(o)}},t.domRemove=function(e){return e.parentElement.removeChild(e)},t.domInsertBefore=function(e,n){return n.parentNode.insertBefore(e,n.previousElementSibling)}},function(e,n){e.exports="/*\n*\tMatterTools.Demo\n*/\n\n.cm-d-c {\ntop:0px;bottom:0px;left:0;right:0;margin:0 auto;\nposition: fixed;\nz-index:2;\nwidth: 1180px;\nheight: 100%;\n font-family: Helvetica, Arial, sans-serif;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n}\n\n.cm-d-c canvas {\n  border-radius: 8px;\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.cm-d-c.cm-d-c-inline canvas {\n  max-height: calc(100% - 50px);\n}\n\n@media screen and (min-width: 900px) and (min-height: 600px) {\n  .cm-d-c.cm-d-c-inline canvas {\n    max-height: calc(100% - 100px);\n  }\n}\n\n.matter-is-fullscreen .cm-d-c {\n  width: 100%;\n}\n\n.matter-is-fullscreen .dg.ac,\n.matter-is-fullscreen .ins-container {\n  display: none;\n}\n\n.start-btn {display: none;cursor:pointer;margin: auto;z-index: 9999; position: fixed;right:-15px;padding: 50px 0 0 0;text-align: center;} .cm-d-c-header-outer {\ndisplay:none;  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.2);\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-transition: background 400ms ease;\n  -o-transition: background 400ms ease;\n  transition: background 400ms ease;\n}\n\n.cm-d-c-header-outer:hover {\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.cm-d-c-inline .cm-d-c-header-outer {\n  position: static;\n  background: transparent;\n  z-index: 0;\n  width: 100%;\n}\n\n.cm-d-c-header {\n  width: 100%;\n  padding: 7px 20px 8px 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.cm-d-c-inline .cm-d-c-header {\n  padding: 10px;\n}\n\nbody .ins-container,\nbody .dg .dg.main,\nbody .dg .dg.main.a {\n  padding-top: 52px;\n}\n\n@media screen and (min-width: 500px) {\n  .cm-d-c-inline .cm-d-c-header {\n    padding: 10px 30px 16px 30px;\n  }\n}\n\n@media screen and (min-width: 900px) and (min-height: 600px) {\n  .cm-d-c-inline .cm-d-c-header {\n    padding: 10px 30px 36px 30px;\n  }\n}\n\n.cm-d-c-header-inner {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  max-width: 960px;\n  width: 30%;\n}\n\n.cm-d-c-header h1 {\n  display: none;\n  margin: 0;\n  width: 18px;\n  overflow: hidden;\n}\n\n.cm-d-c-header h1 a {\n position: relative;right: 300px; color: #f2f2f5;\n  font-size: 15px;\n  font-weight: 400;\n  font-family: Helvetica, Arial, sans-serif;\n  display: block;\n  text-decoration: none;\n  padding: 8px 0 3px 0;\n  border-bottom: 2px solid transparent;\n  white-space: nowrap;\n  float: right;\n}\n\n@media screen and (min-width: 300px) {\n  .cm-d-c-header h1 {\n    display: inline;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .cm-d-c-header h1 {\n    width: auto;\n    overflow: visible;\n  }\n}\n\n.btn-home {\n  display: none;\n}\n\n.cm-d-c-title svg {\n  fill: #fff;\n  width: 16px;\n  height: 16px;\n  margin: 0px 0 -2px 4px;\n}\n\n.cm-d-c-close {left: 430px;position: relative; background: url('//act.cmcmcdn.com/upload/201710/fc2680a1c7df924e2a0e3259fecbc95b.png') no-repeat; width: 30px;height:30px;cursor: pointer;} .cm-d-c-header h1 a:hover {\n  border-bottom: 2px solid #298eff;\n}\n\n.cm-d-c-link {\n  font-family: Helvetica, Arial, sans-serif;\n  text-decoration: none;\n  line-height: 13px;\n  margin: 0 -10px 0 0;\n}\n\n.matter-logo {\n  height: 33px;\n  width: 52px;\n}\n\n.matter-logo #m-triangle {\n  -webkit-transform-origin: 14px 856px;\n      -ms-transform-origin: 14px 856px;\n          transform-origin: 14px 856px;\n  -webkit-transition: -webkit-transform 400ms ease;\n  transition: -webkit-transform 400ms ease;\n  -o-transition: transform 400ms ease;\n  transition: transform 400ms ease;\n  transition: transform 400ms ease, -webkit-transform 400ms ease;\n}\n\n.matter-logo:hover #m-triangle {\n  -webkit-transform: rotate(-30deg) translate(-98px, -25px);\n      -ms-transform: rotate(-30deg) translate(-98px, -25px);\n          transform: rotate(-30deg) translate(-98px, -25px);\n}\n\n.matter-logo #m-circle {\n  -webkit-transition: -webkit-transform 200ms ease;\n  transition: -webkit-transform 200ms ease;\n  -o-transition: transform 200ms ease;\n  transition: transform 200ms ease;\n  transition: transform 200ms ease, -webkit-transform 200ms ease;\n  -webkit-transition-delay: 300ms;\n       -o-transition-delay: 300ms;\n          transition-delay: 300ms;\n}\n\n.matter-logo #m-square {\n  -webkit-transition: -webkit-transform 150ms ease;\n  transition: -webkit-transform 150ms ease;\n  -o-transition: transform 150ms ease;\n  transition: transform 150ms ease;\n  transition: transform 150ms ease, -webkit-transform 150ms ease;\n  -webkit-transition-delay: 400ms;\n       -o-transition-delay: 400ms;\n          transition-delay: 400ms;\n}\n\n.matter-logo:hover #m-circle {\n  -webkit-transform: translate(18px, -33px);\n      -ms-transform: translate(18px, -33px);\n          transform: translate(18px, -33px);\n}\n\n.matter-logo:hover #m-square {\n  -webkit-transform: translate(47px, -2px);\n      -ms-transform: translate(47px, -2px);\n          transform: translate(47px, -2px);\n}\n\n.cm-d-c-toolbar {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.matter-select {\n  background: transparent;\n  color: #fff;\n  font-size: 15px;\n  height: 30px;\n  width: 100%;\n  outline: none;\n  padding: 0 7px;\n  margin: 0;\n  border: 0;\n  border-radius: 0;\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n}\n\n.prevent-zoom-ios .matter-select {\n  font-size: 16px;\n}\n\n.matter-select-wrapper {\n  width: 20%;\n  min-width: 100px;\n  max-width: 200px;\n  position: relative;\n  display: inline-block;\n  margin: 1px 6% 0 0;\n}\n\n.matter-select-wrapper:hover:after svg {\n  fill: #fff;\n}\n\n.matter-select-wrapper svg {\n  display: block;\n  pointer-events: none;\n  fill: #cecece;\n  width: 22px;\n  height: 22px;\n  position: absolute;\n  top: 4px;\n  right: 5px;\n}\n\n.prevent-zoom-ios .matter-select-wrapper:after {\n  top: 4px;\n}\n\n.matter-btn {\n  font-family: Helvetica, Arial, sans-serif;\n  border: 0;\n  background: rgba(0,0,0,0.1);\n  padding: 2px 0 0 0;\n  width: 40px;\n  height: 33px;\n  border-radius: 2px;\n  display: inline-block;\n  font-size: 16px;\n  line-height: 1;\n  color: #c2cad4;\n  text-decoration: none;\n  text-align: center;\n}\n\n.matter-btn svg {\n  fill: #fff;\n  width: 16px;\n  height: 16px;\n  margin: 2px 0 0 0;\n}\n\n.cm-d-c-inline .matter-btn {\n  background: #0f0f13;\n}\n\n.matter-btn:focus {\n  outline: 0;\n}\n\n.matter-btn:hover {\n  -webkit-transform: translate(0px, -1px);\n      -ms-transform: translate(0px, -1px);\n          transform: translate(0px, -1px);\n}\n\n.matter-btn:active {\n  -webkit-transform: translate(0px, 1px);\n      -ms-transform: translate(0px, 1px);\n          transform: translate(0px, 1px);\n}\n\n.matter-btn:hover {\n  background: #212a3a;\n}\n\n.matter-btn-reset:active svg {\n  fill: #76F09B;\n}\n\n.matter-btn-tools {\n  display: none;\n  font-size: 15px;\n  padding-right: 3px;\n}\n\n.matter-gui-active .matter-btn-tools svg {\n  fill: #F55F5F;\n}\n\n.matter-btn-inspect {\n  display: none;\n}\n\n.matter-inspect-active .matter-btn-inspect svg {\n  fill: #fff036;\n}\n\n.matter-btn-source {\n  display: none;\n  font-size: 12px;\n  text-align: center;\n  line-height: 31px;\n}\n\n.matter-btn-source:active {\n  color: #298eff;\n}\n\n.matter-btn-fullscreen {\n  font-size: 18px;\n}\n\n.matter-btn-source:active svg {\n  fill: #298eff;\n}\n\n.matter-is-fullscreen .matter-btn-tools,\n.matter-is-fullscreen .matter-btn-inspect {\n  display: none;\n}\n\n.matter-is-fullscreen .matter-btn-fullscreen svg {\n  fill: #76F09B;\n}\n\n.ins-container,\nbody .dg {\n  display: none;\n}\n\n@media screen and (min-width: 500px) {\n  .ins-container,\n  body .dg,\n  .matter-btn-tools,\n  .matter-btn-inspect,\n  .matter-btn-source {\n    display: block;\n  }\n}"}])});

var cmdcAlert=function(e){var t={closeAll:!1,content:"",buttons:{}},l=$.extend(t,e),n={},s=$('<div class="simpleAlert">'),i=$('<div class="simpleAlertShelter">'),c=$('<div class="simpleAlertBody">'),o=$('<img class="simpleAlertBodyClose" height="14" width="14"/>'), a=$('<p class="simpleAlertBodyContent">'+l.content+"</p>");return n.init=function(){for(var e=0,t=!1,n=[],o=0;o<2;o++)for(var p in l.buttons)switch(o){case 0:n.push(p);break;case 1:t=n.length<=1,e++;var r=$('<a class="simpleAlertBtn simpleAlertBtn'+e+'">'+"</a>");var f=$('<div class="simpleAlertFlash'+'">'+"</div>");r.bind("click", l.buttons[p]), c.bind("click", l.buttons[p]), c.bind("mouseover mouseout", function(){
	if(event.type === "mouseover"){
		CMDCG.do.disappearSTO && clearTimeout(CMDCG.do.disappearSTO)
	}else if(event.type === "mouseout"){
		CMDCG.do.disappear()
	}
}), f.bind("click", l.buttons[p]), f.bind("mouseover mouseout", function(){
	if(event.type === "mouseover"){
		CMDCG.do.disappearSTO && clearTimeout(CMDCG.do.disappearSTO)
	}else if(event.type === "mouseout"){
		CMDCG.do.disappear()
	}
}), c.append(r)}s.append(i).append(c).append(f),$("body").append(s),c.show().animate({ opacity:"1"}, 350)},o.bind("click",function(){l.closeAll=!1,n.close()}),n.close=function(){l.closeAll?$(".simpleAlert").remove():c.animate({marginTop:"-188px",opacity:"0"},200,function(){$(".simpleAlert").last().remove()})},n.init(),n};


(function(undefined) {
	function cookie(name, value) {
		return name != null ?
			cookie[value === undefined ? "get" : "set"].apply(null, arguments) :
			undefined;
	}
	// 获取cookie
	cookie.get = function(name) {
		var ret, arr,
			i, len;
		if (document.cookie) {
			arr = document.cookie.split("; ");
			for (i = 0, len = arr.length; i < len; i++) {
				if (arr[i].indexOf(name + "=") === 0) {
					ret = decodeURIComponent(arr[i].substr(name.length + 1));
					break;
				}
			}
		}
		return ret;
	};
	// 设置cookie
	cookie.set = function(name, value, options) {
		var arr = [],
			date;
		options = options || {};
		if (!value) {
			value = "";
			options.expires = -1;
		}
		if (typeof options.expires === "number") {
			date = new Date();
			date.setTime(date.getTime() + options.expires * 1000);
		} else if (options.expires instanceof Date) {
			date = options.expires;
		}
		arr.push(name + "=" + encodeURIComponent(value));
		date && arr.push("expires=" + date.toUTCString());
		options.path && arr.push("path=" + options.path);
		options.domain && arr.push("domain=" + options.domain);
		options.secure && arr.push("secure");
		return document.cookie = arr.join("; ");
	};
	cookie.setToday = function(name, value, options) {
		var d = new Date(),
			c = d.getTime();
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		d.setMilliseconds(0);
		if (typeof options !== "object") {
			options = {};
		}
		options.expires = Math.round((86400000 - Math.max(c - d.getTime(), 0)) / 1000);
		this.set(name, value, options);
	};
	window.cmdcCookie = cookie;
})();

(function() {
	var CMDC = {
		sourceLinkRoot: '//localhost:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//10.20.240.179:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//act.cmcmcdn.com/dollcatching/NJS_PRS/output/',
		tmallLink: '//s.click.taobao.com/yxl72Zw',
		dc: {},
		playAgain: false,
		timeout: 1000,
		isIE: (navigator.appName === 'Microsoft Internet Explorer' || !!window.ActiveXObject || "ActiveXObject" in window),
		isInclude: function (name) {
			var js = /js$/i.test(name);
			var es = document.getElementsByTagName(js ? 'script' : 'link');
			for (var i = 0; i < es.length; i++)
				if (es[i][js ? 'src' : 'href'].indexOf(name) !== -1) return true;
			return false;
		},
		loadSource: function () {
			if (CMDC.isInclude('cmdcg.js')) return
			var oHead = document.getElementsByTagName('HEAD').item(0),
				pfScript = document.createElement("script"),
				mScript = document.createElement("script"),
				mgScript = document.createElement("script"),
				mdScript = document.createElement("script"),
				mainScript = document.createElement("script"),
				jquery = document.createElement("script"),
				sourceLinkRoot = CMDC.sourceLinkRoot;

			pfScript.src = sourceLinkRoot + "js/polyfill.js";
			mScript.src = sourceLinkRoot + "js/matter.js";
			mgScript.src = sourceLinkRoot + "js/matter-tools.gui.js";
			mdScript.src = sourceLinkRoot + "js/cmdctool.js";
			mainScript.src = sourceLinkRoot + "js/cmdcg.js";
			jquery.src = sourceLinkRoot + "js/jquery-1.11.0.min.js";

			typeof jQuery === 'undefined' && oHead.appendChild(jquery);
			// oHead.appendChild(pfScript);
			// oHead.appendChild(mScript);
			// setTimeout(function () {
				// oHead.appendChild(mainScript);
				// typeof jQuery === 'undefined' && oHead.appendChild(jquery);
				// oHead.appendChild(mdScript);
				// oHead.appendChild(mgScript); //debug tool
			// }, CMDC.timeout)
		},
		removejscssfile: function (filename, filetype) {
			var targetelement = (filetype === "js") ? "script" : (filetype === "css") ? "link" : "none";
			var targetattr = (filetype === "js") ? "src" : (filetype === "css") ? "href" : "none";
			var allsuspects = document.getElementsByTagName(targetelement);
			for (var i = allsuspects.length; i >= 0; i--) {
				if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) && allsuspects[i].getAttribute(targetattr).indexOf(filename) !== -1) {
					allsuspects[i].parentNode.removeChild(allsuspects[i]);
				}
			}
		},
		clearSource: function () {
			var removejscssfile = CMDC.removejscssfile,
				sourceLinkRoot = CMDC.sourceLinkRoot;
			removejscssfile(sourceLinkRoot + "js/polyfill.js", 'js')
			removejscssfile(sourceLinkRoot + "js/matter.js", 'js')
			removejscssfile(sourceLinkRoot + "js/cmdcg.js", 'js')
			removejscssfile(sourceLinkRoot + "js/cmdci.js", 'js')
			removejscssfile(sourceLinkRoot + "js/cmdctool.js", 'js')
			removejscssfile(sourceLinkRoot + "js/jquery-1.11.0.min.js", 'js')
		},
		Interface: {
			close: function (action, index) {
				try {
					if (action === 'receive') {
						Catcher && Catcher.receive();
					} else {
						Catcher && Catcher.gameOver();
						CMDC.Interface.reportClose(action, index);
					}
				} catch (e) {
					Catcher && Catcher.error()
				}
			},
			ready: function () {
				if (window.requestAnimationFrame) {
					try {
						Catcher && Catcher.ready();
					} catch (e) {
						Catcher && Catcher.error()
						CMDC.Interface.reportClose('error-exit')
						console.log('error',e)
					}
					return true;
				}
				// 浏览器版本过低
				try {
					Catcher && Catcher.notSupport();
				} catch (e) {
					Catcher && Catcher.error()
					CMDC.Interface.reportClose('error-exit')
					console.log('error',e)
				}
				CMDC.Interface.reportShow('not-support');
				return false;
			},
			click: function () {
				try {
					Catcher && Catcher.receive();
				} catch (e) {
					Catcher && Catcher.error()
					CMDC.Interface.reportClose('error-exit')
					console.log('error',e)
				}
			},
			error: function () {
				try {
					Catcher && Catcher.error();
				} catch (e) {
					Catcher && Catcher.error()
					console.log('error',e)
				}
				CMDC.Interface.reportClose('error-exit')
			},
			reportShow: function (action) {
				this.report({
					snode: 1365,
					expand: action
				});
			},
			reportClick: function (action, shuang11) {
				var data = {
					snode: 1163,
					expand: action
				};
				if (shuang11) {
					data.shuang11 = 1;
				}
				this.report(data);
			},
			reportClose: function (action) {
				this.report({
					snode: 10147,
					expand: action
				});
			},
			report: function (obj) {
				var data = {
					node: 1031100
				};
				for (var i in obj) {
					data[i] = obj[i];
				}
				data.w = 'dcgame';
				data.cid = '57068818';
				try {
					Catcher && Catcher.report(data);
				} catch (e) {
					console.log('error', e)
				}
			}
		},
		play: function () {
			var obj = {
				tools: {
					gui: false
				},
				startExample: 'cmdcg',
				examples: [
					{
						name: 'cm-dollcatching-game',
						id: '',
						init: CMDCG && CMDCG.do,
					}
				]
			}
			var dc = CMDC.dc;
			dc = MatterTools.Demo.create(obj);
			document.body.appendChild(dc.dom.root);
			// MatterTools.Demo.start(dc); //start与appendChild功能一样
		},
		buildWalls: function () {
			var sourceLinkRoot = CMDC.sourceLinkRoot
			var resource = {
				botImg: sourceLinkRoot + 'img/control.png',
				botSmallImg: sourceLinkRoot + 'img/control-small.png',
				leftImg: sourceLinkRoot + 'img/hull.png',
				middleImg: sourceLinkRoot + 'img/hull.png',
				bottombakImg: sourceLinkRoot + 'img/allbodies.png',
				closeImg: sourceLinkRoot + 'img/close.png',
				closeSmallImg: sourceLinkRoot + 'img/close-small.png',
				logoImg: sourceLinkRoot + 'img/11logo.png',
				rockerImg: sourceLinkRoot + 'img/rocker.png',
				startBtnImg: sourceLinkRoot + 'img/button.png',
				alertImg: sourceLinkRoot + 'img/alertbkg.png',
				alertbtnImg: sourceLinkRoot + 'img/alertbtn.png',
				alertFlashImg: sourceLinkRoot + 'img/flash.png',
				bothsideBodyImg: sourceLinkRoot + 'img/bothside-bodies-small.png',
				frameImg: sourceLinkRoot + 'img/frame.png',
				numberImg: sourceLinkRoot + 'img/number.png',
			}
			var cmdcObj = {
				botEL: {},
				leftEL: {},
				middleEL: {},
				bottombakEL: {},
				rockerEL: {},
				buttonEL: {},
				numberLEL: {},
				numberREL: {},
				si: {},
				sis: {},
				$: function (className) {
					return document.querySelector(className);
				},
				init: function (resource) {
					cmdcObj.createDom(resource)
				},
				createDom: function (resource) {
					var cssStr = '@-webkit-keyframes move_upper {from {opacity: 0;}to {opacity: 1; -webkit-transform: translateY(-60px);transform: translateY(-60px);}} @keyframes move_upper {from {opacity: 0;}to {opacity: 1; -webkit-transform: translateY(-60px);transform: translateY(-60px); }}' +
						'.move_upper { -webkit-animation-name: move_upper;animation-name: move_upper; -webkit-animation-duration: .7s;animation-duration: .7s; -webkit-animation-iteration-count: 1;animation-iteration-count: 1; -webkit-animation-fill-mode: forwards;animation-fill-mode: forwards;}' +
						'.cm-dc-bottom {min-width:1180px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:28;height:240px;background-repeat: no-repeat;background-position: center top;display:none;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto};}' +
						'.cm-dc-bottom-small {min-width:1180px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:28;height:180px;background-repeat: no-repeat;background-position: center top;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto; background: url("' + resource.botSmallImg + '")}' +
						'.cm-dc-both-side-body {width:1400px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:2;height:275px;background-position: center top;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto; background: url("' + resource.bothsideBodyImg + '") no-repeat}' +
						'.cm-dc-left {overflow:hidden;z-index:90;position:fixed;bottom:0;right: 50%;top:0;margin-right:660px;width: 18%;height: 100%;background: #e9445f;}' +
						'.cm-dc-right {overflow:hidden;z-index:90;position:fixed;bottom:0;left: 50%;top:0;margin-left: 660px;width: 18%;height: 100%;background: #e9445f;}' +
						'.cm-dc-middle {z-index:21;position:fixed;margin:auto;top: 0;left: 0;right: 0;bottom: 0;min-width:1180px;background-repeat: no-repeat;background-position: center top;display: none;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-bottom-bak {position: fixed;margin: auto;left: 0;right: 0;bottom:0px;width: 1400px;z-index:5;height:300px;background-repeat: no-repeat;display: none} ' +
						'.cm-dc-close {width: 80px;height: 80px;cursor: pointer;top: 20px; margin: auto;z-index:101;position: fixed; right:28px;background-repeat: no-repeat;} .cm-dc-close:hover {background-position: -80px} .cm-dc-close:active {background-position: -160px}' +
						'.cm-dc-close-small {width: 40px;height: 40px;cursor: pointer;top: 5px; margin: auto;z-index:101;position: fixed; right:5px;background-repeat: no-repeat;} .cm-dc-close-small:hover {background-position: -40px} .cm-dc-close-small:active {background-position: -80px}' +
						'.cm-dc-11logo {margin-left: 5px;cursor:pointer;display: inline-block;width: 100px; height: 100px;background-repeat: no-repeat;}' +
						'.cm-dc-rocker {position:fixed;margin:auto;left:0;right:830px;bottom:-20px;z-index:30;width:160px;height: 270px;background-repeat: no-repeat;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-rocker-small {position:fixed;margin:auto;left:0;right:830px;bottom:-20px;z-index:30;width:80px;height: 148px;background-repeat: no-repeat;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-start-btn {cursor:pointer;position:fixed;margin:auto;left:0;right:0;bottom:7px;z-index:30;width:408px;height: 130px;background-repeat: no-repeat;} .cm-dc-start-btn:hover {background-position: -406px} .cm-dc-start-btn:active {background-position: -810px} ' +
						'.cm-dc-start-small-btn {cursor:pointer;position:fixed;margin:auto;left:0;right:0;bottom: 10px;z-index:30;width:204px;height: 65px;background-repeat: no-repeat;} .cm-dc-start-small-btn:hover {background-position: -203px} .cm-dc-start-small-btn:active {background-position: -405px} ' +
						'.simpleAlert {position: fixed;z-index: 100;}\n' +
						'.simpleAlertShelter {position: fixed;width: 100%;height: 100%;top:0;left:0;background-color: #000;opacity: 0.5;filter:alpha(opacity=50);}\n' +
						'.simpleAlertBody {cursor:pointer;z-index:100;position:fixed;display: none;width:375px;height:348px;top:0;left:0;right:0;bottom:0;margin:auto;opacity:0;background-repeat: no-repeat;background: url("' + resource.alertImg +
						'")}' +
						'.simpleAlertBtn {position:absolute;width: 190px;height:80px;bottom:110px;cursor:pointer;}\n' +
						'.simpleAlertBtn1 {left:26%;bottom:50px;background: url("' + resource.alertbtnImg +
						'") no-repeat} .simpleAlertBtn1:hover {background-position: -192px} .simpleAlertBtn1:active {background-position: -384px}' +
						'@-webkit-keyframes rotates{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}\n' +
						'@-ms-keyframes rotates{from{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(360deg)}}\n' +
						'@-moz-keyframes rotates{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}\n' +
						'@-o-keyframes rotates{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(360deg)}}' +
						'.simpleAlertFlash {cursor:pointer;z-index:99;position: fixed;margin: auto;top: 0;left: 0;right: 0;bottom: 0;width: 600px;height: 600px;background-repeat: no-repeat;animation: rotates 15s linear infinite;-moz-animation: rotates 15s linear infinite; -webkit-animation: rotates 15s linear infinite;-ms-animation: rotates 15s linear infinite;-o-animation: rotates 15s linear infinite;background-image: url("' + resource.alertFlashImg +
						'")}' +
						'.cm-dc-upper {position: fixed;  margin: auto; top:0; left: 0;  right: 0;  width: 1180px;z-index:99;height:100px}' +
						'.cm-dc-frame {top:15px;right:70px;position: relative;float:right; width: 102px;z-index:9;height:65px;background-repeat: no-repeat; background-image: url("' + resource.frameImg +
						'")}' +
						'.cm-dc-number-l {top:25px;left:10px;position: relative;float:right; width: 33px;z-index:9;height:40px;background-repeat: no-repeat;background-position-x: -360px;background-image: url("' + resource.numberImg +
						'")}' +
						'.cm-dc-number-r {top:25px;left:10px;position: relative;float:right; width: 33px;z-index:9;height:40px;background-repeat: no-repeat;background-image: url("' + resource.numberImg
						'")}';
					var cssStyle = {};
					cssStyle = document.createElement('style');
					cssStyle.type = 'text/css';
					cssStyle.innerHTML = cssStr;
					document.getElementsByTagName('HEAD').item(0).appendChild(cssStyle);
					var cmdc = document.createElement('div'),
						bot = document.createElement('div'),
						left = document.createElement('div'),
						right = document.createElement('div'),
						middle = document.createElement('div'),
						bottombak = document.createElement('div'),
						close = document.createElement('div'),
						rocker = document.createElement('div'),
						start = document.createElement('div'),
						bothsideBody = document.createElement('div'),
						upper = document.createElement('div'),
						frame = document.createElement('div'),
						numberL = document.createElement('div'),
						numberR = document.createElement('div'),
						botImg = document.createElement('img'),
						leftImg = document.createElement('img');
					cmdc.className = 'cm-dc-class'
					bot.className = 'cm-dc-bottom';
					left.className = 'cm-dc-left';
					right.className = 'cm-dc-right';
					middle.className = 'cm-dc-middle';
					bottombak.className = 'cm-dc-bottom-bak';
					close.className = 'cm-dc-close-small';
					upper.className = 'cm-dc-upper'
					frame.className = 'cm-dc-frame'
					rocker.className = 'cm-dc-rocker';
					start.className = 'cm-dc-start-btn';
					bothsideBody.className = 'cm-dc-both-side-body';
					numberL.className = 'cm-dc-number-l';
					numberR.className = 'cm-dc-number-r';
					bot.style.backgroundImage = 'url(' + resource.botImg + ')'
					middle.style.backgroundImage = 'url(' + resource.middleImg + ')'
					bottombak.style.backgroundImage = 'url(' + resource.bottombakImg + ')'
					close.style.backgroundImage = 'url(' + resource.closeSmallImg + ')'
					rocker.style.backgroundImage = 'url(' + resource.rockerImg + ')'
					start.style.backgroundImage = 'url(' + resource.startBtnImg + ')'

					botImg.src = resource.botImg;
					botImg.style.width = '1180px';
					botImg.style.display = 'inline-block';
					leftImg.src = resource.leftImg;
					leftImg.style.display = 'inline-block'

					for(var i = 0; i < 30; i++){
						var leftlogo = document.createElement('a'),
							rightlogo = document.createElement('a')
						leftlogo.className = 'cm-dc-11logo'
						rightlogo.className = 'cm-dc-11logo'
						leftlogo.style.backgroundImage = 'url(' + resource.logoImg + ')'
						rightlogo.style.backgroundImage = 'url(' + resource.logoImg + ')'
						left.appendChild(leftlogo)
						right.appendChild(rightlogo)
					}
					upper.appendChild(frame);
					upper.appendChild(numberL);
					upper.appendChild(numberR);
					cmdc.appendChild(upper);
					cmdc.appendChild(rocker);
					cmdc.appendChild(bot);
					cmdc.appendChild(left);
					cmdc.appendChild(right);
					cmdc.appendChild(middle);
					cmdc.appendChild(close);
					cmdc.appendChild(bottombak);
					cmdc.appendChild(bottombak);
					cmdc.appendChild(start);
					cmdc.appendChild(bothsideBody);
					document.body.appendChild(cmdc);
				},
				show: function () {
					cmdcObj.botEL.style.display = 'block'
					cmdcObj.leftEL.style.display = 'block'
					cmdcObj.middleEL.style.display = 'block'
					cmdcObj.bottombakEL.style.display = 'block'
					cmdcObj.botEL.style.bottom = '-60px'
					cmdcObj.botEL.classList.toggle('move_upper');
					CMDC.isIE && (cmdcObj.middleEL.style.cursor = 'pointer')
					cmdcObj.changeRocker()
				},
				changeRocker: function(){
					cmdcObj.si = setInterval(function () {
						var x = cmdcObj.rockerEL.style.backgroundPositionX
						cmdcObj.rockerEL.style.backgroundPositionX = x === '0px' ? '-166px' : '0px'
					}, CMDC.timeout * 0.6)
				},
				changeRockerSmall: function(){
					cmdcObj.sis = setInterval(function () {
						var x = cmdcObj.rockerEL.style.backgroundPositionX
						cmdcObj.rockerEL.style.backgroundPositionX = x === '0px' ? '-83px' : '0px'
					}, CMDC.timeout * 0.6)
				}
			}
			cmdcObj.init(resource);
			cmdcObj.botEL = cmdcObj.$(".cm-dc-bottom")
			cmdcObj.leftEL = cmdcObj.$(".cm-dc-left")
			cmdcObj.middleEL = cmdcObj.$(".cm-dc-middle")
			cmdcObj.bottombakEL = cmdcObj.$(".cm-dc-bottom-bak")
			cmdcObj.rockerEL = cmdcObj.$(".cm-dc-rocker")
			cmdcObj.buttonEL = cmdcObj.$(".cm-dc-start-btn")
			cmdcObj.closeEL = cmdcObj.$(".cm-dc-close")
			cmdcObj.show();

			window.cmdcObj = cmdcObj;
		},
		/*1. 滚动到指定位置，避免在顶部产生性能问题
			2. 隐藏scroll
		*/
		dosomethingforbkg: function(){
			$('body').css('overflow-y', 'hidden')
		}
	};

	window.CMDC = CMDC;

	// if(CMDC.Interface.ready()){
		try{
			// if(cmdcCookie('cmdcg') === '1'){
			// 	CMDC.Interface.close('cookie')
			// 	return
			// }
			CMDC.loadSource();

			CMDC.dosomethingforbkg()

			setTimeout(function(){
				//建立游戏周边场景
				CMDC.buildWalls();
				//建立娃娃机场景
				CMDC.play();
			}, CMDC.timeout* 0.3);

		}catch (e){
			console.log('error', e)
			CMDC.Interface.error()
		}
	// }
})();

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
	CMDCG.do.auto = true //自动抓取
	CMDCG.do.stoauto = {}

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
			mass: 2,
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
		CMDCG.do.stoauto && clearTimeout(CMDCG.do.stoauto)
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
				CMDCG.do.sto1p8 = setTimeout(function () {
					//红包出现
					CMDCG.do.redAlertShow = true
					CMDCG.do.alert = cmdcAlert({
						"buttons": {
							"gotmall": function () {
								// CMDCG.do.setBodiesStatic(engine, false)
								// playAgain = true;
								window.open(tmallLink)
								CMDCG.do.closeFun('receive')
								CMDC.Interface.reportClick('click6', 1)
							}
						}
					})
					CMDCG.do.setBodiesStatic(engine, true)
					//开始自动消失计时
					CMDCG.do.disappear()
					CMDC.Interface.reportShow('red')
				}, timeout * 1.2)
			}, timeout )
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
		CMDCG.do.stoauto && clearTimeout(CMDCG.do.stoauto)

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
		//屏幕事件 点击
		$('.cm-dc-middle').bind('click', function(event){
			CMDCG.do.clickFun('click1')
		})
		//抓取按钮事件 点击
		$('.cm-dc-start-btn, .cm-dc-start-small-btn').bind('click', function(){
			CMDCG.do.clickFun('click2')
		})
		//关闭按钮事件
		$('.cm-dc-close, .cm-dc-close-small').bind('click', function(){
			//红包出现前/出现后
			!CMDCG.do.redAlertShow && CMDCG.do.closeFun('exit1')
			CMDCG.do.redAlertShow && CMDCG.do.closeFun('exit2')
		})
		//键盘事件
		$(document).bind('keyup', function(event){
			if(!event.keyCode || event.keyCode == 13) return
			CMDCG.do.clickFun('click3')
		});

		//两边点击事件
		$('.cm-dc-11logo').bind('mouseover mouseout click', function(event){
			if(event.type === "mouseover"){
				$(event.target).css('background-image', "url(" + sourceLinkRoot + "img/11logo-hover.png)")
			}else if(event.type === "mouseout"){
				$(event.target).css('background-image', "url(" + sourceLinkRoot + "img/11logo.png)")
			}else if(event.type === "click"){
				window.open(tmallLink)
				CMDC.Interface.reportClick('click7', 1)
			}
		})

		//摇杆点击事件
		$('.cm-dc-rocker, .cm-dc-rocker-small').bind('click', function(){
			CMDCG.do.clickFun('click1')
		})
	}

	CMDCG.do.unbindEvents = function(){
		$('.cm-dc-middle').unbind('click')
		$('.cm-dc-start-btn, .cm-dc-start-small-btn').unbind('click')
		$('.cm-dc-close, .cm-dc-close-small').unbind('click')
		$(document).unbind('keyup')
		$('.cm-dc-11logo').unbind('click mouseover mouseout')
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
		includeStack && CMDC.Interface.reportClick('click5')
		// console.log('includeStack', includeStack)
		// console.log('notStatic', notStatic)
		!includeStack && notStatic && CMDC.Interface.reportClick('click5')
	}

	//自动消失
	CMDCG.do.disappear = function(){
		CMDCG.do.disappearSTO = setTimeout(function(){
			CMDCG.do.alert && CMDCG.do.closeFun('disappear')
		}, timeout* 30)
	}

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
		x: 10,
		y: 350,
		columns: 14,
		rows: 1,
	}
	var stack = CMDCG.do.createStacks(criteria);
	World.add(world, stack);

	//爪子整体构造连接, 延迟
	CMDCG.do.sto0p2 = setTimeout(function(){
		//控制显示层级
		World.add(world, [ragdoll, ragdollConstraint, ropeC]);

		//爪子出现再进行展示上报
		CMDC.Interface.reportShow('winpop')

		CMDCG.do.sto1p2 = setTimeout(function(){
			CMDCG.do.setVisible()
		}, timeout* 1.5)

		CMDCG.do.sto2 = setTimeout(function(){
			CMDCG.do.ragdollMove = true;
			//自动抓取
			var y = 360
			if(CMDCG.do.auto){
				//时间倒时开始
				CMDCG.do.stoauto = setInterval(function(){
					y === 0 && CMDCG.do.clickFun('click4') && clearInterval(CMDCG.do.stoauto)
					$('.cm-dc-number-l').css("background-positionX", -y+'px')
					y -= 40
				}, timeout)
			}
		}, timeout* 2)

	}, timeout* 0.2)

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
			// cmdcObj.closeEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/close-small.png' + ')'
			// cmdcObj.closeEL.classList.contains('cm-dc-close') && cmdcObj.closeEL.classList.remove('cm-dc-close');
			// cmdcObj.closeEL.classList.toggle('cm-dc-close-small');
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
			// cmdcObj.closeEL.style.backgroundImage = 'url(' + sourceLinkRoot + 'img/close.png' + ')'
			// cmdcObj.closeEL.classList.contains('cm-dc-close-small') && cmdcObj.closeEL.classList.remove('cm-dc-close-small');
			// cmdcObj.closeEL.classList.toggle('cm-dc-close');
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
