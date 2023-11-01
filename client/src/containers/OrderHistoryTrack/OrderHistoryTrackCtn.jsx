import React from "react";
import { LinearProgress, Typography, Box } from "@mui/material";

import "./TrackingOrderProgress.css"; // Create a CSS file for styling

const TrackingOrderProgress = ({ status }) => {
  let progressValue = 0;

  switch (status) {
    case "Pending":
      progressValue = 36;
      break;
    case "Processing":
      progressValue = 50;
      break;
    case "Delivered":
      progressValue = 75;
      break;
    case "Cancelled":
      progressValue = 100;
      break;
    default:
      progressValue = 0;
  }

  return (
    <Box className="tracking-progress">
      <Typography variant="h6">Order Status</Typography>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{ height: 10, borderRadius: 5 }}
        className="progress-bar"
      />
      <Box className="progress-labels">
        <Typography>Order Placed</Typography>
        <Typography>Processing</Typography>
        <Typography>Out for Delivery</Typography>
        <Typography>Delivered</Typography>
      </Box>
    </Box>
  );
};

const OrderHistoryTrackCtn = () => {
  return (
    <div style={{ flex: "1", padding: "2rem" }}>
      <TrackingOrderProgress status={"Pending"} />
    </div>
  );
};

export default OrderHistoryTrackCtn;
