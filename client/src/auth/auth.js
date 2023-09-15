// auth.js
import axios from "axios";
const config = require("../config.json");

async function isAuthenticated() {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return false; // No token found
  }
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/auth/user`,
      {
        headers: {
          "x-auth-token": authToken, // Include the authToken in headers
        },
      }
    );
    return response.data; // Token is valid
  } catch (error) {
    return false; // Token is not valid
  }
}

function isAuthorized(data) {
  const { role } = data;
  return role === "admin";
}

export { isAuthenticated, isAuthorized };
