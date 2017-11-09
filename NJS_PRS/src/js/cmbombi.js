

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

var cmbombAlert=function(e){var t={closeAll:!1,content:"",buttons:{}},l=$.extend(t,e),n={},s=$('<div class="simpleAlert">'),i=$('<div class="simpleAlertShelter">'),c=$('<div class="simpleAlertBody">'),red=$('<div class="simpleAlertRed redAnimat">'),o=$('<img class="simpleAlertBodyClose" height="14" width="14"/>');return n.init=function(){for(var e=0,t=!1,n=[],o=0;o<2;o++)for(var p in l.buttons)switch(o){case 0:n.push(p);break;case 1:t=n.length<=1,e++;var r=$('<a class="simpleAlertBtn simpleAlertBtn'+e+'">'+"</a>");var f=$('<div class="simpleAlertFlash'+'">'+"</div>");var h=$('<div class="simpleAlertHead'+'">'+"</div>");r.bind("click", l.buttons[p]), s.bind("click", l.buttons[p]),
	coin1 = document.createElement('div'),
	coin2 = document.createElement('div'),
	coin3 = document.createElement('div'),
	coin4 = document.createElement('div'),
	coin5 = document.createElement('div'),
	coin6 = document.createElement('div'),
	coin7 = document.createElement('div'),
	coin8 = document.createElement('div'),
	coin1.className = 'cm-coin1',
	coin2.className = 'cm-coin2',
	coin3.className = 'cm-coin3',
	coin4.className = 'cm-coin4',
	coin5.className = 'cm-coin5',
	coin6.className = 'cm-coin6',
	coin7.className = 'cm-coin7',
	coin8.className = 'cm-coin8',

	s.bind("mouseover mouseout", function(event) {
		if (event.type === "mouseover") {
			// red.toggleClass('redAnimated');
			CMBOMBG.do.disappearSTO && clearTimeout(CMBOMBG.do.disappearSTO)
		} else if (event.type === "mouseout") {
			// red.hasClass('redAnimat') && red.removeClass('redAnimat');
			// red.hasClass('redAnimated') && red.removeClass('redAnimated');
			CMBOMBG.do.disappear()
		}
	}),
	s.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
		red.hasClass('redAnimat') && red.removeClass('redAnimat');
		red.hasClass('redAnimated') && red.removeClass('redAnimated');
		// red.addClass('cm-bom-rotateY')
	}),
	c.append(red),
		c.append(coin1).append(coin2).append(coin3).append(coin4).append(coin5).append(coin6).append(coin7).append(coin8)
		// .append(r)
		// .append(h)
}
s.append(c)
	// .append(f)
	,$("body")
		.append(s)
		.append(i)
	,c.show().animate({ opacity:"1"}, 350)},o.bind("click",function(){l.closeAll=!1,n.close()}),n.close=function(){$(".simpleAlert").remove()},n.init(),n};


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
	window.cmbombCookie = cookie;
})();

