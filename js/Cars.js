function Cars(selectedCar) {


	
	// Car Materials
	var damage = 0;
	var speed;
	var input = {
		power: null,
		direction: null,
		steering: 0
	};
	var imagePrefix = "images/dawnmountain-";
	var urls  = [imagePrefix + "xpos.png", imagePrefix + "xneg.png", imagePrefix + "ypos.png", imagePrefix + "yneg.png", imagePrefix + "zpos.png", imagePrefix + "zneg.png"];

	var textureCube = THREE.ImageUtils.loadTextureCube( urls );
	textureCube.format = THREE.RGBFormat;
	var mlib = {

		"Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
		"Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x001133, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
		"Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, ambient: 0x330000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
		"Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
		"White":	new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0x666666, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),

		"Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
		"Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: textureCube, combine: THREE.Multiply } ),

		"Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x002266, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, envMap: textureCube, combine: THREE.MultiplyOperation } ),
		"Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),

		"Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube } ),
		"Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444, envMap: textureCube } ),
		"Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } ),

		"Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, envMap: textureCube, opacity: 0.975, transparent: true } ),
		"Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } ),
		"Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, envMap: textureCube, opacity: 0.75, transparent: true } ),
		"Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, envMap: textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

		"Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
		"Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
		"Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

		"Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
		"Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

		"Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
		"Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
		"Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
		"Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

		"Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
		"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

	}
	var selectedCar = selectedCar;
	var modelScale;
	var bodyUrl;
	var wheelUrl;
	var connectionPoint;
	if(selectedCar == "veyron") {
		bodyUrl = "models/cars/veyron/parts/veyron_body_bin.js";
		wheelUrl   = "models/cars/mustang/mustang_wheel.js";
		modelScale = .04;
		wheelLoader = new THREE.JSONLoader();
		bodyLoader = new THREE.BinaryLoader();
		connectionPoint = new THREE.Vector3(
								2.5,
								-1,
								3.1
							);
	}else if(selectedCar == "gallardo") {
		bodyUrl = "models/cars/gallardo/parts/gallardo_body_bin.js";
		wheelUrl   = "models/cars/mustang/mustang_wheel.js";
		modelScale = .029;
		wheelLoader = new THREE.JSONLoader();
		bodyLoader = new THREE.BinaryLoader();
		connectionPoint = new THREE.Vector3(
								2.3,
								-1,
								3.5
							);
	}else if(selectedCar == "mustang") {
		bodyUrl = "models/cars/mustang/mustang.js";
		wheelUrl   = "models/cars/mustang/mustang_wheel.js";
		modelScale = 1;
		wheelLoader = new THREE.JSONLoader();
		bodyLoader = new THREE.JSONLoader();
		connectionPoint = new THREE.Vector3(
								1.6,
								-1,
								3.2
							);
	}
	scene.addEventListener('update', updateCar);
	loadCar();
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	
	function loadCar() {
		// Car Body load
		bodyLoader.load( bodyUrl, function( car, car_materials ) {
			wheelLoader.load( wheelUrl, function( wheel, wheel_materials ) {
				for(var i = 0; i < car.vertices.length; i++) {
					car.vertices[i].x *= modelScale;
					car.vertices[i].y *= modelScale;
					car.vertices[i].z *= modelScale;
				}
				addMaterials(car_materials,0);
				var mesh = new Physijs.BoxMesh(
					car,
					new THREE.MeshFaceMaterial( car_materials )
				);
				mesh.position.y = track.vehiclePosition.y;
				mesh.position.x = track.vehiclePosition.x;
				mesh.position.z = track.vehiclePosition.z;
				mesh.castShadow = mesh.receiveShadow = true;

				vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
					5.88,	// suspension_stiffness		(Federung Steifheit)
					1.83,	// suspension_compression	(Federung Druck)
					0.28,	// suspension_damping		(Federung Dämfpung)
					500,	// max_suspension_travel	(Federung max Bewegungsgrad)
					10.5,	// friction_slip			(Reibung nachlassen)
					6000	// max_suspension_force
				));
				mesh.addEventListener( 'collision', function( raceTrack, linear_velocity ) {
					if(damage >= 100) {
						crashed = true;
						return
					}
					$("#hurt").fadeIn(75);
					$("#hurt").fadeOut(350);
					
					damage += 1+(speed/10);
					$("#damage").css("background-image", "-moz-linear-gradient(left, #8B0000 "+damage+"%, transparent 1%)");
					$("#damage").css("background-image", "-webkit-linear-gradient(left, #8B0000 "+damage+"%, transparent 1%)");
					$("#damage").css("background-image", "-ms-linear-gradient(left, #8B0000 "+damage+"%, transparent 1%)");
					$("#damage").css("background-image", "-o-linear-gradient(left, #8B0000 "+damage+"%, transparent 1%)");
					$("#damage").css("background-image", "linear-gradient(left, #8B0000 "+damage+"%, transparent 1%)");
				});
				scene.add( vehicle );
				var object = new THREE.Object3D()
				vehicle.mesh.add(frontCamera);
				backCamera.addTarget({
					name: 'vehicle',
					targetObject: vehicle.mesh,
					cameraPosition: new THREE.Vector3(0, 2, -20),
					stiffness: 0.1,
					matchRotation: false
				});
				backCamera.setTarget( 'vehicle' );
				addMaterials(0,wheel_materials);
				var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );			
				for ( var i = 0; i < 4; i++ ) {
					vehicle.addWheel(
						wheel,								//wheel_geometry
						wheel_material,						//wheel_material
						new THREE.Vector3(					//connection_point
								i % 2 === 0 ? -1*connectionPoint.x : connectionPoint.x,
								connectionPoint.y,
								i < 2 ? connectionPoint.z+0.1 : -1*connectionPoint.z
						),
						new THREE.Vector3( 0, -1, 0 ),		//wheel_direction
						new THREE.Vector3( -1, 0, 0 ),		//wheel_axle
						.5,									//suspension_rest_length
						.7,									//wheel_radius
						i < 2 ? false : true				//is_front_wheel
					);
				}
			});
		});
	};
		
	function addMaterials(car_materials,wheel_materials) {
			if(selectedCar == "veyron") {
				if(car_materials) {
					car_materials[ 0 ] = mlib[ "Black metal" ];		// top, front center, back sides
					car_materials[ 1 ] = mlib[ "Chrome" ];			// front sides
					car_materials[ 2 ] = mlib[ "Chrome" ];			// engine
					car_materials[ 3 ] = mlib[ "Dark chrome" ];		// small chrome things
					car_materials[ 4 ] = mlib[ "Red glass" ];		// backlights
					car_materials[ 5 ] = mlib[ "Orange glass" ];	// back signals
					car_materials[ 6 ] = mlib[ "Black rough" ];		// bottom, interior
					car_materials[ 7 ] = mlib[ "Dark glass" ];		// windshield		
				}else if(wheel_materials){
					wheel_materials[ 0 ] = mlib[ "Chrome" ];	// insides
					wheel_materials[ 1 ] = mlib[ "Chrome" ];	// insides					
				}
			}else if(selectedCar == "gallardo"){
				if(car_materials) {
					car_materials[ 0 ] = mlib[ "Orange" ]; 			// body
					car_materials[ 1 ] = mlib[ "Black glass" ]; 		// front under lights, back
					car_materials[ 2 ] = mlib[ "Yellow glass" ];		// windshield	
					car_materials[ 3 ] = mlib[  "Dark chrome"  ];
					car_materials[ 4 ] = mlib[ "Black metal" ];
				}else if(wheel_materials){
					wheel_materials[ 0 ] = mlib[ "Chrome" ];	// insides
					wheel_materials[ 1 ] = mlib[ "Chrome" ];	// insides					
				}
			}else if(selectedCar == "mustang"){
				if(car_materials) {
					car_materials[ 0 ] = mlib[ "Black glass" ]; 		//Windows
					car_materials[ 1 ] = mlib[ "Chrome" ]; 				//Kühlergrill
					car_materials[ 2 ] = mlib[ "Red" ];					//Lights, Auspuff	
					car_materials[ 3 ] = mlib[  "Black rough"  ];		//Bottom
					car_materials[ 4 ] = mlib[ "Black metal" ];				//Body
				}else if(wheel_materials){
					wheel_materials[ 0 ] = mlib[ "Chrome" ];	// insides
					wheel_materials[ 1 ] = mlib[ "Chrome" ];	// insides						
				}
			}
	};

	function onKeyDown ( ev ) {
		switch ( ev.which ) {
			case 37: // left
				input.direction = 1;
				break;

			case 38: // forward
				input.power = true;
				break;

			case 39: // right
				input.direction = -1;
				break;

			case 40: // back
				input.power = false;
				break;
			case 32: // leer
				if(selectedCamera == "frontCamera")
					selectedCamera = "backCamera";
				else
					selectedCamera = "frontCamera";
				break;
		}
	};

	function onKeyUp ( ev ) {
		switch ( ev.which ) {
			case 37: // left
				input.direction = null;
				break;

			case 38: // forward
				input.power = null;
				break;

			case 39: // right
				input.direction = null;
				break;

			case 40: // back
				input.power = null;
				break;
		}
	};

	function updateCar() {
		if ( input && vehicle ) {
			speed = Math.sqrt(Math.pow(vehicle.mesh.getLinearVelocity().x, 2)+Math.pow(vehicle.mesh.getLinearVelocity().z, 2))*1.5; // y kann vernachlässigt werden!
			if(speed < 0)
				speedometer.update(speed * -1);
			else
				speedometer.update(speed * 1);
			tachometer.update(((speed*100)%4000)+1000);
			if ( input.direction !== null ) {
				input.steering += input.direction / 50;
				if ( input.steering < -.6 ) 
					input.steering = -.6;
				if ( input.steering > .6 ) 
					input.steering = .6;
			}
			vehicle.setSteering( input.steering, 0 );
			vehicle.setSteering( input.steering, 1 );

			if ( input.power === true ) {
				vehicle.applyEngineForce( 1000 );
			} else if ( input.power === false ) {
				vehicle.applyEngineForce( -1000 );
			} else {
				vehicle.applyEngineForce( 0 );
			}
		}

		scene.simulate( undefined, 2 );
	};
};