const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      menuItemId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: { type: String, enum: ["cart", "completed"], default: "cart" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
