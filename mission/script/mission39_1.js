(()=>{
	function init () {
		var title = c_('title')[0];
		var table = c_('tg')[0];
		function fixtop (e) {
			var height = table.offsetHeight ;
			var left = table.offsetLeft ;
			var top = table.offsetTop;
			if(e.target.scrollingElement.scrollTop > top && e.target.scrollingElement.scrollTop < height){
				title.style.position = 'fixed';
				title.style.top = 0;
				title.style.left = left  -1 + 'px';
			}
			else if (e.target.scrollingElement.scrollTop > height) {
				title.removeAttribute('style');
			}
			else if (e.target.scrollingElement.scrollTop < top - 20){
				title.removeAttribute('style');
			}
		}
		window.addEventListener('scroll' , fixtop);
	}
	window.addEventListener('load',init);
})();