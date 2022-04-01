import { DetailsOutlined, Forward } from "@material-ui/icons";
import React, { useEffect } from "react";
import FormInput from "../../components/common/formInput";
import FormTemplate from "../../components/common/formTemplate";
import { FormInputHook } from "../../utilities/formInputHook";
import { addCompany, updateCompany } from "../../services/companyService";
import { getCategories } from "../../services/categoriesService";
import {
  Box,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

export function CompanyForm({ defaultData, formType }) {
  // const handleUpdate =
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
      details: { ...dataForm.details, logo: imageName, logoFile: imageFile },
    });
  };

  const [redeemPoints, setRedeemPoints] = useState(1);
  const [categories, setCategories] = useState([]);
  const [redeemEuroResult, setRedeemEuroResult] = useState(
    dataForm.details["pointsToEuro"] * redeemPoints
  );

  const [exchangeEuro, setExchangeEuro] = useState(1);
  const [earnPoints, setEarnPoints] = useState(
    dataForm.details["euroToPoints"] * exchangeEuro
  );

  useEffect(() => {
    const Init = async () => {
      const { data } = await getCategories();
      setCategories(data);
    };
    Init();
  }, []);

  useEffect(() => {
    setRedeemEuroResult(redeemPoints / dataForm.details["pointsToEuro"]);
  }, [redeemPoints]);

  useEffect(() => {
    setEarnPoints(dataForm.details["euroToPoints"] * exchangeEuro);
  }, [exchangeEuro]);

  const validations = () => {
    const errors = [];
    const data = { ...dataForm.details };
    if (data.name === null || data.name.trim() === "") {
      errors.push("Company name is required");
    }
    if (data.euroToPoints === null || data.euroToPoints <= 0) {
      errors.push("Euro to points ratio must be positive and greater than 0.");
    }
    if (data.pointsToEuro === null || data.pointsToEuro <= 0) {
      errors.push("Points to euro ratio must be positive and greater than 0.");
    }
    return errors;
  };

  return (
    <FormTemplate
      dataForm={dataForm}
      setDataForm={setDataForm}
      addMethod={addCompany}
      formType={formType}
      updateMethod={updateCompany}
      handleDisableInput={handleDisableInput}
      validations={validations}
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
            selectList={[]}
          />
          <FormInput
            label="Category"
            type="select"
            value={dataForm.details["categoryId"]}
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
          <FormInput
            label="Owner email"
            value={dataForm.details["ownerEmail"]}
            objKey="ownerEmail"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <Paper elevation={3}>
            <Grid container direction="column">
              <Typography align="center" variant="body1">
                Loyalty points
              </Typography>
              <FormInput
                label="Redeem Ratio ( Points to Euro )"
                value={dataForm.details["pointsToEuro"]}
                objKey="pointsToEuro"
                valueChange={updateValue}
                type="number"
                disableInput={disableInput}
              />
              <Typography variant="subtitle1" align="center">
                or you can test it below
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                style={{
                  padding: "5px",
                }}
              >
                <TextField
                  id="totalPoints"
                  label="Points Simulator"
                  size="small"
                  value={redeemPoints}
                  onChange={(e) => setRedeemPoints(e.target.value)}
                  type="number"
                  variant="outlined"
                />
                <Forward />
                <TextField
                  key="euroResult"
                  id="totalEuroResult"
                  size="small"
                  label="Total Euro"
                  type="number"
                  value={redeemEuroResult}
                  disabled
                  variant="outlined"
                />
              </Box>
              <Divider />
              <FormInput
                label="Euro to Points"
                value={dataForm.details["euroToPoints"]}
                objKey="euroToPoints"
                valueChange={updateValue}
                type="number"
                disableInput={disableInput}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                style={{
                  padding: "5px",
                }}
              >
                <TextField
                  id="totalExchangeEuro"
                  label="Euro exchange"
                  size="small"
                  value={exchangeEuro}
                  onChange={(e) => setExchangeEuro(e.target.value)}
                  type="number"
                  variant="outlined"
                />
                <Forward />
                <TextField
                  key="euroResult"
                  id="totalEuroResult"
                  size="small"
                  label="Total Points"
                  type="number"
                  value={earnPoints}
                  disabled
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Paper>
        </div>
      </div>
    </FormTemplate>
  );
}

export default CompanyForm;
