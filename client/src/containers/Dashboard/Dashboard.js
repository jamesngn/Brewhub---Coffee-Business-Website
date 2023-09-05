import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import useSocket from "../../hooks/useSocket";

const Dashboard = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole); // Use the useSocket hook

  const handleSend = (data) => {
    // Send a message using the existing socket connection
    if (socket) {
      socket.emit("message", data);
    }
  };

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">Welcome to the Admin Dashboard !</Typography>

      <div>
        <strong>Server Message:</strong> {response}
      </div>
    </div>
  );
};

export default Dashboard;
