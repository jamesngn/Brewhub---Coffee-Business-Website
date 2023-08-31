const menuService = require("./menuService");
const orderService = require("./orderService");

// Fetch menu items
menuService.getMenuItems((menuItems) => {
  console.log("Menu items:", menuItems);
});
// After fetching menu items, create an order
const userId = "U1";
const items = [
  { menuItemId: "M1", quantity: 10 },
  { menuItemId: "M2", quantity: 100 },
];

orderService.createOrder(userId, items, (orderResponse) => {
  console.log("Order response:", orderResponse);
});
