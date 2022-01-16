import { Notifications, Settings, Menu } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Topbar.css";
import { Grid, Box } from "@mui/material";
import TopbarSection from "./TopbarSection";
import { useState } from "react";
import { useAuth, UserContext } from "../../contexts/userContext";
import { useContext } from "react";
export default function Topbar({ showMenu, toggle, setToggle }) {
  const { authed } = useContext(UserContext);
  const toggleTopbarSection = () => {
    setToggle(!toggle);
  };
  return (
    <Grid container>
      <TopbarSection hide={toggle} handleClick={setToggle} />
      <Box
        className="hamubergerMenu"
        component={Grid}
        item
        xs={2}
        display={{ xs: "block", md: "none" }}
      >
        <div onClick={showMenu}>
          <Menu className="hamubergerMenuIcon" />
        </div>
      </Box>
      <Grid item xs={10} md={12}>
        <div className="topbar">
          <div className="topbarWrapper">
            <Notifications className="topbarIcon" />
            <Settings className="topbarIcon" />
            <div className="topbarAvatarWrapper" onClick={toggleTopbarSection}>
              <Avatar className="topbarAvatar" />
              <h4 className="userName">{authed.username}</h4>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
