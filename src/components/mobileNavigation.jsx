import { makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import MenuTile from "./sidebar/MenuTile";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  mobileNavigation: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    zIndex: "999",
    "& ul li": {
      padding: "20px",
      fontSize: "20px",
      fontWeight: "bold",
      letterSpacing: "2px",
      borderRadius: "5px",
      listStyle: "none",
    },
    "& ul li a": {
      textDecoration: "none",
      color: "inherit",
    },
    "& ul li:hover": {
      backgroundColor: "rgb(45, 197, 139)",
      cursor: "pointer",
      color: "white",
    },
  },
  mobileNavigationList: {
    display: "flex",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileNavigationClose: {
    boxShadow: "5px 5px 15px 5px rgb(45, 197, 139)",
    display: "inline-block",
    margin: "20px",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    transition: "all 0.2ms ease-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  mobileNavigationCloseIcon: {
    color: "white",
    transition: "all 0.2ms ease-out",
  },
  hideMenu: {
    display: "none",
  },
  sidebarGrayBg: {
    backgroundColor: "rgb(58,67,87)",
  },
}));

function MobileNavigation({ hide, hideMenu, menu }) {
  const classes = useStyles();
  const styles = clsx({
    [classes.mobileNavigation]: true,
    [classes.hideMenu]: hide,
    [classes.sidebarGrayBg]: true,
  });
  return (
    <>
      <div className={styles}>
        <div className={classes.mobileNavigationClose} onClick={hideMenu}>
          <Close className={classes.mobileNavigationCloseIcon} />
        </div>
        <div className={classes.mobileNavigationList}>
          <ul className={classes.sidebarLightGray}>
            {menu.map((item) => (
              <li key={item.id} onClick={() => hideMenu()}>
                <MenuTile item={item} mobile={true} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MobileNavigation;
