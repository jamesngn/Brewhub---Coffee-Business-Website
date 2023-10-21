import React, { useState, useEffect } from "react";
import useSocket from "../../hooks/useSocket";
import { retrieveAllUsers } from "../../services/userService";
import AccountTable from "../../components/AccountTable/AccountTable";
import AddAccountForm from "../../components/AddAccountForm/AddAccountForm";

import { Box, Button, Typography, Paper, Modal } from "@mui/material";

const AddAccountModal = () => {
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
        ADD ACCOUNT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddAccountForm />
        </Box>
      </Modal>
    </div>
  );
};

const AccountHeader = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography variant="h4" sx={{ color: "#006400", fontWeight: "bold" }}>
        ACCOUNTS
      </Typography>
      <AddAccountModal />
    </Box>
  );
};

const AccountSearch = () => {
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

const AccountManagementContainer = ({ userId, userRole }) => {
  const { socket, response } = useSocket(userId, userRole);
  const [userList, setUserList] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  //   React.useEffect(() => {
  //     async function FetchNewOrderDetails() {
  //       try {
  //         if (response.orderId) {
  //           const newOrderDetails = await getOrderDetails(response.orderId);

  //           setUserList((prevOrderDetails) => {
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
        const usersList = await retrieveAllUsers();
        setUserList(usersList);
      } catch (error) {
        console.error(error);
      }
    }
    FetchUsersData();
  }, []);

  //Processing rows data:
  React.useEffect(() => {
    function createData(id, username, email, password, role, createdAt) {
      return {
        id,
        username,
        email,
        password,
        role,
        createdAt,
      };
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      const year = date
        .getFullYear()
        .toString()
        .slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }
    if (userList && userList.length > 0) {
      const rowsData = userList.map((user) => {
        return createData(
          user.id,
          user.username,
          user.email,
          user.password,
          user.role,
          formatDate(user.createdAt)
        );
      });
      setRows(rowsData);
    }
  }, [userList]);

  return (
    <Box sx={{ flex: "1", padding: "25px", backgroundColor: "#F5DEB3" }}>
      <AccountHeader />
      <AccountSearch />
      <AccountTable rows={rows} />
    </Box>
  );
};

export default AccountManagementContainer;
