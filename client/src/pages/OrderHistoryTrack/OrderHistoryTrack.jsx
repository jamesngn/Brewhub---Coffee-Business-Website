import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import OrderHistoryTrackCtn from "../../containers/OrderHistoryTrack/OrderHistoryTrackCtn";
const OrderHistoryTrack = () => {
  let { orderId } = useParams();

  return (
    <div style={{ backgroundColor: "#FFF4E0" }}>
      <Header />
      <div style={{ display: "flex" }}>
        <AccountSidebar />
        <OrderHistoryTrackCtn />
      </div>
    </div>
  );
};

export default OrderHistoryTrack;
