import axios from "axios";
import config from "../config.json";

const addItemToCart = async (userId, itemId, itemName, price, quantity) => {
  try {
    const response = await axios.post(
      `http://${config.publicIpAddress}:5000/user/add-cart`,
      { userId, itemId, itemName, price, quantity }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart data:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

const getCartItems = async (userId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/user/get-cart-items`,
      { params: { userId: userId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting cart data:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

export { addItemToCart, getCartItems };
