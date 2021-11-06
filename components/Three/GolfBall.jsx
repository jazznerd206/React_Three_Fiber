import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon'
import golfBall from '../../public/images/golf_ball.jpeg';

function GolfBall(props) {

    const mesh = useRef();
    const [ball] = useSphere(() => ({ type: 'Static', args: [props.radius], mass: 1, position: [0, 25, 0], ...props }))
    const [ texture ] = useLoader(THREE.TextureLoader, [golfBall]);

    /**
     * ROTATE ANIMATION
     */
    useFrame(({ clock }) => {(
      // api.position.set(0, 1.5, Math.sin(clock.getElapsedTime() / 3) * 2),
      mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z = Math.cos(clock.getElapsedTime() / 8) * Math.PI)
    })
    
  
    return (            
        <group ref={mesh} >
            {/* <pointLight position={[-10, 500, 100]} /> */}
            <mesh 
              ref={ball}
              castShadow={true}
            >
                <sphereBufferGeometry attach="geometry" args={[props.radius, 64, 64]} />
                <meshStandardMaterial attach="material" map={texture}/>
            </mesh>
            {/* <Dolly /> */}
        </group>
      )
  }

export default GolfBall;