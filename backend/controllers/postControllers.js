const Post = require("../models/postModels");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

// Create a post
// POST : api/posts
// Protected
const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError(" Fill in all fields and choose thumbnail", 422)
      );
    }
    const { thumbnail } = req.files;
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnail size is too big, File should be less than 2mb")
      );
    }

    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created"), 422);
          }
          // finding user and count increase posts by 1
          const currentUSer = await User.findById(req.user.id);
          const userPostCount = currentUSer.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// Get all post
// GET : api/posts
// unProtected
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// Get a single post
// GET : api/posts/:id
// unProtected
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// Get a post by category
// GET : api/posts/categories/:category
// unProtected
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ updatedAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// Get author post
// GET : api/posts/users/:id
// unProtected
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// Edit blog post
//PATCH : api/posts/:id
//Protected
const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFilename;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description } = req.body;
    //React quill has a paragraph opening and closing tag with a break tag in between so there are 11 characters in there already

    if (!title || !category || description.length < 12) {
      return next(new HttpError("fill in all fields.", 422));
    }
    //get old post from database
    const oldPost = await Post.findById(postId);
    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description },
          { new: true }
        );
      } else {
        //delete old thumbnails from upload
        fs.unlink(
          path.join(__dirname, "..", "uploads", oldPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        //upload new thumbnail
        const { thumbnail } = req.files;
        //check file size
        if (thumbnail.size > 2000000) {
          return next(
            new HttpError("Thumbnail is too big . should be less than 2mb")
          );
        }
        fileName = thumbnail.name;
        let splittedFilename = fileName.split(".");
        newFilename =
          splittedFilename[0] +
          uuid() +
          "." +
          splittedFilename[splittedFilename.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFilename),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFilename },
          { new: true }
        );
      }
    }

    if (!updatedPost) {
      return next(new HttpError("could not update post.", 400));
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// Delete post
// DELETE : api/posts/:id
// Protected
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable.", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;
    if (req.user.id == post.creator) {
      //delete thumbnail from upload folder
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(postId);
            //find user and  reduce post count by 1
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, {
              posts: userPostCount,
            });
            res.json(`Post ${postId} deleted successfully`);
          }
        }
      );
    } else {
      return next(new HttpError("Post can't be deleted", 403));
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  getCatPosts,
  getPost,
  getPosts,
  getUserPosts,
  editPost,
  deletePost,
};
