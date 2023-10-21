import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import Sidebar from "../../components/Sidebar/Sidebar";

import useSocket from "../../hooks/useSocket";
import AddMenuItemForm from "../../components/AddMenuItemForm";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";
import Logout from "../../components/Logout";

import { getOrderDetails } from "../../services/orderService";

const Dashboard = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [newOrderList, setNewOrderList] = useState([]);
  useEffect(() => {
    //Retrieve order info by orderId
    async function FetchOrderById() {
      try {
        const orderId = JSON.parse(response).orderId;
        const orderDetails = await getOrderDetails(orderId);
        setNewOrderList((prevOrderList) => [...prevOrderList, orderDetails]);
        console.log(orderDetails);
      } catch (error) {
        console.error(error);
      }
    }
    FetchOrderById();
  }, [response]);

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
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="body1">
          Welcome to the Admin Dashboard !
        </Typography>
        <div>
          <strong>Server Message:</strong> {response}
        </div>
        <div>
          <h1>Order List</h1>
          <ul>
            {newOrderList.map((order, index) => (
              <li key={index}>
                <strong>Order ID:</strong> {order.orderId}
                <br />
                <strong>Customer Name:</strong> {order.userId}
                <br />
                <strong>Date & Time:</strong> {formatDate(order.orderDate)}
                <br />
                <strong>Order Status:</strong> {order.orderStatus}
                <br />
                <strong>Total Price:</strong> ${order.totalAmount}
                <br />
                <strong>Items:</strong>
                <ul>
                  {order.orderItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {item.itemName} - Price: ${item.price}, Quantity:{" "}
                      {item.quantity}, Subtotal: ${item.subtotal}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <AddMenuItemForm />
        <AddCategoryForm />
        <Logout />
      </Box>
    </Box>
  );
};

export default Dashboard;
