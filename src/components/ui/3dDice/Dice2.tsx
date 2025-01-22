/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-empty-interface
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas, GroupProps, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getDiceRotationAngle } from '@/utils/DiceRotationAngle'

// Preload the GLTF model to ensure it’s available in the component
useGLTF.preload('/dice.glb')

interface GLTFResult {
  scene: any
}

interface IDice3dProps {
  face2: number
  isRolling: boolean
}

const RotatingDice2: React.FC<IDice3dProps> = ({ face2, isRolling }) => {
  const diceRef = useRef<any>(null)
  // Log the face value for debugging

  // Load the GLTF model and clone the scene to create an independent instance
  const gltf = useGLTF('/dice.glb') as GLTFResult
  const scene = gltf.scene.clone()

  // Reference for the auto-rotating model
  // const diceRef = useRef<THREE.Object3D>(null)

  // Traverse through the cloned scene and set materials for each mesh part
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.side = THREE.DoubleSide // Makes materials render on both sides of the face
      child.material.needsUpdate = true // Ensures that material updates are applied immediately
    }
  })

  // Update dice rotation based on face value when not rolling

  useEffect(() => {
    const setDiceRotation = async () => {
      if (!isRolling && diceRef.current) {
        const angle = await getDiceRotationAngle(face2 as number)
        if (angle) {
          diceRef.current.rotation.set(angle.x, angle.y, angle.z)
        }
      }
    }

    setDiceRotation()
  }, [face2, isRolling])

  // Rotate the dice while it's rolling
  useFrame(() => {
    if (isRolling && diceRef.current) {
      diceRef.current.rotation.y += 2 // Rotate around the Y-axis
      diceRef.current.rotation.z += 1 // Rotate around the Z-axis
      diceRef.current.rotation.x += 2 // Rotate around the X-axis
    }
  })

  // Render the GLTF model using the <primitive> component with a ref for rotation control
  return <primitive object={scene} ref={diceRef} />
}

const Dice2: React.FC<GroupProps> = ({ face2, isRolling }: any) => {
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
      <RotatingDice2 face2={face2} isRolling={isRolling} />
      {/* OrbitControls to allow rotating the view around the dice */}
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

export default Dice2
