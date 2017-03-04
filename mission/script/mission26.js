
(()=>{
	function initCanvas () {
		var ctx = document.getElementById('canvas').getContext('2d');
		var cW = ctx.canvas.width , cH = ctx.canvas.height;
		var bg = new Image();
		var bgY = 0;
		bg.src = '../img/galaxy.jpg'
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
		function path (r) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = "#FFFF00";
			ctx.arc(cW/2 , cH/2 , r , 0,Math.PI*2);
			ctx.stroke();
			ctx.restore();
		}
		function Boat (id) {
			this.x = cW , this.y = cH ,this.command = 'stop' , this.fuel = 100 , this.boat = new Image() , this.id = id;
			this.boat.src = '../img/boat26.bmp';
			this.rander = ()=>{

			};
		}
		var draw = ()=>{
			ctx.save();
			ctx.clearRect(0,0,cW,cH);
			//draw here
			background();
			path(100);
			path(200);
			path(300);
			//end
			ctx.restore();
		};
		var animate = setInterval(draw , 30);
	}
	window.addEventListener('load', ()=>{
		initCanvas();
	});
})();