import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Alert, AlertTitle } from "@mui/material";

import "typeface-old-standard-tt"; // Import the font
import {
  fetchMenuItemById,
  updateMenuItem,
} from "../../services/menuItemService";

const config = require("../../config.json");

const UpdateMenuItemForm = (props) => {
  const { selectedMenuItemId } = props;

  const [alert, setAlert] = useState({
    severity: "",
    title: "",
    message: "",
  });

  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    async function getCategoryList() {
      try {
        const response = await axios.get(
          `http://${config.publicIpAddress}:5000/category/all`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    }

    async function updateMenuItemData() {
      try {
        const response = await fetchMenuItemById(selectedMenuItemId);
        setFormData({
          name: response.name,
          description: response.description,
          category: response.category,
          price: response.price,
        });
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    }
    getCategoryList();
    updateMenuItemData();
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
      const response = await updateMenuItem(
        selectedMenuItemId,
        formData.name,
        formData.description,
        formData.category,
        formData.price
      );
      console.log("Menu item updated successfully:", response);
      // Optionally, you can add code to update your UI or show a success message to the user
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
        Update Menu Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "50vh" }}
        >
          <div style={{ padding: "10px 0" }}>
            <label style={formLabelStyle}>Item Name *</label>
            <input
              style={formInputStyle}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ padding: "10px 0" }}>
            <label style={formLabelStyle}>Description</label>
            <textarea
              style={formTextAreaStyle}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div
            style={{
              padding: "10px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <label style={formLabelStyle}>Category</label>
              <select
                style={formInputStyle}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>'
                {categories &&
                  categories.map((categoryItem) => (
                    <option key={categoryItem.id} value={categoryItem.id}>
                      {categoryItem.category} - {categoryItem.subCategory}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label style={formLabelStyle}>Price</label>
              <input
                style={formInputStyle}
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
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
              Update Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenuItemForm;
