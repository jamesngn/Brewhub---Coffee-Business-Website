const express = require("express");
const router = express.Router();

const path = require("path");
const orderService = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "order-service",
  "orderService.js"
));

router.post("/place", (req, res) => {
  const {
    userId,
    orderItems,
    paymentMethod,
    deliveryAddress,
    promotionsApplied,
  } = req.body;
  orderService.PlaceOrder(
    userId,
    orderItems,
    paymentMethod,
    deliveryAddress,
    promotionsApplied,
    (response) => {
      if (response) {
        const { orderId, orderDate, totalAmount, orderStatus, paymentStatus } =
          response;
        return res.status(200).json({
          orderId,
          orderDate,
          totalAmount,
          orderStatus,
          paymentStatus,
        });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
});

module.exports = router;
