import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Select(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.placeholder);
  const [optionQuantity, setOptionQuantity] = useState([
    {
      optionName: props.option1[0],
      optionValue: props.option1[1],
      optionIcon: props.option1[2],
      isLastOption: props.option1[3],
    },
    {
      optionName: props.option2[0],
      optionValue: props.option2[1],
      optionIcon: props.option2[2],
      isLastOption: props.option2[3],
    },
    {
      optionName: props.option3[0],
      optionValue: props.option3[1],
      optionIcon: props.option3[2],
      isLastOption: props.option3[3],
    },
  ]);

  const selectOption = (optionName) => {
    setSelectedOption(optionName);
    setIsOpen(false);
  };

  const selectRef = useRef(null); // (1)

  // 2. Use useEffect para adicionar e remover o event listener
  useEffect(() => {
    // (2)
    function handleClickOutside(event) {
      // (3)
      // Se o clique ocorreu fora do elemento referenciado (selectRef.current)
      // e o select está aberto, então feche-o.
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        // (4)
        setIsOpen(false); // (5)
      }
    }

    document.addEventListener("mousedown", handleClickOutside); // (6)

    return () => {
      // (7)
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // (8)

  return (
    <div className='flex flex-col relative' style={{ width: props.w }} ref={selectRef}>
      <div
        style={{
          width: props.w,
          height: props.h,
          justifyContent: "space-between",
        }}
        className={`bg-lapis-lazuli rounded-lg font-satoshiBold text-[10px] text-white flex justify-center items-center gap-2 pl-3 pr-3 ${
          isOpen ? "rounded-b-none" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className='text-center'>{selectedOption}</p>
        <ChevronDown
          className={`transition duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <ul
          style={{ width: props.w, transform: `translateY(${props.h})` }}
          className={`absolute flex-col transition duration-200 z-10
                ${isOpen ? "open-animation" : "close-animation"} 
                ${isOpen ? "flex" : "hidden"}`}
        >
          {optionQuantity.map((option) => (
            <li
              style={{ width: props.w }}
              className={`text-[10pt] gap-2 flex p-1 cursor-pointer bg-white border-lapis-lazuli border-[2px] border-b-0 hover:bg-lapis-lazuli hover:text-white ${
                option.isLastOption == true ? "rounded-b-lg border-b-[2px]" : ""
              }`}
              onClick={() => {
                selectOption(option.optionName);
                props.changeTaskStatus(props.taskId, option.optionValue);
              }}
            >
              {option.optionIcon}
              {option.optionName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
