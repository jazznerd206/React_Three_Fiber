import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Color } from 'three';
import { useSphere } from '@react-three/cannon';
import niceColors from 'nice-color-palettes';
import golfBall from '../../public/images/golf_ball.jpeg';

export function InstancedSpheres({ number = 1000 }) {
    const [ texture ] = useLoader(THREE.TextureLoader, [golfBall]);
    const [ref] = useSphere((index) => ({
      args: [3],
      mass: 250,
      position: [Math.random() * 50, Math.random() * 50, Math.random() * index],
    }))
    const colors = useMemo(() => {
      const array = new Float32Array(number * 3)
      const color = new Color()
      for (let i = 0; i < number; i++)
        color
          .set(niceColors[22][Math.floor(Math.random() * 5)])
          .convertSRGBToLinear()
          .toArray(array, i * 3)
      return array
    }, [number])
  
    return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[undefined, undefined, number]}>
        <sphereBufferGeometry args={[3, 32, 32]}>
          <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colors, 3]} />
        </sphereBufferGeometry>
        <meshPhongMaterial map={texture}/>
      </instancedMesh>
    )
}