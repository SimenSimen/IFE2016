
(()=>{
	function init () {
		var table = document.getElementsByClassName('tableCells');
		var div = document.createElement('div');
		div.className = 'littleBlock-top';
		var elements = {
			tableCells : [] , 
			button : document.getElementById('button') ,	
			input : document.getElementById('input') ,
			wallBtn : document.getElementById('wallMaker'),
			numberingDiv : ()=>{
				return document.getElementsByClassName('numberingDiv');
			} ,
			redNumberingDiv : []
		}
		var block = {
			element : div , 
			status : {
				x : 5 ,
				y : 5 ,
				dir : 'top' ,
				pos : 0 ,
				deg : 0 ,
				animating : false
			},
			commandQueue : []
		}
		var direction = ['top' , 'right' , 'bottom' , 'left'];
		var wallBlock = {
			position : [] 
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
		var wallAnimationCenter = new AnimationCenter();
		
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
		function checkArroundPosition (dir) {
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
			return pos ;
		}
		function move (dir) {
			var pos = checkArroundPosition(dir);
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
			prePos = {x : block.status.x , y : block.status.y};
			block.status.x = pos.x;
			block.status.y = pos.y;
			var fn = ()=>{
				block.status.pos -= 2*c ;
				block.element.style[direction[n]] = block.status.pos + 'px';
				if (Math.abs(block.status.pos) == 82) {
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
		function getCommandText () {
			var commands = elements.input.value;
			commands = commands.toUpperCase();
			var pos = [];
			var index = 0;
			if (commands.match(/\n/g)) {
				var enterLength = commands.match(/\n/g).length;
				for (var i = 0; i < enterLength; i++) {
					index = commands.indexOf('\n', i == 0 ? index : index+1);
					pos.push(index);
				}
				var text = [];
				text.push(commands.slice(0 , pos[0]));
				for (var i = 0; i < pos.length; i++) {
					text.push(commands.slice(pos[i]+1 , pos[i+1] ? pos[i+1] : commands.length));
				}
				return text;
			}
			return [commands];	
		}
		function checkError (catched, ori , i) {
			if(catched == ori)
				block.commandQueue.push(catched);
			else {
				elements.numberingDiv()[i].style.backgroundColor = 'red';
				elements.redNumberingDiv.push(elements.numberingDiv()[i]);	
			}
		}
		function checkCommand() {
			var commands = getCommandText();
			for (var i = 0; i < commands.length ; i++) {
				if(commands[i] == 'BUILD'){
					block.commandQueue.push(commands[i]);
					continue;
				}
				if (commands[i].match(/GO *[0-9]{0,1}/)) {
					var match = commands[i].match(/GO *[0-9]{0,1}/)[0];
					checkError(match , commands[i] , i);
				}
				else if (commands[i].match(/BRU #[0-9a-fA-F]{6}/)) {
					var match = commands[i].match(/BRU #[0-9a-fA-F]{6}/)[0];
					checkError(match , commands[i] , i);
				}
				else if(commands[i].match(/(MOV|TRA|TUN) (REG|BOT|LFT|BCK|TOP) *[0-9]{0,1}/)) {
					var match = commands[i].match(/(MOV|TRA|TUN) (REG|BOT|LFT|BCK|TOP) *[0-9]{0,1}/)[0];
					checkError(match , commands[i] , i);
				}
				else if (commands[i].match(/MOV TO \([0-1]{0,1}[0-9],[0-1]{0,1}[0-9]\)/)) {
					var match = commands[i].match(/MOV TO \([0-1]{0,1}[0-9],[0-1]{0,1}[0-9]\)/)[0];
						match = parseInt(match.match(/[0-9]+/g)[0]) > 10 || parseInt(match.match(/[0-9]+/g)[1]) > 10 || parseInt(match.match(/[0-9]+/g)[0]) == 0 || parseInt(match.match(/[0-9]+/g)[1]) == 0 ? 0 : match;

					checkError(match , commands[i] , i);
				}
				else
				{	
					elements.numberingDiv()[i].style.backgroundColor = 'red';
					elements.redNumberingDiv.push(elements.numberingDiv()[i]);
				}
			}
		}
		function clearEffect(){
			for (var i = 0; i < elements.redNumberingDiv.length; i++) {
				elements.redNumberingDiv[i].style = '';
			}
		}
		function checkWall (pos) {
			for (var i = 0; i < wallBlock.position.length; i++) {
				if (wallBlock.position[i].x == pos.x && wallBlock.position[i].y == pos.y)
					return true;
			}
			if(i == wallBlock.position.length)
				return false;
		}
		function changeWallColor (color) {
			var pos = checkArroundPosition(getDirection());
			if(checkWall(pos))
				elements.tableCells[pos.y][pos.x].style.backgroundColor = color;
			else
				console.log('There\'is no wall');
		}
		function bulidBlock () {
			var pos = checkArroundPosition(getDirection());
			if (pos.x > 9 || pos.x < 0 || pos.y > 9 || pos.y < 0 || checkWall(pos)) {
				console.log('can\'t build here');
				return;
			}
			else {
				wallBlock.position.push(pos);
				animationCenter.setTimer(bulidBlockAnimation(pos) , 5);
			}
		}
		function randomBuild () {
			if(wallBlock.position.length == 99)
				return
			var pos = {};
			pos.x = Math.ceil(Math.random()*10 -1);
			pos.y = Math.ceil(Math.random()*10 -1);
			if(pos.x == block.status.x && pos.y == block.status.y || checkWall(pos)){
				randomBuild ();
				return;
			}
			wallBlock.position.push(pos);
			wallAnimationCenter.setTimer(bulidBlockAnimation(pos) , 5);
		}
		function bulidBlockAnimation (pos) {
			var c = 254;

			var fn = ()=>{
				var cl = c.toString(16);
				elements.tableCells[pos.y][pos.x].style.backgroundColor = '#' + cl + cl +cl ;
				c -= 2;
				if (c == 184) {
					wallAnimationCenter.removeTimer();
				}
			}
			return fn ;
		}
		function calculatePath (pos) {
			var path = [];
			var fn = (ori)=>{				
				if (ori.x < 10 && ori.x >= 0 && ori.y >= 0 && ori.y < 10 ) {
					path.push(ori);
					if(pos.x == ori.x && pos.y == ori.y)
						return path;
					var dx = pos.x-ori.x;
					var dy = pos.y-ori.y;
					var c1 = dx / Math.abs(dx);
					var c2 = dy / Math.abs(dy);
					var nearBoxes = [
						{x : ori.x + c1 , y: ori.y , dir : c1 , type : 'x'},
						{x : ori.x , y: ori.y + c2 , dir : c2, type : 'y'},
						{x : ori.x - c1 , y: ori.y , dir : -1*c1, type : 'x'},
						{x : ori.x , y: ori.y - c2 , dir : -1*c2, type : 'y'}

					];
					if (Math.abs(dx) > Math.abs(dy)) {
						for (var i = 0; i < nearBoxes.length; i++) {
							if (checkWall(nearBoxes[i])) {
								continue;
							}
							else {
								fn(nearBoxes[i]);
								break;
							}
						}
					}
					else {
						nearBoxes.splice( 0 , 2 , nearBoxes[1] , nearBoxes[0]);
						for (var i = 0; i < nearBoxes.length; i++) {
							if (checkWall(nearBoxes[i])) {
								continue;
							}
							else {
								fn(nearBoxes[i]);
								break;
							}
						}	
					}

				}
				return path;
			}
			return fn;
		}
		function randerPath (path) {
			path.shift();
			for (var i = 0; i < path.length; i++) {
				if (path[i].type == 'x') {
					turnTo(path[i].dir > 0 ? 1 : 3);				
					move(getDirection());
				}
				else {
					turnTo(path[i].dir > 0 ? 2 : 0);
					move(getDirection());
				}
			}
		}
		function moveTo (pos) {
			pos.x -= 1;
			pos.y -= 1;
			var path = calculatePath(pos)(getPosition());
			randerPath (path);
		}
		function ex () {
			checkCommand();
			var len = block.commandQueue.length;
			for (var i = 0; i < len ; i++) {
				switch (block.commandQueue[i]) {
					case 'BUILD':
						bulidBlock();
						continue;
						break;
				}
				var a = block.commandQueue[i].match(/[0-9]/) ? block.commandQueue[i].match(/[0-9]/)[0] : 1;
				if (block.commandQueue[i].includes('MOV')) {
					switch (block.commandQueue[i].slice(4 , 7)) {
						case 'LFT':
							for(var j = 0; j < a ;j++){
								turnTo(3);
								if(!checkWall(checkArroundPosition(getDirection())))
									move(3);
							}
							break;
						case 'REG':
							for(var j = 0; j < a ;j++){
								turnTo(1);
								if(!checkWall(checkArroundPosition(getDirection())))
									move(1);
							}
							break;
						case 'BOT':
							for(var j = 0; j < a ;j++){
								turnTo(2);
								if(!checkWall(checkArroundPosition(getDirection())))
									move(2);
							}
							break;
						case 'TOP':
							for(var j = 0; j < a ;j++){
								turnTo(0);
								if(!checkWall(checkArroundPosition(getDirection())))
									move(0);
							}
							break;
						case 'TO ':
							var match = block.commandQueue[i].match(/[0-9]+/g);
							moveTo({ x : parseInt(match[0]), y :  parseInt(match[1])});
							break;
					}
				}
				else if (block.commandQueue[i].includes('TRA')) {
					switch (block.commandQueue[i].slice(4 , 7)) {
						case 'LFT':
							for(var j = 0; j < a ;j++){
								if(!checkWall(checkArroundPosition(3)))
									move(3);
							}
							break;
						case 'REG':
							for(var j = 0; j < a ;j++){
								if(!checkWall(checkArroundPosition(1)))
									move(1);
							}
							break;
						case 'BOT':
							for(var j = 0; j < a ;j++){
								if(!checkWall(checkArroundPosition(2)))
									move(2);
							}	
							break;
						case 'TOP':
							for(var j = 0; j < a ;j++){
								if(!checkWall(checkArroundPosition(0)))
									move(0);
							}
							break;
					}
				}
				else if (block.commandQueue[i].includes('TUN')) {
					switch (block.commandQueue[i].slice(4 , 7)) {
						case 'LFT':
							for(var j = 0; j < a ;j++){
								turn(false , 1);
							}
							break;
						case 'REG':
							for(var j = 0; j < a ;j++){
								turn(true , 1);
							}
							break;
						case 'BCK':
							for(var j = 0; j < a ;j++){
								turn(true , 2);
							}
							break;
					}
				}
				else if (block.commandQueue[i].includes('BRU')) {
					var color = block.commandQueue[i].slice(4 , 11);
					changeWallColor(color);
				}
				else {
					for (var j = 0; j < a ; j++) {
						if(!checkWall(checkArroundPosition(getDirection())))
							move(getDirection());
					}
				}
			}
			block.commandQueue = [];
		}
		
		elements.button.addEventListener('click', ex);
		elements.input.addEventListener('click' , clearEffect);
		elements.wallBtn.addEventListener('click' , randomBuild);
	}
	window.addEventListener('load' , init);
})();