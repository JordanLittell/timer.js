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
	}

	Clock.prototype.start = function() {
		this.draw();
		this.animate();
		this.renderTimeString();
	}

	Clock.prototype.getTimeData = function() {
		this.minutes = this.time.getMinutes();
		this.seconds = this.time.getSeconds();
		this.ms = this.time.getMilliseconds();
		this.timeString = this.minutes + ":" + this.seconds + ":" + this.ms;
	}

	Clock.prototype.drawCircle = function(eAngle, radius) {
		clock = this;
		ctx.beginPath()
		ctx.arc(
			clock.centerX,
			clock.centerY,
			radius,
			0,
			eAngle
		)
		ctx.lineWidth = 5;
	}

	Clock.prototype.draw = function() {
		var clock = this;
		ctx.fillStyle = clock.color
		this.drawCircle(2*Math.PI, clock.radius);
		ctx.strokeStyle = clock.color;
		ctx.stroke();
		ctx.fill();
	}

	Clock.prototype.drawTimePath = function(){
		var clock = this;
		var pathLength = (2*Math.PI / (60 * (1000/6))) * clock.pathLength 
		this.drawCircle(pathLength, clock.radius/1.2)
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#00B2EE";
		ctx.stroke();	
	}

	Clock.prototype.renderTimeString = function() {
		this.ctx.clearRect(0, 0, 90, 80);
		this.ctx.font = "8pt times";
		this.ctx.fillStyle = "black";
		this.ctx.fillText (this.timeString, 25,25);
	}

	Clock.prototype.tick = function() {
		this.time.setMilliseconds(this.ms + 6);
		this.renderTimeString();
	}

	Clock.prototype.animate = function() {
		var clock = this;
		var length = this.pathLength;
		setInterval(function(){
			clock.pathLength += 1;
			clock.getTimeData();
			clock.tick();
			clock.drawTimePath();
		}, 60/1000)
	}

})();