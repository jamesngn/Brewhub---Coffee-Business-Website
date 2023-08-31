const registerUserService = require("./registerUserService");

const args = process.argv.slice(2); // Get command-line arguments excluding node and script name

if (args.length === 0) {
  console.log("Usage: node userApp.js [function]");
  console.log("Available functions: registerUser");
  process.exit(1);
}

const functionToExecute = args[0];

switch (functionToExecute) {
  case "registerUser":
    const username = "exampleUser";
    const email = "user@example.com";
    const password = "securePassword";

    registerUserService.registerUser(username, email, password, (response) => {
      console.log("Registration response:", response);
    });
    break;

  default:
    console.log("Unknown function:", functionToExecute);
    console.log("Available functions: registerUser");
    break;
}
