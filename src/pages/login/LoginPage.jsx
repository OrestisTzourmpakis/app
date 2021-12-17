import { Person, Lock } from "@mui/icons-material";
import LoginCustomInput from "./LoginCustomInput";
import "./LoginPage.css";
import { login } from "../../services/userAccountService";

export default function LoginPage() {
  const person = <Person className="icon" />;
  const password = <Lock className="icon" />;

  const handleLoginClick = () => {
    try {
      login("otzurbakis13@gmail.com", "Orestssis123!");
    } catch (ex) {
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
              <li>
                Error1asflkjsadflkjaslkdfjaslkdjfasdklfalskdjf
                lksajdflkasjdflkajsdf lkjasldkfjas lkjflkas jdflkajsl dkfjsak
                ldfjlak sdjfals dkfj
              </li>
              <li>Error1</li>
              <li>Error1</li>
              <li>Error1</li>
              <li>Error1</li>
              <li>Error1</li>
              <li>Error1</li>
              <li>Error1</li>
              <li>Error1</li>
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
