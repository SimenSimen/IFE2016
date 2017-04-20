(()=>{
	var id = 0;

	window.Flicker = function () {
		this.id = id , this.albumDiv = document.createElement('div') , this.albumDiv.className = 'albumDiv' , this.rows = [] , this.imgs = [] , this.baseHeight = 300;
		var row = document.createElement('div');
		row.className = 'album-row';
		this.rows.push(row);
		this.albumDiv.appendChild(row);
	};
	Flicker.prototype.insertAlbum = function (id) {
		var f = document.getElementById(id);
		f.appendChild(this.albumDiv);
	};
	Flicker.prototype.getImg = function (url) {
		var img = document.createElement('img');
		img.src = url;
		this.imgs.push(img);
	};
	Flicker.prototype.checkRow = function (min , max) {
		var row = this.rows[this.rows.length - 1];
		for(var i = 0, length = this.imgs.length ; i < length; i++){
			if (row.children.length < min || row.offsetWidth < this.albumDiv.offsetWidth -50) {
				row.appendChild(this.imgs[0]);
				this.imgs.shift();
			}
			else {
				var height = row.offsetHeight/row.offsetWidth * this.albumDiv.offsetWidth;
				row.style.height = height + 'px';
			}
		}

	};
	Flicker.prototype.randerImg = function () {
		this.checkRow(3 , 6);
	};
		
})();
