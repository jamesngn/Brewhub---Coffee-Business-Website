const express = require("express");
const router = express.Router();
const { orderClient } = require("../../services/order-service/src/client.js");

router.post("/place", (req, res) => {
  const {
    userId,
    orderItems,
    paymentMethod,
    deliveryAddress,
    promotionsApplied,
  } = req.body;
  orderClient.PlaceOrder(
    { userId, orderItems, paymentMethod, deliveryAddress, promotionsApplied },
    (error, response) => {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        if (response) {
          const {
            orderId,
            orderDate,
            totalAmount,
            orderStatus,
            paymentStatus,
          } = response;
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
    }
  );
});

module.exports = router;
