import { useRef, useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from '../node_modules/three';

export function Numbers() {
    const numbers = useRef();
    let x = window.innerWidth * .25;
    let y = window.innerHeight * .5;
    
    return(
        <mesh>

        </mesh>
    )
}

export function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y -= 0.05;
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1, 1, 1] : [.5, .5, .5]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[3, 3, 3]} />
      <meshStandardMaterial
        roughness={.5}
        metalness={1.5}
        color={hovered ? 'slateblue' : 'green'} />
    </mesh>
  )
}

export function Light({ brightness, color }) {

    const convertToScale = (oldY, mouseX, mouseY, lightZ) => {
        // console.log(mouseX, mouseY);
        let upperWidthBound, upperHeightBound, newX, newY, newZ, newPosition;
        upperWidthBound = window.innerWidth;
        upperHeightBound = window.innerHeight;
        newX = mouseX / upperWidthBound * 100;
        newY = mouseY / upperHeightBound * 100;
        newZ = lightZ;
        oldY < mouseY ? newZ += .05 : newZ -= .05;
        // console.log(newPosition)
        newPosition = [newX, newY, newZ];
        return newPosition
    }

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect( () => {
        const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", setFromEvent);
        let l = light.current.position;
        console.log('light.current.position ', l);
        console.log('convert to scale ', convertToScale(l.y, position.x, position.y, l.z));
        let newLightPosition = convertToScale(l.y, position.x, position.y, l.z)
        l.set(...newLightPosition);
        
        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, [position])

    const light = useRef();
    return (
      <rectAreaLight
        ref={light}
        width={3}
        height={3}
        color={color}
        intensity={brightness}
        position={[7, 7, 7]}
        lookAt={[10, 0, 10]}
        penumbra={1}
        castShadow
      />
    );
  }


// Geometry
export function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, -7]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="radial-gradient(rgb(255,255,255.25), silver)" />
      </mesh>
    );
  }
export  function BackDrop() {
    return (
      <mesh receiveShadow position={[0, -5, -5]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="radial-gradient(silver, rgb(255,255,255.25))" />
      </mesh>
    );
  }

export function FillLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        intensity={brightness}
        color={color}
        position={[2, 1, 4]}
        lookAt={[0, 0, 0]}
        penumbra={2}
        castShadow
      />
    );
}

export function RimLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={2}
        height={2}
        intensity={brightness}
        color={color}
        position={[1, 4, -2]}
        rotation={[0, 180, 0]}
        castShadow
      />
    );
}

export function KeyLight({ brightness, color }) {
    return (
      <rectAreaLight
        width={3}
        height={3}
        color={color}
        intensity={brightness}
        position={[-2, 0, 5]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
    );
}