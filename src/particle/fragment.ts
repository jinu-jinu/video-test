export default /* glsl */ `

  varying vec3 vPosition;
  
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uOpacity;

  void main() {
    float depth = vPosition.x * 0.5 + 0.5;

    // circle
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);
    vec3 color = mix(vec3(0.0), mix(uColor1, uColor2, depth), strength);
    
  float lightPoint = pow(1.0 - distance(gl_PointCoord, vec2(0.5)), 10.0) * uOpacity;

    gl_FragColor = vec4(color, lightPoint);
  }
`;
