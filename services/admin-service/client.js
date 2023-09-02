//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const path = require("path");
const rootPath = path.resolve(__dirname);
const protoPath = path.join(rootPath, "admin.proto");
const adminPackageDef = protoLoader.loadSync(protoPath, {});

// Load the gRPC objects for different services
const adminGrpcObject = grpc.loadPackageDefinition(adminPackageDef);

//config:
const config = require(path.join(__dirname, "..", "..", "config", "config.js"));
const adminHost = config.grpc.adminServiceHost;
const adminPort = config.grpc.adminServicePort;

// Create gRPC client instances for different services
const adminClient = new adminGrpcObject.adminPackage.AdminService(
  adminHost + ":" + adminPort,
  grpc.credentials.createInsecure()
);

module.exports = { adminClient };
