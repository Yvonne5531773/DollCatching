/*!
 * matter-tools 0.11.1 by Liam Brummitt 2017-07-02
 * https://github.com/liabru/matter-tools
 * License MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("matter-js"), require("matter-tools"));
	else if(typeof define === 'function' && define.amd)
		define(["matter-js", "matter-tools"], factory);
	else if(typeof exports === 'object')
		exports["Demo"] = factory(require("matter-js"), require("matter-tools"));
	else
		root["MatterTools"] = root["MatterTools"] || {}, root["MatterTools"]["Demo"] = factory(root["Matter"], root["MatterTools"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/demo/lib";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * A tool for for running and testing example scenes.
	 * @module Demo
	 */

	var Matter = __webpack_require__(1);
	var Common = Matter.Common;
	var Demo = module.exports = {};
	var Gui = __webpack_require__(2).Gui;
	var Inspector = __webpack_require__(2).Inspector;
	var ToolsCommon = __webpack_require__(3);

	Demo._isIOS = window.navigator && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	Demo._matterLink = 'http://brm.io/matter-js/';

	/**
	 * Creates a new demo instance.
	 * See example for options and usage.
	 * @function Demo.create
	 * @param {} options
	 */
	Demo.create = function (options) {
	  var demo = Object.assign({
	    example: {
	      instance: null
	    },
	    examples: [],
	    resetOnOrientation: false,
	    preventZoom: false,
	    inline: false,
	    startExample: true,
	    appendTo: document.body,
	    toolbar: {
	      title: null,
	      url: null,
	      reset: true,
	      source: false,
	      inspector: false,
	      tools: false,
	      fullscreen: true,
	      exampleSelect: false
	    },
	    tools: {
	      inspector: null,
	      gui: null
	    },
	    dom: {}
	  }, options || {});

	  if (demo.examples.length > 1 && options.toolbar.exampleSelect !== false) {
	    demo.toolbar.exampleSelect = true;
	  }

	  if (Demo._isIOS) {
	    demo.toolbar.fullscreen = false;
	  }

	  if (!Gui) {
	    demo.toolbar.tools = false;
	    demo.tools.gui = false;
	  }

	  if (!Inspector) {
	    demo.toolbar.inspector = false;
	    demo.tools.inspector = false;
	  }

	  demo.dom = Demo._createDom(demo);
	  Demo._bindDom(demo);

	  if (demo.inline) {
	    demo.dom.root.classList.add('cm-d-c-inline');
	  }

	  if (demo.appendTo) {
	    demo.appendTo.appendChild(demo.dom.root);
	  }

	  if (demo.startExample) {
	    Demo.start(demo, demo.startExample);
	  }

	  return demo;
	};

	/**
	 * Starts a new demo instance by running the first or given example.
	 * See example for options and usage.
	 * @function Demo.start
	 * @param {demo} demo
	 * @param {string} [initalExampleId] example to start (defaults to first)
	 */
	Demo.start = function (demo, initalExampleId) {
	  initalExampleId = typeof initalExampleId === 'string' ? initalExampleId : demo.examples[0].id;

	  if (window.location.hash.length > 0) {
	    initalExampleId = window.location.hash.slice(1);
	  }

	  Demo.setExampleById(demo, initalExampleId);
	};

	/**
	 * Stops the currently running example in the demo.
	 * This requires that the `example.init` function returned 
	 * an object specifiying a `stop` function.
	 * @function Demo.stop
	 * @param {demo} demo
	 */
	Demo.stop = function (demo) {
	  if (demo.example && demo.example.instance) {
	    demo.example.instance.stop();
	  }
	};

	/**
	 * Stops and restarts the currently running example.
	 * @function Demo.reset
	 * @param {demo} demo
	 */
	Demo.reset = function (demo) {
	  Common._nextId = 0;
	  Common._seed = 0;

	  Demo.setExample(demo, demo.example);
	};

	/**
	 * Starts the given example by its id. 
	 * Any running example will be stopped.
	 * @function Demo.setExampleById
	 * @param {demo} demo
	 * @param {string} exampleId 
	 */
	Demo.setExampleById = function (demo, exampleId) {
	  var example = demo.examples.filter(function (example) {
	    return example.id === exampleId;
	  })[0];

	  Demo.setExample(demo, example);
	};

	/**
	 * Starts the given example.
	 * Any running example will be stopped.
	 * @function Demo.setExample
	 * @param {demo} demo
	 * @param {example} example 
	 */
	Demo.setExample = function (demo, example) {
	  if (example) {
	    var instance = demo.example.instance;

	    if (instance) {
	      instance.stop();

	      if (instance.canvas) {
	        instance.canvas.parentElement.removeChild(instance.canvas);
	      }
	    }

	    window.location.hash = example.id;

	    demo.example.instance = null;
	    demo.example = example;

	    demo.example.instance = instance = example.init(demo);

	    if (!instance.canvas && instance.render) {
	      instance.canvas = instance.render.canvas;
	    }

	    if (instance.canvas) {
	      // demo.dom.header.style.maxWidth = instance.canvas.width + 'px';
	      demo.dom.root.appendChild(instance.canvas);
	    }

	    demo.dom.exampleSelect.value = example.id;
	    demo.dom.buttonSource.href = example.sourceLink || demo.url || '#';

	    setTimeout(function () {
	      if (demo.tools.inspector) {
	        Demo.setInspector(demo, true);
	      }

	      if (demo.tools.gui) {
	        Demo.setGui(demo, true);
	      }
	    }, 500);
	  } else {
	    Demo.setExample(demo, demo.examples[0]);
	  }
	};

	/**
	 * Enables or disables the inspector tool.
	 * If `enabled` a new `Inspector` instance will be created and the old one destroyed.
	 * @function Demo.setInspector
	 * @param {demo} demo
	 * @param {bool} enabled
	 */
	Demo.setInspector = function (demo, enabled) {
	  if (!enabled) {
	    Demo._destroyTools(demo, true, false);
	    demo.dom.root.classList.toggle('matter-inspect-active', false);
	    return;
	  }

	  var instance = demo.example.instance;

	  Demo._destroyTools(demo, true, false);
	  demo.dom.root.classList.toggle('matter-inspect-active', true);

	  demo.tools.inspector = Inspector.create(instance.engine, instance.render);
	};

	/**
	 * Enables or disables the Gui tool.
	 * If `enabled` a new `Gui` instance will be created and the old one destroyed.
	 * @function Demo.setGui
	 * @param {demo} demo
	 * @param {bool} enabled
	 */
	Demo.setGui = function (demo, enabled) {
	  if (!enabled) {
	    Demo._destroyTools(demo, false, true);
	    demo.dom.root.classList.toggle('matter-gui-active', false);
	    return;
	  }

	  var instance = demo.example.instance;

	  Demo._destroyTools(demo, false, true);
	  demo.dom.root.classList.toggle('matter-gui-active', true);

	  demo.tools.gui = Gui.create(instance.engine, instance.runner, instance.render);
	};

	Demo._destroyTools = function (demo, destroyInspector, destroyGui) {
	  var inspector = demo.tools.inspector,
	      gui = demo.tools.gui;

	  if (destroyInspector && inspector && inspector !== true) {
	    Inspector.destroy(inspector);
	    demo.tools.inspector = null;
	  }

	  if (destroyGui && gui && gui !== true) {
	    Gui.destroy(gui);
	    demo.tools.gui = null;
	  }
	};

	Demo._toggleFullscreen = function (demo) {
	  var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

	  if (!fullscreenElement) {
	    fullscreenElement = demo.dom.root;

	    if (fullscreenElement.requestFullscreen) {
	      fullscreenElement.requestFullscreen();
	    } else if (fullscreenElement.mozRequestFullScreen) {
	      fullscreenElement.mozRequestFullScreen();
	    } else if (fullscreenElement.webkitRequestFullscreen) {
	      fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	  } else {
	    if (document.exitFullscreen) {
	      document.exitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	      document.mozCancelFullScreen();
	    } else if (document.webkitExitFullscreen) {
	      document.webkitExitFullscreen();
	    }
	  }
	};

	Demo._bindDom = function (demo) {
	  var dom = demo.dom;

	  window.addEventListener('orientationchange', function () {
	    setTimeout(function () {
	      if (demo.resetOnOrientation) {
	        Demo.reset(demo);
	      }
	    }, 300);
	  });

	  if (demo.preventZoom) {
	    document.body.addEventListener('gesturestart', function (event) {
	      event.preventDefault();
	    });

	    var allowTap = true,
	        tapTimeout;

	    document.body.addEventListener('touchstart', function (event) {
	      if (!allowTap) {
	        event.preventDefault();
	      }

	      allowTap = false;

	      clearTimeout(tapTimeout);
	      tapTimeout = setTimeout(function () {
	        allowTap = true;
	      }, 500);
	    });
	  }

	  if (dom.exampleSelect) {
	    dom.exampleSelect.addEventListener('change', function () {
	      var exampleId = this.options[this.selectedIndex].value;
	      Demo.setExampleById(demo, exampleId);
	    });
	  }

	  if (dom.buttonReset) {
	    dom.buttonReset.addEventListener('click', function () {
	      Demo.reset(demo);
	    });
	  }

	  if (dom.buttonInspect) {
	    dom.buttonInspect.addEventListener('click', function () {
	      var showInspector = !demo.tools.inspector;
	      Demo.setInspector(demo, showInspector);
	    });
	  }

	  if (dom.buttonTools) {
	    dom.buttonTools.addEventListener('click', function () {
	      var showGui = !demo.tools.gui;
	      Demo.setGui(demo, showGui);
	    });
	  }

	  if (dom.buttonFullscreen) {
	    dom.buttonFullscreen.addEventListener('click', function () {
	      Demo._toggleFullscreen(demo);
	    });

	    var fullscreenChange = function fullscreenChange() {
	      var isFullscreen = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen;
	      document.body.classList.toggle('matter-is-fullscreen', isFullscreen);

	      setTimeout(function () {
	        Demo.setExample(demo, demo.example);
	      }, 500);
	    };

	    document.addEventListener('webkitfullscreenchange', fullscreenChange);
	    document.addEventListener('mozfullscreenchange', fullscreenChange);
	    document.addEventListener('fullscreenchange', fullscreenChange);
	  }
	};

	Demo._createDom = function (options) {
	  var styles = __webpack_require__(4);
	  ToolsCommon.injectStyles(styles, 'cm-d-c-style');

	  var root = document.createElement('div');

	  var exampleOptions = options.examples.map(function (example) {
	    return '<option value="' + example.id + '">' + example.name + '</option>';
	  }).join(' ');

	  var preventZoomClass = options.preventZoom && Demo._isIOS ? 'prevent-zoom-ios' : '';

	  root.innerHTML = '<div id="cm-d-c" class="cm-d-c ' + options.toolbar.title + ' ' + preventZoomClass + '">       <div class="cm-d-c-header-outer">         <header class="cm-d-c-header">           <div class="cm-d-c-header-inner">             <h1 class="cm-d-c-title">               <a href="' + options.toolbar.url + '" target="_blank">               ' + options.toolbar.title + '                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M0 0h24v24H0z" fill="none"/>                   <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>                 </svg>               </a>             </h1>       <div class="cm-cm-d-c-toolbar">               <div class="matter-select-wrapper">                 <select class="matter-example-select matter-select">                   ' + exampleOptions + '                 </select>                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M7 10l5 5 5-5z"/>                   <path d="M0 0h24v24H0z" fill="none"/>                 </svg>               </div>               <button class="matter-btn matter-btn-reset" title="Reset">                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>                   <path d="M0 0h24v24H0z" fill="none"/>                 </svg>               </button>               <a href="#" class="matter-btn matter-btn-source" title="Source" target="_blank">{ }</a>               <button class="matter-btn matter-btn-tools" title="Tools">                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>                   <path d="M0 0h24v24H0z" fill="none"/>                 </svg>               </button>               <button class="matter-btn matter-btn-inspect" title="Inspect">               <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                 <path d="M0 0h24v24H0z" fill="none"/>                 <path d="M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zm7.32.19C16.84 3.05 15.01 2.25 13 2.05v2.02c1.46.18 2.79.76 3.9 1.62l1.42-1.43zM19.93 11h2.02c-.2-2.01-1-3.84-2.21-5.32L18.31 7.1c.86 1.11 1.44 2.44 1.62 3.9zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zM15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm3.31 4.9l1.43 1.43c1.21-1.48 2.01-3.32 2.21-5.32h-2.02c-.18 1.45-.76 2.78-1.62 3.89zM13 19.93v2.02c2.01-.2 3.84-1 5.32-2.21l-1.43-1.43c-1.1.86-2.43 1.44-3.89 1.62zm-7.32-.19C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43z"/>               </svg>               </button>               <button class="matter-btn matter-btn-fullscreen" title="Fullscreen">                 <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">                   <path d="M0 0h24v24H0z" fill="none"/>                   <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>                 </svg>               </button>             </div>             <a class="cm-cm-d-c-link">     </a> <a class="cm-d-c-close"></a>           </div>         </header>       </div>   <div class="start-btn"><span class="switch"> <span class="switch-border1"> <span class="switch-border2"> <input id="cm-dc-switch1" type="checkbox" checked /> <label for="cm-dc-switch1"></label> <span class="switch-top"></span> <span class="switch-shadow"></span> <span class="switch-handle"></span> <span class="switch-handle-left"></span> <span class="switch-handle-right"></span> <span class="switch-handle-top"></span> <span class="switch-handle-bottom"></span> <span class="switch-handle-base"></span> <span class="switch-led switch-led-green"> <span class="switch-led-border"> <span class="switch-led-light"> <span class="switch-led-glow"></span> </span> </span> </span> <span class="switch-led switch-led-red"> <span class="switch-led-border"> <span class="switch-led-light"> <span class="switch-led-glow"></span> </span> </span> </span> </span> </span> </span></div></div>'

	  var dom = {
	    root: root.firstElementChild,
	    title: root.querySelector('.cm-d-c-title'),
	    header: root.querySelector('.cm-d-c-header'),
	    exampleSelect: root.querySelector('.matter-example-select'),
	    buttonReset: root.querySelector('.matter-btn-reset'),
	    buttonSource: root.querySelector('.matter-btn-source'),
	    buttonTools: root.querySelector('.matter-btn-tools'),
	    buttonInspect: root.querySelector('.matter-btn-inspect'),
	    buttonFullscreen: root.querySelector('.matter-btn-fullscreen')
	  };

	  if (!options.toolbar.title) {
	    ToolsCommon.domRemove(dom.title);
	  }

	  if (!options.toolbar.exampleSelect) {
	    ToolsCommon.domRemove(dom.exampleSelect.parentElement);
	  }

	  if (!options.toolbar.reset) {
	    ToolsCommon.domRemove(dom.buttonReset);
	  }

	  if (!options.toolbar.source) {
	    ToolsCommon.domRemove(dom.buttonSource);
	  }

	  if (!options.toolbar.inspector) {
	    ToolsCommon.domRemove(dom.buttonInspect);
	  }

	  if (!options.toolbar.tools) {
	    ToolsCommon.domRemove(dom.buttonTools);
	  }

	  if (!options.toolbar.fullscreen) {
	    ToolsCommon.domRemove(dom.buttonFullscreen);
	  }

	  return dom;
	};

	/*** EXPORTS FROM exports-loader ***/

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/**
	* @class Common
	*/

	var Common = module.exports = {};

	Common.injectStyles = function (styles, id) {
	  if (document.getElementById(id)) {
	    return;
	  }

	  var root = document.createElement('div');
	  root.innerHTML = '<style id="' + id + '" type="text/css">' + styles + '</style>';

	  var lastStyle = document.head.querySelector('style:last-of-type');

	  if (lastStyle) {
	    Common.domInsertBefore(root.firstElementChild, lastStyle);
	  } else {
	    document.head.appendChild(root.firstElementChild);
	  }
	};

	Common.injectScript = function (url, id, callback) {
	  if (document.getElementById(id)) {
	    return;
	  }

	  var script = document.createElement('script');
	  script.id = id;
	  script.src = url;
	  script.onload = callback;

	  document.body.appendChild(script);
	};

	Common.domRemove = function (element) {
	  return element.parentElement.removeChild(element);
	};

	Common.domInsertBefore = function (element, before) {
	  return before.parentNode.insertBefore(element, before.previousElementSibling);
	};

	/*** EXPORTS FROM exports-loader ***/

/***/ },
/* 4 */
/***/ function(module, exports) {

		module.exports = "/*\n*\tMatterTools.Demo\n*/\n\n.cm-d-c {\ntop:0px;bottom:0px;left:0;right:0;margin:0 auto;\nposition: fixed;\nz-index:15;\nwidth: 1180px;\nheight: 100%;\n font-family: Helvetica, Arial, sans-serif;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100vh;\n}\n\n.cm-d-c canvas {\n  border-radius: 8px;\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.cm-d-c.cm-d-c-inline canvas {\n  max-height: calc(100% - 50px);\n}\n\n@media screen and (min-width: 900px) and (min-height: 600px) {\n  .cm-d-c.cm-d-c-inline canvas {\n    max-height: calc(100% - 100px);\n  }\n}\n\n.matter-is-fullscreen .cm-d-c {\n  width: 100%;\n}\n\n.matter-is-fullscreen .dg.ac,\n.matter-is-fullscreen .ins-container {\n  display: none;\n}\n\n.start-btn {display: none;cursor:pointer;margin: auto;z-index: 9999; position: fixed;right:-15px;padding: 50px 0 0 0;text-align: center;} .cm-d-c-header-outer {\ndisplay:none;  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.2);\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-transition: background 400ms ease;\n  -o-transition: background 400ms ease;\n  transition: background 400ms ease;\n}\n\n.cm-d-c-header-outer:hover {\n  background: rgba(0, 0, 0, 0.7);\n}\n\n.cm-d-c-inline .cm-d-c-header-outer {\n  position: static;\n  background: transparent;\n  z-index: 0;\n  width: 100%;\n}\n\n.cm-d-c-header {\n  width: 100%;\n  padding: 7px 20px 8px 20px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.cm-d-c-inline .cm-d-c-header {\n  padding: 10px;\n}\n\nbody .ins-container,\nbody .dg .dg.main,\nbody .dg .dg.main.a {\n  padding-top: 52px;\n}\n\n@media screen and (min-width: 500px) {\n  .cm-d-c-inline .cm-d-c-header {\n    padding: 10px 30px 16px 30px;\n  }\n}\n\n@media screen and (min-width: 900px) and (min-height: 600px) {\n  .cm-d-c-inline .cm-d-c-header {\n    padding: 10px 30px 36px 30px;\n  }\n}\n\n.cm-d-c-header-inner {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  max-width: 960px;\n  width: 30%;\n}\n\n.cm-d-c-header h1 {\n  display: none;\n  margin: 0;\n  width: 18px;\n  overflow: hidden;\n}\n\n.cm-d-c-header h1 a {\n position: relative;right: 300px; color: #f2f2f5;\n  font-size: 15px;\n  font-weight: 400;\n  font-family: Helvetica, Arial, sans-serif;\n  display: block;\n  text-decoration: none;\n  padding: 8px 0 3px 0;\n  border-bottom: 2px solid transparent;\n  white-space: nowrap;\n  float: right;\n}\n\n@media screen and (min-width: 300px) {\n  .cm-d-c-header h1 {\n    display: inline;\n  }\n}\n\n@media screen and (min-width: 600px) {\n  .cm-d-c-header h1 {\n    width: auto;\n    overflow: visible;\n  }\n}\n\n.btn-home {\n  display: none;\n}\n\n.cm-d-c-title svg {\n  fill: #fff;\n  width: 16px;\n  height: 16px;\n  margin: 0px 0 -2px 4px;\n}\n\n.cm-d-c-close {left: 430px;position: relative; background: url('//act.cmcmcdn.com/upload/201710/fc2680a1c7df924e2a0e3259fecbc95b.png') no-repeat; width: 30px;height:30px;cursor: pointer;} .cm-d-c-header h1 a:hover {\n  border-bottom: 2px solid #298eff;\n}\n\n.cm-d-c-link {\n  font-family: Helvetica, Arial, sans-serif;\n  text-decoration: none;\n  line-height: 13px;\n  margin: 0 -10px 0 0;\n}\n\n.matter-logo {\n  height: 33px;\n  width: 52px;\n}\n\n.matter-logo #m-triangle {\n  -webkit-transform-origin: 14px 856px;\n      -ms-transform-origin: 14px 856px;\n          transform-origin: 14px 856px;\n  -webkit-transition: -webkit-transform 400ms ease;\n  transition: -webkit-transform 400ms ease;\n  -o-transition: transform 400ms ease;\n  transition: transform 400ms ease;\n  transition: transform 400ms ease, -webkit-transform 400ms ease;\n}\n\n.matter-logo:hover #m-triangle {\n  -webkit-transform: rotate(-30deg) translate(-98px, -25px);\n      -ms-transform: rotate(-30deg) translate(-98px, -25px);\n          transform: rotate(-30deg) translate(-98px, -25px);\n}\n\n.matter-logo #m-circle {\n  -webkit-transition: -webkit-transform 200ms ease;\n  transition: -webkit-transform 200ms ease;\n  -o-transition: transform 200ms ease;\n  transition: transform 200ms ease;\n  transition: transform 200ms ease, -webkit-transform 200ms ease;\n  -webkit-transition-delay: 300ms;\n       -o-transition-delay: 300ms;\n          transition-delay: 300ms;\n}\n\n.matter-logo #m-square {\n  -webkit-transition: -webkit-transform 150ms ease;\n  transition: -webkit-transform 150ms ease;\n  -o-transition: transform 150ms ease;\n  transition: transform 150ms ease;\n  transition: transform 150ms ease, -webkit-transform 150ms ease;\n  -webkit-transition-delay: 400ms;\n       -o-transition-delay: 400ms;\n          transition-delay: 400ms;\n}\n\n.matter-logo:hover #m-circle {\n  -webkit-transform: translate(18px, -33px);\n      -ms-transform: translate(18px, -33px);\n          transform: translate(18px, -33px);\n}\n\n.matter-logo:hover #m-square {\n  -webkit-transform: translate(47px, -2px);\n      -ms-transform: translate(47px, -2px);\n          transform: translate(47px, -2px);\n}\n\n.cm-d-c-toolbar {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.matter-select {\n  background: transparent;\n  color: #fff;\n  font-size: 15px;\n  height: 30px;\n  width: 100%;\n  outline: none;\n  padding: 0 7px;\n  margin: 0;\n  border: 0;\n  border-radius: 0;\n  appearance: none;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n}\n\n.prevent-zoom-ios .matter-select {\n  font-size: 16px;\n}\n\n.matter-select-wrapper {\n  width: 20%;\n  min-width: 100px;\n  max-width: 200px;\n  position: relative;\n  display: inline-block;\n  margin: 1px 6% 0 0;\n}\n\n.matter-select-wrapper:hover:after svg {\n  fill: #fff;\n}\n\n.matter-select-wrapper svg {\n  display: block;\n  pointer-events: none;\n  fill: #cecece;\n  width: 22px;\n  height: 22px;\n  position: absolute;\n  top: 4px;\n  right: 5px;\n}\n\n.prevent-zoom-ios .matter-select-wrapper:after {\n  top: 4px;\n}\n\n.matter-btn {\n  font-family: Helvetica, Arial, sans-serif;\n  border: 0;\n  background: rgba(0,0,0,0.1);\n  padding: 2px 0 0 0;\n  width: 40px;\n  height: 33px;\n  border-radius: 2px;\n  display: inline-block;\n  font-size: 16px;\n  line-height: 1;\n  color: #c2cad4;\n  text-decoration: none;\n  text-align: center;\n}\n\n.matter-btn svg {\n  fill: #fff;\n  width: 16px;\n  height: 16px;\n  margin: 2px 0 0 0;\n}\n\n.cm-d-c-inline .matter-btn {\n  background: #0f0f13;\n}\n\n.matter-btn:focus {\n  outline: 0;\n}\n\n.matter-btn:hover {\n  -webkit-transform: translate(0px, -1px);\n      -ms-transform: translate(0px, -1px);\n          transform: translate(0px, -1px);\n}\n\n.matter-btn:active {\n  -webkit-transform: translate(0px, 1px);\n      -ms-transform: translate(0px, 1px);\n          transform: translate(0px, 1px);\n}\n\n.matter-btn:hover {\n  background: #212a3a;\n}\n\n.matter-btn-reset:active svg {\n  fill: #76F09B;\n}\n\n.matter-btn-tools {\n  display: none;\n  font-size: 15px;\n  padding-right: 3px;\n}\n\n.matter-gui-active .matter-btn-tools svg {\n  fill: #F55F5F;\n}\n\n.matter-btn-inspect {\n  display: none;\n}\n\n.matter-inspect-active .matter-btn-inspect svg {\n  fill: #fff036;\n}\n\n.matter-btn-source {\n  display: none;\n  font-size: 12px;\n  text-align: center;\n  line-height: 31px;\n}\n\n.matter-btn-source:active {\n  color: #298eff;\n}\n\n.matter-btn-fullscreen {\n  font-size: 18px;\n}\n\n.matter-btn-source:active svg {\n  fill: #298eff;\n}\n\n.matter-is-fullscreen .matter-btn-tools,\n.matter-is-fullscreen .matter-btn-inspect {\n  display: none;\n}\n\n.matter-is-fullscreen .matter-btn-fullscreen svg {\n  fill: #76F09B;\n}\n\n.ins-container,\nbody .dg {\n  display: none;\n}\n\n@media screen and (min-width: 500px) {\n  .ins-container,\n  body .dg,\n  .matter-btn-tools,\n  .matter-btn-inspect,\n  .matter-btn-source {\n    display: block;\n  }\n}.switch {display: inline-block;margin: 0em 2em;position: relative;border-radius: 3.5em; -webkit-box-shadow: 0 0 0.5em rgba(255,255,255,0.2); -moz-box-shadow: 0 0 0.5em rgba(255,255,255,0.2);box-shadow: 0 0 0.5em rgba(255,255,255,0.2);} .switch label {cursor: pointer;width: 100%;height: 100%;margin: 0;padding: 0;display: block;position: absolute;top: 0;left: 0;z-index: 10;}.switch input {display: none;}.switch span {display: block; -webkit-transition: top 0.2s; -moz-transition: top 0.2s; -ms-transition: top 0.2s; -o-transition: top 0.2s;transition: top 0.2s;}.switch-border1 {border: 0.1em solid #000;border-radius: 3.5em; -webkit-box-shadow: 0 0.2em rgba(255, 255, 255, 0.2); -moz-box-shadow: 0 0.2em rgba(255, 255, 255, 0.2);box-shadow: 0 0.2em rgba(255, 255, 255, 0.2);}.switch-border2 {width: 6.6em;height: 12.6em;position: relative;border: 0.1em solid #323232;background-image: -webkit-gradient(linear, left top, right top, from(#2D2D2D), color-stop(0.5, #4B4B4B), to(#2D2D2D));background-image: -webkit-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: -moz-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: -ms-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: -o-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: linear-gradient(to right, #2D2D2D, #4B4B4B, #2D2D2D);border-radius: 3.4em;}.switch-border2:before,.switch-border2:after {content: '';display: block;width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 0;opacity: .3;border-radius: 3.4em;}.switch-border2:before {background: -webkit-gradient(linear, left top, left bottom, from(#000), to(rgba(0,0,0,0)));background: -webkit-linear-gradient(#000, rgba(0,0,0,0));background: -moz-linear-gradient(#000, rgba(0,0,0,0));background: -ms-linear-gradient(#000, rgba(0,0,0,0));background: -o-linear-gradient(#000, rgba(0,0,0,0));background: linear-gradient(#000, rgba(0,0,0,0));}.switch-border2:after {background: -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(#000));background: -webkit-linear-gradient(rgba(0,0,0,0), #000);background: -moz-linear-gradient(rgba(0,0,0,0), #000);background: -ms-linear-gradient(rgba(0,0,0,0), #000);background: -o-linear-gradient(rgba(0,0,0,0), #000);background: linear-gradient(rgba(0,0,0,0), #000);}.switch-top {width: 100%;height: 84%;position: absolute;top: 8%;left: 0;z-index: 1;background-image: -webkit-gradient(linear, left top, right top, from(#2D2D2D), color-stop(0.5, #4B4B4B), to(#2D2D2D));background-image: -webkit-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: -moz-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: -ms-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: -o-linear-gradient(left, #2D2D2D, #4B4B4B, #2D2D2D);background-image: linear-gradient(to right, #2D2D2D, #4B4B4B, #2D2D2D);border-radius: 3.4em;}.switch-shadow {width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 2;border-radius: 3.4em; -webkit-box-shadow: 0 0 2em black inset; -moz-box-shadow: 0 0 2em black inset;box-shadow: 0 0 2em black inset;}.switch-handle-left,.switch-handle-right {content: '';display: block;width: 3.6em;height: 0;position: absolute;top: 6.6em;z-index: 2;border-bottom: 4.5em solid #111;border-left: 0.7em solid transparent;border-right: 0.7em solid transparent;border-radius: 0;}.switch-handle-left {left: 0.8em;}.switch-handle-right {right: 0.8em;}.switch-handle {width: 3.6em;height: 4.5em;position: absolute;top: 6.6em;left: 1.5em;z-index: 3;background: #333;background-image: -webkit-gradient(linear, left top, right top, from(#111), color-stop(0.4, #777), color-stop(0.5, #888), color-stop(0.6, #777), to(#111));background-image: -webkit-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: -moz-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: -ms-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: -o-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: linear-gradient(to right, #111, #777 40%, #888, #777 60%, #111);border-radius: 0;}.switch-handle-top {width: 5em;height: 5em;position: absolute;top: 8.5em;left: 0.8em;z-index: 4;background-color: #555;background-image: -webkit-gradient(linear, left top, right top, from(#5F5F5F), to(#878787));background-image: -webkit-linear-gradient(left, #5F5F5F, #878787);background-image: -moz-linear-gradient(left, #5F5F5F, #878787);background-image: -ms-linear-gradient(left, #5F5F5F, #878787);background-image: -o-linear-gradient(left, #5F5F5F, #878787);background-image: linear-gradient(to right, #5F5F5F, #878787);border-top: 0.2em solid #AEB2B3;border-radius: 2.5em;}.switch-handle-bottom {width: 3.6em;height: 3.6em;position: absolute;top: 4.7em;left: 1.5em;z-index: 3;background: #333;background-image: -webkit-gradient(linear, left top, right top, from(#111), color-stop(0.4, #777), color-stop(0.5, #888), color-stop(0.6, #777), to(#111));background-image: -webkit-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: -moz-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: -ms-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: -o-linear-gradient(left, #111, #777 40%, #888, #777 60%, #111);background-image: linear-gradient(to right, #111, #777 40%, #888, #777 60%, #111);border-top: 0.2em solid #141414;border-radius: 1.8em;}.switch-handle-base {width: 4.2em;height: 4.2em;position: absolute;top: 3.8em;left: 1.2em;z-index: 2;border-top: 0.2em solid rgba(255,255,255,0.35);border-radius: 2.1em;-webkit-box-shadow: 0 0 0.5em rgba(0,0,0,0.8) inset;-moz-box-shadow: 0 0 0.5em rgba(0,0,0,0.8) inset;box-shadow: 0 0 0.5em rgba(0,0,0,0.8) inset;}.switch-led {position: absolute;left: 2em;border-radius: 1.4em;}.switch-led-border {border: 0.2em solid black;border-radius: 1.3em;}.switch-led-light {border-radius: 1.1em; -webkit-box-shadow: 0 0 0.5em rgba(255,255,255,0.5) inset; -moz-box-shadow: 0 0 0.5em rgba(255,255,255,0.5) inset;box-shadow: 0 0 0.5em rgba(255,255,255,0.5) inset;}.switch-led-glow {width: 2em;height: 2em;position: relative;border-radius: 1em;}.switch-led-glow:before {content: '';display: block;width: 0.6em;height: 0.6em;position: absolute;top: 0.3em;left: 0.7em;background: rgba(255,255,255,0.2);border-radius: 0.3em; -webkit-box-shadow: 0 0 1em rgba(255,255,255,0.75); -moz-box-shadow: 0 0 1em rgba(255,255,255,0.75);box-shadow: 0 0 1em rgba(255,255,255,0.75);}.switch-led-glow:after {content: '';display: block;width: 0;height: 0;position: absolute;top: 0;left: 0;opacity: 0.2;filter: alpha(opacity=20);border: 1em solid #fff;border-color: transparent #fff transparent #fff;border-radius: 1em; -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg);transform: rotate(45deg);}.switch-led:after {display: block;width: 100%;position: absolute;left: 0;color: #666;font-family: arial, verdana, sans-serif;font-weight: bold;text-align: center;text-shadow: 0 0.1em rgba(0,0,0,0.7);}.switch-led-green:after {content: 'UP';top: -1.8em;}.switch-led-red:after {content: 'DOWN';bottom: -1.8em;}.switch-led-green {top: -5em;border-top: 0.1em solid rgba(0,161,75,0.5);border-bottom: 0.1em solid rgba(255,255,255,0.25);}.switch-led-green .switch-led-light {background: rgb(0,161,75);border: 0.1em solid rgb(0,104,56);}.switch-led-red {bottom: -5em;border-top: 0.1em solid rgba(237,28,36,0.2);border-bottom: 0.1em solid rgba(255,255,255,0.25); -webkit-box-shadow: 0 0 3em rgb(237,28,36); -moz-box-shadow: 0 0 3em rgb(237,28,36);box-shadow: 0 0 3em rgb(237,28,36);}.switch-led-red .switch-led-light {background: rgb(237,28,36);border: 0.1em solid rgb(161,30,45);}.switch-led-red .switch-led-glow {background: #fff;background: rgba(255, 255, 255, 0.3);filter: alpha(opacity=30);}.switch input:checked~.switch-handle-left, .switch input:checked~.switch-handle-right {top: 1.5em;border-bottom: 0; -top: 4.5em solid #111;}.switch input:checked~.switch-handle {top: 1.5em;}.switch input:checked~.switch-handle-top  {top: -1em;border-top: 0;border-bottom: 0.2em solid #AEB2B3;}.switch input:checked~.switch-handle-bottom {top: 4.2em;border-top: 0;border-bottom: 0.2em solid #141414;}.switch input:checked~.switch-handle-base {top: 4.5em;border-top: 0;border-bottom: 0.2em solid rgba(255,255,255,0.35);}.switch input:checked~.switch-led-green { -webkit-box-shadow: 0 0 3em rgb(0,161,75); -moz-box-shadow: 0 0 3em rgb(0,161,75);box-shadow: 0 0 3em rgb(0,161,75);}.switch input:checked~.switch-led-green .switch-led-glow {background: #fff;background: rgba(255, 255, 255, 0.4);filter: alpha(opacity=40);}.switch input:checked~.switch-led-red { -webkit-box-shadow: none; -moz-box-shadow: none;box-shadow: none;}.switch input:checked~.switch-led-red .switch-led-glow {background: rgba(255, 255, 255, 0);filter: alpha(opacity=0);}"}])
});
;