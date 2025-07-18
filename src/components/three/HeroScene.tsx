"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
  useGLTF,
  Preload,
} from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

interface FloatingCoinProps {
  position: [number, number, number];
  delay?: number;
  size?: number;
  color?: string;
  modelPath?: string;
  symbol?: string;
}

function CoinModel({
  modelPath,
  scale = 1,
  rotation = [0, 0, 0],
}: {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(modelPath);

  return (
    <group scale={scale} rotation={rotation}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function FloatingCoin({
  position,
  delay = 0,
  size = 1,
  color = "#8B5CF6",
  modelPath,
  symbol,
}: FloatingCoinProps) {
  // Always use the 3D model - no fallbacks
  if (!modelPath) return null;

  return (
    <Float
      speed={1 + delay * 0.2}
      rotationIntensity={1.5}
      floatIntensity={3}
      floatingRange={[-1, 1]}
      position={position}
    >
      <CoinModel modelPath={modelPath} scale={size} />
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      pointsRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation={false}
      />
    </points>
  );
}

function CentralOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      orbRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (materialRef.current) {
      materialRef.current.distort =
        Math.sin(state.clock.elapsedTime) * 0.1 + 0.2;
    }
  });

  return (
    <Sphere ref={orbRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#8B5CF6"
        attach="material"
        distort={0.2}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

export function HeroScene() {
  const coins = useMemo(
    () => [
      {
        position: [-4, 2, -2] as [number, number, number],
        delay: 0,
        color: "#F7931A", // Bitcoin orange
        size: 1.0,
        symbol: "BTC",
        modelPath: "/models/bitcoin.glb",
      },
      {
        position: [4, -1, -1] as [number, number, number],
        delay: 1,
        color: "#627EEA", // Ethereum blue
        size: 1.2,
        symbol: "ETH",
        modelPath: "/models/ethereum.glb",
      },
      {
        position: [-2, -3, 1] as [number, number, number],
        delay: 2,
        color: "#C3A634", // Dogecoin yellow
        size: 0.9,
        symbol: "DOGE",
        modelPath: "/models/dogecoin.glb",
      },
      {
        position: [3, 3, 2] as [number, number, number],
        delay: 3,
        color: "#345D9D", // Litecoin blue-gray
        size: 1.1,
        symbol: "LTC",
        modelPath: "/models/litecoin.glb",
      },
    ],
    []
  );

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#8B5CF6"
        />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#06B6D4" />

        <ParticleField />
        <CentralOrb />

        {coins.map((coin, index) => (
          <FloatingCoin
            key={index}
            position={coin.position}
            delay={coin.delay}
            color={coin.color}
            size={coin.size}
            modelPath={coin.modelPath}
            symbol={coin.symbol}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Preload all />
      </Canvas>
    </div>
  );
}
