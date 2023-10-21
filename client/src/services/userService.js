import axios from "axios";
import config from "../config.json";

const registerUser = async ({ username, email, password }) => {
  try {
    const response = await axios.post(
      `http://${config.publicIpAddress}:5000/user/register`,
      { username, email, password }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

const retrieveUsername = async (userId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/user/retrieve-name`,
      { params: { userId: userId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving username:", error);
  }
};

const retrieveAllUsers = async () => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/user/retrieve-all-users`
    );
    return response.data.users;
  } catch (error) {
    console.error("Error retrieving all users:", error);
  }
};

export { registerUser, retrieveUsername, retrieveAllUsers };
