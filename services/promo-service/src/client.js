//client.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

//Load the proto files for different gRPC services
const path = require("path");
const rootPath = path.resolve(__dirname);
const protoPath = path.join(rootPath, "promo.proto");
const promoPackageDef = protoLoader.loadSync(protoPath, {});

//config host, port
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "shared",
  "src",
  "config",
  "config.js"
));
const serviceHost = config.grpc.promoServiceHost;
const servicePort = config.grpc.promoServicePort;

// Load the gRPC objects for different services
const promoGrpcObject = grpc.loadPackageDefinition(promoPackageDef);

// Create gRPC client instances for different services
const promoClient = new promoGrpcObject.promoPackage.PromoService(
  serviceHost + ":" + servicePort,
  grpc.credentials.createInsecure()
);

module.exports = { promoClient };
