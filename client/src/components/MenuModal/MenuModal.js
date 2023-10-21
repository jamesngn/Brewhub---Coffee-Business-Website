import React, { useEffect, useState, useContext } from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import { fetchCategoryById } from "../../services/categoryService";
import { addItemToCart } from "../../services/cartService";
import { UserContext } from "../../contexts/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "85vh",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
};

const MenuModal = ({ isModalOpen, onCloseModal, menuItemData }) => {
  const { userId } = useContext(UserContext);
  //Function to handle quantity change
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleAddItemToCart = async () => {
    try {
      const response = await addItemToCart(
        userId,
        menuItemData.id,
        menuItemData.name,
        menuItemData.price,
        quantity
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "65%",
          }}
        >
          <Box
            sx={{
              flex: "0.95",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#FAF9F7",
              overflow: "hidden",
            }}
          >
            <img
              src="https://www.starbucks.com.au/assets/uploads/2023/08/sbx20190617-33269-caffeamericano-onwhite-corelib-srgb-3.png"
              alt="Starbucks Cup"
              style={{
                width: "80%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ backgroundColor: "#F2F0EB", flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginX: "12px",
                  paddingTop: "12px",
                  paddingBottom: "6px",
                  color: "#006241",
                }}
              >
                Coffee & Espresso
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "2.3rem",
                  fontWeight: 500,
                  paddingY: "6px",
                  marginLeft: "12px",
                  color: "#006241",
                }}
              >
                {menuItemData.name}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 500,
                  color: "#000000",
                  marginLeft: "12px",
                  paddingY: "6px",
                }}
              >
                ${menuItemData.price}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{
                  paddingY: "10px",
                  marginLeft: "12px",
                  paddingRight: "16px",
                }}
              >
                {menuItemData.description}
              </Typography>
              <Box
                sx={{
                  paddingY: "6px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="20"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    marginRight: "1.3rem",
                    backgroundColor: "#D9D9D9",
                    border: "none",
                    width: "18%",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#E0BA9B",
                    color: "#F4F2ED",
                    borderRadius: "20px",
                    boxShadow: "none",
                    width: "45%",
                    height: "3rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  onClick={handleAddItemToCart}
                >
                  ADD TO CART
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default MenuModal;
