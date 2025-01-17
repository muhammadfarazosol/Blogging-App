const Reaction = require("../models/reactionModel");
const Post = require("../models/postModels");
const HttpError = require("../models/errorModel");

const addReaction = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { reaction } = req.body;
    const userId = req.user.id;

    if (!["like", "dislike"].includes(reaction)) {
      return next(new HttpError("Invalid reaction type", 400));
    }

    const existingReaction = await Reaction.findOne({
      post: postId,
      user: userId,
    });

    if (existingReaction) {
      if (existingReaction.reaction === reaction) {
        await existingReaction.deleteOne();
        return res.status(200).json({ message: `${reaction} removed` });
      } else {
        existingReaction.reaction = reaction;
        await existingReaction.save();
        return res
          .status(200)
          .json({ message: `Reaction updated to ${reaction}` });
      }
    } else {
      const newReaction = await Reaction.create({
        post: postId,
        user: userId,
        reaction,
      });
      res
        .status(201)
        .json({ message: `${reaction} added`, reaction: newReaction });
    }
  } catch (error) {
    return next(
      new HttpError(error.message || "Error processing reaction", 500)
    );
  }
};

const getReactions = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const likeCount = await Reaction.countDocuments({
      post: postId,
      reaction: "like",
    });
    const dislikeCount = await Reaction.countDocuments({
      post: postId,
      reaction: "dislike",
    });

    const userReaction = await Reaction.findOne({
      post: postId,
      user: userId,
    });

    res.status(200).json({
      likes: likeCount,
      dislikes: dislikeCount,
      userReaction: userReaction ? userReaction.reaction : null, // Include user's reaction
    });
  } catch (error) {
    return next(
      new HttpError(error.message || "Error fetching reactions", 500)
    );
  }
};

const getUserReaction = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const reaction = await Reaction.findOne({ post: postId, user: userId });

    res.status(200).json({ reaction: reaction ? reaction.reaction : null });
  } catch (error) {
    return next(
      new HttpError(error.message || "Error fetching user reaction", 500)
    );
  }
};

module.exports = {
  addReaction,
  getReactions,
  getUserReaction,
};
