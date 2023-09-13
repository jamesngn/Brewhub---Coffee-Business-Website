const { expect } = require("chai");
const { orderClient } = require("../../src/client");

describe("order-service", () => {
  describe("PlaceOrder", () => {
    it("should return successful response after placing order", async () => {
      const request = {
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

      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      expect(responseData.orderId).to.exist;
      expect(responseData.orderDate).to.exist;
      expect(responseData.totalAmount).to.exist;
      expect(responseData.orderStatus).to.exist;
      expect(responseData.paymentStatus).to.exist;
    });

    it("should return error response if userId is missing", async () => {
      const request = {
        userId: "", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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

      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.exist;
      expect(response.response).to.be.undefined;
    });

    it("should return error response if orderItem is missing", async () => {
      const request = {
        userId: "", // Replace with a valid user ID
        orderItems: [],
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

      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.exist;
      expect(response.response).to.be.undefined;
    });

    it("should store new order in database after placing order successfully", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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

      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const order = await new Promise((resolve) => {
        orderClient.GetOrderDetails({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(order.error).to.be.null;
      expect(order.response).to.exist;
    });
  });

  describe("GetOrderDetails", () => {
    it("should return order response after getting order details", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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

      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const order = await new Promise((resolve) => {
        orderClient.GetOrderDetails({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(order.error).to.be.null;
      expect(order.response).to.exist;
    });

    it("should return error message NOT_FOUND after getting details from not existed orderId", async () => {
      const orderId = "5f9a6ee49bf82c62d43bb175";
      const order = await new Promise((resolve) => {
        orderClient.GetOrderDetails({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(order.error.code).to.be.equal(5);
      expect(order.error.details).to.be.equal("Order Id Not Found");
      expect(order.response).to.be.undefined;
    });

    it("should return error message INVALID OBJECT ID after getting details from invalid orderId", async () => {
      const orderId = "1ansdjkandasnd";
      const order = await new Promise((resolve) => {
        orderClient.GetOrderDetails({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(order.error.code).to.be.equal(13);
      expect(order.error.details).to.be.equal("Error finding order details.");
      expect(order.response).to.be.undefined;
    });
  });

  describe("GetOrderStatus", () => {
    it("should return order status after requesting an exisiting orderId", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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

      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const order = await new Promise((resolve) => {
        orderClient.GetOrderStatus({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(order.error).to.be.null;
      expect(order.response.orderStatus).to.exist;
    });

    it("should return error message NOT_FOUND after getting details from not existed orderId", async () => {
      const orderId = "5f9a6ee49bf82c62d43bb175";
      const order = await new Promise((resolve) => {
        orderClient.GetOrderStatus({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(order.error.code).to.be.equal(5);
      expect(order.error.details).to.be.equal(`Order Id Not Found`);
      expect(order.response).to.be.undefined;
    });
  });

  describe("UpdateOrderStatus", () => {
    it("should return successful message after updating an order to Pending", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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
      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const updateResponse = await new Promise((resolve) => {
        orderClient.UpdateOrderStatus(
          { orderId, newStatus: "Pending" },
          (error, response) => {
            resolve({ error, response });
          }
        );
      });

      expect(updateResponse.error).to.be.null;
      expect(updateResponse.response).to.exist;
      expect(updateResponse.response.success).to.be.true;
      expect(updateResponse.response.message).to.be.equal(
        `Update order status (id = ${orderId}) successfully -> Pending`
      );
      //Check in database:
      const updateOrder = await new Promise((resolve) => {
        orderClient.GetOrderStatus({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(updateOrder.error).to.be.null;
      expect(updateOrder.response).to.exist;
      expect(updateOrder.response.orderStatus).to.be.equal("Pending");
    });

    it("should return successful message after updating an order to Processing", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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
      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const updateResponse = await new Promise((resolve) => {
        orderClient.UpdateOrderStatus(
          { orderId, newStatus: "Processing" },
          (error, response) => {
            resolve({ error, response });
          }
        );
      });

      expect(updateResponse.error).to.be.null;
      expect(updateResponse.response).to.exist;
      expect(updateResponse.response.success).to.be.true;
      expect(updateResponse.response.message).to.be.equal(
        `Update order status (id = ${orderId}) successfully -> Processing`
      );
      //Check in database:
      const updateOrder = await new Promise((resolve) => {
        orderClient.GetOrderStatus({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(updateOrder.error).to.be.null;
      expect(updateOrder.response).to.exist;
      expect(updateOrder.response.orderStatus).to.be.equal("Processing");
    });

    it("should return successful message after updating an order to Delivered", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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
      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const updateResponse = await new Promise((resolve) => {
        orderClient.UpdateOrderStatus(
          { orderId, newStatus: "Delivered" },
          (error, response) => {
            resolve({ error, response });
          }
        );
      });

      expect(updateResponse.error).to.be.null;
      expect(updateResponse.response).to.exist;
      expect(updateResponse.response.success).to.be.true;
      expect(updateResponse.response.message).to.be.equal(
        `Update order status (id = ${orderId}) successfully -> Delivered`
      );
      //Check in database:
      const updateOrder = await new Promise((resolve) => {
        orderClient.GetOrderStatus({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(updateOrder.error).to.be.null;
      expect(updateOrder.response).to.exist;
      expect(updateOrder.response.orderStatus).to.be.equal("Delivered");
    });

    it("should return successful message after updating an order to Cancelled", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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
      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const updateResponse = await new Promise((resolve) => {
        orderClient.UpdateOrderStatus(
          { orderId, newStatus: "Cancelled" },
          (error, response) => {
            resolve({ error, response });
          }
        );
      });

      expect(updateResponse.error).to.be.null;
      expect(updateResponse.response).to.exist;
      expect(updateResponse.response.success).to.be.true;
      expect(updateResponse.response.message).to.be.equal(
        `Update order status (id = ${orderId}) successfully -> Cancelled`
      );
      //Check in database:
      const updateOrder = await new Promise((resolve) => {
        orderClient.GetOrderStatus({ orderId }, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(updateOrder.error).to.be.null;
      expect(updateOrder.response).to.exist;
      expect(updateOrder.response.orderStatus).to.be.equal("Cancelled");
    });

    it("should return successful message after updating an order to invalid status", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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
      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const orderId = responseData.orderId;

      const updateOrder = await new Promise((resolve) => {
        orderClient.UpdateOrderStatus(
          { orderId, newStatus: "Shipping" },
          (error, response) => {
            resolve({ error, response });
          }
        );
      });

      expect(updateOrder.error).to.exist;
      expect(updateOrder.error.code).to.equal(3);
      expect(updateOrder.error.details).to.equal("Invalid order status");
      expect(updateOrder.response).to.be.undefined;
    });

    it("should return error message NOT_FOUND after updating a non-existed orderId", async () => {
      const orderId = "5f9a6ee49bf82c62d43bb175";

      const updateOrder = await new Promise((resolve) => {
        orderClient.UpdateOrderStatus(
          { orderId, newStatus: "Pending" },
          (error, response) => {
            resolve({ error, response });
          }
        );
      });

      expect(updateOrder.error).to.exist;
      expect(updateOrder.error.code).to.equal(5);
      expect(updateOrder.error.details).to.equal(
        `Order with id = ${orderId} not found`
      );
      expect(updateOrder.response).to.be.undefined;
    });
  });

  describe("GetOrderHistory", () => {
    it("should return successful message after getting an order history from an exisiting user", async () => {
      const request = {
        userId: "5f9a6ee49bf82c62d43bb175", // Replace with a valid user ID
        orderItems: [
          {
            itemId: "item1", // Replace with a valid menu item ID
            itemName: "Latte",
            quantity: 2,
            price: 4.99,
            subtotal: 9.98,
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
      const response = await new Promise((resolve) => {
        orderClient.placeOrder(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      const responseData = response.response;
      expect(responseData).to.exist;
      const userId = "5f9a6ee49bf82c62d43bb175";

      const orderHistory = await new Promise((resolve) => {
        orderClient.GetOrderHistory({ userId }, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(orderHistory.error).to.be.null;
      expect(orderHistory.response).to.exist;
      expect(orderHistory.response.orders[0]).to.exist;
      expect(orderHistory.response.orders[0].orderId).to.exist;
      expect(orderHistory.response.orders[0].orderDate).to.exist;
      expect(orderHistory.response.orders[0].totalAmount).to.exist;
      expect(orderHistory.response.orders[0].orderStatus).to.exist;
      expect(orderHistory.response.orders[0].paymentStatus).to.exist;
    });

    it("should return error message after getting 0 order history from an exisiting user", async () => {
      const userId = "5f9a6ee49bf82c62d43bb155";

      const orderHistory = await new Promise((resolve) => {
        orderClient.GetOrderHistory({ userId }, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(orderHistory.error).to.exist;
      expect(orderHistory.error.code).to.be.equal(5);
      expect(orderHistory.error.details).to.be.equal(
        "Order History Not Found With User Id = " + userId
      );
      expect(orderHistory.response).to.be.undefined;
    });
  });
});
