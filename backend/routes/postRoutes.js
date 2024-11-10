const { Router } = require("express");

const {
  createPost,
  getCatPosts,
  getPost,
  getPosts,
  getUserPosts,
  editPost,
  deletePost,
  searchPostsByTitle,
  getTitleSuggestions,
} = require("../controllers/postControllers");

const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/categories/:category", getCatPosts);
router.get("/users/:id", getUserPosts);

router.get("/search", searchPostsByTitle);
router.get("/suggestions", getTitleSuggestions);

router.get("/:id", getPost);
router.patch("/:id", authMiddleware, editPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
