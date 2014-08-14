var Radar = function(){
	var matrix = vehicle.mesh.world.matrixWorld;
	var visibleWidth, visibleHeight, p, v, percX, percY, left, top;
	// perspective:
	// this will give us position relative to the world
	
	this.update = function() {
		var position = new THREE.Vector3();
		position.applyMatrix4( vehicle.mesh.matrixWorld );
		p = position.clone();
		// projectVector will translate position to 2d
		v = projector.projectVector(p, radarCamera);

		percX = (v.x + 1) / 2;
		percY = (-v.y + 1) / 2;

		left = percX * SCREEN_WIDTH;
		top = percY * SCREEN_HEIGHT;

		widthPercentage = (left - $(".tracking-ball").width() / 2) / SCREEN_WIDTH * 100;
		heightPercentage = (top - $(".tracking-ball").height() / 2) / SCREEN_HEIGHT * 100;
		$(".tracking-ball")
			.css('left', widthPercentage + '%')
			.css('top', heightPercentage + '%');	
	}
};

Radar.prototype.updateRadar = function() {
	this.update();
}