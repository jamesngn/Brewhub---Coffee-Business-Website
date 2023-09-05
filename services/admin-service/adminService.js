// orderService.js
const { adminClient } = require("./client");

function RegisterAdmin(username, email, password, callback) {
  const request = { username, email, password };
  adminClient.RegisterAdmin(request, (error, response) => {
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

function ManageOrders(orderId, action, newStatus, callback) {
  const request = {
    orderId,
    action,
    newStatus,
  };
  adminClient.ManageOrders(request, (error, response) => {
    if (error) {
      console.error("Error managing orders:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to manage orders." });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

module.exports = {
  RegisterAdmin,
  ManageOrders,
};
