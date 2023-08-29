const menuService = require("./menuService");
const orderService = require("./orderService");

menuService.getMenuItems((menuItems) => {
  console.log("Menu items:", menuItems);
});

const userId = "U1";
const items = [
  { menuItemId: "M1", quantity: 10 },
  { menuItemId: "M2", quantity: 100 },
];
orderService.placeOrder(userId, items, (orderResponse) => {
  console.log("Order response:", orderResponse);
});
