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
    if (admin && authed.role !== roles.Administrator) {
      changeTab(tabs.Dashboard);
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  };
  return isExpired ? navigateFunction() : <Navigate to="/login" replace />;
}

export default RequireAuth;
