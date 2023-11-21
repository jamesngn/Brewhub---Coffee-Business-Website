function calculateTotal(orderItems) {
  let total = 0;
  orderItems.map((orderItem) => {
    total += orderItem.price * orderItem.quantity;
  });
  return total;
}

// Calculate discounted value for each order item
// Return: orderItems with discountedValue
function calculateDiscounts(promoCode, orderItems) {
  const { discountType, discountValue, applicableTo } = promoCode;
  if (discountType === "FixedAmount") {
    return { updatedOrderItems: orderItems, totalDiscount: discountValue };
  } else {
    let totalDiscount = 0;
    if (
      applicableTo.specificProducts &&
      applicableTo.specificProducts.length === 0
    ) {
      let discountedValue = 0;
      orderItems.map((item) => {
        discountedValue = (item.quantity * item.price * discountValue) / 100;
        totalDiscount += discountedValue;
      });
      return { updatedOrderItems: orderItems, totalDiscount };
    } else if (
      applicableTo.specificProducts &&
      applicableTo.specificProducts.length > 0
    ) {
      const updatedOrderItems = orderItems.map((item) => {
        let discountedValue = 0;
        if (applicableTo.specificProducts.includes(item.itemId)) {
          discountedValue = (item.quantity * item.price * discountValue) / 100;
          totalDiscount += discountedValue;
        }
        return {
          ...item,
          discountedValue: parseFloat(discountedValue.toFixed(2)),
        };
      });
      console.log("updatedOrderItems: " + JSON.stringify(updatedOrderItems));
      return { updatedOrderItems, totalDiscount };
    }
  }
}

module.exports = { calculateTotal, calculateDiscounts };
