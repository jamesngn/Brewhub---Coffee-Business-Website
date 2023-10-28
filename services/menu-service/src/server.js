//  menu-service/server.js

//grpc setup
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTOPATH = __dirname + "/menu.proto";
const packageDef = protoLoader.loadSync(PROTOPATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const menuPackage = grpcObject.menuPackage;

//database
const mongoose = require("mongoose");
const MenuItem = require("./models/menuItem");

/*------------------------------------------------------------------------------------------------ */
//config
const path = require("path");
const Category = require("./models/category");
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
const serviceHost = config.grpc.menuServiceHost;
const servicePort = config.grpc.menuServicePort;

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
server.addService(menuPackage.Menu.service, {
  getMenuItems: getMenuItems,
  getMenuItemsById: getMenuItemsById,
  addMenuItem: addMenuItem,
  getMenuItemsByCategoryId: getMenuItemsByCategoryId,
  getMenuItemsWithCategoryInfo: getMenuItemsWithCategoryInfo,
  addCategory: addCategory,
  getCategory: getCategory,
  getCategoryById: getCategoryById,
  getCategoryId: getCategoryId,
  deleteMenuItem: deleteMenuItem,
  updateMenuItem: updateMenuItem,
  deleteCategory: deleteCategory,
  updateCategory: updateCategory,
});

async function getMenuItems(call, callback) {
  try {
    const menuItems = await MenuItem.find();
    callback(null, { items: menuItems });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error fetching menu items",
    });
  }
}

async function getMenuItemsById(call, callback) {
  const { id } = call.request;
  try {
    const menuItem = await MenuItem.findById(id);
    callback(null, menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error fetching menu item",
    });
  }
}

async function addMenuItem(call, callback) {
  try {
    const menuItemExists = await MenuItem.findOne({ name: call.request.name });
    if (menuItemExists) {
      const response = { success: false, message: "Menu Item already exists" };
      callback(null, response);
    } else {
      const newItem = new MenuItem(call.request);
      await newItem.save();

      const response = {
        success: true,
        message: "Added menu item successfully",
      };
      callback(null, response);
    }
  } catch (error) {
    console.error("Error adding menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error adding menu item",
    });
  }
}

async function getMenuItemsByCategoryId(call, callback) {
  try {
    const { categoryId } = call.request;
    const menuItemsByCategoryId = await MenuItem.find({ category: categoryId });
    callback(null, { items: menuItemsByCategoryId });
  } catch (error) {
    console.error("Error fetching menu items by categoryId:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error fetching menu items by categoryId",
    });
  }
}

async function getMenuItemsWithCategoryInfo(call, callback) {
  try {
    const menuItems = await MenuItem.find();
    const items = await Promise.all(
      menuItems.map(async (item) => {
        const categoryId = item.category;
        const categoryInfo = await Category.findOne({ _id: categoryId });
        return {
          id: item._id,
          name: item.name,
          description: item.description,
          category: categoryInfo ? categoryInfo.category : "",
          subcategory: categoryInfo ? categoryInfo.subCategory : "",
          price: item.price,
        };
      })
    );

    callback(null, { items: items });
  } catch (error) {
    console.error("Error getting menu items: ", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error getting menu items.",
    });
  }
}

async function addCategory(call, callback) {
  try {
    const { category, subCategory } = call.request;
    const categoryExists = await Category.findOne({
      category: category,
      subCategory: subCategory,
    });

    if (categoryExists) {
      const response = {
        success: false,
        message: "Category already exists",
      };
      callback(null, response);
    } else {
      const newCategory = new Category({ category, subCategory });
      await newCategory.save();

      const response = {
        success: true,
        message: "Added category successfully",
      };
      callback(null, response);
    }
  } catch (error) {
    console.error("Error adding category:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error adding category",
    });
  }
}

async function getCategory(call, callback) {
  try {
    const categories = await Category.find();
    callback(null, { categories: categories });
  } catch (error) {}
}

async function getCategoryById(call, callback) {
  try {
    const { id } = call.request;
    const categoryItem = await Category.findById(id);
    if (categoryItem) {
      const response = {
        id: categoryItem.id,
        category: categoryItem.category,
        subCategory: categoryItem.subCategory,
      };
      callback(null, response);
    } else {
      callback(null, { id: "", category: "", subCategory: "" });
    }
  } catch (error) {}
}

async function getCategoryId(call, callback) {
  try {
    const { category, subCategory } = call.request;
    const categoryId = await Category.findOne(
      {
        category: category,
        subCategory: subCategory,
      },
      { _id: 1 }
    );
    if (categoryId) {
      const categoryIdValue = categoryId._id.toString();
      callback(null, { id: categoryIdValue });
    } else {
      callback(null, { id: null });
    }
  } catch (error) {
    console.error("Error getting category Id:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error getting category Id",
    });
  }
}

async function deleteMenuItem(call, callback) {
  const { id } = call.request;
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (deletedMenuItem) {
      const response = {
        success: true,
        message: "Menu item deleted successfully",
      };
      callback(null, response);
      return;
    } else {
      const response = { success: false, message: "Menu item not found" };
      callback(null, response);
      return;
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error deleting menu item",
    });
  }
}
async function updateMenuItem(call, callback) {
  const { id, name, description, category, price } = call.request;
  try {
    const result = await MenuItem.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          description: description,
          category: category,
          price: price,
        },
      }
    );
    console.log(result);
    if (result.modifiedCount !== 0) {
      callback(null, {
        success: true,
        message: "Menu item updated successfully",
      });
      return;
    } else {
      callback(null, {
        success: false,
        message: "No changes have been made",
      });
      return;
    }
  } catch (error) {
    console.error("Error updating menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error updating menu item",
    });
  }
}
async function deleteCategory(call, callback) {
  const { id } = call.request;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      const response = {
        success: true,
        message: "Category deleted successfully",
      };
      callback(null, response);
      return;
    } else {
      const response = { success: false, message: "Category not found" };
      callback(null, response);
      return;
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error deleting menu item",
    });
  }
}

async function updateCategory(call, callback) {
  const { id, category, subCategory } = call.request;
  console.log(call.request);
  try {
    const result = await Category.updateOne(
      { _id: id },
      {
        $set: {
          category: category,
          subCategory: subCategory,
        },
      }
    );
    console.log(result);
    if (result.modifiedCount !== 0) {
      callback(null, {
        success: true,
        message: "Category updated successfully",
      });
      return;
    } else {
      callback(null, {
        success: false,
        message: "No changes have been made",
      });
      return;
    }
  } catch (error) {
    console.error("Error updating category:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: "Error updating category",
    });
  }
}

server.start();
console.log("gRPC server running on port " + servicePort);
