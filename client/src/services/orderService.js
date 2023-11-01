import axios from "axios";
import config from "../config.json";

const placeOrder = async (orderDetails) => {
  try {
    const response = await axios.post(
      `http://${config.publicIpAddress}:5000/order/place`,
      orderDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
  }
};

const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/order/retrieveById`,
      { params: { orderId: orderId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving order:", error);
  }
};

const getAllOrderDetails = async () => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/order/retrieveAll`
    );
    return response.data.orderDetailsList;
  } catch (error) {
    console.error("Error retrieving order:", error);
  }
};

const getOrderHistory = async (userId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/order/retrieveOrderHistory`,
      { params: { userId: userId } }
    );
    return response.data.orders;
  } catch (error) {
    console.error("Error retrieving order history:", error);
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.put(
      `http://${config.publicIpAddress}:5000/order/updateOrderStatus`,
      { orderId, newStatus }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

export {
  placeOrder,
  getOrderDetails,
  getAllOrderDetails,
  getOrderHistory,
  updateOrderStatus,
};
