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

module.exports = router;
