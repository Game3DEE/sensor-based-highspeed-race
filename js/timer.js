function Timer() {
	var int = 0;
	var started = 0;
	var reachedMid = 0;
	var win = 0;
	var ms = 0;
	var s = 0;
	var m = 0;
	this.update = function(){
		if(!crashed) {
			if(vehicle.mesh.position.z > 120 && vehicle.mesh.position.x > -125)
				start();
			if(vehicle.mesh.position.z > 55 && vehicle.mesh.position.x > -280 && vehicle.mesh.position.x < -125)
				reachedMid = 1
			if (vehicle.mesh.position.z > 120 && vehicle.mesh.position.x > -125)
				stop();
		} else
			stop();
		this.getWin = function (){
			return win;
		}
		function start(){
			if(!started) {
				var startTime = new Date().getTime();
				int = setInterval(function(){
					var time = new Date().getTime(); 
					var dif = time-startTime;
					ms = dif%1000;
					s = Math.floor(dif/1000)%60;
					m = Math.floor(dif/1000/60)%60;
					if(m < 10)
						m = "0" + m;
					if(s < 10)
						s = "0" + s;
					$('#timer').text( m+':'+s+':'+ms); 
				},1);
				started = 1;
			}
		}
		
		function stop() {
			if((started && reachedMid) || crashed) {
				if(started && reachedMid && !crashed)
					win = 1;
				clearInterval(int);
				started = 0;
			}
		}
	}
	this.time = function() {
		$('.time').text( m+':'+s+':'+ms); 
	}
}

Timer.prototype.updateTimer = function(){
	this.update();
}

Timer.prototype.getTime = function() {
	this.time();
}