import React, { useContext, useEffect } from "react";
import { FormInputHook } from "../../utilities/formInputHook";
import { formTypes } from "../../config.json";
import FormTemplate from "../../components/common/formTemplate";
import FormInput from "../../components/common/formInput";
import { addCategory, updateCategory } from "../../services/categoriesService";
import { UserContext } from "../../contexts/userContext";

function CategoryForm({ defaultData, formType }) {
  const { authed } = useContext(UserContext);
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData, formType });

  useEffect(() => {
    setDataForm({
      ...dataForm,
      details: {
        ...dataForm.details,
      },
    });
  }, [authed]);

  const addCategoryValidation = () => {
    const errors = [];
    const data = { ...dataForm.details };
    if (data.name === null || data.name.trim() === "") {
      errors.push("Name is required.");
    }
    return errors;
  };
  const updateCategoryValidation = () => {
    const errors = [];
    const data = { ...dataForm.details };
    if (data.name === null || data.name.trim() === "") {
      errors.push("Name is required.");
    }
    return errors;
  };
  const validations = () => {
    if (formType === formTypes.add) {
      return addCategoryValidation();
    } else {
      return updateCategoryValidation();
    }
  };
  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={addCategory}
      formType={formType}
      updateMethod={updateCategory}
      handleDisableInput={handleDisableInput}
      validations={validations}
    >
      <div>
        <div className="storeDetailsForm">
          <FormInput
            label="Name"
            value={dataForm.details["name"]}
            objKey="name"
            valueChange={updateValue}
            disableInput={disableInput}
          />
        </div>
      </div>
    </FormTemplate>
  );
}

export default CategoryForm;
