import React, { useState } from "react";
import axios from "axios";
import { Typography, Alert, AlertTitle } from "@mui/material";

const config = require("../../config.json");

const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
  });

  const [alert, setAlert] = useState({
    severity: "",
    title: "",
    message: "",
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

    try {
      const response = await axios.post(
        `http://${config.publicIpAddress}:5000/category/add`,
        formData
      ); // Assuming you have an API endpoint to handle menu item creation
      console.log("Category added response:", response.data);
      if (response.data.success) {
        setAlert({
          severity: "success",
          title: "Success",
          message: response.data.message,
        });
        setFormData({
          category: "",
          subCategory: "",
        });
      } else {
        setAlert({
          severity: "error",
          title: "Error",
          message: response.data.message,
        });
      }
    } catch (error) {
      setAlert({
        severity: "error",
        title: "Error",
        message: error,
      });
      console.error("Error adding menu item:", error);
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
      )}{" "}
      <Typography variant="h4" sx={{ fontWeight: "bold", padding: "10px 0" }}>
        Add Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "30vh" }}
        >
          <div style={{ padding: "10px 0" }}>
            <label style={formLabelStyle}>Category</label>
            <input
              style={formInputStyle}
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ padding: "10px 0" }}>
            <label style={formLabelStyle}>Sub Category</label>
            <input
              style={formInputStyle}
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ flex: 1 }}></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
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
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
