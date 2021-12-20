import { Person, Lock } from "@mui/icons-material";
import LoginCustomInput from "./LoginCustomInput";
import "./LoginPage.css";
import { login } from "../../services/userAccountService";
import { useState } from "react";

export default function LoginPage() {

  const [errors, setErrors] = useState([]);

  const person = <Person className="icon" />;
  const password = <Lock className="icon" />;

  const handleLoginClick = async () => {
    try {
      await login("otzurbakis13@gmail.com", "Orestssis123!");
    } catch (ex) {
      const {
        response: {
          data: { errorMessage },
        },
      } = ex;
      if (errorMessage)
        
      console.log(errorMessage);
      console.log(ex);
    }
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
            <LoginCustomInput Icon={person} />
          </div>
          <div className="loginIput">
            <LoginCustomInput Icon={password} />
          </div>
          <div className="errors">
            <ul className="errorsList">
            {errors.map(error => (
              <li>{ error}</li>
            )) }
            </ul>
          </div>
          <button className="signInButton" onClick={() => handleLoginClick()}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
