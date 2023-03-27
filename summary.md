# 배포 테스트

## 모바일 화면에서 비디오가 보이지 않는다

- video tag를 만들고 videoTexture에 넣는 방법은 모바일 화면에 보이지 않음

```tsx
const [video] = useState(() => {
  const vid = document.createElement('video');
  vid.src = '/video/pt1-01.mp4';
  vid.crossOrigin = 'Anonymous';
  vid.loop = true;
  vid.muted = true;
  vid.play();
  return vid;
});

return 
  <Suspense fallback={null}>
    <mesh position={[0, -1, 0]}>
      <planeGeometry args={[1.5, 1, 1]} />
      <meshStandardMaterial side={THREE.DoubleSide}>
        <videoTexture attach="map" encoding={THREE.sRGBEncoding} args={[video]} />
        <videoTexture attach="emissiveMap" args={[video]} />
      </meshStandardMaterial>
    </mesh>
  </Suspense>
```

- useVideoTexture를 사용하니 모바일 화면에서도 비디오가 보임

```tsx
const texture = useVideoTexture('/video/pt1-01.mp4', {
    muted: true,
    loop: true,
    autoplay: true,
  });

return (
  <mesh position={[1, 1, 0]}>
    <planeGeometry args={[1.5, 1, 1]} />
    <meshBasicMaterial map={texture} />
  </mesh>
);
```

## 파티클을 펼쳤다가 모으기

```tsx
pos에 랜덤 값을 더해주면 파티클이 펼쳐짐. 값을 크게 줘야 넓게 펴진다
minusrandom값을 큰 수로 나눠서 0에 가까운 숫자로 만들어주면 원래 모양으로 되돌아감
스크롤 값을 minusRandom 값으로 보내주면 스크롤에 따라 반응하게 됌

// float minusRandom = 100.0;
// pos.x *= 1.0 + aRandom.x * 10.0 / minusRandom;
// pos.y *= 1.0 + aRandom.y * 10.0 / minusRandom;
// pos.z *= 1.0 + aRandom.z * 10.0 / minusRandom;
```

/*
  실험2

  scrolltrigger에 z축 mesh도 걸리는지 확인

*/

## ai code helper

- ctrl alt shift g 코드 생성
- ctrl alt shift r 리팩터링
- ctrl alt shift c 코드리뷰
- ctrl alt shift m 질문에 대한 답을 해줌

- 많이 쓰면 돈내야하니까 꼭 필요하거나 궁금한거 있을 때
