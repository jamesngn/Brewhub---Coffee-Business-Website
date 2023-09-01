//menuService.js
const { menuClient } = require("./client");

function getMenuItems(callback) {
  // Define your gRPC call logic here using the menuClient
  menuClient.getMenuItems({}, (error, response) => {
    if (error) {
      console.error("Error getting menu items:", error);
      return;
    }
    callback(response);
  });
}
module.exports = { getMenuItems };
