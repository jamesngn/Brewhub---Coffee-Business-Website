// src/components/Unauthorized.js
import React from "react";
import { Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <div>
      <Typography variant="h4">Unauthorized Access</Typography>
      <Typography variant="body1">
        You do not have permission to access this page.
      </Typography>
    </div>
  );
};

export default Unauthorized;
