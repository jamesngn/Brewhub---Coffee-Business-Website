//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTOPATH = __dirname + "/admin.proto";
const packageDef = protoLoader.loadSync(PROTOPATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const adminPackage = grpcObject.adminPackage;

//data
const mongoose = require("mongoose");
const User = require("./models/user");
const { validateUser } = require("../../shared/src/validation/userValidator");

/*------------------------------------------------------------------------------------------------ */
//config
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

//Import other services
// const { orderClient } = require("../../order-service/src/client");

server.addService(adminPackage.AdminService.service, {
  RegisterAdmin: RegisterAdmin,
  ManageOrders: ManageOrders,
});

async function RegisterAdmin(call, callback) {
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

// async function ManageOrders(call, callback) {
//   try {
//     const request = call.request;
//     const action = request.action;
//     console.log(call.request);
//     switch (action) {
//       case 1:
//         // Fetch order details from the Order Service
//         orderClient.GetOrderDetails(request.orderId, (response) => {
//           callback(null, {
//             success: true,
//             message: `Order with ID ${orderId} has been processed.`,
//             orderDetails: JSON.stringify(response),
//           });
//         });
//         break;
//       case 2:
//         orderClient.UpdateOrderStatus(
//           request.orderId,
//           request.newStatus,
//           (response) => {
//             callback(null, {
//               success: response.success,
//               message: response.message,
//               orderDetails: "",
//             });
//           }
//         );
//         break;
//       default:
//         callback({
//           code: grpc.status.INVALID_ARGUMENT,
//           details: "Invalid action specified.",
//         });
//         break;
//     }
//   } catch (error) {
//     callback({
//       code: grpc.status.INVALID_ARGUMENT,
//       details: "Invalid action specified.",
//     });
//   }
// }

server.start();
console.log("gRPC server running on port " + servicePort);
