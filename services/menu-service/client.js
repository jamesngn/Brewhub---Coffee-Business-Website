//  menu-service/server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("menu.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const menuPackage = grpcObject.menuPackage;

//config:
const path = require("path");
const config = require(path.join(__dirname, "..", "..", "config", "config.js"));
const serviceHost = config.grpc.menuServiceHost;
const servicePort = config.grpc.menuServicePort;

const menuClient = new menuPackage.Menu(
  serviceHost + ":" + servicePort,
  grpc.credentials.createInsecure()
);

//client -> call service -> check in menuPackage -> proto request (HTTP 2.0) -> server
//server -> callback -> response for client.js

//add menu item
const newItem = { name: "cappuchino", price: 4.99 };
menuClient.addMenuItem(newItem, (err, response) => {
  if (!err) {
    console.log("Added menu item:", response);
  } else {
    console.error("Error adding menu item:", err.details);
  }
});
