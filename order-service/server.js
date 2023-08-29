//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("order.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const orderPackage = grpcObject.orderPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:50052", grpc.ServerCredentials.createInsecure());

server.addService(orderPackage.Order.service, {
  placeOrder: placeOrder,
});
server.start();

const orders = [];
function placeOrder(call, callback) {
  const orderResponse = {
    orderId: "O1",
    status: "200",
  };
  orders.push(orderResponse);
  callback(null, orderResponse);
}
