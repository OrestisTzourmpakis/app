import React from "react";
import "./StoreFormInput.css";

export default function StoreFormInput() {
  return (
    <div className="storeFormInputWrapper">
      <div className="storeFormInputLabel">
        <h3>Name</h3>
      </div>
      <div className="storeFormInputField">
        <input type="text" disabled />
      </div>
    </div>
  );
}
