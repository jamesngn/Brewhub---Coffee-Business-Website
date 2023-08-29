//  menu-service/server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("menu.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const menuPackage = grpcObject.menuPackage;

const mongoose = require("mongoose");
const MenuItem = require("./models/menuItem");

//Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/menus", {
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
server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

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
    callback(null, {
      id: newItem._id.toString(),
      name: newItem.name,
      price: newItem.price,
    });
  } catch (error) {
    console.error("Error adding menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error adding menu item",
    });
  }
}

server.start();
console.log("gRPC server running on port 50051");
