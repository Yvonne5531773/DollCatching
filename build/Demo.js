/**
 * The Matter.js demo page controller and example runner.
 *
 * NOTE: For the actual example code, refer to the source files in `/examples/`.
 *
 * @class Demo
 */
(function() {
	// var sourceLinkRoot = '//10.20.209.140:8000/build/';
	var sourceLinkRoot = '//localhost:8000/build/';
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var dScript= document.createElement("script"),
		pScript= document.createElement("script"),
		mScript= document.createElement("script"),
		jScript= document.createElement("script"),
		mwScript= document.createElement("script"),
		mgScript= document.createElement("script"),
		miScript= document.createElement("script"),
		mdScript= document.createElement("script"),
		mainScript= document.createElement("script");
	dScript.type = "text/javascript";
	pScript.type = "text/javascript";
	mScript.type = "text/javascript";
	jScript.type = "text/javascript";
	mwScript.type = "text/javascript";
	mgScript.type = "text/javascript";
	miScript.type = "text/javascript";
	mdScript.type = "text/javascript";
	mainScript.type = "text/javascript";
	dScript.src = sourceLinkRoot + 'decomp.js'
	pScript.src=sourceLinkRoot + 'pathseg.js';
	mScript.src=sourceLinkRoot + "matter-dev.js";
	jScript.src="//code.jquery.com/jquery-3.1.1.js";
	mwScript.src=sourceLinkRoot + "matter-wrap.js";
	mgScript.src = sourceLinkRoot + "matter-tools.gui.js";
	miScript.src = sourceLinkRoot + "matter-tools.inspector.js";
	mdScript.src = sourceLinkRoot + "matter-tools.demo.js";
	mainScript.src = sourceLinkRoot + "main.js";
	oHead.appendChild(dScript);
	oHead.appendChild(pScript);
	oHead.appendChild(mScript);
	oHead.appendChild(jScript);
	oHead.appendChild(mwScript);
	oHead.appendChild(mgScript);
	oHead.appendChild(miScript);
	oHead.appendChild(mdScript);
	oHead.appendChild(mainScript);

	var demo = MatterTools.Demo.create({
		toolbar: {
			title: 'doll-catching-demo',
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
		startExample: 'main', //默认例子
		examples: [
			{
				name: 'DOLL_CATCHING',
				id: 'main',
				init: Example.sprites,
				sourceLink: sourceLinkRoot + 'main.js'
			},
		]
	});

	document.body.appendChild(demo.dom.root);

	MatterTools.Demo.start(demo);
})();