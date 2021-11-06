import React, { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
import GlobalStyle from './styled/global.styled.jsx';
import { AppContainer, Container } from './styled/els.styled.jsx';
import { Anim } from './components/Three/Anim.jsx';
import GolfBall from './components/Three/GolfBall.jsx';
import { useMousePosition } from './utils/useMousePosition.jsx';
import { useResize } from './utils/useResize.jsx';
extend({ OrbitControls });
RectAreaLightUniformsLib.init()

function AnimationCanvas() {
  return (
    <Canvas
      camera={{position: [0, 2, 10], fov: 75}}
    >
      <ambientLight />
      <GolfBall />
      <Anim />
    </Canvas>
  );
}

function App() {
  return (
    <AppContainer className="app">
      <GlobalStyle />
      <Container className="anim">
        <Suspense fallback={null}>
          <AnimationCanvas />
        </Suspense>
      </Container>
    </AppContainer>
  );
}


export default App
