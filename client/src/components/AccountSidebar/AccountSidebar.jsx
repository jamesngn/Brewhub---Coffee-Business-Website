import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const AccountSidebar = () => {
  const [hoverItem, setHoverItem] = useState(null);

  const handleHover = (index) => {
    setHoverItem(index);
  };

  const handleMouseLeave = () => {
    setHoverItem(null);
  };

  const location = useLocation();

  const sidebarData = [
    {
      title: "Profile",
      link: "account/profile",
    },

    {
      title: "Address and Phone",
      link: "account/address-and-phone",
    },
    {
      title: "Payments",
      link: "account/payment",
    },
    {
      title: "Promo Code",
      link: "account/promo-code",
    },
    {
      title: "Order History",
      link: "account/order-history",
    },
    {
      title: "Saved Orders",
      link: "account/saved-orders",
    },
  ];

  return (
    <Box
      sx={{
        height: "calc(100vh - 68.5px)",
        width: "20vw",
        backgroundColor: "#F4BF96",
        position: "sticky",
        left: "0",
        top: "68.5px",
      }}
    >
      <Box sx={{ textAlign: "left", pt: 2, pl: 2, fontSize: "1.1rem" }}>
        <h2>Your Account</h2>
      </Box>
      <List>
        {sidebarData.map((item, index) => (
          <ListItemButton
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleMouseLeave}
            sx={{
              backgroundColor:
                location.pathname === `/${item.link}` ? "#8B4513" : "initial",
            }}
          >
            <ListItemText>
              <Typography
                variant="h6"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color:
                    location.pathname === `/${item.link}`
                      ? "#FFFFFF"
                      : "#8B4513",
                }}
              >
                {item.title}
              </Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default AccountSidebar;
