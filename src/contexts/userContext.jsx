import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { roles, tabs } from "../config.json";
import {
  login,
  logout,
  checkIfExpired,
  setJwtUser,
  setUser,
  getUser,
} from "../services/userAccountService";
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
  const [menu, setMenu] = useState(dashboardMenu);

  useEffect(() => {
    if (isAdmin()) {
      setMenu(dashboardMenu.filter((c) => c.tab !== tabs.Stores));
    } else {
      setMenu(dashboardMenu.filter((c) => c.tab !== tabs.Companies));
    }
  }, [authed]);

  const userLogin = async (email, password) => {
    const userDetails = await login(email, password);
    const checkIfAdmin = userDetails.roles.filter(
      (c) => c === roles.Administrator || c === roles.CompanyOwner
    );
    if (checkIfAdmin.length === 0) throw "Access denied";
    setJwtUser(userDetails);
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
    setUser(userObject);
    setAuthed({ ...userObject, authed: true });
  };
  const setUserContextObject = () => {
    setAuthed({ ...getUser(), authed: true });
  };
  const isAdmin = () => {
    if (authed.role === roles.Administrator) {
      return true;
    } else {
      return false;
    }
  };

  return {
    authed,
    userLogin,
    logout,
    checkIfExpired,
    setUserContextObject,
    isAdmin,
    menu,
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
