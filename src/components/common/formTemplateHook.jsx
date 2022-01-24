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
function FormTemplateHook({ data, formType, children }) {
  const setPointsPage = location.pathname.includes("setPoints") ? true : false;
  const [initialValue, setInitialValue] = useState({ ...resultt });
  const [details, setDetails] = useState({ ...data, ...dataTest });
  const [errors, setErrors] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formMethods, setFormMethods] = useState({
    addMethod: () => {},
    updateMethod: () => {},
  });

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
          <div className="storeDetailsForm">{children}</div>
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

export default FormTemplateHook;
