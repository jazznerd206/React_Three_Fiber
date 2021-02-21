import { Box, Light, GroundPlane, BackDrop, FillLight, RimLight, KeyLight, Numbers } from './fiber';
import { Canvas } from 'react-three-fiber';

export default function Home() {


  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.01} />
        <spotLight position={[0, 1, 25]} angle={0.3} penumbra={.5} />
        <pointLight position={[0, 0, 0]} args={['white', 2, 10, 5]} />
        <Light brightness={75} color={"rgb(209,64,9,.25)"} />
        <Numbers />
        <Box position={[-3, 0, 0]} />
        <Box position={[3, 0, 0]} />
        <KeyLight brightness={25} color="#ffbdf4" />
        <FillLight brightness={10} color="#F9D71C" />
        <RimLight brightness={40} color="#FFE484" />
        <BackDrop />
        <GroundPlane />
      </Canvas>
    </div>
  )
}

