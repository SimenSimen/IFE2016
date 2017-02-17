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
	function reset (){
		if (animating) {
			alert('動畫執行中');
			return false;
		}
		traversal = [];
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
			var re = RegExp(input);
			animating = true;
			traversal = traversal.slice();
			var timer = setInterval(function () {
				if(i > 0)	
					traversal[i-1].style.backgroundColor = 'white';
				if(i < traversal.length){
					traversal[i].style.backgroundColor = 'red';
					if(traversal[i].childNodes[0].nodeValue.match(re)){
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
window.onload = function () {
	var tr = document.getElementsByClassName('super')[0];
	var btn = document.getElementsByTagName('button');
	var dfsbtn = btn[0] , bfsbtn = btn[1] , dfsearch = btn[2] , bfsearch = btn[3];
	dfsbtn.onclick = function () {
		if (reset()) {
		dfs(tr);
		animat(1);
		}
		
	}
	bfsbtn.onclick = function () {
		if (reset()) {
		bfs(tr);
		animat(2);
		}
	}
	dfsearch.onclick =  () => {
		if (reset()) {
		dfs(tr);
		animat(3);
		}
	}
	bfsearch.onclick =  () => {
		if (reset()) {
		bfs(tr);
		animat(4);
		}
	}
};	
})();