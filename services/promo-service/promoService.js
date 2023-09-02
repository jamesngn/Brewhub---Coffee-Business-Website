// orderService.js
const { promoClient } = require("./client");

function CreatePromotion(
  promoCode,
  discountPercentage,
  expirationDate,
  description,
  isActive,
  callback
) {
  const request = {
    promoCode,
    discountPercentage,
    expirationDate,
    description,
    isActive,
  };
  promoClient.CreatePromotion(request, (error, response) => {
    if (error) {
      // Handle the error and return an error response to the callback
      callback({ error: error.details });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

function GetPromotion(promoCode, callback) {
  const request = { promoCode };
  promoClient.GetPromotion(request, (error, response) => {
    if (error) {
      console.error("Error getting promotion code: " + error);
      // Handle the error and return an error response to the callback
      callback({ error: error.details });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

module.exports = {
  CreatePromotion,
  GetPromotion,
};
