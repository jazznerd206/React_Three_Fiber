import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import noise, { simplex3 } from '../../utils/noise.js';
import grass from '../../public/images/grass_green_d.jpg';
import grass_bump from '../../public/images/grass_green_n.jpg';

function MeshAnim({
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
}) {

    const [ texture, bump ] = useLoader(THREE.TextureLoader, [grass, grass_bump]);

    let t = init // time
    // previous = previous === undefined ? init : previous;

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
                indices.push(i, i + 1, i + width + 1) // bottom right tri
                indices.push(i + width + 1, i + width, i) // top left tri
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
            const positions = posRef.current.array, colors = colorRef.current.array
    
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
        >
            <bufferGeometry args={[64,64,1024,1024]}>
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
                side={THREE.DoubleSide}
                // map={texture}
                // bumpMap={bump}
                // bump={.75}
                // bumpScale={.75}
            />
        </mesh>
    );
}

export function Anim() {

    const seed = Math.floor(Math.random() * (2 ** 16))
    noise.seed(seed)

    const sampleNoise = (x, y, z) => {
        let scale = 1 / 8
        let octaves = 20
        let persistence = .4
        let lacunarity = 2

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
            r: z ** 2 / 32,
            g: z * Math.sqrt(z ** 2 + y * y) / 15,
            b: Math.sqrt(x ** 2 + y ** 2) / 75,
        }
    }
    return (
        <MeshAnim 
            position={[0, -2, -2]}
            rotation={[-Math.PI / 2, 0, 0]}
            grid={{
                width: 150,
                height: 150,
                dist: 0.2
            }}
            zOfXYT={zOfXYT}
            colorOfXYZT={colorOfXYZT}
            anim={{
                init: 0,
                update: (t) => t + 0.002
            }}
        />
    );
}