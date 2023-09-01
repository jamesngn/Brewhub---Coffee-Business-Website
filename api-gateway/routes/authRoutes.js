const express = require("express");
const router = express.Router();

const path = require("path");
const authService = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "auth-service",
  "authService.js"
));

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  authService.loginUser(email, password, (response) => {
    if (response.success) {
      // If login is successful, generate a JWT and send it in a cookie
      const token = response.token;
      res.cookie("jwt", token, { httpOnly: true });
      return res.status(200).json({ success: true, message: response.message });
    } else {
      res.status(200).json({ success: false, message: response.message });
    }
  });
});

module.exports = router;
