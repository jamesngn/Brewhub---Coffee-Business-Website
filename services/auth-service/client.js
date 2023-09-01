//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const authPackageDef = protoLoader.loadSync("./auth.proto", {});

// Load the gRPC objects for different services
const authGrpcObject = grpc.loadPackageDefinition(authPackageDef);

// Create gRPC client instances for different services
const authClient = new authGrpcObject.authPackage.AuthService(
  "localhost:50054",
  grpc.credentials.createInsecure()
);

module.exports = { authClient };
