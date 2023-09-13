const express = require("express");
const router = express.Router();

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../../services/order-service/order.proto";
const orderPackageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
// Load the gRPC objects for different services
const orderGrpcObject = grpc.loadPackageDefinition(orderPackageDef);

const path = require("path");
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "shared",
  "src",
  "config",
  "config.js"
));
const orderHost = config.grpc.orderServiceHost;
const orderPort = config.grpc.orderServicePort;

const orderClient = new orderGrpcObject.orderPackage.OrderService(
  orderHost + ":" + orderPort,
  grpc.credentials.createInsecure()
);

router.post("/place", (req, res) => {
  const {
    userId,
    orderItems,
    paymentMethod,
    deliveryAddress,
    promotionsApplied,
  } = req.body;
  orderClient.PlaceOrder(
    { userId, orderItems, paymentMethod, deliveryAddress, promotionsApplied },
    (error, response) => {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        if (response) {
          const {
            orderId,
            orderDate,
            totalAmount,
            orderStatus,
            paymentStatus,
          } = response;
          return res.status(200).json({
            orderId,
            orderDate,
            totalAmount,
            orderStatus,
            paymentStatus,
          });
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }
  );
});

module.exports = router;
