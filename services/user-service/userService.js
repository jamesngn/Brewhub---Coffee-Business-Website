// orderService.js
const { userClient } = require("./client");

function registerUser(username, email, password, callback) {
  const request = { username, email, password };
  userClient.registerUser(request, (error, response) => {
    if (error) {
      console.error("Error registering user:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to register user." });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

module.exports = {
  registerUser,
};
