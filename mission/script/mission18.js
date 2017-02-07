var listData = [];
//確認input的值
function checkinput (input) {
	// body... 
	if(!input.match(/^\d+$/)){
		alert('plz enter a int');
		return false;
	}
	return true;
}
//對listData陣列進行處理
function leftin() {
	var input = document.getElementById('input').value;
	if (checkinput(input)) {
		// statement
		listData.unshift(input);
	}
}
function rightin () {
	// body... 
	var input = document.getElementById('input').value;
	if (checkinput(input)) {
		// statement
		listData.push(input);
	}
}
function leftout () {
	// body... 
	listData.shift();
}
function rightout () {
	// body... 
	listData.pop();

}
function clickout () {
	// body... 
	var position = this.getAttribute('data-set');
	listData.splice(position,1);
	renderList();
}
//渲染list
function renderList () {
	var list = document.getElementById('list');
		list.innerHTML = "";
	for (var i = 0; i < listData.length; i++) {
		var div = document.createElement('div');
		div.innerHTML = listData[i];
		div.className = 'numberbox';
		div.setAttribute('data-set', i);
		div.addEventListener('click',clickout);
		list.appendChild(div);
	}
}

function init()  {
	// body... 
	document.getElementById('leftin').addEventListener('click',function () {
		leftin();
		renderList();
	});
	document.getElementById('rightin').addEventListener('click',function () {
		rightin();
		renderList();
	});
	document.getElementById('leftout').addEventListener('click',function () {
		/* body... */
		if (listData.length>0) {
			alert(listData[0]);
		}
		leftout();
		renderList();
	});
	document.getElementById('rightout').addEventListener('click',function () {
		/* body... */
		if (listData.length>0) {
			alert(listData[listData.length-1]);
		}
		rightout();
		renderList();
	});

}

init();