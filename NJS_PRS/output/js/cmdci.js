var CMDC={sourceLinkRoot:"//10.20.240.179:8000/NJS_PRS/output/",dc:{},playAgain:!1,bhObj:{},timeout:1e3,eventOff:!1,isInclude:function(e){for(var t=/js$/i.test(e),s=document.getElementsByTagName(t?"script":"link"),c=0;c<s.length;c++)if(s[c][t?"src":"href"].indexOf(e)!==-1)return!0;return!1},loadSource:function(){if(!CMDC.isInclude("cmdcg.js")){var e=document.getElementsByTagName("HEAD").item(0),t=document.createElement("script"),s=document.createElement("script"),c=document.createElement("script"),o=document.createElement("script"),n=document.createElement("script"),r=document.createElement("script"),i=document.createElement("script"),m=document.createElement("link"),l=document.createElement("script"),d=document.createElement("link"),u=CMDC.sourceLinkRoot;t.src=u+"js/polyfill.js",s.src=u+"js/matter-dev.js",c.src=u+"js/matter-tools.gui.js",o.src=u+"js/matter-tools.demo.js",i.src=u+"js/cmdcbh.js",n.src=u+"js/cmdcg.js",r.src=u+"js/simpleAlert.js",m.href=u+"css/simpleAlert.css",m.rel="stylesheet",m.type="text/css",l.src=u+"js/tipso.min.js",d.href=u+"css/tipso.min.css",d.rel="stylesheet",d.type="text/css",e.appendChild(m),e.appendChild(d),e.appendChild(t),e.appendChild(s),setTimeout(function(){e.appendChild(o),e.appendChild(n),e.appendChild(r),e.appendChild(l),e.appendChild(i)},500)}},removejscssfile:function(e,t){for(var s="js"===t?"script":"css"===t?"link":"none",c="js"===t?"src":"css"===t?"href":"none",o=document.getElementsByTagName(s),n=o.length;n>=0;n--)o[n]&&o[n].getAttribute(c)&&o[n].getAttribute(c).indexOf(e)!==-1&&o[n].parentNode.removeChild(o[n])},clearSource:function(){var e=CMDC.removejscssfile;e(sourceLinkRoot+"js/simpleAlert.js","js"),e(sourceLinkRoot+"js/tipso.min.js","js"),e(sourceLinkRoot+"js/matter-dev.js","js"),e(sourceLinkRoot+"js/polyfill.js","js"),e(sourceLinkRoot+"js/matter-tools.demo.js","js"),e(sourceLinkRoot+"js/cmdcg.js","js"),e(sourceLinkRoot+"js/cmdcbh.js","js"),e(sourceLinkRoot+"css/simpleAlert.css","css"),e(sourceLinkRoot+"css/tipso.min.css","css")}};!function(){if(!(document.documentElement.clientWidth<1263)){CMDC.loadSource();var e=function(){var e={toolbar:{title:"天猫双11主场",url:""},tools:{inspector:!1,gui:!1},startExample:"cmdcg",examples:[{name:"DOLL_CATCHING",id:"cmdcg",init:DC["do"],sourceLink:CMDC.sourceLinkRoot+"js/cmdcg.js"}]},t=CMDC.dc;t=MatterTools.Demo.create(e),document.body.appendChild(t.dom.root),MatterTools.Demo.start(t)};setTimeout(function(){e()},CMDC.timeout)}}();