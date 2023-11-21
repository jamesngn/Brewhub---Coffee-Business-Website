const express = require("express");
const router = express.Router();
const { promoClient } = require("../../services/promo-service/src/client.js");

router.put("/appy-promotion", (req, res) => {
  const { promoCode, userId, orderItems } = req.body;
  promoClient.ApplyPromoCodeToOrderDetails(
    { promoCode, userId, orderItems },
    (error, response) => {
      if (error) {
        return res.status(500).json({ error: error });
      } else {
        if (response.success) {
          return res.status(200).json(response);
        } else {
          res.status(200).json({ success: false, message: response.message });
        }
      }
    }
  );
});

router.get("/retrieve-all-promotions", (req, res) => {
  promoClient.GetPromoCodes({}, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.get("/retrieve-promotion-by-code", (req, res) => {
  const { id } = req.query;
  promoClient.GetPromoCodeByCode({ id }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

router.get("/retrieve-promotion-by-id", (req, res) => {
  const { id } = req.query;
  promoClient.GetPromoCodeById({ id }, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res.status(200).json(response);
    }
  });
});

module.exports = router;
