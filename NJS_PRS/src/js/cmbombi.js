
var svg_data = '<?xml version="1.0" encoding="utf-8"?> <!-- Generator: Adobe Illustrator 20.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 800 600" style="enable-background:new 0 0 800 600;" xml:space="preserve"> <path d="M556,320.4c-9.4-22.3-22.7-41.3-39.9-56.9c-17.2-15.6-37.4-27.3-60.5-35.1c-23.1-7.8-48.1-11.7-75-11.7 c-2.7,0-5.8,0.1-9.3,0.4c-3.5,0.3-7.1,0.4-10.9,0.4c-4.3,0.5-8.6,0.8-12.9,0.8V109.4h201.7V11h-10v88.4H337.5v128.9h10 c4.5,0,9.1-0.3,13.5-0.8c3.9,0,7.6-0.2,11.1-0.4c3.2-0.2,6.1-0.4,8.5-0.4c25.7,0,49.8,3.8,71.8,11.2c21.7,7.3,40.9,18.4,57,33 c16,14.5,28.6,32.5,37.4,53.4c8.8,21,13.3,44.5,13.3,69.9c0,30-5.6,56.6-16.7,79.1c-11.1,22.5-26.5,41.6-45.6,56.7 c-19.4,15.3-42.2,27.1-67.8,35c-25.8,8-53.9,12.1-83.4,12.1c-11.2,0-23.4-1.2-36.2-3.5c-13-2.3-26.1-5.3-38.7-8.7 c-12.6-3.4-24.3-7.2-34.9-11.4c-6.9-2.7-13.2-5.3-18.7-7.8l26.2-65c8.9,4.2,20.1,8.6,34,13.3c20,6.8,41.3,10.2,63.3,10.2 c18.6,0,36.1-2.3,52-6.8c16.1-4.6,30.3-11.4,42.3-20.1c12.2-8.9,21.9-20.1,28.8-33.3c6.9-13.2,10.4-28.4,10.4-45 c0-32.8-13.2-59-39.2-77.9c-25-18.1-62.4-27.3-111.2-27.3c-5.9,0-12.8,0.1-20.9,0.4c-7.9,0.3-15.5,0.7-22.6,1.2 c-4.6,0.3-9.4,0.5-14.3,0.7V11h-10v295.3c8.6,0,16.9-0.3,25-0.8c7-0.5,14.4-0.9,22.2-1.2c7.8-0.3,14.7-0.4,20.6-0.4 c46.8,0,81.9,8.5,105.3,25.4c23.4,16.9,35.1,40.2,35.1,69.8c0,15.1-3.1,28.5-9.3,40.3c-6.2,11.8-14.8,21.8-25.8,29.9 c-11,8.1-24.1,14.3-39.1,18.6c-15.1,4.3-31.5,6.5-49.2,6.5c-21,0-41-3.2-60.1-9.7c-19.1-6.5-33.2-12.4-42.4-17.8l-33.9,83.9 c7.5,3.8,16.8,7.8,27.8,12.1c11,4.3,23,8.2,35.9,11.7s26.1,6.5,39.5,8.9c13.4,2.4,26.1,3.6,37.9,3.6c30.7,0,59.4-4.2,86.3-12.5 c26.9-8.3,50.6-20.6,71-36.7c20.4-16.1,36.6-36.2,48.4-60.1c11.8-23.9,17.8-51.8,17.8-83.5C570.2,367.4,565.4,342.8,556,320.4z"/> </svg>';

