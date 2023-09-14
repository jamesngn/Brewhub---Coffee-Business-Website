//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const PROTOPATH = __dirname + "/admin.proto";
const adminPackageDef = protoLoader.loadSync(PROTOPATH, {});

// Load the gRPC objects for different services
const adminGrpcObject = grpc.loadPackageDefinition(adminPackageDef);

//config:
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
const adminHost = config.grpc.adminServiceHost;
const adminPort = config.grpc.adminServicePort;

// Create gRPC client instances for different services
const adminClient = new adminGrpcObject.adminPackage.AdminService(
  adminHost + ":" + adminPort,
  grpc.credentials.createInsecure()
);

module.exports = { adminClient };
