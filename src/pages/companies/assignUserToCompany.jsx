import React from "react";
import FormInput from "../../components/common/formInput";

function AssignUserToCompany({
  details,
  updateValue,
  handleDisableInput,
  setSales,
}) {
  return (
    <div>
      <div className="storeDetailsForm">
        <FormInput
          label="User Email"
          value={details["email"]}
          objKey="email"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
      </div>
    </div>
  );
}

export default AssignUserToCompany;
