(()=>{
	function init () {
		// set elements group
		var elements = {
			hint : document.getElementsByClassName('hint-background')[0] ,
			hintWindow :document.getElementsByClassName('hint')[0] ,
			hintBtn : document.getElementsByClassName('hintButton')
		};
		// hintWindow moving data;
		var hintData = {
			x : elements.hintWindow.offsetLeft,
			y : elements.hintWindow.offsetTop
		}
		// close the login page
		function closeLpage (event) {
			if (event.target.className == 'hint-background' || event.target.id == 'hint-cancel') {
				elements.hint.style = 'display:none';
			}		
		};
		// open the login page
		function openLpage () {
			elements.hintWindow.removeAttribute('style');
			elements.hint.className = 'background';
			var color = 255;
			var id = setInterval(()=>{
				elements.hint.style.background = 'rgba(' + color + ',' + color + ','+ (color - 30) +',0.5)';
				color -= 3;
				if (color < 150) {
					clearInterval(id);
					elements.hint.removeAttribute('style');
				}
			} , 15);
		}
		// drag window 
		function drag (event) {
			if(event.target.id == 'hintHeaderText') {
				var dix = event.clientX - elements.hintWindow.offsetLeft ;
				var diy = event.clientY - elements.hintWindow.offsetTop ;
			 	event.target.style.cursor = 'all-scroll';
			 	elements.hint.onmousemove = (event) =>{
					elements.hintWindow.style.left = event.clientX - dix + 225 + 'px';
					elements.hintWindow.style.top = event.clientY - diy + 100 + 'px';
			 	};
			}
		}
		function drop(event) {
			if(event.target.id == 'hintHeaderText') {
			 	event.target.removeAttribute('style');
				elements.hint.onmousemove = '';
			}
		}	
		elements.hint.addEventListener('click' , closeLpage);
	}
	window.addEventListener('load', init);

})();