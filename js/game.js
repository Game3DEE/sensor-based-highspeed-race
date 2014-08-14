
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
'use strict';

Physijs.scripts.worker = 'js/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

//Scene
var initScene, render, renderer, scene;

// Camera
var radarCamera, frontCamera, backCamera, cameraTarget, selectedCamera = "backCamera";
var vehicle, raceTrack, cameraTarget;
var $trackingOverlay = $('#tracking-overlay');

// HUD
var projector, timer, speedometer, crashed;

// Race
var light, track, selectedCar;

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

document.addEventListener ("DOMContentLoaded", function() {
  document.removeEventListener ("DOMContentLoaded", arguments.callee, false);

  speedometer = new Speedometer ('speedometer', {theme: 'default', max: 200.0});
  speedometer.draw ();
  tachometer = new Speedometer ('tachometer', {theme: 'default', max: 7000.0});
  tachometer.draw ();
});

initScene = function(selectedCar, selectedTrack) {
	if(  /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ){
		var deviceController = new DeviceController();
		window.addEventListener('deviceorientation', function(event) {
			   var g = event.gamma; // forward/back 'tilt'
			   var b = event.beta; // left/right 'tilt'
			   var a = event.alpha; // "direction"   
		   window.onorientationchange = deviceController.readDeviceOrientation(g,b,a);
		}, false);
	}
	
	cameraTarget = new THREE.Vector3();
	projector = new THREE.Projector();
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.getElementById( 'viewport' ).appendChild( renderer.domElement );
	scene = new Physijs.Scene;
	scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
	
	frontCamera = new THREE.PerspectiveCamera(
		35,
		SCREEN_WIDTH / SCREEN_HEIGHT,
		1,
		5000
	);
	
	backCamera = new THREE.TargetCamera( 35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
	
	radarCamera = new THREE.PerspectiveCamera(
		35,
		900 / 500,
		1,
		5000
	);
	scene.add( radarCamera );
	
	radarCamera.position.set(0,1500,0);
	radarCamera.lookAt( scene.position );
	
	
	// Skybox
	var imagePrefix = "images/dawnmountain-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.BoxGeometry( 5000, 5000, 5000 );	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
			side: THREE.BackSide
		}));
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );

	// Light
	light = new THREE.DirectionalLight( 0xFFFFFF );
	light.position.set( 20, 20, -15 );
	light.target.position.copy( scene.position );
	light.castShadow = true;
	light.shadowCameraLeft = -150;
	light.shadowCameraTop = -150;
	light.shadowCameraRight = 150;
	light.shadowCameraBottom = 150;
	light.shadowCameraNear = 20;
	light.shadowCameraFar = 400;
	light.shadowBias = -.0001
	light.shadowMapWidth = light.shadowMapHeight = 2048;
	light.shadowDarkness = .7;
	scene.add( light );
	
	// Strecke
	track = new Track();
	track.loadTrack(selectedTrack);
	console.log(track.vehiclePosition.y);
	
	window.addEventListener( 'resize', onWindowResize, false );
	
	// Car
	selectedCar = new Cars(selectedCar);
	
	// Cameras
	cameraTarget.z = 500;
	cameraTarget.y = 0;
	frontCamera.position.y = 2;
	frontCamera.position.z = -3;
	frontCamera.lookAt( cameraTarget );
	requestAnimationFrame( render );
	scene.simulate(); // run physics
	$( ".restart" ).click(function() {
		crashed = false;
		vehicle= false;
		timer = false;
		window.location.reload()
	});
};

render = function() {
	requestAnimationFrame( render );
	if ( vehicle ) {
		light.target.position.copy( vehicle.mesh.position );
		light.position.addVectors( light.target.position, new THREE.Vector3( 20, 130, -15 ) );
		positionTrackingOverlay();
		frontCamera.lookAt( cameraTarget );
		backCamera.update();
		if(!timer)
			timer = new Timer();
		timer.updateTimer();
	}
	if(timer) {
		if(!crashed && !timer.getWin()) {
			if(selectedCamera == "frontCamera")
				renderer.render( scene, frontCamera);
			else
				renderer.render( scene, backCamera);
		}else {
			$("#result").slideDown();
			$("#damage").hide();
			$("#timer").hide();
			$("#tracking-overlay").children().hide();
			$("#tacho").children().hide();
			if(timer.getWin()) {
				$("#result .crash").hide();
				timer.getTime();
			}else {
				$("#result .win").hide();
			}
		}
	}
};

positionTrackingOverlay = function()
{
	var matrix = vehicle.mesh.world.matrixWorld;
	var visibleWidth, visibleHeight, p, v, percX, percY, left, top;
	// perspective:
	// this will give us position relative to the world
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
};
function onWindowResize( event ) {

	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;


	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

}