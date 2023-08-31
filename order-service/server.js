//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("order.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const orderPackage = grpcObject.orderPackage;

const mongoose = require("mongoose");
const Order = require("./models/order");

//Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

//Implement gRPC server
const server = new grpc.Server();
server.bind("0.0.0.0:50052", grpc.ServerCredentials.createInsecure());

server.addService(orderPackage.Order.service, {
  createOrder: createOrder,
  getOrdersByUserId: getOrdersByUserId,
});

async function createOrder(call, callback) {
  try {
    // console.log("Reached ./server.js/createOrder.js function");
    // console.log("Request: " + JSON.stringify(call.request));
    const orderRequest = call.request; //get the request from the client
    const newOrder = new Order({
      userId: orderRequest.userId,
      items: orderRequest.items,
      createdAt: new Date(),
      status: "completed",
    });
    // console.log("New Order created: " + newOrder);
    await newOrder.save();

    const response = {
      id: newOrder._id,
      status: newOrder.status,
    };
    callback(null, response);
  } catch (error) {
    console.error("Error creating an order: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error creating an order.",
    });
  }
}

async function addItemsToCart() {}

async function getOrderById(call, callback) {}

async function getOrdersByUserId(call, callback) {
  try {
    const userId = call.request.userId;
    const orders = await Order.find({ userId: userId }).select(
      "_id createdAt status items"
    );
    const ordersResponse = { orders: orders };
    callback(null, ordersResponse);
  } catch (error) {
    console.error("Error getting order by user id: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error getting order by user id.",
    });
  }
}

async function updateOrderStatus(call, callback) {}

async function cancelOrder(call, callback) {}

async function calculateOrderTotal(call, callback) {}

server.start();
console.log("gRPC server running on port 50052");
