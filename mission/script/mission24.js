(function () {
	var traversal = [];
	var bfsindex  = 0;
	var animating = false;
	function dfs (troot) {
		traversal.push(troot);
		for(var i = 0; i < troot.children.length ; i++){
			dfs(troot.children[i]);
		}
	}
	function bfs (troot) {
		if (troot) {
			traversal.push(troot);
			bfs(troot.nextElementSibling);
			troot = traversal[bfsindex++];
			bfs(troot.firstElementChild); 
		}	
	}
	function reset (node){
		if (animating) {
			alert('動畫執行中');
			return false;
		}
		traversal = [];
		bfsindex = 0;
		node.style.borderColor = 'black';
		return true;
	}
	function animat(btn) {
		if (btn == 1 || btn == 2) {
			var i = 0; 
			animating = true;
			traversal = traversal.slice();
			var timer = setInterval(function () {
				if(i > 0)	
				traversal[i-1].style.backgroundColor = 'white';
				if(i < traversal.length)
				traversal[i].style.backgroundColor = 'red';
				if(i == traversal.length){
					clearInterval(timer);
					animating = false ; 
			}
			i++;
		}, '500');
		}
		else {
			var i = 0;
			var input = document.getElementsByTagName('input')[0].value;
			if (!input) {
				alert('請勿空白');
				return;
			}
			animating = true;
			traversal = traversal.slice();
			var timer = setInterval(function () {
				if(i > 0)	
					traversal[i-1].style.backgroundColor = 'white';
				if(i < traversal.length){
					traversal[i].style.backgroundColor = 'red';
					if(traversal[i].childNodes[0].nodeValue === input){
						clearInterval(timer);
						animating = false ; 
					}
				}
				if(i == traversal.length){
					clearInterval(timer);
					animating = false ; 
			}
			i++;
		}, '500');
		}
	}
	function addNodes (node) {
		var input = document.getElementsByTagName('input')[1].value;
		var div = document.createElement('div');
		div.innerHTML = input;
		node.appendChild(div);
	}
	function deleteNodes (node) {
		if (node) {		
			if(node.className == 'super'){
				alert('請勿移除主框');
				return;
			}
			node.parentNode.removeChild(node);
		}
	}
window.onload = () => {
	var tr = document.getElementsByClassName('super')[0];
	var btn = document.getElementsByTagName('button');
	var dfsbtn = btn[0] , bfsbtn = btn[1] , dfsearch = btn[2] , bfsearch = btn[3] , addNodesbtn = btn[4] , deletebtn = btn[5];
	var selectqueue = [];
	dfsbtn.onclick = () => {
		if (reset(selectqueue[0])) {
		dfs(tr);
		animat(1);
		}
	}
	bfsbtn.onclick = () => {
		if (reset(selectqueue[0])) {
		bfs(tr);
		animat(2);
		}
	}
	dfsearch.onclick = () => {
		if (reset(selectqueue[0])) {
		dfs(tr);
		animat(3);
		}
	}
	bfsearch.onclick = () => {
		if (reset(selectqueue[0])) {
		bfs(tr);
		animat(4);
		}
	}
	addNodesbtn.onclick = () => {
		reset(selectqueue[0]);
		addNodes(selectqueue[0]);
	}
	deletebtn.onclick = () => {
		deleteNodes(selectqueue[0]);
	}
	tr.addEventListener('click',(event) => {
		if (event.target.tagName == 'DIV') {
			if (selectqueue.length)
				selectqueue[0].style.borderColor = 'black';
			selectqueue = [];
			selectqueue.push(event.target);
			event.target.style.borderColor = 'red';
		}
	});;
};	
})();