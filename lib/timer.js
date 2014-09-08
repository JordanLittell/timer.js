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

	Clock.prototype.getTimeData = function() {
		this.minutes = this.time.getMinutes();
		this.seconds = this.time.getSeconds();
		this.ms = this.time.getMilliseconds();
		this.timeString = this.minutes + ":" + this.seconds + ":" + this.ms;
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

	Clock.prototype.renderTimeString = function() {
		this.ctx.clearRect(0, 0, 90, 80);
		this.ctx.font = "10pt";
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