import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Modal } from "@mui/material";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";

import { useNavigate, useLocation, Link } from "react-router-dom";
import BrewhubLoginImg from "../../assets/brewhub-login.jpg";

import Login from "../Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "67vw",
  height: "63vh",
  bgcolor: "#FFF4E0",
  boxShadow: 24,
  display: "flex",
};

const SignInModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const customFontStyle = {};

  return (
    <div>
      <Button
        key={"signin"}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
        onClick={handleOpen}
      >
        Sign in
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            style={{ width: "45%", objectFit: "cover" }}
            src={BrewhubLoginImg}
            alt="Brewhub Login"
          />

          <Box sx={{ margin: "auto" }}>
            <Login />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

const pages = ["Menu", "Sign in", "Sign up"];
const links = ["menu", "", "signup"];

function HeaderLanding() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#8B4513" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CoffeeMakerIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
            href="/"
          >
            BREWHUB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <CoffeeMakerIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            href="/"
          >
            BREWHUB
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link
              key={"menu"}
              to={`/coffee-menu`}
              style={{ textDecoration: "none" }}
            >
              <Button
                key={"menu"}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  fontWeight:
                    location.pathname === `/coffee-menu` ? "bold" : "normal",
                  display: "block",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: "-15px",
                    width: "100%",
                    borderBottom:
                      location.pathname === `/coffee-menu`
                        ? "10px solid #FFFFF0"
                        : "2px solid transparent",
                  },
                }}
              >
                Menu
              </Button>
            </Link>
            <SignInModal />
            <Button
              key={"signin"}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
            >
              sign up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderLanding;
