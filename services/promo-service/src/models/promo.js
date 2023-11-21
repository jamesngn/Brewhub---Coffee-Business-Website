const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoCodeDocument = {
  _id: {
    type: "ObjectId",
    required: true,
    description:
      "A unique identifier for the promo code. Generated automatically.",
  },
  code: {
    type: "String",
    required: true,
    description: "The promo code string.",
  },
  discountType: {
    type: "String",
    enum: ["Percentage", "FixedAmount"],
    required: true,
    description: "Type of discount (percentage or fixed amount).",
  },
  discountValue: {
    type: "Number",
    required: true,
    description: "The value of the discount.",
  },
  applicableTo: {
    specificProducts: {
      type: ["ObjectId"],
      description: "Array of product IDs applicable to the promo code.",
    },
    specificCategories: {
      type: ["ObjectId"],
      description: "Array of category IDs applicable to the promo code.",
    },
    specificUser: {
      type: ["ObjectId"],
      description:
        "Array of User ID for whom the promo code is created (e.g., weekly blog winner).",
    },
    minOrderAmount: {
      type: "Number",
      default: 0,
      description: "Minimum order amount required to use the promo code.",
    },
    limitedTimeOffer: {
      type: "Object",
      startDate: { type: "Date", default: null },
      endDate: { type: "Date", default: null },
      description: "Date range for the limited-time offer.",
    },
  },
  active: {
    type: "Boolean",
    default: true,
    description: "Indicates whether the promo code is currently active.",
  },
  maxUses: {
    type: "Number",
    description: "Maximum number of times the promo code can be used.",
  },
  usesRemaining: {
    type: "Number",
    description: "The remaining number of times the promo code can be used.",
  },
  usedCountPerUser: {
    type: "Number",
    description: "Number of times the promo code has been used per use.",
  },
  createdBy: {
    type: "ObjectId",
    required: true,
    description: "User ID of the creator of the promo code.",
  },
  createdAt: {
    type: "Date",
    required: true,
    description: "Date when the promo code was created.",
  },
  updatedAt: {
    type: "Date",
    description: "Date when the promo code was last updated.",
  },
};

const promoSchema = new Schema(promoCodeDocument);

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;
