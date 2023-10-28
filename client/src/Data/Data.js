// Sidebar imports
import {
  UilShoppingCartAlt,
  UilMoneyInsert,
  UilMoneyWithdraw,
  UilUser,
} from "@iconscout/react-unicons";

// import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Analytics Cards Data
export const cardsData = [
  {
    title: "NEW ORDERS",
    color: {
      backGround: "#3498DB",
    },
    value: "35,573",
    png: UilShoppingCartAlt,
    series: [
      {
        name: "New Orders",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "TOTAL INCOME",
    color: {
      backGround: "#2ECC71",
    },
    value: "$14,966",
    png: UilMoneyWithdraw,
    series: [
      {
        name: "Total Income",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "TOTAL EXPENSES",
    color: {
      backGround: "#E74C3C",
    },
    value: "$26,526",
    png: UilMoneyInsert,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
  {
    title: "NEW USER",
    color: {
      backGround: "#F39C12",
    },
    value: "123",
    png: UilUser,
    series: [
      {
        name: "User",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
