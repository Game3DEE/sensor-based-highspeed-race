function DeviceController() {
	var turnLeftKey = 37;
	var turnRightKey = 39;
	var speedKey = 38;
	var breakKey = 40;
	var keys = [37,39];
	
	this.resetLeftRight = function(){
		for(key in keys)
		{
		   $(document).trigger(
			  $.Event('keyup', {
				 which: keys[key],
				 keyCode: keys[key]
			  })
		   );
		}
	};
	
	this.resetEvent = function(key){
		$(document).trigger(
		   $.Event('keyup', {
			  which: key,
			  keyCode: key
		   })
		);
	};
	
	this.turnLeft = function(){
		this.resetEvent(turnRightKey);
		$(document).trigger($.Event('keydown', {
			  which: turnLeftKey,
			  keyCode: turnLeftKey
		}));
	};
	
	this.turnRight = function(){
		this.resetEvent(turnLeftKey);
		$(document).trigger($.Event('keydown', {
			  which: turnRightKey,
			  keyCode: turnRightKey
		}));
	};
	this.forward = function(){
		$(document).trigger($.Event('keydown', {
			  which: speedKey,
			  keyCode: speedKey
		}));
	};
	
	this.doBreak = function()
	{
		this.resetEvent(speedKey);;
		$(document).trigger($.Event('keydown', {
			  which: breakKey,
			  keyCode: breakKey
		}));
	};
}
	
DeviceController.prototype.readDeviceOrientation = function(g,b,a) {
	var turn;
	var speed;
	switch (window.orientation) {
	
	case 0:// Portrait
	
			if ( b < 50) {
					this.forward();
				}else {
					this.doBreak();
			}
		break;
  
	case -90: // Landscape (Home Button links)
	
			if ( g < 50) {
				this.forward();
			}else {
				this.doBreak();
			}
			turn = 0 -b;
		break;  
  
	case 90: // Landscape (Home Button rechts)
	
			if ( g > -50) {
				this.forward();
			}else {
				this.doBreak();
			}
			turn = b;
		break;
	}
	if(turn < -7)
	   this.turnLeft();
	else if (turn > 7)
	   this.turnRight();
	else
		this.resetLeftRight();
};