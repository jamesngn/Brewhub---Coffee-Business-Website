import React, { useState } from "react";
import axios from "axios";

const config = require("../config.json");

const AddMenuItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const [message, setMessage] = useState(null);

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
        `http://${config.publicIpAddress}:5000/menu/add`,
        formData
      ); // Assuming you have an API endpoint to handle menu item creation
      console.log("Menu item added successfully:", response.data);
      // Optionally, you can add code to update your UI or show a success message to the user
      setMessage({ type: "success", text: response.data.message });
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: error });
      console.error("Error adding menu item:", error);
      // Optionally, you can handle errors and display an error message to the user
    }
  };

  return (
    <div>
      <h2>Add Menu Item</h2>
      {message && <div className={message.type}>{message.text}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
