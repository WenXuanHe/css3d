// Creating the scene
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Geometry,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    Face3,
    SpotLight
} from 'three';
// 创建场景
let scene = new Scene();
//创建相机
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;
// 创建渲染器
let renderer = new WebGLRenderer();
// 创建一个长方体，用来定义物体的形状
let geometry = new BoxGeometry(1, 1, 1);
// 创建一个材质，用来定义物体的颜色
let material = new MeshBasicMaterial({
    color: 0xff0000
});
// 使用形状和素材，来定义物体
let mesh = new Mesh(geometry, material);
let light = new SpotLight(0xffffff);

scene.add(mesh);
// 设置画布大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
renderer.setClearColor(0x000000, 1); // 设置默认背景色
var geometrya = new Geometry();
light.position.z = 5;
light.position.x = 5;
light.position.y = 5;
geometrya.vertices.push(
    new Vector3(-10, 10, 0),
    new Vector3(-10, -10, 0),
    new Vector3(10, -10, 0)
);

geometrya.faces.push(new Face3(0, 1, 2));

geometrya.computeBoundingSphere();

scene.add(light);
renderer.render(scene, camera);
// 把画笔插入到dom中
document.body.appendChild(renderer.domElement);

// import { Scene, PerspectiveCamera, WebGLRenderer , Mesh, MeshBasicMaterial, BoxGeometry} from 'node_modules/three/build/three.js';

//     var scene = new Scene(); // 创建场景

//     var camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000); // 创建摄影机
//     camera.position.z = 8;

//     var renderer = new WebGLRenderer(); // 创建渲染器
//     renderer.setSize(window.innerWidth, window.innerHeight); // 设置画布大小
//     renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
//     renderer.setClearColor(0x000000, 1); // 设置默认背景色



//     var geometry = new BoxGeometry(1, 1, 1); // 创建一个长方体，用来定义物体的形状

//     var material = new MeshBasicMaterial({ color: 0xff0000 }); // 创建一个材质，用来定义物体的颜色

//     var mesh = new Mesh(geometry, material); // 使用形状和素材，来定义物体

//     scene.add(mesh);

//     renderer.render(scene, camera);

//     document.body.appendChild(renderer.domElement); // 把画笔插入到dom中
