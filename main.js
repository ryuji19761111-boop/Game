import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// ライト
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
scene.add(light);


// 操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


// モデル読み込み
const loader = new GLTFLoader();

loader.load(
  "DamagedHelmet.glb",
  (gltf) => {
    scene.add(gltf.scene);
    console.log("モデル読み込み成功");
  },
  undefined,
  (error) => {
    console.error("読み込み失敗", error);
  }
);


// リサイズ
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// 描画
function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene,camera);
}

animate();
