(()=>{
	function init () {
		var inputName = document.createElement('input');
		var inputTitle = '請在這裡輸入問題';
		var radioText = '，下方輸入選項(以任何符號隔開)';
		var inputOption = document.createElement('input');
		var manipulate = ['上移','下移' ,'複製','刪除'];
		var questions = [];
		var inputType;
		inputName.id = 'setQnsId';
		inputName.value = inputTitle;
		inputOption.id = 'setQnsoption';
		function createButtons (type , n , name , label , box) {
			if(type == 'textarea') {
				var textarea = document.createElement('textarea');
				var input = document.createElement('input');
				var span = document.createElement('span');
				span.innerHTML = '此題是否必填';
				span.className = 'necesseryBtntext';
				input.type = 'checkbox';
				input.checked = true;
				input.className = 'necesseryBtn';
				textarea.name = name;
				box.append(textarea);
				box.append(input);
				box.append(span);
			}
			else {
				for(var i = 0 ; i < n; i++){
					var div = document.createElement('div');
					var input = document.createElement('input');
					var labels = document.createElement('span');
					labels.innerHTML = label[i];
					input.type = type;
					input.name = name;
					input.value = label[i];
					div.appendChild(input);
					div.appendChild(labels);
					box.append(div);
				}
			}
		}
		function createQuestionBox () {
			var box = document.createElement('div');
			var header = document.createElement('div');
			var optionbox = document.createElement('div');
			var footer = document.createElement('div');
			var title1 = document.createElement('span');
			var title2 = document.createElement('span');
			title1.className = 'titleNumber';
			title2.className = 'titleText';
			box.className = 'questionBox';
			header.className = 'questionBoxHeader';
			optionbox.className = 'questionBoxOptions';
			footer.className = 'questionBoxFooter';	
			header.appendChild(title1);
			header.appendChild(title2);
			box.appendChild(header);
			box.appendChild(optionbox);
			box.appendChild(footer);
			$('.questions').append(box);
		}
		function setQuestion (title , type , options) {
			var match = options ? options.match(/[\w\3400-\u9fff]+/g) : undefined;
			var questionJson = { 
				id : questions.length + 1 , 
				name : 'question-' +  (questions.length + 1) ,
				type : type ,
				question : title , 
				options : match 
			};
			questions.push(questionJson);
		}
		function setInterface (qn) {
			var div = document.createElement('div');
			for(var i = 0, length1 = manipulate.length; i < length1; i++){
				var span = document.createElement('span');
				span.innerHTML = manipulate[i];
				span.className = 'tableBtns';
				div.appendChild(span);	
			}
			div.style ='display:none';
			$('.questionBoxFooter:eq('+(qn.id-1)+')').append(div);
			$('.questionBox:eq('+(qn.id-1)+')').on('mouseenter' , ()=>{
				div.style ='';
			});
			$('.questionBox:eq('+(qn.id-1)+')').on('mouseleave' , ()=>{
				div.style ='display:none';
			});
			div.children[0].addEventListener('click' , ()=>{ moveUp(qn);});
			div.children[1].addEventListener('click' , ()=>{ moveDown(qn);});
			div.children[2].addEventListener('click' , ()=>{ cloneQ(qn);});
			div.children[3].addEventListener('click' , ()=>{ deleteQ(qn);});
		}
		function checkInterface () {
			var btns = document.getElementsByClassName('tableBtns');
			for(var i = 0, length1 = btns.length; i < length1; i++){
				btns[i].removeAttribute('style');
			}
			if(questions.length == 1) {
				var btn = document.getElementsByClassName('questionBoxFooter')[0].children[0];
				btn.children[0].style = 'display :none';
				btn.children[1].style = 'display :none';
			}
			else {
				var first = document.getElementsByClassName('questionBoxFooter')[0].children[0];
				var last  = document.getElementsByClassName('questionBoxFooter')[questions.length-1].children[0];
				first.children[0].style = 'display :none';
				last.children[1].style = 'display :none';
			}
		}
		function moveUp (qn) {
			var index = questions.indexOf(qn);
			var preQn = questions[index-1];
			var qnbox = document.getElementsByClassName('questionBox')[index];
			var preQnbox = qnbox.previousElementSibling;
			var wrapper = document.getElementsByClassName('questions')[0];
			var title = document.getElementsByClassName('titleNumber')[index];
			var ptitle = document.getElementsByClassName('titleNumber')[index-1];
			var optionBox = document.getElementsByClassName('questionBoxOptions')[index];
			var preoptionBox = document.getElementsByClassName('questionBoxOptions')[index-1];

			preQn.id = index+1;
			qn.id = index;
			preQn.name = 'question-' + preQn.id;
			qn.name = 'question-' + qn.id ;

			if (qn.type == 'textarea') {
				optionBox.children[0].name = qn.name;
			}
			else {
				for(var i = 0, length1 = optionBox.children.length; i < length1; i++){
					optionBox.children[i].children[0].name = qn.name;
				}
			}
			if (preQn.type == 'textarea') {
				preoptionBox.children[0].name = preQn.name;
			}
			else {
				for(var j = 0, length2 = preoptionBox.children.length; j < length2; j++){
					preoptionBox.children[j].children[0].name = preQn.name;
				}
			}
			questions.splice(index-1, 2 , qn ,preQn);
			$('.questionBox').eq(index).fadeOut(100 ,()=>{
				title.innerHTML = 'Q'+index;
				ptitle.innerHTML = 'Q'+(index+1);
				wrapper.removeChild(qnbox);
				wrapper.insertBefore(qnbox, preQnbox);
				checkInterface();
				$('.questionBox').eq(index-1).fadeIn(100);
			});	
		}
		function moveDown (qn) {
			var index = questions.indexOf(qn);
			var nextQn = questions[index+1];
			var qnbox = document.getElementsByClassName('questionBox')[index];
			var nextQnbox = qnbox.nextElementSibling;
			var wrapper = document.getElementsByClassName('questions')[0];
			var title = document.getElementsByClassName('titleNumber')[index];
			var ntitle = document.getElementsByClassName('titleNumber')[index+1];
			var optionBox = document.getElementsByClassName('questionBoxOptions')[index];
			var nextoptionBox = document.getElementsByClassName('questionBoxOptions')[index+1];

			nextQn.id = index+1;
			qn.id = index+2;
			nextQn.name = 'question-' + nextQn.id;
			qn.name = 'question-' + qn.id ;

			if (qn.type == 'textarea') {
				optionBox.children[0].name = qn.name;
			}
			else {
				for(var i = 0, length1 = optionBox.children.length; i < length1; i++){
					optionBox.children[i].children[0].name = qn.name;
				}
			}
			if (nextQn.type == 'textarea') {
				nextoptionBox.children[0].name = nextQn.name;
			}
			else {
				for(var j = 0, length2 = nextoptionBox.children.length; j < length2; j++){
					nextoptionBox.children[j].children[0].name = nextQn.name;
				}
			}
			questions.splice(index, 2 , nextQn , qn);
			$('.questionBox').eq(index).fadeOut(100 ,()=>{
				title.innerHTML = 'Q'+(index+2);
				ntitle.innerHTML = 'Q'+(index+1);
				wrapper.removeChild(nextQnbox);
				wrapper.insertBefore(nextQnbox, qnbox);
				checkInterface();
				$('.questionBox').eq(index+1).fadeIn(100);
			});
		}
		function cloneQ (qn) {
			if (questions.length == 10) 
				return alert('輸入問題數已達上限');
			console.log(qn);
		}
		function deleteQ (qn) {
			console.log(qn);
		}
		
		function randerQuestion(randerAll) {
			if (randerAll) {
				for(var i = 0, length1 = questions.length; i < length1; i++){
					questions[i]
				}
			}
			else {
				var newQn = questions[questions.length-1] ;
				$('.titleNumber:last').html('Q' + newQn.id);
				$('.titleText:last').html(newQn.question);
				setInterface(newQn);
				checkInterface();
				createButtons(newQn.type , newQn.options.length ,newQn.name , newQn.options , $('.questionBoxOptions:last'));
			}
		}
		if (location.hash == '#editpage') {
			
		}
		$( '#addBtn' ).click(() => {
			$( '.selectQ:eq(0)').slideDown('fast');
		});
		$('.buttons:eq(0)').on('click' , () => {
			$('.hint-background').fadeIn('fast');
			$('.hintContent').html('');
			inputType = 'radio';
			inputOption.value = '';
			inputName.value = inputTitle + radioText;
			$('.hintContent').append(inputName , inputOption);
		});
		$('.buttons:eq(1)').on('click' , () => {
			$('.hint-background').fadeIn('fast');
			$('.hintContent').html('');
			inputType = 'checkbox';
			inputOption.value = '';
			inputName.value = inputTitle + radioText;
			$('.hintContent').append(inputName , inputOption);
		});
		$('.buttons:eq(2)').on('click' , () => {
			$('.hint-background').fadeIn('fast');
			$('.hintContent').html('');
			inputType = 'textarea';
			inputOption.value = false;
			inputName.value = inputTitle;
			$('.hintContent').append(inputName);
		});
		$('#hint-confirm').on('click' , () => {
			if (!inputOption.value || !inputName.value)
				alert('請輸入至少一個選項 :');
			else if (questions.length == 10) 
				alert('輸入問題數已達上限');
			else {
				setQuestion(inputName.value , inputType , inputOption.value);
				createQuestionBox();
				randerQuestion();
			}
			$('.hint-background').slideUp('fast');
		});
	}
	window.addEventListener('load',init);
})();