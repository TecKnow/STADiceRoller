import { useState } from "react";

export default function DeferredNumericInput({
  name,
  min,
  max,
  value,
  setValue,
}) {
  const [displayedValue, setDisplayedValue] = useState(Number(min));
  return (
    <input
      name={name}
      type="number"
      min={min}
      max={max}
      value={displayedValue}
      onChange={(e) => {
        const newNumber = Number(e.target.value);
        if (newNumber >= Number(min) && newNumber <= Number(max)) {
          setValue(newNumber);
        }
        setDisplayedValue(newNumber);
      }}
      onBlur={(e) => {
        const newNumber = Number(e.target.value);
        console.log(newNumber, displayedValue, value)
        if (newNumber === NaN) {
          setValue(Number(min));
          setDisplayedValue(Number(min));
        } else if (newNumber > Number(max)) {
          setValue(Number(max));
          setDisplayedValue(Number(max));
        } else if (newNumber < Number(min)) {
          setValue(Number(min));
          setDisplayedValue(Number(min));
        } else{
          setValue(newNumber);
          setDisplayedValue(newNumber);
        }
      }}
    />
  );
}
