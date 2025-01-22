import React, { RefObject, useEffect, useState } from 'react'
import './CubeRoller.css'

interface CubeRollerProps {
  cubeRef: RefObject<HTMLDivElement>
  onRollComplete: (value: number) => void
  isRolling: boolean
}

const CubeRoller: React.FC<CubeRollerProps> = ({
  cubeRef,
  onRollComplete,
  isRolling,
}) => {
  const [animationStyle, setAnimationStyle] =
    useState<string>('rotateY(180deg)')
  const [isInitiallySpinning, setIsInitiallySpinning] = useState<boolean>(true) // Track initial spin

  useEffect(() => {
    if (isRolling) {
      // Stop initial spin by setting isInitiallySpinning to false
      setIsInitiallySpinning(false)

      // Generate random rotation for the roll animation
      const xRand = Math.floor(Math.random() * 24 + 1) * 90
      const yRand = Math.floor(Math.random() * 24 + 1) * 90
      setAnimationStyle(`rotateX(${xRand}deg) rotateY(${yRand}deg)`)

      // Timeout to complete the roll and reset state
      const rollTimeout = setTimeout(() => {
        const rolledValue = Math.floor(Math.random() * 6) + 1
        onRollComplete(rolledValue)
      }, 1000) // Set rolling duration

      return () => clearTimeout(rollTimeout)
    }
  }, [isRolling, onRollComplete])

  return (
    <section className="container">
      <div
        className={!isRolling && isInitiallySpinning ? 'goAnimate' : ''}
        id="cube"
        ref={cubeRef}
        style={{
          transition: `transform 1s`,
          transform: animationStyle,
        }}
      >
        <div className="front">
          <span className="dot dot1"></span>
        </div>
        <div className="back">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
        </div>
        <div className="right">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
        </div>
        <div className="left">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
        </div>
        <div className="top">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
          <span className="dot dot5"></span>
        </div>
        <div className="bottom">
          <span className="dot dot1"></span>
          <span className="dot dot2"></span>
          <span className="dot dot3"></span>
          <span className="dot dot4"></span>
          <span className="dot dot5"></span>
          <span className="dot dot6"></span>
        </div>
      </div>
    </section>
  )
}

export default CubeRoller
