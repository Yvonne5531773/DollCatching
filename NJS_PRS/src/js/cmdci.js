
// var sourceLinkRoot = '//10.20.240.179:8000/NJS_PRS/output/';
var sourceLinkRoot = '//10.20.240.179:8000/NJS_PRS/src/';

var dcDemo, playAgain = false, bhObj = {}, timeout = 1000,
	isInclude = function (name) {
		var js = /js$/i.test(name);
		var es = document.getElementsByTagName(js ? 'script' : 'link');
		for (var i = 0; i < es.length; i++)
			if (es[i][js ? 'src' : 'href'].indexOf(name) !== -1)return true;
		return false;
	},
	loadSource = function() {
		if(isInclude('cmdcg.js')) return
		var oHead = document.getElementsByTagName('HEAD').item(0),
			pfScript = document.createElement("script"),
			mScript = document.createElement("script"),
			mgScript = document.createElement("script"),
			mdScript = document.createElement("script"),
			mainScript = document.createElement("script"),
			alertScript = document.createElement("script"),
			bhScript = document.createElement("script"),
			alertCss = document.createElement("link"),
			tipScript = document.createElement("script"),
			tipCss = document.createElement("link");

		pfScript.src = sourceLinkRoot + "js/polyfill.js";
		mScript.src = sourceLinkRoot + "js/matter-dev.js";
		mgScript.src = sourceLinkRoot + "js/matter-tools.gui.js";
		mdScript.src = sourceLinkRoot + "js/matter-tools.demo.js";
		bhScript.src = sourceLinkRoot + "js/cmdcbh.js";
		mainScript.src = sourceLinkRoot + "js/cmdcg.js";
		alertScript.src = sourceLinkRoot + "js/simpleAlert.js";
		alertCss.href = sourceLinkRoot + "css/simpleAlert.css";
		alertCss.rel = 'stylesheet';
		alertCss.type = 'text/css';
		tipScript.src = sourceLinkRoot + "js/tipso.min.js";
		tipCss.href = sourceLinkRoot + "css/tipso.min.css";
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
			oHead.appendChild(bhScript);
		}, 500)
	};

(function() {
	//设置屏幕宽度的最小支持
	if(document.documentElement.clientWidth < 1263) return

	loadSource();
	var play = function() {
		var obj = {
			toolbar: {
				title: '天猫双11主场',
				url: '',
				reset: false,
				source: false,
				inspector: false,
				tools: false,
				fullscreen: false,
				exampleSelect: false
			},
			tools: {
				inspector: false, //调试工具
				gui: false //调试工具
			},
			inline: false,
			preventZoom: true,
			resetOnOrientation: true,
			routing: true,
			startExample: 'cmdcg',
			examples: [
				{
					name: 'DOLL_CATCHING',
					id: 'cmdcg',
					init: DC.do,
					sourceLink: sourceLinkRoot + 'cmdcg.js'
				},
			]
		}
		dcDemo = MatterTools.Demo.create(obj);
		document.body.appendChild(dcDemo.dom.root);
		MatterTools.Demo.start(dcDemo);
	}
	setTimeout(function(){
		// bhObj = doblackhole();
		// var st = setTimeout(function(){
		// 	bhObj.dispose();
		// 	play();
		// }, timeout* 6);
		// bhObj.init(function(res){
		// 	if(res === 1){
		// 		clearTimeout(st);
		// 		play();
		// 	}
		// })
		play();
		// bhObj.init()
		// setTimeout(function(){
		// 	play();
		// }, timeout)
	}, timeout);

})();