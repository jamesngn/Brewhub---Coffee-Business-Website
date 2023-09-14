//unit testing framework
const { expect } = require("chai");
const { authClient } = require("../../src/client");

describe("auth-service", () => {
  describe("loginUser", () => {
    it("should return failed message if user does not exist", async () => {
      const request = {
        email: "nonexistent@example.com",
        password: "password123",
      };

      const response = await new Promise((resolve) => {
        authClient.loginUser(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Invalid credentials",
        token: "",
      });
    });

    it("should return successful message if user exists", async () => {
      const request = {
        email: "user@example.com",
        password: "password123",
      };

      const response = await new Promise((resolve) => {
        authClient.loginUser(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response.success).to.be.true;
      expect(response.response.message).to.equal("Logged in successfully");
      expect(response.response.token).not.to.be.null;
    });
  });
});
