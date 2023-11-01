import React from "react";
import Header from "../../components/Header/Header";

import { OrderHistoryCtn } from "../../containers/OrderHistoryContainer/OrderHistoryCtn";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";

const OrderHistory = ({ userId, userRole }) => {
  return (
    <div style={{ backgroundColor: "#FFF4E0" }}>
      <Header />
      <div style={{ display: "flex" }}>
        <AccountSidebar />
        <OrderHistoryCtn userId={userId} userRole={userRole} />
      </div>
    </div>
  );
};
export { OrderHistory };
