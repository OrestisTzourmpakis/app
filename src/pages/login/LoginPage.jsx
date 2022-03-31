import { Person, Lock, Facebook } from "@material-ui/icons";
import LoginCustomInput from "./LoginCustomInput";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "../../utilities/handleErrors";
import { UserContext } from "../../contexts/userContext";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { applicationColors, apiUrl } from "../../config.json";
import { authenticateUser } from "../../services/userService";
import Modal from "@material-ui/core/Modal";
import { requestResetPassword } from "../../services/userAccountService";

const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    height: "100vh",
    backgroundColor: "black",
    opacity: "0.7",
    justifyContent: "center",
    alignItems: "center",
  },
  loginPageWrapper: {
    width: "700px",
    borderRadius: "15px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      width: "550px",
    },
  },
  personIcon: {
    position: "absolute",
    right: "50%",
    bottom: "0",
    width: "100px",
    borderRadius: "50%",
    height: "100px",
    backgroundColor: applicationColors.greenBg,
    top: "-50px",
    color: "white",
    padding: "10px",
    transform: "translateX(50px)",
    marginLeft: "50px",
  },
  loginFormWrapper: {
    paddingLeft: "60px",
    paddingTop: "80px",
    paddingRight: "60px",
    paddingBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
      paddingTop: "50px",
    },
  },
  loginInput: {},
  signInButton: {
    margin: "10px",
    backgroundColor: applicationColors.greenBg,
    "&:hover": {
      backgroundColor: applicationColors.greenBgHover,
    },
    padding: "10px 100px",
  },
  signInGoogle: {
    backgroundColor: "white",
    color: "black",
  },

  errorsList: {
    "& li": {
      color: "red",
      marginTop: "10px",
      listStylePosition: "inside",
      wordWrap: "break-word",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginPage() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const person = <Person className="icon" />;
  const passwordIcon = <Lock className="icon" />;
  const location = useLocation();
  const { userLogin } = useContext(UserContext);
  const classes = useStyles();
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [forgotPassRespond, setForgotPassRespond] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLoginClick = async () => {
    try {
      setErrors([]);
      await userLogin({ email, password });
      navigate("/");
    } catch (ex) {
      handleErrors(ex, setErrors);
    }
  };

  const handleResetPassword = () => {
    handleOpen();
  };

  const handleResetPasswordButton = async () => {
    const result = await requestResetPassword(forgotEmail);
    setForgotPassRespond("A reset email was send. Check your emails ");
  };

  useEffect(() => {
    const Init = async () => {
      try {
        const result = await authenticateUser();
        if (result.roles.length === 0) return;
        navigate("/");
      } catch (ex) {}
      if (location.state === null) return;
      setErrors([location.state.error.ex]);
    };
    Init();
  }, []);

  const handleEmailChange = (newValue) => {
    setEmail(newValue.target.value);
  };
  const handlePasswordChange = (newValue) => {
    setPassword(newValue.target.value);
  };

  return (
    <>
      <Box display="flex" className={classes.boxWrapper}>
        <Paper elevation={3} className={classes.loginPageWrapper}>
          <Person className={classes.personIcon} />
          <Box
            display="flex"
            flexDirection="column"
            className={classes.loginFormWrapper}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLoginClick();
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography variant="h3" align="center" />
                <LoginCustomInput
                  Icon={person}
                  value={email}
                  placeHolder="Email"
                  handleOnChange={handleEmailChange}
                />
                <LoginCustomInput
                  Icon={passwordIcon}
                  value={password}
                  placeHolder="Password"
                  type="password"
                  handleOnChange={handlePasswordChange}
                />
                <Box
                  display="flex"
                  style={{
                    width: "80%",
                    marginTop: "10px",
                    marginLeft: "50px",
                  }}
                >
                  <ul className={classes.errorsList}>
                    {errors.map((error) => (
                      <li>{error}</li>
                    ))}
                  </ul>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.signInButton}
                  >
                    Sign in
                  </Button>
                </Box>
              </Box>
            </form>
            <Box display="flex" flexDirection="column">
              <form
                className="googleForm"
                method="GET"
                action={`${apiUrl}/useraccount/externalLoginRequest`}
              >
                <input
                  type="hidden"
                  name="viewUrl"
                  value={window.location.origin.toString()}
                />
                <input type="hidden" name="provider" value="Google" />

                <Box
                  display="flex"
                  style={{ marginTop: "10px" }}
                  justifyContent="center"
                >
                  <Button
                    style={{ width: "300px" }}
                    className={classes.signInGoogle}
                    variant="contained"
                    type="submit"
                  >
                    <img
                      style={{ marginRight: "10px" }}
                      src={process.env.PUBLIC_URL + "/googleLogo.png"}
                      width={30}
                    />
                    <Typography variant="body1">Sign in with Google</Typography>
                  </Button>
                </Box>
              </form>
            </Box>
            {/* <Box display="flex" flexDirection="column">
              <form
                className="facebookForm"
                method="GET"
                //window.location.origin.toString()
                action={`${apiUrl}/useraccount/externalLoginRequest`}
              >
                <input
                  type="hidden"
                  name="viewUrl"
                  value={window.location.origin.toString()}
                />
                <input type="hidden" name="provider" value="Facebook" />
                <Box
                  display="flex"
                  style={{ marginTop: "10px" }}
                  justifyContent="center"
                >
                  <Button
                    style={{ width: "300px" }}
                    className={classes.signInGoogle}
                    variant="contained"
                    type="submit"
                  >
                    <Facebook
                      fontSize="large"
                      style={{ width: "40px", marginLeft: "14px" }}
                      color="primary"
                    />

                    <Typography variant="body1" style={{ marginLeft: "5px" }}>
                      Sign in with Facebook
                    </Typography>
                  </Button>
                </Box>
                
              </form>
            </Box> */}
            <Box display="flex" justifyContent="center">
                  <Button
                    onClick={handleResetPassword}
                    style={{ marginTop: "20px" }}
                    color="primary"
                  >
                    Reset Password
                  </Button>
                </Box>
          </Box>
        </Paper>
      </Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            RESET PASSWORD
          </Typography>
          <TextField
            id="outlined-required"
            label="Email"
            onChange={(e) => setForgotEmail(e.currentTarget.value)}
            value={forgotEmail}
          />
          <Button
            onClick={handleResetPasswordButton}
            style={{ marginTop: "20px" }}
            color="primary"
          >
            Reset Password
          </Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {forgotPassRespond}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
