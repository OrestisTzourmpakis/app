import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { formTypes } from "../config.json";
import _ from "lodash";
export function FormInputHook({ defaultData, formType }) {
  const location = useLocation();
  const data = location.state;
  const [dataForm, setDataForm] = useState({
    initialData: { ...defaultData, ...data },
    details: { ...defaultData, ...data },
  });
  const [disableInput, setDisableInput] = useState(true);
  useEffect(() => {
    if (formType === formTypes.add) setDisableInput(false);
  }, []);
  // const initialValue = data;
  const updateValue = (key, newValue) => {
    const prevState = { ...dataForm.details };
    _.set(prevState, key, newValue);
    setDataForm({ ...dataForm, details: { ...prevState } });
  };

  const handleDisableInput = (edit) => {
    if (formType == formTypes.view && !edit) setDisableInput(true);
    else setDisableInput(false);
  };
  return {
    dataForm,
    setDataForm,
    disableInput,
    setDisableInput,
    updateValue,
    handleDisableInput,
  };
}
