// @ts-nocheck

import { shaderMaterial, useGLTF } from '@react-three/drei';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import vertexShader from './vertex';
import fragmentShader from './fragment';
import { useRef, useState } from 'react';
import gsap from 'gsap';

type ParticleEffectType = {
  position: [number, number, number];
  color1: THREE.Color;
  color2: THREE.Color;
  model: string;
  rotation?: [number, number, number];
};

const ParticleMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uScale: 0.0,
    uOpacity: 0.0,
    uSize: 50.0 * devicePixelRatio,
    uColor1: new THREE.Color('#ff00c3'),
    uColor2: new THREE.Color('#fbcb09'),
    transparent: true,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
  },
  vertexShader,
  fragmentShader
);

extend({ ParticleMaterial });

const Particle = ({
  color1,
  color2,
  model,
  position,
  rotation = [0, 0, 0],
}: ParticleEffectType) => {
  const particleGeometry = useRef<any>();
  const particleMaterial = useRef<any>();
  const [particleEffectInit, setParticleEffectInit] = useState(true);
  const { scene } = useGLTF(`./model/${model}.glb`);
  const mesh = scene.children[0] as any;
  const sampler = new MeshSurfaceSampler(mesh).build();
  const numParticles = 10000;
  const particlesPosition = new Float32Array(numParticles * 3);
  const particlesRandomness = new Float32Array(numParticles * 3);

  for (let i = 0; i < numParticles; i++) {
    const newPosition = new THREE.Vector3();
    sampler.sample(newPosition);
    particlesPosition.set([newPosition.x, newPosition.y, newPosition.z], i * 3);
    particlesRandomness.set(
      [Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3],
      i * 3
    );
  }

  useFrame(state => {
    const et = state.clock.elapsedTime;
    particleMaterial.current.uTime = et;

    if (particleMaterial.current && particleGeometry.current && particleEffectInit) {
      setParticleEffectInit(false);
      particleMaterial.current.uOpacity = 1.0;
      particleMaterial.current.uColor1 = color1;
      particleMaterial.current.uColor2 = color2;

      gsap.to(particleMaterial.current, {
        uScale: 1.0,
        duration: 1,
        ease: 'power3.out',
      });

      const [rX, rY] = rotation;
      gsap.fromTo(
        particleGeometry.current.rotation,
        {
          y: Math.PI * 1,
        },
        {
          x: rX,
          y: rY,
          duration: 2,
          ease: 'power3.out',
        }
      );
    }
  });

  return (
    <>
      <points position={position} ref={particleGeometry}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={numParticles}
            array={particlesPosition}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            count={numParticles}
            array={particlesRandomness}
            itemSize={3}
          />
        </bufferGeometry>
        <particleMaterial ref={particleMaterial} />
      </points>
    </>
  );
};

export default Particle;
