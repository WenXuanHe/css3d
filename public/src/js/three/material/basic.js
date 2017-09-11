import * as THREE from 'three'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.x = -50;
camera.position.y = 60;
camera.position.z = 30;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.Enabled = true;

var groupGeom = new THREE.PlaneGeometry(100, 100);
var groupMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
var group = new THREE.Mesh(groupGeom, groupMaterial);
group.rotation.x = -.5*Math.PI;
scene.add(group);

var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
var cubeMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-10, 3, 8);
cube.receiveShadow = true;
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
var sphereMaterial = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe:true});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.receiveShadow = true;
sphere.position.set(-2, 20, 1);
scene.add(sphere);

var ambient = new THREE.AmbientLight(0x0c0c0c);
ambient.position.set(20, 50, 100);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 30, 50);
spotLight.castShadow = true;

scene.add(ambient);
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.01;
    cube.rotation.y += 0.01;
}
render();

document.getElementById('world').appendChild(renderer.domElement);
