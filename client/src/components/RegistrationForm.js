import React, { useState } from "react";
import axios from "axios";
const config = require("../../config.json");

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      //   Send a POST request to the API Gateway
      const response = await axios.post(
        `http://${config.publicIpAddress}:5000/user/register`,
        {
          username,
          email,
          password,
        }
      );
      // Handle the response from the API Gateway
      if (response.data.success) {
        setMessage("Register successfully");
      } else {
        setMessage("Register failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      setMessage("Internal server error");
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <input
        type="text"
        placeholder="User name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
};

export default RegistrationForm;