var cmdcAlert=function(e){var t={closeAll:!1,content:"",buttons:{}},l=$.extend(t,e),n={},s=$('<div class="simpleAlert">'),i=$('<div class="simpleAlertShelter">'),c=$('<div class="simpleAlertBody">'),red=$('<div class="simpleAlertRed redAnimat">'),o=$('<img class="simpleAlertBodyClose" height="14" width="14"/>');return n.init=function(){for(var e=0,t=!1,n=[],o=0;o<2;o++)for(var p in l.buttons)switch(o){case 0:n.push(p);break;case 1:t=n.length<=1,e++;var r=$('<a class="simpleAlertBtn simpleAlertBtn'+e+'">'+"</a>");var f=$('<div class="simpleAlertFlash'+'">'+"</div>");var h=$('<div class="simpleAlertHead'+'">'+"</div>");r.bind("click", l.buttons[p]), c.bind("click", l.buttons[p]),
	red.bind("mouseover mouseout", function(event) {
		if (event.type === "mouseover") {
			red.toggleClass('redAnimated');
		} else if (event.type === "mouseout") {
			red.hasClass('redAnimat') && red.removeClass('redAnimat');
			red.hasClass('redAnimated') && red.removeClass('redAnimated');
		}
	}),
	red.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
		red.hasClass('redAnimat') && red.removeClass('redAnimat');
		red.hasClass('redAnimated') && red.removeClass('redAnimated');
	}),
	c.append(red).append(r).append(h)}s.append(c).append(f),$(".cm-bomb-class").append(s).append(i),c.show().animate({ opacity:"1"}, 350)},o.bind("click",function(){l.closeAll=!1,n.close()}),n.close=function(){l.closeAll?$(".simpleAlert").remove():c.animate({marginTop:"-188px",opacity:"0"},200,function(){$(".simpleAlert").last().remove()})},n.init(),n};


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
	var CMBOMB = {
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
			var oHead = document.getElementsByTagName('HEAD').item(0),
				pfScript = document.createElement("script"),
				deScript = document.createElement("script"),
				paScript = document.createElement("script"),
				mScript = document.createElement("script"),
				mgScript = document.createElement("script"),
				jquery = document.createElement("script"),
				sourceLinkRoot = CMBOMB.sourceLinkRoot;

			pfScript.src = sourceLinkRoot + "js/polyfill.js";
			deScript.src = sourceLinkRoot + "js/decomp.js";
			paScript.src = sourceLinkRoot + "js/pathseg.js";
			mScript.src = sourceLinkRoot + "js/matter.js";
			mgScript.src = sourceLinkRoot + "js/matter-tools.gui.js";
			jquery.src = sourceLinkRoot + "js/jquery-1.11.0.min.js";

			oHead.appendChild(pfScript);
			oHead.appendChild(deScript);
			oHead.appendChild(paScript);
			oHead.appendChild(mScript);
			// oHead.appendChild(mgScript); //debug tool
			typeof jQuery === 'undefined' && oHead.appendChild(jquery);
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
			var removejscssfile = CMBOMB.removejscssfile,
				sourceLinkRoot = CMBOMB.sourceLinkRoot;
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
						CMBOMB.Interface.reportClose(action, index);
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
						CMBOMB.Interface.reportClose('error-exit')
						console.log('error',e)
					}
					return true;
				}
				// 浏览器版本过低
				try {
					Catcher && Catcher.notSupport();
				} catch (e) {
					Catcher && Catcher.error()
					CMBOMB.Interface.reportClose('error-exit')
					console.log('error',e)
				}
				CMBOMB.Interface.reportShow('not-support');
				return false;
			},
			click: function () {
				try {
					Catcher && Catcher.receive();
				} catch (e) {
					Catcher && Catcher.error()
					CMBOMB.Interface.reportClose('error-exit')
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
				CMBOMB.Interface.reportClose('error-exit')
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
			try{
				var instance = CMBOMBG.do()
				instance.canvas && cmbombObj.rootEL.appendChild(instance.canvas)
			}catch(e){
				console.log(e)
			}
		},
		buildWalls: function () {
			var sourceLinkRoot = CMBOMB.sourceLinkRoot
			var resource = {
				botImg: sourceLinkRoot + 'img/control.png',
				botSmallImg: sourceLinkRoot + 'img/control-small.png',
				middleImg: sourceLinkRoot + 'img/hull.png',
				bottombakImg: sourceLinkRoot + 'img/allbodies.png',
				closeImg: sourceLinkRoot + 'img/close.png',
				closeSmallImg: sourceLinkRoot + 'img/close-small.png',
				logoLImg: sourceLinkRoot + 'img/11logo-l.png',
				logoRImg: sourceLinkRoot + 'img/11logo-r.png',
				rockerImg: sourceLinkRoot + 'img/rocker.png',
				startBtnImg: sourceLinkRoot + 'img/button.png',
				alertImg: sourceLinkRoot + 'img/alertbkg.png',
				alertbtnImg: sourceLinkRoot + 'img/alertbtn.png',
				alertFlashImg: sourceLinkRoot + 'img/flash.png',
				alertHeadImg: sourceLinkRoot + 'img/nice.png',
				bothsideBodyImg: sourceLinkRoot + 'img/bothside-bodies-small.png',
				frameImg: sourceLinkRoot + 'img/frame.png',
				numberImg: sourceLinkRoot + 'img/number.png',
				lineImg: sourceLinkRoot + 'img/line.png',
				signImg: sourceLinkRoot + 'img/sign.png',
			}
			var cmbombObj = {
				rootEL: {},
				botEL: {},
				leftEL: {},
				middleEL: {},
				bottombakEL: {},
				rockerEL: {},
				buttonEL: {},
				numberLEL: {},
				numberREL: {},
				redEL: {},
				si: {},
				sis: {},
				$: function (className) {
					return document.querySelector(className);
				},
				init: function (resource) {
					cmbombObj.createDom(resource)
				},
				createDom: function (resource) {
					var cssStr = '.move_upper { -webkit-animation-name: move_upper;animation-name: move_upper; -webkit-animation-duration: .7s;animation-duration: .7s; -webkit-animation-iteration-count: 1;animation-iteration-count: 1; -webkit-animation-fill-mode: forwards;animation-fill-mode: forwards;}' +
						'.cm-dc-bottom {min-width:1180px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:31;height:240px;background-repeat: no-repeat;background-position: center top;display:none;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto};}' +
						'.cm-dc-bottom-small {min-width:1180px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:28;height:180px;background-repeat: no-repeat;background-position: center top;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto; background: url("' + resource.botSmallImg + '")}' +
						'.cm-dc-both-side-body {width:1400px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:2;height:300px;background-position: center top;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto; background: url("' + resource.bothsideBodyImg + '") no-repeat}' +
						'.cm-dc-left {cursor: pointer;overflow:hidden;z-index:30;position:fixed;bottom:0;right: 50%;top:0;margin-right:700px;width: 18%;height: 100%;background: #262564;}' +
						'.cm-dc-right {cursor: pointer;overflow:hidden;z-index:30;position:fixed;bottom:0;left: 50%;top:0;margin-left: 700px;width: 18%;height: 100%;background: #262564;}' +
						'.cm-dc-middle {z-index:21;position:fixed;margin:auto;top: 0;left: 0;right: 0;bottom: 0;min-width:1180px;background-repeat: no-repeat;background-position: center top;display: none;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-bottom-bak {position: fixed;margin: auto;left: 0;right: 0;bottom:0px;width: 1400px;z-index:5;height:320px;background-repeat: no-repeat;display: none} ' +
						'.cm-dc-close {width: 80px;height: 80px;cursor: pointer;top: 20px; margin: auto;z-index:101;position: fixed; right:28px;background-repeat: no-repeat;} .cm-dc-close:hover {background-position: -80px} .cm-dc-close:active {background-position: -160px}' +
						'.cm-dc-close-small {width: 40px;height: 40px;cursor: pointer;top: 5px; margin: auto;z-index:101;position: fixed; right:5px;background-repeat: no-repeat;} .cm-dc-close-small:hover {background-position: -40px} .cm-dc-close-small:active {background-position: -80px}' +
						'.cm-dc-11logo-l {position:absolute;top:0;left:60px;bottom:0;right:0;margin:auto;cursor:pointer;display: inline-block;width:340px; height: 300px;background-repeat: no-repeat;z-index:99}' +
						'.cm-dc-11logo-r {position:absolute;top:0;bottom:0;right:40px;margin:auto;cursor:pointer;display: inline-block;width:340px; height: 300px;background-repeat: no-repeat;z-index:99}' +
						'.cm-dc-rocker {position:fixed;margin:auto;left:0;right:830px;bottom:-20px;z-index:32;width:160px;height: 270px;background-repeat: no-repeat;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-rocker-small {position:fixed;margin:auto;left:0;right:830px;bottom:-20px;z-index:40;width:80px;height: 148px;background-repeat: no-repeat;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-start-btn {cursor:pointer;position:fixed;margin:auto;left:0;right:0;bottom:7px;z-index:32;width:408px;height: 130px;background-repeat: no-repeat;} .cm-dc-start-btn:hover {background-position: -406px} .cm-dc-start-btn:active {background-position: -810px} ' +
						'.cm-dc-start-small-btn {cursor:pointer;position:fixed;margin:auto;left:0;right:0;bottom: 10px;z-index:40;width:204px;height: 65px;background-repeat: no-repeat;} .cm-dc-start-small-btn:hover {background-position: -203px} .cm-dc-start-small-btn:active {background-position: -405px} ' +
						'.cm-dc-upper {position: fixed;  margin: auto; top:0; left: 0;  right: 0;  width: 1180px;z-index:99;height:100px; cursor:pointer;}' +
						'.cm-dc-sign {position: absolute;  margin: auto; top:0; left: 0;  right: 0;  width: 480px;z-index:99;height:145px; cursor:pointer;background: url("' + resource.signImg + '") no-repeat}' +
						'.cm-dc-frame {top:15px;right:70px;position: relative;float:right; width: 102px;z-index:9;height:65px;background-repeat: no-repeat; background-image: url("' + resource.frameImg +
						'")}' +
						'.cm-dc-number-l {top:25px;left:10px;position: relative;float:right; width: 33px;z-index:9;height:40px;background-repeat: no-repeat;background-position-x: -360px;background-image: url("' + resource.numberImg +
						'")}' +
						'.cm-dc-number-r {top:25px;left:10px;position: relative;float:right; width: 33px;z-index:9;height:40px;background-repeat: no-repeat;background-image: url("' + resource.numberImg + '")}' +
						'.cm-bomb-class {top:0px;bottom:0px;left:0;right:0;margin:0 auto;position: fixed;z-index:89;min-width: 1180px;height: 100%;font-family: Helvetica, Arial, sans-serif; display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center; -webkit-box-pack: center; -ms-flex-pack: center;justify-content: center; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column;flex-direction: column;height: 100vh;} .cm-bomb-class canvas { border-radius: 8px;max-width: 100%;max-height: 100%;}' +
						'.simpleAlert {position: fixed;z-index: 100;margin:auto;top: 0;left: 0;right: 0;bottom: 0;width:1075px ;height:1050px;animation-name: zoomIn;-webkit-animation-name: zoomIn;-webkit-animation-duration: 2s;animation-duration: 2s;animation-delay: 0s;-webkit-animation-delay: 0s;animation-iteration-count:1;-webkit-animation-iteration-count:1;}' +
						'.simpleAlertShelter {position: fixed;width: 100%;height: 100%;top:0;left:0;background-color:#000;opacity:0.4;filter:alpha(opacity=50);z-index:99}' +
						'.simpleAlertBody {cursor:pointer;z-index:100;position:absolute;width:345px;height:317px;top:0;left:0;right:0;bottom:70px;margin:auto;}' +
						'.simpleAlertRed {cursor:pointer;z-index:100;position:absolute;width:345px;height:317px;top:0;left:0;right:0;margin:auto;background-repeat: no-repeat;background: url("' + resource.alertImg + '")}' +
						'.redAnimat {animation-name: swing;-webkit-animation-name: swing;-webkit-animation-duration: 1s;animation-duration: 1s;animation-delay: 2s;-webkit-animation-delay: 2s;animation-iteration-count: 1;-webkit-animation-iteration-count: 1;}' +
						'.redAnimated {animation-name: swing;-webkit-animation-name: swing;-webkit-animation-duration: 0.8s;animation-duration: 0.8s;animation-iteration-count: 1;-webkit-animation-iteration-count: 1;}' +
						'.simpleAlertBtn {position:absolute;width: 190px;height:80px;bottom:110px;cursor:pointer;}' +
						'.simpleAlertBtn1 {left:23.5%;bottom:-100px;background: url("' + resource.alertbtnImg + '") no-repeat} .simpleAlertBtn1:hover {background-position: -192px} .simpleAlertBtn1:active {background-position: -384px}' +
						'.simpleAlertHead {position:absolute;width:210px;height:90px;top:-100px;left:18.5%;cursor:pointer;background: url("' + resource.alertHeadImg + '") no-repeat}' +
						'.simpleAlertFlash {cursor:pointer;z-index:99;position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom:70px;width: 600px;height: 600px;background-repeat: no-repeat;animation: rotates 8s linear infinite;-moz-animation: rotates 8s linear infinite; -webkit-animation: rotates 8s linear infinite;-ms-animation: rotates 8s linear infinite;-o-animation: rotates 8s linear infinite;background-image: url("' + resource.alertFlashImg + '")}' +
						'@-webkit-keyframes zoomIn { 0% {  opacity: 0;  -webkit-transform: scale3d(.6, .6, .6);  -ms-transform: scale3d(.6, .6, .6);  transform: scale3d(.6, .6, .6);  } 50% {  opacity: 1;  -webkit-transform: scale3d(1.2, 1.2, 1.2);  -ms-transform: scale3d(1.2, 1.2, 1.2);  transform: scale3d(1.2, 1.2, 1.2);  } 80% {  opacity: 1;  -webkit-transform: scale3d(0.8, 0.8, 0.8);  -ms-transform: scale3d(0.8, 0.8, 0.8);  transform: scale3d(0.8, 0.8, 0.8);  } }  @keyframes zoomIn { 0% {  opacity: 0;  -webkit-transform: scale3d(.6, .6, .6);  -ms-transform: scale3d(.6, .6, .6);  transform: scale3d(.6, .6, .6);  } 50% {  opacity: 1;  -webkit-transform: scale3d(1.2, 1.2, 1.2);  -ms-transform: scale3d(1.2, 1.2, 1.2);  transform: scale3d(1.2, 1.2, 1.2);  } 80% {  opacity: 1;  -webkit-transform: scale3d(0.8, 0.8, 0.8);  -ms-transform: scale3d(0.8, 0.8, 0.8);  transform: scale3d(0.8, 0.8, 0.8);  } 100% {opacity: 1;  -webkit-transform: scale3d(1, 1, 1);  -ms-transform: scale3d(1, 1, 1);  transform: scale3d(1, 1, 1);}}  @-webkit-keyframes swing { 20% {  -webkit-transform: rotate3d(0, 0, 1, 15deg);transform: rotate3d(0, 0, 1, 15deg) } 40% {  -webkit-transform: rotate3d(0, 0, 1, -10deg); transform: rotate3d(0, 0, 1, -10deg)} 60% {-webkit-transform: rotate3d(0, 0, 1, 5deg);transform: rotate3d(0, 0, 1, 5deg)} 80% {-webkit-transform: rotate3d(0, 0, 1, -5deg);transform: rotate3d(0, 0, 1, -5deg)} 100% {-webkit-transform: rotate3d(0, 0, 1, 0deg); transform: rotate3d(0, 0, 1, 0deg) } }@keyframes swing { 20% {  -webkit-transform: rotate3d(0, 0, 1, 15deg);  -ms-transform: rotate3d(0, 0, 1, 15deg);transform: rotate3d(0, 0, 1, 15deg)} 40% {-webkit-transform: rotate3d(0, 0, 1, -10deg);-ms-transform: rotate3d(0, 0, 1, -10deg);transform: rotate3d(0, 0, 1, -10deg)} 60% {-webkit-transform: rotate3d(0, 0, 1, 5deg);-ms-transform: rotate3d(0, 0, 1, 5deg); transform: rotate3d(0, 0, 1, 5deg)} 80% {-webkit-transform: rotate3d(0, 0, 1, -5deg);-ms-transform: rotate3d(0, 0, 1, -5deg);transform: rotate3d(0, 0, 1, -5deg)} 100% {-webkit-transform: rotate3d(0, 0, 1, 0deg);-ms-transform: rotate3d(0, 0, 1, 0deg);transform: rotate3d(0, 0, 1, 0deg)}}' +
						'@-webkit-keyframes rotates{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}\n' +
						'@-ms-keyframes rotates{from{-ms-transform:rotate(0deg)}to{-ms-transform:rotate(360deg)}}\n' +
						'@-moz-keyframes rotates{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}\n' +
						'@-o-keyframes rotates{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(360deg)}}' +
						' @-webkit-keyframes cm-bom-rubberBand {0% {-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)}30% {-webkit-transform: scale3d(1.1, 1.1, 1);-ms-transform: scale3d(1.1, 1.1, 1);transform: scale3d(1.1, 1.1, 1)} 60% {-webkit-transform: scale3d(.75, 0.65, 1);-ms-transform: scale3d(.75, 0.65, 1);transform: scale3d(.75, 0.65, 1)} 100% {-webkit-transform: scale3d(1, 1, 1);-ms-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1)}} @keyframes cm-bom-rubberBand { 0% { -webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 30% {-webkit-transform: scale3d(1.1, 1.1, 1);-ms-transform: scale3d(1.1, 1.1, 1);transform: scale3d(1.1, 1.1, 1)}60% {-webkit-transform: scale3d(.75, 0.65, 1);-ms-transform: scale3d(.75, 0.65, 1);transform: scale3d(.75, 0.65, 1)} 100% {-webkit-transform: scale3d(1, 1, 1);-ms-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1)}} .cm-bom-rubberBand {-webkit-animation-duration: 2s;animation-duration: 2s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: cm-bom-rubberBand;animation-name: cm-bom-rubberBand; }';
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
						sign = document.createElement('div'),
						botImg = document.createElement('img'),
						lineImgL = document.createElement('img'),
						lineImgR = document.createElement('img');
					cmdc.className = 'cm-bomb-class'
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
					sign.className = 'cm-dc-sign';
					bot.style.backgroundImage = 'url(' + resource.botImg + ')'
					middle.style.backgroundImage = 'url(' + resource.middleImg + ')'
					bottombak.style.backgroundImage = 'url(' + resource.bottombakImg + ')'
					close.style.backgroundImage = 'url(' + resource.closeSmallImg + ')'
					rocker.style.backgroundImage = 'url(' + resource.rockerImg + ')'
					start.style.backgroundImage = 'url(' + resource.startBtnImg + ')'

					botImg.src = resource.botImg;
					botImg.style.width = '1180px';
					botImg.style.display = 'inline-block';
					lineImgL.src = resource.lineImg;
					lineImgL.style.width = '330px'
					lineImgL.style.height = '100%'
					lineImgL.style.left = '60px'
					lineImgL.style.position = 'relative'
					lineImgR.src = resource.lineImg;
					lineImgR.style.width = '330px'
					lineImgR.style.height = '100%'
					lineImgR.style.right = '60px'
					lineImgR.style.position = 'relative'
					var leftlogo = document.createElement('a'),
						rightlogo = document.createElement('a')
					leftlogo.className = 'cm-dc-11logo-l'
					rightlogo.className = 'cm-dc-11logo-r'
					leftlogo.style.backgroundImage = 'url(' + resource.logoLImg + ')'
					rightlogo.style.backgroundImage = 'url(' + resource.logoRImg + ')'
					// left.appendChild(leftlogo)
					// right.appendChild(rightlogo)
					// upper.appendChild(frame);
					// upper.appendChild(numberL);
					// upper.appendChild(sign);
					// upper.appendChild(numberR);
					// left.appendChild(lineImgL);
					// right.appendChild(lineImgR);
					// cmdc.appendChild(upper);
					// cmdc.appendChild(rocker);
					// cmdc.appendChild(bot);
					// cmdc.appendChild(left);
					// cmdc.appendChild(right);
					// cmdc.appendChild(middle);
					// cmdc.appendChild(close);
					// cmdc.appendChild(bottombak);
					// cmdc.appendChild(bottombak);
					// cmdc.appendChild(start);
					// cmdc.appendChild(bothsideBody);
					document.body.appendChild(cmdc);
				},
				show: function () {
					cmbombObj.botEL.style.display = 'block'
					cmbombObj.leftEL.style.display = 'block'
					cmbombObj.middleEL.style.display = 'block'
					cmbombObj.bottombakEL.style.display = 'block'
					cmbombObj.botEL.style.bottom = '-60px'
					cmbombObj.botEL.classList.toggle('move_upper')
					CMBOMB.isIE && (cmbombObj.middleEL.style.cursor = 'pointer')
					cmbombObj.changeRocker()
				},
				changeRocker: function(){
					cmbombObj.si = setInterval(function () {
						var x = cmbombObj.rockerEL.style.backgroundPositionX
						cmbombObj.rockerEL.style.backgroundPositionX = x === '0px' ? '-166px' : '0px'
					}, CMBOMB.timeout * 0.6)
				},
				changeRockerSmall: function(){
					cmbombObj.sis = setInterval(function () {
						var x = cmbombObj.rockerEL.style.backgroundPositionX
						cmbombObj.rockerEL.style.backgroundPositionX = x === '0px' ? '-83px' : '0px'
					}, CMBOMB.timeout * 0.6)
				}
			}
			cmbombObj.init(resource);
			cmbombObj.rootEL = cmbombObj.$(".cm-bomb-class")
			cmbombObj.botEL = cmbombObj.$(".cm-dc-bottom")
			cmbombObj.leftEL = cmbombObj.$(".cm-dc-left")
			cmbombObj.middleEL = cmbombObj.$(".cm-dc-middle")
			cmbombObj.bottombakEL = cmbombObj.$(".cm-dc-bottom-bak")
			cmbombObj.rockerEL = cmbombObj.$(".cm-dc-rocker")
			cmbombObj.buttonEL = cmbombObj.$(".cm-dc-start-btn")
			cmbombObj.closeEL = cmbombObj.$(".cm-dc-close")
			// cmbombObj.show();

			window.cmbombObj = cmbombObj;
		},
		addEvent: function(obj, event, fun){
			if(obj.addEventListener)
				obj.addEventListener(event, fun, false);
			else if(obj.attachEvent)
				obj.attachEvent("on"+event, fun, false);
			return false;
		},
		removeEvent: function (e, type, func, flag) {
			if (e.removeEventListener) {
				e.removeEventListener(type, func, flag || false);
			} else if (e.detachEvent) {
				e.detachEvent("on" + type, func, flag || false);
			} else {
				e["on" + type] = null;
			}
		},
		mmFunc: function(){
			console.log('mmFunc')
			CMBOMB.removeEvent(document, 'mousemove', CMBOMB.mmFunc)
			//开始
			CMBOMB.play()
		},
		dosomethingforbkg: function(){

		}
	};

	window.CMBOMB = CMBOMB;

	// if(CMBOMB.Interface.ready()) {
		try {
			// if (cmdcCookie('cmbombg') === '1') {
			// 	CMBOMB.Interface.close('cookie')
			// 	return
			// }
			CMBOMB.loadSource();
			CMBOMB.dosomethingforbkg()
			setTimeout(function () {
				//建立游戏周边场景
				CMBOMB.buildWalls();
				//绑定鼠标移动事件
				CMBOMB.addEvent(document, 'mousemove', CMBOMB.mmFunc)
			}, CMBOMB.timeout);

		} catch (e) {
			console.log('error', e)
			CMBOMB.Interface.error()
		}
	// }
})();

