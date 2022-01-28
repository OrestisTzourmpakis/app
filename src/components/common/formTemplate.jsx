import React from "react";
import { useState } from "react";
import FormInput from "./formInput";
import _ from "lodash";
import { formTypes, formTemplates } from "../../config.json";
import {
  addCompany,
  updateCompany,
  assignUserToCompany,
} from "../../services/companyService";
import { addStore, updateStore } from "../../services/storeService";
import { register, updateAccount } from "../../services/userAccountService";
import {
  updatePoints,
  addPoints,
  redeemPoints,
} from "../../services/pointsService";
import { addSale, updateSale } from "../../services/salesService";
import CircularProgress from "@mui/material/CircularProgress";
import { handleErrors } from "../../utilities/handleErrors";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { red } from "@mui/material/colors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import CompanyForm from "../../pages/companies/companyForm";
import UserForm from "../../pages/users/userForm";
import SalesForm from "../../pages/sales/salesForms";
import PointsForm from "../../pages/users/pointsForm";
import StoresForm from "../../pages/stores/storesForm";
import AssignUserToCompany from "../../pages/companies/assignUserToCompany";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function FormTemplate({ data, formType, ignoreKeys, formTemplate }) {
  const location = useLocation();
  console.log("------Location state in formtemplate!!");
  console.log(location);
  console.log(data);
  const dataTest = location.state;
  const redeemPointsPage =
    formTemplate === formTemplates.redeemPoints ? true : false;
  console.log(dataTest);
  const resultt = { ...data, ...dataTest };
  //const [initialValue, setInitialValue] = useState({ ...resultt });
  //const [details, setDetails] = useState({ ...data, ...dataTest });
  const [dataForm, setDataForm] = useState({
    initialData: { ...resultt },
    details: { ...resultt },
  });
  const [isRedeemPage, setIsRedeemPage] = useState(false);
  console.log("Details of formTemplate:");
  console.log(dataForm.details);
  const [errors, setErrors] = useState([]);
  const [disableButton, setDisabledButton] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formMethods, setFormMethods] = useState({
    addMethod: () => {},
    updateMethod: () => {},
    renderForm: () => {},
  });

  useEffect(() => {
    // initialize the endpoints!!
    checkEndPoint();
  }, [dataForm, edit]);

  // const initialValue = data;
  const updateValue = (key, newValue) => {
    const prevState = { ...dataForm.details };
    _.set(prevState, key, newValue);
    setDataForm({ ...dataForm, details: { ...prevState } });
  };
  const checkEndPoint = () => {
    console.log("Current form Template:");
    console.log(formTemplate);
    const methods = { ...formMethods };
    switch (formTemplate) {
      case formTemplates.company:
        methods.addMethod = addCompany;
        methods.updateMethod = updateCompany;
        methods.renderForm = () => (
          <CompanyForm
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.users:
        methods.addMethod = register;
        methods.updateMethod = updateAccount;
        methods.renderForm = () => (
          <UserForm
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
            formType={formType}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
        );
        break;
      case formTemplates.sales:
        methods.addMethod = addSale;
        methods.updateMethod = updateSale;
        methods.renderForm = () => (
          <SalesForm
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
        );
        break;
      case formTemplates.stores:
        methods.addMethod = addStore;
        methods.updateMethod = updateStore;
        methods.renderForm = () => (
          <StoresForm
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.assignUser:
        methods.addMethod = assignUserToCompany;
        methods.renderForm = () => (
          <AssignUserToCompany
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.addPoints:
        methods.addMethod = addPoints;
        methods.updateMethod = updatePoints;
        methods.renderForm = () => (
          <PointsForm
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.redeemPoints:
        methods.addMethod = redeemPoints;
        methods.renderForm = () => (
          <PointsForm
            details={dataForm.details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
            redeem={true}
          />
        );
    }

    setFormMethods({ ...methods });
  };
  const handleDisableInput = () => {
    if (formType == formTypes.view && !edit) return true;
    else return false;
  };

  const handleClick = async () => {
    if (loading) return;
    if (formType === formTypes.view && !edit) {
      // ara einai sto view ara handle to edit click edw pera!!
      setEdit(true);
      return;
    }
    try {
      setLoading(true);
      setErrors([]);
      if (formType === formTypes.add) {
        // handle the add click
        await formMethods.addMethod({ ...dataForm.details });
      } else {
        await formMethods.updateMethod({ ...dataForm.details });
        setDataForm({ ...dataForm, initialData: { ...dataForm.details } });
        setEdit(false);
      }
      setShowSnackbar(true);
    } catch (ex) {
      console.log(ex);
      handleErrors(ex, setErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const handleCancelClick = () => {
    setEdit(false);
    setDataForm({ ...dataForm, details: { ...dataForm.initialData } });
    console.log("Initial Value:");
    console.log(dataForm.initialData);
  };
  return (
    <>
      <div className="formContainer">
        <div className="backButtonWrapper m-1" onClick={() => navigate(-1)}>
          <ArrowBack className="backButtonIcon" />
        </div>
        <div className="storeDetailsWrapper">
          {formMethods.renderForm()}
          <div
            className={`storeDetailsButtons ${loading ? "loadingButton" : ""}`}
          >
            {edit && (
              <div
                className="storeDetailsEditButton storeDetailsWhiteButton"
                onClick={handleCancelClick}
              >
                <>{edit && <h4 className="storeFormWhite">Cancel</h4>}</>
              </div>
            )}
            <div
              className="storeDetailsEditButton storeDetailsGreenButton"
              onClick={handleClick}
            >
              {formType === formTypes.view && (
                <>
                  {!edit && <h4 className="storeFormWhite">Edit</h4>}
                  {edit && <h4 className="storeFormWhite">Update</h4>}
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: red,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </>
              )}
              {formType === formTypes.add && (
                <h4 className="storeFormWhite">
                  {redeemPointsPage && "Redeem"}
                  {!redeemPointsPage && "Add"}
                </h4>
              )}
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: red,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </div>
          </div>
          <div className="errors">
            <ul className="errorsList">
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Changes applied successfully!!
        </Alert>
      </Snackbar>
    </>
  );
}

export default FormTemplate;
