import React, { useRef } from 'react';
import EarthDayMap from "../../Assets/8k_earth_daymap.jpg";
import EarthClouds from "../../Assets/8k_earth_clouds.jpg";
import EarthNightMap from "../../Assets/8k_earth_nightmap.jpg";
import EarthNormalMap from "../../Assets/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../Assets/8k_earth_specular_map.jpg";
import { TextureLoader } from 'three';
import {useLoader } from '@react-three/fiber';
import { OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import { Canvas,useFrame} from "@react-three/fiber";
export default function () {

  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthClouds]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
  });

  return (
    <>
       <ambientLight intensity={1}/>
              <mesh ref={cloudsRef} >
                  <sphereGeometry args={[2.8001, 32, 32]} />
                  <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                  />
                </mesh>
                <mesh ref={earthRef}>
                  <sphereGeometry args={[2.8,32, 32]}/>
                  <meshPhongMaterial specularMap={specularMap}/>
                  <meshStandardMaterial
                     map={colorMap}
                     normalMap={normalMap}
                     metalness={0.4}
                     roughness={0.7}
                   />
                   <OrbitControls
                      enableZoom={true}
                      enablePan={true}
                      enableRotate={true}
                      zoomSpeed={0.6}
                      panSpeed={0.5}
                      rotateSpeed={0.4}
                    />
                </mesh>
    </>
  )
}
