import { Dialog, DialogActions, DialogContentText } from "@mui/material";
import React, { createContext } from "react";

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
    setDialogState({
      ...dialogState,
      show: true,
      details: {
        title,
        body,
        yesButton,
        noButton,
        confirmCallback: callback,
      },
    });
  };

  const onConfirm = () => {
    // call the callback function!!
  };

  return {
    dialogState,
    setDialogState,
    onDismiss,
    onConfirm,
    openDialog,
  };
}

export const ConfirmationDialogContext = createContext();

function ConfirmationDialogContextProvider() {
  const state = useConfirmContexState();
  return (
    <ConfirmationDialogContext.Provider value={{ ...state }}>
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
  );
}

export default ConfirmationDialogContextProvider;
