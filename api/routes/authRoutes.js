const express = require("express");
const router = express.Router();

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../../services/auth-service/auth.proto";
const authPackageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
// Load the gRPC objects for different services
const authGrpcObject = grpc.loadPackageDefinition(authPackageDef);

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
const authHost = config.grpc.authServiceHost;
const authPort = config.grpc.authServicePort;

const authClient = new authGrpcObject.authPackage.AuthService(
  authHost + ":" + authPort,
  grpc.credentials.createInsecure()
);

const authMiddleware = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "shared",
  "src",
  "middleware",
  "authMiddleware"
));

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  authClient.loginUser({ email, password }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      if (response.success) {
        // If login is successful, generate a JWT and send it in a cookie
        const token = response.token;
        return res.status(200).json({
          success: true,
          message: response.message,
          token: response.token,
        });
      } else {
        res.status(200).json({ success: false, message: response.message });
      }
    }
  });
});

router.get("/user", authMiddleware.authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

router.get("/user/role", authMiddleware.authenticateUser, async (req, res) => {
  try {
    const role = req.user.role;
    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

module.exports = router;
