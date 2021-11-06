import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import golfBall from '../../public/images/golf_ball.jpeg';
import { useSpring, animated } from '@react-spring/three';

function GolfBall(props) {

    const mesh = useRef();
    const [ active, setActive ] = useState(false);
    const [ texture ] = useLoader(THREE.TextureLoader, [golfBall]);

    /**
     * ROTATE ANIMATION
     */
    useFrame(({ clock }) => (mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z = Math.cos(clock.getElapsedTime() / 8) * Math.PI))

    
    /**
     * SCALE ANIMATION ON CLICK
     */
    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.01 },
      })
    const scale = spring.to([0, 1], [1, 2])
    const rotation = spring.to([0, 1], [0, Math.PI])
    const color = spring.to([0, 1], ['#6246ea', '#e45858']);

    function Dolly() {
        useFrame((state) => {
          state.camera.position.z = 50 + Math.sin(state.clock.getElapsedTime()) * 30
          state.camera.updateProjectionMatrix()
        })
        return null
    }
    
  
    return (            
        <animated.group 
            ref={mesh} 
            rotation-y={rotation} 
            scale-x={scale} 
            scale-z={scale} 
            onClick={() => setActive(Number(!active))}
            >
            {/* <pointLight position={[-10, 500, 100]} /> */}
            <mesh>
                <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
                <meshStandardMaterial attach="material" map={texture}/>
            </mesh>
            {/* <Dolly /> */}
        </animated.group>
      )
  }

export default GolfBall;