import React, { useState, useEffect, useContext } from "react";
import useSocket from "../../hooks/useSocket";
import { UserContext } from "../../contexts/UserContext";

import { placeOrder } from "../../services/orderService";

import {
  Typography,
  Box,
  Grid,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import "typeface-old-standard-tt"; // Import the font

const CheckoutForm = ({ cartItems, handleClearCart }) => {
  const { userId, userRole } = useContext(UserContext);
  const { socket } = useSocket(userId, userRole);
  const [alert, setAlert] = useState({
    severity: "",
    title: "",
    message: "",
  });
  const [orderDetails, setOrderDetails] = useState({
    userId: userId,
    orderItems: [],
    paymentMethod: "Credit Cart",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    promotionsApplied: [],
  });

  useEffect(() => {
    setOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      orderItems:
        cartItems &&
        cartItems.map((item) => {
          return {
            itemId: item.itemId,
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity,
          };
        }),
    }));
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the name is a nested property (e.g., 'deliveryAddress.street')
    if (name.includes(".")) {
      const [nestedProp, subProp] = name.split(".");

      setOrderDetails({
        ...orderDetails,
        [nestedProp]: {
          ...orderDetails[nestedProp],
          [subProp]: value,
        },
      });
    } else {
      setOrderDetails({
        ...orderDetails,
        [name]: value,
      });
    }
  };

  const handleOrderSubmit = async () => {
    try {
      const response = await placeOrder(orderDetails);
      if (response) {
        setAlert({
          severity: "success",
          title: "Success",
          message:
            "Thank you for your order! Your purchase has been successfully placed. You will receive a confirmation email shortly. If you have any questions or need further assistance, please don't hesitate to contact us. Enjoy your day!",
        });
        handleSendToServer({ orderId: response.orderId });
        handleClearCart();
      }
    } catch (error) {
      console.log("Error placing order. Try again!");
    }
  };

  const handleSendToServer = (data) => {
    // Send a message using the existing socket connection
    if (socket) {
      socket.emit("message", data);
    }
  };

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

      {alert.severity !== "" && (
        <Alert severity={alert.severity}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
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
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>City</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.city"
            value={orderDetails.deliveryAddress.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>State</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.state"
            value={orderDetails.deliveryAddress.state}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>Postal Code</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.postalCode"
            value={orderDetails.deliveryAddress.postalCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <label style={formLabelStyle}>Country</label>
          <input
            style={formInputStyle}
            type="text"
            name="deliveryAddress.country"
            value={orderDetails.deliveryAddress.country}
            onChange={handleInputChange}
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
          onClick={handleOrderSubmit}
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
