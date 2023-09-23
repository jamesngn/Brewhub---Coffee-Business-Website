//unit testing framework
const { expect } = require("chai");
const { menuClient } = require("../../src/client");

describe("menu-service", () => {
  describe("addMenuItem", () => {
    it("should return successful message if menu item is added", async () => {
      const request = {
        name: "Cold Brew Coffee",
        description: "Smooth and refreshing cold brew coffee.",
        category: "Coffee",
        price: 4.99,
      };

      const response = await new Promise((resolve) => {
        menuClient.addMenuItem(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: true,
        message: "Added menu item successfully",
      });
    });
  });

  describe("getMenuItems", () => {
    it("should return all items if menu items are retrived successfully", async () => {
      const response = await new Promise((resolve) => {
        menuClient.getMenuItems({}, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response.items).to.exist;
    });
  });
});
