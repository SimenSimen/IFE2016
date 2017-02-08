(function () {
	var listData =[];
	var re = /[\w\u4e00-\u9fff]+/g;
	//處理輸入的字串
	function addData () {
		 var value = document.getElementById('input').value;
		 var valueList = value.match(re);
		 if (!valueList) {
		 	alert("請輸入合法字元(中文英文或數字)");
		}
		else {
			for (var i = 0; i < valueList.length; i++) {
		 	listData.push(valueList[i]);
		 	}
		}
	}
	function renderList () {
		 var list = document.getElementById('list');
		 list.innerHTML = "";
		for (var i = 0; i < listData.length; i++) {
			var div = document.createElement('div');
			div.className = 'stringbox';
			div.innerHTML = listData[i];
			list.appendChild(div);
		}
	}
	function query () {
		var value = document.getElementById('input').value;
		var divList = document.getElementsByClassName('stringbox');
		if (!value.match(/^[\w\u4e00-\u9fff]+$/)) {
			alert("請輸入中文或英文");
		}
		else{
			var re = new RegExp(value,'g');
			for (var i = 0; i < divList.length; i++) {
				divList[i].innerHTML = divList[i].innerHTML.replace(re ,'<span class = "got">' + value + '</span>' );
			}
		}
	}
	function init () {
		var insert = document.getElementById('insert');
		insert.addEventListener('click', function () {
			addData();
			renderList();
		})
		var search = document.getElementById('search');
		search.addEventListener('click', function () {
			renderList();
			query();
		})
	}
	init();
})();