import React from "react";
import Cards from "../Cards/Cards";
import { RecentOrderTable, TopProductTable } from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <RecentOrderTable />
        </div>
        <div style={{ flex: 0.05 }}></div>
        <div style={{ flex: 1 }}>
          <TopProductTable />
        </div>
      </div>
    </div>
  );
};

export default MainDash;
