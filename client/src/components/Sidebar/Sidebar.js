import React from "react";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RedeemIcon from "@mui/icons-material/Redeem";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { Typography, Box } from "@mui/material";

const menuItems = [
  {
    icon: (
      <DashboardIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
    ),
    link: "/admin/dashboard",
    name: "Dashboard",
  },
  {
    icon: (
      <ContentPasteIcon
        style={{ marginRight: "10px", verticalAlign: "middle" }}
      />
    ),
    link: "/admin/order",
    name: "Order",
  },
  {
    icon: (
      <AddBoxIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
    ),
    link: "/admin/menu",
    name: "Menu",
  },
  {
    icon: (
      <CategoryIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
    ),
    link: "/admin/category",
    name: "Category",
  },
  {
    icon: (
      <RedeemIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
    ),
    link: "/admin/promo-codes",
    name: "Promo Codes",
  },
  {
    icon: (
      <AccountBoxIcon
        style={{ marginRight: "10px", verticalAlign: "middle" }}
      />
    ),
    link: "/admin/account",
    name: "Account",
  },
  {
    icon: (
      <SummarizeIcon style={{ marginRight: "10px", verticalAlign: "middle" }} />
    ),
    link: "/admin/reports",
    name: "Reports",
  },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "250px",
        position: "sticky",
        top: "0",
        left: "0",
        backgroundColor: "#8B4513",
        boxSizing: "border-box",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #fff",
        }}
      >
        <Typography variant="h5" sx={{ wordSpacing: "5px" }}>
          B R E W H U B
        </Typography>
      </Box>
      <Box py={"2.5rem"}>
        <ul style={{ listStyleType: "none" }}>
          {menuItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "30px" }}>
              <Link
                to={item.link}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1.2em",
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "0px",
          width: "250px",
          borderTop: "2px solid #fff",
        }}
      >
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "1.2em",
              }}
              onClick={() => {
                localStorage.removeItem("authToken");
              }}
              to={"/"}
            >
              <LogoutIcon
                style={{ marginRight: "10px", verticalAlign: "middle" }}
              />
              Logout
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default Sidebar;
