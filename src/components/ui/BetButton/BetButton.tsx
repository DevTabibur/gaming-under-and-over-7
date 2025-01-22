import React from 'react'
import './BetButton.css'

type BetButtonFunctionalProps = {
  disabled: boolean
  onClick: () => void
}

const BetButtonFunctional: React.FC<BetButtonFunctionalProps> = ({
  disabled,
  onClick,
}) => (
  <>
    <button
      className={`text-4xl  w-[35rem] rounded-full relative  ${
        disabled
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-[#F9DE98] to-[#9C7B44] cursor-pointer'
      } text-[#4B3000] italic font-[800] transition-all duration-300 ${
        disabled ? 'skeleton' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="inner_shimmer  flex items-center justify-center">
        Place Bet
      </div>
    </button>
  </>
)

export default BetButtonFunctional
