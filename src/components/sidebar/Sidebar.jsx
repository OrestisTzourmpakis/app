import { Facebook } from "@material-ui/icons";
import React from "react";
import MenuComponent from "./MenuComponent";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: "100vh",
    backgroundColor: "rgb(57,67,87)",
    color: "rgb(120,130,146)",
  },
  sidebarTitle: {
    color: "white",
    padding: "20px",
  },
  divider: {
    border: "1px solid rgb(120,130,146)",
  },
  sidebarTitleWrapper: {
    display: "flex",
    alignItems: "center",
    marginLeft: "0px",
    height: "60px",
  },
  sidebarLogo: {
    color: "rgb(45,197,139)",
  },
  logo: {
    height: "60px",
    width: "60px",
  },
}));
export default function Sidebar({ menu }) {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarTitleWrapper}>
        {/* <Facebook className={classes.sidebarLogo} /> */}
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          className={classes.logo}
        />
        <Typography variant="h5" className={classes.sidebarTitle}>
          Loyalty Admin
        </Typography>
      </div>
      <hr className={classes.divider} />
      <div>
        <MenuComponent items={menu} />
      </div>
    </div>
  );
}
