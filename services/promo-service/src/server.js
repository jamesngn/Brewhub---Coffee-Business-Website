//server.js
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTOPATH = __dirname + "/promo.proto";
const packageDef = protoLoader.loadSync(PROTOPATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const promoPackage = grpcObject.promoPackage;

//data
const mongoose = require("mongoose");
const Promo = require("./models/promo");
const Order = require("./models/order");
const ObjectId = mongoose.Types.ObjectId;

/*------------------------------------------------------------------------------------------------ */
//config
const path = require("path");
const {
  validatePromoCode,
} = require("../../shared/src/validation/promoCodeValidator");
const { calculateDiscounts } = require("../../shared/src/utils/orderUtils");
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
  CreatePromoCode: CreatePromoCode,
  GetPromoCodes: GetPromoCodes,
  GetPromoCodeById: GetPromoCodeById,
  GetPromoCodeByCode: GetPromoCodeByCode,
  updatePromoCode: updatePromoCode,
  ApplyPromoCodeToOrder: ApplyPromoCodeToOrder,
  ApplyPromoCodeToOrderDetails: ApplyPromoCodeToOrderDetails,
});

async function CreatePromoCode(call, callback) {
  try {
    const {
      code,
      discountType,
      discountValue,
      applicableTo,
      active,
      maxUses,
      usesRemaining,
      usedCountPerUser,
      createdBy,
    } = call.request;

    // Create a new Promo instance
    const newPromo = new Promo({
      _id: new ObjectId(),
      code,
      discountType,
      discountValue,
      applicableTo,
      active,
      maxUses,
      usesRemaining,
      usedCountPerUser,
      createdBy: new ObjectId(createdBy),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new promo code
    await newPromo.save();

    // Return success status and the created promo code
    callback(null, {
      success: true,
      message: "Promo code created successfully",
      promoCode: newPromo,
    });
  } catch (error) {
    console.error("Error creating a promo code:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error creating a promo code",
    });
  }
}

async function GetPromoCodes(call, callback) {
  try {
    const promos = await Promo.find();
    console.log(promos);
    callback(null, { promos: promos });
  } catch (error) {
    console.error("Error fetching promotions:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error fetching promotions.",
    });
  }
}

async function GetPromoCodeById(call, callback) {
  try {
    const { id } = call.request;
    const promo = await Promo.findById(id);
    if (!promo) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Promo Not Found",
      });
    } else {
      callback(null, promo);
    }
  } catch (error) {
    console.error("Error getting a promo code:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error getting a promo code",
    });
  }
}

async function GetPromoCodeByCode(call, callback) {
  try {
    const { id } = call.request;
    const promos = await Promo.find({ code: id });
    if (promos.length === 0) {
      callback(null, { promos: [] });
    } else {
      const response = { promos: promos };
      callback(null, response);
    }
  } catch (error) {
    console.error("Error getting a promo code:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error getting a promo code",
    });
  }
}

async function updatePromoCode(call, callback) {
  const { promoCodeId, updatedDetails } = call.request;

  try {
    const promoCode = await Promo.findOne({ _id: promoCodeId });

    if (!promoCode) {
      callback(null, { success: false, message: "Promo code not found!" });
      return;
    }

    // Update promo code details
    Object.assign(promoCode, updatedDetails);

    // Update the updatedAt field
    promoCode.updatedAt = new Date();

    await promoCode.save();

    callback(null, { success: true, updatedPromoCode: promoCode });
  } catch (error) {
    console.error("Error updating promo code:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error updating promo code",
    });
  }
}

async function ApplyPromoCodeToOrder(call, callback) {
  const { promoCode, orderId } = call.request;
  try {
    // Step 1: Retrieve the promo code details
    const promoDetails = await Promo.findOne({ code: promoCode });
    if (!promoDetails) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Promo code not found.",
      });
      return;
    }
    // Step 2: Retrieve the order details
    const orderDetails = await Order.findById(orderId);
    if (!orderDetails) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Order Details not found.",
      });
      return;
    }
    // Step 3: Validate if the promo code can be applied to the order
    const result = validatePromoCode(promoDetails, orderDetails);
    if (!result.valid) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: result.message,
      });
      return;
    }

    callback(null, { success: true, message: "" });
  } catch (error) {
    console.error("Error applying promo code to order:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error applying promo code to order.",
    });
  }
}

async function ApplyPromoCodeToOrderDetails(call, callback) {
  const { promoCode, userId, orderItems } = call.request;
  try {
    if (!orderItems) {
      callback(null, {
        success: false,
        message: "Promotion Code cannot be applied to empty cart.",
      });
      return;
    }
    // Step 1: Retrieve the promo code details
    const promoDetails = await Promo.findById(promoCode);
    if (!promoDetails) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Promo code not found.",
        orderItems: orderItems,
      });
      return;
    }

    console.log("Promo Details:" + promoDetails);
    console.log(
      "User ID and Order Items: " + JSON.stringify({ userId, orderItems })
    );

    // Step 2: Validate if the promo code can be applied to the order
    const result = validatePromoCode(promoDetails, { userId, orderItems });
    console.log("Valdating promo code: " + JSON.stringify(result));
    if (!result.valid) {
      callback(null, {
        success: false,
        message: result.message,
      });
      return;
    }

    //Step 3:  Apply the promo code and calculate the discount
    let { updatedOrderItems, totalDiscount } = calculateDiscounts(
      promoDetails,
      orderItems
    );
    console.log({ updatedOrderItems, totalDiscount });

    //Step 4: Update promo code usage statistics (if needed)
    if (promoDetails.maxUses !== undefined) {
      promoDetails.usesRemaining -= 1;
      if (promoDetails.usesRemaining === 0) {
        promoDetails.active = false;
      }
      await promoDetails.save();
    }

    callback(null, {
      success: true,
      message: `Apply Promotion Code ${promoDetails.code} successfully.`,
      orderItems: updatedOrderItems.map((item) => {
        return {
          ...item,
          subtotal: item.price * item.quantity,
        };
      }),
      totalDiscount,
    });
  } catch (error) {
    console.error("Error applying promo code to order:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error applying promo code to order.",
    });
  }
}

server.start();
console.log("gRPC server running on port " + servicePort);
