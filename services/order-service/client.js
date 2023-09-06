//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const path = require("path");
const rootPath = path.resolve(__dirname);
const protoPath = path.join(rootPath, "order.proto");
const orderPackageDef = protoLoader.loadSync(protoPath, {});

//config
const config = require(path.join(
  __dirname,
  "..",
  "shared",
  "src",
  "config",
  "config.js"
));
const serviceHost = config.grpc.orderServiceHost;
const servicePort = config.grpc.orderServicePort;

// Load the gRPC objects for different services
const orderGrpcObject = grpc.loadPackageDefinition(orderPackageDef);

// Create gRPC client instances for different services
const orderClient = new orderGrpcObject.orderPackage.OrderService(
  serviceHost + ":" + servicePort,
  grpc.credentials.createInsecure()
);

module.exports = { orderClient };
