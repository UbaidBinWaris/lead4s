"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Particle mesh ─────────────────────────────────────────── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { size } = useThree();

  // Build geometry once — fibonacci sphere distribution for uniform spread
  const geometry = useMemo(() => {
    const count = size.width < 768 ? 1500 : 3000;

    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const blue   = new THREE.Color("#3b82f6");
    const orange = new THREE.Color("#f97316");
    const yellow = new THREE.Color("#f59e0b");
    const slate  = new THREE.Color("#64748b");

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere — gives very even coverage
      const phi   = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r     = 3.2 + (Math.random() - 0.5) * 1.8;

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Colour distribution: 60% blue, 20% orange, 10% yellow, 10% slate
      const rnd = Math.random();
      const col = rnd < 0.6 ? blue : rnd < 0.8 ? orange : rnd < 0.9 ? yellow : slate;
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [size.width]);

  // Dispose on unmount to prevent memory leaks
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.038;
    pointsRef.current.rotation.x = Math.sin(t * 0.018) * 0.12;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.88}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Canvas wrapper ────────────────────────────────────────── */
export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <Particles />
    </Canvas>
  );
}
