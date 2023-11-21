const { expect } = require("chai");
const { userClient } = require("../../src/client");

describe("user-service", () => {
  // describe("registerUser", () => {
  //   it("should return validation errors message if username is empty", async () => {
  //     const request = {
  //       username: "",
  //       email: "user@example.com",
  //       password: "password123",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.registerUser(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: false,
  //       message: "Username is required",
  //     });
  //   });
  //   it("should return validation errors message if username, email, password are empty", async () => {
  //     const request = {
  //       username: "",
  //       email: "",
  //       password: "",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.registerUser(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: false,
  //       message:
  //         "Username is required, Email is required, Password is required",
  //     });
  //   });
  //   it("should return validation errors message if email input does not match email format", async () => {
  //     const request = {
  //       username: "quang",
  //       email: "user@",
  //       password: "password123",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.registerUser(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: false,
  //       message: "Invalid email format",
  //     });
  //   });
  //   it("should return validation errors message if password input is less than 6 characters long", async () => {
  //     const request = {
  //       username: "quang",
  //       email: "user@example.com",
  //       password: "12345",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.registerUser(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: false,
  //       message: "Password must be at least 6 characters long",
  //     });
  //   });
  //   it("should return errors message if email input already exits", async () => {
  //     const request = {
  //       username: "quang",
  //       email: "user@example.com",
  //       password: "password123",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.registerUser(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: false,
  //       message: "User already exists",
  //     });
  //   });
  //   it("should return successful message if resigistration does not have any errors", async () => {
  //     const request = {
  //       username: "quang",
  //       email: "newUser@example.com",
  //       password: "password123",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.registerUser(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: true,
  //       message: "User registered successfully",
  //     });
  //   });
  // });
  // describe("addPromoCode", () => {
  //   it("should return successful message if valid user adds valid promotion code.", async () => {
  //     const request = {
  //       userId: "65227491abf4a25eb91fec90",
  //       promoCodeId: "654329824d784aa39c763046",
  //     };
  //     const response = await new Promise((resolve) => {
  //       userClient.addPromoCode(request, (error, response) => {
  //         resolve({ error, response });
  //       });
  //     });
  //     console.log(response);
  //     expect(response.error).to.be.null;
  //     expect(response.response).to.deep.equal({
  //       success: true,
  //       message: "Promo code added successfully",
  //     });
  //   });
  // });
  describe("retrievePromoCodes", () => {
    it("should return an array of promos if valid user is inputted.", async () => {
      const request = {
        userId: "65227491abf4a25eb91fec90",
      };
      const response = await new Promise((resolve) => {
        userClient.retrievePromoCodes(request, (error, response) => {
          resolve({ error, response });
        });
      });
      console.log(response);
      expect(response.error).to.be.null;
      expect(response.response.promos).to.be.exist;
    });
  });
  describe("removePromoCode", () => {
    it("should return a successful message if valid promo code is removed out of the valid user.", async () => {
      const request = {
        userId: "65227491abf4a25eb91fec90",
        promoCodeId: "654329824d784aa39c763046",
      };
      const response = await new Promise((resolve) => {
        userClient.removePromoCode(request, (error, response) => {
          resolve({ error, response });
        });
      });
      console.log(response);
      expect(response.error).to.be.null;
      expect(response.response).to.be.exist;
    });
  });
});
