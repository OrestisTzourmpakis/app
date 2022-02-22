import React from "react";
import FormInput from "../../components/common/formInput";
import { addSale, updateSale } from "../../services/salesService";
import FormTemplate from "../../components/common/formTemplateTest";
import { FormInputHook } from "../../utilities/formInputHook";
import { formTypes } from "../../config.json";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { useEffect } from "react";

function SalesForm({ defaultData, formType }) {
  const { authed, companyOwnerEmail, isAdmin } = useContext(UserContext);
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData, formType });
  const updateImage = (imageName, imageFile) => {
    setDataForm({
      ...dataForm,
      details: {
        ...dataForm.details,
        image: imageName,
        imageFile,
        email: isAdmin() ? companyOwnerEmail : authed.email,
      },
    });
  };

  useEffect(() => {
    setDataForm({
      ...dataForm,
      details: {
        ...dataForm.details,
        email: isAdmin() ? companyOwnerEmail : authed.email,
      },
    });
  }, [authed]);

  const addSaleValidation = () => {
    const errors = [];
    const data = { ...dataForm.details };
    console.log("Ta sales data:");
    console.log(data);
    if (data.title === null || data.title.trim() === "") {
      errors.push("Title is required.");
    }
    if (data.description === null || data.description.trim() === "") {
      errors.push("Description is required.");
    }
    if (data.dateStart === 0) {
      errors.push("Date start is required.");
    }
    if (data.dateEnd === 0) {
      errors.push("Date end is required.");
    }
    if (data.dateStart !== 0 && data.dataEnd !== 0) {
      if (Date.parse(data.dateStart) >= Date.parse(data.dateEnd)) {
        errors.push("Date start must be less than date end");
      }
    }
    return errors;
  };
  const updateSaleValidation = () => {
    const errors = [];
    const data = { ...dataForm.details };
    console.log("Ta sales data:");
    console.log(data);
    if (data.title === null || data.title.trim() === "") {
      errors.push("Title is required.");
    }
    if (data.description === null || data.description.trim() === "") {
      errors.push("Description is required.");
    }
    if (data.dateStart === 0) {
      errors.push("Date start is required.");
    }
    if (data.dateEnd === 0) {
      errors.push("Date end is required.");
    }
    if (data.dateStart !== 0 && data.dataEnd !== 0) {
      if (Date.parse(data.dateStart) >= Date.parse(data.dateEnd)) {
        errors.push("Date start must be less than date end");
      }
    }
    return errors;
  };
  const validations = () => {
    if (formType === formTypes.add) {
      return addSaleValidation();
    } else {
      return updateSaleValidation();
    }
  };

  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={addSale}
      formType={formType}
      updateMethod={updateSale}
      handleDisableInput={handleDisableInput}
      validations={validations}
    >
      <div>
        <div className="storeDetailsForm">
          <FormInput
            label="Title"
            value={dataForm.details["title"]}
            objKey="title"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <FormInput
            label="Description"
            type="textarea"
            value={dataForm.details["description"]}
            objKey="description"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <FormInput
            label="Image"
            value={dataForm.details["image"]}
            type="image"
            objKey="image"
            valueChange={updateValue}
            disableInput={disableInput}
            updateImage={updateImage}
            handleImageUpdate={updateImage}
            imageName={dataForm.details["image"]}
            imageFile={dataForm.details["imageFile"]}
          />
          <FormInput
            label="Date Start"
            value={dataForm.details["dateStart"]}
            type="datetime-local"
            objKey="dateStart"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <FormInput
            label="Date End"
            value={dataForm.details["dateEnd"]}
            objKey="dateEnd"
            type="datetime-local"
            valueChange={updateValue}
            disableInput={disableInput}
            minPrice={dataForm.details["dateStart"]}
          />
        </div>
      </div>
    </FormTemplate>
  );
}

export default SalesForm;
