import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import HeaderLanding from "../../components/Header/HeaderLanding";
import BrewhubLandingImg from "../../assets/coffeesmile-landing.jpg";
import { useNavigate } from "react-router-dom";

const Landing = ({ userId, userRole }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box>
        <HeaderLanding />
      </Box>
      <Box
        sx={{
          backgroundColor: "#F9EDDD",
          display: "flex",
          flex: "1 1 auto",
          overflowY: "auto",
        }}
      >
        <Box sx={{ paddingX: "10vw", paddingY: "18vh" }}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            color={"#8B4513"}
            mb={"1.5rem"}
          >
            Discover Exceptional Coffee Creations
          </Typography>
          <Typography variant="h6" color={"rgba(62,39,35,0.5)"} mb={"2rem"}>
            Indulge in our meticulously crafted coffee blends, designed to bring
            a smile to your face and happiness to your day. Experience the art
            of exceptional coffee at Brewhub
          </Typography>
          <Button
            sx={{
              backgroundColor: "rgba(139,69,19,0.85)",
              color: "#F9EDDD",
              fontSize: "1.2rem",
              borderRadius: "10px",
              padding: "12px",
              "&:hover": {
                backgroundColor: "rgba(139,69,19,1)", // Change the background color on hover
              },
            }}
            onClick={() => {
              navigate("/coffee-menu");
            }}
          >
            Explore Our Menu
          </Button>
        </Box>

        <img src={BrewhubLandingImg} alt="Coffee" />
      </Box>
    </Box>
  );
};

export default Landing;
