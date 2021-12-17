import {
  Home,
  Store,
  PermIdentity,
  TrendingUp,
  Timeline,
  AttachMoney,
  BarChart,
  LogoDev,
} from "@mui/icons-material";
import React from "react";
import MenuComponent from "./MenuComponent";
import "./Sidebar.css";
import { tabs } from "../../config.json";

const dashboardMenu = [
  {
    id: 1,
    // icon: <Home />,
    icon: <Home className="menuTileIcon" />,
    title: "Dashboard",
    tab: tabs.Dashboard,
  },
  {
    id: 2,
    icon: <Timeline className="menuTileIcon" />,
    title: "Analytics",
    tab: tabs.Analytics,
  },
  {
    id: 3,
    icon: <TrendingUp className="menuTileIcon" />,
    title: "Sales",
    tab: tabs.Sales,
  },
  {
    id: 4,
    icon: <Store className="menuTileIcon" />,
    title: "Stores",
    tab: tabs.Stores,
  },
  {
    id: 5,
    icon: <PermIdentity className="menuTileIcon" />,
    title: "Users",
    tab: tabs.Users,
  },
  {
    id: 6,
    icon: <AttachMoney className="menuTileIcon" />,
    title: "Product Sales",
    tab: tabs["Product Sales"],
  },
  {
    id: 7,
    icon: <BarChart className="menuTileIcon" />,
    title: "Reports",
    tab: tabs.Reports,
  },
];

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
