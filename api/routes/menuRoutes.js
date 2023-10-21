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

router.get("/getItemByCategoryId", (req, res) => {
  const categoryId = req.query.categoryId;
  menuClient.getMenuItemsByCategoryId({ categoryId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
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

router.get("/getAllWithCategoryInfo", (req, res) => {
  menuClient.getMenuItemsWithCategoryInfo({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.delete("/delete", (req, res) => {
  const itemId = req.query.itemId;
  menuClient.deleteMenuItem({ id: itemId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

module.exports = router;
