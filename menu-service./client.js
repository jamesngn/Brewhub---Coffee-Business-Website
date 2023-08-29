//  menu-service/server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("menu.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const menuPackage = grpcObject.menuPackage;

const menuClient = new menuPackage.Menu(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

//add menu item
const newItem = { name: "new drink", price: 3.39 };
menuClient.addMenuItem(newItem, (err, response) => {
  if (!err) {
    console.log("Added menu item:", response);
  } else {
    console.error("Error adding menu item:", err.details);
  }
});
