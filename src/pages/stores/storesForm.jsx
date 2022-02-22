import React, { useEffect } from "react";
import FormInput from "../../components/common/formInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { formTypes } from "../../config.json";
import FormTemplate from "../../components/common/formTemplateTest";
import { addStore, updateStore } from "../../services/storeService";
import _ from "lodash";
import { FormInputHook } from "../../utilities/formInputHook";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

function StoresForm({ defaultData, formType }) {
  const { authed } = useContext(UserContext);
  const location = useLocation();
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({
    defaultData: { ...defaultData, ...location.state },
    formType,
  });

  console.log(location.state);
  const validations = () => {
    const errors = [];
    const data = { ...dataForm.details };
    console.log(data);
    if (data.address === null || data.address.trim() === "") {
      errors.push("Address is required.");
    }
    return errors;
  };
  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={addStore}
      formType={formType}
      updateMethod={updateStore}
      handleDisableInput={handleDisableInput}
      validations={validations}
    >
      <div>
        <FormInput
          label="Store Address"
          value={dataForm.details["address"]}
          objKey="address"
          valueChange={updateValue}
          disableInput={disableInput}
        />
      </div>
    </FormTemplate>
  );
}

export default StoresForm;
