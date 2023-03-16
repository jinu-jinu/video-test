import { Canvas } from '@react-three/fiber';
import Video from './Video';
import Video2 from './Video2';

/*
  실험1

  비디오가 나오는지 확인

  실험2

  scrolltrigger에 z축 mesh도 걸리는지 확인

  실험3

  파티클을 좀 더 자연스럽게 이동하게 만들어보기
*/

function App() {
  return (
    <Canvas gl={{ antialias: false }} dpr={window.devicePixelRatio} className="canvas">
      <ambientLight />
      <Video />
      <Video2 />
    </Canvas>
  );
}

export default App;
