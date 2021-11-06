import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three'
import { useBox } from '@react-three/cannon'

export function Box() {
    const boxSize = [4, 4, 4]
    const [ref, api] = useBox(() => ({ type: 'Kinematic', mass: 1, args: boxSize }))
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      api.position.set(Math.sin(t * 2) * 5, Math.cos(t * 2) * 5, 3)
      api.rotation.set(Math.sin(t * 6), Math.cos(t * 6), 0)
    })
    return (
      <mesh ref={ref} castShadow receiveShadow>
        <boxBufferGeometry args={boxSize} />
        <meshLambertMaterial color="white" />
      </mesh>
    )
  }