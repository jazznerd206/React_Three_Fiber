import React, { useRef } from "react";
import * as THREE from 'three';
import { extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = ({reference}) => {
  
    const {
      camera,
      gl: { domElement }
    } = useThree();
  
    const controls = useRef();
    useFrame(() => controls.current.update());
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        autoRotate={true}
        enableZoom={false}
        // enableDamping
        // dampingFactor={0.2}
        rotateSpeed={0.5}
        minPolarAngle={-Math.PI / 3}
        maxPolarAngle={-Math.PI / 3}
      />
    );
};
  