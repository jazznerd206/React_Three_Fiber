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
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function AnimationCanvas({canvas}) {
  const flag = Math.random();
  return (
    <Canvas
      camera={{position: [0, -50, 50], fov: 75}}
      ref={canvas}
    >
      <CameraControls />
      <hemisphereLight intensity={1} color={new THREE.Color('rgb(249,215,28,.5)')} />
      <pointLight position={[-30, 0, -30]} intensity={0.5} />
      {/* <spotLight
        position={[30, 0, 30]}
        angle={0.7}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      /> */}
      <Physics  gravity={[0, 0, -500]}>
        <Plane color={niceColors[21][4]} />
        <Plane color={niceColors[21][1]} position={[-100, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Plane color={niceColors[21][2]} position={[100, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Plane color={niceColors[21][3]} position={[0, 100, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <Plane color={niceColors[21][0]} position={[0, -100, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <InstancedSpheres number={100} />
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
