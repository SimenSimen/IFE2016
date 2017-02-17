(function () {
	var binaryTree ={
		traversal : [],
		animating : false,
		getRoot : function () {
			return document.getElementsByClassName('level0')[0];
		},
		preOrder : function (node) {
			if( node != null ){
				this.traversal.push(node);
				this.preOrder(node.firstElementChild);
				this.preOrder(node.lastElementChild);
			}
		},
		inOrder : function (node) {
			if( node != null ){
				this.inOrder(node.firstElementChild);
				this.traversal.push(node);
				this.inOrder(node.lastElementChild);
			}
		},
		postOrder :function (node) {
			if( node != null ){
				this.postOrder(node.firstElementChild);
				this.postrder(node.lastElementChild);
				this.traversal.push(node);
			}
		},
		animat : function () {
			var i = 0;
			this.animating = true;
			var traversal = this.traversal.slice();
			var timer = setInterval(function () {
					if(i > 0)	
					traversal[i-1].style.backgroundColor = 'white';
					if(i < traversal.length)
					traversal[i].style.backgroundColor = 'red';
					if(i == traversal.length){
						clearInterval(timer);
						binaryTree.animating = false;
					}
					i++;
			} ,'500' );
		},
		init : function () {
			if (this.animating) {
			alert('動畫執行中');
			return false;
		}
			this.traversal = [];
			return true;
		}
	}	
function init(){
	var dlrbtn = document.getElementById('DLRbtn');
	var ldrbtn = document.getElementById('LDRbtn');
	var lrdbtn = document.getElementById('LRDbtn');
	dlrbtn.addEventListener('click', function () {
		if (binaryTree.init()) {
			binaryTree.preOrder(binaryTree.getRoot());
			binaryTree.animat();
		}
	});
	ldrbtn.addEventListener('click', function () {
		if (binaryTree.init()) {
			binaryTree.inOrder(binaryTree.getRoot());
			binaryTree.animat();
		}
	});
	lrdbtn.addEventListener('click', function () {
		if (binaryTree.init()) {
			binaryTree.preOrder(binaryTree.getRoot());
			binaryTree.animat();
		}
	});
	
}
window.onload = init;
})();