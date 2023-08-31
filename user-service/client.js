//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const userPackageDef = protoLoader.loadSync("./user.proto", {});

// Load the gRPC objects for different services
const userGrpcObject = grpc.loadPackageDefinition(userPackageDef);

// Create gRPC client instances for different services
const userClient = new userGrpcObject.userPackage.UserService(
  "localhost:50053",
  grpc.credentials.createInsecure()
);

module.exports = { userClient };
