(()=>{
	var id = 1;
	window.Album__ = function (tPic) {
		this.id = id , this.tPic = tPic || 1 , this.albumDiv = document.createElement('div');
		this.albumDiv.className = 'albumBox-' + this.tPic ;
		this.pics = [];
		this.picsLink = [];
		for (var imgs = 0; imgs < this.tPic	; imgs++ ) {
			var div = document.createElement('div');
			var img = document.createElement('img');
			var a = document.createElement('a');
			div.className = imgs == 0 ? 'pic' : 'pic'+imgs;
			this.albumDiv.appendChild(div);
			a.appendChild(img);
			div.appendChild(a);
			this.pics.push(img);
			this.picsLink.push(a);
		}
		id++;
	};
})();
Album__.prototype.setImages = function (index , src) {
	if(this.tPic <= index)
		return;
	this.pics[index].src = src ;
	this.picsLink[index].href = src ;
};
Album__.prototype.setAlbum = function (id) {
	document.getElementById(id).appendChild(this.albumDiv);
}
function init () {
	var album1 = new Album__();
	var album2 = new Album__(2);
	var album3 = new Album__(3);
	var album4 = new Album__(4);
	var album5 = new Album__(5);
	var album6 = new Album__(6);

	album1.setAlbum('wrapper');
	album2.setAlbum('wrapper');
	album3.setAlbum('wrapper');
	album4.setAlbum('wrapper');
	album5.setAlbum('wrapper');
	album6.setAlbum('wrapper');

	album1.setImages(0 , 'http://placehold.it/500x750/fff4e5/0077b3');

	album2.setImages(0 , 'http://placehold.it/1500x950/ff4b0f/00b389');
	album2.setImages(1 , 'http://placehold.it/550x600/0efff4/b23e00');

	album3.setImages(0 , 'http://placehold.it/500x900/ff590d/00B2A0');
	album3.setImages(1 , 'http://placehold.it/400x300/ff0d33/1db23a');
	album3.setImages(2 , 'http://placehold.it/1600x900/ff0d17/68ff2d');

	album4.setImages(0 , 'http://placehold.it/900x1920/ffe90d/b198ff');
	album4.setImages(1 , 'http://placehold.it/1376x768/ff7c0d/98eeff');
	album4.setImages(2 , 'http://placehold.it/150x50/ff210d/07b253');
	album4.setImages(3 , 'http://placehold.it/560x450/3e0dff/b2a530');

	album5.setImages(0 , 'http://placehold.it/500x750/4db8ff/b28f5d');
	album5.setImages(1 , 'http://placehold.it/400x850/c3fffc/b2b1b0');
	album5.setImages(2 , 'http://placehold.it/300x350/70ffc1/b27f76');
	album5.setImages(3 , 'http://placehold.it/900x750/e7ff70/802cb2');
	album5.setImages(4 , 'http://placehold.it/900x650/ffc970/2b72b2');

	album6.setImages(0 , 'http://placehold.it/300x150/ceff5e/8200b2');
	album6.setImages(1 , 'http://placehold.it/150x250/85ffcd/b22b0f');
	album6.setImages(2 , 'http://placehold.it/550x600/0efff4/b23e00');
	album6.setImages(4 , 'http://placehold.it/500x1000/b20e00/ffbd99');
	album6.setImages(3 , 'http://placehold.it/700x1200/ffecbd/365bb2');
	album6.setImages(5 , 'http://placehold.it/850x750/ffc57c/087882');
}
window.addEventListener('load',init);
