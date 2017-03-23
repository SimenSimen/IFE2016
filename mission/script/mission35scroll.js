 (()=>{
 	function init () {
 		elements = {
	 		div : document.getElementById('lineNumber') ,
	 		input : document.getElementById('input')
	 	};
	 	var lineData = {
	 		number : 10 ,
	 		lastDir : 0
	 	}
 		function createNumber () {
 			lineData.number += 1;
 			var div = document.createElement('div');
 			div.className = 'numberingDiv';
 			div.innerHTML = lineData.number + '.';
 			elements.div.appendChild(div);
 		}
 		elements.input.addEventListener('scroll',(event)=>{
 			if (elements.input.scrollTop >= lineData.lastDir) {
 				createNumber();
 			}
 			elements.div.scrollTop = elements.input.scrollTop ;
 			lineData.lastDir = elements.input.scrollTop;
 		}); 
 	}
 	window.onload = init;
 })();