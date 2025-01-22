/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import {  useRef, useState } from 'react'
import './style.css'
import MultiplierButton from '../MultiplierButton/MultiplierButton'
import NumberBar from '../NumberBar/NumberBar'
import BetInput from '../BetInput/BetInput'
import BetButtonFunctional from '../BetButton/BetButton'
import { motion } from 'framer-motion'
import {
  multiplierChildVariants,
  multiplierContainerVariants,
  numberSlideUpVariant,
} from '@/motionVariants/motion'
import Dice1 from '../3dDice/Dice1'
import Dice2 from '../3dDice/Dice2'

interface INumber {
  main: number
  multiplier: { [key: string]: number }
}

const NumberWithRatio: INumber[] = [
  { main: 2, multiplier: { 1: 5 } },
  { main: 3, multiplier: { 1: 6 } },
  { main: 4, multiplier: { 1: 5 } },
  { main: 5, multiplier: { 1: 10 } },
  { main: 6, multiplier: { 1: 2 } },
  { main: 8, multiplier: { 1: 5 } },
  { main: 9, multiplier: { 1: 5 } },
  { main: 10, multiplier: { 1: 8 } },
  { main: 11, multiplier: { 1: 9 } },
  { main: 12, multiplier: { 2: 4 } },
]

function DiceRolling() {
  const [dice1, setDice1] = useState(2) // Initialize dice1 with a null value
  const [dice2, setDice2] = useState(4) // Initialize dice2 with a null value

  const [isRolling, setIsRolling] = useState(false)
  const [selectedMultiplier, setSelectedMultiplier] = useState(2.3)
  const [betAmount, setBetAmount] = useState(25)
  const [selectedBetType, setSelectedBetType] = useState<
    'under' | 'equal' | 'over' | null
  >(null)
  const [errorMessage, setErrorMessage] = useState('') // State for error messages
  // const audioRef = useRef<HTMLAudioElement>(new Audio(diceRollSound));

  console.log('setSelectedBetType', setSelectedBetType)
  // its fake API
  const mockApiCall = () => {
    return new Promise<{ dice1: number; dice2: number }>((resolve) => {
      setTimeout(() => {
        const randomDice1 = Math.floor(Math.random() * 6) + 1
        const randomDice2 = Math.floor(Math.random() * 6) + 1
        resolve({ dice1: randomDice1, dice2: randomDice2 })
      }, 2000)
    })
  }
  const cubeRef1 = useRef<HTMLDivElement>(null)
  const cubeRef2 = useRef<HTMLDivElement>(null)

  const rollCube = (
    ref: React.RefObject<HTMLDivElement>,
    onRollComplete: (value: number) => void
  ) => {
    if (ref.current) {
      setIsRolling(true)
      // audioRef.current.play(); // Play audio on roll start
      const xRand = Math.floor(Math.random() * 24 + 1) * 90
      const yRand = Math.floor(Math.random() * 24 + 1) * 90
      ref.current.style.transform = `rotateX(${xRand}deg) rotateY(${yRand}deg)`

      setTimeout(() => {
        const rolledValue = Math.floor(Math.random() * 6) + 1
        onRollComplete(rolledValue)
        setIsRolling(false)
        // audioRef.current.pause(); // Stop the audio after roll
        // audioRef.current.currentTime = 0; // Reset audio to start
      }, 1000)
    }
  }

  const roll = () => {
    rollCube(cubeRef1, setDice1)
    rollCube(cubeRef2, setDice2)
  }
  console.log('roll', roll)

  const handleNumberSelect = (num: number) => {
    setBetAmount(num)
  }

  // const handleBetPlace = () => {
  //   // Validate selections
  //   if (!selectedBetType) {
  //     setErrorMessage('Please select a bet type (Under, Equal, Over).')
  //     return
  //   }

  //   if (!betAmount) {
  //     setErrorMessage('Please select a bet amount.')
  //     return
  //   }

  //   setErrorMessage('') // Clear any previous error messages
  //   console.log(
  //     'Place Bet with',
  //     selectedBetType,
  //     'bet and',
  //     betAmount,
  //     'amount'
  //   )
  //   roll() // Proceed to roll if all validations pass
  // }

  // working code
  // const handleBetPlace = async () => {
  //   if (isRolling) return // Prevents function from firing if already rolling

  //   setErrorMessage('')
  //   setIsRolling(true)

  //   try {
  //     const { dice1: randomDice1, dice2: randomDice2 } = await mockApiCall()
  //     setDice1(randomDice1)
  //     setDice2(randomDice2)
  //     console.log('randomValues', randomDice1, randomDice2)
  //   } catch (error) {
  //     setErrorMessage('Failed to retrieve dice points.')
  //   } finally {
  //     setIsRolling(false)
  //   }
  // }

  const handleBetPlace = async () => {
    if (isRolling) return // Prevents function from firing if already rolling

    console.log('selectedBetType && betAmount', selectedBetType, betAmount)

    // Validate selections
    // if (!selectedBetType) {
    //   setErrorMessage('Please select a bet type (Under, Equal, Over).')
    //   return
    // }

    // if (!betAmount) {
    //   setErrorMessage('Please select a bet amount.')
    //   return
    // }

    // setErrorMessage('') // Clear any previous error messages
    // console.log(
    //   'Place Bet with',
    //   selectedBetType,
    //   'bet and',
    //   betAmount,
    //   'amount'
    // )
    // roll() // Proceed to roll if all validations pass

    setErrorMessage('')
    setIsRolling(true)

    try {
      const { dice1: randomDice1, dice2: randomDice2 } = await mockApiCall()
      setDice1(randomDice1)
      setDice2(randomDice2)
      console.log('randomValues', randomDice1, randomDice2)
    } catch (error) {
      setErrorMessage('Failed to retrieve dice points.')
    } finally {
      setIsRolling(false)
    }
  }

  // border-[#FBDF9B]

  // console.log('betAmount', betAmount)
  // console.log('selectedMultiplier', selectedMultiplier)

  console.log('dice1', dice1)
  console.log('dice2', dice2)

  return (
    <div className="flex flex-col select-none relative items-center w-full py-3">
      <div className="dice flex items-center justify-center gap-10">
        <div
          className={`p-7 ${isRolling ? 'animateBorder' : 'bg-[#FBDF9B]'} glossy-bg  rounded-full`}
        >
          <div className="rounded-full relative p-4 w-64 h-64 bg-black/90">
            {/* Dice 1 */}
            <Dice1 key="dice1" face1={dice1} isRolling={isRolling} />
            {/* Add a unique key */}
          </div>
        </div>
        <div
          className={`p-7 ${isRolling ? 'animateBorder' : 'bg-[#FBDF9B]'}  glossy-bg  rounded-full`}
        >
          <div className="rounded-full relative p-4 w-64 h-64 bg-black/90">
            {/* Dice 2 */}
            <Dice2 key="dice2" face2={dice2} isRolling={isRolling} />
            {/* Add a unique key */}
          </div>
        </div>
      </div>
      {/* Display error message */}
      <div className="space-y-12 pt-10">
        {/* Multiplier Buttons */}
        <motion.div
          className="flex gap-10 justify-around max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={multiplierContainerVariants}
        >
          <motion.div variants={multiplierChildVariants} className="w-full">
            <MultiplierButton
              title="Under"
              text="X 2.3"
              selected={selectedMultiplier === 2.31}
              onClick={() => setSelectedMultiplier(2.31)}
              numbers={[2, 3, 4, 5, 6]}
            />
          </motion.div>
          <motion.div variants={multiplierChildVariants} className="w-full">
            <MultiplierButton
              title="Equal"
              text="X 5.8"
              selected={selectedMultiplier === 5.8}
              onClick={() => setSelectedMultiplier(5.8)}
              numbers={[7]}
            />
          </motion.div>
          <motion.div variants={multiplierChildVariants} className="w-full">
            <MultiplierButton
              title="Over"
              text="X 2.3"
              selected={selectedMultiplier === 2.32}
              onClick={() => setSelectedMultiplier(2.32)}
              numbers={[8, 9, 10, 11, 12]}
            />
          </motion.div>
        </motion.div>

        {/* Number Selection Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={numberSlideUpVariant}
        >
          <NumberBar numbers={NumberWithRatio} onSelect={handleNumberSelect} />
        </motion.div>

        {/* Bet Input and Place a Bet Button */}
        <div className="flex gap-4 justify-around max-w-4xl mx-auto">
          <BetInput
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
          />
          <BetButtonFunctional disabled={isRolling} onClick={handleBetPlace} />{' '}
          {/* Call handleBetPlace */}
        </div>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, translateY: -20 }} // Start off invisible and slightly above
          animate={{ opacity: 1, translateY: 0 }} // Fade in and slide into place
          exit={{ opacity: 0, translateY: -20 }} // Fade out and slide up
          transition={{ duration: 0.3 }} // Set duration for the animation
          className="bg-[#241d2a] text-red-500 text-xl pt-4 mt-6 font-bold p-4 rounded-lg"
        >
          {errorMessage}
        </motion.div>
      )}
    </div>
  )
}

export default DiceRolling
