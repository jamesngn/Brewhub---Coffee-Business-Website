const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API Gateway is listening on port ${port}`);
});
