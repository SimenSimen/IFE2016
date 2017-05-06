(()=>{
	function init () {
		var step1 = [1,12] , step2 = [13,36] , step3 = [37,45] , step4 = 50;
		var step1Title = [
			'任務一：零基礎HTML編碼'
			,'任務二：零基礎HTML及CSS編碼（一）'
			,'任務三：三欄式布局'
			,'任務四：定位和居中問題'
			,'任務五：零基礎HTML及CSS編碼（二）'
			,'任務六：通過HTML及CSS模擬報紙排版'
			,'任務七：實現常見的技術產品官網的頁面架構及樣式布局'
			,'任務八：響應式網格（柵格化）布局'
			,'任務九：使用HTML/CSS實現一個復雜頁面'
			,'任務十：Flexbox 布局練習'
			,'任務十一：移動Web頁面布局實踐'
			,'任務十二：學習CSS 3的新特性'
		];
		var step2Title = [
			'任務十三：零基礎JavaScript編碼（一）'
			,'任務十四：零基礎JavaScript編碼（二）'
			,'任務十五：零基礎JavaScript編碼（三）'
			,'任務十六：零基礎JavaScript編碼（四）'
			,'任務十七：零基礎JavaScript編碼（五）'
			,'任務十八：基礎JavaScript練習（一）'
			,'任務十九：基礎JavaScript練習（二）'
			,'任務二十：基礎JavaScript練習（三）'
			,'任務二十一：基礎JavaScript練習（四）'
			,'任務二十二：JavaScript和樹（一）'
			,'任務二十三：JavaScript和樹（二）'
			,'任務二十四：JavaScript和樹（三）'
			,'任務二十五：JavaScript和樹（四）'
			,'任務二十六：行星與飛船（一）'
			,'任務二十七：行星與飛船（二）'
			,'任務二十八：行星與飛船（三）'
			,'任務二十九：表單（一）單個表單項的檢驗'
			,'任務三十：表單（二）多個表單項的動態校驗'
			,'任務三十一：表單（三）聯動'
			,'任務三十二：表單（四）實現表單自動生成工廠'
			,'任務三十三：聽指令的小方塊（一）'
			,'任務三十四：聽指令的小方塊（二）'
			,'任務三十五：聽指令的小方塊（三）'
			,'任務三十六：聽指令的小方塊（四）'
		];
		var step3Title = [
			'任務三十七：UI組件之浮出層'
			,'任務三十八：UI組件之排序表格'
			,'任務三十九：UI組件之凍結行列表格'
			,'任務四十：UI組件之日歷組件（一）'
			,'任務四十一：UI組件之日歷組件（二）'
			,'任務四十二：UI組件之日歷組件（三）'
			,'任務四十三：多功能相冊之拼圖布局'
			,'任務四十四：多功能相冊之瀑布布局'
			,'任務四十五：多功能相冊之木桶布局'
		];
		var url = 'https://simensimen.github.io/IFE2016/mission/';
		function createMissionBox () {
			var div = document.createElement('div');
			var thumbnail = document.createElement('div');
			var href = document.createElement('a');
			var span = document.createElement('span');
			
			div.className = 'col-md-3';
			thumbnail.className = 'thumbnail';
			thumbnail.style.height = 60 + 'px';

			div.appendChild(thumbnail);
			href.appendChild(span);
			thumbnail.appendChild(href);

			return {
				href : href , 
				span  : span ,
				box : div
			};

		}
		function rander () {
			var missionBox = document.getElementsByClassName('missionsBox');

			var mission ;

			var thumbnail = createMissionBox();
			thumbnail.href.href = url +'step4/mission50';
			thumbnail.span.innerHTML = '任務五十：微型調查問卷平台'; 
			missionBox[0].appendChild(thumbnail.box);

			for( var j = 0 , length = step3[1] - step3[0] + 1 ; j < length ; j++) {
				thumbnail = createMissionBox();
				mission = 'mission' + (step3[0]+j) ;
				thumbnail.href.href = url +'step3/' + mission + '.html';
				thumbnail.span.innerHTML = step3Title[j];
				missionBox[1].appendChild(thumbnail.box);
			}

			for(  j = 0 , length = step2[1] - step2[0] + 1 ; j < length ; j++) {
				thumbnail = createMissionBox();
				mission = 'mission' + (step2[0]+j) ;
				thumbnail.href.href = url +'step2/' + mission + '.html';
				thumbnail.span.innerHTML = step2Title[j];
				missionBox[2].appendChild(thumbnail.box);
			}

			for(  j = 0 , length = step1[1] - step1[0] + 1 ; j < length ; j++) {
				thumbnail = createMissionBox();
				mission = 'mission' + (step1[0]+j) ;
				thumbnail.href.href = url +'step1/' + mission + '.html';
				thumbnail.span.innerHTML = step1Title[j];
				missionBox[3].appendChild(thumbnail.box);
			}
		}
		rander();
	}
	window.addEventListener('load' , init);
})();