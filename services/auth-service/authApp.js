const authService = require("./authService");

const args = process.argv.slice(2); // Get command-line arguments excluding node and script name

if (args.length === 0) {
  console.log("Usage: node userApp.js [function]");
  console.log("Available functions: loginUser");
  process.exit(1);
}

const functionToExecute = args[0];

switch (functionToExecute) {
  case "loginUser":
    var email = "user@example.com";
    var password = "securePassword";

    authService.loginUser(email, password, (response) => {
      console.log("Login user response: " + JSON.stringify(response));
    });
    break;
  default:
    console.log("Unknown function:", functionToExecute);
    console.log("Available functions: loginUser");
    break;
}
