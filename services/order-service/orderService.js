// orderService.js
const { orderClient } = require("./client");

function createOrder(userId, items, callback) {
  const request = {
    userId: userId,
    items: items,
  };

  orderClient.createOrder(request, (error, response) => {
    if (error) {
      console.error("Error placing order:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to place order" });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

function getOrdersByUserId(userId, callback) {
  const request = {
    userId: userId,
  };

  orderClient.getOrdersByUserId(request, (error, response) => {
    if (error) {
      console.error("Error getting orders by UserId:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to get orders by UserId." });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

module.exports = {
  createOrder,
  getOrdersByUserId,
};
