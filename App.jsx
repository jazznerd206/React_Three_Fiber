import React, { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import niceColors from 'nice-color-palettes'
import GlobalStyle from './styled/global.styled.jsx';
import { AppContainer, Container } from './styled/els.styled.jsx';
import Sky from './components/Three/Sky.jsx';
import GolfBall from './components/Three/GolfBall.jsx';
import { Anim } from './components/Three/Anim.jsx';
import { InstancedSpheres } from './components/Three/Ball.jsx';
import { Raycast } from './components/Three/Raycast.jsx';
import { Box } from './components/Three/Box.jsx';
import { Plane } from './components/Three/Plane.jsx';
import Text from './components/Three/Text.jsx';
import Center from './components/Three/Center.jsx';
import ShapeText from './components/Three/ShapeText.jsx';
RectAreaLightUniformsLib.init()


extend({ OrbitControls });
const CameraControls = () => {
  const controls = useRef();
  const { camera, gl: { domElement } } = useThree();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      minPolarAngle={0}
      maxPolarAngle={Math.PI * 0.5}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
    />
  );
};

function AnimationCanvas({canvas}) {
  const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
  const y = -10 + Math.random() * 20
  const z = -5 + Math.random() * 10
  const flag = Math.random();
  return (
    <Canvas
      camera={{position: [0, 18, 25]}}
      ref={canvas}
      shadows={true}
    >
      <CameraControls />
      <hemisphereLight intensity={.25} />
      <pointLight position={[-30, 10, -30]} intensity={.75}  castShadow />
      <pointLight position={[30, 10, -30]} intensity={.25}  castShadow/>
      <Physics  gravity={[0, 0, -500]}>
              <spotLight
                position={[0, 10, 25]}
                distance={100}
                angle={-.75}
                decay={0}
                penumbra={.1}
                intensity={1}
                color={niceColors[27][1]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                castShadow
                />
        <Center position={[0, 4,0]}/>
        <Plane color={niceColors[27][1]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        {/* <Plane color={niceColors[13][1]} position={[0, 10, -20]} rotation={[0, 0, 0]} /> */}
        {/* <Plane color={niceColors[13][3]} position={[-25, 10, 0]} rotation={[0,  Math.PI / 2, 0]} /> */}
        {/* <Plane color={niceColors[13][3]} position={[25, 10, 0]} rotation={[0,  -Math.PI / 2, 0]} /> */}
      </Physics>
    </Canvas>
  );
}

function App() {
  let canvas = useRef();
  return (
    <AppContainer className="app">
      <GlobalStyle />
      <Container className="anim">
        <Suspense fallback={null}>
          <AnimationCanvas canvas={canvas}/>
        </Suspense>
      </Container>
    </AppContainer>
  );
}


export default App
