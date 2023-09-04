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

const authMiddleware = require(path.join(
  __dirname,
  "..",
  "..",
  "middleware",
  "authMiddleware"
));

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  authService.loginUser(email, password, (response) => {
    if (response.success) {
      // If login is successful, generate a JWT and send it in a cookie
      const token = response.token;
      return res.status(200).json({
        success: true,
        message: response.message,
        token: response.token,
      });
    } else {
      res.status(200).json({ success: false, message: response.message });
    }
  });
});

router.get("/user", authMiddleware.authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

router.get("/user/role", authMiddleware.authenticateUser, async (req, res) => {
  try {
    const role = req.user.role;
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

module.exports = router;
