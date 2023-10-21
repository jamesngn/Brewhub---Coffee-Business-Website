import axios from "axios";
import config from "../config.json";

const fetchCategoryData = async () => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/category/all`
    );
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/category/getCategoryById`,
      { params: { categoryId: categoryId } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

export { fetchCategoryData, fetchCategoryById };
