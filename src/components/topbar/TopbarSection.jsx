import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { AccountBox, Business, PowerSettingsNew } from "@material-ui/icons";
import { logOut } from "../../services/userService";

const useStyles = makeStyles((theme) => ({
  topbarSectionWrapper: {
    position: "fixed",
    height: "auto",
    padding: "0px",
    width: "200px",
    top: "60px",
    backgroundColor: "white",
    borderRadius: "0px 0px 5px 5px",
    right: "20px",
    zIndex: "999",
  },
  hideTopbarSection: {
    display: "none",
  },
}));

export default function TopbarSection({ hide, handleClick }) {
  const { authed, isAdmin } = useContext(UserContext);
  const [hideCompany, setHideCompany] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  useEffect(() => {
    if (authed.email === "") return;
    if (isAdmin()) {
      setHideCompany(true);
    } else {
      setHideCompany(false);
    }
  }, [authed]);
  const styles = clsx({
    [classes.topbarSectionWrapper]: true,
    [classes.hideTopbarSection]: hide,
  });
  const handleLogout = async () => {
    // clear local storage and then redirect to login page!!
    const result = await logOut();
    navigate("/login");
  };
  return (
    <>
      <Box className={styles}>
        <List component="nav">
          <ListItem button onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          {!hideCompany && (
            <ListItem button onClick={() => navigate("/mycompany")}>
              <ListItemIcon>
                <Business />
              </ListItemIcon>
              <ListItemText primary="My Company" />
            </ListItem>
          )}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </>
  );
}
