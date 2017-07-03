## css3d

#### 1.用css3d做一个不停旋转的正方体
  ** 1.stage **
  要做3d变换，首先需要一舞台元素stage，这个元素是根元素，在这个元素上定义视距——即双眼到屏幕的距离。设置透视原点，让在做3
  变换时，不会晃动。
    ```
    .stage{
        perspective: 1000px;
        position: relative;
        perspective-origin: 94% 50%;
    }
    ```
  ** 2.容器元素**
  容器元素包含所有的子元素，做变换时，直接对容器元素进行变换，还要设置` transform-style: preserve-3d; ` 使被转换的子元素保留其 3D 转换
  ```
    .contain{
        position: absolute;
        transform-style: preserve-3d;
        animation:change 8s linear infinite;
    }
  ```
  ** 3.子元素 **
  这一阶段通常涉及到一些计算的问题，rotateX 是以x轴做3d变换，rotateY是以y轴做坐标变换, rotateZ 是以z轴做坐标变换。
  ```
     transform: rotateY(0deg) translateZ(100px);
     transform-origin: center;
  ```

#### 2.用css3d做一个旋转木马
  第一，er阶段和做正方体3d变换类似，主要在第三步，需要根据形状计算translateZ的大小，才能确保3d图形完整的撑开。通过三角函数Math.tan(`角度`*Math.PI/180) 和底边的长度算出translateZ。
  ```
    transform: rotateY(40deg ) translateZ($translateZ);
  ```
#### 3.用threejs做一个动画
