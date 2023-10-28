import React, { useState, useEffect } from "react";

import { Typography, Alert, AlertTitle } from "@mui/material";

import "typeface-old-standard-tt"; // Import the font
import {
  fetchCategoryById,
  updateCategory,
} from "../../services/categoryService";

const UpdateCategoryForm = (props) => {
  const { selectedCategoryId } = props;

  const [alert, setAlert] = useState({
    severity: "",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetchCategoryById(selectedCategoryId);
        console.log(response);
        setFormData({
          category: response.category,
          subcategory: response.subCategory,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
    fetchCategoryData();
  }, []);

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
      const response = await updateCategory(
        selectedCategoryId,
        formData.category,
        formData.subcategory
      );
      console.log("Category updated successfully:", response);

      //   // Optionally, you can add code to update your UI or show a success message to the user
      if (response.success) {
        setAlert({
          severity: "success",
          title: "Success",
          message: response.message,
        });
      } else {
        setAlert({
          severity: "error",
          title: "Error",
          message: response.message,
        });
      }
    } catch (error) {
      setAlert({
        severity: "error",
        title: "Error",
        message: error,
      });
      console.error("Error updating menu item:", error);
      // Optionally, you can handle errors and display an error message to the user
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
  const formTextAreaStyle = {
    width: "100%",
    height: "100px",
    border: "1px solid #ccc",
    backgroundColor: "#FFFFF0",
    fontSize: "1rem",
    color: "#333333",
  };

  const inputCtnStyle = {
    padding: "10px 0",
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
        Update Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "50vh" }}
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
            <label style={formLabelStyle}>Subcategory</label>
            <input
              style={formInputStyle}
              type="text"
              name="subcategory"
              value={formData.subcategory}
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
              Update Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
