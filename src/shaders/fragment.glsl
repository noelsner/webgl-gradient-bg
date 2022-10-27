varying vec2 vUv;
varying vec3 vColor;

void main() {
  // gl_FragColor = vec4(vUv, 0.0, 1.0);
  gl_FragColor = vec4(vColor, 1.0);
}

// uniform float time;
// uniform float progress;
// uniform sampler2D texturel;
// uniform vec4 resolution;
// varying vec2 vUv;
// varying vec3 vPosition;
// varying vec3 vColor;
// float PI 3.141592653589793238;

// void main() {
//   // vec2 newUV= &yuv : vec2(0.5))*resolution.zw + vec2(0.5);
//   gl_FragColor = vec4(v0: vUv, v1: 0.0, v2: 1.0);
// }
