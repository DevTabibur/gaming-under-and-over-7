'use client'
import React, { useEffect, useRef } from 'react'
import './CubeRoller.css' // Ensure to include your cube styles here

const Cube: React.FC<{ isRolling: boolean; value: number }> = ({
  isRolling,
}) => {
  const cubeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (cubeRef.current && isRolling) {
      const randomX = Math.floor(Math.random() * 4) * 90 // 0, 90, 180, 270
      const randomY = Math.floor(Math.random() * 4) * 90 // 0, 90, 180, 270
      cubeRef.current.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`
    }
  }, [isRolling])

  const sides = [
    { value: 1, className: 'front' },
    { value: 2, className: 'back' },
    { value: 3, className: 'right' },
    { value: 4, className: 'left' },
    { value: 5, className: 'top' },
    { value: 6, className: 'bottom' },
  ]

  return (
    <div className="cube-container">
      <div className="container">
        <div id="cube" ref={cubeRef}>
          {sides.map((side) => (
            <div className={side.className} key={side.className}>
              <span className={`dot dot${side.value}`}></span>
              {/* You can add more dots for a realistic dice look */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cube
