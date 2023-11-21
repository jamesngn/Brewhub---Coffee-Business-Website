import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";

import useSocket from "../../hooks/useSocket";
import { UserContext } from "../../contexts/UserContext";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import CartSummary from "../../components/CartSummary/CartSummary";
import PromotionApply from "../../components/PromotionApply/PromotionApply";

import { clearCart, getCartItems } from "../../services/cartService";
import { applyPromotionCode } from "../../services/promoService";
import { placeOrder } from "../../services/orderService";
import { removePromoCode } from "../../services/userService";

const CheckoutContainer = () => {
  // User context and socket
  const { userId, userRole } = useContext(UserContext);
  const { socket } = useSocket(userId, userRole);

  // State for cart items, order details, messages, and discounts
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [placeOrderMessage, setPlaceOrderMessage] = useState({
    severity: "",
    title: "",
    message: "",
  });
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [appliedPromoId, setAppliedPromoId] = useState("");
  const [promoApplyMessage, setPromoApplyMessage] = useState(null);
  const [tax, setTax] = useState(0);

  // Fetch cart items on component mount
  useEffect(() => {
    async function getCartItemsData() {
      try {
        const response = await getCartItems(userId);
        setCartItems(response);
      } catch (error) {
        console.error(error);
      }
    }
    getCartItemsData();
  }, [userId]);

  // Calculate subtotal and tax whenever cart items change
  useEffect(() => {
    function calculateSubtotal() {
      var subtotal = 0;
      cartItems &&
        cartItems.forEach((item) => {
          subtotal += item.price * item.quantity;
        });
      setSubtotal(subtotal);
    }
    calculateSubtotal();
  }, [cartItems]);

  useEffect(() => {
    setTax((subtotal * 8) / 100);
  }, [subtotal]);

  // Handle input change for order details
  function handleInputChange(e) {
    const { name, value } = e.target;

    // Check if the name is a nested property (e.g., 'deliveryAddress.street')
    if (name.includes(".")) {
      const [nestedProp, subProp] = name.split(".");

      setOrderDetails((prevOrderDetails) => ({
        ...prevOrderDetails,
        [nestedProp]: {
          ...prevOrderDetails[nestedProp],
          [subProp]: value,
        },
      }));
    } else {
      setOrderDetails((prevOrderDetails) => ({
        ...prevOrderDetails,
        [name]: value,
      }));
    }
  }

  // Handle placing the order
  async function handlePlaceOrder() {
    try {
      const placedOrder = {
        userId: userId,
        orderItems: cartItems,
        paymentMethod: "Credit Card",
        deliveryAddress: orderDetails.deliveryAddress,
        discount: discount,
        taxAmount: tax,
        promoCodeUsed: appliedPromoId,
      };

      console.log(placedOrder);
      const response = await placeOrder(placedOrder);
      if (response.orderId) {
        setPlaceOrderMessage({
          severity: "success",
          title: "Success",
          message:
            "Thank you for your order! Your purchase has been successfully placed. You will receive a confirmation email shortly. If you have any questions or need further assistance, please don't hesitate to contact us. Enjoy your day!",
        });
        handleClearCart();
        handleSendToServer({ orderId: response.orderId });

        if (appliedPromoId !== "") {
          await removePromoCode(userId, appliedPromoId);
        }
      }
    } catch (error) {
      console.log("Error placing order. Try again!");
      console.error(error);
    }
  }

  // Send a message to the server using the socket
  function handleSendToServer(data) {
    if (socket) {
      socket.emit("message", data);
    }
  }

  // Clear the cart
  async function handleClearCart() {
    const clearCartResponse = await clearCart(userId);

    if (clearCartResponse.success) {
      setCartItems([]);
      setDiscount(0);
      setAppliedPromoId("");
      setPromoApplyMessage(null);
    }
  }

  // Apply promo code
  async function handleApplyPromoCode(promoCodeId) {
    const response = await applyPromotionCode(promoCodeId, userId, cartItems);

    if (response.success) {
      setCartItems(response.orderItems);
      setDiscount(response.totalDiscount);
      setAppliedPromoId(promoCodeId);
      setPromoApplyMessage({
        type: "success",
        message: response.message,
      });
    } else {
      setPromoApplyMessage({
        type: "error",
        message: response.message,
      });
    }
  }

  // Withdraw promo code
  function handleWithdrawPromoCode() {
    const updatedItems =
      cartItems.length > 0
        ? cartItems.map((item) => ({
            ...item,
            discountedValue: 0,
          }))
        : [];

    setCartItems(updatedItems);
    setDiscount(0);
    setAppliedPromoId("");
    setPromoApplyMessage(null);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* CheckoutForm */}
      <Box sx={{ width: "65vw" }}>
        <CheckoutForm
          orderDetails={orderDetails}
          placeOrderMessage={placeOrderMessage}
          onChangeOrderDetails={handleInputChange}
          onPlaceOrder={handlePlaceOrder}
        />
      </Box>
      {/* PromotionApply and Order Summary */}
      <Box sx={{ flex: "1", borderLeft: "3px solid rgba(0,0,0,0.1)" }}>
        <PromotionApply
          userId={userId}
          appliedPromoId={appliedPromoId}
          AlertMessage={promoApplyMessage}
          onChangeAppliedPromoId={setAppliedPromoId}
          onApplyPromoCode={handleApplyPromoCode}
          onWithdrawPromoCode={handleWithdrawPromoCode}
        />
        <OrderSummary subtotal={subtotal} discount={discount} tax={tax} />
        <CartSummary cartItems={cartItems} onClearCart={handleClearCart} />
      </Box>
    </Box>
  );
};

export default CheckoutContainer;
