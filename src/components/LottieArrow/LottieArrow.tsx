import React, { useState } from 'react'
import './LottieArrow.css'

const LottieArrow: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        className="arrow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className={isHovered ? 'animate' : ''}></span>
        <span className={isHovered ? 'animate' : ''}></span>
        <span className={isHovered ? 'animate' : ''}></span>
      </div>
    </>
  )
}

export default LottieArrow
