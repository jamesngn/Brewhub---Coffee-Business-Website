import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Modal } from "@mui/material";
import PromoTable from "../../components/PromoTable/PromoTable";
import useSocket from "../../hooks/useSocket";
import {
  fetchAllMenuItems,
  fetchMenuItemById,
} from "../../services/menuItemService";
import AddMenuItemForm from "../../components/AddMenuItemForm";
import { retrieveAllPromoDetails } from "../../services/promoService";

const AddItemModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "33vw",
    height: "70vh",
    bgcolor: "#F5DEB3",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#006400",
          fontSize: "1.5rem",
          fontWeight: "bold",
          paddingX: "1.5rem",
          "@media (max-width: 600px)": {
            fontSize: "1rem",
            paddingX: "1rem",
          },
          "@media (min-width: 601px) and (max-width: 900px)": {
            fontSize: "1.2rem",
            paddingX: "1.2rem",
          },
          "@media (min-width: 901px) and (max-width: 1200px)": {
            fontSize: "1.4rem",
            paddingX: "1.4rem",
          },
        }}
        onClick={handleOpen}
      >
        ADD PROMOTION
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddMenuItemForm />
        </Box>
      </Modal>
    </div>
  );
};

const PromoHeader = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h4" sx={{ color: "#006400", fontWeight: "bold" }}>
        PROMOTION
      </Typography>
      <AddItemModal />
    </Box>
  );
};

const PromoSearch = () => {
  return (
    <Box sx={{ width: "100%", paddingY: "1rem" }}>
      <Paper
        width={"100%"}
        sx={{
          backgroundColor: "#D2B48C",
          borderRadius: "25px",
          padding: "1rem 3rem",
        }}
      >
        <Typography
          display={"block"}
          variant="h5"
          color={"#fffff0"}
          paddingY={"0.5rem"}
        >
          What are you looking for?
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          height={"2.5rem"}
        >
          <input
            type="text"
            style={{
              width: "80%",
              height: "90%",
              backgroundColor: "#D3D3D3",
              borderRadius: "25px",
              border: "none",
            }}
            placeholder="Seach for something"
          />
          <div style={{ flex: "0.5" }}></div>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#CD5C5C", borderRadius: "25px", flex: 1 }}
          >
            SEARCH
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const PromoManagementContainer = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [promoList, setPromoList] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  // React.useEffect(() => {
  //   async function FetchNewOrderDetails() {
  //     try {
  //       if (response.orderId) {
  //         const newOrderDetails = await getOrderDetails(response.orderId);

  //         setMenuItemList((prevOrderDetails) => {
  //           if (!Array.isArray(prevOrderDetails)) {
  //             prevOrderDetails = []; // Initialize as empty array if not already an array
  //           }
  //           return [newOrderDetails, ...prevOrderDetails];
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   FetchNewOrderDetails();
  // }, [response]);

  React.useEffect(() => {
    //Retrieve order info by orderId
    async function FetchPromoDetails() {
      try {
        const promoList = await retrieveAllPromoDetails();
        setPromoList(promoList.promos);
      } catch (error) {
        console.error(error);
      }
    }
    FetchPromoDetails();
  }, []);

  //Processing rows data:
  React.useEffect(() => {
    function formatDate(inputDate) {
      const date = new Date(inputDate);

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${hours}:${minutes} ${day}/${month}/${year}`;
    }
    function createData(
      promoId,
      promoCode,
      discountType,
      discountValue,
      maxUses,
      usesRemaining,
      active,
      createdAt,
      updatedAt,
      applicableTo
    ) {
      const formattedCreatedAt = formatDate(createdAt);
      const formattedUpdatedAt = formatDate(updatedAt);
      return {
        promoId,
        promoCode,
        discountType,
        discountValue,
        maxUses,
        usesRemaining,
        active,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
        applicableTo,
      };
    }

    async function setPromoData() {
      if (promoList && promoList.length > 0) {
        console.log(`Total promotions available: ${promoList.length}`);

        const rowsData = await Promise.all(
          promoList.map(async (promo) => {
            if (promo.applicableTo && promo.applicableTo.specificProducts) {
              const specificProductsName = await Promise.all(
                promo.applicableTo.specificProducts.map(async (productId) => {
                  console.log(productId);
                  const menuItemResponse = await fetchMenuItemById(productId);
                  // Check if name is defined in menuItemResponse
                  return menuItemResponse.name;
                })
              );
              promo.applicableTo.specificProducts = specificProductsName;
            }
            return createData(
              promo._id,
              promo.code,
              promo.discountType,
              promo.discountValue,
              promo.maxUses,
              promo.usesRemaining,
              promo.active,
              promo.createdAt,
              promo.updatedAt,
              promo.applicableTo
            );
          })
        );
        setRows(rowsData);
      }
    }

    setPromoData();
  }, [promoList]);
  return (
    <Box sx={{ flex: "1", padding: "25px", backgroundColor: "#F5DEB3" }}>
      <PromoHeader />
      <PromoSearch />
      <PromoTable rows={rows} setRows={setRows} />
    </Box>
  );
};

export default PromoManagementContainer;
