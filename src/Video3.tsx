import { useVideoTexture } from '@react-three/drei';
import { Suspense } from 'react';

const VideoMaterial = ({
  url,
  setLoadedVideoCount,
}: {
  url: string;
  setLoadedVideoCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const texture = useVideoTexture(`/video/${url}.mp4`, {
    muted: true,
    loop: true,
    start: true,
    autoplay: true,
    playsInline: true,
    preload: 'auto',
    unsuspend: 'canplaythrough',
    onplay: ev => {
      setLoadedVideoCount(prev => prev + 1);
    },
  });

  texture.dispose();

  return <meshBasicMaterial map={texture} toneMapped={true} />;
};

const Video3 = ({
  url,
  setLoadedVideoCount,
}: {
  url: string[];
  setLoadedVideoCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pos: [number, number, number][] = [
    [1, 0, 0],
    [-1, 0, 0],
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
  ];

  return (
    <>
      {url.map((u: string, i: number) => (
        <mesh key={`${u}-${i}`} position={pos[i]}>
          <planeGeometry />
          <Suspense>
            <VideoMaterial url={u} setLoadedVideoCount={setLoadedVideoCount} />
          </Suspense>
        </mesh>
      ))}
    </>
  );
};

export default Video3;
