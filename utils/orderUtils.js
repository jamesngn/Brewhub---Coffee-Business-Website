function calculateTotal(orderItems, promotionsApplied) {
  let total = 0;
  orderItems.map((orderItem) => {
    total += orderItem.price * orderItem.quantity;
  });
  promotionsApplied.map((promotion) => {
    total -= promotion.discountAmount;
  });
  return total;
}

module.exports = { calculateTotal };
