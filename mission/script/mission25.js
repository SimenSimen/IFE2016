//實作收縮list 開合資料夾
(()=>{
	function folderOpener (img) {
		var open = '../img/openfolder.png';
		var closed = '../img/closefolder.png';
		var value = img.getAttribute('src');
		value = value == open ? closed : open;
		img.setAttribute('src' , value)
	}
	function listHidden (ul){
		var hidden = 'is-hidden';
		var showUp = 'show up';
		ul.className = ul.className == hidden ? showUp : hidden;
	}
	window.onload = () => {
		var img = document.getElementsByClassName('listImg');
		var ul = document.getElementsByClassName('is-hidden');
		var span = document.getElementsByClassName('subtitle')
		for(var i = 0; i < img.length; i++){
			((img , ul , span) => {
				img.addEventListener('click',() => {
					folderOpener(img);
					listHidden(ul);
				} );
				span.addEventListener('click',() => {
					folderOpener(img);
					listHidden(ul);
				} );
			})(img[i] , ul[i] ,span[i]);
		}
	};
})();
