import React, { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

type VideoProps = {
  url: string;
  scale: [number, number, number];
  pos?: [number, number, number];
  rotation?: [number, number, number];
  opacity?: number;
  isPlay?: boolean;
};

const Video = React.forwardRef(
  ({ url, pos, scale, rotation, opacity = 0, isPlay = false }: VideoProps, ref) => {
    const video = useMemo(() => {
      const vid = document.createElement('video');
      vid.loop = true;
      vid.muted = true;
      vid.setAttribute('crossorigin', 'Anonymous');
      vid.setAttribute('playsinline', 'true');
      vid.innerHTML = `
        <source src=${url} type="video/mp4" />
      `;

      return vid;
    }, []);

    const texture = new THREE.VideoTexture(video);

    useFrame(() => {
      if (isPlay) video.play();
      else video.pause();
    });

    return (
      <>
        <Suspense fallback={null}>
          <mesh position={pos} rotation={rotation}>
            <planeGeometry args={scale} />
            <meshStandardMaterial
              transparent
              opacity={opacity}
              toneMapped={false}
              side={THREE.DoubleSide}
              ref={ref as any}
            >
              <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
            </meshStandardMaterial>
          </mesh>
        </Suspense>
      </>
    );
  }
);

export default Video;
