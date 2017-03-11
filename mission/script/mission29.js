(()=>{
	function init () {
		var input = document.getElementById('input');
		var button = document.getElementById('button');
		var para = document.getElementById('para');
		function checkLength (str){
			var inputLength = 0;
			for (var i = 0; i < str.length; i++) {
				if ( str[i].charCodeAt() >=0 && str[i].charCodeAt() <= 128) {
					inputLength += 1;
				}
				else {
					inputLength +=2
				}
			}
			return inputLength;
		}

		function check (argument) {
			if (checkLength(input.value) < 4 || checkLength(input.value) > 16) {
				if (input.value.length == 0) {
					input.style.border = '1px solid red';
					para.style.color = 'red';
					para.innerHTML = '姓名不能為空';
				}
			}
			else{
				input.style.border = '1px solid green';
				para.innerHTML = '格式正確';
				para.style.color = 'green';
			}
		}

		button.addEventListener('click', check);
		input.addEventListener('click' , ()=>{
			input.style.border = '';
			para.innerHTML = '';
			para.style.color = '';
		});
	}

	window.onload = ()=>{
		init();
	}
})();