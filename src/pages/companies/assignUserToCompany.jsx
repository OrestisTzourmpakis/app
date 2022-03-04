import React from "react";
import FormInput from "../../components/common/formInput";
import FormTemplate from "../../components/common/formTemplate";
import { FormInputHook } from "../../utilities/formInputHook";
import { assignUserToCompany } from "../../services/companyService";

function AssignUserToCompany({ defaultData, formType }) {
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData, formType });
  const validations = () => {
    const errors = [];
    const data = { ...dataForm.details };
    if (data.email === null || data.email.trim() === "") {
      errors.push("User email is required.");
    }
    return errors;
  };
  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={assignUserToCompany}
      formType={formType}
      updateMethod={() => null}
      handleDisableInput={handleDisableInput}
      validations={validations}
    >
      <div>
        <div className="storeDetailsForm">
          <FormInput
            label="User Email"
            value={dataForm.details["email"]}
            objKey="email"
            valueChange={updateValue}
            disableInput={disableInput}
          />
        </div>
      </div>
    </FormTemplate>
  );
}

export default AssignUserToCompany;
