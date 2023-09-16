const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API Gateway is listening on port ${port}`);
});
