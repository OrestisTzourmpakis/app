import React from "react";
import { useState } from "react";
import _, { add } from "lodash";
import { formTypes, formTemplates } from "../../config.json";
import { handleErrors } from "../../utilities/handleErrors";
import { useLocation } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { red } from "@material-ui/core/colors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack, CallMissedSharp, Edit } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
} from "@material-ui/core";
import clsx from "clsx";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "5px",
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  errors: {
    margin: "5px",
    "& ul": {
      listStyle: "none",
    },
    "& li": {
      display: "flex",
      color: "red",
    },
  },
}));

function FormTemplate({
  dataForm,
  setDataForm,
  addMethod,
  updateMethod,
  formType,
  children,
  handleDisableInput,
  addText,
  validations,
}) {
  const [errors, setErrors] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addTextTitle = addText ? addText : "Add";
  const checkValidations = validations ? validations : () => [];
  const classes = useStyles();

  useEffect(() => {
    handleDisableInput(edit);
  }, [edit]);

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
        let addErrors = checkValidations();
        if (addErrors.length > 0) {
          setErrors([...addErrors]);
        } else {
          await addMethod({ ...dataForm.details });
          setShowSnackbar(true);
        }
      } else {
        let updateErrors = checkValidations();
        if (updateErrors.length > 0) {
          setErrors([...updateErrors]);
        } else {
          await updateMethod({ ...dataForm.details });
          setDataForm({ ...dataForm, initialData: { ...dataForm.details } });
          setEdit(false);
          setShowSnackbar(true);
        }
      }
    } catch (ex) {
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
  };
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={4} alignItems="flex-start" direction="column">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Grid item container direction="column">
            <Paper elevation={0} style={{ padding: "10px" }}>
              <Grid item container direction="column">
                {children}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  {edit && (
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleCancelClick}
                        color="default"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      onClick={handleClick}
                    >
                      {formType === formTypes.view && (
                        <>{edit ? "Update" : "Edit"}</>
                      )}
                      {formType === formTypes.add && addTextTitle}
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </Box>
                <div className={classes.errors}>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
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
