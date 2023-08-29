// orderService.js
const { orderClient } = require("./client");

function placeOrder(userId, items, callback) {
  // Define your gRPC call logic here using the orderClient
  const request = {
    userId: userId,
    items: items,
  };

  orderClient.placeOrder(request, (error, response) => {
    if (error) {
      console.error("Error placing order:", error);
      return;
    }
    callback(response);
  });
}

module.exports = {
  placeOrder,
};
