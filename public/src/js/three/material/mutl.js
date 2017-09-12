import * as THREE from 'three'

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 10, 130);
camera.position.x = -50;
camera.position.y = 60;
camera.position.z = 30;
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(1);
function addCube() {
    var cubeSize = Math.ceil(3+Math.random()*3);
    var geom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var material = new THREE.MeshDepthMaterial();
    var colorMaterial = new THREE.MeshBasicMaterial({
        color:0x00ff00,
        transparent:true,
        blending:THREE.MultiplyBlending});

    var cube = new THREE.SceneUtils.createMultiMaterialObject(geom, [material, colorMaterial]);
    cube.castShadow = true;
    cube.children[0].scale.set(.99, .99, .99);
    cube.position.set(
        -60+Math.round(Math.random()*100),
        Math.round(Math.random()* 10),
        -100+Math.round(Math.random()*150)
    );
    scene.add(cube);
}

for(var i = 0; i < 100; i++){
    addCube();
}

function render() {
    requestAnimationFrame(render);

    scene.traverse(function (e) {
        if(e instanceof THREE.Mesh){
            e.rotation.y += .02;
            e.rotation.x += .02;
            e.rotation.z += .02;

        }
    });
    renderer.render(scene, camera);
}
render();

document.getElementById('world').appendChild(renderer.domElement);
