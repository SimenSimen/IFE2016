//實作收縮list
(()=>{
	function folderOpener (img) {
		var open = '../img/openfolder.png';
		var closed = '../img/closefolder.png';
		var value = img.getAttribute('src').value;
		value = value == open ? closed : open;
	}
	window.onload = () => {
		
	};
})();