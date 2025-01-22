type NumberItem = {
  main: number
  multiplier: { [key: number]: number }
}

type NumberBarProps = {
  numbers: NumberItem[]
  onSelect: (num: number) => void
}

const NumberBar: React.FC<NumberBarProps> = ({ numbers }) => (
  <div className="bg-gradient-to-r from-[#F9DE98] to-[#9C7B44] p-3 rounded-full ">
    <div className="flex items-center max-w-5xl mx-auto justify-between bg-[#241D2A] rounded-full overflow-hidden">
      {numbers.map((item, index) => (
        <div
          key={item.main}
          className={`text-white w-full text-center text-xl font-bold py-2  transition-transform overflow-hidden duration-300 ${index !== numbers.length - 1 && 'border-r-[4px] border-[#FADF9A]'}`}
        >
          {/* Display main number */}
          <h3>{item.main}</h3>

          {/* Extract and display the multiplier values in the format of "key:value" */}
          <div className="text-sm text-[#E4E4E4] pt-2">
            {Object.entries(item.multiplier).map(([key, value]) => (
              <span key={key}>
                {key}:{value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default NumberBar
