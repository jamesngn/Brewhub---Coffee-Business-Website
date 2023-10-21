import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { registerAdmin } from "../../services/adminService";

import { Typography, Alert, AlertTitle } from "@mui/material";

import "typeface-old-standard-tt"; // Import the font

const AddAccountForm = () => {
  const [alert, setAlert] = useState({
    severity: "",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    role: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var response;

    if (formData.role === "user") {
      response = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    } else if (formData.role === "admin") {
      response = await registerAdmin({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    }
    console.log(response);
    if (response.success) {
      setAlert({
        severity: "success",
        title: "Success",
        message: response.message,
      });
      setFormData({
        role: "",
        username: "",
        email: "",
        password: "",
      });
    } else {
      setAlert({
        severity: "error",
        title: "Error",
        message: response.message,
      });
    }
  };

  const formLabelStyle = {
    display: "block",
    fontFamily: "Old Standard TT, serif",
    fontWeight: "bold",
    color: "#3E2723",
  };

  const formInputStyle = {
    width: "100%",
    height: "30px",
    border: "1px solid #ccc",
    backgroundColor: "#FFFFF0",
    fontSize: "1rem",
    color: "#333333",
  };

  return (
    <div>
      {alert.severity !== "" && (
        <Alert severity={alert.severity}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      )}
      <Typography variant="h4" sx={{ fontWeight: "bold", padding: "10px 0" }}>
        Add Menu Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "50vh" }}
        >
          <div>
            <label style={formLabelStyle}>Role</label>
            <select
              style={formInputStyle}
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option key={"admin"} value={"admin"}>
                Admin
              </option>
              <option key={"user"} value={"user"}>
                User
              </option>
            </select>
          </div>
          <div style={{ padding: "10px 0" }}>
            <label style={formLabelStyle}>Username *</label>
            <input
              style={formInputStyle}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div style={{ padding: "10px 0" }}>
            <label style={formLabelStyle}>Email</label>
            <input
              style={formInputStyle}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={formLabelStyle}>Password</label>
            <input
              style={formInputStyle}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button
              type="reset"
              style={{
                flex: "2",
                backgroundColor: "#CD5C5C",
                color: "#FFFFFF",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s", // Add transition for smooth effect
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#8B0000")} // Change background color on hover
              onMouseOut={(e) => (e.target.style.backgroundColor = "#CD5C5C")} // Revert back to original color
            >
              Reset
            </button>

            <div style={{ flex: "1" }}></div>
            <button
              type="submit"
              style={{
                height: "5vh",
                flex: "2",
                backgroundColor: "#006400",
                color: "#FFFFFF",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#004d00")} // Change background color on hover
              onMouseOut={(e) => (e.target.style.backgroundColor = "#006400")} // Revert back to original color
            >
              Add Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddAccountForm;
