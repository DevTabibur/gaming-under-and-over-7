/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */

'use client'
import React, { useEffect, useRef } from 'react'
import { Canvas, GroupProps, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { getDiceRotationAngle } from '@/utils/DiceRotationAngle'

// Preload the GLTF model to ensure it’s available in the component
useGLTF.preload('/dice.glb')

interface GLTFResult {
  scene: any
}

interface IDice3dProps {
  face1: number
  isRolling: boolean
}

const RotatingDice: React.FC<IDice3dProps> = ({ face1, isRolling }) => {
  const diceRef = useRef<any>(null)
  console.log('RotatingDice face1,  diceRef: =>', face1, diceRef)

  const gltf = useGLTF('/dice.glb') as GLTFResult
  const scene = gltf.scene.clone()

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide
      child.material.needsUpdate = true
    }
  })

  useEffect(() => {
    const setDiceRotation = async () => {
      if (!isRolling && diceRef.current) {
        const angle = await getDiceRotationAngle(face1)
        if (angle) {
          diceRef.current.rotation.set(angle.x, angle.y, angle.z)
        }
      }
    }

    setDiceRotation()
  }, [face1, isRolling])

  useFrame(() => {
    if (isRolling && diceRef.current) {
      diceRef.current.rotation.y += 2
      diceRef.current.rotation.z += 1
      diceRef.current.rotation.x += 2
    }
  })

  return <primitive object={scene} ref={diceRef} />
}

const Dice1: React.FC<GroupProps> = ({ face1, isRolling }: any) => {
  return (
    <Canvas
      style={{ height: '100%', width: '100%' }}
      orthographic // Use an orthographic camera to keep the perspective fixed
      camera={{
        zoom: 80, // Zoom level to control how close or far the dice appears
        position: [0, 0, 10], // Position the camera a bit back from the dice model
        near: 0.1, // Set the near clipping plane to render objects close to the camera
        far: 1000, // Set the far clipping plane for objects further away
      }}
    >
      {/* Bright ambient light for consistent illumination on all angles */}
      <ambientLight intensity={1.2} /> {/* Increased ambient light intensity */}
      {/* Multiple point lights from different positions to illuminate the dice evenly */}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, 10, 10]} intensity={1.5} />
      <pointLight position={[10, -10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, 10]} intensity={1.5} />
      {/* Additional directional lights to reduce shadows and enhance overall lighting */}
      <directionalLight position={[0, 0, 10]} intensity={0.7} />
      <directionalLight position={[0, 0, -10]} intensity={0.7} />
      {/*  RotatingDice instances for each dice */}
      <RotatingDice face1={face1} isRolling={isRolling} />
      {/* <OrbitControls
        enableZoom={false} // Disable zoom to keep the dice size constant in the view
        enablePan={false} // Disable panning to ensure the dice remains centered
        rotateSpeed={1} // Control the rotation speed for a smooth drag rotation effect
        minPolarAngle={0} // Limit vertical rotation to prevent flipping upside-down
        maxPolarAngle={Math.PI} // Restrict rotation angle vertically for a stable view
      /> */}
    </Canvas>
  )
}

export default Dice1

