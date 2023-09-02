//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("admin.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const adminPackage = grpcObject.adminPackage;

//data
const mongoose = require("mongoose");
const User = require("./models/user");
const { validateUser } = require("../../validation/userValidator");

/*------------------------------------------------------------------------------------------------ */
//config
const path = require("path");
const config = require(path.join(__dirname, "..", "..", "config", "config.js"));
const mongoHost = config.mongo.host;
const mongoPort = config.mongo.port;
const mongoDatabase = config.mongo.database;
const serviceHost = config.grpc.adminServiceHost;
const servicePort = config.grpc.adminServicePort;

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

server.addService(adminPackage.AdminService.service, {
  registerAdmin: registerAdmin,
});

async function registerAdmin(call, callback) {
  const { username, email, password } = call.request;
  // Validate user input
  const validationErrors = validateUser({ username, email, password });
  if (validationErrors) {
    callback(null, {
      success: false,
      message: validationErrors.join(", "),
    });
    return;
  }

  try {
    //Create a new user
    const newAdmin = new User({
      username: username,
      email: email,
      password: password,
      createdAt: new Date(),
      role: "admin",
    });

    //Check if the user already exits in db
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      callback(null, { success: false, message: "Admin already exists" });
    }

    await newAdmin.save();
    callback(null, { success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error registering admin",
    });
  }
}
server.start();
console.log("gRPC server running on port " + servicePort);
