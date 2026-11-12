import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#3ddc84";

/** Shared, normalized pointer position (-1..1), updated from the window. */
const pointer = { x: 0, y: 0 };
if (typeof window !== "undefined") {
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  });
}

/** Faceted "gem" + orbiting blocks that react to the cursor. */
const Gem = () => {
  const group = useRef<THREE.Group>(null);
  const blocks = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      // ease toward the pointer for a parallax tilt
      group.current.rotation.x += (pointer.y * 0.35 - group.current.rotation.x) * 0.05;
      group.current.rotation.z += (-pointer.x * 0.2 - group.current.rotation.z) * 0.05;
    }
    if (blocks.current) blocks.current.rotation.y -= delta * 0.5;
  });

  const blockPositions: [number, number, number][] = [
    [2.2, 0.4, 0],
    [-2.1, -0.3, 0.6],
    [0.2, 2.2, -0.4],
    [-0.4, -2.2, 0.3],
  ];

  return (
    <group ref={group}>
      {/* solid faceted gem */}
      <Icosahedron args={[1.45, 0]}>
        <meshStandardMaterial
          color={ACCENT}
          metalness={0.5}
          roughness={0.15}
          flatShading
          emissive={ACCENT}
          emissiveIntensity={0.12}
        />
      </Icosahedron>
      {/* wireframe shell */}
      <Icosahedron args={[1.5, 0]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
      </Icosahedron>

      {/* orbiting blocks (blockchain) */}
      <group ref={blocks}>
        {blockPositions.map((p, i) => (
          <mesh key={i} position={p} rotation={[i, i * 0.5, 0]}>
            <boxGeometry args={[0.32, 0.32, 0.32]} />
            <meshStandardMaterial color={ACCENT} metalness={0.4} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <pointLight position={[-5, -3, 2]} intensity={1.2} color={ACCENT} />
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
        <Gem />
      </Float>
      <Sparkles count={40} scale={7} size={2.4} speed={0.3} color={ACCENT} opacity={0.5} />
    </Canvas>
  );
}
