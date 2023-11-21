import axios from "axios";
import config from "../config.json";

const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      `http://${config.publicIpAddress}:5000/user/register`,
      { username, email, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const retrieveUsername = async (userId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/user/retrieve-name`,
      { params: { userId: userId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving username:", error);
  }
};

const retrieveAllUsers = async () => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/user/retrieve-all-users`
    );
    return response.data.users;
  } catch (error) {
    console.error("Error retrieving all users:", error);
  }
};

const addPromoCode = async (userId, promoCodeId) => {
  try {
    const response = await axios.post(
      `http://${config.publicIpAddress}:5000/user/add-promo`,
      { userId, promoCodeId }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding promo code: ", error);
  }
};

const retrievePromoCodes = async (userId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/user/retrieve-promo-codes`,
      { params: { userId: userId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving promo codes: ", error);
  }
};

const removePromoCode = async (userId, promoCodeId) => {
  console.log(userId + " - " + promoCodeId);
  try {
    const response = await axios.delete(
      `http://${config.publicIpAddress}:5000/user/delete-promo`,
      { params: { userId, promoCodeId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting promo code: ", error);
  }
};

export {
  registerUser,
  retrieveUsername,
  retrieveAllUsers,
  addPromoCode,
  retrievePromoCodes,
  removePromoCode,
};
