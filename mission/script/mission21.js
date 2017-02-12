(function(){
	var somedata = {
	tags:[] ,
	hobbies:[] , 
	add : function (input) {
		if (input.id === "tagsInput"){
			if (!input.value.match(/^[A-Za-z]+$/)) {
				alert("未輸入合法字元");
				return ; 
			}
			else {
				if (this.tags.filter(function (value) {return  value == input.value ;}).length) {
					return;
				}
				else {
					if (this.tags.length>10) {
						this.tags.shift();
						this.tags.push(input.value);
					}
					else
					this.tags.push(input.value);
				}
			}
		}
		if (input.id === "hobbiesInput"){
			var match = input.value.match(/[\w\u4e00-\u9fff]+/g);
			if (!match) {
				alert("請輸入合法字元(用符號或空格隔開)");
				return ; 
			}
			else {
				for(var i = 0 ; i < match.length; i++){
					this.hobbies.push(match[i]);
				}
				var fn = function () {
					for (var i = 0; i < this.length; i++) {
						for(var j = i+1 ; j < this.length; j++){
							if(this[i] === this[j])
							this.splice(j,1);
						}
					}
				}
				for(var k = 0; k < 100; k++){
				 	fn.call(this.hobbies);
				 	if (this.hobbies.length > 10) {
						this.hobbies.shift();
					}
				}
				
			}
		}	
	} ,
	delete : function (element , list) {
		if (list == 'tagsList') 
			this.tags.splice(element.getAttribute('data-set'),1);
		else
			this.hobbies.splice(element.getAttribute('data-set'),1);
		
	} ,
	render : function () {		
		var tagsList = document.getElementById('tagsList');
		var hobbiesList = document.getElementById('hobbiesList');
			tagsList.innerHTML = "";
			hobbiesList.innerHTML = "";
		for (var i = 0; i < somedata.tags.length; i++) {
			var div = document.createElement('div');
			div.setAttribute('data-set', i);
			div.className = 'tagsBox';
			div.innerHTML = somedata.tags[i];
			tagsList.appendChild(div);
		}
		for (var i = 0; i < somedata.hobbies.length; i++) {
			var div = document.createElement('div');
			div.setAttribute('data-set', i);
			div.className = 'hobbiesBox';
			div.innerHTML = somedata.hobbies[i];
			hobbiesList.appendChild(div);
		}
	}
};
function init () {
	var tagsInput = document.getElementById('tagsInput');
	var hobbiesInput = document.getElementById('hobbiesInput');
	var hobbiesBtn = document.getElementById('hobbiesBtn');
	var lists = [ document.getElementById('tagsList') , document.getElementById('hobbiesList')];
	for(var i = 0; i < lists.length; i++){
	(function () {
		lists[i].addEventListener('mouseover' , function (event) {
			var ele = event.target ;
			if (ele.className == 'tagsBox' || ele.className =='hobbiesBox') {
				var pren = ele.className;
				var prehtml = ele.innerHTML;
				ele.className = 'deletedBox';
				ele.innerHTML = '點擊刪除' + prehtml;
				ele.addEventListener('mouseout' , function (event) {
					ele.className = pren;
					ele.innerHTML = prehtml ;
				});
			}
		});
		lists[i].addEventListener('click' , function (event) {
			var ele = event.target;
			if (ele.className =='deletedBox') {
				somedata.delete(ele,this.id)
				somedata.render();
			}
		});
	})();
	}
	tagsInput.addEventListener('keypress' , function (event) {
		if (event.keyCode == 13) {
			somedata.add(this);
			somedata.render();
		}
	});
	hobbiesBtn.addEventListener('click' , function (even) {
		somedata.add(hobbiesInput);
		somedata.render();
	});
}
window.onload = init;
})();