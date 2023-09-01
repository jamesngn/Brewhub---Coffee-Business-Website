import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      //   Send a POST request to the API Gateway
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      // Handle the response from the API Gateway
      if (response.data.success) {
        setMessage("Login successful");
        // Perform further actions such as redirecting or setting user tokens
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

export default LoginForm;
