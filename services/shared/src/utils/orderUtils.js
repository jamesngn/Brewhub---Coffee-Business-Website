function calculateTotal(orderItems, promotionsApplied) {
  let total = 0;
  orderItems.map((orderItem) => {
    total += orderItem.price * orderItem.quantity;
  });
  if (promotionsApplied && promotionsApplied.length !== 0) {
    total -= calculateDiscount(total, promotionsApplied);
  }
  return total;
}

function calculateDiscount(total, promotionsApplied) {
  let discountAmount = 0;
  promotionsApplied.map((promotion) => {
    discountAmount += (total * promotion.discountPercentage) / 100;
  });
  return discountAmount;
}

module.exports = { calculateTotal, calculateDiscount };
