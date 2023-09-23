//  menu-service/server.js

//grpc setup
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTOPATH = __dirname + "/menu.proto";
const packageDef = protoLoader.loadSync(PROTOPATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const menuPackage = grpcObject.menuPackage;

//database
const mongoose = require("mongoose");
const MenuItem = require("./models/menuItem");

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
const serviceHost = config.grpc.menuServiceHost;
const servicePort = config.grpc.menuServicePort;

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
server.addService(menuPackage.Menu.service, {
  getMenuItems: getMenuItems,
  addMenuItem: addMenuItem,
});

async function getMenuItems(call, callback) {
  try {
    const menuItems = await MenuItem.find();
    const menuItemsResponse = { items: menuItems };
    callback(null, menuItemsResponse);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error fetching menu items",
    });
  }
}

async function addMenuItem(call, callback) {
  try {
    const newItem = new MenuItem(call.request);
    await newItem.save();

    const response = { success: true, message: "Added menu item successfully" };
    callback(null, response);
  } catch (error) {
    console.error("Error adding menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error adding menu item",
    });
  }
}

server.start();
console.log("gRPC server running on port " + servicePort);
