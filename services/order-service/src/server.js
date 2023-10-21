//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTOPATH = __dirname + "/order.proto";
const packageDef = protoLoader.loadSync(PROTOPATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const orderPackage = grpcObject.orderPackage;

//data
const mongoose = require("mongoose");
const Order = require("./models/order");
const ObjectId = mongoose.Types.ObjectId;

/*------------------------------------------------------------------------------------------------ */
//config
const path = require("path");
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "shared",
  "src",
  "config",
  "config.js"
));
const mongoHost = config.mongo.host;
const mongoPort = config.mongo.port;
const mongoDatabase = config.mongo.database;
const serviceHost = config.grpc.orderServiceHost;
const servicePort = config.grpc.orderServicePort;

//utils
const orderUtils = require("../../shared/src/utils/orderUtils");

//Connect to MongoDB
mongoose
  .connect(
    "mongodb://" + mongoHost + ":" + mongoPort + "/" + mongoDatabase + "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

//Implement gRPC server
const server = new grpc.Server();
server.bind(
  serviceHost + ":" + servicePort,
  grpc.ServerCredentials.createInsecure()
);
/*------------------------------------------------------------------------------------------------ */

server.addService(orderPackage.OrderService.service, {
  PlaceOrder: PlaceOrder,
  GetOrderDetails: GetOrderDetails,
  GetAllOrderDetails: GetAllOrderDetails,
  GetOrderStatus: GetOrderStatus,
  GetOrderHistory: GetOrderHistory,
  UpdateOrderStatus: UpdateOrderStatus,
  ApplyPromotion: ApplyPromotion,
});

async function PlaceOrder(call, callback) {
  try {
    const request = call.request; //get the request from the client
    const newOrder = new Order({
      _id: new ObjectId(),
      userId: new ObjectId(request.userId),
      orderDate: new Date(),
      orderItems: request.orderItems,
      totalAmount: orderUtils.calculateTotal(
        request.orderItems,
        request.promotionsApplied
      ),
      orderStatus: "Pending",
      paymentStatus: "Unpaid",
      paymentMethod: request.paymentMethod,
      deliveryAddress: request.deliveryAddress,
      promotionsApplied: request.promotionsApplied,
    });
    await newOrder.save();

    const response = {
      orderId: newOrder._id,
      orderDate: newOrder.orderDate,
      totalAmount: newOrder.totalAmount,
      orderStatus: newOrder.orderStatus,
      paymentStatus: newOrder.paymentStatus,
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

async function GetOrderDetails(call, callback) {
  try {
    const { orderId } = call.request;

    if (!call.request.orderId) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Order Id empty",
      });
      return;
    }

    const order = await Order.findOne({ _id: orderId });

    console.log("GetOrderDetails:" + order);
    if (!order) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Order Id Not Found",
      });
      return;
    } else {
      const response = {
        orderId: order._id,
        userId: order.userId,
        orderDate: order.orderDate,
        orderItems: order.orderItems,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        deliveryAddress: order.deliveryAddress,
        promotionsApplied: order.promotionsApplied,
      };
      callback(null, response);
    }
  } catch (error) {
    console.error("Error finding order details: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error finding order details.",
    });
  }
}

async function GetAllOrderDetails(call, callback) {
  try {
    const orders = await Order.find().sort({ orderDate: -1 }); // Sort by orderDate in descending order

    const allOrderDetailsResponse = {
      orderDetailsList: orders.map((order) => {
        return {
          orderId: order._id,
          userId: order.userId,
          orderDate: order.orderDate,
          orderItems: order.orderItems,
          totalAmount: order.totalAmount,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod,
          deliveryAddress: order.deliveryAddress,
          promotionsApplied: order.promotionsApplied,
        };
      }),
    };
    callback(null, allOrderDetailsResponse);
  } catch (error) {
    console.error("Error finding order details: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error finding order details.",
    });
  }
}

async function GetOrderStatus(call, callback) {
  try {
    const { orderId } = call.request;
    const order = await Order.findOne(
      { _id: new ObjectId(orderId) },
      { orderStatus: 1, _id: 0 }
    );
    if (order == null) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Order Id Not Found",
      });
      return;
    } else {
      callback(null, { orderStatus: order.orderStatus });
    }
  } catch (error) {
    console.error("Error finding order status: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error finding order status.",
    });
  }
}

async function GetOrderHistory(call, callback) {
  try {
    let { userId } = call.request;
    let orders = await Order.find(
      { userId: new ObjectId(userId) },
      {
        orderStatus: 1,
        orderDate: 1,
        totalAmount: 1,
        paymentStatus: 1,
      }
    );

    if (orders.length == 0) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Order History Not Found With User Id = " + userId,
      });
      return;
    } else {
      const orderHistoryResponse = {
        orders: orders.map((order) => {
          return {
            orderId: order._id.toString(), // Change _id to OrderId
            orderDate: order.orderDate.toString(),
            totalAmount: order.totalAmount,
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
          };
        }),
      };
      callback(null, orderHistoryResponse);
    }
  } catch (error) {
    console.error("Error finding order status: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error finding order status.",
    });
  }
}
//["Pending", "Processing", "Delivered", "Cancelled"]
async function UpdateOrderStatus(call, callback) {
  const { orderId, newStatus } = call.request;
  if (
    newStatus != "Pending" &&
    newStatus != "Processing" &&
    newStatus != "Delivered" &&
    newStatus != "Cancelled"
  ) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: "Invalid order status",
    });
    return;
  }
  try {
    const updateOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { orderStatus: newStatus } },
      { new: true }
    );

    if (!updateOrder) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: `Order with id = ${orderId} not found`,
      });
      return;
    }
    console.log("Updated order: ", updateOrder);
    const response = {
      success: true,
      message: `Update order status (id = ${orderId}) successfully -> ${newStatus}`,
    };
    callback(null, response);
  } catch (error) {
    console.error("Error finding order status: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error finding order status.",
    });
  }
}

async function ApplyPromotion(call, callback) {
  try {
  } catch (error) {}
}

async function cancelOrder(call, callback) {}

server.start();
console.log("gRPC server running on port " + servicePort);
