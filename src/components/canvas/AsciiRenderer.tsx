import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

export const AsciiRenderer = ({
    characters = ' .:-+*=%@#',
    resolution = 0.2, // Slightly adjusted for better density
    invert = true
}) => {
    const { gl, scene, camera, size } = useThree();

    const effect = useMemo(() => {
        const effect = new AsciiEffect(gl, characters, { invert: invert, resolution: resolution });
        effect.domElement.style.position = 'absolute';
        // Overscan 130% and center
        effect.domElement.style.top = '-15%';
        effect.domElement.style.left = '-15%';
        effect.domElement.style.width = '130%';
        effect.domElement.style.height = '130%';
        effect.domElement.style.pointerEvents = 'none';
        effect.domElement.style.background = 'transparent';

        // Key change: Use a strong, standard monospace font in BLACK
        effect.domElement.style.color = 'black';
        effect.domElement.style.fontFamily = 'monospace, "Courier New", Courier';
        effect.domElement.style.fontWeight = 'bold';
        effect.domElement.style.fontSize = '11pt'; // Updated font size
        effect.domElement.style.whiteSpace = 'pre'; // Ensure formatting stays put
        effect.domElement.style.overflow = 'hidden'; // Hide any spill

        return effect;
    }, [gl, characters, resolution, invert]);

    // Force black color always
    useEffect(() => {
        effect.domElement.style.color = 'black';
    }, [effect]);

    useLayoutEffect(() => {
        // Generate characters for the larger area
        effect.setSize(size.width * 1.3, size.height * 1.3);
    }, [effect, size]);

    useFrame((_) => {
        // Render the scene via the effect
        effect.render(scene, camera);
    }, 1); // Render priority 1 (after default?)

    // When this component is mounted, we want to hide the original canvas?
    // R3F renders to the canvas. AsciiEffect renders to a separate <div>/<table>.
    // We need to append the effect domElement to the parent container.

    useEffect(() => {
        gl.domElement.style.opacity = '0'; // Hide original canvas
        gl.domElement.parentElement?.appendChild(effect.domElement);

        return () => {
            gl.domElement.style.opacity = '1'; // Show original canvas
            gl.domElement.parentElement?.removeChild(effect.domElement);
        }
    }, [effect, gl]);

    return null;
};
