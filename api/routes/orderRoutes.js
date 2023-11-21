const express = require("express");
const router = express.Router();
const { orderClient } = require("../../services/order-service/src/client.js");

router.post("/place", (req, res) => {
  console.log(req.body);
  orderClient.PlaceOrder(req.body, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

router.get("/retrieveById", (req, res) => {
  const { orderId } = req.query;
  orderClient.GetOrderDetails({ orderId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

router.get("/retrieveAll", (req, res) => {
  orderClient.GetAllOrderDetails({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

router.get("/retrieveOrderHistory", (req, res) => {
  const { userId } = req.query;
  orderClient.GetOrderHistory({ userId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

router.put("/updateOrderStatus", (req, res) => {
  const { orderId, newStatus } = req.body;
  orderClient.UpdateOrderStatus({ orderId, newStatus }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

module.exports = router;
