
(function() {
	var CMDC = {
		sourceLinkRoot: '//localhost:8000/NJS_PRS/src/',
		// sourceLinkRoot: '//10.20.240.179:8000/NJS_PRS/src/',
		//sourceLinkRoot: '//10.20.240.179:8000/NJS_PRS/output/',
		// sourceLinkRoot: '//act.cmcmcdn.com/dollcatching/NJS_PRS/output/',
		dc: {},
		playAgain : false,
		bhObj : {},
		timeout : 1000,
		eventOff : false,
		isInclude : function (name) {
			var js = /js$/i.test(name);
			var es = document.getElementsByTagName(js ? 'script' : 'link');
			for (var i = 0; i < es.length; i++)
				if (es[i][js ? 'src' : 'href'].indexOf(name) !== -1)return true;
			return false;
		},
		loadSource : function() {
			if(CMDC.isInclude('cmdcg.js')) return

			var oHead = document.getElementsByTagName('HEAD').item(0),
				pfScript = document.createElement("script"),
				mScript = document.createElement("script"),
				mgScript = document.createElement("script"),
				mdScript = document.createElement("script"),
				mainScript = document.createElement("script"),
				alertScript = document.createElement("script"),
				alertCss = document.createElement("link"),
				tipScript = document.createElement("script"),
				tipCss = document.createElement("link"),
				sourceLinkRoot = CMDC.sourceLinkRoot;

			pfScript.src = sourceLinkRoot + "js/polyfill.js";
			mScript.src = sourceLinkRoot + "js/matter.js";
			mgScript.src = sourceLinkRoot + "js/matter-tools.gui.js";
			mdScript.src = sourceLinkRoot + "js/matter-tools.demo.js";
			mainScript.src = sourceLinkRoot + "js/cmdcg.js";
			alertScript.src = sourceLinkRoot + "js/simpleAlert.js";
			tipScript.src = sourceLinkRoot + "js/tipso.min.js";
			alertCss.href = sourceLinkRoot + "css/simpleAlert.css";
			tipCss.href = sourceLinkRoot + "css/tipso.min.css";
			alertCss.rel = 'stylesheet';
			alertCss.type = 'text/css';
			tipCss.rel = 'stylesheet';
			tipCss.type = 'text/css';

			oHead.appendChild(alertCss);
			oHead.appendChild(tipCss);
			oHead.appendChild(pfScript);
			oHead.appendChild(mScript);
			setTimeout(function () {
				oHead.appendChild(mgScript);
				oHead.appendChild(mdScript);
				oHead.appendChild(mainScript);
				oHead.appendChild(alertScript);
				oHead.appendChild(tipScript);
			}, 500)
		},
		removejscssfile : function(filename, filetype){
			var targetelement=(filetype==="js")? "script" : (filetype==="css")? "link" : "none";
			var targetattr=(filetype==="js")? "src" : (filetype==="css")? "href" : "none";
			var allsuspects=document.getElementsByTagName(targetelement);
			for (var i=allsuspects.length; i>=0; i--){
				if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) && allsuspects[i].getAttribute(targetattr).indexOf(filename)!==-1){
					allsuspects[i].parentNode.removeChild(allsuspects[i]);
				}
			}
		},
		clearSource : function(){
			var removejscssfile = CMDC.removejscssfile,
				sourceLinkRoot = CMDC.sourceLinkRoot;
			removejscssfile(sourceLinkRoot+"js/simpleAlert.js", 'js')
			removejscssfile(sourceLinkRoot+"js/tipso.min.js", 'js')
			removejscssfile(sourceLinkRoot+"js/matter-dev.js", 'js')
			removejscssfile(sourceLinkRoot+"js/polyfill.js", 'js')
			removejscssfile(sourceLinkRoot+"js/matter-tools.demo.js", 'js')
			removejscssfile(sourceLinkRoot+"js/cmdcg.js", 'js')
			removejscssfile(sourceLinkRoot+"js/cmdcbh.js", 'js')
			removejscssfile(sourceLinkRoot+"css/simpleAlert.css", 'css')
			removejscssfile(sourceLinkRoot+"css/tipso.min.css", 'css')
		},
		Interface: {
			close: function(action) {
				try {
					if (action === 'receive') {
						parkOur.receive();
					} else {
						parkOur.gameOver();
					}
				} catch (e) {}

				this.reportClose(action || 'exit');
			},
			ready: function() {
				if (window.requestAnimationFrame && Adventrue.sizeSupport()) {
					try {
						parkOur.ready();
					} catch (e) {}

					this.reportShow('show');
					return true;
				}
				// 浏览器版本过低
				try {
					parkOur.notSupport();
				} catch (e) {}
				this.reportShow('not-support');
				return false;
			},
			click: function() {
				try {
					parkOur.receive();
				} catch (e) {}
			},
			reportShow: function(action) {
				this.report({
					snode: 1365,
					expand: action
				});
			},
			reportClick: function(action, idx, shuang11) {
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
			reportClose: function(action) {
				this.report({
					snode: 10147,
					expand: action
				});
			},
			report: function(obj) {
				var data = {
					node: 1031100
				};

				for (var i in obj) {
					data[i] = obj[i];
				}
				data.w = 'zpgame';
				data.cid = '';
				try {
					parkOur.report(data);
				} catch (e) {
					window.console && console.log('report', data);
				}
			}
		},
		play: function(){
			var obj = {
				toolbar: {
					title: '天猫双11主场',
					url: ''
				},
				tools: {
					gui: false
				},
				startExample: 'cmdcg',
				examples: [
					{
						name: 'DOLL_CATCHING',
						id: 'cmdcg',
						init: DC.do,
						sourceLink: CMDC.sourceLinkRoot + 'js/cmdcg.js'
					},
				]
			}
			var dc = CMDC.dc;
			dc = MatterTools.Demo.create(obj);
			document.body.appendChild(dc.dom.root);
			MatterTools.Demo.start(dc);
		},
		buildWalls: function(){
			var resource = {
				botImg: '//act.cmcmcdn.com/upload/201710/1a0ea44ac368226ee4bb035db276356a.png',
				leftImg: '//act.cmcmcdn.com/upload/201710/1a0ea44ac368226ee4bb035db276356a.png',
			}
			var cmdcObj = {
				$: function(className){
					return document.querySelector(className);
				},
				init: function(resource){
					cmdcObj.createDom(resource)
				},
				createDom: function(resource){
					var cssStr = '@-webkit-keyframes move_upper {from {opacity: 0;}to {opacity: 1; -webkit-transform: translateY(-100px);transform: translateY(-100px);}} @keyframes move_upper {from {opacity: 0;}to {opacity: 1; -webkit-transform: translateY(-100px);transform: translateY(-100px); }}' +
						'.move_upper { -webkit-animation-name: move_upper;animation-name: move_upper; -webkit-animation-duration: .7s;animation-duration: .7s; -webkit-animation-iteration-count: 1;animation-iteration-count: 1; -webkit-animation-fill-mode: forwards;animation-fill-mode: forwards;}' +
						'.cm-dc-bottom {cursor: pointer;z-index:99999;width:100%;height:100px;line-height:35px;position:fixed;bottom:0;left:0;font-size:14px;color:#000;text-align:center;;display:none} ' +
						'.cm-dc-left {cursor: pointer;z-index:99999;position:fixed;bottom:0;left:0;top:0;display:none}';
					var cssStyle = {};
					cssStyle = document.createElement('style');
					cssStyle.type = 'text/css';
					cssStyle.innerHTML = cssStr;
					document.getElementsByTagName('HEAD').item(0).appendChild(cssStyle);
					var bot = document.createElement('div'),
						left = document.createElement('div'),
						botImg = document.createElement('img'),
						leftImg = document.createElement('img')
					bot.className = 'cm-dc-bottom';
					left.className = 'cm-dc-left';

					botImg.src = resource.botImg;
					botImg.style.display = 'inline-block';
					leftImg.src = resource.leftImg;
					leftImg.style.display = 'inline-block'
					bot.appendChild(botImg);
					left.appendChild(leftImg);
					document.body.appendChild(bot);
					document.body.appendChild(left);
				},
				show: function(){
					cmdcObj.botEL.style.display = 'block'
					cmdcObj.leftEL.style.display = 'block'
					cmdcObj.botEL.style.bottom = '-100px'
					cmdcObj.botEL.classList.toggle('move_upper');
				},
				botEL: {},
				leftEL: {},
			}
			cmdcObj.init(resource);
			cmdcObj.botEL = cmdcObj.$(".cm-dc-bottom")
			cmdcObj.leftEL = cmdcObj.$(".cm-dc-left")
			// BotObj.show();
		}
	};

	window.CMDC = CMDC;

	//设置屏幕宽度的最小支持
	// if(document.documentElement.clientWidth < 1263) return

	CMDC.loadSource();

	//建立周边
	CMDC.buildWalls();

	setTimeout(function(){
		CMDC.play();
	}, CMDC.timeout);

})();