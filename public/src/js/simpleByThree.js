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
    Vector3,
    CubeGeometry
} from 'three';

import TrackballControls  from 'three-trackballcontrols';

const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;

class main {
    constructor() {

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.ground = null;
        this.init();
    }

    init() {
        // 创建场景
        this.scene = new Scene();
        // 创建光线
        this.createlight();
        // 相机
        this.camera = new PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
        this.setCamera();
        // 渲染器
        this.renderer = new WebGLRenderer({
            antialias: true, //抗锯齿
        });
        this.setRenderer();
        // 添加到body
        document.body.appendChild(this.renderer.domElement);
        // 创建正方体
        this.createRect();
        // 创建陆地
        this.createGround();
        // 设置鼠标控制
        this.setControl();
        // 持续渲染
        this.render();
    }

    setCamera() {
        this.camera.position.set(-300, 0, 0);
        this.camera.lookAt(new Vector3(0, 0, 0));
        // 但我们调用scence.add()的时候，我们要添加的东西讲被添加在(0,0,0)坐标下.这会导致相机和立方体彼此交叉。为了避免这一点，我们只需将相机移出一点
        this.camera.position.z = 10;
    }

    setRenderer() {
        // 定义镜头尺寸
        this.renderer.setSize(SCREEN_WIDTH , SCREEN_HEIGHT);
        // 设置默认背景色
        this.renderer.setClearColor(0xf0f0f0);
        // 开启阴影
        this.renderer.shadowMap.enabled = true;
    }

    createGround() {
        this.ground = new Mesh(
            new CubeGeometry(1000, 1, 1000),
            new MeshLambertMaterial({
                color: 0xff0000
            })
        );
        this.ground.position.set(0, -10, 0);
        this.ground.receiveShadow = true;

        this.scene.add(this.ground);
    }

    createRect() {
        // 定义物体的形状
        var geometry = new BoxGeometry(3, 30, 30);//深，长，宽
        // 定义物体的材质
        var material = new MeshLambertMaterial({
            color: 0x7777ff
        });
        //定义物体
        var mesh = new Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        this.scene.add(mesh);
    }

    createlight() {
        // 设置光源
        this.scene.add(new AmbientLight(0xcccccc));
        //设置平行光方向
        var directionalLight = new DirectionalLight(0xcccccc);
        directionalLight.position.set(-2, 9, 1).normalize();
        this.scene.add(directionalLight);
        var pointlight = new PointLight(0xffffff, 1, 500);
        //设置点光源位置
        pointlight.position.set(0, 0, 500);
        pointlight.castShadow = true;
        this.scene.add(pointlight);
    }

    setControl() {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.minDistance = 1;
        this.controls.maxDistance = 100000;
    }

    render() {

        requestAnimationFrame(this.render.bind(this));
        // this.ground.rotation.y += 0.01;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new main();