var CMBOMBG = CMBOMBG || {};

CMBOMBG.do = function() {
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
	//动画结束
	CMBOMBG.do.canvasELAnimationEnd =  function(){
		World.remove(world, vertices);
		explosion(engine)
		setTimeout(function(){
			var alert = cmdcAlert({
				"buttons": {
					"gotmall": function () {

					}
				}
			})
			//当物品掉落到底部后，就清除所有
			setTimeout(function () {
				World.clear(world)
			}, CMBOMB.timeout* 8)
		}, 100)
	}

	Render.run(render);
	Runner.run(runner, engine);

	$(svg_data).find('path').each(function(i, path) {
		vertexSets.push(Svg.pathToVertices(path, 30));
	});

	vertices = Bodies.fromVertices(400, 500, vertexSets, {
		isStatic: true,
		render: {
			fillStyle: 'transparent',
			strokeStyle: 'transparent',
			lineWidth: 0
		}
	}, true);

	CMBOMBG.do.criteria = {
		x: 270,
		y: -2700,
		column: 2,
		row: 60,
		sides: 8,
		radius: 15
	}
	stacks = Composites.stack(CMBOMBG.do.criteria.x, CMBOMBG.do.criteria.y, CMBOMBG.do.criteria.column, CMBOMBG.do.criteria.row, 3, 5, function(x, y, column, row, lastBody, i) {
		if (Query.point([vertices], { x: x, y: y }).length === 0) {
			return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
				label: 'stack',
				frictionAir: .02,
				friction: 0.01,
				restitution: 0.05, //恢复原状
				mass: 1,
				timeScale: 1.1,
				render: {
					fillStyle: [ "#4285F4", "#EA4335", "#FBBC05", "#ff5f00", '#66DD00'][Math.round(Math.random() * 4)]
				}
			});
		}
	})

	World.add(world, vertices);
	World.add(world, stacks);

	Events.on(engine, 'afterUpdate', function(event) {
		var bodies = Composite.allBodies(engine.world),
			body = bodies[1] //下落的最后元素

		//svg顶部到上层的距离
		var verticeTop = 100
		if(body.position.y >= verticeTop && body.label==='stack'){
			console.log('body', body)
			$('canvas').addClass('cm-bom-rubberBand')
			var rubberBand = $('.cm-bom-rubberBand')[0]
			CMBOMB.addEvent(rubberBand, 'animationend', CMBOMBG.do.canvasELAnimationEnd)
			CMBOMB.addEvent(rubberBand, 'webkitAnimationEnd', CMBOMBG.do.canvasELAnimationEnd)
			Events.off(engine, 'afterUpdate')
		}
	})

	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 900 }
	});

	function enginRun() {
		window.requestAnimationFrame(enginRun);
		Engine.update(engine, 1000 / 60, 1);
	}
	// enginRun()

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
