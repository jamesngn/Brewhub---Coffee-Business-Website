import axios from "axios";
import config from "../config.json";

const fetchMenuItemById = async (menuItemId) => {
  try {
    const response = await axios.get(
      `http://${config.publicIpAddress}:5000/menu/getItemById`,
      {
        params: {
          menuItemId: menuItemId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu item data:", error);
    throw error;
  } // Optionally, you can rethrow the error to handle it in your component}
};

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

const updateMenuItem = async (id, name, description, category, price) => {
  try {
    const response = await axios.put(
      `http://${config.publicIpAddress}:5000/menu/update`,
      {
        id: id,
        name: name,
        description: description,
        category: category,
        price: price,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error; // Optionally, you can rethrow the error to handle it in your component
  }
};

export {
  fetchMenuItemById,
  fetchMenuItemsByCategoryId,
  fetchAllMenuItems,
  deleteMenuItem,
  updateMenuItem,
};
