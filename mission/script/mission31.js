(()=>{
	function initStudent () {
		var studentPage = document.getElementById('studentPage');
		var societyPage = document.getElementById('societyPage');
		societyPage.parentNode.removeChild(societyPage);
		societyPage.className = '';
		var studentCheckBtn = document.getElementsByClassName('studentInput');
		var tbody = document.getElementsByTagName('tbody')[0];
		var page = { 
					state : 1 ,
					studentPage : studentPage, 
					societyPage : societyPage
				}
		function changePage (btn) {
			if (page.state == btn.value) {
				return;
			}
			else{
				switch (page.state) {
					case 1:
						page.studentPage.parentNode.removeChild(page.studentPage);
						tbody.appendChild(page.societyPage);
						page.state = 2;
						break;
					case 2:
						page.societyPage.parentNode.removeChild(page.societyPage);
						tbody.appendChild(page.studentPage);
						page.state = 1;
						break;
				}
			}
		}
		
		for (var i = 0; i < studentCheckBtn.length; i++) {
			(()=>{
				studentCheckBtn[i].addEventListener('click' , (event)=>{
				changePage(event.target);
			})
			})();
		}
	}
	function initSchool () {
		var select1 = document.getElementById('select');
		var ori = document.getElementById('select2');
		var placeSchool = {
			taichung : ['潭子高中' , '大里高中' ,'豐原高中' ,'后里高中' ,'神岡高中' , '石岡高中'],
			tainan : ['台南高中' , '玉井高中' ,'南台高中' ,'大南台高中'],
			taipei : ['台北高中' , '成功高中' , '不成功高中' , '大台北高中' , '北台高中'],
			kaushung : ['第一高中' , '大慶高中' , '熊高高中' , '高雄高中'],
			chungwha : ['彰化高中' , '花壇高中'],
			state : 'taichung'
		}
		function checkSchool (place) {
			if (place.value == placeSchool.state) {
				return;
			}
			else{
				ori.innerHTML = '';
				for (var i = 0; i < placeSchool[place.value].length; i++) {
					var option = document.createElement('option');
					option.setAttribute('value' , i+1 );
					option.innerHTML = placeSchool[place.value][i];
					ori.appendChild(option);
				}
				placeSchool.state = place.value;
			}	
		}
		select1.addEventListener('change' , (event)=>{
			var school = event.target.children;
			for (var i = 0; i < school.length; i++) {
				if (school[i].selected) {
					checkSchool(school[i]);
					break;
				}
			}
		});	
	}
	window.onload = ()=> {
		initStudent();
		initSchool();
	};
})();