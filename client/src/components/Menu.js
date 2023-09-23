import React, { useState } from "react";

const Menu = ({ menuItems, handleItemSelect, handleQuantityChange }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (itemId) => {
    console.log("toggleCheckbox: " + itemId + " - " + !checkedItems[itemId]);
    setCheckedItems({
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    });
  };

  return (
    <div>
      <h2>Menu Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id ? item.id : item.name}>
            <div>
              <input
                type="checkbox"
                checked={checkedItems[item.id] || 0}
                onChange={() => {
                  handleItemSelect(item);
                  toggleCheckbox(item.id);
                }}
              />
              <strong>
                {item.id} - {item.name}
              </strong>
              <p>{item.description}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              {checkedItems[item.id] && (
                <div>
                  <label>Quantity: </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
