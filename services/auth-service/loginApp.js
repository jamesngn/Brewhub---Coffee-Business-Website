const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authService = require("./authService"); // Import your user service methods
//import authenticate middleware
const authenticateToken = require("../../middleware/auth");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  authService.loginUser(email, password, (response) => {
    if (response.success) {
      // If login is successful, generate a JWT and send it in a cookie
      const token = response.token;
      res.cookie("jwt", token, { httpOnly: true });
      res.json({ success: true, message: "Logged in successfully" });
    } else {
      res.json(response); // Return the failure response from userService
    }
  });
});

//Protected Route
app.get("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    res.status(200).json({ userId: userId });
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
