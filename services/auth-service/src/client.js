//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const rootPath = path.resolve(__dirname);
const protoPath = path.join(rootPath, "auth.proto");

//config:
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "shared",
  "src",
  "config",
  "config.js"
));
const serviceHost = config.grpc.authServiceHost;
const servicePort = config.grpc.authServicePort;

//Load the proto files for different gRPC services
const authPackageDef = protoLoader.loadSync(protoPath, {});

// Load the gRPC objects for different services
const authGrpcObject = grpc.loadPackageDefinition(authPackageDef);

// Create gRPC client instances for different services
const authClient = new authGrpcObject.authPackage.AuthService(
  serviceHost + ":" + servicePort,
  grpc.credentials.createInsecure()
);

module.exports = { authClient };
