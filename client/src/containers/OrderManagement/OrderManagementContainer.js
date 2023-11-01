import React, { useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import EnhancedTable from "../../components/OrderTable/OrderTable";
import useSocket from "../../hooks/useSocket";
import {
  getAllOrderDetails,
  getOrderDetails,
} from "../../services/orderService";
import { retrieveUsername } from "../../services/userService";

const OrderHeader = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h4" sx={{ color: "#006400", fontWeight: "bold" }}>
        O R D E R
      </Typography>
      {/* <Button
        variant="contained"
        sx={{
          backgroundColor: "#006400",
          fontSize: "1.5rem",
          fontWeight: "bold",
          paddingX: "1.5rem",
        }}
      >
        CREATE NEW
      </Button> */}
    </Box>
  );
};

const OrderSearch = () => {
  return (
    <Box sx={{ width: "100%", paddingY: "1rem" }}>
      <Paper
        width={"100%"}
        sx={{
          backgroundColor: "#D2B48C",
          borderRadius: "25px",
          padding: "1rem 3rem",
        }}
      >
        <Typography
          display={"block"}
          variant="h5"
          color={"#fffff0"}
          paddingY={"0.5rem"}
        >
          What are you looking for?
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          height={"2.5rem"}
        >
          <input
            type="text"
            style={{
              width: "80%",
              height: "90%",
              backgroundColor: "#D3D3D3",
              borderRadius: "25px",
              border: "none",
            }}
            placeholder="Seach for something"
          />
          <div style={{ flex: "0.5" }}></div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#CD5C5C", borderRadius: "25px", flex: 1 }}
          >
            SEARCH
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const OrderManagementContainer = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [orderDetailsList, setOrderDetailsList] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function FetchNewOrderDetails() {
      try {
        if (response.orderId) {
          const newOrderDetails = await getOrderDetails(response.orderId);

          setOrderDetailsList((prevOrderDetails) => {
            if (!Array.isArray(prevOrderDetails)) {
              prevOrderDetails = []; // Initialize as empty array if not already an array
            }
            return [newOrderDetails, ...prevOrderDetails];
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    FetchNewOrderDetails();
  }, [response]);

  React.useEffect(() => {
    //Retrieve order info by orderId
    async function FetchAllOrders() {
      try {
        const orderDetails = await getAllOrderDetails();
        setOrderDetailsList(orderDetails);
      } catch (error) {
        console.error(error);
      }
    }
    FetchAllOrders();
  }, []);

  //Processing rows data:
  React.useEffect(() => {
    async function GetUsername(userId) {
      try {
        const response = await retrieveUsername(userId);
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    }

    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date
        .getFullYear()
        .toString()
        .slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    function formatAddress(deliveryAddress) {
      return `${deliveryAddress.street}, ${deliveryAddress.postalCode}`;
    }

    function createData(
      orderId,
      customerName,
      dateTime,
      orderStatus,
      totalPrice,
      items,
      deliveryAddress
    ) {
      return {
        orderId,
        customerName,
        dateTime,
        orderStatus,
        totalPrice,
        items,
        deliveryAddress,
      };
    }

    if (orderDetailsList && orderDetailsList.length > 0) {
      const rowsData = orderDetailsList.map((order) => {
        const customerName = order.userId; // Assuming userId is the customer name
        const dateTime = formatDate(order.orderDate);
        const orderStatus = order.orderStatus;
        const totalPrice = order.totalAmount;
        const items = order.orderItems
          ? order.orderItems.map((item) => ({
              name: item.itemName,
              price: item.price,
              quantity: item.quantity,
              subtotal: item.subtotal,
            }))
          : [];
        const deliveryAddress = formatAddress(order.deliveryAddress);

        return createData(
          order.orderId,
          customerName,
          dateTime,
          orderStatus,
          totalPrice,
          items,
          deliveryAddress
        );
      });
      setRows(rowsData);
    }
  }, [orderDetailsList]);
  return (
    <Box sx={{ flex: "1", padding: "25px", backgroundColor: "#F5DEB3" }}>
      <OrderHeader />
      <OrderSearch />
      <EnhancedTable rows={rows} socket={socket} />
    </Box>
  );
};

export default OrderManagementContainer;
