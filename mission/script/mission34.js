
(()=>{
	function init () {
		var table = document.getElementsByClassName('tableCells');
		var div = document.createElement('div');
		div.className = 'littleBlock-top';
		var elements = {
			tableCells : [] , 
			button : document.getElementById('button') ,	
			input : document.getElementById('input') , 
		}
		var direction = ['top' , 'right' , 'bottom' , 'left']; 
		block = {
			element : div , 
			status : {
				x : 5 ,
				y : 5 ,
				dir : 'top' ,
				pos : 0 ,
				deg : 0 ,
				animating : false
			}
		}
		for (var i = 0; i <  Math.sqrt(table.length); i++) {
			elements.tableCells[i] = [];
			for(var j = 0 + i*10; j <  Math.sqrt(table.length)*(i+1) ;j++){
				elements.tableCells[i].push(table[j]);
			}
		};	
		elements.tableCells[block.status.y][block.status.x].appendChild(block.element);
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

		function turn(clickWise , n) {
			var old = getDirection();
			var tar = clickWise ? old + n : old -n ;
			if (tar >= 4)
				tar = tar % 4;
			else if ( tar < 0)
				tar = 4 - (Math.abs(tar)%4 == 0 ? 4 : Math.abs(tar)%4);
			rotateAnimate(clickWise , n , tar);
		}
		function turnTo (dir) {
			var old = getDirection();
			var dx = dir - old ;
			if (dx) {
				switch (Math.abs(dx)) {
					case 3:
						var cl = dx > 0 ? false : true;
						rotateAnimate(cl , 1 , dir);
						break;
					case 2:
						rotateAnimate(true , dx , dir);
						break;
					case 1:
						var cl = dx > 0 ? true : false;
						rotateAnimate(cl , 1 , dir);
						break;
				}
				return true;
			}
			else{
				return false;
			}
		}
		function move (dir) {
			var pos = getPosition();
			switch (dir) {
				case 0 :
					pos.y -= 1;
					break;
				case 1 :
					pos.x += 1;
					break;
				case 2 :
					pos.y += 1;
					break;
				case 3 :
					pos.x -= 1;
					break;			
			}
			if (pos.x > 9 || pos.x < 0 || pos.y > 9 || pos.y < 0) {
				return;
			}
			else {
				moveAnimaite(pos , dir);				
			}
		}
		function moveAnimaite (pos , n) {
			if(checkAnimating())
				return;
			else{
					switch (n) {
						case 0:
							var c = 1;
							break;
						case 1:
							var c = -1;
							n = 3;
							break;
						case 2:
							var c = -1;
							n = 0;
							break;
						case 3:
							var c = 1;
							break;
					}
					var id = setInterval (()=>{
					block.status.animating = true ;
					block.status.pos -= 1*c ;
					block.element.style[direction[n]] = block.status.pos + 'px';
					if (Math.abs(block.status.pos) == 41) {
						clearInterval(id);
						block.status.animating = false ;
						block.status.pos = 0;
						block.status.x = pos.x;
						block.status.y = pos.y;
						block.element.style[direction[n]] ='';
						elements.tableCells[pos.y][pos.x].appendChild(block.element);
					}
				} ,5);
			}
		}
		function rotateAnimate (clickWise , n ,tar) {
			if(checkAnimating())
				return;
			else {
				block.status.animating = true ;
				var n = clickWise ? n : -1*n;
				var id = setInterval(()=>{
					block.status.deg += n*1;
					block.element.style.transform = 'rotate(' + block.status.deg + 'deg)';
					if (block.status.deg % (90*Math.abs(n)) == 0) {
						clearInterval(id);
						block.status.animating = false ;
						block.element.style.transform = '';
						block.status.deg = 0;
						block.status.dir = direction[tar];
						block.element.className = 'littleBlock-' + direction[tar];
					}			
				},5);
			}
		}
		function checkAnimating () {
			return block.status.animating ; 
		}
		function ex () {
			switch (elements.input.value.toUpperCase()) {
				case 'TUN LFT':			
					turn(false , 1);
					break;
				case 'TUN REG':
					turn(true , 1);
					break;
				case 'TUN BCK':
					turn(true , 2);
					break;
				case 'GO':
					move(getDirection());
					break;
				case 'MOV LFT':
					if(turnTo(3))
						block.status.animating = false;
					move(3);
					break;	
				case 'MOV TOP':
					if(turnTo(0))
						block.status.animating = false;
					move(0);
					break;	
				case 'MOV BOT':
					if(turnTo(2))
						block.status.animating = false;
					move(2);
					break;
				case 'MOV REG':
					if(turnTo(1))
						block.status.animating = false;
					move(1);
					break;	
				case 'TRA BOT':
					move(2);
					break;	
				case 'TRA REG':
					move(1);
					break;	
				case 'TRA LFT':
					move(3);
					break;	
				case 'TRA TOP':
					move(0);
					break;	
			}
		}
		elements.button.addEventListener('click', ex);
	}
	window.addEventListener('load' , init);
})();
