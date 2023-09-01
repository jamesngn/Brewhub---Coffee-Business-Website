const menuService = require("./menuService");
const orderService = require("./orderService");

const args = process.argv.slice(2); // Get command-line arguments excluding node and script name

if (args.length === 0) {
  console.log("Usage: node orderApp.js [function]");
  console.log("Available functions: getMenu, createOrder, getOrdersByUserId");
  process.exit(1);
}

const functionToExecute = args[0];

switch (functionToExecute) {
  case "getMenu":
    menuService.getMenuItems((menuItems) => {
      console.log("Menu items:", menuItems);
    });
    break;

  case "createOrder":
    const userId = "U1";
    const items = [
      { menuItemId: "M1", quantity: 10 },
      { menuItemId: "M2", quantity: 100 },
    ];
    orderService.createOrder(userId, items, (orderResponse) => {
      console.log("Order response:", orderResponse);
    });
    break;

  case "getOrdersByUserId":
    const userIdToQuery = args[1]; // Get userId from command-line argument
    if (!userIdToQuery) {
      console.log(
        "Please provide a userId argument for getOrdersByUserId function."
      );
      process.exit(1);
    }
    orderService.getOrdersByUserId(userIdToQuery, (response) => {
      console.log(
        "Orders by userId =",
        userIdToQuery + ":\n" + JSON.stringify(response)
      );
    });
    break;

  default:
    console.log("Unknown function:", functionToExecute);
    console.log("Available functions: getMenu, createOrder, getOrdersByUserId");
    break;
}
