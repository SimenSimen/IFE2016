(()=>{
	window.WaterfullAlbum = function (column , margin) {
		column = column || 4 , this.margin = margin || '16px';
		this.albumDiv = document.createElement('div');
		this.albumDiv.className = 'albumDiv';
		this.columns = [];
		this.frames = [];
		for (var i = 0 ; i < column ; i++ ) {
			var div = document.createElement('div');
			div.className = 'column';
			this.albumDiv.appendChild(div);
			this.columns.push(div);
		}
	};
	WaterfullAlbum.prototype.insertAlbum = function (id) {
		var f = document.getElementById(id);
		f.appendChild(this.albumDiv);
	};
	WaterfullAlbum.prototype.addImgFrame = function (imgURL , title , content) {
		title = title || 'title...' , content = content || 'content...';
		var frameBox = document.createElement('div') , img = document.createElement('img');
		var contentBox = document.createElement('div') , titleBox = document.createElement('h3') , pBox = document.createElement('p');
		frameBox.className = 'frameBox';
		contentBox.className = 'contentBox';
		img.src = imgURL;
		titleBox.innerHTML = title;
		pBox.innerHTML = content;
		contentBox.appendChild(titleBox);
		contentBox.appendChild(pBox);
		frameBox.appendChild(img);
		frameBox.appendChild(contentBox);
		img.onload = ()=>{
			this.columns.sort((a,b)=>{return a.offsetHeight - b.offsetHeight;});
			this.columns[0].appendChild(frameBox);
		}
		this.frames.push(frameBox);	
	};
	WaterfullAlbum.prototype.addClickEffect = function () {
		var div = document.createElement('div');
		div.className = 'albumDiv-cover';
		var img = document.createElement('img');
		div.appendChild(img);
		document.getElementsByTagName('body')[0].appendChild(div);
		this.albumDiv.addEventListener('click',(e)=>{
			if(e.target.tagName == 'IMG') {
				div.style = 'display : block';
				img.src = e.target.src ;	
			}
		});
		div.addEventListener('click',(e)=>{
			div.style = '';
		});
	};
	WaterfullAlbum.prototype.changeContent = function (frame , title , content) {
		title = title || 'title...';
		content = content || 'content...';
		var contentBox = frame.children[1] , titleBox = contentBox.children[0] , pBox = contentBox.children[1];
		titleBox.innerHTML = title;
		pBox.innerHTML = content;
	};
})();