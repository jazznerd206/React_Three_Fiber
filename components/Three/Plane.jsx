import React, { useMemo, useRef } from 'react';
import { usePlane } from '@react-three/cannon';
import noise, { simplex3 } from '../../utils/noise.js';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';


const MeshAnim = ({
  position,
  rotation,
  grid: {
    width, height, dist
  },
  colorOfXYZT,
  zOfXYT,
  anim: {
      init,
      previous,
      update
  }
}) => {

  const [ref] = usePlane((props) => ({ ...props }))
  let t = init // time
  // vertex buffer
  let { positions, colors, normals } = useMemo(() => {
    let positions = [], colors = [], normals = []

    for (let yi = 0; yi < height; yi++) {
        for (let xi = 0; xi < width; xi++) {
            let x = dist * (xi - (width - 1) / 2.)
            let y = dist * (yi - (height - 1) / 2.)
            let z = zOfXYT(x, y, t)
            positions.push(x, y, z)

            let color = colorOfXYZT(x, y, z, t)
            colors.push(color.r, color.g, color.b)
            normals.push(0, 0, 1)
        }
    }

    return {
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        normals: new Float32Array(normals)
    }
  }, [width, height, dist, zOfXYT, colorOfXYZT, t])


  // index buffer
  let indices = useMemo(() => {
      let indices = []
      let i = 0;
      for (let yi = 0; yi < height - 1; yi++) {
          for (let xi = 0; xi < width - 1; xi++) {
              indices.push(i, i + 1, i + width + 1)
              indices.push(i + width + 1, i + width, i)
              i++
          }
          i++
      }

      return new Uint16Array(indices)
  }, [width, height])

  // animation
  let posRef = useRef(), colorRef = useRef()
  useFrame(() => {
      t = update(t);
      previous = previous === undefined ? 0 : previous;
      if (t < previous) {
          t = update(t);
          return
      } else {
          const positions = posRef.current.array
          const colors = colorRef.current.array
  
          let i = 0
          for (let yi = 0; yi < height; yi++) {
              for (let xi = 0; xi < width; xi++) {
                  positions[i + 2] = zOfXYT(positions[i], positions[i + 1], t)
                  let c = colorOfXYZT(positions[i], positions[i + 1], positions[i + 2], t)
                  colors[i] = c.r
                  colors[i + 1] = c.g
                  colors[i + 2] = c.b
                  i += 3
              }
          }
          previous = t;
          posRef.current.needsUpdate = true;
          colorRef.current.needsUpdate = true;
      }
  })

  return (
    <mesh
        position={position}
        rotation={rotation}
        receiveShadow
    >
        <hemisphereLight intensity={.25} />
        <pointLight position={[-30, 0, -30]} intensity={0.5} />
        <bufferGeometry args={[32,32,64,64]}>
            <bufferAttribute
                ref={posRef}
                attachObject={['attributes', 'position']}
                array={positions}
                count={positions.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                ref={colorRef}
                attachObject={['attributes', 'color']}
                array={colors}
                count={colors.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                attachObject={['attributes', 'normal']}
                array={normals}
                count={normals.length / 3}
                itemSize={3}
            />
            <bufferAttribute
                attach="index"
                array={indices}
                count={indices.length}
            />
        </bufferGeometry>
        <meshStandardMaterial
            vertexColors
            wireframe={false}
            side={THREE.DoubleSide}
            attach="material"
        />
    </mesh>
);

}

export function Plane({ color, ...props }) {

    const seed = Math.floor(Math.random() * (2 ** 16))
    noise.seed(seed)

    const sampleNoise = (x, y, z) => {
        let scale = 1 / 16
        let octaves = 10
        let persistence = .8
        let lacunarity = 1

        let amp = 1
        let freq = 1

        let value = 0
        for (let i = 0; i < octaves; i++) {
            value += amp * simplex3(x * freq * scale, y * freq * scale, z)
            amp *= persistence
            freq *= lacunarity
        }

        return value
    }

    const zOfXYT = (x, y, t) => {
        return sampleNoise(x, y, t)
    }

    const colorOfXYZT = (x,y,z,t) => {
        return {
            r: z * Math.sqrt(x ** 2 + y ** 2) / 75,
            g: Math.sqrt(x ** 2 + y ** 2) / 50,
            b: Math.sqrt(x ** 2 + y ** 2) / 25,
        }
    }

    return (
      <MeshAnim 
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        grid={{
            width: 25,
            height: 25,
            dist: 10
        }}
        zOfXYT={zOfXYT}
        colorOfXYZT={colorOfXYZT}
        anim={{
            init: 0,
            update: (t) => t + 0.002
        }}
    />
    )
  }
  