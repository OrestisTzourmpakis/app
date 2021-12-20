import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import { Grid, Box } from "@mui/material";
import Topbar from "./components/topbar/Topbar";
import LoginPage from "./pages/login/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import { useState, useContext } from "react";
import Stores from "./pages/stores/Stores";
import Store from "./pages/stores/Store";
import { tabs } from "./config.json";
import { TabContextProvider } from "./contexts/tabContext";
import { render } from "@testing-library/react";
import { TabContext } from "./contexts/tabContext";
import { TabbarSectionContextProvider } from "./contexts/tabbarSectionContext";

function App() {
  const logged = false;
  const activeTab = useState(tabs.Dashboard);
  const RenderRoute = (tab, Template) => {
    const { changeTab } = useContext(TabContext);
    changeTab(tab);
    return Template;
  };
  const handleClick = () => {};
  if (!logged) return <LoginPage />;
  return (
    <TabContextProvider>
      <TabbarSectionContextProvider>
        <Router>
          <div className="App">
            <Grid container onClick={() => handleClick()}>
              <Box
                component={Grid}
                item
                md={2}
                display={{ xs: "none", md: "block" }}
              >
                <Sidebar />
              </Box>
              <Grid item md={10} xs={12} className="mainPageWithTopBar">
                <Grid container className="fullHeight">
                  <Grid item xs={12}>
                    <Topbar />
                  </Grid>
                  <Grid item xs={12} className="mainPage fullHeight">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/stores" element={<Stores />} />
                      <Route path="/stores/:storeId" element={<Store />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Router>
      </TabbarSectionContextProvider>
    </TabContextProvider>
  );
}

export default App;
