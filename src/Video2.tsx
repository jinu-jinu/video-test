import { useVideoTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { useSnapshot } from 'valtio/react';
import { state } from './store';

const Video2 = () => {
  const { start } = useSnapshot(state);
  const texture = useVideoTexture('/video/pt1-01.mp4', {
    muted: true,
    loop: true,
    // start,
    autoplay: true,
  });

  useFrame(() => {
    console.log(state.start);
  });

  useLayoutEffect(() => {
    let clearId: NodeJS.Timeout;

    clearId = setTimeout(() => {
      console.log(1);
      state.start = false;
    }, 3000);

    return () => {
      clearTimeout(clearId);
    };
  }, []);

  return (
    <mesh position={[1, 1, 0]}>
      <planeGeometry args={[1.5, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Video2;
