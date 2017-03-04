
(()=>{
	function initCanvas () {
		var ctx = document.getElementById('my_canvas').getContext('2d');
		var cW = ctx.canvas.width, cH = ctx.canvas.height;
		var button = document.getElementsByTagName('button');

		var enemies = [
		{id:'enemy1',x:200,y:0,w:50,h:20,bg:'blue'},
		{id:'enemy2',x:400,y:0,w:50,h:20,bg:'blue'},
		{id:'enemy3',x:600,y:0,w:50,h:20,bg:'blue'},
		{id:'enemy4',x:200,y:50,w:50,h:20,bg:'blue'},
		{id:'enemy5',x:400,y:50,w:50,h:20,bg:'blue'},
		{id:'enemy6',x:600,y:50,w:50,h:20,bg:'blue'}];
		function randerEnemies () {
			for (var i = 0; i < enemies.length; i++) {
				ctx.fillStyle = enemies[i].bg;
				ctx.fillRect(enemies[i].x, enemies[i].y+=1.5, enemies[i].w, enemies[i].h);
			}
		}
		function Launcher () {
			this.x = cW/2-25, this.y = cH*.8 , this.w = 50 , this.h = 30 , this.missle = [] ;
			this.rander = ()=>{
				ctx.fillStyle = '#aaff00';
				ctx.fillRect(this.x, this.y,this.w,this.h);

				for (var i = 0; i < this.missle.length; i++) {
					ctx.fillStyle = 'red';
					ctx.fillRect(this.missle[i].x , this.missle[i].y-=10 , this.missle[i].w , this.missle[i].h);
					this.collision(this.missle[i] ,i);
					if(this.missle[i].y <= 0)
						this.missle.splice(i,1);
				}
			}
			this.collision = (m , index)=>{
				for (var i = 0; i < enemies.length; i++) {
					var e = enemies[i];
					if (e.x+e.w >= m.x && m.x + m.w >=e.x && m.y >= e.y && m.y <= e.y+e.h) {
						this.missle.splice(this.missle[index] , 1);
						enemies.splice(i , 1);
						document.getElementById('status').innerHTML = 'U hit ' + e.id;
					}
				}
			};
		}
		var lau = new Launcher();
		var draw = setInterval(()=>{
			ctx.clearRect(0,0,cW,cH);
			//draw
			lau.rander();
			randerEnemies();
			//end
			if(enemies.length ==0){
				ctx.fillStyle ='#FC0';
				ctx.font = 'italic bold 36px Arail , sans-serif';
				ctx.fillText('Game Over',cW*.5-100 , 50 , 300 );
				clearInterval(draw);
			}
		} ,60);
		button[0].addEventListener('click' , ()=>{
			lau.missle.push({x:lau.x+lau.w/2-2.5,y:lau.y,w:5,h:15});
		});
		button[1].addEventListener('click' , ()=>{
			if(lau.x < 0)
				return;
			lau.x -= 20;
		});
		button[2].addEventListener('click' , ()=>{
			if(lau.x > cW-lau.w)
				return;
			lau.x += 20
		});
	}
	window.addEventListener('load',()=>{

		initCanvas();

	});
})();