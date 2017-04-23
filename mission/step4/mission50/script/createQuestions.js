(()=>{
	function init () {
		var inputName = document.createElement('input');
		var inputTitle = '這裡是一個問題';
		var inputOption = document.createElement('input');
		var questions = [];
		inputName.id = 'setQnsId';
		inputName.value = inputTitle;
		inputOption.id = 'setQnsoption';
		function setQuestion (title , type ,options) {
			
		}
		$( '#addBtn' ).click(() => {
			$( '.selectQ:eq(0)').slideDown('fast');
		});

		$('.buttons:eq(0)').on('click' , () => {
			$('.hint-background').fadeIn('fast');
			$('.hintContent').html('');
			inputOption.value = '';
			inputName.value = inputTitle;
			$('.hintContent').append(inputName , inputOption);
		});
		$('.buttons:eq(1)').on('click' , () => {
			$('.hint-background').fadeIn('fast');
			$('.hintContent').html('');
			inputOption.value = '';
			inputName.value = inputTitle;
			$('.hintContent').append(inputName , inputOption);
		});
		$('.buttons:eq(2)').on('click' , () => {
			$('.hint-background').fadeIn('fast');
			$('.hintContent').html('');
			inputOption.value = '';
			inputName.value = inputTitle;
			$('.hintContent').append(inputName);
		});
	}
	window.addEventListener('load',init);
})();