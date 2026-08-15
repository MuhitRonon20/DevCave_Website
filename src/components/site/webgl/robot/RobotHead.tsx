import { forwardRef } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/** Rounded, beveled head with two cute metallic eyes and a soft violet visor glow. */
export const RobotHead = forwardRef<THREE.Group>(function RobotHead(_props, ref) {
  return (
    <group ref={ref} position={[0, 0.62, 0]}>
      {/* skull */}
      <RoundedBox args={[1.15, 0.92, 0.85]} radius={0.24} smoothness={5} castShadow>
        <meshStandardMaterial color="#15151a" metalness={0.75} roughness={0.32} />
      </RoundedBox>

      {/* face plate */}
      <RoundedBox
        args={[0.92, 0.62, 0.12]}
        radius={0.16}
        smoothness={5}
        position={[0, 0.02, 0.4]}
      >
        <meshStandardMaterial color="#0d0d11" metalness={0.6} roughness={0.22} />
      </RoundedBox>

      {/* eyes */}
      {[-0.22, 0.22].map((x) => (
        <group key={x} position={[x, 0.04, 0.47]}>
          <mesh>
            <sphereGeometry args={[0.115, 24, 24]} />
            <meshStandardMaterial
              color="#f4f5f8"
              metalness={0.9}
              roughness={0.12}
              emissive="#cfd6ff"
              emissiveIntensity={0.35}
            />
          </mesh>
          {/* highlight */}
          <mesh position={[0.035, 0.04, 0.075]}>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* violet accent rim on the crown */}
      <mesh position={[0, 0.47, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.028, 12, 40]} />
        <meshStandardMaterial
          color="#7c5cff"
          emissive="#7c5cff"
          emissiveIntensity={1.4}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* side ear caps */}
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.19, 0.19, 0.09, 24]} />
          <meshStandardMaterial color="#2a2a33" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
});
