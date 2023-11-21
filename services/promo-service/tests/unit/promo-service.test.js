const { expect } = require("chai");
const { promoClient } = require("../../src/client");

describe("promo-service", () => {
  // describe("CreatePromoCode", () => {
  //   it("should return successful message after creating promotion code successfully", async () => {
  //     const request = {
  //       code: "SUMMER20",
  //       discountType: "Percentage",
  //       discountValue: 20,
  //       applicableTo: {
  //         specificProducts: [],
  //         specificCategories: [],
  //         specificUser: [],
  //         minOrderAmount: 50,
  //         limitedTimeOffer: {
  //           startDate: new Date("2023-06-01"),
  //           endDate: new Date("2023-09-01"),
  //         },
  //       },
  //       active: true,
  //       maxUses: 100,
  //       usesRemaining: 100,
  //       usedCountPerUser: 1,
  //       createdBy: "652380642b0da195bc18255b",
  //     };

  //     const request3 = {
  //       code: "FLASHSALE",
  //       discountType: "Percentage",
  //       discountValue: 25, // 25% off
  //       applicableTo: {
  //         specificProducts: [],
  //         specificCategories: [],
  //         specificUser: [],
  //         minOrderAmount: 20,
  //         limitedTimeOffer: {
  //           startDate: new Date("2023-11-01"),
  //           endDate: new Date("2023-11-05"),
  //         },
  //       },
  //       active: true,
  //       maxUses: 1000,
  //       usesRemaining: 1000,
  //       usedCountPerUser: 1,
  //       createdBy: "652380642b0da195bc18255b",
  //     };

  //     const response = await new Promise((resolve) => {
  //       promoClient.CreatePromoCode(request3, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     const responseData = response.response;
  //     console.log(responseData);
  //     expect(responseData).to.exist;

  //     expect(responseData.success).to.be.true;
  //     expect(responseData.message).to.be.equal(
  //       "Promo code created successfully"
  //     );
  //     expect(responseData.promoCode).to.exist;
  //   });
  // });
  // describe("GetPromoCodeById", () => {
  //   it("should return a promo details if ID is valid", async () => {
  //     const request = { id: "654329824d784aa39c763046" };
  //     const response = await new Promise((resolve) => {
  //       promoClient.GetPromoCodeById(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     const data = response.response;
  //     expect(data).to.exist;
  //     expect(data.code).to.exist;
  //   });
  // });
  // describe("GetPromoCodeByCode", () => {
  //   it("should return a promo details if promo code is valid", async () => {
  //     const request = { id: "SUMMER20" };
  //     const response = await new Promise((resolve) => {
  //       promoClient.GetPromoCodeByCode(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     const data = response.response;
  //     expect(data).to.exist;
  //   });
  //   it("should return an error message if promo code is invalid", async () => {
  //     const request = { id: "INVALIDPROMOCODE" };
  //     const response = await new Promise((resolve) => {
  //       promoClient.GetPromoCodeByCode(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.exist;
  //     expect(response.error.code).to.equal(5);
  //     expect(response.error.details).to.equal("Promo Code Not Found");
  //     expect(response.response).to.be.undefined;
  //   });
  // });

  describe("GetPromoCodes", () => {
    it("should return promo array if all promo details are retrieved", async () => {
      const response = await new Promise((resolve) => {
        promoClient.GetPromoCodes({}, (error, response) => {
          resolve({ error, response });
        });
      });
    });
  });
  // describe("updatePromoCode", () => {
  // it("should return a successful message and updated promo code if promo code is updated successfully (update discountValue and maxUses)", async () => {
  //   const request = {
  //     promoCodeId: "654329924d784aa39c76304a",
  //     updatedDetails: {
  //       discountValue: 50, // New discount value
  //       maxUses: 200, // New maximum number of uses
  //     },
  //   };
  //   const response = await new Promise((resolve) => {
  //     promoClient.updatePromoCode(request, (error, response) => {
  //       resolve({ error, response });
  //     });
  //   });
  //   expect(response.error).to.be.null;
  //   const data = response.response;
  //   expect(data.updatedPromoCode.discountValue).to.be.equal(50);
  //   expect(data.updatedPromoCode.maxUses).to.be.equal(200);
  // });
  // it("should return a successful message and updated promo code if promo code is updated successfully (update active and usesRemaining)", async () => {
  //   const request = {
  //     promoCodeId: "654329924d784aa39c76304a",
  //     updatedDetails: {
  //       active: false,
  //       usesRemaining: 99,
  //     },
  //   };
  //   const response = await new Promise((resolve) => {
  //     promoClient.updatePromoCode(request, (error, response) => {
  //       resolve({ error, response });
  //     });
  //   });
  //   expect(response.error).to.be.null;
  //   const data = response.response;
  //   expect(data.updatedPromoCode.active).to.be.equal(false);
  //   expect(data.updatedPromoCode.usesRemaining).to.be.equal(99);
  // });
  // it("should return a successful message and updated promo code if promo code is updated successfully", async () => {
  //   const request = {
  //     promoCodeId: "654329924d784aa39c76304a",
  //     updatedDetails: {
  //       applicableTo: {
  //         specificProducts: ["654329924d784aa39c76304a"],
  //       },
  //     },
  //   };
  //   const response = await new Promise((resolve) => {
  //     promoClient.updatePromoCode(request, (error, response) => {
  //       resolve({ error, response });
  //     });
  //   });
  //   expect(response.error).to.be.null;
  //   const data = response.response;
  //   expect(data.applicableTo.specif);
  // });
  // it("should return a successful message and updated promo code if promo code is updated successfully", async () => {
  //   const request = {
  //     promoCodeId: "654b3400f3aa169bf928bb3a",
  //     updatedDetails: {
  //       applicableTo: {
  //         limitedTimeOffer: {
  //           startDate: null,
  //           endDate: null,
  //         },
  //         specificProducts: [],
  //         minOrderAmount: 20,
  //       },
  //     },
  //   };
  //   const response = await new Promise((resolve) => {
  //     promoClient.updatePromoCode(request, (error, response) => {
  //       resolve({ error, response });
  //     });
  //   });
  //   console.log(response);
  //   expect(response.error).to.be.null;
  // const data = response.response;
  // expect(data.applicableTo.specif);
  //   });
  // });
  // describe("ApplyPromoCodeToOrder", () => {
  //   it("should return successful message if valid promotion code is applied to order", async () => {
  //     const request = {
  //       promoCode: "SUMMER20",
  //       orderId: "6541f6487c53fcd09defb153",
  //     };
  //     const response = await new Promise((resolve) => {
  //       promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     it("should return invalid response if promotion code with specific user condition is applied to the order with invalid userId", async () => {
  //       //Update the promo:
  //       const updateRequest = {
  //         promoCodeId: "654329824d784aa39c763046",
  //         updatedDetails: {
  //           active: true,
  //           usesRemaining: 100,
  //           applicableTo: {
  //             minOrderAmount: 0,
  //             specificProducts: [],
  //             specificUser: ["654329924d784aa39c76304a"],
  //             limitedTimeOffer: {
  //               startDate: null,
  //               endDate: null,
  //             },
  //           },
  //         },
  //       };
  //       const updateResponse = await new Promise((resolve) => {
  //         promoClient.updatePromoCode(updateRequest, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(updateResponse.error).to.be.null;

  //       const request = {
  //         promoCode: "SUMMER20",
  //         orderId: "6541f6487c53fcd09defb153",
  //       };

  //       const response = await new Promise((resolve) => {
  //         promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(response.error).to.exist;
  //       expect(response.error.code).to.be.equal(3);
  //       expect(response.error.details).to.be.equal(
  //         "Promo code is not applicable to you."
  //       );
  //     });

  //     it("should return invalid response if promotion code with specific product condition is applied to the order with invalid products", async () => {
  //       //Update the promo:
  //       const updateRequest = {
  //         promoCodeId: "654329824d784aa39c763046",
  //         updatedDetails: {
  //           active: true,
  //           usesRemaining: 100,
  //           applicableTo: {
  //             minOrderAmount: 0,
  //             specificUser: [],
  //             specificProducts: ["654329924d784aa39c76304a"],
  //             limitedTimeOffer: {
  //               startDate: null,
  //               endDate: null,
  //             },
  //           },
  //         },
  //       };
  //       const updateResponse = await new Promise((resolve) => {
  //         promoClient.updatePromoCode(updateRequest, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(updateResponse.error).to.be.null;

  //       const request = {
  //         promoCode: "SUMMER20",
  //         orderId: "6541f6487c53fcd09defb153",
  //       };

  //       const response = await new Promise((resolve) => {
  //         promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(response.error).to.exist;
  //       expect(response.error.code).to.be.equal(3);
  //       expect(response.error.details).to.be.equal(
  //         "Promo code is not applicable to some products in the order."
  //       );
  //     });

  //     it("should return invalid response if a deactivated promotion codeis applied to the order", async () => {
  //       //Update the promo:
  //       const updateRequest = {
  //         promoCodeId: "654329824d784aa39c763046",
  //         updatedDetails: {
  //           active: false,
  //           usesRemaining: 100,
  //           applicableTo: {
  //             minOrderAmount: 0,
  //             specificUser: [],
  //             specificProducts: [],
  //             limitedTimeOffer: {
  //               startDate: null,
  //               endDate: null,
  //             },
  //           },
  //         },
  //       };
  //       const updateResponse = await new Promise((resolve) => {
  //         promoClient.updatePromoCode(updateRequest, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(updateResponse.error).to.be.null;

  //       const request = {
  //         promoCode: "SUMMER20",
  //         orderId: "6541f6487c53fcd09defb153",
  //       };

  //       const response = await new Promise((resolve) => {
  //         promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(response.error).to.exist;
  //       expect(response.error.code).to.be.equal(3);
  //       expect(response.error.details).to.be.equal("Promo code is not active.");
  //     });

  //     it("should return invalid response if promotion code that has reached maximum limit is applied to the order", async () => {
  //       //Update the promo:
  //       const updateRequest = {
  //         promoCodeId: "654329824d784aa39c763046",
  //         updatedDetails: {
  //           active: true,
  //           usesRemaining: 0,
  //           applicableTo: {
  //             minOrderAmount: 0,
  //             specificUser: [],
  //             specificProducts: [],
  //             limitedTimeOffer: {
  //               startDate: null,
  //               endDate: null,
  //             },
  //           },
  //         },
  //       };
  //       const updateResponse = await new Promise((resolve) => {
  //         promoClient.updatePromoCode(updateRequest, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(updateResponse.error).to.be.null;

  //       const request = {
  //         promoCode: "SUMMER20",
  //         orderId: "6541f6487c53fcd09defb153",
  //       };

  //       const response = await new Promise((resolve) => {
  //         promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(response.error).to.exist;
  //       expect(response.error.code).to.be.equal(3);
  //       expect(response.error.details).to.be.equal(
  //         "Promo code has reached the maximum use limit."
  //       );
  //     });

  //     it("should return invalid response if expired promotion code with limited offer condition is applied to the order", async () => {
  //       //Update the promo:
  //       const updateRequest = {
  //         promoCodeId: "654329824d784aa39c763046",
  //         updatedDetails: {
  //           active: true,
  //           usesRemaining: 100,
  //           applicableTo: {
  //             minOrderAmount: 0,
  //             specificUser: [],
  //             specificProducts: [],
  //             limitedTimeOffer: {
  //               startDate: new Date("2023-10-01"),
  //               endDate: new Date("2023-10-02"),
  //             },
  //           },
  //         },
  //       };
  //       const updateResponse = await new Promise((resolve) => {
  //         promoClient.updatePromoCode(updateRequest, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       // console.log(JSON.stringify(updateResponse));
  //       expect(updateResponse.error).to.be.null;

  //       const request = {
  //         promoCode: "SUMMER20",
  //         orderId: "6541f6487c53fcd09defb153",
  //       };

  //       const response = await new Promise((resolve) => {
  //         promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //           resolve({ error, response });
  //         });
  //       });
  //       expect(response.error).to.exist;
  //       expect(response.error.code).to.be.equal(3);
  //       expect(response.error.details).to.be.equal("Promo code has expired.");
  //     });
  //   });

  //   it("should return invalid response if expired promotion code with limited offer condition is applied to the order", async () => {
  //     //Update the promo:
  //     const updateRequest = {
  //       promoCodeId: "654329824d784aa39c763046",
  //       updatedDetails: {
  //         active: true,
  //         usesRemaining: 100,
  //         applicableTo: {
  //           minOrderAmount: 500,
  //           specificUser: [],
  //           specificProducts: [],
  //           limitedTimeOffer: {
  //             startDate: null,
  //             endDate: null,
  //           },
  //         },
  //       },
  //     };
  //     const updateResponse = await new Promise((resolve) => {
  //       promoClient.updatePromoCode(updateRequest, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     // console.log(JSON.stringify(updateResponse));
  //     expect(updateResponse.error).to.be.null;

  //     const request = {
  //       promoCode: "SUMMER20",
  //       orderId: "6541f6487c53fcd09defb153",
  //     };

  //     const response = await new Promise((resolve) => {
  //       promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.exist;
  //     expect(response.error.code).to.be.equal(3);
  //     expect(response.error.details).to.be.equal(
  //       "Minimum order amount of $500 required."
  //     );
  //   });

  //   it("should return valid response if promotion code with various conditions is applied to the valid order", async () => {
  //     //Update the promo:
  //     const updateRequest = {
  //       promoCodeId: "654329824d784aa39c763046",
  //       updatedDetails: {
  //         active: true,
  //         usesRemaining: 100,
  //         applicableTo: {
  //           minOrderAmount: 200,
  //           specificUser: [
  //             "653321b0b6b2e791b34c31c4",
  //             "651e1b02f4ddc806c95fa704",
  //           ],
  //           specificProducts: ["651e1b02f4ddc806c95fa704"],
  //           limitedTimeOffer: {
  //             startDate: new Date("2023-11-01"),
  //             endDate: new Date("2023-11-11"),
  //           },
  //         },
  //       },
  //     };
  //     const updateResponse = await new Promise((resolve) => {
  //       promoClient.updatePromoCode(updateRequest, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     // console.log(JSON.stringify(updateResponse));
  //     expect(updateResponse.error).to.be.null;

  //     const request = {
  //       promoCode: "SUMMER20",
  //       orderId: "6541f6487c53fcd09defb153",
  //     };

  //     const response = await new Promise((resolve) => {
  //       promoClient.ApplyPromoCodeToOrder(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });

  //     expect(response.error).to.be.null;
  //     expect(response.response.success).to.be.true;
  //     expect(response.response.message).to.be.equal("");
  //   });
  // });
  // describe("ApplyPromoCodeToOrderDetails", () => {
  //   it("should return successful message if valid promotion code is applied to order details", async () => {
  //     //Update the promo:
  //     const updateRequest = {
  //       promoCodeId: "654329824d784aa39c763046",
  //       updatedDetails: {
  //         active: true,
  //         usesRemaining: 100,
  //         discountType: "Percentage",
  //         applicableTo: {
  //           minOrderAmount: 0,
  //           specificUser: ["65227491abf4a25eb91fec90"],
  //           specificProducts: [],
  //           limitedTimeOffer: {
  //             startDate: null,
  //             endDate: null,
  //           },
  //         },
  //       },
  //     };
  //     const updateResponse = await new Promise((resolve) => {
  //       promoClient.updatePromoCode(updateRequest, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     // console.log(JSON.stringify(updateResponse));
  //     expect(updateResponse.error).to.be.null;
  //     const request = {
  //       promoCode: "SUMMER20",
  //       userId: "65227491abf4a25eb91fec90",
  //       orderItems: [
  //         {
  //           itemId: "651e19576e84894cef3625d2",
  //           itemName: "Cold Brew Coffee",
  //           quantity: 3,
  //           price: 5.99,
  //           subtotal: 17.97,
  //         },
  //         {
  //           itemId: "651e1abdf4ddc806c95fa6fb",
  //           itemName: "Green Tea",
  //           quantity: 4,
  //           price: 2.99,
  //           subtotal: 11.96,
  //         },
  //         {
  //           itemId: "651e1b02f4ddc806c95fa704",
  //           itemName: "Chocolate Croissant",
  //           quantity: 3,
  //           price: 2.49,
  //           subtotal: 7.470000000000001,
  //         },
  //         {
  //           itemId: "651e1b0ff4ddc806c95fa706",
  //           itemName: "Blueberry Muffin",
  //           quantity: 1,
  //           price: 1.99,
  //           subtotal: 1.99,
  //         },
  //         {
  //           itemId: "651e1acbf4ddc806c95fa6fd",
  //           itemName: "Strawberry Banana Smoothie",
  //           quantity: 3,
  //           price: 4.99,
  //           subtotal: 14.97,
  //         },
  //       ],
  //     };
  //     const response = await new Promise((resolve) => {
  //       promoClient.ApplyPromoCodeToOrderDetails(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     console.log(response.response.orderItems);
  //   });
  // });
});
