(()=>{
	function init () {
		var state = [ '未發佈' , '發佈中' , '已結束'];
		var stateColor =  ['#000000' , '#28FF28' , '#FF0000'];
		var selectAll = false ; 
		function getQuestionnaires () {
			if (localStorage.getItem('questionnaires')) {
				var questionnaires = JSON.parse(localStorage.getItem('questionnaires'));
				return questionnaires ;
			}
			else {
				var firstData = [
					{
						title : '我的第一份問卷' , 
						deadline : { year : 2017 , month : 10 , day : 5} , 
						createDate : [[2017 , 4 , 5 ] , [20 , 35 , 46]],
						questions : [
							{ id : 1, name : 'question-1' , options : ['曹西平' , '西瓜' , '大西瓜'], question : '喜歡的東西', type : 'radio'} ,
							{ id : 2, name : 'question-2' , options : ['曹西平' , '西瓜' , '大西瓜'], question : '不喜歡的東西', type : 'checkbox'} ,
							{ id : 3, name : 'question-3', options : {'0':false}, question : '小胖老師的感想', type : 'textarea' }
						],
						public : false 
					},
					{
						title : '我的第二份問卷' , 
						deadline : { year : 2017 , month : 3 , day : 15}, 
						createDate : [[2017 , 2 , 5] , ['00' , 15 , 26]] ,
						questions : [
							{ id : 1, name : 'question-1' , options : ['曹西平' , '西瓜' , '大西'], question : '喜歡的東西', type : 'radio'} ,
							{ id : 2, name : 'question-2' , options : ['曹西平' , '大西瓜'], question : '不喜歡的東西', type : 'checkbox'} ,
							{ id : 3, name : 'question-3', options : {'0':false}, question : '大胖老師的感想', type : 'textarea' }
						], 
						public : true
					},
					{
						title : '我的第三份問卷' , 
						deadline :  { year : 2017 , month : 5 , day : 9}, 
						createDate : [[2016 , 10 , 5] , ['03' , 25 , 47]] ,
						questions : [
							{ id : 1, name : 'question-1' , options : ['曹西平' , '大西瓜'], question : '喜歡的東西', type : 'radio'} ,
							{ id : 2, name : 'question-2' , options : ['曹西平' , '西瓜' , '大西瓜'], question : '不喜歡的東西', type : 'checkbox'} ,
							{ id : 3, name : 'question-3', options : {'0':false}, question : '中胖老師的感想', type : 'textarea' }
						],
						public : true 
					}
				];

				localStorage.setItem('questionnaires' , JSON.stringify(firstData));
				return firstData ;
			}	
		};
		function randomPercent (n) {
			var numbers = [];
			var total = 0;
			for (var i = 0; i < n ; i++) {
				var a = Math.floor(Math.random()*50+1);
				total += a;
				numbers.push(a);
			}
			return numbers.map((number)=>{
				return Math.floor((number / total)*10000)/100;
			});
		}
		function randomData (qn) {
			var questions = qn.questions.slice();
			var datas = [];
			for(var i = 0, length1 = questions.length; i < length1; i++){
				var data = {};
				switch (questions[i].type) {
					case 'radio' :
						var length2 = questions[i].options.length;
						var rp = randomPercent(length2);
						for (var option = 0 ; option < length2 ; option++) {
							data[questions[i].options[option]] = rp[option];
						}
						datas.push(data);
						break;
					case 'checkbox' :
						var length2 = questions[i].options.length;
						for (var option = 0 ; option < length2 ; option++) {
							data[questions[i].options[option]] = Math.floor(Math.random()*500+1);
						}
						datas.push(data);
						break;
					case 'textarea' :
						var length2 = questions[i].options.length;
						var rp = randomPercent(2);
						data['有效回答'] = rp[0];
						data['無效回答'] = rp[1];
						datas.push(data);
						break;
				}
			}
			return datas;
		}
		function createQuestionnairesBox () {
			var parent = document.getElementsByClassName('questionnaire')[0];
			var tr = document.createElement('tr');
			for(var i = 0 ; i < 5; i++){
				var td = document.createElement('td');
				tr.appendChild(td);
			}
			parent.appendChild(tr);
			return tr;
		}

		function selectAllQuestionnaires () {
			var checkboxes = document.getElementsByClassName('selectBtn');
			selectAll = selectAll == false ? true : false; 
			for(var i = 0, length1 = checkboxes.length; i < length1; i++){
				checkboxes[i].checked = selectAll ; 
			}
		};
		function deleteQuestionnaire (qnData) {
			var questionnaires = JSON.parse(localStorage.getItem('questionnaires'));
			var index = qnData.id - 1 ;
			questionnaires.splice(index , 1);
			localStorage.setItem('questionnaires', JSON.stringify(questionnaires));
		};
		function checkQuestionnaire (qnData) {
			localStorage.setItem('quetionnairePage' , JSON.stringify(qnData));
			location.href = 'questionnairePage.html';
		};
		function editQuestionnaire (qnData) {
			localStorage.setItem('editPage' , JSON.stringify(qnData));
			location.href = 'createQuestionPage.html#editPage';
		};
		function checkDataQnReceived (qnData) {
			localStorage.setItem('dataPage' , JSON.stringify(qnData));
			location.href = 'datapage.html';
		}
		function checkState (data) {
			if (!data.public) 
				return 0 ;
			else {
				var deadline = new Date (data.deadline.year , data.deadline.month-1 , data.deadline.day , 0 , 0 , 0);
				var today = new Date ();
				if (deadline - today >= 0 ) 
					return 1 ;
				else 
					return 2 ;
			}
		};
		function createButtons (box , stateChecked, qnData) {
			if(!stateChecked) {
				var btns = [];
				for(var i = 0 ; i < 3; i++){
					var span = document.createElement('span');
					span.className = 'all-buttons';
					btns.push(span);
					box.appendChild(span);
				}
				btns[0].innerHTML = '編輯' ;
				btns[1].innerHTML = '刪除' ;
				btns[2].innerHTML = '查看問卷' ;
				
				btns[0].addEventListener('click', ()=> {
					editQuestionnaire(qnData);
				});
				btns[1].addEventListener('click', ()=> {
					deleteQuestionnaire(qnData);
					randerQuestionnaires();
				});
				btns[2].addEventListener('click', ()=> {
					checkQuestionnaire(qnData);
				});
			}
			else {
				var btns = [];
				for(var i = 0 ; i < 2; i++){
					var span = document.createElement('span');
					span.className = 'all-buttons';
					btns.push(span);
					box.appendChild(span);
				}
				btns[0].innerHTML = '查看問卷' ;
				btns[1].innerHTML = '查看數據' ;
				
				btns[0].addEventListener('click', ()=> {
					checkQuestionnaire(qnData);
				});
				btns[1].addEventListener('click', ()=> {
					checkDataQnReceived(qnData);
				});
			}	
		};

	/*	function showCreatePageBtn() {
			 
		};*/
		function randerQuestionnaires() {
			var tbody = document.getElementsByClassName('questionnaire')[0];
			tbody.innerHTML = '';
			selectAll = false ;

			var data = getQuestionnaires();

			for(var i = 0, length1 = data.length; i < length1; i++){
				var box = createQuestionnairesBox();
				var stateChecked = checkState(data[i]);
				data[i].state = stateChecked;

				data[i].id = i+1;
				if(data[i].data) {
					if (data[i].data.length == 0 && data[i].state != 0) {
						data[i].data = randomData(data[i]);
						data.splice(i ,1, data[i]);
						localStorage.setItem('questionnaires', JSON.stringify(data));
					}
				}
				else {
					if (data[i].state != 0) {
						data[i].data = randomData(data[i]);
						data.splice(i ,1, data[i]);
						localStorage.setItem('questionnaires', JSON.stringify(data));
					}
				}

				if( i == 0) 
					box.className = 'firstRow';

				var selectBtn = document.createElement('input');
				selectBtn.className = 'selectBtn';
				selectBtn.type = 'checkbox';
				box.children[0].appendChild(selectBtn);

				box.children[1].innerHTML = data[i].title;

				var createDate = data[i].createDate[0].join('-');
				var createHours = data[i].createDate[1].join(':') ;
				box.children[2].innerHTML = createDate + ' ' + createHours;

				box.children[3].innerHTML = state[stateChecked];
				box.children[3].style.color = stateColor[stateChecked];
				
				createButtons(box.children[4] , stateChecked , data[i]);
			}
			var btnBox = createQuestionnairesBox();
			btnBox.className = 'btnRow';

			var selectAllBtn = document.createElement('input');
			var selectText = document.createElement('span');
			selectText.innerHTML = ' 全選';
			selectAllBtn.type = 'checkbox';
			selectAllBtn.addEventListener('click', selectAllQuestionnaires);

			var selectedDeleteBtn = document.createElement('span');
			selectedDeleteBtn.className = 'all-buttons';
			selectedDeleteBtn.innerHTML = '刪除';
			selectedDeleteBtn.addEventListener('click', ()=>{
				var checkboxes = document.getElementsByClassName('selectBtn');
			});

			btnBox.children[0].appendChild(selectAllBtn);
			btnBox.children[0].appendChild(selectText);

			btnBox.children[1].appendChild(selectedDeleteBtn);
		};

		randerQuestionnaires();
	};
	window.addEventListener('load',init) ;
})();