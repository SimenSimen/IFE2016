(()=>{
	function init () {
		var input = document.getElementsByTagName('input');
		var p = document.getElementsByTagName('p');
		var button = document.getElementById('button');
		var submitCheck = {
		input0 : false ,
		input1 : false ,
		input2 : false ,
		input3 : false ,
		input4 : false
		}
	function validFn( elementP , elementInput , callback , str1) {
		var check = callback.call(this , elementInput);
		if (check.check) {
			elementInput.style.border = '1px solid lightgreen';
			elementP.innerHTML = str1 ;
			elementP.style.color = 'lightgreen';
			return true;
		}
		else {
			elementInput.style.border = '1px solid red';
			elementP.innerHTML = check.errorMessage ;
			elementP.style.color = 'red';
		}
			return false;
	}
	function checkLength (str) {
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
	function checkName (element) {
		var inputValue = element.value;
		var inputLength = checkLength(inputValue);
		if (inputLength == 0) {
			return {check: false , errorMessage : '名稱不能空白'};
		}
		else if ( inputLength >= 4 && inputLength <= 16) {
			return {check: true , errorMessage : ''};
		}
		else {
			return {check: false , errorMessage : '請輸入4~16個字元'};
		}
	}
	function checkPassword (element) {
		var inputValue = element.value;
		var inputLength = checkLength(inputValue);
		var matchValue = inputValue.match(/^[\w]+/);
		if (inputLength == 0) {
			return {check: false , errorMessage : '密碼不能空白'};
		}
		else if ( inputLength >= 4 && inputLength <= 16 && matchValue) {
			return {check: true , errorMessage : ''};
		}
		else {
			return {check: false , errorMessage : '請輸入4~16個英文數字'};
		}
	}
	function confirmPassword (element) {
		var inputValue = element.value;
		var passwordValue = input[1].value;
		var matchValue = inputValue.match(/^[\w]+/);
		if (inputValue == passwordValue) {
			if (inputValue.length == 0) {
				return {check: false , errorMessage : '此欄位不能空白'};
			}
			return {check: true , errorMessage : ''};
		}
		else {
			return {check: false , errorMessage : '密碼不一致'};
		}
	}
	function checkE_mail (element) {
		var inputValue = element.value;
		var matchValue = inputValue.match(/^[\w]+@[\w]+\.[\w]{2,}/);
		if (!matchValue) {
			return {check: false , errorMessage : 'E-mail格式錯誤'};
		}
		else {
			return {check: true , errorMessage : ''};
		}
	}
	function checkPhoneNumber(element) {
		var inputValue = element.value;
		var matchValue = inputValue.match(/09[0-9]{2}-[0-9]{6}/);
		if (!matchValue) {
			return {check: false , errorMessage : '電話號碼錯誤'};
		}
		else {
			return {check: true , errorMessage : ''};
		}
	}
	input[0].addEventListener('blur' , ()=>{
		submitCheck.input0 = validFn( p[0] , input[0] , checkName , '名稱格式正確' );
	});
	input[1].addEventListener('blur' , ()=>{
		submitCheck.input1 = validFn( p[1] , input[1] , checkPassword , '密碼可使用' );
	});
	input[2].addEventListener('blur' , ()=>{
		submitCheck.input2 = validFn( p[2] , input[2] , confirmPassword , '密碼一致' );
	});
	input[3].addEventListener('blur' , ()=>{
		submitCheck.input3 = validFn( p[3] , input[3] , checkE_mail, 'E-mail格式正確' );
	});
	input[4].addEventListener('blur' , ()=>{
		submitCheck.input4 = validFn( p[4] , input[4] , checkPhoneNumber , '電話格式正確' );
	});	
	button.addEventListener('click', ()=>{
		for (inputs in submitCheck) {
			if (!submitCheck[inputs]) {
				alert('提交失敗');
				return;
			}
		}

		alert ('提交成功');
	});
	}
	window.onload = ()=>{
		init();
	}
})();