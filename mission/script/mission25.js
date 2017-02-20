(()=>{
	var searchList = [];
	function folderOpener (img) {
		var open = '../img/openfolder.png';
		var closed = '../img/closefolder.png';
		var value = img.getAttribute('src');
		value = value == open ? closed : open;
		img.setAttribute('src' , value)
	}
	function listHidden (ul){
		var hidden = 'is-hidden';
		var showUp = 'show-up';
		ul.className = ul.className == hidden ? showUp : hidden;
	}
	function addElement (parent , childValue) {
		var div = document.createElement('div');
		div.className = 'classBlock';
		var img = document.createElement('img');
		img.className = 'listImg';
		img.setAttribute('src','../img/closefolder.png');
		var span = document.createElement('span');
		span.className = 'subtitle';
		span.innerHTML = childValue;
		var divList = document.createElement('div');
		divList.className = 'is-hidden';
		div.appendChild(img);
		div.appendChild(span);
		div.appendChild(divList);
		parent.appendChild(div);
	}
	function deleteElements (node) {
		node.parentNode.removeChild(node);
	}
	function searchinit () {
		searchList = [];
	}
	function searchNode (troot , value) {
		if (troot && troot.className == 'subtitle') {
			if(troot.innerHTML == value )
				searchList.push(troot);
		}
		for(var i = 0; i < troot.children.length ; i++){
				searchNode(troot.children[i] , value);
			}
		return searchList;
	}
	function inputClear (input) {
		input.value = "";
	}
	function searchEffect (nodes) { 
		for (var i = 0; i < nodes.length; i++) {
			console.log(nodes);
			var color = 100;
			var timer = setInterval(() => {
				var rgb = color.toString(16) + color.toString(16) + color.toString(16);
				toUpperCase(rgb);
				node[i].style.border = '2px solid' + ' #' + rgb;
				color++;
				if (color == 255) {
					clearInterval(timer);
				}
			} , '100');
		}
	}
	function init() {
		window.onload = () => {
			var input = document.getElementsByTagName('input');
			var button = document.getElementsByTagName('button');
			var troot = document.getElementsByClassName('main')[0];
			troot.addEventListener('click',(event) => {
				var element = event.target;
				if (element.className == 'listImg' || element.className == 'subtitle') {
					folderOpener(element = element.className == 'listImg' ? element : element.previousElementSibling);
					listHidden(ul = element.className == 'listImg' ? element.nextElementSibling.nextElementSibling : element.nextElementSibling);
				}
			});
			button[0].addEventListener('click' , ()=>{
					var value = input[0].value ; 
					if(!value){
						alert('請輸入內容');
						return ;
					}
					searchinit();
					var results = searchNode(troot , value);
					for (var i = 0; i < results.length; i++) {
						searchEffect(results[i]);
						var parent = results[i].parentElement.parentElement;
						var img = parent.previousElementSibling.previousElementSibling;
						if(parent.className == 'is-hidden'){
							folderOpener(img);
							listHidden(parent);
						}
					}	
			});
			button[1].addEventListener('click' , ()=>{
				inputClear(input[0]);
			});
		};
	}
	init();
})();
