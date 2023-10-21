import axios from "axios";
import config from "../config.json";

const fetchMenuItemsByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/menu/getItemByCategoryId`,
      {
        params: {
          categoryId: categoryId,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

const fetchAllMenuItems = async () => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/menu/getAllWithCategoryInfo`
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

const deleteMenuItem = async (itemId) => {
  try {
    const response = await axios.delete(
      `http://${config.publicIpAddress}:5000/menu/delete`,
      {
        params: {
          itemId: itemId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

export { fetchMenuItemsByCategoryId, fetchAllMenuItems, deleteMenuItem };
