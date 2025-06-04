import { useState } from "react";

function InputText(props) {
    const [isSelected, setIsSelected] = useState(false);
    const labelIsActive = isSelected;

    const handleInputChange = (event) => {
    const formattedValue = props.textFormatter(event.target.value);
    props.setVariable(formattedValue);
  };

    return (
        <div className="relative">
            <label htmlFor={`${props.id}`} className={`absolute transition duration-100 -translate-y-1/2 font-satoshiBlack bg-white-tone-1 pl-1 pr-1 ml-2 text-[8pt] ${labelIsActive ? 'text-space-cadet' : ' text-argentinian-blue'}`}>{props.label}</label>
            <input
              id={`${props.id}`}
              value={props.inputValue}
              onChange={handleInputChange}
              onFocus={() => setIsSelected(true)}
              onBlur={() => setIsSelected(false)}
              //onClick={() => setIsSelected(!isSelected)}
              type='text'
              placeholder={`${props.placeholder}`}
              className={`border-argentinian-blue border-[2px] bg-white-tone-1 rounded-md p-2 outline-space-cadet w-full font-satoshiBold text-[10pt]`}
            />
        </div>
    )
}

export default InputText;