import { TbArrowBigRightLinesFilled } from 'react-icons/tb'

type MultiplierButtonProps = {
  title: string
  text: string
  selected: boolean
  numbers: number[]
  onClick: () => void
}

const MultiplierButton: React.FC<MultiplierButtonProps> = ({
  title,
  text,
  selected,
  numbers,
  onClick,
}) => (
  <>
    <div className="relative  font-bold flex flex-col h-32 w-full ">
      <button
        onClick={onClick}
        className={` flex items-center justify-evenly  text-white  gap-5 py-3 w-40
          absolute left-1/2 top-[.4px] transform -translate-x-1/2  z-50 
          rounded-t-2xl transition-all duration-600 bg-[#241d2a]

          ${selected ? 'border-[#c1a15a] border-t-[6px] border-l-[6px] border-r-[6px]' : 'border-[#241d2a] border-t-[6px] border-l-[6px] border-r-[6px]'}
          
          `}
      >
        <div
          className={`w-6 h-6 rounded-full drop-shadow-md flex items-center justify-center ${
            selected
              ? 'bg-gradient-to-r from-[#F9DE98] to-[#9C7B44] border-[#9C7B44]'
              : 'border-[#FBDF9B]'
          }`}
          style={{
            background: selected ? 'white' : 'transparent',
            borderWidth: selected ? '7px' : '5px',
          }}
        >
          {selected && (
            <div className="w-2 h-2 shadow-xl bg-white rounded-full"></div>
          )}
        </div>
        <span className="text-2xl font-bold">{text}</span>
      </button>

      <button
        onClick={onClick}
        className={`flex items-center justify-around w-full absolute left-0 bottom-0 gap-4 px-3 py-4 border-[6px] 
          ${
            selected ? 'border-[#c1a15a] text-yellow-500' : 'border-[#241d2a] '
          }  font-semibold bg-[#241d2a] rounded-full cursor-pointer
         `}
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#F9DE98] to-[#9C7B44] bg-clip-text text-transparent">
          {title}
        </h1>
        <TbArrowBigRightLinesFilled className="text-[#9C7B44] " size={20} />
        <div>
          {numbers.map((num) => (
            <span key={num} className="text-white text-md px-1">
              {num}
            </span>
          ))}
        </div>
      </button>
    </div>
  </>
)

export default MultiplierButton
