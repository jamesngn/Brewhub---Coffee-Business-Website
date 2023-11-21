import React, { useEffect, useState } from "react";
import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import "typeface-old-standard-tt"; // Import the font
import {
  retrievePromoDetailsByCode,
  retrievePromoDetailsById,
} from "../../services/promoService";
import { addPromoCode, retrievePromoCodes } from "../../services/userService";
import { fetchMenuItemById } from "../../services/menuItemService";

const Title = () => {
  const customFontStyle = {
    fontFamily: "Old Standard TT, serif", // Apply the font
  };
  return (
    <Typography variant="h4" color={"#3E2723"} style={customFontStyle}>
      Promotions
    </Typography>
  );
};

const PromosAddForm = ({ userId, onAddPromoDetails }) => {
  const [promoCode, setPromoCode] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    setAlertMessage(null); // Reset alert message when input changes
  };

  const handleAddPromoCode = async () => {
    const response = await retrievePromoDetailsByCode(promoCode);
    if (response.promos) {
      const promoCodeId = response.promos[0]._id;
      const addPromoToUserResponse = await addPromoCode(userId, promoCodeId);

      if (!addPromoToUserResponse.success) {
        setAlertMessage({
          type: "error",
          message: addPromoToUserResponse.message,
        });
      } else {
        setAlertMessage({
          type: "success",
          message: addPromoToUserResponse.message,
        });
        onAddPromoDetails(response.promos[0]);
      }
    } else {
      setAlertMessage({
        type: "error",
        message: "Invalid promo code",
      });
    }

    setPromoCode(""); // Clear the input field after adding
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <TextField
          sx={{ flex: "3", fontSize: "1.5rem" }}
          label="Promo Code"
          variant="standard"
          value={promoCode}
          fullWidth
          onChange={handlePromoCodeChange}
        />
        <Button
          sx={{
            flex: "1",
            ml: 4,
            backgroundColor: "#3E2723",
            color: "#FFFFF0",
            fontSize: "1.3rem",
            fontWeight: "bold",
            height: "100%",
          }}
          variant="contained"
          onClick={handleAddPromoCode}
        >
          Add Promotion
        </Button>
      </Box>

      {alertMessage && (
        <Alert severity={alertMessage.type} sx={{ mt: 2 }}>
          {alertMessage.message}
        </Alert>
      )}
    </Box>
  );
};

const PromoItem = ({ promoDetail }) => {
  const { code, discountType, discountValue, applicableTo } = promoDetail;
  const [conditionInfo, setConditionInfo] = useState("");
  useEffect(() => {
    let newConditionInfo = "";

    const fetchData = async () => {
      if (Object.keys(applicableTo.limitedTimeOffer).length === 0) {
        newConditionInfo += "Unlimited Time Offer. ";
      } else if (
        applicableTo.limitedTimeOffer.startDate !== null &&
        applicableTo.limitedTimeOffer.endDate !== null
      ) {
        const formatDate = (inputDate) => {
          const date = new Date(inputDate);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };
        newConditionInfo += `Limited Time Offer: ${formatDate(
          applicableTo.limitedTimeOffer.startDate
        )} - ${formatDate(applicableTo.limitedTimeOffer.endDate)}. `;
      }

      if (
        !applicableTo.specificProducts ||
        applicableTo.specificProducts.length === 0
      ) {
        newConditionInfo += "Any products are applied by this promo code. ";
      } else {
        newConditionInfo += "Specific products Only:";

        const specificProductsName = await Promise.all(
          applicableTo.specificProducts.map(async (specificProductId) => {
            const specificProduct = await fetchMenuItemById(specificProductId);
            return specificProduct.name;
          })
        );

        newConditionInfo += specificProductsName.map((name, index) => {
          if (index === specificProductsName.length - 1) {
            return " " + name + ". ";
          } else {
            return " " + name;
          }
        });
      }

      newConditionInfo += `Minimum order total required: $${applicableTo.minOrderAmount}. `;

      setConditionInfo(newConditionInfo);
    };

    fetchData();
  }, [applicableTo]);

  return (
    <Box sx={{ margin: "2.5vw 0", height: "12vh", display: "flex" }}>
      <Box
        sx={{
          backgroundColor: "#911F27",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1vw",
          minWidth: "15vw",
        }}
      >
        <Typography variant="h4" color={"#FFFFF0"} fontWeight={"bold"}>
          {code.toUpperCase()}
        </Typography>
      </Box>
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ backgroundColor: "#630000" }}>
          <Typography
            variant="h6"
            sx={{ color: "#EEEBDD", fontWeight: "bold", textAlign: "center" }}
          >
            {discountType === "Percentage"
              ? discountValue + "%"
              : "$" + discountValue}{" "}
            OFF
          </Typography>
        </Box>
        <Box sx={{ flex: "1", backgroundColor: "#FACE7F" }}>
          <Typography variant="body1" ml={"10px"} mt={"5px"}>
            {conditionInfo}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const PromosCtn = ({ userId }) => {
  const [promoDetails, setPromoDetails] = useState([]);

  const handleAddPromoDetails = (newPromoDetail) => {
    setPromoDetails([...promoDetails, newPromoDetail]);
  };

  useEffect(() => {
    async function retrievePromoDetails() {
      const response = await retrievePromoCodes(userId);
      if (Object.keys(response).length === 0) {
        return;
      }

      const newPromoDetails = await Promise.all(
        response.promos.map(async (promoId) => {
          const newPromoDetail = await retrievePromoDetailsById(promoId);

          return newPromoDetail || null; // Return null if newPromoDetail is undefined or null
        })
      );
      // Filter out any null values (failed retrievals) and duplicates
      const validPromoDetails = newPromoDetails.filter(
        (detail) =>
          detail &&
          !promoDetails.some(
            (existingDetail) => existingDetail.code === detail.code
          )
      );

      setPromoDetails(validPromoDetails);
    }

    retrievePromoDetails();
  }, []); // Add promoDetails to the dependencies array

  return (
    <Box
      sx={{
        flex: "1",
        padding: "5vh 15vw 0",
        backgroundColor: "#FFF4E0",
      }}
    >
      <Title />
      <PromosAddForm
        userId={userId}
        onAddPromoDetails={handleAddPromoDetails}
      />
      {promoDetails.length === 0 ? (
        <Typography variant="h6" mt={5}>
          You currently do not have any active promotions available.
        </Typography>
      ) : (
        promoDetails.map((promoDetail, index) => (
          <PromoItem key={index} promoDetail={promoDetail} />
        ))
      )}
    </Box>
  );
};

export default PromosCtn;
