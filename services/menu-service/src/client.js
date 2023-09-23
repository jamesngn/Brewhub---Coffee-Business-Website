//  menu-service/server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTOPATH = __dirname + "/menu.proto";
const packageDef = protoLoader.loadSync(PROTOPATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const menuPackage = grpcObject.menuPackage;

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
const serviceHost = config.grpc.menuServiceHost;
const servicePort = config.grpc.menuServicePort;

const menuClient = new menuPackage.Menu(
  serviceHost + ":" + servicePort,
  grpc.credentials.createInsecure()
);

module.exports = { menuClient };
