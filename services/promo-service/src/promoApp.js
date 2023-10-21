const promoService = require("./promoService");

const args = process.argv.slice(2); // Get command-line arguments excluding node and script name

if (args.length === 0) {
  console.log("Usage: node orderApp.js [function]");
  console.log("Available functions: CreatePromotion, GetPromotion");
  process.exit(1);
}

const functionToExecute = args[0];

switch (functionToExecute) {
  case "CreatePromotion":
    var testData = {
      promoCode: "PROMO123", // A unique promo code
      discountPercentage: 0.15, // The discount percentage (15%)
      expirationDate: new Date("2023-12-31T23:59:59Z"), // The promo code expiration date
      description: "Get 15% off your order!", // A description of the promotion
      isActive: true, // Indicates whether the promotion is active or not
    };

    promoService.CreatePromotion(
      testData.promoCode,
      testData.discountPercentage,
      testData.expirationDate,
      testData.description,
      testData.isActive,
      (promoResponse) => {
        console.log("Promotion response:", promoResponse);
      }
    );
    break;

  case "GetPromotion":
    var testData = {
      promoCode: "PROMO12", // A unique promo code
    };

    promoService.GetPromotion(testData.promoCode, (promoResponse) => {
      console.log("Promotion response:", promoResponse);
    });
    break;
  default:
    console.log("Unknown function:", functionToExecute);
    console.log("Available functions: CreatePromotion, GetPromotion");
    break;
}
