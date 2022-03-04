import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/userContext";
import { roles, tabs } from "../config.json";
import { TabContext } from "../contexts/tabContext";
import { UserContext } from "../contexts/userContext";
import { useEffect } from "react";

function RequireAuth({ children, admin }) {
  const { authed } = useContext(UserContext);
  const { changeTab } = useContext(TabContext);
  const navigateFunction = () => {
    if (admin && authed.role !== roles.Administrator) {
      changeTab(tabs.Dashboard);
      return;
    } else {
      return children;
    }
  };

  return authed.email !== "" ? navigateFunction() : "";
}

export default RequireAuth;
