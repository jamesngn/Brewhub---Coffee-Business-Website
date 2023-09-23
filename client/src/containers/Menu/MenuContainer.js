import axios from "axios";
import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import SelectedItems from "../../components/SelectedItems";
import OrderForm from "../../components/OrderForm";

const config = require("../../config.json");

const MenuContainer = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from an API
    async function fetchMenuItems() {
      try {
        const response = await axios.get(
          `http://${config.publicIpAddress}:5000/menu/getAll`,
          {}
        );
        if (response.data.items) {
          console.log(response.data.items);
          setMenuItems(response.data.items);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchMenuItems();
  }, []);

  const handleItemSelect = (selectedItem) => {
    const existingIndex = selectedItems.findIndex(
      (item) => item.itemId === selectedItem.id
    );

    if (existingIndex !== -1) {
      //Item is already selected, remove it
      const updateSelectedItems = [...selectedItems];
      updateSelectedItems.splice(existingIndex, 1);
      setSelectedItems(updateSelectedItems);
    } else {
      //Item is not selected, add it
      const orderItem = {
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        quantity: 1,
        price: selectedItem.price,
        subtotal: selectedItem.price,
      };

      setSelectedItems([...selectedItems, orderItem]);
      console.log(JSON.stringify(selectedItems));
    }
  };
  const handleQuantityChange = (itemId, quantity) => {
    const updatedSelectedItems = selectedItems.map((item) => {
      if (itemId === item.itemId) {
        return { ...item, quantity: quantity, subtotal: quantity * item.price };
      }
      return item;
    });
    setSelectedItems(updatedSelectedItems);
  };

  const handlePlaceOrder = (order) => {
    // Implement order placement logic here using axios.post or a similar method
    // ...
    // After successful order placement, you can clear selected items if needed
    setSelectedItems([]);
  };

  return (
    <div>
      <Menu
        menuItems={menuItems}
        handleItemSelect={handleItemSelect}
        handleQuantityChange={handleQuantityChange}
      />
      <SelectedItems selectedItems={selectedItems} />
      <OrderForm
        selectedItems={selectedItems}
        handlePlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};

export default MenuContainer;
