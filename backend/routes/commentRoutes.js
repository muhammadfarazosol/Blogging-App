const { Router } = require("express");
const {
  addComment,
  getComments,
  getAllComments,
  addReply,
} = require("../controllers/commentControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

// Add a new comment to a post
router.post("/posts/:postId", authMiddleware, addComment);

// Get all comments for a specific post
router.get("/posts/:postId", getComments);

// Add a reply to a specific comment
router.post("/:commentId/replies", authMiddleware, addReply);

// Get all comments (excluding replies)
router.get("/all", getAllComments);

module.exports = router;
