import { Notifications, Settings } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./Topbar.css";
import { Grid, Box } from "@mui/material";
import TopbarSection from "./TopbarSection";

export default function Topbar() {
  return (
    <Grid container>
      <TopbarSection />
      <Box component={Grid} item xs={2} display={{ xs: "block", md: "none" }}>
        Hamburger menu
      </Box>
      <Grid item xs={10} md={12}>
        <div className="topbar">
          <div className="topbarWrapper">
            <Notifications className="topbarIcon" />
            <Settings className="topbarIcon" />
            <div className="topbarAvatarWrapper">
              <Avatar className="topbarAvatar" />
              <h4>Orestis</h4>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
