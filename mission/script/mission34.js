
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
		var block = {
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
		function AnimationCenter () {
			this.id = 0 , this.animationQueue = [];
			this.setTimer = (fn , n)=>{
				if (this.id != 0) {
					fn.n = n;
					this.animationQueue.push(fn);
				}
				else {
					this.id = setInterval(fn , n);
				}
			}
			this.removeTimer = ()=>{
				clearInterval(this.id);
				this.id = 0;
				if (this.animationQueue.length != 0) {	
					this.setTimer(this.animationQueue[0] , this.animationQueue[0].n);
					this.animationQueue.shift();
				}	
			}
		}
		var animationCenter = new AnimationCenter();
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
			animationCenter.setTimer(rotateAnimate(clickWise , n , tar) , 5);
		}
		function turnTo (dir) {
			var old = getDirection();
			var dx = dir - old ;
			if (dx) {
				switch (Math.abs(dx)) {
					case 3:
						var cl = dx > 0 ? false : true;
						animationCenter.setTimer(rotateAnimate(cl , 1 , dir) , 5);
						break;
					case 2:
						animationCenter.setTimer(rotateAnimate(true , dx , dir) , 5);
						break;
					case 1:
						var cl = dx > 0 ? true : false;
						animationCenter.setTimer(rotateAnimate(cl , 1 , dir) , 5);	
						break;
				}
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
				animationCenter.setTimer(moveAnimaite(pos , dir) , 5);
			}
		}
		function moveAnimaite (pos , n) {
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
			block.status.x = pos.x;
			block.status.y = pos.y;
			var fn = ()=>{
				block.status.pos -= 1*c ;
				block.element.style[direction[n]] = block.status.pos + 'px';
				if (Math.abs(block.status.pos) == 41) {
					block.status.pos = 0;
					block.element.style[direction[n]] ='';
					elements.tableCells[pos.y][pos.x].appendChild(block.element);
					animationCenter.removeTimer();
				}	
			}
			return fn;
		}
		function rotateAnimate (clickWise , n ,tar) {
			block.status.dir = direction[tar];
			var n = clickWise ? n : -1*n;
			var fn = ()=>{
				block.status.deg += n*1;
				block.element.style.transform = 'rotate(' + block.status.deg + 'deg)';
				if (block.status.deg % (90*Math.abs(n)) == 0) {
					block.element.style.transform = '';
					block.status.deg = 0;
					block.element.className = 'littleBlock-' + direction[tar];
					animationCenter.removeTimer();
				}				
			}
			return fn ;
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
					turnTo(3);
					move(3);
					break;	
				case 'MOV TOP':
					turnTo(0);
					move(0);
					break;	
				case 'MOV BOT':
					turnTo(2);
					move(2);
					break;
				case 'MOV REG':
					turnTo(1);
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
		elements.input.addEventListener('keydown', (e)=>{
			if (e.key == 'Enter') {
				ex();
			}
		});
	}
	window.addEventListener('load' , init);
})();
