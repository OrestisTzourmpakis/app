import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import { tabs } from "./config.json";
import { TabContext } from "./contexts/tabContext";
import MainPage from "./pages/mainPage";
import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import ExternalLoginPage from "./pages/login/externalLoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/external-login" element={<ExternalLoginPage />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
