import React from "react";
import FormInput from "../../components/common/formInput";

function SalesForm({
  details,
  updateValue,
  handleDisableInput,
  setSales,
  dataForm,
  setDataForm,
}) {
  const updateImage = (imageName, imageFile) => {
    setDataForm({
      ...dataForm,
      details: { ...dataForm.details, image: imageName, imageFile },
    });
  };

  return (
    <div>
      <div className="storeDetailsForm">
        <FormInput
          label="Title"
          value={details["title"]}
          objKey="title"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Description"
          value={details["description"]}
          objKey="description"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Image"
          value={details["image"]}
          type="image"
          objKey="image"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
          updateImage={updateImage}
          handleImageUpdate={updateImage}
          imageName={details["image"]}
          imageFile={details["imageFile"]}
        />
        <FormInput
          label="Date Start"
          value={details["dateStart"]}
          type="datetime-local"
          objKey="dateStart"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
        />
        <FormInput
          label="Date End"
          value={details["dateEnd"]}
          objKey="dateEnd"
          type="datetime-local"
          valueChange={updateValue}
          disableInput={handleDisableInput()}
          minPrice={details["dateStart"]}
        />
      </div>
    </div>
  );
}

export default SalesForm;
