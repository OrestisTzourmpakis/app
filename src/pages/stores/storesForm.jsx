import React, { useEffect } from "react";
import FormInput from "../../components/common/formInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { formTypes } from "../../config.json";
import FormTemplate from "../../components/common/formTemplate";
import { addStore, updateStore } from "../../services/storeService";
import _ from "lodash";
import { FormInputHook } from "../../utilities/formInputHook";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import config from "../../config.json";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Geocode from "react-geocode";
import { Typography } from "@material-ui/core";
import { GoogleMapContainer } from "../../components/common/GoogleMap";

function StoresForm({ defaultData, formType }) {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  Geocode.setApiKey(config.REACT_APP_GOOGLE_MAPS_API_KEY);
  const { authed } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [marker, setMarker] = useState({
    lat: 0,
    long: 0,
  });
  const {
    dataForm,
    setDataForm,
    disableInput,
    updateValue,
    handleDisableInput,
  } = FormInputHook({
    defaultData: { ...defaultData, ...location.state },
    formType,
  });

  // console.log(location.state);
  const [locationError, setLocationError] = useState("");
  const validations = () => {
    const errors = [];
    const data = { ...dataForm.details };
    console.log(data);
    if (data.address === null || data.address.trim() === "") {
      errors.push("Address is required.");
    }
    return errors;
  };

  const handleClickOpen = async (s) => {
    // edw to geocode na dw an einai legit to address !!!
    console.log("To address:", dataForm.details.address);
    try {
      var response = await Geocode.fromAddress(dataForm.details.address);
      // take the lng and lat!!!
      const { lat, lng } = response.results[0].geometry.location;
      const sendModel = { ...dataForm.details, latitude: lat, longitude: lng };
      console.log(response);
      await addStore(sendModel);
      setDataForm({ ...dataForm, details: { ...sendModel } });
      console.log(response);
    } catch (ex) {
      console.log(ex);
      throw "Address is not valid!";
    }
    console.log("open");
    //setOpen(true);
  };

  const handleUpdate = async () => {
    // edw to geocode na dw an einai legit to address !!!
    console.log("To address sto update:", dataForm.details.address);
    try {
      var response = await Geocode.fromAddress(dataForm.details.address);
      // take the lng and lat!!!
      const { lat, lng } = response.results[0].geometry.location;
      const sendModel = { ...dataForm.details, latitude: lat, longitude: lng };
      console.log(response);
      await updateStore(sendModel);
      setDataForm({ ...dataForm, details: { ...sendModel } });
      console.log(response);
    } catch (ex) {
      console.log(ex);
      throw "Address is not valid!";
    }
    console.log("open");
  };

  const handleClose = (s) => {
    setOpen(false);
  };

  const handleCheck = async () => {
    // check the validation first and then check if the address is valid!!
    // if it is valid then open the dialog with the map and pass the marker
    const data = { ...dataForm.details };
    console.log("sto edit:", data);
    setLocationError("");

    if (data.address === null || data.address.trim() === "") {
      setLocationError("Address field is required!");
      return;
    }
    try {
      console.log("To details address", dataForm.details.address);
      var response = await Geocode.fromAddress(dataForm.details.address);
      const { lat, lng } = response.results[0].geometry.location;
      setMarker({ lat, lng });
      setOpen(true);
    } catch (ex) {
      setLocationError("Address is not valid");
    }
  };

  const handleCustomClick = (r) => {
    console.log(dataForm);
    //var resposne = await Geocode.fromAddress(dataForm.details.address);
    //setOpen(true);
  };

  const handleConfirm = () => {
    console.log("Confirm!!");
  };

  return (
    <>
      <FormTemplate
        dataForm={dataForm}
        setDataForm={setDataForm}
        addMethod={handleClickOpen}
        formType={formType}
        updateMethod={handleUpdate}
        handleDisableInput={handleDisableInput}
        validations={validations}
        customHandleClick={handleCustomClick}
      >
        <div>
          <Typography
            variant="subtitle2"
            style={{ padding: "10px", color: "lightgray" }}
          >
            <b>
              For more accurate location please pass the postal code or location
              for example:
              <i>Filonos 49-43, 321 00</i> or <i>Filonos 49-43, Leivadia</i>
            </b>
          </Typography>
          <FormInput
            label="Store Address"
            value={dataForm.details["address"]}
            objKey="address"
            valueChange={updateValue}
            disableInput={disableInput}
          />
          <Button
            onClick={handleCheck}
            variant="contained"
            style={{ marginLeft: "15px" }}
          >
            Check
          </Button>
          <Typography
            variant="subtitle2"
            style={{ color: "red", marginLeft: "15px" }}
          >
            {locationError}
          </Typography>
        </div>
        <div>
          <FormInput
            label="Phone Number ( Optional )"
            value={dataForm.details["telephone"]}
            objKey="telephone"
            type="tel"
            valueChange={updateValue}
            disableInput={disableInput}
          />
        </div>
      </FormTemplate>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm location"}</DialogTitle>
        <DialogContent>
          <Box display="flex" style={{ width: "555px", height: "400px" }}>
            <GoogleMapContainer marker={marker} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StoresForm;
