const express = require("express");
const router = express.Router();

const path = require("path");
const adminService = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "admin-service",
  "adminService.js"
));

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  adminService.RegisterAdmin(username, email, password, (response) => {
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
