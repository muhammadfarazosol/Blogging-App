const express = require("express");
const {
  addReaction,
  getReactions,
  getUserReaction,
} = require("../controllers/reactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId", authMiddleware, addReaction);
router.get("/:postId", authMiddleware, getReactions);
router.get("/:postId/user", authMiddleware, getUserReaction);

module.exports = router;
