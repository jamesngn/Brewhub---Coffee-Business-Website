//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const path = require("path");
const rootPath = path.resolve(__dirname);
const protoPath = path.join(rootPath, "user.proto");
const userPackageDef = protoLoader.loadSync(protoPath, {});

//config
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "shared",
  "src",
  "config",
  "config.js"
));
const serviceHost = config.grpc.userServiceHost;
const servicePort = config.grpc.userServicePort;

// Load the gRPC objects for different services
const userGrpcObject = grpc.loadPackageDefinition(userPackageDef);

// Create gRPC client instances for different services
const userClient = new userGrpcObject.userPackage.UserService(
  serviceHost + ":" + servicePort,
  grpc.credentials.createInsecure()
);

module.exports = { userClient };
