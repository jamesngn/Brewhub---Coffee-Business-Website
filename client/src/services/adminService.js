import axios from "axios";
import config from "../config.json";

const registerAdmin = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      `http://${config.publicIpAddress}:5000/admin/register`,
      { username, email, password }
    );
    console.log("reached");
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
  }
};

export { registerAdmin };
