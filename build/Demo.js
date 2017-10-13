
// var sourceLinkRoot = '//10.20.209.140:8000/build/';
var sourceLinkRoot = '//10.20.209.140:8000/build/';
var dcDemo, done = false,
	loadSource = function(){
		var oHead = document.getElementsByTagName('HEAD').item(0);
		var dScript= document.createElement("script"),
			pScript= document.createElement("script"),
			mScript= document.createElement("script"),
			jScript= document.createElement("script"),
			mwScript= document.createElement("script"),
			mgScript= document.createElement("script"),
			miScript= document.createElement("script"),
			mdScript= document.createElement("script"),
			mainScript= document.createElement("script"),
			alertScript= document.createElement("script"),
			alertCss= document.createElement("link"),
			tipScript= document.createElement("script"),
			tipCss= document.createElement("link");
		dScript.src = sourceLinkRoot + 'decomp.js'
		pScript.src=sourceLinkRoot + 'pathseg.js';
		mScript.src=sourceLinkRoot + "matter-dev.js";
		jScript.src="//code.jquery.com/jquery-3.1.1.js";
		mwScript.src=sourceLinkRoot + "matter-wrap.js";
		mgScript.src = sourceLinkRoot + "matter-tools.gui.js";
		miScript.src = sourceLinkRoot + "matter-tools.inspector.js";
		mdScript.src = sourceLinkRoot + "matter-tools.demo.js";
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
		setTimeout(function(){
			oHead.appendChild(dScript);
			oHead.appendChild(pScript);
			oHead.appendChild(mwScript);
			oHead.appendChild(mgScript);
			oHead.appendChild(miScript);
			oHead.appendChild(mdScript);
			oHead.appendChild(mainScript);
			oHead.appendChild(alertScript);
			oHead.appendChild(tipScript);
		}, 500)
	};

(function() {
	loadSource()
	setTimeout(function() {
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
			// toolbar: {
			// 	title: 'matter-js',
			// 	url: 'https://github.com/liabru/matter-js',
			// 	reset: true,
			// 	source: true,
			// 	inspector: true,
			// 	tools: true,
			// 	fullscreen: true,
			// 	exampleSelect: true
			// },
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
	}, 1000)
})();