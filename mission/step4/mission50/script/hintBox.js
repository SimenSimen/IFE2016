(()=>{
	function init () {
		// set elements group
		var elements = {
			hint : document.getElementsByClassName('hint-background')[0] ,
			hintWindow :document.getElementsByClassName('hint')[0] ,
			hintBtn : document.getElementsByClassName('hintButton')
		};
		// close the login page
		function closeLpage (event) {
			if (event.target.className == 'hint-background' || event.target.id == 'hint-cancel' || event.target.className == 'closebtn') {
				elements.hint.style = 'display:none';
			}		
		};
		elements.hint.addEventListener('click' , closeLpage);
	}
	window.addEventListener('load', init);

})();