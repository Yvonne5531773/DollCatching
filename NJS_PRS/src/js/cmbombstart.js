
(function(){
	if (!window.requestAnimationFrame) {
		bigBomb && bigBomb.notSupport();
		bigBomb && bigBomb.report({node: 1031100, w: 'coinboom', cid: '57471519', snode: 1365, expand: 'not-support'});
	}else{
		var cmbomb = document.createElement('script');
		cmbomb.src = '//act.cmcmcdn.com/1111/bigbang/NJS_PRS/output/js/cmbombi.js';
		document.getElementsByTagName('head')[0].appendChild(cmbomb);
	}
})()