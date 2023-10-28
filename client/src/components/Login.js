import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "typeface-old-standard-tt"; // Import the font

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
          navigate("/admin/dashboard");
        } else if (roleResponse.data === "user") {
          navigate(`/menu`);
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
    <Box padding={"1rem"} sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        color={"black"}
        fontWeight={"bold"}
        sx={{ fontFamily: "Old Standard TT, serif", paddingY: "0.5rem" }}
      >
        Welcome to <span style={{ color: "#8B4513" }}>Brewhub</span>
      </Typography>
      <Typography
        variant="body1"
        color={"black"}
        sx={{ fontFamily: "Old Standard TT, serif", paddingY: "0.5rem" }}
      >
        Please enter details for login to your account.
      </Typography>
      <Box sx={{ height: "7vh" }}>{message}</Box>
      <TextField
        sx={{ width: "25vw", paddingY: "1rem" }}
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={{ width: "25vw", paddingY: "1rem" }}
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        onClick={handleLogin}
        sx={{
          backgroundColor: "#8B4513",
          color: "#FFFFF0",
          height: "3rem",
          fontSize: "1.2rem",
          "&:hover": {
            backgroundColor: "#A0522D", // Change to the desired hover color
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
