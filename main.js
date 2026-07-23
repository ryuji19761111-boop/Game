import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// ライト
const light = new THREE.HemisphereLight(0xffffff, 0x555555, 3);
scene.add(light);


// GLB読み込み
const loader = new GLTFLoader();

loader.load(
  "./DamagedHelmet.glb",
  (gltf) => {
    scene.add(gltf.scene);
    alert("GLB成功");
  },
  undefined,
  (error) => {
    alert("GLB失敗");
    console.error(error);
  }
);


function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

animate();
