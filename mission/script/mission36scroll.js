(()=>{
	function scroll () {
		var elements = {
			div : document.getElementById('lineNumber') ,
			input : document.getElementById('input') ,
			reset : document.getElementById('reset') ,
			numberingDiv : ()=>{
				return document.getElementsByClassName('numberingDiv');
			}
		};
		var lineData = {
			number : 1 ,
			enterNumber : 0
		};
		function createNumber () {
			lineData.number += 1;
			var div = document.createElement('div');
			div.className = 'numberingDiv';
			div.innerHTML = lineData.number + '.';
			elements.div.appendChild(div);
		}
		function deleteNumber (div) {
			lineData.number -= 1;
			div.parentNode.removeChild(div);
		}
		function checkLine () {
			var t = elements.input.value.match(/\n/g);
			var dx = ( t == null ? 0 : t.length )- lineData.enterNumber;
			if (dx == 0) 
				return {result:false};
			else
				return{dx : dx , result:true};	
		}
		function updataLine () {
			var  check = checkLine();
			if (check){
				if (check.result) {
					if (check.dx > 0) {
						for (var i = 0; i < check.dx; i++) {
							lineData.enterNumber += 1;
							createNumber();
						}
					}
					else {
						for (var i = 0; i < Math.abs(check.dx); i++) {
							lineData.enterNumber -= 1;
							deleteNumber(elements.numberingDiv()[lineData.number-1]);
						}	
					}	
				}	
			}
		}
		elements.input.addEventListener('scroll',(event)=>{
			elements.div.scrollTop = elements.input.scrollTop ;
		});
		elements.reset.addEventListener('click' , ()=>{
			elements.input.value ='';
			lineData.number = 0;
			lineData.enterNumber = 0;
			elements.div.innerHTML = '';
			createNumber();
		});
		elements.input.addEventListener('keydown' , (event)=> {
			elements.div.scrollTop = elements.input.scrollTop ;
			updataLine();
			switch (event.key) {
				case 'Enter':
					lineData.enterNumber += 1;
					createNumber();
					break;
			}
		});
		elements.input.addEventListener('keyup' , (event)=> {
			elements.div.scrollTop = elements.input.scrollTop ;
			updataLine();
		});
	}
	window.addEventListener('load' , scroll);
})();