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
    next(new HttpError("Failed to add comment", 500));
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
    next(new HttpError("Failed to fetch comments", 500));
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
      return next(new HttpError("Comment not found", 404));
    }

    const reply = { content, author: userId };
    comment.replies.push(reply);
    await comment.save();

    res.status(201).json(reply);
  } catch (error) {
    next(new HttpError("Failed to add reply", 500));
  }
};

// Get all comments (excluding replies)
const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({}, { replies: 0 }) // Exclude the replies field
      .populate("author");
    res.status(200).json(comments);
  } catch (error) {
    next(new HttpError("Failed to fetch all comments", 500));
  }
};

// Delete a specific comment and its replies
const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new HttpError("Comment not found", 404));
    }

    if (comment.author.toString() !== userId) {
      return next(
        new HttpError("You are not authorized to delete this comment", 403)
      );
    }

    await Comment.findByIdAndDelete(commentId); // Automatically removes replies as they're embedded in the comment
    res
      .status(200)
      .json({ message: "Comment and its replies deleted successfully" });
  } catch (error) {
    next(new HttpError("Failed to delete comment", 500));
  }
};

// Delete a specific reply
const deleteReply = async (req, res, next) => {
  const { commentId, replyId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new HttpError("Comment not found", 404));
    }

    const replyIndex = comment.replies.findIndex(
      (reply) => reply._id.toString() === replyId
    );
    if (replyIndex === -1) {
      return next(new HttpError("Reply not found", 404));
    }

    if (comment.replies[replyIndex].author.toString() !== userId) {
      return next(
        new HttpError("You are not authorized to delete this reply", 403)
      );
    }

    comment.replies.splice(replyIndex, 1); // Remove the reply from the array
    await comment.save();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    next(new HttpError("Failed to delete reply", 500));
  }
};

// Edit a specific comment
const editComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new HttpError("Comment not found", 404));
    }

    // Ensure the user owns the comment
    if (comment.author.toString() !== userId) {
      return next(
        new HttpError("You are not authorized to edit this comment", 403)
      );
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    next(new HttpError("Failed to update comment", 500));
  }
};

// Edit a specific reply
const editReply = async (req, res, next) => {
  const { commentId, replyId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(new HttpError("Comment not found", 404));
    }

    const reply = comment.replies.find(
      (reply) => reply._id.toString() === replyId
    );

    if (!reply) {
      return next(new HttpError("Reply not found", 404));
    }

    // Ensure the user owns the reply
    if (reply.author.toString() !== userId) {
      return next(
        new HttpError("You are not authorized to edit this reply", 403)
      );
    }

    reply.content = content;
    await comment.save();

    res.status(200).json({ message: "Reply updated successfully", reply });
  } catch (error) {
    next(new HttpError("Failed to update reply", 500));
  }
};

module.exports = {
  addComment,
  getComments,
  addReply,
  getAllComments,
  deleteComment,
  deleteReply,
  editComment,
  editReply,
};
