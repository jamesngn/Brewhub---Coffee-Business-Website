import React from "react";
import MenuManagementContainer from "../../containers/MenuManagement/MenuManagementContainer";
import { Box } from "@mui/material";

import Sidebar from "../../components/Sidebar/Sidebar";

const MenuManagment = ({ userId, userRole }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <MenuManagementContainer userId={userId} userRole={userRole} />
    </Box>
  );
};

export default MenuManagment;
