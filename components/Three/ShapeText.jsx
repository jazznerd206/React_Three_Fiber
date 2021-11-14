import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three'
import { Icosahedron, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from "@react-spring/three";

const textProps = {
  fontSize: 3.9,
  font: 'http://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'
}

function Title({ layers = undefined, ...props }) {
    const group = useRef()
    useEffect(() => {
      group.current.lookAt(0, 0, 0);
    }, [])
  
    return (
      <group {...props} ref={group}>
        <Text depthTest={false} material-toneMapped={false} {...textProps} layers={layers}>
          Andrew
        </Text>
      </group>
    )
  }

function TitleCopies({ layers }) {
    const vertices = useMemo(() => {
        const y = new THREE.IcosahedronGeometry(12)
        console.log('y :>> ', y);
        return y
      }, [])
    console.log('vertices :>> ', vertices);
    return (
      <group name="titleCopies">
        {vertices && vertices.map((vertex, i) => (
          <Title name={'titleCopy-' + i} position={vertex} layers={layers} />
        ))}
      </group>
    )
  }

function ShapeText() {

    const [ expand, setExpand ] = useState(false);
    const ico = useRef();
    const props = useSpring({
      scale: expand ? [1.2, 1.2, 1.2] : [.25, .25, .25]
    });
    useFrame(() => {
      if (expand === true) {
        // ico.current.rotation.y = ico.current.rotation.x = ico.current.rotation.z = 0;
      }
      else ico.current && (ico.current.rotation.y = ico.current.rotation.x = ico.current.rotation.z += 0.05 * Math.random() * (1) ** Math.PI)
    });
    return (
        <group name="sceneContainer">
          <pointLight position={[0, 0, 30]} intensity={0.5} castShadow/>
          <a.mesh
            onPointerDown={() => {
              setExpand(!expand);
            }}
            scale={props.scale}
            metallic
          >
            {expand ? null :<Icosahedron 
              args={[7]} 
              ref={ico} 
              castShadow
              >
              <meshPhongMaterial 
                attach="material"
                wireframe={expand ? true : false} 
                color={0x000000}
                transparent={.5}
                />
            </Icosahedron>}
            {expand ? <Title /> : null}
          </a.mesh>
        </group>
    )
}

export default ShapeText
