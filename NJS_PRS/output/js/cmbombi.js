var svg_data='<?xml version="1.0" encoding="utf-8"?>\n<!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version="1.1" id="图层_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 406 239.5" style="enable-background:new 0 0 406 239.5;" xml:space="preserve">\n<path d="M254.5,62.5h-93c-42.6,0-50.6-9.6-55.9-16c-0.7-0.9-1.4-1.7-2.1-2.4C97.4,38,80.3,17.9,76.3,12.9c-0.5-0.6-5-6-13.3-9.8\n\tl1.2-2.7c6.8,3.1,12.1,7.7,14.4,10.6c3.9,4.9,20.9,24.9,26.9,30.9c0.8,0.8,1.5,1.7,2.3,2.6c4.9,5.9,12.4,14.9,53.6,14.9h93\n\tc27.2,0,34.8-5.4,52.9-26.5c1.8-2.1,3.5-4.2,5.3-6.2c9.3-11.1,18.1-21.7,29.4-27.1l1.3,2.7c-10.7,5.1-19.3,15.4-28.4,26.3\n\tc-1.7,2.1-3.5,4.2-5.3,6.3C291.8,55.8,283.6,62.5,254.5,62.5z"/>\n<path d="M366.5,239.5h-329C13,239.5,2,233.1,2,195C2,157.5,0,66.9,0,66l0-22c0-9.2,1.4-22.8,13.6-33.9l2,2.2C4.3,22.6,3,35.3,3,44\n\tv22c0,0.9,2,91.4,2,129c0,37.4,10.4,41.5,32.5,41.5h329c34.5,0,34.5-18.2,34.5-37.5c0-8.8,0.6-51.5,1.1-89.3\n\tC402.6,78.5,403,49,403,44c0-12.9-4.2-23.4-12.4-31.3l2.1-2.2C401.4,18.9,406,30.5,406,44c0,5-0.4,34.5-0.9,65.8\n\tc-0.5,37.7-1.1,80.5-1.1,89.2C404,218,404,239.5,366.5,239.5z"/>\n</svg>\n',cmbombAlert=function(e){var t={closeAll:!1,content:"",buttons:{}},o=$.extend(t,e),i={},r=$('<div class="simpleAlert">'),n=$('<div class="simpleAlertShelter">'),a=$('<div class="simpleAlertBody">'),c=$('<div class="simpleAlertRed redAnimat">'),s=$('<img class="simpleAlertBodyClose" height="14" width="14"/>');return i.init=function(){for(var e=0,t=!1,i=[],s=0;s<2;s++)for(var m in o.buttons)switch(s){case 0:i.push(m);break;case 1:t=i.length<=1,e++;var d=$('<a class="simpleAlertBtn simpleAlertBtn'+e+'"></a>');$('<div class="simpleAlertFlash"></div>'),$('<div class="simpleAlertHead"></div>');d.bind("click",o.buttons[m]),r.bind("click",o.buttons[m]),coin1=document.createElement("div"),coin2=document.createElement("div"),coin3=document.createElement("div"),coin4=document.createElement("div"),coin5=document.createElement("div"),coin6=document.createElement("div"),coin7=document.createElement("div"),coin8=document.createElement("div"),coin1.className="cm-coin1",coin2.className="cm-coin2",coin3.className="cm-coin3",coin4.className="cm-coin4",coin5.className="cm-coin5",coin6.className="cm-coin6",coin7.className="cm-coin7",coin8.className="cm-coin8",r.bind("mouseover mouseout",function(e){"mouseover"===e.type?CMBOMBG["do"].disappearSTO&&clearTimeout(CMBOMBG["do"].disappearSTO):"mouseout"===e.type&&CMBOMBG["do"].disappear()}),r.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){c.hasClass("redAnimat")&&c.removeClass("redAnimat"),c.hasClass("redAnimated")&&c.removeClass("redAnimated")}),a.append(c),a.append(coin1).append(coin2).append(coin3).append(coin4).append(coin5).append(coin6).append(coin7).append(coin8)}r.append(a),$("body").append(r).append(n),a.show().animate({opacity:"1"},350)},s.bind("click",function(){o.closeAll=!1,i.close()}),i.close=function(){$(".simpleAlert").remove()},i.init(),i};!function(e){function t(o,i){return null!=o?t[i===e?"get":"set"].apply(null,arguments):e}t.get=function(e){var t,o,i,r;if(document.cookie)for(o=document.cookie.split("; "),i=0,r=o.length;i<r;i++)if(0===o[i].indexOf(e+"=")){t=decodeURIComponent(o[i].substr(e.length+1));break}return t},t.set=function(e,t,o){var i,r=[];return o=o||{},t||(t="",o.expires=-1),"number"==typeof o.expires?(i=new Date,i.setTime(i.getTime()+1e3*o.expires)):o.expires instanceof Date&&(i=o.expires),r.push(e+"="+encodeURIComponent(t)),i&&r.push("expires="+i.toUTCString()),o.path&&r.push("path="+o.path),o.domain&&r.push("domain="+o.domain),o.secure&&r.push("secure"),document.cookie=r.join("; ")},t.setToday=function(e,t,o){var i=new Date,r=i.getTime();i.setHours(0),i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),"object"!=typeof o&&(o={}),o.expires=Math.round((864e5-Math.max(r-i.getTime(),0))/1e3),this.set(e,t,o)},window.cmbombCookie=t}(),function(){var e={sourceLinkRoot:"//localhost:8000/NJS_PRS/src/",tmallLink:"//s.click.taobao.com/yxl72Zw",dc:{},playAgain:!1,timeout:1e3,isIE:"Microsoft Internet Explorer"===navigator.appName||!!window.ActiveXObject||"ActiveXObject"in window,isInclude:function(e){for(var t=/js$/i.test(e),o=document.getElementsByTagName(t?"script":"link"),i=0;i<o.length;i++)if(o[i][t?"src":"href"].indexOf(e)!==-1)return!0;return!1},loadSource:function(){var t=document.getElementsByTagName("HEAD").item(0),o=document.createElement("script"),i=document.createElement("script"),r=document.createElement("script"),n=document.createElement("script"),a=(document.createElement("script"),document.createElement("script")),c=e.sourceLinkRoot;o.src=c+"js/polyfill.js",i.src=c+"js/decomp.js",r.src=c+"js/pathseg.js",n.src=c+"js/matter.js",a.src=c+"js/jquery-1.11.0.min.js",t.appendChild(o),t.appendChild(i),t.appendChild(r),t.appendChild(n),"undefined"==typeof jQuery&&t.appendChild(a)},removejscssfile:function(e,t){for(var o="js"===t?"script":"css"===t?"link":"none",i="js"===t?"src":"css"===t?"href":"none",r=document.getElementsByTagName(o),n=r.length;n>=0;n--)r[n]&&r[n].getAttribute(i)&&r[n].getAttribute(i).indexOf(e)!==-1&&r[n].parentNode.removeChild(r[n])},clearSource:function(){var t=e.removejscssfile,o=e.sourceLinkRoot;t(o+"js/polyfill.js","js"),t(o+"js/decomp.js","js"),t(o+"js/pathseg.js","js"),t(o+"js/matter.js","js"),t(o+"js/cmbombi.js","js"),t(o+"js/jquery-1.11.0.min.js","js")},Interface:{close:function(t){try{"receive"===t?bigBomb&&bigBomb.receive():(bigBomb&&bigBomb.gameOver(),e.Interface.reportClose(t))}catch(o){console.log("error",o),bigBomb&&bigBomb.error()}},ready:function(){if(window.requestAnimationFrame){try{bigBomb&&bigBomb.ready()}catch(t){bigBomb&&bigBomb.error(),e.Interface.reportClose("error-exit"),console.log("error",t)}return!0}try{bigBomb&&bigBomb.notSupport()}catch(t){bigBomb&&bigBomb.error(),e.Interface.reportClose("error-exit"),console.log("error",t)}return e.Interface.reportShow("not-support"),!1},click:function(){try{bigBomb&&bigBomb.receive()}catch(t){bigBomb&&bigBomb.error(),e.Interface.reportClose("error-exit"),console.log("error",t)}},error:function(){try{bigBomb&&bigBomb.error()}catch(t){bigBomb&&bigBomb.error(),console.log("error",t)}e.Interface.reportClose("error-exit")},reportShow:function(e){this.report({snode:1365,expand:e})},reportClick:function(e,t){var o={snode:1163,expand:e};t&&(o.shuang11=1),this.report(o)},reportClose:function(e){this.report({snode:10147,expand:e})},report:function(e){var t={node:1031100};for(var o in e)t[o]=e[o];t.w="coinboom",t.cid="57471519";try{bigBomb&&bigBomb.report(t)}catch(i){console.log("error",i)}}},play:function(){try{var e=CMBOMBG["do"]();e.canvas&&cmbombObj.rootEL.appendChild(e.canvas)}catch(t){console.log(t)}},buildWalls:function(){var t=e.sourceLinkRoot,o={middleImg:t+"img/bomb/head.png",closeImg:t+"img/bomb/close.png",alertImg:t+"img/bomb/red_bak.gif",alertbtnImg:t+"img/alertbtn.png",alertFlashImg:t+"img/flash.png",alertHeadImg:t+"img/nice.png",backflash:t+"img/bomb/backflash.png",flash:t+"img/bomb/flash.png",coin1:t+"img/bomb/side/1.png",coin2:t+"img/bomb/side/2.png",coin3:t+"img/bomb/side/3.png",coin4:t+"img/bomb/side/4.png",coin5:t+"img/bomb/side/5.png",coin6:t+"img/bomb/side/6.png",coin7:t+"img/bomb/side/7.png",coin8:t+"img/bomb/side/8.png"},i={rootEL:{},leftEL:{},middleEL:{},redEL:{},$:function(e){return document.querySelector(e)},init:function(e){i.createDom(e)},createDom:function(e){var t='.cm-bomb-middle {z-index:21;position:fixed;margin:auto;top: 15px;left: 25px;right: 0;bottom: 0;min-width:1160px;background-repeat: no-repeat;background-position: center top;width:400px;height:300px;display: none; cursor:pointer}.cm-bomb-middle-backflash {z-index:20;position:fixed;margin:auto;top: 0;left:35px;right: 0;bottom: 0;min-width:1160px;background-repeat: no-repeat;background-position: center top;width:455px;height:1000px;display: none; cursor:pointer; background: url("'+e.backflash+'") no-repeat}.cm-bomb-middle-flash {z-index:23;position:fixed;margin:auto;top: 0;left:35px;right: 0;bottom: 0;min-width:1160px;background-repeat: no-repeat;background-position: center top;width:455px;height:900px;display: none; cursor:pointer; background: url("'+e.flash+'") no-repeat}.cm-dc-close {width: 80px;height: 80px;cursor: pointer;top: 20px; margin: auto;z-index:101;position: fixed; right:28px;background-repeat: no-repeat;} .cm-dc-close:hover {background-position: -80px} .cm-dc-close:active {background-position: -160px}.cm-dc-close-small {width: 40px;height: 40px;cursor: pointer;top: 5px; margin: auto;z-index:101;position: fixed; right:5px;background-repeat: no-repeat;} .cm-dc-close-small:hover {background-position: -40px} .cm-dc-close-small:active {background-position: -80px}.cm-dc-11logo-l {position:absolute;top:0;left:60px;bottom:0;right:0;margin:auto;cursor:pointer;display: inline-block;width:340px; height: 300px;background-repeat: no-repeat;z-index:99}.cm-dc-11logo-r {position:absolute;top:0;bottom:0;right:40px;margin:auto;cursor:pointer;display: inline-block;width:340px; height: 300px;background-repeat: no-repeat;z-index:99}.cm-bomb-class {cursor:pointer;top:0px;bottom:0px;left:0;right:0;margin:0 auto;position: fixed;z-index:89;width: 1180px;height: 100%;font-family: Helvetica, Arial, sans-serif; display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center; -webkit-box-pack: center; -ms-flex-pack: center;justify-content: center; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column;flex-direction: column;height: 100vh;} .cm-bomb-class canvas { border-radius: 8px;cursor: pointer;}.simpleAlert {position: fixed;z-index: 100;margin:auto;top: 0;left: 0;right: 0;bottom: 0;width:1075px ;height:1050px;animation-name: zoomIn;-webkit-animation-name: zoomIn;-webkit-animation-duration: 1s;animation-duration: 1s;animation-delay: 0s;-webkit-animation-delay: 0s;animation-iteration-count:1;-webkit-animation-iteration-count:1;cursor:pointer}.simpleAlertShelter {position: fixed;width: 100%;height: 100%;top:0;left:0;background-color:#000;opacity:0.3;filter:alpha(opacity=50);z-index:99}.simpleAlertBody {cursor:pointer;z-index:100;position:absolute;width:345px;height:317px;top:0;left:0;right:0;bottom:70px;margin:auto;perspective:1000px}.simpleAlertRed {cursor:pointer;z-index:100;position:absolute;width:300px;height:350px;top:-40px;left:0;right:0;margin:auto;background-repeat: no-repeat;background: url("'+e.alertImg+'")}.redAnimat {animation-name: swing;-webkit-animation-name: swing;-webkit-animation-duration: 1s;animation-duration: 1s;animation-delay: 2s;-webkit-animation-delay: 2s;animation-iteration-count: 1;-webkit-animation-iteration-count: 1;}.redAnimated {animation-name: swing;-webkit-animation-name: swing;-webkit-animation-duration: 0.8s;animation-duration: 0.8s;animation-iteration-count: 1;-webkit-animation-iteration-count: 1;}.simpleAlertBtn {position:absolute;width: 190px;height:80px;bottom:110px;cursor:pointer;}.simpleAlertBtn1 {left:23.5%;bottom:-100px;background: url("'+e.alertbtnImg+'") no-repeat} .simpleAlertBtn1:hover {background-position: -192px} .simpleAlertBtn1:active {background-position: -384px}.simpleAlertHead {position:absolute;width:210px;height:90px;top:-100px;left:18.5%;cursor:pointer;background: url("'+e.alertHeadImg+'") no-repeat}.simpleAlertFlash {cursor:pointer;z-index:99;position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom:70px;width: 600px;height: 600px;background-repeat: no-repeat;animation: rotates 8s linear infinite;-moz-animation: rotates 8s linear infinite; -webkit-animation: rotates 8s linear infinite;-ms-animation: rotates 8s linear infinite;-o-animation: rotates 8s linear infinite;background-image: url("'+e.alertFlashImg+'")}@-webkit-keyframes zoomIn { 0% {  opacity: 0;  -webkit-transform: scale3d(.6, .6, .6);  -ms-transform: scale3d(.6, .6, .6);  transform: scale3d(.6, .6, .6);  } 50% {  opacity: 1;  -webkit-transform: scale3d(1.2, 1.2, 1.2);  -ms-transform: scale3d(1.2, 1.2, 1.2);  transform: scale3d(1.2, 1.2, 1.2);  } 80% {  opacity: 1;  -webkit-transform: scale3d(0.8, 0.8, 0.8);  -ms-transform: scale3d(0.8, 0.8, 0.8);  transform: scale3d(0.8, 0.8, 0.8);  } }  @keyframes zoomIn { 0% {  opacity: 0;  -webkit-transform: scale3d(.6, .6, .6);  -ms-transform: scale3d(.6, .6, .6);  transform: scale3d(.6, .6, .6);  } 50% {  opacity: 1;  -webkit-transform: scale3d(1.2, 1.2, 1.2);  -ms-transform: scale3d(1.2, 1.2, 1.2);  transform: scale3d(1.2, 1.2, 1.2);  } 80% {  opacity: 1;  -webkit-transform: scale3d(0.8, 0.8, 0.8);  -ms-transform: scale3d(0.8, 0.8, 0.8);  transform: scale3d(0.8, 0.8, 0.8);  } 100% {opacity: 1;  -webkit-transform: scale3d(1, 1, 1);  -ms-transform: scale3d(1, 1, 1);  transform: scale3d(1, 1, 1);}}  @-webkit-keyframes swing { 20% {  -webkit-transform: rotate3d(0, 0, 1, 15deg);transform: rotate3d(0, 0, 1, 15deg) } 40% {  -webkit-transform: rotate3d(0, 0, 1, -10deg); transform: rotate3d(0, 0, 1, -10deg)} 60% {-webkit-transform: rotate3d(0, 0, 1, 5deg);transform: rotate3d(0, 0, 1, 5deg)} 80% {-webkit-transform: rotate3d(0, 0, 1, -5deg);transform: rotate3d(0, 0, 1, -5deg)} 100% {-webkit-transform: rotate3d(0, 0, 1, 0deg); transform: rotate3d(0, 0, 1, 0deg) } }@keyframes swing { 20% {  -webkit-transform: rotate3d(0, 0, 1, 15deg);  -ms-transform: rotate3d(0, 0, 1, 15deg);transform: rotate3d(0, 0, 1, 15deg)} 40% {-webkit-transform: rotate3d(0, 0, 1, -10deg);-ms-transform: rotate3d(0, 0, 1, -10deg);transform: rotate3d(0, 0, 1, -10deg)} 60% {-webkit-transform: rotate3d(0, 0, 1, 5deg);-ms-transform: rotate3d(0, 0, 1, 5deg); transform: rotate3d(0, 0, 1, 5deg)} 80% {-webkit-transform: rotate3d(0, 0, 1, -5deg);-ms-transform: rotate3d(0, 0, 1, -5deg);transform: rotate3d(0, 0, 1, -5deg)} 100% {-webkit-transform: rotate3d(0, 0, 1, 0deg);-ms-transform: rotate3d(0, 0, 1, 0deg);transform: rotate3d(0, 0, 1, 0deg)}}@-webkit-keyframes rotates{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}\n@-ms-keyframes rotates{from{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(360deg)}}\n@-moz-keyframes rotates{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}\n@-o-keyframes rotates{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(360deg)}} @-webkit-keyframes cm-bom-rubberBand {0% {-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 60% {-webkit-transform: scale3d(1.2, 1.2, 1);-ms-transform: scale3d(1.2, 1.2, 1);transform: scale3d(1.2, 1.2, 1)} 100% {-webkit-transform: scale3d(1, 1, 1);-ms-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1)}} @keyframes cm-bom-rubberBand { 0% { -webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 60% {-webkit-transform: scale3d(1.2, 1.2, 1);-ms-transform: scale3d(1.2, 1.2, 1);transform: scale3d(1.2, 1.2, 1)} 100% {-webkit-transform: scale3d(1, 1, 1);-ms-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1)}} .cm-bom-rubberBand {-webkit-animation-duration: 1.5s;animation-duration: 1.5s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: cm-bom-rubberBand;animation-name: cm-bom-rubberBand; }@-webkit-keyframes rotateY { 0% { -webkit-transform: rotateY(0deg); -ms-transform: rotateY(0deg); transform: rotateY(0deg)} 30% {-webkit-transform: rotateY(45deg);-ms-transform: rotateY(45deg);transform: rotateY(45deg)}60% {-webkit-transform: rotateY(0deg);-ms-transform: rotateY(0deg);transform: rotateY(0deg)} 100% {-webkit-transform: rotateY(-45deg);-ms-transform: rotateY(-45deg);transform: rotateY(-45deg)}} @keyframes rotateY { 0% { -webkit-transform: rotateY(0deg); -ms-transform: rotateY(0deg); transform: rotateY(0deg)} 30% {-webkit-transform: rotateY(45deg);-ms-transform: rotateY(45deg);transform: rotateY(45deg)}60% {-webkit-transform: rotateY(0deg);-ms-transform: rotateY(0deg);transform: rotateY(0deg)} 100% {-webkit-transform: rotateY(-45deg);-ms-transform: rotateY(-45deg);transform: rotateY(-45deg)}} .cm-bom-rotateY {-webkit-animation-duration: 2s;animation-duration: 2s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: rotateY;animation-name: rotateY; }@-webkit-keyframes flash { 0% {  opacity: 0  } 50% {  opacity: 0.6  } 100% { opacity: 0  }}  @keyframes flash { 0% {  opacity: 0  } 50% {  opacity: 0.6  } 100% { opacity: 0  } }  .flash {  -webkit-animation-name: flash;  animation-name: flash; -webkit-animation-duration: 1s;  animation-duration: 1s;  -webkit-animation-fill-mode: both;  animation-fill-mode: both;} @-webkit-keyframes cm-bom-head-fadeout {0% { opacity: 1;-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 100%{ opacity: 0;-webkit-transform: scale3d(4, 4, 1);-ms-transform: scale3d(4, 4, 1);transform: scale3d(4, 4, 1)}} @keyframes cm-bom-head-fadeout {0% { opacity: 1;-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 100%{ opacity: 0;-webkit-transform: scale3d(4, 4, 1);-ms-transform: scale3d(4, 4, 1);transform: scale3d(4, 4, 1)}} .cm-bom-head-fadeout {-webkit-animation-duration: 1.5s;animation-duration: 1.5s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: cm-bom-head-fadeout;animation-name: cm-bom-head-fadeout; }.cm-coin1{z-index:2;width: 105px; height: 60px; position: absolute; margin:auto; top: 0;left:-507px;right: 0;bottom: 183px;  background: url("'+e.coin1+'") no-repeat;}\n\t.cm-coin2{z-index:2;width: 105px; height: 60px; position: absolute; margin:auto; top: 0;left:-357px;right: 0;bottom: 360px;  background: url("'+e.coin2+'") no-repeat;}\n\t.cm-coin3{z-index:2;width: 105px; height: 90px; position: absolute; margin:auto; top: 200px;left:-354px;right: 0;bottom: 0; background: url("'+e.coin3+'") no-repeat;}\n\t.cm-coin4{z-index:100;width: 105px; height: 60px; position: absolute; margin:auto; top: 0;left:-207px;right: 0;bottom: 183px;  background: url("'+e.coin4+'") no-repeat;}\n\t.cm-coin5{z-index:2;width: 105px; height: 52px; position: absolute; margin:auto; top: 0;left:-62px;right: 0;bottom: 450px;  background: url("'+e.coin5+'") no-repeat;}\n\t.cm-coin6{z-index:100;width: 105px; height: 52px; position: absolute; margin:auto; top: 0;left:154px;right: 0;bottom: 322px;  background: url("'+e.coin6+'") no-repeat;}\n\t.cm-coin7{width: 60px;  height: 52px;  position: absolute;  margin:auto;  top: 0;left: 270px;right: 0;bottom: 130px;  background: url("'+e.coin7+'") no-repeat;}\n\t.cm-coin8{width: 100px;  height: 80px;  position: absolute;  margin:auto;  top: 0;left: 474px;right: 0;bottom: 340px;  background: url("'+e.coin8+'") no-repeat;}.cm-bomb-close {width: 30px;height: 30px;cursor: pointer;top:10px; margin: auto;z-index:101;position: fixed; right:60px;background: url("'+e.closeImg+'") no-repeat;display:none} .cm-bomb-close:hover {background-position: -30px} .cm-bomb-close:active {background-position: -60px}',o={};o=document.createElement("style"),o.type="text/css",o.innerHTML=t,document.getElementsByTagName("HEAD").item(0).appendChild(o);var i=document.createElement("div"),r=document.createElement("div"),n=document.createElement("div");flash=document.createElement("div"),closeEl=document.createElement("div"),i.className="cm-bomb-class",r.className="cm-bomb-middle",n.className="cm-bomb-middle-backflash",flash.className="cm-bomb-middle-flash",closeEl.className="cm-bomb-close",r.style.backgroundImage="url("+e.middleImg+")",i.appendChild(flash),i.appendChild(r),i.appendChild(n),document.body.appendChild(i),document.body.appendChild(closeEl)}};i.init(o),i.rootEL=i.$(".cm-bomb-class"),i.middleEL=i.$(".cm-bomb-middle"),i.closeEL=i.$(".cm-dc-close"),window.cmbombObj=i},addEvent:function(e,t,o){return e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent&&e.attachEvent("on"+t,o,!1),!1},removeEvent:function(e,t,o,i){e.removeEventListener?e.removeEventListener(t,o,i||!1):e.detachEvent?e.detachEvent("on"+t,o,i||!1):e["on"+t]=null},mmFunc:function(){e.removeEvent(document,"mousemove",e.mmFunc),e.play()},dosomethingforbkg:function(){}};window.CMBOMB=e;try{e.loadSource(),setTimeout(function(){e.buildWalls(),e.addEvent(document,"mousemove",e.mmFunc)},e.timeout)}catch(t){console.log("error",t),e.Interface.error()}}();var CMBOMBG=CMBOMBG||{};CMBOMBG["do"]=function(){function e(){CMBOMBG["do"].raf=window.requestAnimationFrame(e),r.update(f,1e3/60,1)}var t,o,i,r=Matter.Engine,n=Matter.Render,a=Matter.Runner,c=Matter.Body,s=Matter.Composite,m=Matter.Composites,d=Matter.Common,l=(Matter.Constraint,Matter.MouseConstraint,Matter.Mouse,Matter.World),p=Matter.Events,b=Matter.Bodies,u=(Matter.Vertices,Matter.Svg),g=Matter.Query,f=r.create(),B=f.world,M=a.create(),h=[],x=n.create({element:document.body,engine:f,options:{wireframes:!1,background:"transparent",width:1400,height:800}}),k=function(e,t){if(t){var o=.0025*t.mass;c.applyForce(t,t.position,{x:(o+d.random()*o)*d.choose([1,-1]),y:-o+d.random()*-o})}else for(var i=s.allBodies(e.world),r=0;r<i.length;r++){var n=i[r];if(n.isStatic&&c.setStatic(n,!1),n.position.y){var a=.045*n.mass,m=(a+d.random()*a)*d.choose([2,-1.5]),l=-a+d.random()*-a-.012;c.applyForce(n,n.position,{x:m,y:l})}}};CMBOMBG["do"].canvasELAnimationEnd=function(){$(".cm-bomb-middle-backflash")&&$(".cm-bomb-middle-backflash").css("display","none"),$(".cm-bomb-middle")&&$(".cm-bomb-middle").addClass("cm-bom-head-fadeout");$(".cm-bom-head-fadeout")[0];setTimeout(function(){CMBOMBG["do"].showRed()},800),CMBOMBG["do"].setBodiesVisible(f,!0),l.remove(B,t),k(f),setTimeout(function(){CMBOMBG["do"].setBodiesTimeScale(f,.45)},300)},CMBOMBG["do"].flashELAnimationEnd=function(){CMBOMB.Interface.reportShow("show")},CMBOMBG["do"].showRed=function(){CMBOMBG["do"].alert=cmbombAlert({buttons:{gotmall:function(){window.open(CMBOMB.tmallLink),CMBOMBG["do"].closeFun("receive"),CMBOMB.Interface.reportClick("click2",1)}}}),CMBOMBG["do"].disappear(),CMBOMBG["do"].sto8=setTimeout(function(){l.clear(B),$(".cm-bomb-class")&&$(".cm-bomb-class").remove()},8*CMBOMB.timeout),CMBOMB.Interface.reportShow("red"),$(".cm-bomb-close")&&$(".cm-bomb-close").css("display","block")},CMBOMBG["do"].bindEvents=function(){$(".cm-bomb-class").bind("click",function(e){window.open(CMBOMB.tmallLink),CMBOMBG["do"].closeFun("receive"),CMBOMB.Interface.reportClick("click1",1)}),$(".cm-bomb-close").bind("click",function(){CMBOMBG["do"].closeFun("exit2")})},CMBOMBG["do"].bindEvents(),CMBOMBG["do"].unbindEvents=function(){$(".cm-bomb-class").unbind("click"),$(".cm-bomb-close").unbind("click")},CMBOMBG["do"].clickFun=function(e){CMBOMB.Interface.reportClick(e)},CMBOMBG["do"].closeFun=function(e){"disappear"!==e&&cmbombCookie.setToday("cmbombg",1),CMBOMBG["do"].disappearSTO&&clearTimeout(CMBOMBG["do"].disappearSTO),CMBOMBG["do"].sto8&&clearTimeout(CMBOMBG["do"].sto8),cancelAnimationFrame(CMBOMBG["do"].raf),CMBOMB.clearSource(),l.clear(B),$(".cm-bomb-class")&&$(".cm-bomb-class").remove(),$(".simpleAlertShelter")&&$(".simpleAlertShelter").remove(),$(".cm-bomb-close")&&$(".cm-bomb-close").remove(),CMBOMBG["do"].unbindEvents(),CMBOMBG["do"].alert&&CMBOMBG["do"].alert.close(),CMBOMB.Interface.close(e)},CMBOMBG["do"].disappear=function(){CMBOMBG["do"].disappearSTO=setTimeout(function(){CMBOMBG["do"].alert&&CMBOMBG["do"].closeFun("disappear")},3e4)},n.run(x),a.run(M,f),$(svg_data).find("path").each(function(e,t){h.push(u.pathToVertices(t,10))}),t=b.fromVertices(400,350,h,{isStatic:!0,render:{fillStyle:"transparent",strokeStyle:"transparent",lineWidth:5}},!0);var C=1,w=b.circle(370,260,20,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/9.png"}}}),y=b.circle(452,260,20,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/11.png"}}}),v=b.circle(263,220,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/5.png"}}}),O=b.circle(339,220,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/7.png"}}}),S=b.circle(413,220,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/10.png"}}}),E=b.circle(491,220,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/13.png"}}}),G=b.circle(570,220,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/15.png"}}}),A=b.circle(308,180,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/6.png"}}}),L=b.circle(370,165,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/8.png"}}}),R=b.circle(455,165,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/12.png"}}}),j=b.circle(524,180,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/14.png"}}}),I=b.circle(173,230,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/4.png"}}}),z=b.circle(170,281,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/3.png"}}}),T=b.circle(120,315,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/1.png"}}}),Y=b.circle(160,355,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/2.png"}}}),N=b.circle(638,230,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/16.png"}}}),F=b.circle(644,281,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/17.png"}}}),H=b.circle(698,315,12,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/19.png"}}}),V=b.circle(660,355,18,{isStatic:!0,render:{sprite:{xScale:C,yScale:C,texture:CMBOMB.sourceLinkRoot+"img/bomb/rect/18.png"}}});return CMBOMBG["do"].criteria={y:-2100,column:1,row:85,sides:8,radius:12},CMBOMBG["do"].createCoin=function(e){return m.stack(e,CMBOMBG["do"].criteria.y,CMBOMBG["do"].criteria.column,CMBOMBG["do"].criteria.row,3,5,function(e,o,i,r,n,a){var c="stack",s=.03,m=1e-4,l=.001,p=.6,u=.8,f=.3;if(0===g.point([t],{x:e,y:o}).length)return d.random()<.1?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin1.png"}}}):d.random()>.1&&d.random()<.2?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin2.png"}}}):d.random()>.2&&d.random()<.3?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin3.png"}}}):d.random()>.3&&d.random()<.4?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin4.png"}}}):d.random()>.4&&d.random()<.5?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius-4,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin5.png"}}}):d.random()>.5&&d.random()<.6?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius-4,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin6.png"}}}):d.random()>.6&&d.random()<.7?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin7.png"}}}):d.random()>.7&&d.random()<.8?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin8.png"}}}):d.random()>.8&&d.random()<.9?b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin9.png"}}}):b.polygon(e,o,CMBOMBG["do"].criteria.sides,CMBOMBG["do"].criteria.radius,{label:c,frictionAir:s,friction:m,restitution:l,mass:p,timeScale:u,render:{sprite:{xScale:f,yScale:f,texture:CMBOMB.sourceLinkRoot+"img/bomb/coin1.png"}}})})},CMBOMBG["do"].setBodiesVisible=function(e,t){for(var o,i=s.allBodies(e.world),r=0;r<i.length;r++)o=i[r],"stack"===o.label&&(o.render.visible=t,o.frictionAir=.02)},CMBOMBG["do"].setBodiesTimeScale=function(e,t){for(var o,i=s.allBodies(e.world),r=0;r<i.length;r++)o=i[r],"stack"===o.label&&(o.timeScale=t,o.render.sprite.xScale=.4,o.render.sprite.yScale=.4)},CMBOMBG["do"].setBodiesStatic=function(e,t){for(var o,i=s.allBodies(e.world),r=0;r<i.length;r++)o=i[r],"Circle Body"===o.label&&c.setStatic(o,t)},o=CMBOMBG["do"].createCoin(230),i=CMBOMBG["do"].createCoin(560),l.add(B,t),l.add(B,o),l.add(B,i),p.on(f,"afterUpdate",function(e){var t=s.allBodies(f.world),o=t[1],i=250;if(o.position.y>=i&&"stack"===o.label){$(".cm-bomb-middle-flash")&&$(".cm-bomb-middle-flash").css("display","block")&&$(".cm-bomb-middle-flash").addClass("flash");var r=$(".cm-bomb-middle-flash")[0];setTimeout(function(){CMBOMBG["do"].setBodiesVisible(f,!1),setTimeout(function(){$(".cm-bomb-middle")&&$(".cm-bomb-middle").css("display","block"),$(".cm-bomb-middle-backflash")&&$(".cm-bomb-middle-backflash").css("display","block")},0),l.add(B,[w,y,v,O,S,E,G,A,L,R,j,I,z,T,Y,N,F,H,V]),$("canvas")&&$("canvas").addClass("cm-bom-rubberBand");var e=$(".cm-bom-rubberBand")[0];CMBOMB.addEvent(e,"animationend",CMBOMBG["do"].canvasELAnimationEnd),CMBOMB.addEvent(e,"webkitAnimationEnd",CMBOMBG["do"].canvasELAnimationEnd)},50),CMBOMB.addEvent(r,"animationend",CMBOMBG["do"].flashELAnimationEnd),CMBOMB.addEvent(r,"webkitAnimationEnd",CMBOMBG["do"].flashELAnimationEnd),p.off(f,"afterUpdate")}}),n.lookAt(x,{min:{x:0,y:0},max:{x:800,y:800}}),e(),{engine:f,runner:M,render:x,canvas:x.canvas,stop:function(){Matter.Render.stop(x),Matter.Runner.stop(M)}}};