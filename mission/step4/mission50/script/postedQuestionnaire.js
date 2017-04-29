(()=>{
	function init () {
		function getQuestionnaireData () {
			if (localStorage.getItem('quetionnairePage')) {
				var qn = JSON.parse(localStorage.getItem('quetionnairePage'));
				return qn ;
			}
			else {
				alert('請點擊查看問卷');

				location.href = 'index.html';
			}
		}
		function createQuestionBox (question) {
			var parent = document.getElementsByClassName('questions')[0];
			var box = document.createElement('div');
			var header = document.createElement('div');
			var optionbox = document.createElement('div');
			var title1 = document.createElement('span');
			var title2 = document.createElement('span');
			title1.className = 'titleNumber';
			title2.className = 'titleText';
			box.className = 'questionBox';
			header.className = 'questionBoxHeader';
			optionbox.className = 'questionBoxOptions';
			header.appendChild(title1);
			header.appendChild(title2);
			box.appendChild(header);
			box.appendChild(optionbox);
			parent.appendChild(box);

			title2.innerHTML = question.question;
			title1.innerHTML = 'Q' + question.id;
			if (question.type == 'textarea') {
				var textarea = document.createElement('textarea');
				textarea.name = question.name;
				optionbox.appendChild(textarea);
			}
			else {
				for(var i = 0, length1 = question.options.length; i < length1; i++){
					var input = document.createElement('input');
					var span = document.createElement('span');
					var div = document.createElement('div');
					input.name = question.name;
					input.type = question.type;
					span.innerHTML = question.options[i];

					div.appendChild(input);
					div.appendChild(span);
					optionbox.appendChild(div);
				}
			}		
		}
		function createSubmitBtn () {
			var form  = document.getElementsByClassName('questions')[0];
			var input = document.createElement('input');
			var div = document.createElement('div');
			div.className = 'submitbox';
			input.type = 'submit';
			input.value = '提交';
			div.appendChild(input);
			form.appendChild(div);
		}
		function rander () {
			var qn = getQuestionnaireData();

			titleText.innerHTML = qn.title;

			for(var i = 0, length1 = qn.questions.length; i < length1; i++){
				createQuestionBox(qn.questions[i]);
			}

			if(qn.state != 0) 
				createSubmitBtn();	
		}
		rander();
	}
	window.addEventListener('load', init );
	window.addEventListener('unload' , ()=>{
		localStorage.removeItem('quetionnairePage');
	});
})();