import React, { useContext } from "react";
import { ArrowForwardIos } from "@mui/icons-material";
import "./MenuTile.css";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link } from "react-router-dom";

export default function MenuTile({ item }) {
  console.log(item);
  // const { tab, changeTab } = useContext(TabContextProvider);
  const { tab, changeTab } = useContext(TabContext);
  let newTab;
  switch (item.tab) {
    case tabs.Dashboard:
      newTab = "/";
      break;
    case tabs.Stores:
      newTab = "/stores";
      break;
    case tabs.Analytics:
      newTab = "/analytics";
      break;
    case tabs["Product Sales"]:
      newTab = "/productSales";
      break;
    case tabs.Users:
      newTab = "/users";
      break;
    case tabs.Reports:
      newTab = "/reports";
      break;
    case tabs.Sales:
      newTab = "/sales";
      break;
    default:
      newTab = "/";
      break;
  }
  return (
    <Link
      to={newTab}
      className={`menuTileWrapper ${item.tab === tab && "active"}`}
      onClick={() => changeTab(item.tab)}
    >
      <div className="menuTileIconTitle">
        {/* <item.icon className="menuTileIcon" /> */}
        {item.icon}
        <div className="menuTileTitle">{item.title}</div>
      </div>
      <ArrowForwardIos className="menuTileArrow" />
    </Link>
  );
}
