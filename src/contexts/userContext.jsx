import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { roles, tabs } from "../config.json";
import { login, checkIfExpired, getUser } from "../services/userAccountService";
import { dashboardMenu } from "../utilities/data";

export function useAuth() {
  const [authed, setAuthed] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    authed: false,
    companyId: null,
  });

  // if we are admin
  const [companyOwnerEmail, setCompanyOwnerEmail] = useState(null);
  const [menu, setMenu] = useState(dashboardMenu);

  useEffect(() => {
    if (isAdmin()) {
      setMenu(
        dashboardMenu.filter(
          (c) => c.tab !== tabs.Stores && c.tab !== tabs.Sales
        )
      );
    } else {
      setMenu(
        dashboardMenu.filter(
          (c) => c.tab !== tabs.Companies && c.tab !== tabs.Categories
        )
      );
    }
  }, [authed]);

  const userLogin = async (model) => {
    const userDetails = await login(model);
    const checkIfAdmin = userDetails.roles.filter(
      (c) => c === roles.Administrator || c === roles.CompanyOwner
    );
    if (checkIfAdmin.length === 0) throw "Access denied";
    // setJwtUser(userDetails);
    const userRole = checkIfAdmin.includes(roles.Administrator)
      ? roles.Administrator
      : roles.CompanyOwner;
    // se the user here!!
    const userObject = {
      id: userDetails.id,
      username: userDetails.userName,
      email: userDetails.email,
      role: userRole,
      companyId: userDetails.companyId,
    };
    // setUser(userObject);
    setAuthed({ ...userObject, authed: true });
  };

  const userDetailObject = (userDetails) => {
    const check = userDetails.roles.filter(
      (c) => c === roles.Administrator || c === roles.CompanyOwner
    );
    const role = check.includes(roles.Administrator)
      ? roles.Administrator
      : roles.CompanyOwner;
    // se the user here!!
    const obj = {
      id: userDetails.id,
      username: userDetails.userName,
      email: userDetails.email,
      role: role,
      companyId: userDetails.companyId,
    };
    return obj;
  };

  const setUserContextObject = (response) => {
    setAuthed({ ...authed, ...response, authed: true });
  };
  const isAdmin = () => {
    if (authed.role === roles.Administrator) {
      return true;
    } else {
      return false;
    }
  };

  const changeCompanyOnwer = (email) => {
    setCompanyOwnerEmail(email);
  };

  return {
    authed,
    userLogin,
    setUserContextObject,
    isAdmin,
    menu,
    userDetailObject,
    setAuthed,
    companyOwnerEmail,
    changeCompanyOnwer,
  };
}

export const UserContext = createContext();
export function UserContextProvider(props) {
  const auth = useAuth();

  return (
    <UserContext.Provider value={{ ...auth }}>
      {props.children}
    </UserContext.Provider>
  );
}
