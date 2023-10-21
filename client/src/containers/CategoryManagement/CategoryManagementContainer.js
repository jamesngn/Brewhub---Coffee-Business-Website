import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Modal } from "@mui/material";
import useSocket from "../../hooks/useSocket";
import { fetchCategoryData } from "../../services/categoryService";
import CategoryTable from "../../components/CategoryTable/CategoryTable";
import AddCategoryForm from "../../components/AddCategoryForm/AddCategoryForm";

const AddCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "33vw",
    height: "60vh",
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
        ADD CATEGORY
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddCategoryForm />
        </Box>
      </Modal>
    </div>
  );
};

const CategoryHeader = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h4" sx={{ color: "#006400", fontWeight: "bold" }}>
        CATEGORY
      </Typography>
      <AddCategoryModal />
    </Box>
  );
};

const CategorySearch = () => {
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

const CategoryManagementContainer = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [categoryList, setCategoryList] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  //   React.useEffect(() => {
  //     async function FetchNewOrderDetails() {
  //       try {
  //         if (response.orderId) {
  //           const newOrderDetails = await getOrderDetails(response.orderId);

  //           setCategoryList((prevOrderDetails) => {
  //             if (!Array.isArray(prevOrderDetails)) {
  //               prevOrderDetails = []; // Initialize as empty array if not already an array
  //             }
  //             return [newOrderDetails, ...prevOrderDetails];
  //           });
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }

  //     FetchNewOrderDetails();
  //   }, [response]);

  React.useEffect(() => {
    //Retrieve order info by orderId
    async function FetchUsersData() {
      try {
        const categoryList = await fetchCategoryData();
        setCategoryList(categoryList);
      } catch (error) {
        console.error(error);
      }
    }
    FetchUsersData();
  }, []);

  //Processing rows data:
  React.useEffect(() => {
    function createData(id, category, subcategory) {
      return {
        id,
        category,
        subcategory,
      };
    }

    if (categoryList && categoryList.length > 0) {
      const rowsData = categoryList.map((category) => {
        return createData(category.id, category.category, category.subCategory);
      });
      setRows(rowsData);
    }
  }, [categoryList]);

  return (
    <Box sx={{ flex: "1", padding: "25px", backgroundColor: "#F5DEB3" }}>
      <CategoryHeader />
      <CategorySearch />
      <CategoryTable rows={rows} />
    </Box>
  );
};

export default CategoryManagementContainer;
