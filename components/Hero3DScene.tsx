'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function usePrefersReducedMotion() {
  // Inicializador síncrono: já nasce com o valor certo (componente é client-only
  // via dynamic ssr:false), garantindo o frameloop correto no primeiro render.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* Ondas via shader na GPU — plano enorme (a borda nunca entra na viewport, em
   qualquer largura de tela). Deslocamento por camadas de senos (vento/água).
   As frequências são em unidades de mundo, então a parte visível mantém a
   mesma escala de onda independente do tamanho do plano. */
const vertexShader = `
  uniform float uTime;
  varying float vEle;
  void main() {
    vec3 p = position;
    float e = 0.0;
    e += sin(p.x * 0.5 + uTime * 0.5) * 0.62;
    e += sin(p.y * 0.8 - uTime * 0.42) * 0.40;
    e += sin((p.x * 0.38 + p.y * 0.55) + uTime * 0.28) * 0.34;
    p.z += e;
    vEle = e;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uLow;
  uniform vec3 uHigh;
  uniform float uOpacity;
  varying float vEle;
  void main() {
    float t = clamp((vEle + 1.0) / 2.0, 0.0, 1.0);
    vec3 col = mix(uLow, uHigh, t);
    gl_FragColor = vec4(col, uOpacity);
  }
`;

function Waves({ animate }: { animate: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const invalidate = useThree((s) => s.invalidate);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLow: { value: new THREE.Color('#7A5E33') },
      uHigh: { value: new THREE.Color('#E6CFA8') },
      uOpacity: { value: 0.5 },
    }),
    []
  );

  // Caso estático (motion reduzido): garante um render após o deslocamento.
  useEffect(() => {
    if (!animate) invalidate();
  }, [animate, invalidate]);

  useFrame((_, delta) => {
    if (!animate || !matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-1.12, 0, 0.16]} position={[0.4, -0.2, 0]}>
      <planeGeometry args={[64, 48, 220, 160]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/** Brilho difuso atrás das ondas — dá "respiro" e profundidade champanhe. */
function Glow() {
  return (
    <mesh position={[1, 0.6, -4]}>
      <circleGeometry args={[6, 48]} />
      <meshBasicMaterial color="#D4B896" transparent opacity={0.06} />
    </mesh>
  );
}

export default function Hero3DScene() {
  const dpr = useMemo<[number, number]>(() => [1, 1.5], []);
  const reduced = usePrefersReducedMotion();
  const animate = !reduced;

  return (
    <Canvas
      dpr={dpr}
      frameloop={animate ? 'always' : 'demand'}
      camera={{ position: [0, 1.4, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      onCreated={() => {
        // Garante a medição inicial do container em ambientes que não disparam
        // o ResizeObserver na montagem (evita canvas no default 300×150).
        [0, 120, 360].forEach((t) =>
          setTimeout(() => window.dispatchEvent(new Event('resize')), t)
        );
      }}
    >
      <Suspense fallback={null}>
        <Glow />
        <Waves animate={animate} />
      </Suspense>
    </Canvas>
  );
}
