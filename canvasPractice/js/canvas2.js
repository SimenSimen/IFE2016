function initCanvas () {
	var ctx = document.getElementById('my_canvas').getContext('2d');
	var cW = ctx.canvas.width , cH = ctx.canvas.height;
	var x = 0 , y = 0;
	var bg = new Image();
	bg.src = "images/canvas2Background.bmp";

	function RectObj (x,y,w,h){
		this.x = x , this.y = y , this.w = w ,this.h = h;
	};
	RectObj.prototype.rander = (ctx , rx , ry , rw , rh , clr) => {
		ctx.fillStyle = clr;
		ctx.fillRect(rx, ry, rw, rh);
	};

	function background () {
		this.x = 0 , this.y = 0;
		this.rander = () => {
			ctx.drawImage(bg , this.x-- , 0);
			if(this.x <= -499)
				this.x = 0;
		};
	}
	var rect1 = new RectObj(0,0,50,50);
	var rect2 = new RectObj(0,20,50,50);
	var background = new background(); 


	function animate (argument) {
		ctx.save();
		ctx.clearRect(0,0,cW,cH);
		background.rander();
		rect1.rander(ctx , rect1.x , rect1.y ,rect1.w , rect1.h , 'red');
		rect2.rander(ctx , rect2.x , rect2.y ,rect2.w , rect2.h , 'blue');
		ctx.restore();
		rect1.x++;
		rect2.y++;

	}	
	var animateInterval = setInterval(animate, 30);
}

window.addEventListener('load', () => {
	initCanvas();
});