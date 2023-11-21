const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDocument = {
  _id: {
    type: "ObjectId",
    required: true,
    description: "A unique identifier for the order. Generated automatically.",
  },
  userId: {
    type: "ObjectId",
    required: true,
    description: "The ID of the user who placed the order.",
  },
  orderDate: {
    type: "Date",
    required: true,
    description:
      "The date and time when the order was placed. Automatically recorded upon order creation.",
  },
  orderItems: {
    type: "Object",
    required: true,
    description:
      "An array of objects representing the menu items ordered by the user.",
    items: {
      itemId: {
        type: "ObjectId",
        required: true,
        description: "The ID of the menu item ordered.",
      },
      itemName: {
        type: "String",
        required: true,
        description: "The name of the menu item.",
      },
      quantity: {
        type: "Number",
        required: true,
        description: "The quantity of the menu item ordered.",
      },
      price: {
        type: "Number",
        required: true,
        description: "The price of a single unit of the menu item.",
        set: (value) => parseFloat(value.toFixed(2)),
      },
      subtotal: {
        type: "Number",
        required: true,
        description: "The subtotal for this menu item (quantity * price).",
        set: (value) => parseFloat(value.toFixed(2)),
      },
      discountedValue: {
        type: "Number",
        requied: true,
        default: 0,
        description:
          "The discounted total for this menu item (discounted_value).",
        set: (value) => parseFloat(value.toFixed(2)),
      },
    },
  },
  totalAmount: {
    type: "Number",
    required: true,
    description:
      "The total amount for the order, including all ordered items and discounts.",
    set: (value) => parseFloat(value.toFixed(2)),
  },
  totalDiscountedAmount: {
    type: "Number",
    required: true,
    default: 0,
    description:
      "The discounted total amount for the order, including all ordered items and discounts.",
    set: (value) => parseFloat(value.toFixed(2)),
  },
  taxAmount: {
    type: "Number",
    required: true,
    default: 0,
    description:
      "The tax amount for the order, including all ordered items and discounts.",
    set: (value) => parseFloat(value.toFixed(2)),
  },
  orderStatus: {
    type: "String",
    required: true,
    enum: ["Pending", "Processing", "Delivered", "Cancelled"],
    description:
      "The current status of the order. Possible values include 'Pending', 'Processing', 'Delivered', and 'Cancelled'.",
  },
  paymentStatus: {
    type: "String",
    required: true,
    enum: ["Paid", "Unpaid"],
    description:
      "The payment status of the order. Possible values include 'Paid' and 'Unpaid'.",
  },
  paymentMethod: {
    type: "String",
    required: true,
    description:
      "The payment method used for the order (e.g., 'Credit Card', 'Cash on Delivery').",
  },
  deliveryAddress: {
    type: "Object",
    required: true,
    description: "The delivery address where the order should be delivered.",
    properties: {
      street: {
        type: "String",
        required: true,
        description: "The street address.",
      },
      city: {
        type: "String",
        required: true,
        description: "The city.",
      },
      state: {
        type: "String",
        required: true,
        description: "The state or province.",
      },
      postalCode: {
        type: "String",
        required: true,
        description: "The postal code or ZIP code.",
      },
      country: {
        type: "String",
        required: true,
        description: "The country.",
      },
    },
  },
  promoCodeUsed: {
    type: "String",
    default: "",
    description: "The ID of the promo code used for the order.",
  },
};

const orderSchema = new Schema(orderDocument);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
