import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/userContext";
import { roles, tabs } from "../config.json";
import { TabContext } from "../contexts/tabContext";
import { UserContext } from "../contexts/userContext";

function RequireAuth({ children, admin }) {
  const { checkIfExpired, authed } = useContext(UserContext);
  const isExpired = checkIfExpired();
  const { tab, changeTab } = useContext(TabContext);
  const navigateFunction = () => {
    console.log("Mesa sto requireAuth");
    console.log(`To authed object mou:${authed}`);
    console.log(authed);
    console.log(`To roles apo to config mou: ${roles.Administrator} `);
    if (admin && authed.role !== roles.Administrator) {
      changeTab(tabs.Dashboard);
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  };
  // if (isExpired) {
  //   setUserContextObject();
  // }
  //return true ? children : <Navigate to="/login" replace />;
  return isExpired ? navigateFunction() : <Navigate to="/login" replace />;
}

export default RequireAuth;
