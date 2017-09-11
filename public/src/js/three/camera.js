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

var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);

var cubeGeometry = new THREE.BoxGeometry(4,4,4);

for(var j = 0; j < planeGeometry.parameters.height/5; j++){

    for(var i = 0; i < planeGeometry.parameters.width/5; i++){
        var rnf = Math.random()*0.75+0.25;
        var cubeMaterial = new THREE.MeshLambertMaterial();
        cubeMaterial.color = new THREE.Color(rnf, 0, 0);
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        cube.position.x = -(planeGeometry.parameters.width/2)+2+i*5;
        cube.position.y = 2;
        cube.position.z = -(planeGeometry.parameters.height/2)+2+j*5;
        scene.add(cube);
    }
}

var control = new function () {
    this.perspective = 'perspective';
    this.switchCamera = function () {
        if(camera instanceof THREE.PerspectiveCamera){
            camera = new THREE.OrthographicCamera(
                window.innerWidth/-16,
                window.innerWidth/16,
                window.innerHeight/-16,
                window.innerHeight/16,
                -200, 500
            );
            camera.position.x = -20;
            camera.position.y = 60;
            camera.position.z = 50;
            camera.lookAt(scene.position);
            this.perspective = "Orthographic"
        }else{
            camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.01, 1000);
            camera.position.x = -20;
            camera.position.y = 60;
            camera.position.z = 50;
            camera.lookAt(scene.position);
        }

        render();

    }
    
}

setInterval(function () {
    control.switchCamera();
}, 2000);

document.onkeydown = function (event) {
    switch (event.keyCode){
        case 37:
            camera.rotation.y += 0.02;
            render();
            break;
        case 39:
            camera.rotation.y -= 0.02;
            render();
            break;
    }
    
}function render() {
    renderer.render(scene, camera);
}
render();

document.getElementById('world').appendChild(renderer.domElement);




