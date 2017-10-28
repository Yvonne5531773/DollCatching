
(function() {
	var CMDC = {
		sourceLinkRoot: '//localhost:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//10.20.240.179:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//act.cmcmcdn.com/dollcatching/NJS_PRS/output/',
		tmallLink: '//s.click.taobao.com/yxl72Zw',
		dc: {},
		playAgain: false,
		timeout: 1000,
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

			oHead.appendChild(pfScript);
			oHead.appendChild(mScript);
			setTimeout(function () {
				oHead.appendChild(mainScript);
				typeof jQuery === 'undefined' && oHead.appendChild(jquery);
				oHead.appendChild(mdScript);
				// oHead.appendChild(mgScript); //debug tool
			}, CMDC.timeout* 0.5)
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
						this.reportClose(action, index);
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
						console.log('error',e)
					}
					return true;
				}
				// 浏览器版本过低
				try {
					Catcher && Catcher.notSupport();
				} catch (e) {
					Catcher && Catcher.error()
					console.log('error',e)
				}
				this.reportShow('not-support');
				return false;
			},
			click: function () {
				try {
					Catcher && Catcher.receive();
				} catch (e) {
					Catcher && Catcher.error()
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
			},
			reportShow: function (action) {
				this.report({
					snode: 1365,
					expand: action
				});
			},
			reportClick: function (action, idx, shuang11) {
				var data = {
					snode: 1163,
					expand: action,
					idx: idx || 1
				};
				if (shuang11) {
					data.shuang11 = 1;
				}
				this.report(data);
			},
			reportClose: function (action, index) {
				this.report({
					snode: 10147,
					expand: action,
					idx: index || 1
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
				data.cid = '';
				try {
					Catcher && Catcher.report(data);
				} catch (e) {
					console.log('error',e)
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
						init: CMDCG.do,
						sourceLink: CMDC.sourceLinkRoot + 'js/cmdcg.js'
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
				leftImg: sourceLinkRoot + 'img/hull.png',
				middleImg: sourceLinkRoot + 'img/hull.png',
				bottombakImg: sourceLinkRoot + 'img/allbodies.png',
				closeImg: sourceLinkRoot + 'img/close.png',
				logoImg: sourceLinkRoot + 'img/11logo.png',
				rockerImg: sourceLinkRoot + 'img/rocker.png',
				startBtnImg: sourceLinkRoot + 'img/button.png',
				alertImg: sourceLinkRoot + 'img/alertbkg.png',
				alertbtnImg: sourceLinkRoot + 'img/alertbtn.png',
			}
			var cmdcObj = {
				botEL: {},
				leftEL: {},
				middleEL: {},
				bottombakEL: {},
				rockerEL: {},
				$: function (className) {
					return document.querySelector(className);
				},
				init: function (resource) {
					cmdcObj.createDom(resource)
				},
				createDom: function (resource) {
					var cssStr = '@-webkit-keyframes move_upper {from {opacity: 0;}to {opacity: 1; -webkit-transform: translateY(-60px);transform: translateY(-60px);}} @keyframes move_upper {from {opacity: 0;}to {opacity: 1; -webkit-transform: translateY(-60px);transform: translateY(-60px); }}' +
						'.move_upper { -webkit-animation-name: move_upper;animation-name: move_upper; -webkit-animation-duration: .7s;animation-duration: .7s; -webkit-animation-iteration-count: 1;animation-iteration-count: 1; -webkit-animation-fill-mode: forwards;animation-fill-mode: forwards;}' +
						'.cm-dc-bottom {min-width:1180px;position:fixed;margin: auto;left: 0;right: 0;bottom: -10px;z-index:28;height:240px;background-repeat: no-repeat;background-position: center top;display:none;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto} ' +
						'.cm-dc-left {z-index:99;position:fixed;bottom:0;right: 50%;top:0;margin-right: 700px;width: 18%;height: 100%;background: #e9445f;}' +
						'.cm-dc-right {z-index:90;position:fixed;bottom:0;left: 50%;top:0;margin-left: 700px;width: 18%;height: 100%;background: #e9445f;}' +
						'.cm-dc-middle {z-index:21;position:fixed;margin:auto;top: 0;left: 0;right: 0;bottom: 0;min-width:1180px;background-repeat: no-repeat;background-position: center top;display: none;cursor:url(\'https://www.duba.com/static/v2/images/point.cur\'),auto}' +
						'.cm-dc-bottom-bak {position: fixed;  margin: auto;  left: 0;  right: 0;  bottom:0px;width: 1400px;z-index:5;height:300px;background-repeat: no-repeat;display: none} ' +
						'.cm-dc-close {width: 80px;height: 80px;cursor: pointer;top: 20px; margin: auto;z-index:101;position: fixed; right:28px;background-repeat: no-repeat;} .cm-dc-close:hover {background-position: -80px} .cm-dc-close:active {background-position: -160px}' +
						'.cm-dc-11logo-left {margin-left: 140px;display: inline-block;width: 200px; height: 100%;background-image: url(../images/11logo.png);}' +
						'.cm-dc-11logo-right {display: inline-block;width: 200px; height: 100%;background-image: url(../images/11logo.png);}' +
						'.cm-dc-rocker {position:fixed;margin:auto;left:0;right:830px;bottom:-20px;z-index:30;width:160px;height: 270px;background-repeat: no-repeat;}' +
						'.cm-dc-start-btn {cursor:pointer;position:fixed;margin:auto;left:0;right:0;bottom: 0px;z-index:30;width:408px;height: 130px;background-repeat: no-repeat;} .cm-dc-start-btn:hover {background-position: -406px} .cm-dc-start-btn:active {background-position: -810px} ' +
						'.simpleAlert {position: fixed;z-index: 100;}\n' +
						'.simpleAlertShelter {position: fixed;width: 100%;height: 100%;top:0;left:0;background-color: #000;opacity: 0.3;filter:alpha(opacity=30);}\n' +
						'.simpleAlertBody {cursor:pointer;position:fixed;display: none;width: 600px;height: 560px;top:0;left:0;right:0;bottom:0;margin:auto;opacity:0;background-repeat: no-repeat;background: url("' + resource.alertImg +
						'")}' +
						'.simpleAlertBtn {position:absolute;width: 190px;height:80px;bottom:110px;cursor:pointer;}\n' +
						'.simpleAlertBtn1 {left:32%;background: url("' + resource.alertbtnImg +
						'") no-repeat} .simpleAlertBtn1:hover {background-position: -192px} .simpleAlertBtn1:active {background-position: -384px}';
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
						botImg = document.createElement('img'),
						leftImg = document.createElement('img'),
						leftlogo = document.createElement('a'),
						rightlogo = document.createElement('a');
					cmdc.className = 'cm-dc-class'
					bot.className = 'cm-dc-bottom';
					left.className = 'cm-dc-left';
					right.className = 'cm-dc-right';
					middle.className = 'cm-dc-middle';
					bottombak.className = 'cm-dc-bottom-bak';
					close.className = 'cm-dc-close';
					leftlogo.className = 'cm-dc-11logo-left';
					rightlogo.className = 'cm-dc-11logo-right';
					rocker.className = 'cm-dc-rocker';
					start.className = 'cm-dc-start-btn';
					bot.style.backgroundImage = 'url(' + resource.botImg + ')'
					middle.style.backgroundImage = 'url(' + resource.middleImg + ')'
					bottombak.style.backgroundImage = 'url(' + resource.bottombakImg + ')'
					close.style.backgroundImage = 'url(' + resource.closeImg + ')'
					leftlogo.style.backgroundImage = 'url(' + resource.logoImg + ')'
					rightlogo.style.backgroundImage = 'url(' + resource.logoImg + ')'
					rocker.style.backgroundImage = 'url(' + resource.rockerImg + ')'
					start.style.backgroundImage = 'url(' + resource.startBtnImg + ')'

					botImg.src = resource.botImg;
					botImg.style.width = '1180px';
					botImg.style.display = 'inline-block';
					leftImg.src = resource.leftImg;
					leftImg.style.display = 'inline-block'

					left.appendChild(leftlogo);
					right.appendChild(rightlogo);
					cmdc.appendChild(rocker);
					cmdc.appendChild(bot);
					cmdc.appendChild(left);
					cmdc.appendChild(right);
					cmdc.appendChild(middle);
					cmdc.appendChild(close);
					cmdc.appendChild(bottombak);
					cmdc.appendChild(bottombak);
					cmdc.appendChild(start);
					document.body.appendChild(cmdc);
				},
				show: function () {
					cmdcObj.botEL.style.display = 'block'
					cmdcObj.leftEL.style.display = 'block'
					cmdcObj.middleEL.style.display = 'block'
					cmdcObj.bottombakEL.style.display = 'block'
					cmdcObj.botEL.style.bottom = '-60px'
					cmdcObj.botEL.classList.toggle('move_upper');
					setInterval(function () {
						var x = cmdcObj.rockerEL.style.backgroundPositionX
						cmdcObj.rockerEL.style.backgroundPositionX = x === '0px' ? '-166px' : '0px'
					}, CMDC.timeout * 0.6)
				},
			}
			cmdcObj.init(resource);
			cmdcObj.botEL = cmdcObj.$(".cm-dc-bottom")
			cmdcObj.leftEL = cmdcObj.$(".cm-dc-left")
			cmdcObj.middleEL = cmdcObj.$(".cm-dc-middle")
			cmdcObj.bottombakEL = cmdcObj.$(".cm-dc-bottom-bak")
			cmdcObj.rockerEL = cmdcObj.$(".cm-dc-rocker")
			cmdcObj.show();
		},
		/*1. 滚动到指定位置，避免在顶部产生性能问题
			2. 隐藏scroll
		*/
		dosomethingforbkg: function(){
			$('.link_break')[1] && window.scrollTo(255, $('.link_break')[1].offsetTop)
			$('body').css('overflow-y', 'hidden')
		}
	};

	window.CMDC = CMDC;

	// if(CMDC.Interface.ready()){
		try{
			CMDC.loadSource();

			setTimeout(function(){
				CMDC.dosomethingforbkg()

				//建立游戏周边场景
				CMDC.buildWalls();
				//建立娃娃机场景
				CMDC.play();
			}, CMDC.timeout);

		}catch (e){
			console.log('error', e)
			CMDC.Interface.error()
			CMDC.Interface.reportClose('error-exit')
		}
	// }

})();