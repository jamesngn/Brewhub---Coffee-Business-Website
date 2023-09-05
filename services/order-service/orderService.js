// orderService.js
const { orderClient } = require("./client");

function PlaceOrder(
  userId,
  orderItems,
  paymentMethod,
  deliveryAddress,
  promotionsApplied,
  callback
) {
  const request = {
    userId,
    orderItems,
    paymentMethod,
    deliveryAddress,
    promotionsApplied,
  };
  orderClient.PlaceOrder(request, (error, response) => {
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
function GetOrderDetails(orderId, callback) {
  const request = { orderId: orderId };
  orderClient.GetOrderDetails(request, (error, response) => {
    if (error) {
      console.error("Error getting order status by orderId:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to get order status by orderId." });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}
function GetOrderStatus(orderId, callback) {
  const request = { orderId: orderId };
  orderClient.GetOrderStatus(request, (error, response) => {
    if (error) {
      console.error("Error getting order status by orderId:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to get order status by orderId." });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

function GetOrderHistory(userId, callback) {
  const request = { userId: userId };
  orderClient.GetOrderHistory(request, (error, response) => {
    if (error) {
      console.error("Error getting order history by userId:", error);
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to get order history by userId." });
      return;
    }
    // Return the successful response to the callback;
    callback(response);
  });
}

function UpdateOrderStatus(orderId, newStatus, callback) {
  const request = { orderId, newStatus };
  orderClient.UpdateOrderStatus(request, (error, response) => {
    if (error) {
      console.error(
        `Error updating order status with orderId = ${orderId}: `,
        error
      );
      // Handle the error and return an error response to the callback
      callback({ error: "Failed to update order status by orderId." });
      return;
    }
    // Return the successful response to the callback
    callback(response);
  });
}

module.exports = {
  PlaceOrder,
  GetOrderDetails,
  GetOrderStatus,
  GetOrderHistory,
  UpdateOrderStatus,
};
