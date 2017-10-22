
var sourceLinkRoot = '//localhost:8000/build/';
// var sourceLinkRoot = '//localhost:8000/build/';
var dcDemo, playAgain = false,
	isInclude = function (name) {
		var js = /js$/i.test(name);
		var es = document.getElementsByTagName(js ? 'script' : 'link');
		for (var i = 0; i < es.length; i++)
			if (es[i][js ? 'src' : 'href'].indexOf(name) !== -1)return true;
		return false;
	},
	loadSource = function() {
		var oHead = document.getElementsByTagName('HEAD').item(0);
		if(isInclude('cmdcg.js')) return
		var dScript = document.createElement("script"),
			pScript = document.createElement("script"),
			mScript = document.createElement("script"),
			jScript = document.createElement("script"),
			mwScript = document.createElement("script"),
			mgScript = document.createElement("script"),
			miScript = document.createElement("script"),
			mdScript = document.createElement("script"),
			mainScript = document.createElement("script"),
			alertScript = document.createElement("script"),
			bhScript = document.createElement("script"),
			alertCss = document.createElement("link"),
			tipScript = document.createElement("script"),
			tipCss = document.createElement("link");
		dScript.src = sourceLinkRoot + 'decomp.js'
		pScript.src = sourceLinkRoot + 'pathseg.js';
		mScript.src = sourceLinkRoot + "matter-dev.js";
		jScript.src = "//code.jquery.com/jquery-3.1.1.js";
		mwScript.src = sourceLinkRoot + "matter-wrap.js";
		mgScript.src = sourceLinkRoot + "matter-tools.gui.js";
		miScript.src = sourceLinkRoot + "matter-tools.inspector.js";
		mdScript.src = sourceLinkRoot + "matter-tools.demo.js";
		bhScript.src = sourceLinkRoot + "blackhole.js";
		mainScript.src = sourceLinkRoot + "cmdcg.js";
		alertScript.src = sourceLinkRoot + "plugin/js/simpleAlert.js";
		alertCss.href = sourceLinkRoot + "plugin/css/simpleAlert.css";
		alertCss.rel = 'stylesheet';
		alertCss.type = 'text/css';
		tipScript.src = sourceLinkRoot + "plugin/js/tipso.min.js";
		tipCss.href = sourceLinkRoot + "plugin/css/tipso.min.css";
		tipCss.rel = 'stylesheet';
		tipCss.type = 'text/css';
		oHead.appendChild(alertCss)
		oHead.appendChild(tipCss)
		oHead.appendChild(mScript);
		oHead.appendChild(jScript);
		setTimeout(function () {
			oHead.appendChild(dScript);
			oHead.appendChild(pScript);
			oHead.appendChild(mwScript);
			oHead.appendChild(miScript);
			oHead.appendChild(mgScript);
			oHead.appendChild(mdScript);
			oHead.appendChild(mainScript);
			oHead.appendChild(alertScript);
			oHead.appendChild(tipScript);
			oHead.appendChild(bhScript);
		}, 500)
	};

(function() {
	loadSource();
	var play = function() {
		var obj = {
			toolbar: {
				title: '天猫双11主场',
			},
			tools: {
				inspector: false, //调试工具
				gui: true //调试工具
			},
			startExample: 'cmdcg',
			examples: [
				{
					name: 'DOLL_CATCHING',
					id: 'cmdcg',
					init: Example.sprites,
					sourceLink: sourceLinkRoot + 'cmdcg.js'
				},
			]
		}
		dcDemo = MatterTools.Demo.create(obj);
		document.body.appendChild(dcDemo.dom.root);
		MatterTools.Demo.start(dcDemo);
	}
	setTimeout(function(){
		// var bhObj = doblackhole();
		// var st = setTimeout(function(){
		// 	bhObj.dispose();
		// 	play();
		// }, 5500);
		// bhObj.init(function(res){
		// 	if(res === 1){
		// 		clearTimeout(st);
		// 		play();
		// 	}
		// })
		play();
	}, 1000);

})();