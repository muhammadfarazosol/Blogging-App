const express = require("express");
const {
  addReaction,
  getReactions,
  getUserReaction,
  getLikesForPost,
} = require("../controllers/reactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId", authMiddleware, addReaction);
router.get("/:postId", authMiddleware, getReactions);
router.get("/:postId/user", authMiddleware, getUserReaction);
router.get("/:postId/likes", getLikesForPost);

module.exports = router;
