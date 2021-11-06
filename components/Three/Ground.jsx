import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import grass from '../../public/images/grass_green_d.jpg';
import grass_bump from '../../public/images/grass_green_n.jpg';

function Ground(props) {
    const group = useRef();
    const mesh = useRef();
    const measurements = el => {
        console.log(el);
    }
    const [ texture, bump ] = useLoader(THREE.TextureLoader, [grass, grass_bump]);
    const geom = new THREE.PlaneGeometry(5, 5);
    

    useEffect(() => {
        measurements(mesh.current);
    }, [mesh])

    return (
        <group ref={group}>
            <mesh position={props.position} ref={mesh} >
                
                <planeBufferGeometry 
                    args={[8, 8, 1024, 1024]}
                />
                <meshStandardMaterial 
                    attach="material" 
                    color="white" 
                    map={texture}
                    bumpMap={bump}
                    bump={.75}
                    bumpScale={.75}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}

export default Ground
