import React, { useContext, useState } from "react";
import { useEffect } from "react";
import FormInput from "../../components/common/formInput";
import { formTypes } from "../../config.json";
import { checkUserRole } from "../../services/userAccountService";
import { FormInputHook } from "../../utilities/formInputHook";
import FormTemplate from "../../components/common/formTemplateTest";
import { register, updateAccount } from "../../services/userAccountService";
import { UserContext } from "../../contexts/userContext";

function UserForm({ defaultData, formType }) {
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData, formType });
  const { authed, isAdmin } = useContext(UserContext);
  const [owner, setOwner] = useState(dataForm.details["owner"]);
  useEffect(() => {
    const init = async () => {
      if (formType === formTypes.view) {
        // get user role!!! check if his roles!!
        let result = await checkUserRole(dataForm.details["email"]);
        console.log("To result:");
        console.log(result);
        //setInitialValue({ ...initialValue, owner: result });
        //setDetails({...details,owner:result});
        setDataForm({
          initialData: { ...dataForm.initialData, owner: result },
          details: { ...dataForm.details, owner: result },
        });
      } else {
        // to formtype einai view!!! ara dwse to email tou company owner!!
        // alliws ama einai admin tote dwse to emfanise to checkbox ean 8elei o
        // xrhsths na valei enan companyowner user!!!
        if (isAdmin()) {
          // kane aplo register!!!
        } else {
          // einai company owner!!! passare to company owner email!!!
          setDataForm({
            initialData: {
              ...dataForm.initialData,
              companyOwnerEmail: authed.email,
            },
            details: {
              ...dataForm.details,
              companyOwnerEmail: authed.email,
            },
          });
        }
      }
    };
    init();
  }, []);

  const addUserValidation = () => {
    const errors = [];
    const data = { ...dataForm.details };
    if (data.userName === null || data.userName.trim() === "") {
      errors.push("Username is required.");
    }
    if (data.email === null || data.email.trim() === "") {
      errors.push("Email is required.");
    }
    return errors;
  };
  const updateUserValidation = () => {
    const errors = [];
    const data = { ...dataForm.details };
    if (data.userName === null || data.userName.trim() === "") {
      errors.push("Username is required.");
    }
    if (data.email === null || data.email.trim() === "") {
      errors.push("Email is required.");
    }
    return errors;
  };
  const validations = () => {
    if (formType === formTypes.add) {
      return addUserValidation();
    } else {
      return updateUserValidation();
    }
  };

  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={register}
      formType={formType}
      updateMethod={updateAccount}
      handleDisableInput={handleDisableInput}
      validations={validations}
    >
      <div>
        <div className="storeDetailsForm">
          <FormInput
            label="Username"
            value={dataForm.details["userName"]}
            objKey="userName"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <FormInput
            label="Email"
            value={dataForm.details["email"]}
            objKey="email"
            valueChange={updateValue}
            disableInput={disableInput}
          />

          {/* {formType === formTypes.add && (
            <FormInput
              label="Password"
              value={dataForm.details["password"]}
              objKey="password"
              type="password"
              valueChange={updateValue}
              disableInput={disableInput}
            />
          )} */}
          {isAdmin() && (
            <FormInput
              label="Company Owner"
              value={dataForm.details["owner"]}
              objKey="owner"
              type="checkbox"
              valueChange={updateValue}
              disableInput={disableInput}
            />
          )}
        </div>
      </div>
    </FormTemplate>
  );
}

export default UserForm;
