//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("auth.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const authPackage = grpcObject.authPackage;

//data
const mongoose = require("mongoose");
const User = require("./models/user");

//jsonwebtoken
const jwtUtils = require("../../utils/jwt");

/*------------------------------------------------------------------------------------------------ */
//config
const path = require("path");
const config = require(path.join(__dirname, "..", "..", "config", "config.js"));
const mongoHost = config.mongo.host;
const mongoPort = config.mongo.port;
const mongoDatabase = config.mongo.database;
const serviceHost = config.grpc.authServiceHost;
const servicePort = config.grpc.authServicePort;

//Connect to MongoDB
mongoose
  .connect(
    "mongodb://" + mongoHost + ":" + mongoPort + "/" + mongoDatabase + "",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

//Implement gRPC server
const server = new grpc.Server();
server.bind(
  serviceHost + ":" + servicePort,
  grpc.ServerCredentials.createInsecure()
);

/*------------------------------------------------------------------------------------------------ */

server.addService(authPackage.AuthService.service, {
  loginUser: loginUser,
});

async function loginUser(call, callback) {
  try {
    // Retrieve user credentials from the request
    const { email, password } = call.request;

    // Check user credentials and authenticate
    const user = await User.findOne({ email });

    if (!user) {
      callback(null, {
        success: false,
        message: "Invalid credentials",
        token: "",
      });
      return;
    } else {
      const isPwdCorrect = await user.comparePassword(password);
      if (!isPwdCorrect) {
        callback(null, {
          success: false,
          message: "Invalid credentials",
          token: "",
        });
        return;
      }
    }

    // Generate a JWT token
    const token = jwtUtils.generateAccessToken(user._id);

    callback(null, {
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error during user login:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "An error occurred during user login",
    });
  }
}
server.start();
console.log("gRPC server running on port " + servicePort);
