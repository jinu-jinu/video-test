import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Particle from './particle/Particle';
import * as THREE from 'three';
import Video from './Video';

function App() {
  return (
    <Canvas gl={{ antialias: false }} dpr={window.devicePixelRatio} className="canvas">
      <Perf />
      <ambientLight />
      <Video />
      {/* <Particle
        position={[0, 0, -5]}
        model="rabbit"
        color1={new THREE.Color('#ff00c3')}
        color2={new THREE.Color('#fbcb09')}
      /> */}
    </Canvas>
  );
}

export default App;
