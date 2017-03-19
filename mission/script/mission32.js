(()=>{
	function init () {
		var elements = {
			typeSelect : document.getElementsByClassName('typeSelect'),
			categoryBox : document.getElementsByClassName('category')[0],
			formSelector : document.getElementById('formSelector'),
			formDemo : [document.getElementById('formDemo1')],
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
			addBtn : document.getElementsByClassName('addBtn'),
			formData : { form1 : [] },
			formElement : {form1 : []},
			inputId :　{form1 : 0}
		}
		var typeState = 0;
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
		function checkDatas(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].value == ''){
					return false;
					break;
				}
			}
			if (i == data.length) {
				return true;
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
			if ( tag.value == preTag.value) {
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
				tag.style.border = '3px solid green';
				p.innerHTML = text;
			}
			else {
				tag.style.border = '3px solid red';
				p.innerHTML = text;
			}	
		}
		function tagValidator (data , tag) {
			if(data.idNumber == 0 && data.sameLimit){
				data.sameLimit = false;
				alert('無前項元素 將自動取消此配置');
			}
			var p = document.createElement('p');
			var min = data.tagName == 'input' ? data.limit[0] : data.limit[2];
			var max = data.tagName == 'input' ? data.limit[1] : data.limit[3];
			tag.parentElement.appendChild(p);
			if (data.sameLimit) {
				var preTag = elements.formElement['form'+ data.formIdNumber][data.idNumber-1];
				tag.addEventListener('blur' , ()=>{
					if (checkSameValidator(tag , preTag).result) {
						data.valid = true;
						validatorEffect (tag , p , '與前項符合' , true);
					}
					else {
						data.valid = false ;
						validatorEffect (tag , p , checkSameValidator(tag , preTag).text , false);
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
				tag.setAttribute('cols',data.limit[0]);
				tag.setAttribute('rows',data.limit[1]);
				fatherNode.appendChild(tag);
				tagValidator(data , tag);
				return tag;
			}
		}
		function InputData (id , formid) {
			var data ; 
			this.idNumber = id ;
			this.formIdNumber = formid;
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
		}
		function randerTag (form , formid) {
			if (form == undefined) {
				alert('尚未建造表單');
				return;
			}
			var newElementData = new InputData(elements.inputId['form' + formid] , formid);
			var tag = createFormElements(newElementData , form);
			elements.formData['form' + formid].push(newElementData);
			elements.formElement['form' + formid].push(tag);
			elements.inputId['form' + formid]++;
		}
		function createNewForm () {
			if (elements.formDemo.length == 4 ) {
				alert('創建數量已達上限');
				return;
			}
			var number = elements.formDemo.length + 1 ;
			var fieldset = document.createElement('fieldset');
			var legend = document.createElement('legend') ;
			legend.innerHTML = '表單 '  + number ;
			fieldset.id = 'formDemo' + number;
			fieldset.className = 'form';
			fieldset.appendChild(legend);
			elements.formBox.appendChild(fieldset);
			elements.formDemo.push(fieldset);
			elements.formData['form' + number] = []
			elements.formElement['form' + number] = [];
			elements.inputId['form' + number] = 0;
			createFormButton(fieldset , number);
		}
		function checkAllvalid (formid) {
			var queue = elements.formData['form'+formid];
			for (var i = 0; i < queue.length; i++) {
				if (!queue[i].valid) {
					alert('提交失敗，請按照格式輸入');
					break;
				}
			}
			if (i == queue.length && i !=  0) {
				alert('提交成功');
			}
		}
		function createFormButton (form , formid) {
			var btn = document.createElement('button');
			btn.className = 'checkBtn';
			btn.innerHTML = '提交';
			form.appendChild(btn);
			btn.addEventListener('click',()=>{
				checkAllvalid(formid);
			});
		}
		function checkDatas(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].value == ''){
					return false;
					break;
				}
			}
			if (i == data.length) {
				return true;
			}
		}
		createFormButton(elements.formDemo[0] , 1);
		elements.categoryBox.addEventListener('change', checkType);
		elements.addBtn[0].addEventListener('click', ()=>{
			var options = elements.formSelector.options;	
			for (var i = 0; i < options.length; i++) {
				if(options[i].selected)
					var option = options[i].innerHTML;			
			}
			var dataIndex = Object.keys(elements.input_Data)[typeState];
			if (!checkDatas(elements.input_Data[dataIndex])) {
				alert('尚未完成設置');
				return ;
			}
			randerTag(elements.formDemo[option-1] , option);
		});
		elements.addBtn[1].addEventListener('click', createNewForm);

	}
	window.onload = ()=>{
		init();
	}
})();