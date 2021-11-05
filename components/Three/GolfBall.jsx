import React, { useState, useRef, useEffect } from 'react';
import { extend } from '@react-three/fiber';
import ReactDOM from 'react-dom';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import golfBall from '../../public/images/golf_ball.jpeg';
import { useSpring, animated } from '@react-spring/three';
import useMeasure from 'react-use-measure';

function GolfBall(props) {

    const mesh = useRef();
    const [ active, setActive ] = useState(true)
    const [ texture ] = useLoader(THREE.TextureLoader, [golfBall])

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
    const color = spring.to([0, 1], ['#6246ea', '#e45858'])


    
  
    return (            
        <animated.group 
            ref={mesh} 
            rotation-y={rotation} 
            scale-x={scale} 
            scale-z={scale} 
            onClick={() => setActive(Number(!active))}
            >
            <mesh>
                <sphereBufferGeometry attach="geometry" args={[1.25, 64, 64]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
            <mesh>
                <sphereBufferGeometry attach="geometry" args={[1.25, 64, 64]} />
                <meshStandardMaterial attach="material" map={texture} />
            </mesh>
        </animated.group>
      )
  }

export default GolfBall;


// {/* <rectAreaLight intensity={10} position={[10, 10, 10]} width={10} height={1000} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} />
// <rectAreaLight intensity={10} position={[-10, -10, -10]} width={1000} height={10} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} /> */}