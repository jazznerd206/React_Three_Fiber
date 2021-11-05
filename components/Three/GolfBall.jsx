import React, { useRef } from 'react'
import ReactDOM from 'react-dom';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import golfBall from '../../public/images/golf_ball.jpeg'

function GolfBall(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    // load texture for mesh
    const [ texture ] = useLoader(THREE.TextureLoader, [golfBall])
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(({ clock }) => (mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z = Math.cos(clock.getElapsedTime() / 8) * Math.PI))
  
    return (
        <group ref={mesh}>
          {/* <rectAreaLight intensity={1} position={[10, 10, 10]} width={10} height={1000} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} />
          <rectAreaLight intensity={1} position={[-10, -10, -10]} width={1000} height={10} onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))} /> */}
          <mesh>
            <sphereBufferGeometry attach="geometry" args={[2, 64, 64]} />
            <meshStandardMaterial attach="material" map={texture} />
          </mesh>
        </group>
      )
  }

export default GolfBall;