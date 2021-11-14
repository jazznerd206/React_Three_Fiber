import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box as BoxBuff } from '@react-three/drei';
import * as THREE from "three";

let boxGeometry = new THREE.BoxGeometry(500,500,500,16,16,16);
boxGeometry.deleteAttribute( 'normal' );
boxGeometry.deleteAttribute( 'uv' );
// console.log('boxGeometry :>> ', boxGeometry);

export function Box({boxGeometry}) {
  return (
    <BoxBuff
      args={[50,50,50,16,16,16]}
    >
      <meshBasicMaterial geometry={boxGeometry} attach="material" color="black" wireframe/>
    </BoxBuff>
  );
}