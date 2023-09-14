const { expect } = require("chai");
const { adminClient } = require("../../src/client");

describe("admin-service", () => {
  describe("RegisterAdmin", () => {
    it("should return validation errors message if username is empty", async () => {
      const request = {
        username: "",
        email: "user@example.com",
        password: "password123",
      };
      const response = await new Promise((resolve) => {
        adminClient.RegisterAdmin(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Username is required",
      });
    });
    it("should return validation errors message if username, email, password are empty", async () => {
      const request = {
        username: "",
        email: "",
        password: "",
      };
      const response = await new Promise((resolve) => {
        adminClient.RegisterAdmin(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message:
          "Username is required, Email is required, Password is required",
      });
    });
    it("should return validation errors message if email input does not match email format", async () => {
      const request = {
        username: "quang",
        email: "user@",
        password: "password123",
      };
      const response = await new Promise((resolve) => {
        adminClient.RegisterAdmin(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Invalid email format",
      });
    });
    it("should return validation errors message if password input is less than 6 characters long", async () => {
      const request = {
        username: "quang",
        email: "user@example.com",
        password: "12345",
      };
      const response = await new Promise((resolve) => {
        adminClient.RegisterAdmin(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    });
    it("should return errors message if email input already exits", async () => {
      const request = {
        username: "quang",
        email: "user@admin.com",
        password: "password123",
      };
      const response = await new Promise((resolve) => {
        adminClient.RegisterAdmin(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Admin already exists",
      });
    });
    it("should return successful message if resigistration does not have any errors", async () => {
      const request = {
        username: "quang",
        email: "newUser@admin.com",
        password: "password123",
      };
      const response = await new Promise((resolve) => {
        adminClient.RegisterAdmin(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: true,
        message: "Admin registered successfully",
      });
    });
  });
});
