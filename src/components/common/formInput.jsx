import React from "react";

function FormInput({
  label,
  value,
  valueChange,
  disableInput,
  maxPrice,
  minPrice,
  type,
}) {
  const inputTypeFuncion = () => {
    if (typeof value === "boolean") {
      return "checkbox";
    } else if (typeof value === "number") {
      return "number";
    } else {
      return "text";
    }
  };
  //const [details, setDetails] = useState(data);
  const inputType = inputTypeFuncion();
  const handleOnChange = (e) => {
    if (inputType === "checkbox") {
      valueChange(label, e.target.checked);
    } else {
      if (maxPrice) {
        if (e.currentTarget.value > maxPrice) return;
      }
      if (minPrice !== null) {
        if (e.currentTarget.value < minPrice) {
          valueChange(label, "");

          return;
        }
      }
      valueChange(label, e.currentTarget.value);
    }
  };
  // return (
  //   <div className="storeFormInputWrapper">
  //     <div className="storeFormInputLabel">
  //       <h3>{label.toLowerCase()}</h3>
  //     </div>
  //     <div className="storeFormInputField">
  //       <input
  //         type="text"
  //         value={value}
  //         disabled={disableInput ? true : false}
  //         onChange={(e) => valueChange(label, e.currentTarget.value)}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <div className="storeFormInputWrapper">
      <div className="storeFormInputLabel">
        <h3>{label.toLowerCase()}</h3>
      </div>
      <div className="storeFormInputField">
        <input
          type={inputType}
          value={value}
          disabled={disableInput ? true : false}
          onChange={handleOnChange}
          min={minPrice}
        />
      </div>
    </div>
  );
}

export default FormInput;
