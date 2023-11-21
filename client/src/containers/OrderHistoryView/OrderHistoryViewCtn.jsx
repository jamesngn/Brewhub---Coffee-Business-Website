import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // Import the icon
import "./OrderHistoryViewCtn.css";
import { getOrderDetails } from "../../services/orderService";

const OrderHistoryViewItem = (props) => {
  const { orderItem } = props;
  console.log(orderItem);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: "#D9D9D9",
            height: "75px",
            width: "75px",
          }}
        ></div>
        <div style={{ width: "1vw" }}></div>
        <div>
          <Typography
            sx={{
              display: "inline-block",
              color: "#4D4D4D",
              fontWeight: "bold",
            }}
          >
            {orderItem.itemName}
          </Typography>
          <Typography sx={{ color: "#4D4D4D", fontWeight: "bold" }}>
            x{orderItem.quantity}
          </Typography>
        </div>
      </div>
      <div style={{ color: "#4D4D4D", fontWeight: "bold", fontSize: "1.2rem" }}>
        ${orderItem.price * orderItem.quantity}
      </div>
    </div>
  );
};

const OrderAddressDetails = ({ address }) => {
  return (
    <>
      <Typography sx={{ color: "#4D4D4D" }}>{address.street}</Typography>
      <Typography sx={{ color: "#4D4D4D" }}>
        {address.city} {address.state}, {address.postalCode}
      </Typography>
    </>
  );
};

const OrderItemList = ({ orderItems }) => {
  return orderItems.map((item, index) => (
    <OrderHistoryViewItem key={index} orderItem={item} />
  ));
};

const OrderHistoryViewCtn = (props) => {
  const { orderId } = props;
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    async function fetchOrderDetails() {
      const response = await getOrderDetails(orderId);
      setOrderDetails(response);
    }
    fetchOrderDetails();
  }, [orderId]);

  return (
    <Box p={3} flex={1}>
      <Typography
        variant="h4"
        sx={{
          fontSize: "1.7rem",
          fontWeight: "bold",
          color: "#4D4D4D",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to={`/account/order-history`}
          style={{ textDecoration: "none", color: "#4D4D4D" }}
        >
          Order history
        </Link>
        <ArrowForwardIcon /> {orderId}
      </Typography>

      <Box sx={{ backgroundColor: "#F8D5B4", p: "1rem", mt: "1rem" }}>
        <Typography
          sx={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4D4D4D" }}
        >
          Your order status is {orderDetails.orderStatus}
        </Typography>
        {orderDetails.deliveryAddress && (
          <OrderAddressDetails address={orderDetails.deliveryAddress} />
        )}
        {orderDetails.orderItems && (
          <OrderItemList orderItems={orderDetails.orderItems} />
        )}
      </Box>

      <Box sx={{ display: "flex" }}>
        <div style={{ flex: "1.4" }}></div>
        <Box sx={{ flex: "1" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.2rem",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>Subtotal</Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>
              ${orderDetails && orderDetails.totalAmount}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.2rem",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>Shipping</Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>FREE</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.2rem",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>Sales Tax</Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>
              ${orderDetails && (orderDetails.taxAmount + 0).toFixed(2)}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#CD5C5C",
              marginTop: "1.2rem",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>Discount</Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>
              -${(orderDetails.totalDiscountedAmount + 0).toFixed(2)}
            </Typography>
          </div>
          <div
            style={{
              height: "2px",
              width: "100%",
              backgroundColor: "black",
              marginTop: "1.2rem",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.2rem",
            }}
          >
            <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold" }}>
              Total
            </Typography>
            <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold" }}>
              $
              {orderDetails &&
                (
                  orderDetails.totalAmount +
                  orderDetails.taxAmount -
                  orderDetails.totalDiscountedAmount
                ).toFixed(2)}
            </Typography>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderHistoryViewCtn;
