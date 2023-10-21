import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import useSocket from "../../hooks/useSocket";
import { UserContext } from "../../contexts/UserContext";

const config = require("../../config.json");

const OrderForm = ({ selectedItems, handlePlaceOrder }) => {
  const { userId, userRole } = useContext(UserContext);
  const { socket } = useSocket(userId, userRole);
  const [message, setMessage] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    userId: userId,
    orderItems: [],
    paymentMethod: "",
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
      orderItems: selectedItems.map((selectedItem) => {
        return {
          itemId: selectedItem.itemId,
          itemName: selectedItem.itemName,
          quantity: selectedItem.quantity,
          price: selectedItem.price,
          subtotal: selectedItem.subtotal,
        };
      }),
    }));
  }, [selectedItems]);

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
    console.log("handleOrderSubmit: " + JSON.stringify(orderDetails));
    try {
      const response = await axios.post(
        `http://${config.publicIpAddress}:5000/order/place`,
        orderDetails
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

      <div>
        <label>
          Payment Method:
          <input
            type="text"
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Street:
          <input
            type="text"
            name="deliveryAddress.street"
            value={orderDetails.deliveryAddress.street}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          City:
          <input
            type="text"
            name="deliveryAddress.city"
            value={orderDetails.deliveryAddress.city}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          State:
          <input
            type="text"
            name="deliveryAddress.postalCode"
            value={orderDetails.deliveryAddress.postalCode}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Country:
          <input
            type="text"
            name="deliveryAddress.country"
            value={orderDetails.deliveryAddress.country}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleOrderSubmit}>Place Order</button>
      </div>

      <p>{message}</p>
    </div>
  );
};

export default OrderForm;
