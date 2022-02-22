import { Person, Lock, Facebook } from "@material-ui/icons";
import LoginCustomInput from "./LoginCustomInput";
//import "./LoginPage.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "../../utilities/handleErrors";
import { UserContext } from "../../contexts/userContext";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { applicationColors } from "../../config.json";
import clsx from "clsx";

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

export default function LoginPage() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const person = <Person className="icon" />;
  const passwordIcon = <Lock className="icon" />;
  const location = useLocation();
  const theme = useTheme();
  const { userLogin } = useContext(UserContext);
  const classes = useStyles();
  let navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      setErrors([]);
      await userLogin({ email, password });
      navigate("/");
    } catch (ex) {
      handleErrors(ex, setErrors);
    }
  };

  useEffect(() => {
    // check if i have location state!!!!
    if (location.state === null) return;
    console.log(location.state.ex);
    setErrors([location.state.error.ex]);
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
            <Box display="flex" flexDirection="column" a>
              <form
                className="googleForm"
                method="GET"
                action={"https://localhost:4004/api/useraccount/googlelogin"}
              >
                <Typography
                  align="center"
                  style={{ color: "black" }}
                  variant="h4"
                >
                  Or
                </Typography>
                <Box
                  display="flex"
                  style={{ marginTop: "10px" }}
                  justifyContent="center"
                >
                  <Button
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
          </Box>
        </Paper>
      </Box>
    </>
    // <div className="loginPage">
    //   <div className="loginPageModal">
    //     <Person className="personIcon" />
    //     <div className="loginForm">
    //       <form */}
    //         onSubmit={(e) => {
    //           e.preventDefault();
    //           handleLoginClick();
    //         }}
    //       >
    //         <div className="loginFormTitle">
    //           <h3>Login</h3>
    //         </div>
    //         <div className="loginInput">
    //           <LoginCustomInput
    //             Icon={person}
    //             value={email}
    //             handleOnChange={handleEmailChange}
    //           />
    //         </div>
    //         <div className="loginIput">
    //           <LoginCustomInput
    //             Icon={passwordIcon}
    //             value={password}
    //             type="password"
    //             handleOnChange={handlePasswordChange}
    //           />
    //         </div>
    //         <div className="errors">
    //           <ul className="errorsList">
    //             {errors.map((error) => (
    //               <li>{error}</li>
    //             ))}
    //           </ul>
    //         </div>
    //         <button className="signInButton" type="submit">
    //           Sign in
    //         </button>
    //       </form>

    //       <form
    //         className="googleForm"
    //         method="GET"
    //         action={"https://localhost:4004/api/useraccount/googlelogin"}
    //       >
    //         <h3>Or</h3>
    //         <button className="googleButton" type="submit">
    //           <Facebook />
    //           <h4>Sign in with Google</h4>
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
