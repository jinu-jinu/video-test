export default /* glsl */ `

uniform float uTime;
uniform float uScale;
uniform float uSize;

varying vec3 vPosition;

attribute vec3 aRandom;

void main() {
  vPosition = position;

  vec3 pos = position;
  float time = uTime * 4.;

  pos.x += sin(time * aRandom.x) * 0.01;
  pos.y += cos(time * aRandom.y) * 0.01;
  pos.z += cos(time * aRandom.z) * 0.01;


  // 랜덤 값을 더해주면 파티클이 펼쳐짐
  // minusrandom값을 큰 수로 나눠서 0에 가까운 숫자로 만들어주면 원래 모양으로 되돌아감
  // 스크롤 값을 minusRandom 값으로 보내주면 스크롤에 따라 반응하게 됌

  float minusRandom = 100.0;
  pos.x *= 1.0 + aRandom.x * 10.0 / minusRandom;
  pos.y *= 1.0 + aRandom.y * 10.0 / minusRandom;
  pos.z *= 1.0 + aRandom.z * 10.0 / minusRandom;
  
  // 물결
  // pos.x *= uScale + sin(pos.z * 4. + time) * (1.0 - uScale);
  // pos.y *= uScale + cos(pos.x * 4. + time) * (1.0 - uScale);
  // pos.z *= uScale + cos(pos.y * 4. + time) * (1.0 - uScale);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize / -mvPosition.z;
}
`;
