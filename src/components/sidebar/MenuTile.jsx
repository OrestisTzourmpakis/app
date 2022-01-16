import React, { useContext } from "react";
import { ArrowForwardIos } from "@mui/icons-material";
import "./MenuTile.css";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link } from "react-router-dom";

export default function MenuTile({ item, mobile }) {
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
    case tabs.Companies:
      newTab = "/companies";
      break;
    default:
      newTab = "/";
      break;
  }

  let classes = mobile ? "" : "menuTileWrapper";
  let activeClass = mobile ? "" : "active";

  return (
    <Link
      to={newTab}
      className={`${classes} ${item.tab === tab && activeClass}`}
      onClick={() => changeTab(item.tab)}
    >
      <div className="menuTileIconTitle">
        {/* <item.icon className="menuTileIcon" /> */}
        {!mobile && item.icon}
        <div className="menuTileTitle">{item.title}</div>
      </div>
      {!mobile && <ArrowForwardIos className="menuTileArrow" />}
    </Link>
  );
}
