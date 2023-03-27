import { useMemo } from 'react';
import * as THREE from 'three';

const Video = () => {
  const video = useMemo(() => {
    const res = document.createElement('video');
    res.loop = true;
    res.muted = true;
    res.autoplay = true;
    res.playsInline = true;
    res.src = '/video/pt1-01.mp4';

    res.play();

    return res;
  }, []);

  const texture = new THREE.VideoTexture(video);

  return (
    <mesh position={[1, 1, 0]}>
      <planeGeometry args={[1.5, 1, 1]} />
      <meshBasicMaterial map={texture} opacity={1} transparent />
    </mesh>
  );
};

export default Video;
