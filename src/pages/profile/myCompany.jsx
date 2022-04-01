import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  getCompanyByUserEmail,
  addCompany,
  updateCompany,
} from "../../services/companyService";
import { formTypes } from "../../config.json";
import FormTemplate from "../../components/common/formTemplate";
import { FormInputHook } from "../../utilities/formInputHook";
import FormInput from "../../components/common/formInput";
import { getCategories } from "../../services/categoriesService";

function MyComapny({}) {
  const { authed } = useContext(UserContext);
  const formType = formTypes.view;
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({ defaultData: data, formType });
  useEffect(() => {
    const Init = async () => {
      if (authed.email === "") return;
      const { data } = await getCategories();
      setCategories(data);
      const dataResponse = await getCompanyByUserEmail(authed.email);
      console.log("To mycompany:", dataResponse);
      dataResponse.ownerEmail = dataResponse.owner.email;
      dataResponse.pointsToEuro = dataResponse.pointsToEuroRatio;
      dataResponse.euroToPoints = dataResponse.euroToPointsRatio;
      setDataForm({
        ...dataForm,
        initialData: { ...dataResponse },
        details: { ...dataResponse },
      });
    };
    Init();
  }, [authed]);

  const updateImage = (imageName, imageFile) => {
    setDataForm({
      ...dataForm,
      details: { ...dataForm.details, logo: imageName, logoFile: imageFile },
    });
  };
  return (
    <>
      <FormTemplate
        dataForm={dataForm}
        setDataForm={setDataForm}
        addMethod={addCompany}
        formType={formType}
        updateMethod={updateCompany}
        handleDisableInput={handleDisableInput}
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
            <FormInput
              label="Logo"
              value={dataForm.details["logo"]}
              type="image"
              objKey="logo"
              valueChange={updateValue}
              disableInput={disableInput}
              updateImage={updateImage}
              handleImageUpdate={updateImage}
              imageName={dataForm.details["logo"]}
              imageFile={dataForm.details["logoFile"]}
            />
            <FormInput
              label="Category"
              type="select"
              value={
                dataForm.details["categoryId"]
                  ? dataForm.details["categoryId"]
                  : null
              }
              objKey="categoryId"
              valueChange={updateValue}
              disableInput={disableInput}
              selectValueKey="id"
              selectNameKey="name"
              selectList={categories}
            />
            <FormInput
              label="Website"
              value={dataForm.details["website"]}
              objKey="website"
              valueChange={updateValue}
              disableInput={disableInput}
            />
            <FormInput
              label="Instagram"
              value={dataForm.details["instagram"]}
              objKey="instagram"
              valueChange={updateValue}
              disableInput={disableInput}
            />
            <FormInput
              label="Twitter"
              value={dataForm.details["twitter"]}
              objKey="twitter"
              valueChange={updateValue}
              disableInput={disableInput}
            />
            <FormInput
              label="Facebook"
              value={dataForm.details["facebook"]}
              objKey="facebook"
              valueChange={updateValue}
              disableInput={disableInput}
            />

            <h3 style={{ margin: "0px 10px" }}>Πόντοι Loyalty ανά Ευρώ</h3>
            <hr />
            <FormInput
              label="EΞΑΡΓΥΡΩΣΗ:"
              value={dataForm.details["pointsToEuro"]}
              objKey="pointsToEuro"
              valueChange={updateValue}
              type="number"
              disableInput={disableInput}
            />
            <p style={{ margin: "0px 10px" }}>
              Για κάθε {dataForm.details["pointsToEuro"]} πόντους εξαργυρώνεται
              1 €
            </p>
            <hr />
            <FormInput
              label="ΑΝΑΘΕΣΗ:"
              value={dataForm.details["euroToPoints"]}
              objKey="euroToPoints"
              valueChange={updateValue}
              type="number"
              disableInput={disableInput}
            />
            <p style={{ margin: "0px 10px" }}>
              Για κάθε 1 € ανατίθενται {dataForm.details["euroToPoints"]} πόντοι
            </p>
            <hr />
          </div>
        </div>
      </FormTemplate>
    </>
  );
}

export default MyComapny;
