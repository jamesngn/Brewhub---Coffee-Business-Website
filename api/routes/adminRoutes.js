const express = require("express");
const router = express.Router();

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../../services/admin-service/admin.proto";
const adminPackageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
// Load the gRPC objects for different services
const adminGrpcObject = grpc.loadPackageDefinition(adminPackageDef);

//config:
const path = require("path");
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "shared",
  "src",
  "config",
  "config.js"
));
const adminHost = config.grpc.adminServiceHost;
const adminPort = config.grpc.adminServicePort;

const adminClient = new adminGrpcObject.adminPackage.AdminService(
  adminHost + ":" + adminPort,
  grpc.credentials.createInsecure()
);

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  adminClient.RegisterAdmin(
    { username, email, password },
    (error, response) => {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        if (response.success) {
          return res
            .status(200)
            .json({ success: true, message: response.message });
        } else {
          return res
            .status(200)
            .json({ success: false, message: response.message });
        }
      }
    }
  );
});

module.exports = router;
