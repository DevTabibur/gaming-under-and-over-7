import Image from 'next/image'
import Coin from '@/assets/svg/coin.svg'
import ArrowDown from '@/assets/svg/arrow-down.svg'
import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

type BetInputProps = {
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BetInput: React.FC<BetInputProps> = ({ value, onChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const options = [1, 2, 3, 4, 5, 6]

  const handleSelect = (selectedValue: number) => {
    // Update the input value and close the dropdown
    onChange({
      target: { value: selectedValue },
    } as unknown as React.ChangeEvent<HTMLInputElement>)
    setDropdownOpen(false) // Close dropdown after selection
  }

  return (
    <>
      <div className="flex items-center border-8  border-[#FADF9A]  rounded-full w-[25rem]">
        <div className=" flex items-center bg-[#241D2A] text-white  py-4 h-full text-2xl rounded-l-full w-[70%] border-r-8 border-[#FADF9A]">
          <Image
            src={Coin.src}
            width={80}
            height={80}
            alt="rounded_heart"
            className="ps-8"
          />

          <input
            type="text"
            value={value}
            onChange={onChange}
            className="flex items-center justify-center bg-[#241D2A] w-full text-white px-7 text-center font-bold text-3xl  py-1 h-full outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className=" bg-[#241D2A] text-white flex items-center justify-center rounded-r-full h-full w-[30%] px-6 py-3"
        >
          <Image src={ArrowDown.src} width={60} height={60} alt="arrow_down" />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full  origin-bottom left-9 w-[280px] bg-[#241D2A] text-white rounded-lg  overflow-hidden 
              border-r-8 border-t-8 border-l-8 border-[#FADF9A] 
              "
            >
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)} // Update input value on selection
                  className="flex items-center px-4 py-2 hover:bg-[#FADF9A] hover:text-[#241D2A] duration-200 cursor-pointer text-2xl font-bold"
                >
                  <Image
                    src={Coin.src}
                    width={50}
                    height={50}
                    alt="coin"
                    className="px-2 mr-5"
                  />
                  {option}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default BetInput
