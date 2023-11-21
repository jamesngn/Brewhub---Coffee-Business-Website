import axios from "axios";
import config from "../config.json";

const applyPromotionCode = async (promoCode, userId, orderItems) => {
  console.log(orderItems);
  try {
    const response = await axios.put(
      `http://${config.publicIpAddress}:5000/promo/appy-promotion`,
      { promoCode, userId, orderItems }
    );
    return response.data;
  } catch (error) {
    console.error("Error applying promotion user:", error);
  }
};

const retrieveAllPromoDetails = async () => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/promo//retrieve-all-promotions`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving all promo details: ", error);
  }
};

const retrievePromoDetailsByCode = async (promoCode) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/promo/retrieve-promotion-by-code`,
      { params: { id: promoCode } }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving promo details by code: ", error);
  }
};

const retrievePromoDetailsById = async (promoId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/promo/retrieve-promotion-by-id`,
      { params: { id: promoId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving promo details by id: ", error);
  }
};

export {
  applyPromotionCode,
  retrieveAllPromoDetails,
  retrievePromoDetailsByCode,
  retrievePromoDetailsById,
};
