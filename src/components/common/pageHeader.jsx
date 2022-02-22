import { Box, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function PageHeader({ hideBackArrow, children }) {
  const navigate = useNavigate();
  return (
    <>
      <Box display="flex" style={{ width: "100vw" }}>
        {!hideBackArrow && (
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        )}
        {children}
      </Box>
    </>
  );
}

export default PageHeader;
