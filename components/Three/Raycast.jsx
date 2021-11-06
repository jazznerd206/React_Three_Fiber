import React, { useState, useMemo } from 'react';
import { BufferGeometry, Line as ThreeLine, Vector3 } from 'three';
import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRaycastAll } from '@react-three/cannon';
extend({ ThreeLine })

function Ray(from, to, setHit) {
    useRaycastAll({ from, to }, setHit);
    const geometry = useMemo(() => {
        const points = [from.from, from.to].map((v) => {
            return new Vector3(...v);
        })
        let nbg = new BufferGeometry().setFromPoints(points);
        console.log('nbg :>> ', nbg);
        return nbg;
    }, [from, to])
  
    return (
      <threeLine geometry={geometry}>
        <lineBasicMaterial color="black" />
      </threeLine>
    )
  }
  
function Text({hit}) {
    return (
      <Html center style={{ pointerEvents: 'none' }}>
        <pre>hit</pre>
      </Html>
    )
  }
  
export function Raycast() {
    const [hit, setHit] = useState({})
  
    return (
      <>
        <Ray from={[0, 0, 0]} to={[0, 1.5, 0]} setHit={setHit} />
        <Text hit={hit} />
      </>
    )
  }