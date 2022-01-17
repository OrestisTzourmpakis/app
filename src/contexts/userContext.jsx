import React, { createContext, useState } from "react";
import { roles } from "../config.json";
import {
  login,
  logout,
  checkIfExpired,
  setJwtUser,
  setUser,
  getUser,
} from "../services/userAccountService";

export function useAuth() {
  const [authed, setAuthed] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
    authed: false,
  });
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
    };
    setUser(userObject);
    setAuthed({ ...userObject, authed: true });
  };
  const setUserContextObject = () => {
    setAuthed({ ...getUser(), authed: true });
  };

  return {
    authed,
    userLogin,
    logout,
    checkIfExpired,
    setUserContextObject,
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
