import * as THREE from 'three'

// THREE.OrthographicCamera(left, right, top, bottom, near, far);
// left 左边界
// right 右边界
// top 上边界
// bottom 下边界
// near 近裁面
// lookAt 设置目标点

// THREE.PerspectiveCamera(视野宽度=45，长宽比=window.innerWidth/window.innerHeight， near=0.1， far=1000)
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
renderer.shadowMapEnabled = true;

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
cube.position.y = 20;
cube.position.z = 20;
cube.receiveShadow = true;
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4,20,30);
var sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 4;
sphere.receiveShadow = true;
scene.add(sphere);
//点光源不会产生阴影，因为点光源向四面八方发射光线，计算阴影是一个十分沉重的负担
//创造点光源
var CreatePointLight = function () {
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-40, 60, 0);
    pointLight.castShadow = true;
    scene.add(pointLight);
}
// 创造聚光灯？
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-20, 40, 40);
spotLight.castShadow = true;
spotLight.target = sphere;
scene.add(spotLight);
var angleMath = 3;

document.onkeydown = function (event) {

    switch (event.keyCode){
        case 38:
            angleMath += 1;
            break;
        case 40:
            angleMath -= 1;
            break;
    }
}

function render() {
    requestAnimationFrame(render);
    spotLight.angle = Math.PI/angleMath;
    renderer.render(scene, camera);
}
render();

document.getElementById('world').appendChild(renderer.domElement);


