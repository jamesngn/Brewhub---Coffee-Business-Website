// validation/promoCodeValidator.js

const { calculateTotal } = require("../utils/orderUtils");

// Validate promoCode to orderDetails
function validatePromoCode(promoDetails, orderDetails) {
  const {
    minOrderAmount,
    limitedTimeOffer,
    specificProducts,
    specificCategories,
    specificUser,
  } = promoDetails.applicableTo;

  const { userId, orderItems } = orderDetails;

  // Check if promo code is active
  if (!promoDetails.active) {
    return { valid: false, message: "Promo code is not active." };
  }

  // Check if promo code has reached the maximum use limit
  if (promoDetails.usesRemaining <= 0) {
    return {
      valid: false,
      message: "Promo code has reached the maximum use limit.",
    };
  }

  // Check if promo code has expired (if applicable)
  const currentDate = new Date();
  if (
    limitedTimeOffer.startDate !== null &&
    limitedTimeOffer.endDate !== null &&
    (currentDate < new Date(limitedTimeOffer.startDate) ||
      currentDate > new Date(limitedTimeOffer.endDate))
  ) {
    return { valid: false, message: "Promo code has expired." };
  }

  // Check if promo code is applicable based on order total amount
  if (minOrderAmount !== 0) {
    const totalAmount = calculateTotal(orderItems);
    if (minOrderAmount > totalAmount) {
      return {
        valid: false,
        message: `Minimum order amount of $${minOrderAmount} required.`,
      };
    }
  }

  // Check if promo code is applied to specific user
  if (specificUser && specificUser.length > 0) {
    const orderedUserId = userId.toString(); // Convert to string
    if (!specificUser.includes(orderedUserId)) {
      return {
        valid: false,
        message: `Promo code is not applicable to you.`,
      };
    }
  }

  // Check if promo code applies to specific products
  if (specificProducts && specificProducts.length > 0) {
    const orderedProductIds = orderItems.map((item) => item.itemId.toString());

    // Check if at least one ordered product is in specific products
    if (
      !orderedProductIds.some((productId) =>
        specificProducts.includes(productId)
      )
    ) {
      return {
        valid: false,
        message: "Promo code is not applicable to any products in the order.",
      };
    }
  }

  return { valid: true, message: "Promo code is valid." };
}

module.exports = {
  validatePromoCode,
};
