import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import OrderHistoryViewCtn from "../../containers/OrderHistoryView/OrderHistoryViewCtn";

const OrderHistoryView = () => {
  let { orderId } = useParams();

  return (
    <div style={{ backgroundColor: "#FFF4E0" }}>
      <Header />
      <div style={{ display: "flex" }}>
        <AccountSidebar />
        <OrderHistoryViewCtn orderId={orderId} />
      </div>
    </div>
  );
};

export default OrderHistoryView;
