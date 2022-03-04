import React, { useState, useContext, useEffect } from "react";
import FormInput from "../../components/common/formInput";
import FormTemplate from "../../components/common/formTemplate";
import { FormInputHook } from "../../utilities/formInputHook";
import { updateAccount } from "../../services/userAccountService";
import { getUser } from "../../services/userService";
import { UserContext } from "../../contexts/userContext";
import { formTypes } from "../../config.json";

function Profile() {
  const formType = formTypes.view;
  const defaultData = {};
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData, formType });
  const { authed } = useContext(UserContext);
  useEffect(() => {
    const Init = async () => {
      // get the user details!!
      if (authed.email === "") return;
      const { data } = await getUser(authed.email);
      setDataForm({
        ...dataForm,
        initialData: { ...data },
        details: { ...data },
      });
    };
    Init();
  }, [authed]);
  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={null}
      formType={formType}
      updateMethod={updateAccount}
      handleDisableInput={handleDisableInput}
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
        </div>
      </div>
    </FormTemplate>
  );
}

export default Profile;
