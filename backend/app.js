const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.use("/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
