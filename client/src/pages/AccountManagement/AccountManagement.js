import React from "react";
import { Box } from "@mui/material";

import Sidebar from "../../components/Sidebar/Sidebar";
import AccountManagementContainer from "../../containers/AccountManagement/AccountManagementContainer";

const AccountManagment = ({ userId, userRole }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <AccountManagementContainer userId={userId} userRole={userRole} />
    </Box>
  );
};

export default AccountManagment;
