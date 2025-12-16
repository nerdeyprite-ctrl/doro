import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const Dororong = () => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture('/dororong.png');
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((state) => {
    if (groupRef.current) {
      // Bobbing animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      // Gentle rotation - auto rotate slightly if not controlled? 
      // Actually standard OrbitControls handling is fine, but we give it a bit of life.
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const uniforms = useMemo(() => ({
    map: { value: texture }
  }), [texture]);

  return (
    <group ref={groupRef} dispose={null}>
      {/* Custom Shader Material to remove white background */}
      <mesh position={[-0.35, 0, 0]}> {/* Adjusted center offset further left */}
        <planeGeometry args={[3, 3]} />
        <shaderMaterial
          transparent
          side={THREE.DoubleSide}
          uniforms={uniforms}
          vertexShader={`
             varying vec2 vUv;
             void main() {
               vUv = uv;
               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
             }
           `}
          fragmentShader={`
             uniform sampler2D map;
             varying vec2 vUv;
             void main() {
               vec4 color = texture2D(map, vUv);
               // Simple white keying: if R,G,B are all > 0.9, make transparent
               if (color.r > 0.9 && color.g > 0.9 && color.b > 0.9) {
                 discard;
               }
               gl_FragColor = color;
             }
           `}
        />
      </mesh>
    </group>
  );
};
