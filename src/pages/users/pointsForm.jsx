import React from "react";
import FormInput from "../../components/common/formInput";
import { FormInputHook } from "../../utilities/formInputHook";
import {
  addPoints,
  updatePoints,
  redeemPoints,
} from "../../services/pointsService";
import FormTemplate from "../../components/common/formTemplate";

function PointsForm({ defaultData, formType, redeem }) {
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData, formType });
  const redeemForm = redeem ?? false;
  const title = redeemForm ? "Εξαργυρωση" : "Προσθηκη";
  const pointsAddMethod = async (data) => {
    if (redeemForm) {
      await redeemPoints(data);
    } else {
      await addPoints(data);
    }
  };

  const addPointsValidation = () => {
    const data = { ...dataForm.details };
    const errors = [];
    if (data.euro <= 0) {
      errors.push("Please input a valid number of euro");
    }
    return errors;
  };

  const redeemPointsValidation = () => {
    const data = { ...dataForm.details };
    const errors = [];
    if (data.redeem <= 0) {
      errors.push("Please input a valid number of points.");
    }
    if (data.redeem > data.points) {
      errors.push("Not enought points");
    }
    return errors;
  };

  const validations = () => {
    if (redeemForm) {
      return redeemPointsValidation();
    } else {
      return addPointsValidation();
    }
  };

  const pointsBodyRender = () => {
    if (redeemForm) {
      return (
        <>
          <h2 style={{margin:"10px"}}> Ο χρήστης {dataForm.details["username"]} έχει {dataForm.details["points"]} Loyalty πόντους</h2>
          <h4 style={{margin:"10px"}}>
            Για κάθε {dataForm.details["pointsToEuroRatio"]} πόντοι αντιστοιχεί 1 €
          </h4>
          <FormInput
            label="Εξαργύρωση Πόντων:"
            value={dataForm.details["redeem"]}
            objKey="redeem"
            type="number"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <p style={{margin:"10px"}}>
            Σε ευρώ:
            {dataForm.details["redeem"] / dataForm.details["pointsToEuroRatio"] } €
          </p>
        </>
      );
    } else {
      return (
        <>
          <h4 style={{margin:"10px"}}>
            Για κάθε 1 € αντιστοιχεί {dataForm.details["euroToPointsRatio"]} Loyalty πόντοι
          </h4>
          <FormInput
            label="Ευρώ"
            value={dataForm.details["euro"]}
            objKey="euro"
            type="number"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <p style={{margin:"10px"}}>
            Σε πόντους:
            {dataForm.details["euroToPointsRatio"] * dataForm.details["euro"]}
          </p>
        </>
      );
    }
  };

  return (
    <div>
      <div className="storeDetailsFortm">
        <>
          <FormTemplate
            dataForm={dataForm}
            setDataForm={setDataForm}
            addMethod={pointsAddMethod}
            formType={formType}
            updateMethod={updatePoints}
            handleDisableInput={handleDisableInput}
            addText={title}
            validations={validations}
          >
            {pointsBodyRender()}
          </FormTemplate>
        </>
      </div>
    </div>
  );
}

export default PointsForm;
