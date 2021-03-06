
(()=>{
	function init () {
		var table = document.getElementsByClassName('tableCells');
		var div = document.createElement('div');
		div.className = 'littleBlock-top';
		elements = {
			tableCells : [] , 
			button : document.getElementById('button') ,	
			input : document.getElementById('input')
		}
		var direction = ['top' , 'right' , 'bottom' , 'left']; 
		block = {
			element : div , 
			status : {
				x : 5 ,
				y : 5 ,
				dir : 'top'
			}
		}
		for (var i = 0; i <  Math.sqrt(table.length); i++) {
			elements.tableCells[i] = [];
			for(var j = 0 + i*10; j <  Math.sqrt(table.length)*(i+1) ;j++){
				elements.tableCells[i].push(table[j]);
			}
		};	
		elements.tableCells[block.status.x][block.status.y].appendChild(block.element);
		function getDirection () {
			for (var i = 0; i < direction.length; i++) {
				if(direction[i] == block.status.dir)
				{		
					return i ;
				}
			}
		}
		function getPosition() {
			return { x : block.status.x , y : block.status.y};
		}
		function randerBlock (dir , pos) {
			block.status.dir = dir;
			block.element.className = 'littleBlock-' + block.status.dir;
			elements.tableCells[pos.y][pos.x].appendChild(block.element);
			block.status.x = pos.x ;
			block.status.y = pos.y ;
		}
		function turnLeft () {
			var dir = getDirection();
			var	newDir = dir - 1 >= 0 ? dir - 1 : 3 ;
			randerBlock(direction[newDir] , getPosition());
		
		}
		function turnRight () {
			var dir = getDirection();
			var	newDir = dir + 1 <= 3 ? dir + 1 : 0 ;
			randerBlock(direction[newDir] , getPosition());
		}
		function turnBack () {
			var dir = getDirection();
			var	newDir = dir + 2 <= 3 ? dir + 2 : dir - 2 ;
			randerBlock(direction[newDir] , getPosition());
		}
		function go () {
			var  pos = {
				x : block.status.x,
				y : block.status.y
			}
			switch (block.status.dir) {
				case 'top':
					pos.y -= 1;
					if(pos.x >= 0 && pos.x <= 9 && pos.y >= 0 && pos.y <= 9)
						randerBlock(block.status.dir , pos);
					break;
				case 'right':
					pos.x += 1;
					if(pos.x >= 0 && pos.x <= 9 && pos.y >= 0 && pos.y <= 9)
						randerBlock(block.status.dir , pos);
					break;
				case 'bottom':
					pos.y += 1;
					if(pos.x >= 0 && pos.x <= 9 && pos.y >= 0 && pos.y <= 9)
						randerBlock(block.status.dir , pos);
					break;
				case 'left':
					pos.x -= 1;
					if(pos.x >= 0 && pos.x <= 9 && pos.y >= 0 && pos.y <= 9)
						randerBlock(block.status.dir , pos);
					break;
				
			}
		}
		elements.button.addEventListener('click', ()=> {
			switch (elements.input.value.toUpperCase()) {
				case 'TUN LFT':			
					turnLeft();
					break;
				case 'TUN REG':
					turnRight();
					break;
				case 'TUN BCK':
					turnBack();
					break;
				case 'GO':
					go();
					break;	
			}
		});
	}
	window.onload = init;
})();