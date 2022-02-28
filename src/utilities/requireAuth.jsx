import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/userContext";
import { roles, tabs } from "../config.json";
import { TabContext } from "../contexts/tabContext";
import { UserContext } from "../contexts/userContext";
import { useEffect } from "react";

function RequireAuth({ children, admin }) {
  const { authed } = useContext(UserContext);
  const [wait, setWait] = useState(true);
  const { tab, changeTab } = useContext(TabContext);
  const navigate = useNavigate();
  console.log("Mesa sto requireAuth", authed);
  const navigateFunction = () => {
    if (admin && authed.role !== roles.Administrator) {
      changeTab(tabs.Dashboard);
      console.log("sto adfasdf");
      return;
    } else {
      console.log("aaaa");
      return children;
    }
  };

  const elem = () => {
    if (wait) {
      return <h1>adfasdf</h1>;
    } else {
      console.log("mhpke sto navigate");
      return <Navigate to="/login" replace />;
    }
  };

  useEffect(() => {
    //if (authed.email === "") navigate("/login");
    setWait(false);
  }, [authed]);
  return authed.email !== "" ? navigateFunction() : "";
  //<h1>asdfg</h1>
}

export default RequireAuth;
