import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Solenoid } from "./math/curves/Solenoid";
import { Mesh, TubeGeometry } from "three";

const copper = new THREE.MeshPhongMaterial({ color: "orange" });

// initialize
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const stats = Stats();
document.body.appendChild(stats.dom);

//setup gui
const gui = new GUI();

const setting = { current_curve: "solenoid", current_curve_index: 0 };

const grid = new THREE.GridHelper(10, 10);
const axis = new THREE.AxesHelper(5);

const curves = [new Solenoid(5, 5, 5)];

const curves_meshes = curves.map((curve) => {
  const spline = curve.getSpline(100);
  const geometry = new TubeGeometry(spline, 300, 0.1);

  return new Mesh(geometry, copper);
});

function handledPropertyChange() {}

function upadateCurve() {}

function initialGUI() {
  //add gui
  gui.add(grid, "visible").name("show grid");
  gui.add(axis, "visible").name("show axis");
}

function initialScene() {
  //add lights
  const ambiant = new THREE.AmbientLight(0x404040);
  const light = new THREE.PointLight(0xff0000, 1, 100);
  light.position.set(5, 5, 5);

  // set control poperties
  controls.enableDamping = true;

  // add mesh to the scene
  scene.add(ambiant);
  scene.add(light);
  scene.add(grid, axis);
  scene.add(curves_meshes[0]);
  curves[0].getDirectionalArrows(300).then((result) => {
    scene.add(result)
  })
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  stats.update();
  renderer.render(scene, camera);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}

initialScene();
initialGUI();
animate();

window.addEventListener("resize", onResize);
