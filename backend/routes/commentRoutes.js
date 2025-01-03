const { Router } = require("express");
const {
  addComment,
  getComments,
  getAllComments,
  addReply,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
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

router.delete("/:commentId", authMiddleware, deleteComment);
router.delete("/:commentId/replies/:replyId", authMiddleware, deleteReply);
router.put("/:commentId", authMiddleware, editComment);
router.put("/:commentId/replies/:replyId", authMiddleware, editReply);

module.exports = router;
