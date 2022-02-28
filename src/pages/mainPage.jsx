import React, { useState, useEffect, useContext } from "react";
import { TabContextProvider } from "../contexts/tabContext";
import { Grid, Box } from "@material-ui/core";
import { TabbarSectionContextProvider } from "../contexts/tabbarSectionContext";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { UserContext } from "../contexts/userContext";
import FormContextProvoder from "../contexts/formContext";
import { createRoutes } from "../routes";
import MobileNavigation from "../components/mobileNavigation";
import { authenticateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [hide, setHide] = useState(true);
  const routes = createRoutes();
  const navigate = useNavigate();
  const { setUserContextObject, userDetailObject, menu, authed, setAuthed } =
    useContext(UserContext);
  const [toggleTopbarSection, setToggleTopbarSection] = useState(true);
  const hideMenu = () => {
    setHide(!hide);
  };

  useEffect(() => {
    const Init = async () => {
      //console.log("Main Page called");
      // call the server to get the data and save the user after that!!
      console.log("Inside the main page useeffect");
      if (authed.email === "") {
        console.log("Authed email does not exists get it!!!");
        try {
          const response = await authenticateUser();
          if (response.roles.length === 0) throw "asdfasdf";
          const obj = userDetailObject(response);
          console.log("To response apo to authenticate user!!!", response);
          setAuthed({ ...obj });
          return;
        } catch (ex) {
          console.log("error");
          console.log("Error sto authenticate user:", ex);
          navigate("/login");
        }
      }
      //navigate("/login");
    };
    Init();
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
          <MobileNavigation hide={hide} hideMenu={hideMenu} menu={menu} />
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
                  {routes}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabbarSectionContextProvider>
      </TabContextProvider>
    </FormContextProvoder>
  );
}

export default MainPage;
