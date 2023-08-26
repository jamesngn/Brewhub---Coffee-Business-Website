const MenuItem = require("../models/menuItem");

async function getMenuItems(req, res) {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving menu" });
  }
}

async function createMenuItem(req, res) {
  const { name, price } = req.body;
  try {
    const newItem = new MenuItem({ name, price });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Error adding item to menu" });
  }
}

module.exports = {
  getMenuItems,
  createMenuItem,
};
