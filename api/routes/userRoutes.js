const express = require("express");
const router = express.Router();
const { userClient } = require("../../services/user-service/src/client.js");

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  userClient.registerUser({ username, email, password }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response.success) {
        return res
          .status(200)
          .json({ success: true, message: response.message });
      } else {
        return res
          .status(200)
          .json({ success: false, message: response.message });
      }
    }
  });
});

router.post("/add-cart", (req, res) => {
  const { userId, itemId, itemName, price, quantity } = req.body;

  userClient.updateCart(
    { userId, itemId, itemName, price, quantity },
    (error, response) => {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        if (response.success) {
          return res
            .status(200)
            .json({ success: true, message: response.message });
        } else {
          return res
            .status(200)
            .json({ success: false, message: response.message });
        }
      }
    }
  );
});

router.get("/get-cart-items", (req, res) => {
  const userId = req.query.userId;

  userClient.getCartItems({ userId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response.items);
    }
  });
});

router.delete("/clear-cart", (req, res) => {
  const userId = req.query.userId;

  userClient.clearCart({ userId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.get("/retrieve-name", (req, res) => {
  const userId = req.query.userId;
  userClient.getUserName({ userId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
});

router.get("/retrieve-all-users", (req, res) => {
  userClient.getAllUsers({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });
});

module.exports = router;
