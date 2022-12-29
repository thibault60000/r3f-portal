import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
} from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  console.log("nodes", nodes);

  const bakedTexture = useTexture("./model/baked.jpg");
  console.log("bakedTexture", bakedTexture);
  // bakedTexture.flipY = false;

  return (
    <>
      <OrbitControls makeDefault />

      <color args={["#201919"]} attach='background' />
      <Center>
        {/* Model */}
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>
        {/* Pole Light A */}
        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color='#FFFFE5' />
        </mesh>
        {/* Pole Light B */}
        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color='#FFFFE5' />
        </mesh>
        {/* Portal */}
        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <meshBasicMaterial color='#FFFFE5' />
        </mesh>

        {/* Sparkles */}
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          count={40}
          speed={0.2}
        />
      </Center>
    </>
  );
}
