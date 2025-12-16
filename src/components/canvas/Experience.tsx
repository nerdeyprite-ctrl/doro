import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Dororong } from './Dororong';
import * as THREE from 'three';
import { useState, useEffect } from 'react';

export const Experience = () => {
    const [panEnabled, setPanEnabled] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') setPanEnabled(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') setPanEnabled(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <>
            <OrbitControls
                makeDefault
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 1.5}
                enableZoom={true}
                zoomSpeed={1.2}
                enablePan={true}
                screenSpacePanning={true}
                mouseButtons={{
                    LEFT: panEnabled ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: THREE.MOUSE.ROTATE
                }}
            />

            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

            <group position={[0, 0, 0]}>
                <Dororong />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#555" />
            </group>

            <Environment preset="city" />
        </>
    );
};
