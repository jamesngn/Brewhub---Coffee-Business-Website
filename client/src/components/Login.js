import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const config = require("../config.json");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      //   Send a POST request to the API Gateway
      const response = await axios.post(
        `http://${config.publicIpAddress}:5000/auth/login`,
        {
          email,
          password,
        }
      );
      // Handle the response from the API Gateway
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        setMessage("Login successful");

        //After successful login, fetch the user's role
        const roleResponse = await axios.get(
          `http://${config.publicIpAddress}:5000/auth/user/role`,
          {
            headers: {
              "x-auth-token": response.data.token, // Include the authToken in headers
            },
          }
        );
        if (roleResponse.data === "admin") {
          navigate("/admin");
        } else {
          navigate(`/`);
        }
      } else {
        setMessage("Login failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      setMessage("Internal server error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
