const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoCodeUsageDocument = {
  _id: {
    type: "ObjectId",
    required: true,
    description: "A unique identifier for the promo code usage record.",
  },
  promoCode: {
    type: "ObjectId",
    required: true,
    description: "The ID of the promo code being used.",
  },
  orderID: {
    type: "ObjectId",
    required: true,
    description: "The ID of the order where the promo code was used.",
  },
  userID: {
    type: "ObjectId",
    required: true,
    description: "The ID of the user who used the promo code.",
  },
  discountAmount: {
    type: "Number",
    required: true,
    description: "The amount discounted by using the promo code.",
  },
  usageDate: {
    type: "Date",
    required: true,
    description: "The date and time when the promo code was used.",
  },
};

const promoCodeUsageSchema = new Schema(promoCodeUsageDocument);

const PromoCodeUsage = mongoose.model("PromoCodeUsage", promoCodeUsageSchema);

module.exports = PromoCodeUsage;
