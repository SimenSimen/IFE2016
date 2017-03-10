(() => {
	function initCanvas () {	
		var ctx = document.getElementById('canvas').getContext('2d');
		var cW = ctx.canvas.width , cH = ctx.canvas.height ; 
		var con = document.getElementsByClassName('console')[0];
		var control = document.getElementsByClassName('control')[0];
		var new_boat = document.getElementById('new_boat');
		var energySeleted = document.getElementsByClassName('energySystem');
		var powerSeleted = document.getElementsByClassName('powerSystem');
		var earth = new Image();
		earth.src = '../img/earth27.gif';
		var boatNumber = 1;
		var boatsQueue = [];
		var boats = [];

		var BUS = {
			lostRate : 0.1,
			teleTime : 300,
			send : (command) => {
					if (BUS.lost()) {
						commander.consoleLog('Send success !');
						commander.consoleLog('Send Message : ' + command);
						setTimeout(()=>{
							for(var i = 0 ;  i < boats.length; i++){
								var cmd = boats[i].adpater(command);
								if (cmd.id == boats[i].id) {
									commander.consoleLog('Boat ' + boats[i].id + ' is gonna '+ cmd.command);
									boats[i][cmd.command]();
								}
							}
						}, BUS.teleTime);		
					}
					else {
						commander.consoleLog('Send fail , still try ...');
						BUS.send(command);
					}
			},
			lost : () =>{
				return Math.random() > BUS.lostRate ; 
			}
		}
		var commander = {
			name : 'John',
			adpater : (bid , command) =>{
				var id ;
				var cmd;
				switch (bid.toString(2).length) {
					case 1:
						id = '000' + bid.toString(2);
						break;
					case 2:
						id = '00' + bid.toString(2);
						break;
					case 3:
						id = '0' + bid.toString(2);
						break;
				}
				switch (command) {
					case 'move' :
						cmd = '0000';
						break;
					case 'stop' :
						cmd = '0001';
						break;
					case 'destroy' :
						cmd = '0010';
						break;
				}
				return id + cmd ;
			},
			addBtns : (boat) => {
				var div = document.createElement('div');
				var button = [];
				div.className = 'buttonGroup';
				div.setAttribute('data-set', boat.id);
				var p = document.createElement('p');
				p.innerHTML = 'Boat : ' + boat.id;
				div.appendChild(p);
				for (var i = 0; i < 3; i++) {
					var btn = document.createElement('button');
					button.push(btn);
					div.appendChild(btn);
				}
				control.appendChild(div);
				button[0].innerHTML = 'Fly';
				button[1].innerHTML = 'Stop';
				button[2].innerHTML = 'Destroy';

				button[0].addEventListener('click' , ()=>{
					var cmd = commander.adpater(boat.id , 'move');				
					BUS.send(cmd);
				});
				button[1].addEventListener('click' , ()=>{
					var cmd = commander.adpater(boat.id , 'stop');
					BUS.send(cmd);
				});
				button[2].addEventListener('click' , ()=>{
					var cmd = commander.adpater(boat.id , 'destroy');
					BUS.send(cmd);
				});
			},
			consoleLog : (text) => {
				var p = document.createElement('p');
				p.className = 'consoletext';
				p.innerHTML = text;
				con.insertBefore( p ,  con.children[1]);
			}
		}
		function Boat (id , speed , fuelRate) {
			this.id = id , this.image = new Image() , this.command = 'stop' , this.fuel = 50 , this.r = 0 ;
			this.speed = speed , this.fuelRate = fuelRate ;
			this.path = {x : cW/2,y : cH/2,r : id*80 ,clr : '#787878'};
			this.image.src = '../img/boat27.png';
			this.adpater = (command) => {
				var id = parseInt(command.slice(0 , 4) , 2);
				var cmd = parseInt(command.slice(4 , 8) , 2);
				switch (cmd) {
					case 0:
						cmd = 'move';
						break;
					case 1:
						cmd = 'stop';
						break;
					case 2:
						cmd = 'destroy';
						break;
				}
				return { id : id , command : cmd };
			};
			this.randerPath = () => {
				ctx.beginPath();
				ctx.strokeStyle = this.path.clr;
				ctx.arc (this.path.x , this.path.y , this.path.r , 0 , Math.PI*2 , false);
				ctx.stroke();

				ctx.save();
				ctx.translate(cW/2 , cH/2);
				ctx.rotate(this.r);		
				ctx.drawImage(this.image ,this.path.r - this.image.width/2, -this.image.height/2);
				this.powerSystem();
				ctx.restore();
				this.randerMove();
			};
			this.move = () =>{
				this.command = 'move';
			};
			this.stop = () =>{
				this.command = 'stop';
			};
			this.destroy = () =>{
				this.stop();
				this.r = 0;
				for (var i = 0; i < boats.length; i++) {
					if ( this.id == boats[i].id) {
						boats.splice( i , 1);
					}
				}
				boatsQueue.push(this);
				boatsQueue.sort((a , b) =>{ return a.id - b.id ;});
				var div = document.getElementsByClassName('buttonGroup');
				for(var i = 0 ; i < div.length; i++){
					if(div[i].getAttribute('data-set') == this.id)
						div[i].parentNode.removeChild(div[i]);
				}
			};
			this.powerSystem = () =>{
				if (this.fuel < 50) {
					this.fuel += parseInt(this.fuelRate) /10;
				}
				if (this.command == 'move') {
					this.fuel -= speed * 20;
					if (this.fuel <= 0) {
						this.stop();		
					}
				}
				ctx.fillStyle ='red';
				ctx.fillRect(this.path.r - 25, -this.image.height/2 , this.fuel ,3);
			};
			this.randerMove = () =>{
				if (this.command == 'move') {
					this.r -= this.speed ; 
				}
			};
		}
		function checkSelect() { 
			for (var i = 0; i < powerSeleted.length; i++) {
					if (powerSeleted[i].checked) {
						var speed = powerSeleted[i].value;
					}
				}
			for (var i = 0; i < energySeleted.length; i++) {
					if (energySeleted[i].checked) {
						var energy = energySeleted[i].value;
					}
				}
			return {speed : speed , energy : energy};
		}
		function draw () {
			ctx.clearRect(0,0,cW,cH);
			ctx.drawImage(earth , cW/2-earth.width/2 , cH/2-earth.height/2);
			for (var i = 0; i < boats.length; i++) {
				boats[i].randerPath();
			}
		}
		//初始化
		new_boat.addEventListener('click', () => {
			if (boats.length + boatsQueue.length != 4) {
				var speed = checkSelect().speed ;
				var energy = checkSelect().energy ;
				var boat = new Boat(boatNumber , speed , energy);
				commander.addBtns(boat)
				boats.push(boat);
				boatNumber ++;
				commander.consoleLog('A new boat has been created .');
			}
			else {
				if (boatsQueue[0]) {
					var speed = checkSelect().speed ;
					var energy = checkSelect().energy ;
					boatsQueue[0].speed = speed;
					boatsQueue[0].fuelRate = energy;
					boats.push(boatsQueue[0]);
					commander.addBtns(boatsQueue[0]);
					boatsQueue.splice( 0, 1);
				}	
			}
		});
		var animate = setInterval(draw, 30);
	}
	window.onload = () => {
		initCanvas();
	};
})();