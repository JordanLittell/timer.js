(function() {
	if ( typeof Timer === "undefined" ){
		window.Timer = {};
	}
	var Clock = Timer.Clock = function (radius, ctx) {
		this.radius = 40;
		this.color = '#242424';
		this.ctx = ctx;
		this.centerX = 150;
		this.centerY = this.centerX-75;
		this.pathLength = this.pathLength || 0;
		this.time = new Date();
		this.minutes = this.time.getMinutes();
		console.log(this.minutes);
	}

	Clock.prototype.draw = function() {
		var clock = this;
		ctx.fillStyle = clock.color
		ctx.beginPath()
		ctx.arc(
			clock.centerX,
			clock.centerY,
			clock.radius,
			0,
			2 * Math.PI
		)
		ctx.lineWidth = 5;
		ctx.strokeStyle = clock.color;
		ctx.stroke();
		ctx.fill();
	}

	Clock.prototype.drawTimePath = function(){
		var clock = this; 
		ctx.beginPath();
		ctx.arc(
			clock.centerX ,
			clock.centerY ,
			clock.radius/1.4,
			0,
			 ((2*Math.PI / (60 * (1000/6))) * clock.pathLength), 
			false
		)
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#00B2EE";
		ctx.stroke();	
	}

	Clock.prototype.

	Clock.prototype.animate = function() {
		var clock = this;
		var length = this.pathLength;
		setInterval(function(){
			clock.pathLength += 1;
			clock.drawTimePath();
		}, 60/1000)
	}

})();