import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Modal,
  Radio,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import the check icon
import RemoveIcon from "@mui/icons-material/Remove"; // Import the check icon
import { retrievePromoCodes } from "../../services/userService";
import { retrievePromoDetailsById } from "../../services/promoService";
import { fetchMenuItemById } from "../../services/menuItemService";

const PromotionApplyButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #252A34",
        borderRadius: "10px",
        height: "15vh",
        marginTop: "10px",
      }}
    >
      <IconButton
        onClick={onClick}
        style={{
          backgroundColor: "#DDDDDD",
          color: "#252A34",
          width: "60px",
          height: "60px",
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

const PromotionItem = ({
  promoDetail,
  selectedValue,
  onSelectPromoCodeId,
  applied,
  onRemoveAppliedPromoCode,
}) => {
  const { _id, code, discountType, discountValue, applicableTo } = promoDetail;
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

    if (applicableTo) {
      fetchData(); // Call fetchData only if applicableTo is defined
    }
  }, [applicableTo]);

  return (
    <Box
      sx={{
        marginTop: 1,
        border: "1px solid black",
        borderRadius: "10px",
        width: "calc(98%)",
        height: "15vh",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography>{code}</Typography>
          <Typography>
            {discountType === "Percentage"
              ? discountValue + "%"
              : "$" + discountValue}{" "}
            OFF
          </Typography>
        </div>
        <div style={{ flex: "3" }}>{conditionInfo}</div>
        {applied === true ? (
          <div style={{ display: "flex", justifyContent: "right" }}>
            <IconButton onClick={onRemoveAppliedPromoCode}>
              <RemoveIcon />
            </IconButton>
          </div>
        ) : (
          <div style={{ flex: "1", display: "flex", justifyContent: "right" }}>
            <Radio
              sx={{ marginRight: "10px" }}
              value={_id}
              checked={selectedValue === _id}
              onChange={onSelectPromoCodeId}
            />
          </div>
        )}
      </div>
    </Box>
  );
};

const PromotionModal = ({
  open,
  onClose,
  promoDetails,
  onApplyPromotionCode,
  onSetAppliedPromoId,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40vw",
    maxHeight: "75vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [selectedPromoCodeId, setSelectedPromoCodeId] = useState("");
  const handleChange = (event) => {
    setSelectedPromoCodeId(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          fontFamily={"Old Standard TT, serif"}
          color={"#3E2723"}
          fontWeight={"bold"}
          backgroundColor={""}
        >
          Your Active Promotions
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          Select one promotion code below for your order:
        </Typography>
        <Box maxHeight={"60%"} sx={{ overflowY: "auto", overflowX: "hidden" }}>
          {promoDetails.length > 0 ? (
            promoDetails.map((promoDetail, index) => (
              <PromotionItem
                key={index}
                promoDetail={promoDetail}
                selectedValue={selectedPromoCodeId}
                onSelectPromoCodeId={handleChange}
                applied={false}
              />
            ))
          ) : (
            <Typography variant="body2" mt={3}>
              You currently do not have any active promotions that can be
              applied to this order.
            </Typography>
          )}
        </Box>

        <Button
          sx={{
            marginTop: "30px",
            width: "99%",
            fontSize: "1.2rem",
            backgroundColor: selectedPromoCodeId === "" ? "#DDDDDD" : "#8B4513",
            color: "#FFFFF0",
            "&:hover": {
              backgroundColor: "#A0522D",
            },
          }}
          disabled={selectedPromoCodeId === ""}
          onClick={() => {
            onSetAppliedPromoId(selectedPromoCodeId);
            onApplyPromotionCode(selectedPromoCodeId);
            onClose();
          }}
        >
          Apply Promotion
        </Button>
      </Box>
    </Modal>
  );
};

const PromotionApply = ({
  onApplyPromoCode,
  onWithdrawPromoCode,
  userId,
  AlertMessage,
  appliedPromoId,
  onChangeAppliedPromoId,
}) => {
  const customFontStyle = {
    fontFamily: "Old Standard TT, serif", // Apply the font
  };

  const [showAlert, setShowAlert] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // setSelectedPromoCodeId("");
  };

  const [promoDetails, setPromoDetails] = useState([]);

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

  const [appliedPromoDetail, setAppliedPromoDetail] = useState({});

  const handleRemoveAppliedPromoCode = () => {
    setAppliedPromoDetail({});
    onWithdrawPromoCode();
  };

  useEffect(() => {
    const promoDetailWithId = promoDetails.find(
      (detail) => detail._id === appliedPromoId
    );
    if (promoDetailWithId) {
      setAppliedPromoDetail(promoDetailWithId);
    }
  }, [appliedPromoId]);

  useEffect(() => {
    setShowAlert(AlertMessage !== null);
  }, [AlertMessage]);

  return (
    <Box padding={"23px 40px 0"}>
      <Typography variant="h5" style={customFontStyle} color={"#3E2723"}>
        Promotion Code
      </Typography>
      {appliedPromoId === "" ? (
        <PromotionApplyButton onClick={handleOpen} />
      ) : (
        <PromotionItem
          promoDetail={appliedPromoDetail}
          applied={true}
          onRemoveAppliedPromoCode={handleRemoveAppliedPromoCode}
        />
      )}

      <PromotionModal
        open={open}
        onClose={handleClose}
        promoDetails={promoDetails}
        onApplyPromotionCode={(selectedPromoCodeId) => {
          onApplyPromoCode(selectedPromoCodeId);
        }}
        onSetAppliedPromoId={onChangeAppliedPromoId}
      />

      {showAlert && (
        <Alert
          severity={AlertMessage ? AlertMessage.type : "error"}
          onClose={() => setShowAlert(false)}
          sx={{ mt: 2 }}
        >
          {AlertMessage ? AlertMessage.message : ""}
        </Alert>
      )}
    </Box>
  );
};

export default PromotionApply;
