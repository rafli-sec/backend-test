require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();
app.use(bodyParser.json());

// Rute API
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/home", homeRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Internal Server Error");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
