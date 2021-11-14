import * as THREE from 'three';
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { extend, useLoader, useFrame } from '@react-three/fiber';
import _FONT from 'three/examples/fonts/gentilis_bold.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
extend({ TextGeometry })

function Text({position}) {
    const group = useRef()
    const mesh = useRef()
    let factor = .75;
    let speed = .75;
    const [start] = useState(() => Math.random() * 5000)
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useFrame((state, delta) => {
        mesh.current.position.x = Math.sin(start + state.clock.elapsedTime) * 15
        mesh.current.position.z = Math.sin(start + state.clock.elapsedTime) * 15
        mesh.current.rotation.x = Math.PI / 2 + (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 150
        mesh.current.rotation.y = (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 2
        group.current.rotation.y += Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5
        mixer.update(delta * speed)
      })
    const font = new FontLoader().parse(_FONT);
    const textOptions = {
        font,
        size: .5,
        height: .25,
    };
    return (
        <group ref={group}>
            <mesh ref={mesh} position={[0,0,0]} castShadow>
                <textGeometry attach='geometry' args={["developer", textOptions]} />
                <meshStandardMaterial attach='material' />
            </mesh>
        </group>
    )
}

export default Text
