import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import colors from "nice-color-palettes";

const parameters = {
  colorPaletteIndex: 10,
  elevation: 0.3,
  geometrySpeed: 0.1,
  colorSpeed: 0.001,
  tilt: 0,
  incline: 0.1,
  colorFrequencyX: 0.3,
  colorFrequencyY: 0.4,
  color1: "#cda3ff",
  color2: "#6ec3f4",
  color3: "#eae2ff",
  color4: "#b9beff",
  color5: "#c3e4ff",
};

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Colors
 */
// For random color palette
//  let colorPalette = colors[Math.floor(Math.random() * colors.length)];

// To use nice-color-palette
// const getColorPalette = () => {
//   let colorPalette = colors[parameters.colorPaletteIndex];
//   console.log("colorPalette :>> ", colorPalette);
//   colorPalette = colorPalette.map((color) => new THREE.Color(color));
//   return colorPalette;
// };

// To customize individual colors
const getColorPalette = () => {
  let colorPalette = [parameters.color1, parameters.color2, parameters.color3, parameters.color4, parameters.color5];
  colorPalette = colorPalette.map((color) => new THREE.Color(color));
  return colorPalette;
};

/**
 * Plane
 */
// Geometry
const geometry = new THREE.PlaneGeometry(2.5, 2.5, 180, 180);
geometry.rotateX(Math.PI * -0.1);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  //   wireframe: true,
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: getColorPalette() },
    uElevation: { value: parameters.elevation },
    uGeometrySpeed: { value: parameters.geometrySpeed },
    uColorSpeed: { value: parameters.colorSpeed },
    uIncline: { value: parameters.incline },
    uTilt: { value: parameters.tilt },
    uColorFrequencyX: { value: parameters.colorFrequencyX },
    uColorFrequencyY: { value: parameters.colorFrequencyY },
  },
});

// Mesh
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 0.9);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Debug
 */
// gui
//   .add(parameters, "colorPaletteIndex")
//   .min(0)
//   .max(100)
//   .step(1)
//   .name("Color Palette")
// .onChange(() => {
//   material.uniforms.uColor.value = getColorPalette();
// });
gui
  .add(parameters, "elevation")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Elevation")
  .onChange(() => {
    material.uniforms.uElevation.value = parameters.elevation;
  });
gui
  .add(parameters, "geometrySpeed")
  .min(0)
  .max(0.5)
  .step(0.01)
  .name("Geometry Speed")
  .onChange(() => {
    material.uniforms.uGeometrySpeed.value = parameters.geometrySpeed;
  });
gui
  .add(parameters, "colorSpeed")
  .min(0)
  .max(0.5)
  .step(0.01)
  .name("Color Speed")
  .onChange(() => {
    material.uniforms.uColorSpeed.value = parameters.colorSpeed;
  });
gui
  .add(parameters, "incline")
  .min(0)
  .max(1)
  .step(0.01)
  .name("Incline")
  .onChange(() => {
    material.uniforms.uIncline.value = parameters.incline;
  });
gui
  .add(parameters, "tilt")
  .min(-1.5)
  .max(1.5)
  .step(0.1)
  .name("Tilt")
  .onChange(() => {
    material.uniforms.uTilt.value = parameters.tilt;
  });
gui
  .add(parameters, "colorFrequencyX")
  .min(0)
  .max(1.5)
  .step(0.1)
  .name("Color Frequency X")
  .onChange(() => {
    material.uniforms.uColorFrequencyX.value = parameters.colorFrequencyX;
  });
gui
  .add(parameters, "colorFrequencyY")
  .min(0)
  .max(1.5)
  .step(0.1)
  .name("Color Frequency Y")
  .onChange(() => {
    material.uniforms.uColorFrequencyY.value = parameters.colorFrequencyY;
  });
gui.addColor(parameters, "color1").onChange(() => {
  material.uniforms.uColor.value = getColorPalette();
});
gui.addColor(parameters, "color2").onChange(() => {
  material.uniforms.uColor.value = getColorPalette();
});
gui.addColor(parameters, "color3").onChange(() => {
  material.uniforms.uColor.value = getColorPalette();
});
gui.addColor(parameters, "color4").onChange(() => {
  material.uniforms.uColor.value = getColorPalette();
});
gui.addColor(parameters, "color5").onChange(() => {
  material.uniforms.uColor.value = getColorPalette();
});
