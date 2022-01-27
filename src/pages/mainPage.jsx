import React, { useState, useEffect } from "react";
import { TabContextProvider } from "../contexts/tabContext";
import { Grid, Box } from "@mui/material";
import Dashboard from "../pages/dashboard/Dashboard";
import Store from "../pages/stores/Store";
import LoginPage from "./login/LoginPage";
import { Close } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useMatch,
} from "react-router-dom";
import { TabbarSectionContextProvider } from "../contexts/tabbarSectionContext";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Stores from "../pages/stores/Stores";
import Profile from "./profile/Profile";
import { Link } from "react-router-dom";
import { tabs, formTypes, roles, formTemplates } from "../config.json";
import MenuTile from "../components/sidebar/MenuTile";
import { dashboardMenu } from "../utilities/data";
import RequireAuth from "../utilities/requireAuth";
import FormTemplate from "../components/common/formTemplate";
import Users from "./users/users";
import Company from "./companies/Company";
import UserPoints from "./users/userPoints";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import Sales from "./sales/sales";
import FormContextProvoder from "../contexts/formContext";
import { addCompany, updateCompany } from "../services/companyService";
import { addStore, updateStore } from "../services/storeService";
import { register, updateAccount } from "../services/userAccountService";
import {
  updatePoints,
  assignUserToCompany,
  addPoints,
  redeemPoints,
} from "../services/pointsService";
import { addSale, updateSale } from "../services/salesService";

function MainPage() {
  const [hide, setHide] = useState(true);
  const { setUserContextObject, isAdmin, authed, menu } =
    useContext(UserContext);
  // const [menu, setMenu] = useState([]);
  // if true hide topbar section
  const [toggleTopbarSection, setToggleTopbarSection] = useState(true);
  const hideMenu = () => {
    setHide(!hide);
  };
  useEffect(() => {
    console.log("hello there!!!");
    setUserContextObject();
  }, []);
  const handleClick = () => {
    if (!toggleTopbarSection) {
      setToggleTopbarSection(!toggleTopbarSection);
    }
  };
  return (
    <FormContextProvoder>
      <TabContextProvider>
        <TabbarSectionContextProvider>
          <div className="App">
            <div
              className={`mobileNavigation sidebarGrayBg ${
                hide ? "hideMenu" : ""
              }`}
            >
              <div className="mobileNavigationClose" onClick={hideMenu}>
                <Close className="mobileNavigationCloseIcon" />
              </div>
              <div className="mobileNavigationList">
                <ul className="sidebarLightGray">
                  {menu.map((item) => (
                    <li key={item.id} onClick={() => hideMenu()}>
                      <MenuTile item={item} mobile={true} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Grid container onClick={() => handleClick()}>
              <Box
                component={Grid}
                item
                md={2}
                display={{ xs: "none", md: "block" }}
              >
                <Sidebar menu={menu} />
              </Box>
              <Grid item md={10} xs={12} className="mainPageWithTopBar">
                <Grid container className="fullHeight">
                  <Grid item xs={12}>
                    <Topbar
                      showMenu={hideMenu}
                      toggle={toggleTopbarSection}
                      setToggle={setToggleTopbarSection}
                    />
                  </Grid>
                  <Grid item xs={12} className="mainPage fullHeight">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <RequireAuth>
                            <Dashboard />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="stores"
                        element={
                          <RequireAuth>
                            <Stores />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="companies"
                        element={
                          <RequireAuth admin={true}>
                            <Company />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="users"
                        element={
                          <RequireAuth>
                            <Users />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="sales"
                        element={
                          <RequireAuth>
                            <Sales />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="sales/:saleId"
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                title: "",
                                description: "",
                                image: "",
                                dateStart: 0,
                                dateEnd: 0,
                              }}
                              formType={formTypes.view}
                              updateMethod={updateSale}
                              formTemplate={formTemplates.sales}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="sales/add"
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                title: "",
                                description: "",
                                image: "",
                                dateStart: 0,
                                dateEnd: 0,
                                imageFile: null,
                              }}
                              formType={formTypes.add}
                              addMethod={addSale}
                              formTemplate={formTemplates.sales}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path="profile"
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                userName: "Orestis",
                                email: "otzurbakis13@gmail.com",
                              }}
                              formType={formTypes.view}
                            />
                          </RequireAuth>
                        }
                      />

                      <Route
                        path={`stores/:storeId`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                address: "",
                              }}
                              formType={formTypes.view}
                              addMethod={addStore}
                              updateMethod={updateStore}
                              formTemplate={formTemplates.stores}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`stores/assignUser`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                email: "",
                              }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.assignUser}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`stores/add`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                address: "",
                              }}
                              formType={formTypes.add}
                              addMethod={addStore}
                              updateMethod={updateStore}
                              formTemplate={formTemplates.stores}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`companies/add`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                name: "",
                                logo: "",
                                website: "",
                                twitter: "",
                                instagram: "",
                                facebook: "",
                                ownerEmail: "",
                                pointsToEuro: 0,
                                euroToPoints: 0,
                              }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.company}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`companies/:companyId`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                name: "",
                                logo: "",
                                website: "",
                                twitter: "",
                                instagram: "",
                                facebook: "",
                                pointsToEuro: 0,
                                euroToPoints: 0,
                              }}
                              formType={formTypes.view}
                              formTemplate={formTemplates.company}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`companies/:companyId/stores`}
                        element={
                          <RequireAuth>
                            <Stores />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`companies/:companyId/stores/add`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                address: "",
                              }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.stores}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`companies/:companyId/stores/assignUser`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                email: "",
                              }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.assignUser}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`companies/:companyId/stores/:storeId`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                address: "",
                              }}
                              formType={formTypes.view}
                              formTemplate={formTemplates.stores}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`users/add`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                userName: "",
                                email: "",
                                password: "",
                                owner: false,
                              }}
                              ignoreKeys={{ owner: "" }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.users}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`users/:userId`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                userName: "",
                                email: "",
                              }}
                              formType={formTypes.view}
                              formTemplate={formTemplates.users}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`users/userPoints/:userId`}
                        element={
                          <RequireAuth>
                            <UserPoints />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`users/userPoints/:userId/setPoints`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                euro: 0,
                              }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.addPoints}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`users/userPoints/:userId/redeemPoints`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                redeem: 0,
                              }}
                              formType={formTypes.add}
                              formTemplate={formTemplates.redeemPoints}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path={`users/userPoints/:userId/:companyId`}
                        element={
                          <RequireAuth>
                            <FormTemplate
                              data={{
                                total: "",
                              }}
                              formType={formTypes.view}
                            />
                          </RequireAuth>
                        }
                      />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </TabbarSectionContextProvider>
      </TabContextProvider>
    </FormContextProvoder>
  );
}

export default MainPage;
