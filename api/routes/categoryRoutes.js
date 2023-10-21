const express = require("express");
const router = express.Router();

const { menuClient } = require("../../services/menu-service/src/client.js");

router.post("/add", (req, res) => {
  const { category, subCategory } = req.body;
  menuClient.addCategory({ category, subCategory }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.get("/all", (req, res) => {
  menuClient.getCategory({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.get("/getCategoryById", (req, res) => {
  const { categoryId } = req.query.categoryId;
  menuClient.getCategoryById({ categoryId }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.get("/getId", (req, res) => {
  const { category, subCategory } = req.body;
  menuClient.getCategoryId({ category, subCategory }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

module.exports = router;
