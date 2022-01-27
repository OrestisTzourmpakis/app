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
  const [initialValue, setInitialValue] = useState({ ...resultt });
  const [details, setDetails] = useState({ ...data, ...dataTest });
  const [isRedeemPage, setIsRedeemPage] = useState(false);
  console.log("Details of formTemplate:");
  console.log(details);
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
  }, [details, edit]);

  // const initialValue = data;
  const updateValue = (key, newValue) => {
    console.log("Update key and value!!!");
    console.log(`To key:${key} and the new value:${newValue}`);
    console.log("Ne value bitch");
    const prevState = { ...details };
    _.set(prevState, key, newValue);
    setDetails({ ...prevState });
  };
  const checkEndPoint = () => {
    console.log("Current form Template:");
    console.log(formTemplate);
    const methods = { ...formMethods };
    switch (formTemplate) {
      case formTemplates.company:
        methods.addMethod = addCompany;
        methods.updateMethod = updateCompany;
        methods.renderForm = (
          <CompanyForm
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.users:
        methods.addMethod = register;
        methods.updateMethod = updateAccount;
        methods.renderForm = (
          <UserForm
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
            formType={formType}
            setDetails={setDetails}
          />
        );
        break;
      case formTemplates.sales:
        methods.addMethod = addSale;
        methods.updateMethod = updateSale;
        methods.renderForm = (
          <SalesForm
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
            setDetails={setDetails}
          />
        );
        break;
      case formTemplates.stores:
        methods.addMethod = addStore;
        methods.updateMethod = updateStore;
        methods.renderForm = (
          <StoresForm
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.assignUser:
        methods.addMethod = assignUserToCompany;
        methods.renderForm = (
          <AssignUserToCompany
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.addPoints:
        methods.addMethod = addPoints;
        methods.updateMethod = updatePoints;
        methods.renderForm = (
          <PointsForm
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
          />
        );
        break;
      case formTemplates.redeemPoints:
        methods.addMethod = redeemPoints;
        methods.renderForm = (
          <PointsForm
            details={details}
            updateValue={updateValue}
            handleDisableInput={handleDisableInput}
            redeem={true}
          />
        );
    }

    setFormMethods({ ...methods });
  };
  const handleDisableInput = () => {
    if (formType == formTypes.view && !edit) {
      return true;
    } else {
      return false;
    }
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
        console.log("add called!");
        const addResult = await formMethods.addMethod({ ...details });
      } else {
        console.log("The updated details!!");
        console.log(details);
        const result = await formMethods.updateMethod({ ...details });
        setInitialValue({ ...details });
        setEdit(false);
        // pou shmainei ama einai sto view kai to edit einai true tote kane handle to update
        // the update click!!!
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
    setDetails({ ...initialValue });
    console.log("Initial Value:");
    console.log(initialValue);
  };
  return (
    <>
      <div className="formContainer">
        <div className="backButtonWrapper m-1" onClick={() => navigate(-1)}>
          <ArrowBack className="backButtonIcon" />
        </div>
        <div className="storeDetailsWrapper">
          {formMethods.renderForm}
          {/* <div className="storeDetailsForm">
            {setPointsPage && (
              <>
                <h4>
                  The current ratio for 1 euro is :
                  {location.state.euroToPointsRatio} points
                </h4>
                <FormInput
                  label="euro"
                  value={details["euro"]}
                  valueChange={updateValue}
                  disableInput={handleDisableInput()}
                />
                <p>
                  Current points for the input euros are:
                  {details["euroToPointsRatio"] * details["euro"]}
                </p>
              </>
            )}
            {redeemPointsPage && (
              <>
                <h2>Total user points: {location.state.points}</h2>
                <h4>
                  The current ratio for 1 point is :
                  {location.state.pointsToEuroRatio} euro
                </h4>
                <FormInput
                  label="redeem"
                  value={details["redeem"]}
                  maxPrice={location.state.points}
                  minPrice={0}
                  valueChange={updateValue}
                  disableInput={handleDisableInput()}
                />
                <p>
                  Current euro for the input points are:
                  {details["pointsToEuroRatio"] * details["redeem"]}
                </p>
              </>
            )}
            {!setPointsPage && !redeemPointsPage && (
              <>
                {Object.keys(data).map((key) => {
                  console.log(`To key:${key}`);
                  console.log("asidufhaskfuhaksdfiuhkasdfiu");
                  if (_.has(ignoreKeys, key)) return;
                  return (
                    <>
                      <FormInput
                        objKey={key}
                        label={key}
                        key={key}
                        value={details[key]}
                        valueChange={updateValue}
                        disableInput={handleDisableInput()}
                      />
                    </>
                  );
                })}
              </>
            )}
          </div> */}
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
