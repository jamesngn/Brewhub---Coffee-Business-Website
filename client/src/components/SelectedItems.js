import React from "react";

const SelectedItems = ({ selectedItems }) => {
  return (
    <div>
      <h2>Selected Items</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item.itemId}>
            <div>
              <strong>{item.itemName}</strong>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <p>Subtotal: ${item.subtotal}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedItems;
