import React, { useEffect, useState } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import useSocket from "../../hooks/useSocket";
import { OrderHistoryItem } from "../../components/OrderHistoryItem/OrderHistoryItem";
import { getOrderHistory } from "../../services/orderService";

const OrderHistoryCtn = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [orderHistoryItem, setOrderHistoryItem] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const changeOrderStatus = (orderId, newStatus) => {
    setOrderHistoryItem((prevOrderHistory) =>
      prevOrderHistory.map((order) =>
        order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
    setShowSnackbar(true); // Show the snackbar when order status changes
  };

  useEffect(() => {
    async function fetchOrderHistory() {
      const response = await getOrderHistory(userId);
      if (response) {
        setOrderHistoryItem(response);
      }
    }
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    if (response) {
      changeOrderStatus(response.orderId, response.newStatus);
    }
  }, [response]);

  return (
    <Box p={3} flex={1}>
      <Typography
        variant="h4"
        style={{
          fontSize: "1.7rem",
          fontWeight: "bold",
          color: "#4D4D4D",
        }}
      >
        Order history
      </Typography>
      {orderHistoryItem.length > 0 ? (
        orderHistoryItem.map((item, index) => (
          <OrderHistoryItem key={index} orderDetails={item} />
        ))
      ) : (
        <Typography mt={2} variant="body1">
          We regret to inform you that there is currently no available order
          history for your account. We appreciate your understanding and look
          forward to serving you in the future. If you have any inquiries or
          require assistance, please feel free to contact our customer support
          team. Thank you for choosing our coffee shop!
        </Typography>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Order status changed!" // Message to display
      />
    </Box>
  );
};

export { OrderHistoryCtn };
