import React from "react";
import { useState } from "react";
import FormInput from "./formInput";
import _ from "lodash";
import { formTypes } from "../../config.json";
import { addCompany, updateCompany } from "../../services/companyService";
import { addStore, updateStore } from "../../services/storeService";
import { register, updateAccount } from "../../services/userAccountService";
import {
  updatePoints,
  assignUserToCompany,
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function FormTemplate({ data, formType, ignoreKeys }) {
  let ignordeValues = {};
  let keys = Object.keys(data);
  for (let key in ignoreKeys) {
    // move the item to a new object
  }
  const location = useLocation();
  console.log("------Location state in formtemplate!!");
  console.log(location);
  console.log(data);
  const dataTest = location.state;
  const setPointsPage = location.pathname.includes("setPoints") ? true : false;
  const redeemPointsPage = location.pathname.includes("redeemPoints")
    ? true
    : false;
  console.log(dataTest);
  const resultt = { ...data, ...dataTest };
  const [initialValue, setInitialValue] = useState({ ...resultt });
  const [details, setDetails] = useState({ ...data, ...dataTest });
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
  });

  useEffect(() => {
    // initialize the endpoints!!
    checkEndPoint();
  }, []);

  // const initialValue = data;
  const updateValue = (key, newValue) => {
    console.log("The key:{key}");
    console.log(key);
    console.log(newValue);
    const prevState = { ...details };
    _.set(prevState, key, newValue);
    console.log(prevState);
    setDetails(prevState);
    console.log(details);
  };
  const checkEndPoint = () => {
    let path = location.pathname;
    const methods = { ...formMethods };
    // methods.addMethod = location.state.methods.da1;
    // methods.updateMethod = location.state.methods.da2;
    if (path.includes("store")) {
      methods.addMethod = addStore;
      methods.updateMethod = updateStore;
    } else if (path.includes("compa")) {
      methods.addMethod = addCompany;
      methods.updateMethod = updateCompany;
    } else if (path.includes("setPoints")) {
      methods.addMethod = addPoints;
    } else if (path.includes("redeemPoints")) {
      console.log("Bhke sto redeem points gia na valei to function!");
      methods.addMethod = redeemPoints;
    } else if (path.includes("userPoints")) {
      methods.addMethod = assignUserToCompany;
      methods.updateMethod = updatePoints;
    } else if (path.includes("user")) {
      methods.addMethod = register;
      methods.updateMethod = updateAccount;
    } else if (path.includes("sale")) {
      methods.addMethod = addSale;
      methods.updateMethod = updateSale;
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

  const handleAddClick = async () => {
    // validation!!
    // setShowSnackbar(true);
    try {
      setLoading(true);
      setErrors([]);
      const result = await formMethods.addMethod({ ...details });
    } catch (ex) {
      console.log(ex);
      handleErrors(ex, setErrors);
    } finally {
      setLoading(false);
    }
    // console.log(result);
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
          {}
          <div className="storeDetailsForm">
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
          </div>
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
