function initCanvas () {
	var ctx = document.getElementById('my_canvas').getContext('2d');
	var cW = ctx.canvas.width , cH = ctx.canvas.height;
	var x = 0 , y = 0;
	var bg = new Image();
	bg.src = "images/canvas2Background.bmp";

	function RectObj (x,y,w,h){
		this.x = x , this.y = y , this.w = w ,this.h = h;
		this.rander = (ctx , clr) => {
		ctx.fillStyle = clr;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		};
	};
	function background () {
		this.x = 0 , this.y = 0;
		this.rander = () => {
			ctx.drawImage(bg , this.x-- , 0);
			if(this.x <= -499)
				this.x = 0;
		};
	}
	var rect = new RectObj(10,20,50,50);
	var background = new background();


	function animate (argument) {
		//ctx.save();
		ctx.clearRect(0,0,cW,cH);
		background.rander();
		rect.rander(ctx,'blue');
		ctx.restore();

	}	
	var animateInterval = setInterval(animate, 30);
	document.addEventListener('keydown', (event)=>{
		switch (event.key) {
			case 'w':
				rect.y -= 10;			
				break;
			case 'a':
				rect.x -= 10;			
				break;	
			case 's':
				rect.y += 10;				
				break;
			case 'd':
				rect.x += 10;
				break;
		}
	});
}

window.addEventListener('load', () => {
	initCanvas();
});