import React, { useState, useEffect, useContext } from "react";
import useSocket from "../../hooks/useSocket";
import { UserContext } from "../../contexts/UserContext";

import {
  Typography,
  Box,
  Grid,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import "typeface-old-standard-tt"; // Import the font

const CheckoutForm = ({
  orderDetails,
  placeOrderMessage,
  onChangeOrderDetails,
  onPlaceOrder,
}) => {
  const customFontStyle = {
    fontFamily: "Old Standard TT, serif", // Apply the font
  };
  const formLabelStyle = {
    display: "block",
    fontFamily: "Old Standard TT, serif",
    fontWeight: "bold",
    color: "#3E2723",
  };
  const formInputStyle = {
    width: "90%",
    height: "30px",
    border: "1px solid #ccc",
    backgroundColor: "#D9D9D9",
    fontSize: "1rem",
    color: "#333333",
  };

  return (
    <Box sx={{ width: "65wh", padding: "23px 74px 0" }}>
      <Typography variant="h4" style={customFontStyle} color={"#3E2723"}>
        Checkout
      </Typography>
      <div
        className="line"
        style={{
          width: "100%",
          marginTop: "10px",
          height: "3px",
          backgroundColor: "#3E2723",
        }}
      ></div>

      {placeOrderMessage.severity !== "" && (
        <Alert severity={placeOrderMessage.severity}>
          <AlertTitle>{placeOrderMessage.title}</AlertTitle>
          {placeOrderMessage.message}
        </Alert>
      )}

      <Typography
        variant="h5"
        style={customFontStyle}
        sx={{ color: "#3E2723", marginTop: "20px" }}
      >
        1. Address
      </Typography>

      <Grid
        sx={{ marginTop: "0px" }}
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        <Grid item xs={6}>
          <label style={formLabelStyle}>Street</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.street"
            value={orderDetails.deliveryAddress.street}
            onChange={onChangeOrderDetails}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>City</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.city"
            value={orderDetails.deliveryAddress.city}
            onChange={onChangeOrderDetails}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>State</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.state"
            value={orderDetails.deliveryAddress.state}
            onChange={onChangeOrderDetails}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>Postal Code</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.postalCode"
            value={orderDetails.deliveryAddress.postalCode}
            onChange={onChangeOrderDetails}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>Country</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.country"
            value={orderDetails.deliveryAddress.country}
            onChange={onChangeOrderDetails}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: "30px", display: "flex", justifyContent: "space-around" }}>
        <Button
          sx={{
            backgroundColor: "#8B4513",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#A0522D" },
          }}
          variant="contained"
          onClick={onPlaceOrder}
        >
          PLACE ORDER
        </Button>
        <Button
          sx={{
            backgroundColor: "#CD5C5C",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#A52B2B" },
          }}
          variant="contained"
        >
          CANCEL ORDER
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
