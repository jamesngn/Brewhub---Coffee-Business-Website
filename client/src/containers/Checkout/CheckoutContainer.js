import React, { useState, useEffect, useContext } from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartSummary from "../../components/CartSummary/CartSummary";
import { Box } from "@mui/material";

import { getCartItems } from "../../services/cartService";
import { UserContext } from "../../contexts/UserContext";

const CheckoutContainer = () => {
  const { userId } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    async function GetCartItems() {
      try {
        const response = await getCartItems(userId);
        setCartItems(response);
      } catch (error) {
        console.error(error);
      }
    }
    GetCartItems();
  }, []);

  useEffect(() => {
    function calculateSubtotal() {
      var subtotal = 0;
      cartItems &&
        cartItems.map((item) => {
          return (subtotal += item.price * item.quantity);
        });
      setSubtotal(subtotal);
    }
    calculateSubtotal();
  }, [cartItems]);

  return (
    <>
      <style>{}</style>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "65vw" }}>
          <CheckoutForm cartItems={cartItems} />
        </Box>
        <Box sx={{ flex: "1", borderLeft: "3px solid rgba(0,0,0,0.1)" }}>
          <OrderSummary subtotal={subtotal} />
          <CartSummary cartItems={cartItems} />
        </Box>
      </Box>
    </>
  );
};

export default CheckoutContainer;
