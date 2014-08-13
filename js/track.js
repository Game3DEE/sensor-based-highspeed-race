function Track() {
	this.vehiclePosition = new THREE.Vector3();
	
	this.addGround = function() {
		// Ground
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'models/tracks/MountainTrack/Grass_256.png' ) }),
			1, // high friction
			1 // low restitution
		);
		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		ground_material.map.repeat.set( 100, 100 );

		var ground_geometry = new THREE.PlaneGeometry( 5000, 5000, 5000 );
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();

		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of z faces that were passed to THREE.PlaneMaterial
		var ground = new Physijs.BoxMesh(
				ground_geometry,
				ground_material,
				0 // mass
		);
		ground.rotation.x = -Math.PI / 2;
		ground.receiveShadow = true;
		ground.position.set(0, -1, 0);
		scene.add( ground );		
	}
}
Track.prototype.loadTrack = function(selectedTrack){
	var loader = new THREE.JSONLoader();
	
	if(selectedTrack == "Mountain") {
		loader.load( 'models/tracks/MountainTrack/MountainValley_Track.js', function ( track, track_materials ) {
			raceTrack = new Physijs.ConcaveMesh(
				track,
			   Physijs.createMaterial(
					new THREE.MeshFaceMaterial( track_materials ),
					1.0, // friction
					1.0 // restitution
					),0 //mass
			);
			raceTrack.receiveShadow = true;
			scene.add(raceTrack);
		});
		loader.load( 'models/tracks/MountainTrack/Mountain_Street.js', function ( track, track_materials ) {
			var raceStreet = new Physijs.PlaneMesh(
				track,
			   Physijs.createMaterial(
					new THREE.MeshFaceMaterial( track_materials ),
					1.0, // friction
					1.0 // restitution
					),0 //mass
			);
			raceStreet.castShadow = raceStreet.receiveShadow = true;
			scene.add(raceStreet);	
		});
		this.vehiclePosition.set(-95,10,50);
	}
	this.addGround();
}