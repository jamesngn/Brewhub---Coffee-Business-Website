import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import Sidebar from "../../components/Sidebar/Sidebar";

import useSocket from "../../hooks/useSocket";
import ChartComponent from "../../components/Chart/MyChart";
import MainDash from "../../components/MainDash/MainDash";
import RightSide from "../../components/RigtSide/RightSide";

const Dashboard = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [newOrderList, setNewOrderList] = useState([]);

  const handleSend = (data) => {
    // Send a message using the existing socket connection
    if (socket) {
      socket.emit("message", data);
    }
  };

  function formatDate(dateString) {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Australia/Sydney",
    };

    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString("en-AU", options)
      .replace(",", "")
      .replace(/\//g, "-");

    return formattedDate;
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F5DEB3" }}>
      <Sidebar />
      <MainDash />
    </Box>
  );
};

export default Dashboard;
