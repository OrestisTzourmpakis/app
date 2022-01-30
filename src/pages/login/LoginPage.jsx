import { Person, Lock, RotateLeftSharp } from "@mui/icons-material";
import LoginCustomInput from "./LoginCustomInput";
import "./LoginPage.css";
import {
  login,
  checkIfExpired,
  googleLogin,
} from "../../services/userAccountService";
import { useContext, useState } from "react";
import { useAuth } from "../../contexts/userContext";
import { roles } from "../../config.json";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "../../utilities/handleErrors";
import { UserContext } from "../../contexts/userContext";
import GoogleLogin from "react-google-login";

export default function LoginPage() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const person = <Person className="icon" />;
  const passwordIcon = <Lock className="icon" />;
  const { userLogin } = useContext(UserContext);
  let navigate = useNavigate();

  const handleLoginClick = async () => {
    try {
      setErrors([]);
      await userLogin({ email, password });
      // setErrors(["hello there", "this is an error"]);
      navigate("/");
      // const check = checkIfExpired();
    } catch (ex) {
      handleErrors(ex, setErrors);
      console.log(ex);
    }
  };

  const handleGoogleLogin = async (googleData) => {
    console.log("Success");
    console.log(googleData);
  };

  const handleEmailChange = (newValue) => {
    setEmail(newValue.target.value);
  };
  const handlePasswordChange = (newValue) => {
    setPassword(newValue.target.value);
  };

  return (
    <div className="loginPage">
      <div className="loginPageModal">
        <Person className="personIcon" />
        <div className="loginForm">
          <div className="loginFormTitle">
            <h3>Login</h3>
          </div>
          <div className="loginInput">
            <LoginCustomInput
              Icon={person}
              value={email}
              handleOnChange={handleEmailChange}
            />
          </div>
          <div className="loginIput">
            <LoginCustomInput
              Icon={passwordIcon}
              value={password}
              type="password"
              handleOnChange={handlePasswordChange}
            />
          </div>
          <div className="errors">
            <ul className="errorsList">
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
          <button className="signInButton" onClick={() => handleLoginClick()}>
            Sign in
          </button>
          <form
            method="GET"
            action={"https://localhost:4004/api/useraccount/googlelogin"}
          >
            <a onClick={googleLogin}>Google Login</a>
            <button type="submit">Google Login</button>
          </form>
          <GoogleLogin
            clientId="715533597070-a5oamiocsjaheqnvirc55g1j14avef47.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
}
