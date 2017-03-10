
(()=>{
	function initCanvas () {
		var ctx = document.getElementById('canvas').getContext('2d');
		var cW = ctx.canvas.width , cH = ctx.canvas.height;
		var con = document.getElementsByClassName('console')[0]; 
		var play = document.getElementsByClassName('play')[0];
		var add = document.getElementById('addBtn');
		var bg = new Image();
		var bgY = 0;
		bg.src = '../img/galaxy.jpg'
		var boatQueue = [];
		var boats = [];
		function Mediator () {
			this.teleTime = 1000;
			this.send = {};
			this.send.go = (boat)=>{
				if (this.loseRate()) {
					this.consoleMessage('send success , Boat '+ boat.id + ' will move after 1s. ');
					setTimeout(()=>{
						boat.command = 'go';
					},this.teleTime);
				}
				else{
					this.consoleMessage('send fail , try again later.');
				}
			};
			this.send.stop = (boat)=>{
				if (this.loseRate()) {
					this.consoleMessage('send success , Boat' + boat.id + ' will stop after 1s. ');
					setTimeout(()=>{
						boat.command = 'stop';
					},this.teleTime);
				}
				else{
					this.consoleMessage('send fail , try again later.');
				}
			};
			this.send.destroy = (boat , div)=>{
				if (this.loseRate()) {
					this.consoleMessage('Boat ' + boat.id + ' will be destroyed after 1s.');
					setTimeout(()=>{
						if(boats.length == 4){
						add.disabled = false;
						}
						boatQueue.push(boat);
						for (var i = 0; i < boats.length; i++) {
							if(boats[i].id == boat.id){
									boats.splice(i , 1);
									break;
								}
						}
						div.parentNode.removeChild(div);
					} , this.teleTime);
				}
				else {
					this.consoleMessage('send fail , try again later.');		
				}	
			};
			this.send.addBoats = ()=>{
				id = prompt('Please enter the Boat\'s id :')
				if (id > 4 || id < 0 || id.match(/^[^0-9]+/)) {
					this.consoleMessage('Error');
					return;
				}
				this.consoleMessage('Your input id : ' + id);
				if (this.loseRate()) {
					this.consoleMessage('send success , Boat ' + id + ' will go there after 1s. ');
					setTimeout(()=>{
						for (var i = 0; i < boatQueue.length; i++) {
							if (boatQueue[i].id == id){
								boatQueue[i].addBtns();
								boatQueue[i].p = 0;
								boatQueue[i].command = 'stop';
								boats.push(boatQueue[i]);
								boatQueue.splice( i , 1);
							}
						}
						if (boats.length == 4 ) {
							add.disabled = true;
						}
					},this.teleTime);
				}
				else {
					this.consoleMessage('send fail , try again later.');
				}
			};
			this.loseRate = ()=>{
				return Math.random() > 0.3; 
			};
			this.consoleMessage = (text)=>{
				var p = document.createElement('p');
				p.className = 'consoletext';
				p.innerHTML = text;
				con.insertBefore( p ,  con.children[1]);
			};
		}
		function Boat (id,r,pathColor) {
			this.id = id, this.image = new Image() , this.command = 'stop' , this.fuel = 100 ,this.p = 0;
			this.path = {x : cW/2,y : cH/2,r : r ,clr : pathColor};
			this.image.src = '../img/boat26.bmp';
			this.addBtns = ()=>{
				var button = [];
				var div = document.createElement('div');
				var p = document.createElement('p');
				p.innerHTML = 'Path : ' + this.id ;
				div.className = 'player';
				div.appendChild(p);
				for (var i = 0; i < 3; i++) {
					var b = document.createElement('button');
					div.appendChild(b);
					play.appendChild(div);
					button.push(b);
				}
				button[0].innerHTML = 'Go';
				button[1].innerHTML = 'Stop';
				button[2].innerHTML = 'Destroy';
				button[0].addEventListener('click' , ()=>{
					mediator.send.go(this);
				});
				button[1].addEventListener('click' , ()=>{
					mediator.send.stop(this);
				});
				button[2].addEventListener('click' , ()=>{
					mediator.send.destroy(this , div);
				});
			};
			this.moveSystem = ()=>{
				if (this.command == 'stop' && this.fuel < 100) {
					this.fuel ++;
				}
				else if (this.command == 'go') {
					this.p -= 0.1/this.id;
					this.fuel -= 0.5;
					if (this.fuel <=0) {
						this.command = 'stop';
						mediator.consoleMessage('Boat ' + this.id +' has run out of fuel ...')
						mediator.consoleMessage('Fueling Boat ' + this.id + ' ...');
					}
				}
				ctx.fillStyle = '#'+ (54+this.fuel*2).toString(16).toUpperCase() +'0000';
				ctx.fillRect(this.path.r-25 , -40 , this.fuel*.5 , 10);
			}; 
		}

		function background () {
			ctx.drawImage(bg , 0 ,bgY);
			if (background.movement == 'up') {
				bgY -=0.4;
				if(bgY < -200)
					background.movement = 'down';
			}
			else {
				bgY +=0.4;
				if(bgY > 0)
					background.movement = 'up';
			}
		}
		function rander(){
			for (var i = 0; i < boats.length; i++) {
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = boats[i].path.clr;
				ctx.arc(boats[i].path.x , boats[i].path.y , boats[i].path.r , 0 , Math.PI*2 ,false);
				ctx.stroke();
				ctx.restore();
				//boatRander
				ctx.save();
				ctx.translate(boats[i].path.x , boats[i].path.y);
				ctx.rotate(boats[i].p);
				ctx.drawImage(boats[i].image , boats[i].path.r-10 , -25);
				boats[i].moveSystem();	
				ctx.restore();
			}
		}
		var draw = ()=>{
			ctx.save();
			ctx.clearRect(0,0,cW,cH);
			//draw here
			background();
			rander();
			//end
			ctx.restore();
		};
		var mediator = new Mediator();
		for (var i = 0; i < 4; i++) {
			var boat = new Boat(i+1 , 70+i*75 , '#ff00'+(i+1)*24);
			boat.addBtns();
			boats.push(boat);
		}
		var animate = setInterval(draw , 30);
		add.addEventListener('click' , ()=>{
			mediator.send.addBoats();
		});
	}
	window.addEventListener('load', ()=>{	
		initCanvas();
	});
})();