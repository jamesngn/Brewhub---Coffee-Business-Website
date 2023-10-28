function createData(
  orderId,
  customerName,
  dateTime,
  orderStatus,
  totalPrice,
  items
) {
  return {
    orderId,
    customerName,
    dateTime,
    orderStatus,
    totalPrice,
    items,
  };
}

export const rows = [
  createData(
    "Order #125",
    "Sarah Johnson",
    "2023-09-20 11:00 AM",
    "Delivered",
    18.75,
    [
      { name: "Mocha", price: 3.75, quantity: 3, subtotal: 11.25 },
      { name: "Latte", price: 4.5, quantity: 1, subtotal: 4.5 },
    ]
  ),
  createData(
    "Order #126",
    "Michael Williams",
    "2023-09-20 12:30 PM",
    "Processing",
    20.25,
    [
      { name: "Cappuccino", price: 4.25, quantity: 2, subtotal: 8.5 },
      { name: "Iced Coffee", price: 3.5, quantity: 3, subtotal: 10.5 },
    ]
  ),
  createData(
    "Order #127",
    "Chris Davis",
    "2023-09-20 02:45 PM",
    "Delivered",
    28.0,
    [
      { name: "Espresso", price: 2.5, quantity: 4, subtotal: 10.0 },
      { name: "Cold Brew", price: 5.5, quantity: 3, subtotal: 16.5 },
    ]
  ),
  createData(
    "Order #128",
    "Mary Wilson",
    "2023-09-20 04:00 PM",
    "Processing",
    12.6,
    [{ name: "Flat White", price: 3.6, quantity: 2, subtotal: 7.2 }]
  ),
];
