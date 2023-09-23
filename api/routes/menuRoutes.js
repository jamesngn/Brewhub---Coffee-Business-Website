const express = require("express");
const router = express.Router();

const { menuClient } = require("../../services/menu-service/src/client.js");

router.post("/add", (req, res) => {
  const { name, description, category, price } = req.body;
  menuClient.addMenuItem(
    { name, description, category, price },
    (error, response) => {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        return res.status(200).json(response);
      }
    }
  );
});

router.get("/getAll", (req, res) => {
  menuClient.getMenuItems({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

module.exports = router;
