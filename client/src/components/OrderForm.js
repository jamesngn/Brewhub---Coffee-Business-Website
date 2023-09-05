import React, { useState } from "react";
import axios from "axios";
import useSocket from "../hooks/useSocket";

const OrderForm = ({ userId, userRole }) => {
  const { socket } = useSocket(userId, userRole);
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState({
    userId: userId, // Replace with a valid user ID
    orderItems: [
      {
        itemId: "item1", // Replace with a valid menu item ID
        itemName: "Latte",
        quantity: 2,
        price: 4.99,
        subtotal: 9.98,
      },
      {
        itemId: "item2", // Replace with a valid menu item ID
        itemName: "Cappuccino",
        quantity: 1,
        price: 3.99,
        subtotal: 3.99,
      },
    ],
    paymentMethod: "Credit Card",
    deliveryAddress: {
      street: "123 Main St",
      city: "Exampleville",
      state: "CA",
      postalCode: "12345",
      country: "USA",
    },
    promotionsApplied: [
      {
        promoCode: "promo123", // Replace with a valid promotion code
        discountPercentage: 2.0, // Replace with the actual discount amount
      },
    ],
  });

  const handleOrderSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/order/place",
        order
      );
      if (response) {
        setMessage(
          `Order placed successfully! --> ${JSON.stringify(response.data)}`
        );
        handleSendToServer(JSON.stringify(response.data));
        console.log("Order placed:", response.data);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Error placing order. Please try again.");
    }
  };

  const handleSendToServer = (data) => {
    // Send a message using the existing socket connection
    if (socket) {
      socket.emit("message", data);
    }
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      {/* Include code for selecting menu items */}
      <div>...Item Content...</div>
      <div>
        <button onClick={handleOrderSubmit}>Place Order</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default OrderForm;
