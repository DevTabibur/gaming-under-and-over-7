'use client'
import DiceRolling from '@/components/ui/Dice/Dice'
import React, { useState } from 'react'
import Jackpot from '@/components/ui/Jackpot/Jackpot'
import Image from 'next/image'
import gameNam from '@/assets/logo.png'
import StickyNavigation from '@/components/shared/stickyNavigation/StickyNavigation'
import { BiSolidDollarCircle } from 'react-icons/bi'
import { BsPatchExclamationFill } from 'react-icons/bs'
import { FaGift } from 'react-icons/fa'
import { FaRankingStar } from 'react-icons/fa6'
import { IoTrophySharp } from 'react-icons/io5'
import { LuFerrisWheel } from 'react-icons/lu'
import { PiNumberSevenBold } from 'react-icons/pi'
import { Modal } from '@/components/ui'
import PrizesModalCard from '@/components/Modalnfo/PrizesModalCard'
import BonusesModalCard from '@/components/Modalnfo/BonusesModalCard'
import WeeklyReward from '@/components/ui/WeeklyReward/WeeklyReward'
import QuestOfTheDay from '@/components/ui/QuestOfTheDay/QuestOfTheDay'
import LuckyWheel from '@/components/ui/LuckyWheel/LuckyWheel'
import ExtraCashback from '@/components/ui/ExtraCashback/ExtraCashback'

const Game = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleButtonClick = (id: string) => {
    setActiveButton(id)
    setIsModalOpen(true) // Open the modal when a button is clicked
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setActiveButton(null)
  }
  const buttons = [
    {
      id: 'group1',
      tooltip: 'Prizes',
      icon: <BsPatchExclamationFill />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group1',
      onClick: handleButtonClick,
    },
    {
      id: 'group2',
      tooltip: 'Bonuses',
      icon: <FaGift />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group2',
      onClick: handleButtonClick,
    },
    {
      id: 'group3',
      tooltip: 'Weekly Reward',
      icon: <PiNumberSevenBold />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group3',
      onClick: handleButtonClick,
    },
    {
      id: 'group4',
      tooltip: 'Lucky Wheel',
      icon: <LuFerrisWheel />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group4',
      onClick: handleButtonClick,
    },
    {
      id: 'group5',
      tooltip: 'Quest of the day',
      icon: <IoTrophySharp />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group5',
      onClick: handleButtonClick,
    },
    {
      id: 'group6',
      tooltip: 'Extra Cashback',
      icon: <BiSolidDollarCircle />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group6',
      onClick: handleButtonClick,
    },
    {
      id: 'group7',
      tooltip: 'Place 09  Point 12000',
      icon: <FaRankingStar />, // Icon component
      iconColor: 'white',
      activeIconColor: '#00d013',
      toolTipBgColor: '#012E23',
      isActive: activeButton === 'group7',
      onClick: handleButtonClick,
    },
  ]

  // Define content based on the active button
  const renderModalContent = () => {
    switch (activeButton) {
      case 'group1':
        return <PrizesModalCard />
      case 'group2':
        return <BonusesModalCard />
      case 'group3':
        return <WeeklyReward />
      case 'group4':
        return <LuckyWheel />
      case 'group5':
        return <QuestOfTheDay />
      case 'group6':
        return <ExtraCashback />
      case 'group7':
        return null
      default:
        return null
    }
  }
  return (
    <section className="overflow-x-hidden  h-screen w-screen">
      <div className="flex  items-center justify-center">
        <Image
          src={gameNam}
          alt="gamename"
          width={150}
          height={150}
          className=" object-cover "
        />
      </div>
      <section
        // style={{ zoom: '80%' }}
        className="flex justify-center items-center w-full relative px-5"
      >
        {/* <Cube isRolling={true} value={36} /> */}

        <div className="items-start grid lg:grid-cols-5 md:grid-cols-1 ">
          <div className="cursor-pointer w-full">
            <Jackpot />
          </div>
          <div className="md:col-span-3">
            <DiceRolling />
          </div>
          <StickyNavigation
            buttons={buttons}
            bgColor="#012E23"
            onButtonClick={handleButtonClick} // Pass the click handler to StickyNavigation
          />
          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal} size="1100px">
              {renderModalContent()}
            </Modal>
          )}
        </div>
      </section>
    </section>
  )
}

export default Game
