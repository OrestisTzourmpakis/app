import React from "react";
import "./Store.css";
import { Edit } from "@material-ui/icons";

export default function Store() {
  return (
    <div className="storeDetailsWrapper">
      <div className="storeDetailsForm">
        <StoreFormInput />
        <StoreFormInput />
        <StoreFormInput />
        <StoreFormInput />
        <StoreFormInput />
      </div>
      <div className="storeDetailsButtons">
        <div className="storeDetailsEditButton">
          <Edit className="storeFormWhite" />
          <h4 className="storeFormWhite">Edit</h4>
        </div>
      </div>
    </div>
  );
}
