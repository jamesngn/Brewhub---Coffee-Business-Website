//app.js
const express = require("express");
const mongoose = require("mongoose");
const menuRoutes = require("./routes/menuRoutes.js");
const uri = require("config").get("mongoURI");

const app = express();
const PORT = process.env.PORT || 3000;

//Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(menuRoutes);

app.listen(PORT, () => {
  console.log(`Menu Service is running on port ${PORT}`);
});
