import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";
import * as THREE from "three";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#FFFFFF"),
    uColorEnd: new THREE.Color("#0123AA"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  console.log("nodes", nodes);

  const bakedTexture = useTexture("./model/baked.jpg");
  console.log("bakedTexture", bakedTexture);
  // bakedTexture.flipY = false;

  console.log("portalVertexShader", portalVertexShader);
  console.log("portalFragmentShader", portalFragmentShader);

  const portalMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });
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
          <portalMaterial ref={portalMaterial} />
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
