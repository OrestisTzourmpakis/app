import React from "react";
import FormInput from "../../components/common/formInput";

function SalesForm({
  details,
  updateValue,
  handleDisableInput,
  setSales,
  setDetails,
}) {
  const updateImage = (imageName, imageFile) => {
    setDetails({ ...details, image: imageName, imageFile });
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
          imageObj={{
            imageName: {
              key: "image",
              value: details["image"],
            },
            imageFile: {
              key: "imageFile",
              value: details["imageFile"],
            },
          }}
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
