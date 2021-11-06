import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';

export function Plane({ color, ...props }) {
    console.log('color => ', color)
    const [ref] = usePlane(() => ({ ...props }))
    return (
      <mesh ref={ref} receiveShadow >
        <planeBufferGeometry args={[250, 250]} />
        <meshPhongMaterial color={color} />
      </mesh>
    )
  }
  