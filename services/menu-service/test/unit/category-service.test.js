const { expect } = require("chai");
const { menuClient } = require("../../src/client");

describe("category-service", () => {
  describe("addCategory", () => {
    it("should return successful message if category is added", async () => {
      const request = {
        category: "Beverages", // Name of the category
        subCategory: "Cold Brew", // Sub-category (optional)
      };
      const response = await new Promise((resolve) => {
        menuClient.addCategory(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: true,
        message: "Added category successfully",
      });
    });

    it("should return failed message if category already exists", async () => {
      const request = {
        category: "Beverages", // Name of the category
        subCategory: "Hot Drinks", // Sub-category (optional)
      };
      const response = await new Promise((resolve) => {
        menuClient.addCategory(request, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response).to.deep.equal({
        success: false,
        message: "Category already exists",
      });
    });
  });

  describe("getCategory", () => {
    it("should return all categories if category items are retrived successfully ", async () => {
      const response = await new Promise((resolve) => {
        menuClient.getCategory({}, (error, response) => {
          resolve({ error, response });
        });
      });
      expect(response.error).to.be.null;
      expect(response.response.categories).to.exist;
    });
  });

  describe("getCategoryId", () => {
    it("should return category Id if the exisitng category and subcategory are inputted", async () => {
      const request = {
        category: "Beverages", // Name of the category
        subCategory: "Cold Brew", // Sub-category (optional)
      };
      const response = await new Promise((resolve) => {
        menuClient.getCategoryId(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response.id).to.exist;
    });

    it("should return null categoryId if the category and subcategory are not existed", async () => {
      const request = {
        category: "Beverages", // Name of the category
        subCategory: "Cold Coffee", // Sub-category (optional)
      };
      const response = await new Promise((resolve) => {
        menuClient.getCategoryId(request, (error, response) => {
          resolve({ error, response });
        });
      });

      expect(response.error).to.be.null;
      expect(response.response.id).to.be.undefined;
    });
  });
});
