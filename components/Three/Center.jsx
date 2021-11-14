import * as THREE from 'three';
import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { extend, useLoader, useFrame } from '@react-three/fiber';
import _FONT from 'three/examples/fonts/gentilis_regular.typeface.json';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Text } from '@react-three/drei';
import { useSpring } from '@react-three/cannon';
extend({ TextGeometry })


function CreateText() {

    const textRef = useRef();
    const letterRefs = [];
    const _TEXT = 'Andrew Miller';


    useEffect(() => {
        console.log('letterRefs :>> ', letterRefs);
    }, [])

    const growLetter = (letter) => {
        if (letter.current) {
            // letter.current.scale = letter.current.scale === 1 ? 2 : 1; 
            useSpring({scale: letter.current.scale === [.25, .25, .25] ? [1.2, 1.2, 1.2] : [.25, .25, .25] })
        }
    }
    // letterRefs.forEach(letter => {
    //     if (letter.current) {
    //         // letter.current.scale = letter.current.scale === 1 ? 2 : 1; 
    //         useSpring({scale: letter.current.scale === [.25, .25, .25] ? [1.2, 1.2, 1.2] : [.25, .25, .25] })
    //     }
    // })
    useFrame(() => {
        letterRefs.forEach((letter, index) => {
            let rand = Math.random() * .15;
            letter.current && (
                letter.current.rotation.x = letter.current.rotation.z += rand
            )
        })
    });

    return (
        <group 
            ref={textRef}
            position={[0,0,0]}
        >
            {_TEXT.split('').map((letter, index) => {
                const letterRef= useRef()
                letterRefs.push(letterRef)
                return (
                    <Text
                        key={letter + '_' + index}
                        castShadow
                        ref={letterRef}
                        fontSize={3}
                        position={[-10 + index / .55 , 5, 0]}
                        color={0x0000000}
                        onPointerEnter={(e) => growLetter(letterRef)}
                        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    >
                        {letter}
                    </Text>
                )
            })}
        </group>
    )
}

function Center({position}) {
    const group = useRef()
    return (
        <group ref={group}>
            <CreateText />
        </group>
    )
}

export default Center
