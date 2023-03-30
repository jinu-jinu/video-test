import { Preload } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { Suspense, useState } from 'react';
import Video3 from './Video3';

const Loader = ({ progress }: { progress: number }) => {
  return (
    <div>
      <div>
        <h1>loading</h1>
        <p>{progress}%</p>
      </div>
    </div>
  );
};
/*
  와 비디오 끝장냈다

  프리로딩으로 비디오 전부 다운 받아버림
  비디오 갯수를 체크해서 다운받을때까지 기다림
  
*/

function App() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadedVideoCount, setLoadedVideoCount] = useState(0);
  let id: NodeJS.Timeout;

  const PreloadVideo = () => {
    useFrame(() => {
      if (progress === 100) return;

      if (loadedVideoCount === 6) {
        setProgress(100);

        id = setTimeout(() => {
          setLoaded(true);
        }, 3000);
      } else {
        setProgress((loadedVideoCount / 6) * 100);
        setLoaded(false);
      }

      return () => {
        clearTimeout(id);
      };
    });

    return null;
  };

  const url = ['01', '02', '03', '04', '05', '06'];

  return (
    <>
      {!loaded ? <Loader progress={progress} /> : null}
      <Canvas gl={{ antialias: false }} dpr={window.devicePixelRatio} className="canvas">
        <Perf />
        <ambientLight />
        <Suspense>
          <Video3 url={url} setLoadedVideoCount={setLoadedVideoCount} />
          <PreloadVideo />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
