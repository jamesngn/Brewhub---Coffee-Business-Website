import React from "react";
import { Box } from "@mui/material";

import Sidebar from "../../components/Sidebar/Sidebar";
import CategoryManagementContainer from "../../containers/CategoryManagement/CategoryManagementContainer";

const CategoryManagment = ({ userId, userRole }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <CategoryManagementContainer />
    </Box>
  );
};

export default CategoryManagment;
