import React, { Suspense, useState, useEffect } from 'react';
import Box from './components/Three/Box.jsx';
import GolfBall from './components/Three/GolfBall.jsx';
import { Canvas, useFrame } from '@react-three/fiber'

function App() {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <GolfBall position={[-1.2, 0, 0]} />
            </Suspense>
        </Canvas>
    )
}

export default App
