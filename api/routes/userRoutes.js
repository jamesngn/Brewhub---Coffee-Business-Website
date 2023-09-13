const express = require("express");
const router = express.Router();

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../../services/user-service/user.proto";
const userPackageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
// Load the gRPC objects for different services
const userGrpcObject = grpc.loadPackageDefinition(userPackageDef);

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
const userHost = config.grpc.userServiceHost;
const userPort = config.grpc.userServicePort;

const userClient = new userGrpcObject.userPackage.UserService(
  userHost + ":" + userPort,
  grpc.credentials.createInsecure()
);

router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  userClient.registerUser({ username, email, password }, (error, response) => {
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
  });
});

module.exports = router;
