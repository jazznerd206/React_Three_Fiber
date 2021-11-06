import React, { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import GlobalStyle from './styled/global.styled.jsx';
import { useMousePosition } from './utils/useMousePosition.jsx';
import { useResize } from './utils/useResize.jsx';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { Canvas, useFrame } from '@react-three/fiber';
import { Anim } from './components/Three/Anim.jsx';
import { AppContainer, Container } from './styled/els.styled.jsx';
import { extend, useLoader } from '@react-three/fiber';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });
RectAreaLightUniformsLib.init()

function AnimationCanvas() {
  return (
    <Canvas
      camera={{position: [0, 2, 10], fov: 75}}
    >
      <ambientLight />
      <Anim />
    </Canvas>
  );
}

function App() {
  return (
    <AppContainer className="app">
      <Container className="anim">
        <Suspense fallback={null}>
          <AnimationCanvas />
        </Suspense>
      </Container>
    </AppContainer>
  );
}


export default App
