import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import React, { createContext, useState } from "react";

export function useConfirmContexState() {
  const [dialogState, setDialogState] = useState({
    show: false,
    details: {
      title: "",
      body: "",
      yesButton: "",
      noButton: "",
      confirmCallback: () => {},
    },
  });

  const onDismiss = () => {
    setDialogState({ ...dialogState, show: false });
  };

  const openDialog = ({ title, body, yesButton, noButton, callback }) => {
    console.log("Mphke sto openDialog");
    setDialogState({
      ...dialogState,
      show: true,
      details: {
        title,
        body,
        yesButton,
        noButton,
        confirmCallback: () => callback(),
      },
    });
  };

  const resetDialog = () => {
    console.log("clicked!!!");
    setDialogState({ ...dialogState, show: false });
  };

  const onConfirm = () => {
    resetDialog();
    // call the callback function!!
    dialogState.details.confirmCallback();
  };

  return {
    dialogState,
    setDialogState,
    onDismiss,
    resetDialog,
    onConfirm,
    openDialog,
  };
}

export const ConfirmationDialogContext = createContext();

export function ConfirmationDialogContextProvider(props) {
  const state = useConfirmContexState();
  return (
    <>
      <ConfirmationDialogContext.Provider value={{ ...state }}>
        {props.children}
        <Dialog open={state.dialogState.show} onClose={state.onDismiss}>
          <DialogTitle id="alert-dialog-title">
            {state.dialogState?.details?.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {state.dialogState?.detals?.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={state.onDismiss}>
              {state.dialogState?.details?.noButton}
            </Button>
            <Button onClick={state.onConfirm} autoFocus>
              {state.dialogState?.details?.yesButton}
            </Button>
          </DialogActions>
        </Dialog>
      </ConfirmationDialogContext.Provider>
    </>
  );
}

export default ConfirmationDialogContextProvider;
