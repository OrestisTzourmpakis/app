import { LogoDev } from "@mui/icons-material";
import React from "react";
import MenuComponent from "./MenuComponent";
import "./Sidebar.css";
import { dashboardMenu } from "../../utilities/data";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarTitleWrapper">
        <LogoDev className="sidebarLogo" />
        <div className="sidebarTitle">SideBar</div>
      </div>
      <hr className="white" />
      <div className="menu">
        <MenuComponent items={dashboardMenu} />
      </div>
    </div>
  );
}
