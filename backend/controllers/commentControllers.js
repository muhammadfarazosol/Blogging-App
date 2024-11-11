// const Comment = require("../models/commentModel");
// const Post = require("../models/postModels");
// const HttpError = require("../models/errorModel");

// // Add a new comment to a post
// const addComment = async (req, res, next) => {
//   const { postId } = req.params;
//   const { content } = req.body;
//   const userId = req.user.id;

//   try {
//     const comment = await Comment.create({
//       content,
//       author: userId,
//       post: postId,
//     });
//     res.status(201).json(comment);
//   } catch (error) {
//     next(new HttpError("Failed to add comment.", 500));
//   }
// };

// // Get all comments for a specific post
// const getComments = async (req, res, next) => {
//   const { postId } = req.params;

//   try {
//     const comments = await Comment.find({ post: postId })
//       .populate("author", "name")
//       .populate("replies.author", "name");
//     res.status(200).json(comments);
//   } catch (error) {
//     next(new HttpError("Failed to fetch comments.", 500));
//   }
// };

// // Add a reply to a comment
// const addReply = async (req, res, next) => {
//   const { commentId } = req.params;
//   const { content } = req.body;
//   const userId = req.user.id;

//   try {
//     const comment = await Comment.findById(commentId);
//     if (!comment) {
//       return next(new HttpError("Comment not found.", 404));
//     }

//     const reply = { content, author: userId };
//     comment.replies.push(reply);
//     await comment.save();

//     res.status(201).json(reply);
//   } catch (error) {
//     next(new HttpError("Failed to add reply.", 500));
//   }
// };

// module.exports = {
//   addComment,
//   getComments,
//   addReply,
// };
const Comment = require("../models/commentModel");
const Post = require("../models/postModels");
const HttpError = require("../models/errorModel");

// Add a new comment to a post
const addComment = async (req, res, next) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.create({
      content,
      author: userId,
      post: postId,
    });
    res.status(201).json(comment);
  } catch (error) {
    next(new HttpError("Failed to add comment.", 500));
  }
};

// Get all comments for a specific post
const getComments = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", "name avatar")
      .populate("replies.author", "name avatar");
    res.status(200).json(comments);
  } catch (error) {
    next(new HttpError("Failed to fetch comments.", 500));
  }
};

// Add a reply to a comment
const addReply = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new HttpError("Comment not found.", 404));
    }

    const reply = { content, author: userId };
    comment.replies.push(reply);
    await comment.save();

    res.status(201).json(reply);
  } catch (error) {
    next(new HttpError("Failed to add reply.", 500));
  }
};

module.exports = {
  addComment,
  getComments,
  addReply,
};
