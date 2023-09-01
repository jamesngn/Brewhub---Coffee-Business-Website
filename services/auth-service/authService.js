// orderService.js
const { authClient } = require("./client");

function loginUser(email, password, callback) {
  const request = { email, password };
  authClient.loginUser(request, (error, response) => {
    if (error) {
      console.error("Error logging user in", error);
      callback({ error: "Failed to log user in" });
      return;
    }
    //Return the successful response to the callback
    callback(response);
  });
}

module.exports = {
  loginUser,
};
