//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("user.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const mongoose = require("mongoose");
const User = require("./models/user");
const { validateUser } = require("../validation/userValidator");

//Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/brewhub_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

//Implement gRPC server
const server = new grpc.Server();
server.bind("0.0.0.0:50053", grpc.ServerCredentials.createInsecure());

server.addService(userPackage.UserService.service, {
  registerUser: registerUser,
});

async function registerUser(call, callback) {
  const { username, email, password } = call.request;
  // Validate user input
  const validationErrors = validateUser({ username, email, password });
  if (validationErrors) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: validationErrors.join(", "),
    });
    return;
  }

  try {
    //Create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      createdAt: new Date(),
    });

    //Check if the user already exits in db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      callback(null, { success: false, message: "User already exists" });
    }

    await newUser.save();
    callback(null, { success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error registering user",
    });
  }
}

server.start();
console.log("gRPC server running on port 50053");
