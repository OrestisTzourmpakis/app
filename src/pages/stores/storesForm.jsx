import React from "react";
import FormInput from "../../components/common/formInput";

function StoresForm({ details, updateValue, handleDisableInput }) {
  return (
    <div>
      <FormInput
        label="Store Address"
        value={details["address"]}
        objKey="address"
        valueChange={updateValue}
        disableInput={handleDisableInput()}
      />
    </div>
  );
}

export default StoresForm;
