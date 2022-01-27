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
}) {
  console.log("To imageObj1!!");
  console.log(imageObj);
  const [myImage, setMyImage] = useState({
    imageSrc: "",
    imageFile: null,
  });
  const [test, setTest] = useState(imageObj);
  const inputType = type ?? "text";
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
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        // setMyImage({
        //   ...myImage,
        //   imageFile,
        //   imageSrc: x.target.result,
        // });
        console.log("Mesa sto onchange!!!!");
        console.log(test);
        updateImage(x.target.result, imageFile);
        //valueChange(imageObj.imageFile.key, imageFile);
        //valueChange(imageObj.imageName.key, x.target.result);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setMyImage({
        ...myImage,
        imageFile: null,
        imageSrc: "/img/default.jpg",
      });
      valueChange(imageObj.imageFile.key, null);
      valueChange(imageObj.imageName.key, "/img/default.jpg");
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
            {imageObj?.imageFile && (
              <div className="imageForm">
                <img src={imageObj.imageName.value} />
              </div>
            )}

            <input
              id="raised-button-file"
              type="file"
              accept="image/*"
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
