import { TbArrowBigRightLinesFilled } from 'react-icons/tb'

type SelectionButtonProps = {
  text: string
  numbers: number[]
  selected: boolean
  onClick: () => void
}

const SelectionButton: React.FC<SelectionButtonProps> = ({
  text,
  numbers,
  selected,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-around w-full gap-4 px-5 py-4 border-2 ${
      selected
        ? 'border-yellow-500 text-yellow-500'
        : 'border-[#5A5A5A] text-gray-400'
    }  font-semibold bg-[#342E3D] rounded-full cursor-pointer`}
  >
    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F9DE98] to-[#9C7B44] bg-clip-text text-transparent">
      {text}
    </h1>
    <TbArrowBigRightLinesFilled className="text-[#9C7B44] " size={30} />
    <div>
      {numbers.map((num) => (
        <span key={num} className="text-white text-xl px-1">
          {num}
        </span>
      ))}
    </div>
  </div>
)

export default SelectionButton
