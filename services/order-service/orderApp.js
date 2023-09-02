const menuService = require("./menuService");
const orderService = require("./orderService");

const args = process.argv.slice(2); // Get command-line arguments excluding node and script name

if (args.length === 0) {
  console.log("Usage: node orderApp.js [function]");
  console.log("Available functions: getMenu, PlaceOrder, GetOrderHistory");
  process.exit(1);
}

const functionToExecute = args[0];

switch (functionToExecute) {
  case "getMenu":
    menuService.getMenuItems((menuItems) => {
      console.log("Menu items:", menuItems);
    });
    break;

  case "PlaceOrder":
    const testData = {
      userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
      orderItems: [
        {
          itemId: "item1", // Replace with a valid menu item ID
          itemName: "Latte",
          quantity: 2,
          price: 4.99,
          subtotal: 9.98,
        },
        {
          itemId: "item2", // Replace with a valid menu item ID
          itemName: "Cappuccino",
          quantity: 1,
          price: 3.99,
          subtotal: 3.99,
        },
      ],
      paymentMethod: "Credit Card",
      deliveryAddress: {
        street: "123 Main St",
        city: "Exampleville",
        state: "CA",
        postalCode: "12345",
        country: "USA",
      },
      promotionsApplied: [
        {
          promoCode: "promo123", // Replace with a valid promotion code
          discountPercentage: 2.0, // Replace with the actual discount amount
        },
      ],
    };

    orderService.PlaceOrder(
      testData.userId,
      testData.orderItems,
      testData.paymentMethod,
      testData.deliveryAddress,
      testData.promotionsApplied,
      (orderResponse) => {
        console.log("Order response:", orderResponse);
      }
    );
    break;

  case "GetOrderStatus":
    let orderId = "64f1bba2810fb11270042422";
    orderService.GetOrderStatus(orderId, (response) => {
      console.log(
        "Order status of _id = " + orderId + ": " + response.orderStatus
      );
    });
    break;
  case "GetOrderHistory":
    const userId = "5f9a6ee49bf82c62d43bb175";
    orderService.GetOrderHistory(userId, (response) => {
      console.log(
        "Order history of userId = " +
          userId +
          ": \n" +
          JSON.stringify(response)
      );
    });
    break;

  default:
    console.log("Unknown function:", functionToExecute);
    console.log("Available functions: getMenu, createOrder, getOrdersByUserId");
    break;
}
