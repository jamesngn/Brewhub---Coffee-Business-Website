const adminService = require("./adminService");

const args = process.argv.slice(2); // Get command-line arguments excluding node and script name

if (args.length === 0) {
  console.log("Usage: node userApp.js [function]");
  console.log("Available functions: RegisterAdmin, ManageOrders");
  process.exit(1);
}

const functionToExecute = args[0];

switch (functionToExecute) {
  case "RegisterAdmin":
    var username = "Quang";
    var email = "user@admin.com";
    var password = "quang123";

    adminService.RegisterAdmin(username, email, password, (response) => {
      console.log("Registration response:", response);
    });
    break;
  case "ManageOrders":
    var orderId = "64f55f28fe7a9d1faf6df5c5";
    var action = "MODIFY_STATUS";
    var newStatus = "Processing";

    adminService.ManageOrders(orderId, action, newStatus, (response) => {
      console.log("Manage Orders: ", response);
    });
    break;
  default:
    console.log("Unknown function:", functionToExecute);
    console.log("Available functions: RegisterAdmin, ManageOrders");
    break;
}
