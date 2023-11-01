import React from "react";
import { Box, Typography, Paper } from "@mui/material";
const OrderSummary = ({ subtotal, discounts, tax }) => {
  const customFontStyle = {
    fontFamily: "Old Standard TT, serif", // Apply the font
  };
  const orderSumItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  };
  return (
    <Box padding={"23px 40px 0"}>
      <Typography variant="h5" style={customFontStyle} color={"#3E2723"}>
        Order Summary
      </Typography>
      <Paper sx={{ marginTop: "10px", padding: "15px" }}>
        <Box sx={orderSumItemStyle}>
          <Typography variant="body2" fontWeight={"bold"}>
            Subtotal
          </Typography>
          <Typography variant="body2" fontWeight={"bold"}>
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={orderSumItemStyle}>
          <Typography variant="body2" fontWeight={"bold"} color={"#CD5C5C"}>
            Discounts
          </Typography>
          <Typography variant="body2" fontWeight={"bold"} color={"#CD5C5C"}>
            -$2.00
          </Typography>
        </Box>
        <Box sx={orderSumItemStyle}>
          <Typography variant="body2" fontWeight={"bold"}>
            Sales Tax
          </Typography>
          <Typography variant="body2" fontWeight={"bold"}>
            $1.00
          </Typography>
        </Box>
        <div
          style={{
            height: "2px",
            backgroundColor: "#3E2723",
            width: "100%",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        ></div>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight={"bold"}>
            TOTAL
          </Typography>
          <Typography variant="h5" fontWeight={"bold"}>
            ${(subtotal + discounts + tax).toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderSummary;
