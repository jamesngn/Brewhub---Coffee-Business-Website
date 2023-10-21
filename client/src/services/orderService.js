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

export { placeOrder, getOrderDetails, getAllOrderDetails };
