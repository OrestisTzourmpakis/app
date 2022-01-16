import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/userContext";
import { roles, tabs } from "../config.json";
import { TabContext } from "../contexts/tabContext";

function RequireAuth({ children, admin }) {
  const { checkIfExpired, authed } = useAuth();
  const isExpired = checkIfExpired();
  const { tab, changeTab } = useContext(TabContext);
  const navigateFunction = () => {
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
