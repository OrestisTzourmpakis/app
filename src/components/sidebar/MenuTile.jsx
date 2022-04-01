import React, { useContext } from "react";
import { ArrowForwardIos } from "@material-ui/icons";
import { TabContext } from "../../contexts/tabContext";
import { tabs } from "../../config.json";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuTileWrapper: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    color: "rgb(120, 130, 146)",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "rgb(48,57,75)",
      borderLeft: "3px solid rgb(45,197,139)",
      color: "white",
    },
  },
  menuTileIconTitle: {
    display: "flex",
    alignItems: "center",
  },
  menuTileIcon: {
    marginRight: "10px",
  },
  active: {
    color: "white",
    backgroundColor: "rgb(48,57,75)",
    borderLeft: "3px solid rgb(45,197,139)",
  },
  activeMobile: {
    color: "white",
    borderLeft: "3px solid rgb(45,197,139)",
  },
  menuTileWrapperMobile: {
    display: "flex",
    alignItems: "center",
    color: "rgb(120,130,146)",
    textDecoration: "none",
  },
}));

export default function MenuTile({ item, mobile }) {
  const classes = useStyles();
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
    case tabs.Categories:
      newTab = "/categories";
      break;
    default:
      newTab = "/";
      break;
  }

  let styles = clsx({
    [classes.menuTileWrapper]: !mobile,
    [classes.active]: item.tab === tab && !mobile,
  });

  return (
    <Link to={newTab} className={styles} onClick={() => changeTab(item.tab)}>
      <div className={classes.menuTileIconTitle}>
        {/* <item.icon className="menuTileIcon" /> */}
        {!mobile && item.icon}
        <div className={classes.menuTileTitle}>{item.title}</div>
      </div>
      {!mobile && <ArrowForwardIos className="menuTileArrow" />}
    </Link>
  );
}
