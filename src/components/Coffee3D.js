'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Bean({ mouse, isMobile }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.rotation.y += 0.004;
    mesh.current.rotation.x = Math.sin(t * 0.25) * 0.06;
    mesh.current.position.y = Math.sin(t * 0.55) * 0.18;
    if (!isMobile && mouse.current) {
      mesh.current.rotation.x += (mouse.current.y * 0.25 - mesh.current.rotation.x) * 0.04;
      mesh.current.rotation.z += (-mouse.current.x * 0.15 - mesh.current.rotation.z) * 0.04;
    }
  });

  return (
    <mesh ref={mesh} castShadow scale={isMobile ? 0.75 : 1}>
      {/* Elongated bean shape */}
      <sphereGeometry args={[0.72, 48, 48]} />
      <meshPhysicalMaterial
        color="#5C3420"
        roughness={0.55}
        metalness={0.08}
        clearcoat={0.5}
        clearcoatRoughness={0.3}
        envMapIntensity={0.6}
      />
    </mesh>
  );
}

export default function Coffee3D() {
  const mouse  = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]}  intensity={1.4} color="#D6A15F" />
        <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#C88A4A" />
        <pointLight       position={[0, 3, 2]}   intensity={0.5} color="#E8C48A" />
        <Bean mouse={mouse} isMobile={isMobile} />
      </Canvas>
      {/* Warm glow under bean */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 60%, rgba(200,138,74,0.1) 0%, transparent 65%)',
      }} />
    </div>
  );
}
