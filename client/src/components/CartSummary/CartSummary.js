import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const CartItem = ({ name, quantity, price }) => {
  const cartSumItemStyle = {
    height: "75px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
  };
  return (
    <Box style={cartSumItemStyle}>
      <Box
        sx={{
          backgroundColor: "#D9D9D9",
          height: "100%",
          width: "75px",
          borderRadius: "10px",
        }}
      ></Box>
      <Box ml={"10px"}>
        <Typography fontWeight={"bold"}>{name}</Typography>
        <Typography fontWeight={"bold"}>x{quantity}</Typography>
      </Box>
      <Box flex={1}></Box>

      <Box>
        <Typography
          variant={"h6"}
          fontWeight={"bold"}
          color={"rgba(62,39,35,0.51)"}
        >
          ${(price * quantity).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

const CartSummary = ({ cartItems, onClearCart }) => {
  const customFontStyle = {
    fontFamily: "Old Standard TT, serif", // Apply the font
  };

  return (
    <Box padding={"23px 40px 0"}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography
            sx={{ display: "inline-block" }}
            variant="h5"
            style={customFontStyle}
            color={"#3E2723"}
          >
            Cart Summary
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#3E2723",
              color: "#FFFFF0",
              borderRadius: "50%",
              textAlign: "center",
              display: "inline-block",
              width: "30px",
              height: "30px",
              marginLeft: "10px",
            }}
            variant="h6"
            style={customFontStyle}
          >
            {cartItems.length}
          </Typography>
        </div>
        {/* Clear Cart Button */}
        <IconButton
          onClick={onClearCart}
          sx={{
            backgroundColor: "#3E2723",
            color: "#FFFFF0",
            marginLeft: "10px",
            width: "30px",
            height: "30px",
          }}
        >
          <ClearIcon />
        </IconButton>
      </div>
      <Box
        height={"45vh"}
        overflow={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px", // Set the width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1", // Set the background color of the track
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888", // Set the color of the scrollbar thumb
            borderRadius: "6px", // Set the border radius of the thumb
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555", // Set the color of the thumb on hover
          },
        }}
      >
        {cartItems &&
          cartItems.map((item) => (
            <CartItem
              key={item.itemId}
              name={item.itemName}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
      </Box>
    </Box>
  );
};

export default CartSummary;
