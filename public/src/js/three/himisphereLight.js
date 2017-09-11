import * as THREE from 'three'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.x = -50;
camera.position.y = 60;
camera.position.z = 30;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer({
    antialias: true, //抗锯齿
    alpha: true,
});
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.Enabled = true;

var planeGeometry = new THREE.PlaneGeometry(70, 50, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({
    color:0xcccccc
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -.5*Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(4,4,4);
var cubeMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -20;
cube.position.y = 30;
cube.position.z = 20;
cube.receiveShadow = true;
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4,20,30);
var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 4;
sphere.receiveShadow = true;
scene.add(sphere);

// 半球光
var hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);

document.onkeydown = function (event) {

    switch (event.keyCode){
        case 38:
            hemiLight.intensity += .1
            break;
        case 40:
            hemiLight.intensity -= 0.1;
            break;
    }
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

document.getElementById('world').appendChild(renderer.domElement);


