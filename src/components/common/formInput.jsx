import { ImageNotSupportedTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";

function FormInput({
  label,
  value,
  objKey,
  valueChange,
  disableInput,
  maxPrice,
  minPrice,
  type,
  imageObj,
  updateImage,
  imageName,
  imageFile,
}) {
  console.log("To imageObj1!!");
  console.log(imageObj);
  // const [myImage, setMyImage] = useState({
  //   imageSrc: "",
  //   imageFile: null,
  // });
  const [test, setTest] = useState(imageObj);
  const inputType = type ?? "text";
  console.log("To imageFile:");
  console.log(imageFile);
  const handleOnChange = (e) => {
    if (inputType === "checkbox") {
      valueChange(objKey, e.target.checked);
    } else {
      if (maxPrice) {
        if (e.currentTarget.value > maxPrice) return;
      }
      if (minPrice !== null) {
        if (e.currentTarget.value < minPrice) {
          valueChange(objKey, "");

          return;
        }
      }
      valueChange(objKey, e.currentTarget.value);
    }
  };

  const handleImageChange = (e) => {
    // check if we selected an image!!!
    if (e.target.files && e.target.files[0]) {
      let imageFileTemp = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        console.log("Mesa sto onchange!!!!");
        updateImage(x.target.result, imageFileTemp);
      };
      reader.readAsDataURL(imageFileTemp);
    } else {
      updateImage("", null);
    }
  };

  const renderInput = () => {
    switch (inputType) {
      case "checkbox":
        return (
          <>
            <input
              type={inputType}
              checked={value}
              disabled={disableInput ? true : false}
              onChange={handleOnChange}
              min={minPrice}
            />
          </>
        );
      case "image":
        return (
          <div className="imageFormWrapper">
            {imageName !== null && imageName !== "" && (
              <div className="imageForm">
                <img src={imageName} />
              </div>
            )}

            <input
              id="raised-button-file"
              type="file"
              accept="image/*"
              disabled={disableInput ? true : false}
              onChange={handleImageChange}
            />
          </div>
        );
      default:
        return (
          <>
            <input
              type={inputType}
              value={value}
              disabled={disableInput ? true : false}
              onChange={handleOnChange}
              min={minPrice}
            />
          </>
        );
    }
  };

  return (
    <div className="storeFormInputWrapper">
      <div className="storeFormInputLabel">
        <h3>{label}</h3>
      </div>
      <div className="storeFormInputField">
        {renderInput()}

        {/* {type !== "checkbox" && <input
          type={inputType}
          value={value}
          disabled={disableInput ? true : false}
          onChange={handleOnChange}
          min={minPrice}
        />}
        {type === "checkbox" &&
          <input
          type={inputType}
          checked={value}
          disabled={disableInput ? true : false}
          onChange={handleOnChange}
          min={minPrice}
        />
        } */}
      </div>
    </div>
  );
}

export default FormInput;
