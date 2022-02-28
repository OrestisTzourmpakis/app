import { Notifications, Settings, Menu } from "@material-ui/icons";

import TopbarSection from "./TopbarSection";
import { useState } from "react";
import { useAuth, UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tobar: {
    backgroundColor: "white",
    height: "60px",
    padding: "10px",
  },
  hamburgerMenu: {
    fontDisplay: "flex",
    alignSelf: "center",
    paddingLeft: "20px",
    transition: "all 0.2ms ease-out",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
    },
  },
  marginRightAndLeft: {
    marginRight: "10px",
    marginLeft: "10px",
  },
}));

export default function Topbar({ showMenu, toggle, setToggle }) {
  const classes = useStyles();
  const { authed } = useContext(UserContext);
  console.log("Sto topbar:", authed);
  const toggleTopbarSection = () => {
    setToggle(!toggle);
  };
  return (
    <Grid container>
      <TopbarSection hide={toggle} handleClick={setToggle} />
      <Box
        className={classes.hamburgerMenu}
        component={Grid}
        item
        xs={2}
        display={{ xs: "block", md: "none" }}
      >
        <div onClick={showMenu}>
          <Menu className={classes.hamubergerMenuIcon} />
        </div>
      </Box>
      <Grid item xs={10} md={12}>
        <Box
          style={{ padding: "10px", height: "60px", marginRight: "30px" }}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Notifications className={classes.marginRightAndLeft} />
          <Settings className={classes.marginRightAndLeft} />
          <Box
            display="flex"
            alignItems="center"
            style={{ cursor: "pointer" }}
            onClick={toggleTopbarSection}
          >
            <Avatar className={classes.marginRightAndLeft} />
            <Typography variant="body1">{authed.username}</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
