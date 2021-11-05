import React, { Suspense, useState, useEffect, useRef } from 'react';
import GlobalStyle from './styled/global.styled.jsx';
import { useMousePosition } from './utils/useMousePosition.jsx';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import GolfBall from './components/Three/GolfBall.jsx';
import { Canvas, useFrame } from '@react-three/fiber'
import { Container } from './styled/els.styled.jsx';
import { useTrail } from '@react-spring/web';
import useMeasure from 'react-use-measure';

RectAreaLightUniformsLib.init()

function App() {

    const position = useMousePosition();

    return (
        <>
            <GlobalStyle />
            <Container >
                <Canvas id="canvas">
                    <ambientLight />
                    <pointLight position={[-10, 500, 100]} />
                    {/* <hemisphereLight position={[0, 500, 0]} color={[.6,.75,.5]} intensity={1}/> */}
                    <directionalLight position={[-1, 0.75, 1]}/>
                    <Suspense fallback={null}>
                        <GolfBall />
                    </Suspense>
                </Canvas>
            </Container>
        </>
    )
}

export default App
