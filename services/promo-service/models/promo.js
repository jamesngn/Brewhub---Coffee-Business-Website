const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promoDocument = {
  promoCode: { type: String, unique: true },
  discountPercentage: Number,
  expirationDate: Date,
  description: String,
  isActive: Boolean,
};

const promoSchema = new Schema(promoDocument);

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;
