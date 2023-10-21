import React, { useState, Fragment } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Grid, Typography, Paper } from "@mui/material";
import MenuModal from "../MenuModal/MenuModal";
import "./MenuItem.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex", // Center children vertically
  flexDirection: "column", // Stack children vertically
  alignItems: "center", // Center children horizontally
  boxShadow: "none",
}));

const MenuItem = ({ menuItemData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <Grid item xs={4} sm={4} md={4} onClick={handleOpenModal}>
        <Item className="menu-item-ctn">
          <img
            src="https://www.starbucks.com.au/assets/uploads/2023/08/sbx20190617-33269-caffeamericano-onwhite-corelib-srgb-3.png"
            alt="Starbucks Cup"
            className="hover-scale menu-item-img"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ mt: 1, textAlign: "center" }}
            className="menu-item-title"
          >
            {menuItemData.name}
          </Typography>
        </Item>
      </Grid>
      <MenuModal
        isModalOpen={isModalOpen}
        onCloseModal={handleCloseModal}
        menuItemData={menuItemData}
      />
    </Fragment>
  );
};

export default MenuItem;
