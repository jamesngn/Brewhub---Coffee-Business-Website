//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const rootPath = path.resolve(__dirname);
const protoPath = path.join(rootPath, "auth.proto");

//Load the proto files for different gRPC services
const authPackageDef = protoLoader.loadSync(protoPath, {});

// Load the gRPC objects for different services
const authGrpcObject = grpc.loadPackageDefinition(authPackageDef);

// Create gRPC client instances for different services
const authClient = new authGrpcObject.authPackage.AuthService(
  "localhost:50054",
  grpc.credentials.createInsecure()
);

module.exports = { authClient };
