import Fiber from './fiber';
import { Canvas } from 'react-three-fiber';

export default function Home() {
  return (
    <div className="">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Fiber position={[-1.2, 0, 0]} />
        <Fiber position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}
