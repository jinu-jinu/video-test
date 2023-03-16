import { Suspense, useState } from 'react';
import * as THREE from 'three';

const Video = () => {
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = '/video/pt1-01.mp4';
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  return (
    <Suspense fallback={null}>
      <mesh position={[0, -1, 0]}>
        <planeGeometry args={[1.5, 1, 1]} />
        <meshStandardMaterial side={THREE.DoubleSide}>
          <videoTexture attach="map" encoding={THREE.sRGBEncoding} args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </Suspense>
  );
};

export default Video;
