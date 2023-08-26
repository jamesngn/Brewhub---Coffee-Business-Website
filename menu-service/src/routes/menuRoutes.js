const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController.js");

router.get("/menu", menuController.getMenuItems);
router.post("/menu", menuController.createMenuItem);
