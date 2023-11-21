import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import PromoManagementContainer from "../../containers/PromoManagement/PromoManagementCtn";

const PromoManagement = ({ userId, userRole }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <PromoManagementContainer userId={userId} userRole={userRole} />
    </Box>
  );
};

export default PromoManagement;
