import React, { useState, useEffect, useRef } from 'react';
import * as THREE from "three";
import { Icosahedron, shaderMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { useSpring, a } from "@react-spring/three";
import glsl from 'babel-plugin-glsl/macro';

function Ico() {
    const shader = useRef();
    const WaveShaderMaterial = shaderMaterial(
        // Uniform
        {
          uTime: 0,
          uColor: new THREE.Color(0.0, 0.0, 0.0),
          uTexture: new THREE.Texture()
        },
        // Vertex Shader
        glsl`
          precision mediump float;
       
          varying vec2 vUv;
          varying float vWave;
      
          uniform float uTime;
      
          #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);
      
          void main() {
            vUv = uv;
      
            vec3 pos = position;
            float noiseFreq = 2.0;
            float noiseAmp = 0.4;
            vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
            pos.z += snoise3(noisePos) * noiseAmp;
            vWave = pos.z;
      
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
          }
        `,
        // Fragment Shader
        glsl`
          precision mediump float;
      
          uniform vec3 uColor;
          uniform float uTime;
          uniform sampler2D uTexture;
      
          varying vec2 vUv;
          varying float vWave;
      
          void main() {
            float wave = vWave * 0.2;
            vec3 texture = texture2D(uTexture, vUv + wave).rgb;
            gl_FragColor = vec4(texture, 1.0); 
          }
        `
    );
    extend({ WaveShaderMaterial });
    useFrame(({ clock }) => (shader.current.uTime = clock.getElapsedTime()));
    const ico = useRef()
    return (
        <group name="sceneContainer">
          <pointLight position={[0, 0, 30]} intensity={0.5} castShadow/>
          <a.mesh
            metallic
          >
            <Icosahedron 
              args={[7]} 
              ref={ico} 
              castShadow
              >
                <waveShaderMaterial uColor={"hotpink"} ref={shader} />
                <meshPhongMaterial 
                    attach="material"
                    wireframe={true} 
                    color={0x000000}
                    transparent={.5}
                />
            </Icosahedron>
          </a.mesh>
        </group>
    )
}

export default Ico;
