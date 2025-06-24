// userRoutes.js
const express = require("express");         
const router = express.Router();            

const multer = require("multer");
const {
  createUser,
  getUserById,
  updateUser
} = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/", upload.single("user_image"), createUser);
router.get("/:id", getUserById);
router.put("/:id", upload.single("user_image"), updateUser);

module.exports = router;
