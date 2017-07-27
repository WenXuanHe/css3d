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
    SphereGeometry,
    MeshLambertMaterial,
    DirectionalLight,
    AmbientLight,
    PointLight,
    Vector3,
    CubeGeometry,
    Fog,
    Object3D,
    MeshPhongMaterial,
    FlatShading,
} from 'three';

import TrackballControls from 'three-trackballcontrols';

const SCREEN_HEIGHT = window.innerHeight;
const SCREEN_WIDTH = window.innerWidth;
const Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0
};

class main {
    constructor() {

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.ground = null;
        this.airport = null;

        this.init();
    }

    init() {
        // 创建场景
        this.scene = new Scene();
        // 在场景中添加雾的效果；样式上使用和背景一样的颜色
        this.scene.fog = new Fog(0xf7d9aa, 100, 950);
        // 创建光线
        this.createlight();
        // 相机
        this.camera = new PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
        this.setCamera();
        // 渲染器
        this.renderer = new WebGLRenderer({
            antialias: true, //抗锯齿
            alpha: true,
        });
        this.setRenderer();
        // 添加到body
        document.getElementById('world').appendChild(this.renderer.domElement);

        // 创建陆地
        this.createGround();

        this.createAirport();

        this.createAI();

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
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        // 设置默认背景色
        this.renderer.setClearColor(0xf0f0f0);
        // 开启阴影
        this.renderer.shadowMap.enabled = true;
    }

    createAI(){

        // 创建一个空的容器
        this.AI = new Object3D();

        // 头
        var geometry = new SphereGeometry( 14, 96, 96 );
        var material = new MeshBasicMaterial( {color: Colors.pink} );
        var head = new Mesh( geometry, material );
        head.position.set(-100, 100, 0);//前后， 上下，左右
        head.castShadow = true;
        head.receiveShadow = true;
        this.AI.head = head;
        this.AI.add(head);

        var geomCockpit = new BoxGeometry(10, 10, 10, 1, 1, 1);
        var matCockpit = new MeshPhongMaterial({
            color: Colors.red,
            shading: FlatShading
        });
        var cockpit = new Mesh(geomCockpit, matCockpit);
        cockpit.position.set(-100, 85, 0);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.AI.cockpit = cockpit;
        this.AI.add(cockpit);
        
        var geomBody = new BoxGeometry(30, 30, 30, 1, 1, 1);
        var matBody = new MeshPhongMaterial({
            color: Colors.red,
            shading: FlatShading
        });
        var body = new Mesh(geomBody, matBody);
        body.position.set(-100, 65, 0);
        body.castShadow = true;
        body.receiveShadow = true;
        this.AI.body = body;
        this.AI.add(body);

        var geomRightFoot = new BoxGeometry(10, 65, 10, 1, 1, 1);
        var matFoot = new MeshPhongMaterial({
            color: Colors.red,
            shading: FlatShading
        });
        var footer = new Mesh(geomFoot, matFoot);
        footer.position.set(-100, 25, 10);
        footer.castShadow = true;
        footer.receiveShadow = true;
        this.AI.footer = footer;
        this.AI.add(footer);

        this.scene.add(this.AI);
    }

    createAirport() {
        // 创建一个空的容器
        this.airport = new Object3D();

        var geomCockpit = new BoxGeometry(60, 50, 50, 1, 1, 1);
        var matCockpit = new MeshPhongMaterial({
            color: Colors.red,
            shading: FlatShading
        });
        var cockpit = new Mesh(geomCockpit, matCockpit);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;
        this.airport.cockpit = cockpit;
        this.airport.add(cockpit);

        // 创建引擎
        var geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
        var matEngine = new MeshPhongMaterial({
            color: Colors.white,
            shading: FlatShading
        });
        var engine = new Mesh(geomEngine, matEngine);
        engine.position.x = 40;
        engine.castShadow = true;
        engine.receiveShadow = true;
        this.airport.add(engine);

        // 创建机尾
        var geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
        var matTailPlane = new MeshPhongMaterial({
            color: Colors.red,
            shading: FlatShading
        });
        var tailPlane = new Mesh(geomTailPlane, matTailPlane);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;
        this.airport.add(tailPlane);

        // 创建机翼
        var geomSideWing = new BoxGeometry(40, 8, 150, 1, 1, 1);
        var matSideWing = new MeshPhongMaterial({
            color: Colors.red,
            shading: FlatShading
        });
        var sideWing = new Mesh(geomSideWing, matSideWing);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;
        this.airport.add(sideWing);

        // 创建螺旋桨
        var geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);
        var matPropeller = new MeshPhongMaterial({
            color: Colors.brown,
            shading: FlatShading
        });
        var propeller = new Mesh(geomPropeller, matPropeller);
        propeller.castShadow = true;
        propeller.receiveShadow = true;

        // 创建螺旋桨的桨叶
        var geomBlade = new BoxGeometry(1, 100, 20, 1, 1, 1);
        var matBlade = new MeshPhongMaterial({
            color: Colors.brownDark,
            shading: FlatShading
        });

        var blade = new Mesh(geomBlade, matBlade);
        blade.position.set(8, 0, 0);
        blade.castShadow = true;
        blade.receiveShadow = true;
        propeller.add(blade);
        propeller.position.set(50, 0, 0);
        this.airport.propeller = propeller;
        this.airport.add(propeller);
        this.scene.add(this.airport);

    }

    createGround() {
        this.ground = new Mesh(
            new CubeGeometry(1000, 1, 1000),
            new MeshLambertMaterial({
                color: Colors.brown
            })
        );
        this.ground.position.set(0, -10, 0);
        this.ground.receiveShadow = true;

        this.scene.add(this.ground);
    }

    createRect() {
        // 定义物体的形状
        var geometry = new BoxGeometry(3, 30, -30); //深，长，宽
        // 定义物体的材质
        var material = new MeshLambertMaterial({
            color: 0x7777ff
        });
        //定义物体
        var mesh = new Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
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
        this.airport.propeller.rotation.x += 0.3;
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new main();
