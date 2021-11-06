import React, { Suspense, useState, useEffect, useRef } from 'react';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { Physics } from '@react-three/cannon'
import GlobalStyle from './styled/global.styled.jsx';
import { AppContainer, Container } from './styled/els.styled.jsx';
import Sky from './components/Three/Sky.jsx';
import GolfBall from './components/Three/GolfBall.jsx';
import { Anim } from './components/Three/Anim.jsx';
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
      // maxAzimuthAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

function AnimationCanvas({canvas}) {
  return (
    <Canvas
      camera={{position: [0, 10, 50], fov: 75}}
      ref={canvas}
    >
      <CameraControls />
      <ambientLight />
      <Physics gravity={[0, -2, 0]}>
      <Sky />
        <GolfBall />
        <Anim />
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
