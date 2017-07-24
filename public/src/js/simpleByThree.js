// BoxGeometry--长方体
// CircleGeometry--圆形平面
// CylinderGeometry--圆柱体
// PlaneGeometry--方形平面
// RingGeometry--环形平面
// SphereGeometry--球形
// TextGeometry--文字
// TorusGeometry--圆环
// TubeGeometry--圆管
// MeshLambertMaterial 漫反射材质 需要光源
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    MeshBasicMaterial,
    Mesh,
    Geometry,
    BoxGeometry,
    BoxBufferGeometry,
    ConeBufferGeometry,
    CircleBufferGeometry,
    CylinderBufferGeometry,
    MeshLambertMaterial,
    DirectionalLight,
    AmbientLight,
    PointLight,
    Vector3
} from 'three';

import TrackballControls  from 'three-trackballcontrols';

const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;
// 创建场景
var scene = new Scene();
scene.add(new AmbientLight(0xcccccc));
var directionalLight = new DirectionalLight(0xcccccc);
directionalLight.position.set(-2, 9, 1).normalize(); //设置平行光方向
scene.add(directionalLight);
var pointlight = new PointLight(0xffffff, 1, 1000);
pointlight.position.set(0, 0, 1000); //设置点光源位置
scene.add(pointlight);
// 相机
var camera = new PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
camera.position.set(20, 20, 20);
camera.lookAt(new Vector3(0, 0, 0));
var renderer = new WebGLRenderer();
// 定义镜头尺寸
renderer.setSize(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
// 设置默认背景色
renderer.setClearColor(0xf0f0f0);
document.body.appendChild(renderer.domElement);
// 定义物体的形状
var geometry = new BoxGeometry(15, 15, 15);
// 定义物体的材质
var material = new MeshLambertMaterial({
    color: 0x7777ff
});
//定义物体
var mesh = new Mesh(geometry, material);
// 定义光源

scene.add(mesh);

// 但我们调用scence.add()的时候，我们要添加的东西讲被添加在(0,0,0)坐标下.这会导致相机和立方体彼此交叉。为了避免这一点，我们只需将相机移出一点
camera.position.z = 10;
var controls = new TrackballControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 100000;
var render = function() {
    requestAnimationFrame(render);
    // mesh.rotation.x += 0.1;
    // mesh.rotation.y += 0.1;
    controls.update();
    renderer.render(scene, camera);
}
render();
