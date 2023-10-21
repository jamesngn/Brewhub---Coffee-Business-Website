import React from "react";
import OrderManagementContainer from "../../containers/OrderManagement/OrderManagementContainer";
import { Box } from "@mui/material";

import Sidebar from "../../components/Sidebar/Sidebar";

const OrderManagment = ({ userId, userRole }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <OrderManagementContainer userId={userId} userRole={userRole} />
    </Box>
  );
};

export default OrderManagment;
