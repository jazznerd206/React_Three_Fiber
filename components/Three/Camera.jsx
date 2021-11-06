import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function Camera(props) {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect(() => void set({ camera: ref.current }), []);
    useFrame(() => ref.current.updateMatrixWorld());
    return (

        <perspectiveCamera 
                // args={[1000, window.innerWidth / window.innerHeight, 1, 1000]} 
                ref={ref} 
                {...props}
        />

    );
}

export default Camera
