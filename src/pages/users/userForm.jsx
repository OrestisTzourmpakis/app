import React, { useState } from "react";
import { useEffect } from "react";
import FormInput from "../../components/common/formInput";
import { formTypes } from "../../config.json";
import { checkUserRole } from "../../services/userAccountService";

function UserForm({
  details,
  updateValue,
  handleDisableInput,
  formType,
  setDetails,
}) {
  const [owner, setOwner] = useState(details["owner"]);
  useEffect(() => {
    const init = async () => {
      // get user role!!! check if his roles!!
      let result = await checkUserRole(details["email"]);
      console.log("To result:");
      console.log(result);
      setDetails({ ...details, owner: result });
    };
    init();
  }, []);

  return (
    <div>
      <div className="storeDetailsForm">
        <FormInput
          label="Username"
          value={details["userName"]}
          objKey="userName"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Email"
          value={details["email"]}
          objKey="email"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />

        {formType === formTypes.add && (
          <FormInput
            label="Password"
            value={details["password"]}
            objKey="password"
            type="password"
            valueChange={updateValue}
            disableInput={handleDisableInput()}
          />
        )}
        <FormInput
          label="Company Owner"
          value={details["owner"]}
          objKey="owner"
          type="checkbox"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
      </div>
    </div>
  );
}

export default UserForm;
