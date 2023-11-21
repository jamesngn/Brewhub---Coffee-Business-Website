import React from "react";
import Header from "../../components/Header/Header";
import PromosCtn from "../../containers/Promos/PromosCtn";

const Promos = ({ userId }) => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <PromosCtn userId={userId} />
    </div>
  );
};

export default Promos;
