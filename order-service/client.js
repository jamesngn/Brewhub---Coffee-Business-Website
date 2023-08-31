//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const orderPackageDef = protoLoader.loadSync("./order.proto", {});
const menuPackageDef = protoLoader.loadSync("../menu-service./menu.proto", {});

// Load the gRPC objects for different services
const menuGrpcObject = grpc.loadPackageDefinition(menuPackageDef);
const orderGrpcObject = grpc.loadPackageDefinition(orderPackageDef);

// Create gRPC client instances for different services
const menuClient = new menuGrpcObject.menuPackage.Menu(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const orderClient = new orderGrpcObject.orderPackage.Order(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

module.exports = { menuClient, orderClient };
