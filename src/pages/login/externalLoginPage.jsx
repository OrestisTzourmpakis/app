import React, { useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

function ExternalLoginPage() {
  const { userLogin, authed } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const Init = async () => {
      // take the params from there and show it to the console!!!!
      const email = searchParams.get("email");
      const providerKey = searchParams.get("providerKey");
      const loginProvider = searchParams.get("loginProvider");
      if (email !== null && providerKey !== null && loginProvider !== null) {
        // go to the login
        try {
          await userLogin({ email, providerKey, loginProvider });
          navigate("/");
        } catch (ex) {
          console.log(ex);
          //let response = ex.response.data.errorMessage;
          navigate("/login", {
            state: {
              error: { ex },
            },
          });
        }
      }
    };
    Init();
  }, []);

  return <div>Redirecting please wait....</div>;
}

export default ExternalLoginPage;
