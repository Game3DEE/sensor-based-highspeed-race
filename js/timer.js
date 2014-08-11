function Timer() {
	var int = 0;
	var started = 0;
	var reachedMid = 0;
	console.log(started);
	this.update = function(){
		if(vehicle.mesh.position.z > 55 && vehicle.mesh.position.x > -280 && vehicle.mesh.position.x < -125)
			reachedMid = 1
		if(vehicle.mesh.position.z > 120 && vehicle.mesh.position.x > -125)
			start();
		if (vehicle.mesh.position.z > 120 && vehicle.mesh.position.x > -125)
			stop();	
		
		function start(){
			if(!started) {
				var startTime = new Date().getTime();
				int = setInterval(function(){
					var time = new Date().getTime(); 
					var dif = time-startTime;
					var ms= dif%1000;
					var s = Math.floor(dif/1000)%60;
					var m = Math.floor(dif/1000/60)%60;
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
			if(started && reachedMid) {
				clearInterval(int);
				started = 0;
			}
		}
	}
}

Timer.prototype.updateTimer = function(){
	this.update();
}