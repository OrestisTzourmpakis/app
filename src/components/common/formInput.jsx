import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formInputField: {
    "& input:not([type=file]),& textarea": {
      border: "none",
      backgroundColor: "rgb(234,239,239)",
      padding: "10px",
      outline: "none",
      width: "100%",
      borderRadius: "5px",
      fontSize: "15px",
      resize: "none",
      color: "rgb(120,130,146)",
    },
    "& img": {
      width: "80px",
      height: "80px",
      borderRadius: "15px",
    },
  },
}));

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
  const inputType = type ?? "text";
  const classes = useStyles();
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
          <>
            <Box display="flex" flexDirection="column">
              {imageName !== null && imageName !== "" && (
                <img src={imageName} />
              )}

              <input
                style={{ marginTop: "5px" }}
                id="raised-button-file"
                type="file"
                accept="image/*"
                disabled={disableInput ? true : false}
                onChange={handleImageChange}
              />
            </Box>
          </>
        );
      case "textarea":
        return (
          <textarea
            value={value}
            rows={5}
            disabled={disableInput ? true : false}
            onChange={handleOnChange}
          />
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
    <>
      <Box
        style={{ margin: "10px" }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Typography
          style={{ fontWeight: "600", marginBottom: "5px" }}
          variant="body1"
        >
          {label}
        </Typography>
        {/* <div className="storeFormInputLabel">
          <h3>{label}</h3>
        </div> */}
        <div className={classes.formInputField}>{renderInput()}</div>
      </Box>
    </>
  );
}

export default FormInput;
