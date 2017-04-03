(()=>{
	function init () {
		var title = c_('title')[0];
		window.addEventListener('scroll' , ()=>{
			console.log(title.scrollTop);
		});
	}
	window.addEventListener('load',init);
})();