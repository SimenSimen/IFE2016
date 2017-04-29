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
						public : false ,
						data : {}
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
						public : true,
						data : {}
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
						public : true ,
						data : {}
					}
				];

				localStorage.setItem('questionnaires' , JSON.stringify(firstData));
				return firstData ;
			}	
		};
		function createQuestionnairesBox () {
			var parent = document.getElementsByClassName('questionnaire')[0];
			var tr = document.createElement('tr');
			for(var i = 0 ; i < 5; i++){
				var td = document.createElement('td');
				tr.appendChild(td);
			}
			parent.insertBefore(tr,document.getElementsByClassName('btnRow')[0]);
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
			console.log(qnData);
		};
		function checkQuestionnaire (qnData) {
			console.log(qnData);
		};
		function editQuestionnaire (qnData) {
			localStorage.setItem('editPage' , JSON.stringify(qnData));
			location.href = 'createQuestionPage.html#editPage';
		};
		function checkDataQnReceived (qnData) {
			console.log(qnData);
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
			var data = getQuestionnaires();
			for(var i = 0, length1 = data.length; i < length1; i++){
				var box = createQuestionnairesBox();
				var stateChecked = checkState(data[i]);

				data[i].state = stateChecked;

				data[i].id = i+1;
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
		};

		selectAllBtn.addEventListener('click', selectAllQuestionnaires );
		selectedDeleteBtn.addEventListener('click', ()=>{});
		randerQuestionnaires();
	};
	window.addEventListener('load',init) ;
})();