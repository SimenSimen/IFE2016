var listData = [];
//確認input的值
function checkinput (input) {
	// body... 
	if(!input.match(/^\d+$/) || input < 10 || input > 100){
		alert('plz enter a int 10 -100');
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
		if (listData.length <=60) {
			list.innerHTML = "";
			for (var i = 0; i < listData.length; i++) {
		var div = document.createElement('div');
		div.className = 'numberbox';
		div.style.height = listData[i] +'px';
		div.setAttribute('data-set', i);
		div.setAttribute('title', listData[i]);
		div.addEventListener('click',clickout);
		list.appendChild(div);
			}
		}
		else{
			alert('請勿超過60組');
		}
	
}
function bubbleSort () {
	// body... 
	var i = 0;
	var same = 0;
	var  timer = setInterval(function () {
		if (i==listData.length) {
			if (same != 0) {
				i=0;
			}
			else{
			clearInterval(timer);
			}
		}
		if (listData[i]>listData[i+1]) {
			listData.splice(i,2,listData[i+1],listData[i]);
			renderList();
			same ++;
		}
		i++;
	},20);

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
	document.getElementById('bubbleSort').addEventListener('click',function () {
		/* body... */
		bubbleSort();
	});

}

init();