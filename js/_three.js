'use strict';

System.register(['node_modules/three/build/three.js'], function (_export, _context) {
    "use strict";

    var Scene, PerspectiveCamera, WebGLRenderer, Geometry, BoxGeometry, MeshBasicMaterial, Mesh, Vector3, Face3, SpotLight, scene, camera, renderer, geometry, material, mesh, light, geometrya;
    return {
        setters: [function (_node_modulesThreeBuildThreeJs) {
            Scene = _node_modulesThreeBuildThreeJs.Scene;
            PerspectiveCamera = _node_modulesThreeBuildThreeJs.PerspectiveCamera;
            WebGLRenderer = _node_modulesThreeBuildThreeJs.WebGLRenderer;
            Geometry = _node_modulesThreeBuildThreeJs.Geometry;
            BoxGeometry = _node_modulesThreeBuildThreeJs.BoxGeometry;
            MeshBasicMaterial = _node_modulesThreeBuildThreeJs.MeshBasicMaterial;
            Mesh = _node_modulesThreeBuildThreeJs.Mesh;
            Vector3 = _node_modulesThreeBuildThreeJs.Vector3;
            Face3 = _node_modulesThreeBuildThreeJs.Face3;
            SpotLight = _node_modulesThreeBuildThreeJs.SpotLight;
        }],
        execute: function () {
            scene = new Scene();
            camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

            camera.position.z = 8;
            // 创建渲染器
            renderer = new WebGLRenderer();
            geometry = new BoxGeometry(1, 1, 1);
            material = new MeshBasicMaterial({ color: 0xff0000 });
            mesh = new Mesh(geometry, material);
            light = new SpotLight(0xffffff);


            scene.add(mesh);
            // 设置画布大小
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比，针对高清屏
            renderer.setClearColor(0x000000, 1); // 设置默认背景色
            geometrya = new Geometry();

            light.position.z = 5;
            light.position.x = 5;
            light.position.y = 5;
            geometrya.vertices.push(new Vector3(-10, 10, 0), new Vector3(-10, -10, 0), new Vector3(10, -10, 0));

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
        }
    };
});