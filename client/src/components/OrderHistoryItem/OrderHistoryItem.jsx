import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderHistoryItem = (props) => {
  const { orderDetails } = props;
  const headingStyle = {
    color: "#4D4D4D",
    fontWeight: "bold",
    marginBottom: "2px",
  };
  const headingValueStyle = {
    color: "#4D4D4D",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const btnStyle = {
    color: "#4D4D4D",
    fontSize: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#FFF4E0",
    border: "2px solid #4D4D4D",
    letterSpacing: "1px",
    width: "13rem",
    transition: "background-color 0.3s ease",
    cursor: "pointer",

    "&:hover": {
      color: "#FFF4E0",
      backgroundColor: "#8B4513",
    },
  };
  function formatDate(dateString) {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${formattedDate} ${day} ${month}, ${year}`;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F8D5B4",
        width: "calc(100% - 8rem)",
        my: "1.5rem",
        p: "1rem 4rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography sx={headingStyle}>ORDER STATUS:</Typography>
          <Typography sx={headingValueStyle}>
            {orderDetails.orderStatus.toUpperCase()}
          </Typography>
        </div>
        <div>
          <Typography sx={headingStyle}>ORDER NO.:</Typography>
          <Typography sx={headingValueStyle}>{orderDetails.orderId}</Typography>
        </div>
        <div>
          <Typography sx={headingStyle}>ORDER DATE:</Typography>
          <Typography sx={headingValueStyle}>
            {formatDate(orderDetails.orderDate)}
          </Typography>
        </div>
      </div>
      <div
        className="line"
        style={{ backgroundColor: "#4D4D4D", height: "2px", marginTop: "2rem" }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "9rem",
        }}
      >
        <div></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Link
            to={`/account/order-history/view/${orderDetails.orderId}`}
            style={{
              textDecoration: "none",
              color: "#4D4D4D",
            }}
          >
            <Button sx={btnStyle}>VIEW ORDER</Button>
          </Link>
          <Link
            to={`/account/order-history/track/${orderDetails.orderId}`}
            style={{
              textDecoration: "none",
              color: "#4D4D4D",
            }}
          >
            <Button sx={btnStyle}>TRACK ORDER</Button>
          </Link>
        </div>
      </div>
    </Box>
  );
};
export { OrderHistoryItem };
