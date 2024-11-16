const { Router } = require("express");

const {
  registerUser,
  verifyOTPAndRegister,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
} = require("../controllers/userControllers.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTPAndRegister);
router.post("/login", loginUser);
router.get("/:id", getUser);
router.get("/", getAuthors);
router.post("/change-avatar", authMiddleware, changeAvatar);
router.patch("/edit-user", authMiddleware, editUser);

router.get("/", (req, res, next) => {
  res.json("this is user route");
});

module.exports = router;
