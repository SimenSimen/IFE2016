(()=>{
	function init () {
		var elements = {
			typeSelect : document.getElementsByClassName('typeSelect'),
			categoryBox : document.getElementsByClassName('category')[0],
			formDemo : document.getElementById('formDemo'),
			formBox : document.getElementById('formDemoBox'),
			typeBox : [
				document.getElementById('textType'),
				document.getElementById('textAreaType'),
				document.getElementById('radioType'),
				document.getElementById('checkboxType'),
				document.getElementById('selectType')
			],
			input_Data : {
				textTypeData : document.getElementsByClassName('textTypeData'),
				textAreaTypeData : document.getElementsByClassName('textAreaTypeData'),
				radioTypeData : document.getElementsByClassName('radioTypeData'),
				checkboxTypeData : document.getElementsByClassName('checkboxTypeData'),
				selectTypeData : document.getElementsByClassName('selectTypeData')
			},
			addBtn : document.getElementsByClassName('addBtn')
		}
		var typeState = 0;
		var inputId = 0;
		var formElementQueue = [];
		var formDataQueue = [];
		function checkType () {
			for (var i = 0; i < elements.typeSelect.length; i++) {
				if (elements.typeSelect[i].checked) {
					elements.typeBox[i].className = '';
					typeState = i;
				}
				else {
					elements.typeBox[i].className = 'hidden';
				}
			}
		}
		function necessaryValidator (value) {
			if (value != '') {
				return {result : true , text :''};
			}
			else {
				return {result : false , text :'此單位必填'};
			} 
		}
		function lengthValidator (min , max , value) {
			if ( min <= value.length && max >= value.length) {
				return {result : true , text :''};
			}
			else {
				return {result : false , text :'此單位最小由 ' + min + ' ~ ' + max + '個字元組成' };
			} 
		}
		function checkSameValidator (tag , preTag) {
			if ( tag.innerHTML == preTag.innerHTML) {
				return {result : true , text :''};
			}
			else {
				return {result : false , text :'與前項不一致'};
			} 
		}
		function validatorEffect ( tag , p , text ,con) {
			if(con == undefined)
				con = true;
			if (con) {
				tag.style.border = '1px solid lightgreen';
				p.innerHTML = text;
			}
			else {
				tag.style.border = '1px solid red';
				p.innerHTML = text;
			}	
		}
		function tagValidator (data , tag) {
			var p = document.createElement('p');
			var min = data.tagName == 'input' ? data.limit[0] : data.limit[2];
			var max = data.tagName == 'input' ? data.limit[1] : data.limit[3];
			tag.parentElement.appendChild(p);
			if (data.sameLimit) {
				tag.addEventListener('blur' , ()=>{
					var arr = [
						necessaryValidator(tag.value),
						lengthValidator(min , max , tag.value),		
						checkSameValidator(tag , formElementQueue[tag.idNumber-1])];
						for (var i = 0; i < arr.length; i++) {
							if(!arr[i].result){
								data.valid = false ;
								validatorEffect (tag , p , arr[i].text , arr[i].result);
								break;
							}
							else if(i == arr.length-1){
								data.valid = true ; 
								validatorEffect (tag , p , '格式正確' , true);
							}
						}
				});
			}
			else if(data.necessary) {
				tag.addEventListener('blur' , ()=>{
					var arr = [
						necessaryValidator(tag.value),
						lengthValidator(min , max , tag.value)	
						]
						for (var i = 0; i < arr.length; i++) {
							if(!arr[i].result){
								data.valid = false ;
								validatorEffect (tag , p , arr[i].text , arr[i].result);
								break;
							}
							else if(i == arr.length-1){
								data.valid = true ; 
								validatorEffect (tag , p , '格式正確' , true);
							}
						}
				});
			}
			else {
				tag.addEventListener('blur' , ()=>{
					var result = lengthValidator(min , max , tag.value).result;
					var text = lengthValidator(min , max , tag.value).text;
					if (result) {
						data.valid = true ; 
						validatorEffect (tag , p , '格式正確' , true);	
					}
					else {
						data.valid = false ;
						validatorEffect (tag , p , text , result);
					}			
				});
			}
		}
		function createFormElements (data , fatherNode) {
			if (data.type == 'radio' || data.type == 'checkbox'){
				var fieldset = document.createElement('fieldset');
				var legend = document.createElement('legend');
				legend.innerHTML = data.labeltext;
				fieldset.appendChild(legend);
				for (var i = 0; i < data.subElement.length; i++) {
					var label = document.createElement('label');
					var tag = document.createElement(data.tagName);
					var br = document.createElement('br');
					tag.type = data.type;
					if(i == 0)
						tag.checked = true ;
					tag.setAttribute('name', data.name);
					label.innerHTML = data.subElement[i] + ' ';
					fieldset.appendChild(label);
					fieldset.appendChild(tag);
					fieldset.appendChild(br);
				}
				fatherNode.appendChild(fieldset);
				return tag;
				data.valid = true;
			}
			else if (data.type == 'text') {
				var tag = document.createElement(data.tagName);
				var label = document.createElement('label');
				var br = document.createElement('br');
				label.innerHTML = data.labeltext + ' : ';
				fatherNode.appendChild(label);
				fatherNode.appendChild(tag);
				tagValidator(data , tag);
				fatherNode.appendChild(br);
				return tag;
			}
			else if (data.tagName == 'select'){
				var tag = document.createElement(data.tagName);
				var label = document.createElement('label');
				var br = document.createElement('br');
				label.innerHTML = data.labeltext + ' : ';
				for (var i = 0; i < data.subElement.length; i++) {
					var option = document.createElement('option');
					option.innerHTML = data.subElement[i] ;
					tag.appendChild(option);
				}
				fatherNode.appendChild(label);
				fatherNode.appendChild(tag);
				fatherNode.appendChild(br);
				return tag;
			}
			else {
				var tag = document.createElement(data.tagName);
				var br = document.createElement('br');
				tag.setAttribute('placeholder',data.labeltext);
				tag.setAttribute('col',data.limit[0]);
				tag.setAttribute('row',data.limit[1]);
				fatherNode.appendChild(tag);
				tagValidator(data , tag);
				fatherNode.appendChild(br);
				return tag;
			}
		}
		function InputData () {
			var data ; 
			this.idNumber = inputId;
			this.valid = false;
			this.limit = [];
			switch (typeState) {
				case 0:
					data = elements.input_Data.textTypeData;
					this.tagName = 'input';
					this.type = 'text';
					break;
				case 1:
					data = elements.input_Data.textAreaTypeData;
					this.tagName = 'textarea';
					break;
				case 2:
					data = elements.input_Data.radioTypeData;
					this.tagName = 'input';
					this.type = 'radio';
					this.name = 'group-' + inputId;			
					break;
				case 3:
					data = elements.input_Data.checkboxTypeData;
					this.tagName = 'input';
					this.type = 'checkbox';
					this.name = 'group-' + inputId;	
					break;
				case 4:
					data = elements.input_Data.selectTypeData;
					this.tagName = 'select';
					break;			
				
			}
			for (var i = 0; i < data.length; i++) {
				switch (data[i].type) {
					case 'text' : 
						this.labeltext = data[i].value; 
						break;
					case 'radio' :
						this.necessary = data[i].value;
						break;
					case 'number':
						this.limit.push(data[i].value);
						break;	
					case 'checkbox':
						this.sameLimit = data[i].checked;
						break;
				}
				if (data[i].tagName == 'TEXTAREA') {
					this.subElement = data[i].value.match(/[\w\u4e00-\u9fff]+/g);
				}
			}
			inputId++;
		}
		function randerTag () {
			var newElementData = new InputData();;
			var tag = createFormElements(newElementData , elements.formDemo);
			formDataQueue.push(newElementData);
			formElementQueue.push(tag);
		}
		function createNewForm () {
			var div = document.createElement('div');
			div.className = 'form';
			elements.formBox.appendChild(div);
			elements.formDemo = div;
		}
		elements.categoryBox.addEventListener('change', checkType);
		elements.addBtn[0].addEventListener('click', randerTag);
		elements.addBtn[1].addEventListener('click', createNewForm);

	}
	window.onload = ()=>{
		init();
	}
})();