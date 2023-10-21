//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("promo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const promoPackage = grpcObject.promoPackage;

//data
const mongoose = require("mongoose");
const Promo = require("./models/promo");
const ObjectId = mongoose.Types.ObjectId;

/*------------------------------------------------------------------------------------------------ */
//config
const path = require("path");
const config = require(path.join(
  __dirname,
  "..",
  "shared",
  "src",
  "config",
  "config.js"
));

const mongoHost = config.mongo.host;
const mongoPort = config.mongo.port;
const mongoDatabase = config.mongo.database;
const serviceHost = config.grpc.promoServiceHost;
const servicePort = config.grpc.promoServicePort;

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

server.addService(promoPackage.PromoService.service, {
  CreatePromotion: CreatePromotion,
  GetPromotion: GetPromotion,
  UpdatePromotion: UpdatePromotion,
  DeletePromotion: DeletePromotion,
});

async function CreatePromotion(call, callback) {
  try {
    const {
      promoCode,
      discountPercentage,
      expirationDate,
      description,
      isActive,
    } = call.request;
    //check if promoCode exits:
    const isPromoCodeUnique = Promo.findOne({ promoCode });
    if (isPromoCodeUnique) {
      callback({
        code: grpc.status.ALREADY_EXISTS,
        details: "Error: The promotion code has been added already.",
      });
      return;
    }
    const newPromo = new Promo({
      promoCode,
      discountPercentage,
      expirationDate,
      description,
      isActive,
    });
    await newPromo.save();
    console.log(newPromo);
    const response = newPromo;
    callback(null, response);
  } catch (error) {
    console.error("Error creating an promotion code: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error creating an promotion code.",
    });
  }
}
async function GetPromotion(call, callback) {
  try {
    const { promoCode } = call.request;
    const promo = await Promo.findOne({ promoCode: promoCode });

    if (!promo) {
      console.error("Promotion code not found");
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Promotion Code not found",
      });
      return;
    } else {
      const response = promo;
      callback(null, response);
    }
  } catch (error) {
    console.error("Error creating an promotion code: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error creating an promotion code.",
    });
  }
}
async function UpdatePromotion(call, callback) {}
async function DeletePromotion(call, callback) {}

server.start();
console.log("gRPC server running on port " + servicePort);
