require("dotenv").config();
const authRoutes=require("./routes/authRoutes");
const dns=require("dns");
const tripRoutes=require("./routes/tripRoutes");

dns.setServers(["1.1.1.1","8.8.8.8"]);

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trips",tripRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});