(function() {
	var CMBOMB = {
		sourceLinkRoot: '//localhost:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//10.20.240.179:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//act.cmcmcdn.com/1111/bigbang/NJS_PRS/output/',
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
			removejscssfile(sourceLinkRoot + "js/decomp.js", 'js')
			removejscssfile(sourceLinkRoot + "js/pathseg.js", 'js')
			removejscssfile(sourceLinkRoot + "js/matter.js", 'js')
			removejscssfile(sourceLinkRoot + "js/cmbombi.js", 'js')
			removejscssfile(sourceLinkRoot + "js/jquery-1.11.0.min.js", 'js')
		},
		Interface: {
			close: function (action) {
				try {
					if (action === 'receive') {
						bigBomb && bigBomb.receive();
					} else {
						bigBomb && bigBomb.gameOver();
						CMBOMB.Interface.reportClose(action);
					}
				} catch (e) {
					console.log('error',e)
					bigBomb && bigBomb.error()
				}
			},
			ready: function () {
				if (window.requestAnimationFrame) {
					try {
						bigBomb && bigBomb.ready();
					} catch (e) {
						bigBomb && bigBomb.error()
						CMBOMB.Interface.reportClose('error-exit')
						console.log('error',e)
					}
					return true;
				}
				// 浏览器版本过低
				try {
					bigBomb && bigBomb.notSupport();
				} catch (e) {
					bigBomb && bigBomb.error()
					CMBOMB.Interface.reportClose('error-exit')
					console.log('error',e)
				}
				CMBOMB.Interface.reportShow('not-support');
				return false;
			},
			click: function () {
				try {
					bigBomb && bigBomb.receive();
				} catch (e) {
					bigBomb && bigBomb.error()
					CMBOMB.Interface.reportClose('error-exit')
					console.log('error',e)
				}
			},
			error: function () {
				try {
					bigBomb && bigBomb.error();
				} catch (e) {
					bigBomb && bigBomb.error()
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
				data.w = 'coinboom';
				data.cid = '57471519';
				try {
					bigBomb && bigBomb.report(data);
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
				middleImg: sourceLinkRoot + 'img/bomb/head.png',
				closeImg: sourceLinkRoot + 'img/bomb/close.png',
				alertImg: sourceLinkRoot + 'img/bomb/red.gif',
				// alertImg: sourceLinkRoot + 'img/bomb/red.png',
				alertbtnImg: sourceLinkRoot + 'img/alertbtn.png',
				alertFlashImg: sourceLinkRoot + 'img/flash.png',
				alertHeadImg: sourceLinkRoot + 'img/nice.png',
				backflash: sourceLinkRoot + 'img/bomb/backflash.png',
				flash: sourceLinkRoot + 'img/bomb/flash.png',
				coin1: sourceLinkRoot + 'img/bomb/side/1.png',
				coin2: sourceLinkRoot + 'img/bomb/side/2.png',
				coin3: sourceLinkRoot + 'img/bomb/side/3.png',
				coin4: sourceLinkRoot + 'img/bomb/side/4.png',
				coin5: sourceLinkRoot + 'img/bomb/side/5.png',
				coin6: sourceLinkRoot + 'img/bomb/side/6.png',
				coin7: sourceLinkRoot + 'img/bomb/side/7.png',
				coin8: sourceLinkRoot + 'img/bomb/side/8.png',
			}
			var cmbombObj = {
				rootEL: {},
				leftEL: {},
				middleEL: {},
				redEL: {},
				$: function (className) {
					return document.querySelector(className);
				},
				init: function (resource) {
					cmbombObj.createDom(resource)
				},
				createDom: function (resource) {
					var cssStr =
						'.cm-bomb-middle {z-index:21;position:fixed;margin:auto;top: 15px;left: 25px;right: 0;bottom: 0;min-width:1160px;background-repeat: no-repeat;background-position: center top;width:400px;height:300px;display: none; cursor:pointer}' +
						'.cm-bomb-middle-backflash {z-index:20;position:fixed;margin:auto;top: 0;left:35px;right: 0;bottom: 0;min-width:1160px;background-repeat: no-repeat;background-position: center top;width:455px;height:1000px;display: none; cursor:pointer; background: url("' + resource.backflash + '") no-repeat}' +
						'.cm-bomb-middle-flash {z-index:23;position:fixed;margin:auto;top: 0;left:35px;right: 0;bottom: 0;min-width:1160px;background-repeat: no-repeat;background-position: center top;width:455px;height:900px;display: none; cursor:pointer; background: url("' + resource.flash + '") no-repeat}' +
						'.cm-dc-close {width: 80px;height: 80px;cursor: pointer;top: 20px; margin: auto;z-index:101;position: fixed; right:28px;background-repeat: no-repeat;} .cm-dc-close:hover {background-position: -80px} .cm-dc-close:active {background-position: -160px}' +
						'.cm-dc-close-small {width: 40px;height: 40px;cursor: pointer;top: 5px; margin: auto;z-index:101;position: fixed; right:5px;background-repeat: no-repeat;} .cm-dc-close-small:hover {background-position: -40px} .cm-dc-close-small:active {background-position: -80px}' +
						'.cm-dc-11logo-l {position:absolute;top:0;left:60px;bottom:0;right:0;margin:auto;cursor:pointer;display: inline-block;width:340px; height: 300px;background-repeat: no-repeat;z-index:99}' +
						'.cm-dc-11logo-r {position:absolute;top:0;bottom:0;right:40px;margin:auto;cursor:pointer;display: inline-block;width:340px; height: 300px;background-repeat: no-repeat;z-index:99}' +
						'.cm-bomb-class {cursor:pointer;top:0px;bottom:0px;left:0;right:0;margin:0 auto;position: fixed;z-index:89;width: 1180px;height: 100%;font-family: Helvetica, Arial, sans-serif; display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center; -webkit-box-pack: center; -ms-flex-pack: center;justify-content: center; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column;flex-direction: column;height: 100vh;} .cm-bomb-class canvas { border-radius: 8px;cursor: pointer;}' +
						'.simpleAlert {position: fixed;z-index: 100;margin:auto;top: 0;left: 0;right: 0;bottom: 0;width:1075px ;height:1050px;animation-name: zoomIn;-webkit-animation-name: zoomIn;-webkit-animation-duration: 1s;animation-duration: 1s;animation-delay: 0s;-webkit-animation-delay: 0s;animation-iteration-count:1;-webkit-animation-iteration-count:1;cursor:pointer}' +
						'.simpleAlertShelter {position: fixed;width: 100%;height: 100%;top:0;left:0;background-color:#000;opacity:0.3;filter:alpha(opacity=50);z-index:99}' +
						'.simpleAlertBody {cursor:pointer;z-index:100;position:absolute;width:345px;height:317px;top:0;left:0;right:0;bottom:70px;margin:auto;perspective:1000px}' +
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
						' @-webkit-keyframes cm-bom-rubberBand {0% {-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 60% {-webkit-transform: scale3d(1.2, 1.2, 1);-ms-transform: scale3d(1.2, 1.2, 1);transform: scale3d(1.2, 1.2, 1)} 100% {-webkit-transform: scale3d(1, 1, 1);-ms-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1)}} @keyframes cm-bom-rubberBand { 0% { -webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 60% {-webkit-transform: scale3d(1.2, 1.2, 1);-ms-transform: scale3d(1.2, 1.2, 1);transform: scale3d(1.2, 1.2, 1)} 100% {-webkit-transform: scale3d(1, 1, 1);-ms-transform: scale3d(1, 1, 1);transform: scale3d(1, 1, 1)}} .cm-bom-rubberBand {-webkit-animation-duration: 1.5s;animation-duration: 1.5s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: cm-bom-rubberBand;animation-name: cm-bom-rubberBand; }' +
						'@-webkit-keyframes rotateY { 0% { -webkit-transform: rotateY(0deg); -ms-transform: rotateY(0deg); transform: rotateY(0deg)} 30% {-webkit-transform: rotateY(45deg);-ms-transform: rotateY(45deg);transform: rotateY(45deg)}60% {-webkit-transform: rotateY(0deg);-ms-transform: rotateY(0deg);transform: rotateY(0deg)} 100% {-webkit-transform: rotateY(-45deg);-ms-transform: rotateY(-45deg);transform: rotateY(-45deg)}} @keyframes rotateY { 0% { -webkit-transform: rotateY(0deg); -ms-transform: rotateY(0deg); transform: rotateY(0deg)} 30% {-webkit-transform: rotateY(45deg);-ms-transform: rotateY(45deg);transform: rotateY(45deg)}60% {-webkit-transform: rotateY(0deg);-ms-transform: rotateY(0deg);transform: rotateY(0deg)} 100% {-webkit-transform: rotateY(-45deg);-ms-transform: rotateY(-45deg);transform: rotateY(-45deg)}} .cm-bom-rotateY {-webkit-animation-duration: 2s;animation-duration: 2s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: rotateY;animation-name: rotateY; }' +
						'@-webkit-keyframes flash { 0% {  opacity: 0  } 50% {  opacity: 0.6  } 100% { opacity: 0  }}  @keyframes flash { 0% {  opacity: 0  } 50% {  opacity: 0.6  } 100% { opacity: 0  } }  .flash {  -webkit-animation-name: flash;  animation-name: flash; -webkit-animation-duration: 1s;  animation-duration: 1s;  -webkit-animation-fill-mode: both;  animation-fill-mode: both;}' +
						' @-webkit-keyframes cm-bom-head-fadeout {0% { opacity: 1;-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 100%{ opacity: 0;-webkit-transform: scale3d(4, 4, 1);-ms-transform: scale3d(4, 4, 1);transform: scale3d(4, 4, 1)}} @keyframes cm-bom-head-fadeout {0% { opacity: 1;-webkit-transform: scale3d(1, 1, 1); -ms-transform: scale3d(1, 1, 1); transform: scale3d(1, 1, 1)} 100%{ opacity: 0;-webkit-transform: scale3d(4, 4, 1);-ms-transform: scale3d(4, 4, 1);transform: scale3d(4, 4, 1)}} ' +
						'.cm-bom-head-fadeout {-webkit-animation-duration: 1.5s;animation-duration: 1.5s;-webkit-animation-fill-mode: both;animation-fill-mode: both;-webkit-animation-name: cm-bom-head-fadeout;animation-name: cm-bom-head-fadeout; }' +
						'.cm-coin1{z-index:2;width: 105px; height: 60px; position: absolute; margin:auto; top: 0;left:-507px;right: 0;bottom: 183px;  background: url("' + resource.coin1 + '") no-repeat;}\n' +
						'\t.cm-coin2{z-index:2;width: 105px; height: 60px; position: absolute; margin:auto; top: 0;left:-357px;right: 0;bottom: 360px;  background: url("' + resource.coin2 + '") no-repeat;}\n' +
						'\t.cm-coin3{z-index:2;width: 105px; height: 90px; position: absolute; margin:auto; top: 200px;left:-354px;right: 0;bottom: 0; background: url("' + resource.coin3 + '") no-repeat;}\n' +
						'\t.cm-coin4{z-index:100;width: 105px; height: 60px; position: absolute; margin:auto; top: 0;left:-207px;right: 0;bottom: 183px;  background: url("' + resource.coin4 + '") no-repeat;}\n' +
						'\t.cm-coin5{z-index:2;width: 105px; height: 52px; position: absolute; margin:auto; top: 0;left:-62px;right: 0;bottom: 450px;  background: url("' + resource.coin5 + '") no-repeat;}\n' +
						'\t.cm-coin6{z-index:100;width: 105px; height: 52px; position: absolute; margin:auto; top: 0;left:154px;right: 0;bottom: 322px;  background: url("' + resource.coin6 + '") no-repeat;}\n' +
						'\t.cm-coin7{width: 60px;  height: 52px;  position: absolute;  margin:auto;  top: 0;left: 270px;right: 0;bottom: 130px;  background: url("' + resource.coin7 + '") no-repeat;}\n' +
						'\t.cm-coin8{width: 100px;  height: 80px;  position: absolute;  margin:auto;  top: 0;left: 374px;right: 0;bottom: 340px;  background: url("' + resource.coin8 + '") no-repeat;}' +
						'.cm-bomb-close {width: 30px;height: 30px;cursor: pointer;top:10px; margin: auto;z-index:101;position: fixed; right:60px;background: url("' + resource.closeImg + '") no-repeat;display:none} .cm-bomb-close:hover {background-position: -30px} .cm-bomb-close:active {background-position: -60px}';
					var cssStyle = {};
					cssStyle = document.createElement('style');
					cssStyle.type = 'text/css';
					cssStyle.innerHTML = cssStr;
					document.getElementsByTagName('HEAD').item(0).appendChild(cssStyle);
					var cmbomb = document.createElement('div'),
						middle = document.createElement('div'),
						backFlash = document.createElement('div')
						flash = document.createElement('div')
						closeEl = document.createElement('div');

					cmbomb.className = 'cm-bomb-class'
					middle.className = 'cm-bomb-middle'
					backFlash.className = 'cm-bomb-middle-backflash'
					flash.className = 'cm-bomb-middle-flash'
					closeEl.className = 'cm-bomb-close'

					middle.style.backgroundImage = 'url(' + resource.middleImg + ')'

					cmbomb.appendChild(flash);
					cmbomb.appendChild(middle);
					cmbomb.appendChild(backFlash);
					document.body.appendChild(cmbomb);
					document.body.appendChild(closeEl);
				},
			}
			cmbombObj.init(resource);
			cmbombObj.rootEL = cmbombObj.$(".cm-bomb-class")
			cmbombObj.middleEL = cmbombObj.$(".cm-bomb-middle")
			cmbombObj.closeEL = cmbombObj.$(".cm-dc-close")

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
			// if (cmbombCookie('cmbombg') === '1') {
			// 	CMBOMB.Interface.close('cookie')
			// 	return
			// }
			CMBOMB.loadSource();
			// CMBOMB.dosomethingforbkg()
			setTimeout(function () {
				//建立游戏周边场景
				CMBOMB.buildWalls()
				//绑定鼠标移动事件
				CMBOMB.addEvent(document, 'mousemove', CMBOMB.mmFunc)
			}, CMBOMB.timeout)
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
		stacksLeft,
		stacksRight,
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
				if(body.isStatic)
					Body.setStatic(body, false);
				if (body.position.y) {
					var forceMagnitude = 0.06* body.mass;
					var x = (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([2, -1.5]),
					y = -forceMagnitude + Common.random() * -forceMagnitude - 0.012
					Body.applyForce(body, body.position, {
						x: x,
						y: y
					});
				}
			}
		}
	};
	//动画结束
	CMBOMBG.do.canvasELAnimationEnd =  function(){
		//炸
		$('.cm-bomb-middle-backflash') && $('.cm-bomb-middle-backflash').css('display', 'none')
		$('.cm-bomb-middle') && $('.cm-bomb-middle').addClass('cm-bom-head-fadeout')
		var headFadeout = $('.cm-bom-head-fadeout')[0]

		setTimeout(function () {
			CMBOMBG.do.showRed()
		}, 800)

		// CMBOMB.addEvent(headFadeout, 'animationend', CMBOMBG.do.headFadeoutAnimationEnd)
		// CMBOMB.addEvent(headFadeout, 'webkitAnimationEnd', CMBOMBG.do.headFadeoutAnimationEnd)

		CMBOMBG.do.setBodiesVisible(engine, true)
		World.remove(world, vertices);
		explosion(engine)
		//减慢金币掉落的速度
		setTimeout(function () {
			CMBOMBG.do.setBodiesTimeScale(engine, 0.45)
		}, 300)
	}

	CMBOMBG.do.flashELAnimationEnd =  function(){
		//周边展示
		// World.add(world, [body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12, body13, body14, body15, body16, body17, body18, body19])
		// $('canvas') && $('canvas').addClass('cm-bom-rubberBand')
		// var rubberBand = $('.cm-bom-rubberBand')[0]
		// CMBOMB.addEvent(rubberBand, 'animationend', CMBOMBG.do.canvasELAnimationEnd)
		// CMBOMB.addEvent(rubberBand, 'webkitAnimationEnd', CMBOMBG.do.canvasELAnimationEnd)

		//流入上报
		CMBOMB.Interface.reportShow('show')
	}

	CMBOMBG.do.showRed =  function(){
		//红包出现
		CMBOMBG.do.alert = cmbombAlert({
			"buttons": {
				"gotmall": function () {
					window.open(CMBOMB.tmallLink)
					CMBOMBG.do.closeFun('receive')
					CMBOMB.Interface.reportClick('click2', 1)
				}
			}
		})
		CMBOMBG.do.disappear()
		//当物品掉落到底部后，就清除所有
		CMBOMBG.do.sto8 = setTimeout(function () {
			World.clear(world)
			//销毁canvas对象
			$('.cm-bomb-class') && $('.cm-bomb-class').remove()
		}, CMBOMB.timeout* 8)
		//红包展示上报
		CMBOMB.Interface.reportShow('red')
		//关闭按钮出现
		$('.cm-bomb-close') && $('.cm-bomb-close').css('display', 'block')
		// $('.cm-bomb-middle-backflash') && $('.cm-bomb-middle-backflash').css('display', 'block')
		//
		// var count = 1
		// var red = document.getElementsByClassName('simpleAlertRed')[0]
		// var is20 = false, is1 = true
		// function rafcallback() {
		// 	if(count > 20 || is20) {
		// 		is20 = true
		// 		is1 = false
		// 		if(count === 2){
		// 			is20 = false
		// 			is1 = true
		// 		}
		// 		red.style.backgroundImage = 'url(' + CMBOMB.sourceLinkRoot + 'img/bomb/red/1_000' + count-- + '.png)'
		// 		G = requestAnimationFrame(rafcallback)
		// 	}else if(count < 1 || is1) {
		// 		is20 = false
		// 		is1 = true
		// 		if(count === 19){
		// 			is20 = true
		// 			is1 = false
		// 		}
		// 		red.style.backgroundImage = 'url(' + CMBOMB.sourceLinkRoot + 'img/bomb/red/1_000' + count++ + '.png)'
		// 		G = requestAnimationFrame(rafcallback)
		// 	}
		// }
		// requestAnimationFrame(rafcallback);
	}

	//绑定事件
	CMBOMBG.do.bindEvents = function() {
		//点击金币
		$('.cm-bomb-class').bind('click', function (event) {
			window.open(CMBOMB.tmallLink)
			CMBOMBG.do.closeFun('receive')
			CMBOMB.Interface.reportClick('click1', 1)
		})
		//关闭按钮
		$('.cm-bomb-close').bind('click', function(){
			CMBOMBG.do.closeFun('exit2')
		})
	}
	CMBOMBG.do.bindEvents()

	CMBOMBG.do.unbindEvents = function(){
		$('.cm-bomb-class').unbind('click')
		$('.cm-bomb-close').unbind('click')
	}

	CMBOMBG.do.clickFun = function(action){
		CMBOMB.Interface.reportClick(action)
	}

	//关闭方法
	CMBOMBG.do.closeFun = function(action) {
		action !== 'disappear' && cmbombCookie.setToday('cmbombg', 1);

		CMBOMBG.do.disappearSTO && clearTimeout(CMBOMBG.do.disappearSTO)
		CMBOMBG.do.sto8 && clearTimeout(CMBOMBG.do.sto8)

		//清除事件
		cancelAnimationFrame(CMBOMBG.do.raf)
		//清除加载的文件
		CMBOMB.clearSource()
		World.clear(world)
		$('.cm-bomb-class') && $('.cm-bomb-class').remove()
		$('.simpleAlertShelter') && $('.simpleAlertShelter').remove()
		$('.cm-bomb-close') && $('.cm-bomb-close').remove()

		CMBOMBG.do.unbindEvents()
		//关闭弹窗红包
		CMBOMBG.do.alert && CMBOMBG.do.alert.close()

		CMBOMB.Interface.close(action)
	}

	//自动消失
	CMBOMBG.do.disappear = function(){
		CMBOMBG.do.disappearSTO = setTimeout(function(){
			CMBOMBG.do.alert && CMBOMBG.do.closeFun('disappear')
		}, 1000* 30)
	}

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
			lineWidth: 5
		}
	}, true);

	//创建周边金块
	var scaleVal = 1
	var body1 = Bodies.circle(370, 260, 20, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/9.png'
		}} })
	var body2 = Bodies.circle(452, 260, 20, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/11.png'
		}} })

	var body3 = Bodies.circle(263, 220, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/5.png'
		}} })
	var body4 = Bodies.circle(339, 220, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/7.png'
		}} })
	var body5 = Bodies.circle(413, 220, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/10.png'
		}} })
	var body6 = Bodies.circle(491, 220, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/13.png'
		}} })
	var body7 = Bodies.circle(570, 220, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/15.png'
		}} })

	var body8 = Bodies.circle(308, 180, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/6.png'
		}} })
	var body9 = Bodies.circle(370, 165, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/8.png'
		}} })
	var body10 = Bodies.circle(455, 165, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/12.png'
		}} })
	var body11 = Bodies.circle(524, 180, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/14.png'
		}} })

	var body12 = Bodies.circle(173, 230, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/4.png'
		}} })
	var body13 = Bodies.circle(170, 281, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/3.png'
		}} })
	var body14 = Bodies.circle(120, 315, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/1.png'
		}} })
	var body15 = Bodies.circle(160, 355, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/2.png'
		}} })

	var body16 = Bodies.circle(638, 230, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/16.png'
		}} })
	var body17 = Bodies.circle(644, 281, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/17.png'
		}} })
	var body18 = Bodies.circle(698, 315, 12, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/19.png'
		}} })
	var body19 = Bodies.circle(660, 355, 18, { isStatic: true, render: {
		sprite: {
			xScale: scaleVal,
			yScale: scaleVal,
			texture: CMBOMB.sourceLinkRoot + 'img/bomb/rect/18.png'
		}} })

	CMBOMBG.do.criteria = {
		y: -2100,
		column: 1,
		row: 85,
		sides: 8,
		radius: 12
	}
	CMBOMBG.do.createCoin = function(x){
		return Composites.stack(x, CMBOMBG.do.criteria.y, CMBOMBG.do.criteria.column, CMBOMBG.do.criteria.row, 3, 5, function(x, y, column, row, lastBody, i) {
			var label = 'stack',
				frictionAir = 0.03,
				friction = 0.0001,
				restitution = 0.001, //恢复原状
				mass = 0.6,
				timeScale = 0.8,
				scale = 0.3
			if (Query.point([vertices], { x: x, y: y }).length === 0) {
				if (Common.random() < 0.1) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin1.png'
							}
						}
					});
				}else if (Common.random() > 0.1 && Common.random() < 0.2) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin2.png'
							}
						}
					});
				}else if (Common.random() > 0.2 && Common.random() < 0.3) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin3.png'
							}
						}
					});
				}else if (Common.random() > 0.3 && Common.random() < 0.4) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin4.png'
							}
						}
					});
				}else if (Common.random() > 0.4 && Common.random() < 0.5) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius-4, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin5.png'
							}
						}
					});
				}else if (Common.random() > 0.5 && Common.random() < 0.6) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius-4, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin6.png'
							}
						}
					});
				}else if (Common.random() > 0.6 && Common.random() < 0.7) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin7.png'
							}
						}
					});
				}else if (Common.random() > 0.7 && Common.random() < 0.8) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin8.png'
							}
						}
					});
				}else if (Common.random() > 0.8 && Common.random() < 0.9) {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin9.png'
							}
						}
					});
				}else {
					return Bodies.polygon(x, y, CMBOMBG.do.criteria.sides, CMBOMBG.do.criteria.radius, {
						label: label,
						frictionAir: frictionAir,
						friction: friction,
						restitution: restitution, //恢复原状
						mass: mass,
						timeScale: timeScale,
						render: {
							sprite: {
								xScale: scale,
								yScale: scale,
								texture: CMBOMB.sourceLinkRoot + 'img/bomb/coin1.png'
							}
						}
					});
				}
			}
		})
	}

	//设置金币消失
	CMBOMBG.do.setBodiesVisible = function(engine, bool){
		var bodies = Composite.allBodies(engine.world),
			body
		for (var i = 0; i < bodies.length; i++) {
			body = bodies[i]
			if (body.label === 'stack') {
				body.render.visible = bool
				body.frictionAir = 0.02
			}
		}
	}
	CMBOMBG.do.setBodiesTimeScale = function(engine, value){
		var bodies = Composite.allBodies(engine.world),
			body
		for (var i = 0; i < bodies.length; i++) {
			body = bodies[i]
			if (body.label === 'stack') {
				body.timeScale = value
				// body.render.sprite.xScale = 0.2
				// body.render.sprite.yScale = 0.2
			}
		}
	}
	//设置静态
	CMBOMBG.do.setBodiesStatic = function(engine, bool){
		var bodies = Composite.allBodies(engine.world),
			body
		for (var i = 0; i < bodies.length; i++) {
			body = bodies[i]
			if (body.label === 'Circle Body') {
				Body.setStatic(body, bool);
			}
		}
	}

	stacksLeft = CMBOMBG.do.createCoin(230)
	stacksRight = CMBOMBG.do.createCoin(560)

	World.add(world, vertices);
	World.add(world, stacksLeft);
	World.add(world, stacksRight);

	Events.on(engine, 'afterUpdate', function(event) {
		var bodies = Composite.allBodies(engine.world),
			body = bodies[1] //下落的最后元素
		//svg顶部到上层的距离
		var verticeTop = 250
		if(body.position.y >= verticeTop && body.label==='stack'){
			$('.cm-bomb-middle-flash') && $('.cm-bomb-middle-flash').css('display', 'block') && $('.cm-bomb-middle-flash').addClass('flash')
			// $('canvas').addClass('cm-bom-rubberBand')
			var flash = $('.cm-bomb-middle-flash')[0]

			//金币消失
			setTimeout(function () {
				CMBOMBG.do.setBodiesVisible(engine, false)
				setTimeout(function () {
					//中部天猫头出现
					$('.cm-bomb-middle') && $('.cm-bomb-middle').css('display', 'block')
					$('.cm-bomb-middle-backflash') && $('.cm-bomb-middle-backflash').css('display', 'block')
				}, 0)

				World.add(world, [body1, body2, body3, body4, body5, body6, body7, body8, body9, body10, body11, body12, body13, body14, body15, body16, body17, body18, body19])
				$('canvas') && $('canvas').addClass('cm-bom-rubberBand')
				var rubberBand = $('.cm-bom-rubberBand')[0]
				CMBOMB.addEvent(rubberBand, 'animationend', CMBOMBG.do.canvasELAnimationEnd)
				CMBOMB.addEvent(rubberBand, 'webkitAnimationEnd', CMBOMBG.do.canvasELAnimationEnd)
			}, 50)

			CMBOMB.addEvent(flash, 'animationend', CMBOMBG.do.flashELAnimationEnd)
			CMBOMB.addEvent(flash, 'webkitAnimationEnd', CMBOMBG.do.flashELAnimationEnd)
			Events.off(engine, 'afterUpdate')
		}
	})

	Render.lookAt(render, {
		min: { x: 0, y: 0 },
		max: { x: 800, y: 800 }
	});

	function enginRun() {
		CMBOMBG.do.raf = window.requestAnimationFrame(enginRun);
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
