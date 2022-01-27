import { DetailsOutlined } from "@mui/icons-material";
import React from "react";
import FormInput from "../../components/common/formInput";

export function CompanyForm({ details, updateValue, handleDisableInput }) {
  // const handleUpdate =
  return (
    <div>
      <div className="storeDetailsForm">
        <FormInput
          label="Name"
          value={details["name"]}
          objKey="name"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Logo"
          value={details["logo"]}
          objKey="logo"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Website"
          value={details["website"]}
          objKey="website"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Instagram"
          value={details["instagram"]}
          objKey="instagram"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Twitter"
          value={details["twitter"]}
          objKey="twitter"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Facebook"
          value={details["facebook"]}
          objKey="facebook"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Owner email"
          value={details["ownerEmail"]}
          objKey="ownerEmail"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Points to Euro"
          value={details["pointsToEuro"]}
          objKey="pointsToEuro"
          valueChange={updateValue}
          type="number"
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Euro to Points"
          value={details["euroToPoints"]}
          objKey="euroToPoints"
          valueChange={updateValue}
          type="number"
          disableInput={handleDisableInput()}
        />
      </div>
    </div>
  );
}

export default CompanyForm;
