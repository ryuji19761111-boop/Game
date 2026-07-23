import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);


const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(0,0,3);


const renderer = new THREE.WebGLRenderer({
  antialias:true
});

renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);



const light = new THREE.HemisphereLight(
  0xffffff,
  0x444444,
  3
);

scene.add(light);



const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping=true;



const loader = new GLTFLoader();


loader.load(
  "./DamagedHelmet.glb",

  (data)=>{

    const model=data.scene;

    scene.add(model);


    // 自動サイズ調整
    const box=new THREE.Box3()
      .setFromObject(model);

    const size=box.getSize(
      new THREE.Vector3()
    );

    const center=box.getCenter(
      new THREE.Vector3()
    );

    model.position.sub(center);


    const max=Math.max(
      size.x,
      size.y,
      size.z
    );

    camera.position.z=max*2;


  },

  undefined,

  (err)=>{
    console.error(err);
  }
);



addEventListener(
"resize",
()=>{

camera.aspect=innerWidth/innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(
innerWidth,
innerHeight
);

});



function loop(){

requestAnimationFrame(loop);

controls.update();

renderer.render(
scene,
camera
);

}

loop();
