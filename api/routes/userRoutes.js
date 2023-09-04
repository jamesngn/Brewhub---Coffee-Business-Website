const express = require("express");
const router = express.Router();

const path = require("path");
const userService = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "user-service",
  "userService.js"
));

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  userService.registerUser(username, email, password, (response) => {
    console.log();
    if (response.success) {
      return res.status(200).json({ success: true, message: response.message });
    } else {
      return res
        .status(200)
        .json({ success: false, message: response.message });
    }
  });
});

module.exports = router;
