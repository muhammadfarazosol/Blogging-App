import PostAuthor from "../components/PostAuthor";
import { useContext, useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import Loader from "../components/Loader";
import ProfileImage from "../assests/ProfileImage.svg";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaReplyAll } from "react-icons/fa";
import SidebarPosts from "../components/SidebarPosts";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";

// const COMMENTS_PER_PAGE = 1;

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [page, setPage] = useState(1);
  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState({});
  const [editContent, setEditContent] = useState("");

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const refreshComments = async () => {
    try {
      const commentsResponse = await axios.get(
        `${API_BASE_URL}/comments/posts/${id}`
      );
      setComments(commentsResponse.data);
      // setDisplayedComments(commentsResponse.data);
    } catch (error) {
      toast.error("Failed to load comments");
    }
  };

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const postResponse = await axios.get(`${API_BASE_URL}/posts/${id}`);
        setPost(postResponse.data);
        await refreshComments();
      } catch (error) {
        toast.error(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/posts/${id}`, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });

      const updatedComments = response.data.map((comment) => ({
        ...comment,
        author: {
          _id: comment.author._id,
          name: comment.author.name,
          avatar: comment.author.avatar,
        },
      }));

      setComments(updatedComments);
      // setDisplayedComments(updatedComments);
    } catch (error) {
      toast.error("Failed to fetch comments");
    }
  };

  const handleAddComment = async () => {
    // if (!newComment) return;

    if (!newComment || newComment.length > 200) {
      toast.error("Comment must be between 1 and 200 characters");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments/posts/${id}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );

      const newCommentWithUser = {
        ...response.data,
        author: {
          _id: currentUser.id,
          name: currentUser.name,
          avatar: author.avatar,
        },
      };

      setNewComment("");
      setComments((prevComments) => [newCommentWithUser, ...prevComments]);
      // setDisplayedComments((prevDisplayed) => [
      //   newCommentWithUser,
      //   ...prevDisplayed,
      // ]);
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleAddReply = async (commentId) => {
    // if (!replyContent[commentId]) return;

    if (!replyContent[commentId] || replyContent[commentId].length > 200) {
      toast.error("Reply must be between 1 and 200 characters");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments/${commentId}/replies`,
        { content: replyContent[commentId] },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );

      const newReplyWithUser = {
        ...response.data,
        author: {
          _id: currentUser.id,
          name: currentUser.name,
          avatar: author.avatar,
        },
      };

      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...comment.replies, newReplyWithUser] }
            : comment
        )
      );

      // setDisplayedComments((prevDisplayed) =>
      //   prevDisplayed.map((comment) =>
      //     comment._id === commentId
      //       ? { ...comment, replies: [...comment.replies, newReplyWithUser] }
      //       : comment
      //   )
      // );
      await fetchComments();
    } catch (error) {
      toast.error("Failed to add reply");
    }
  };

  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/${currentUser?.id}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser?.id) {
      getAuthor();
    }
  }, [currentUser]);

  const getAvatarUrl = (avatar) => {
    return avatar ? `${APP_ASSESTS_URL}/uploads/${avatar}` : ProfileImage;
  };

  // const loadMoreComments = () => {
  //   const nextPage = page + 1;
  //   const startIndex = (nextPage - 1) * COMMENTS_PER_PAGE;
  //   const endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, comments.length);
  //   setDisplayedComments([
  //     ...displayedComments,
  //     ...comments.slice(startIndex, endIndex),
  //   ]);
  //   setPage(nextPage);
  // };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });

      // Remove the deleted comment from state
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );

      // setDisplayedComments((prevDisplayed) =>
      //   prevDisplayed.filter((comment) => comment._id !== commentId)
      // );
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/comments/${commentId}/replies/${replyId}`,
        {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );

      // Remove the deleted reply from state
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply._id !== replyId
                ),
              }
            : comment
        )
      );

      // setDisplayedComments((prevDisplayed) =>
      //   prevDisplayed.map((comment) =>
      //     comment._id === commentId
      //       ? {
      //           ...comment,
      //           replies: comment.replies.filter(
      //             (reply) => reply._id !== replyId
      //           ),
      //         }
      //       : comment
      //   )
      // );
      toast.success("Reply deleted successfully");
    } catch (error) {
      toast.error("Failed to delete reply");
    }
  };

  const handleEditComment = async (commentId) => {
    if (editContent.length < 1 || editContent.length > 200) {
      toast.error("Comment must be between 1 and 200 characters");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/comments/${commentId}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: editContent }
            : comment
        )
      );

      // setDisplayedComments((prevComments) =>
      //   prevComments.map((comment) =>
      //     comment._id === commentId
      //       ? { ...comment, content: editContent }
      //       : comment
      //   )
      // );

      setEditingComment(null);
      setEditContent("");
      toast.success("Comment edited successfully");
    } catch (error) {
      toast.error("Failed to edit comment");
    }
  };

  const handleEditReply = async (commentId, replyId) => {
    if (editContent.length < 1 || editContent.length > 200) {
      toast.error("Comment must be between 1 and 200 characters");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/comments/${commentId}/replies/${replyId}`,
        { content: editContent },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply._id === replyId
                    ? { ...reply, content: editContent }
                    : reply
                ),
              }
            : comment
        )
      );

      // setDisplayedComments((prevComments) =>
      //   prevComments.map((comment) =>
      //     comment._id === commentId
      //       ? {
      //           ...comment,
      //           replies: comment.replies.map((reply) =>
      //             reply._id === replyId
      //               ? { ...reply, content: editContent }
      //               : reply
      //           ),
      //         }
      //       : comment
      //   )
      // );

      setEditingReply({});
      setEditContent("");
      toast.success("Reply edited successfully");
    } catch (error) {
      toast.error("Failed to edit reply");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#c9dcf3] flex items-center justify-center min-h-screen py-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#c9dcf3]">
      <div className="mx-auto max-w-[2000px] px-4 py-8">
        {error && <p className="text-red-600">{error}</p>}

        {post && (
          <article className="relative grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr_250px]">
            {/* Author Details Section */}
            <aside className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
              <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
                <p className="text-sm text-black font-semibold">Author</p>
                <div className="flex items-center gap-4">
                  <PostAuthor
                    authorID={post.creator}
                    createdAt={post.createdAt}
                  />
                </div>
                <div className="space-y-2 border-t pt-4 text-sm">
                  <p className="text-gray-600">
                    Published: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Last updated:{" "}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-black font-semibold">Category</p>
                  <Link to={`/posts/categories/${post.category}`}>
                    <span className="inline-flex rounded-lg bg-[#3e95fb] px-3 py-1 text-sm mt-2 font-medium text-white space-y-6">
                      {post.category}
                    </span>
                  </Link>
                </div>
                {currentUser?.id === post?.creator && (
                  <div className="flex space-x-4 sm:space-x-8 border-t py-4">
                    <Link to={`/posts/${post?._id}/edit`}>
                      <button className="flex items-center justify-center w-full px-3 py-1 text-sm font-normal leading-6 text-green-500 capitalize duration-100 transform border-[1px] rounded-lg cursor-pointer border-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none border-text  hover:shadow-lg hover:-translate-y-1">
                        <CiEdit className="w-5 h-5 mr-1" />
                        Edit
                      </button>
                    </Link>
                    {/* <DeletePost postId={id} variant="alternative" /> */}
                  </div>
                )}
              </div>
            </aside>
            {/* Post Detail Section */}
            <main className="min-w-0">
              <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <img
                    src={`${APP_ASSESTS_URL}/uploads/${post.thumbnail}`}
                    alt="Blog post cover"
                    className="w-full h-auto max-h-[300px] object-cover rounded-lg shadow-lg"
                  />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
                  {post.title}
                </h1>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
                </div>

                {/* Comments Section */}
                <div className="mt-10">
                  {comments.length > 0 && (
                    <h2 className="text-xl max-sm:text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                      Comments
                    </h2>
                  )}

                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="mb-4 bg-gray-50 rounded-lg p-4 shadow"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start space-x-3">
                          <img
                            src={getAvatarUrl(comment.author?.avatar)}
                            alt={
                              comment.author ? comment.author.name : "Anonymous"
                            }
                            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = ProfileImage;
                            }}
                          />
                          <div className="flex-1 break-words">
                            <p className="font-semibold text-gray-800 max-sm:text-sm">
                              {comment.author
                                ? comment.author.name
                                : "Anonymous"}
                            </p>
                            {/* <p className="text-gray-600 mt-1 max-sm:text-sm">
                              {comment.content}
                            </p> */}
                            {editingComment === comment._id ? (
                              <div className="flex items-center max-sm:mt-2">
                                <input
                                  type="text"
                                  value={editContent}
                                  onChange={(e) =>
                                    setEditContent(e.target.value)
                                  }
                                  className="flex-1 border rounded-full px-4 py-2 max-sm:px-2 max-sm:py-1 max-sm:text-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                                <button
                                  onClick={() => handleEditComment(comment._id)}
                                  className="bg-[#3e95fb] flex-shrink text-white rounded-full px-4 py-1 max-sm:px-2 max-sm:text-xs text-sm hover:bg-blue-400 transition duration-300 ml-2"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingComment(null);
                                    setEditContent("");
                                  }}
                                  className="bg-gray-400 flex-shrink text-white rounded-full px-4 py-1 max-sm:px-2 max-sm:text-xs text-sm hover:bg-gray-600 transition duration-300 ml-2"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <p className="text-gray-600 mt-1 max-sm:text-sm">
                                {comment.content}
                              </p>
                            )}
                          </div>
                        </div>
                        {currentUser?.id === comment.author?._id && (
                          <div className="flex space-x-3">
                            <p
                              className="text-green-600 cursor-pointer"
                              onClick={() => {
                                setEditingComment(comment._id);
                                setEditContent(comment.content);
                              }}
                            >
                              <CiEdit className="text-lg" />
                            </p>
                            <p
                              className="text-red-600 cursor-pointer"
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              <RiDeleteBin5Line className="text-lg" />
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Replies */}
                      {comment.replies.map((reply) => (
                        <div
                          key={reply._id}
                          className="ml-6 sm:ml-12 mt-3 bg-white rounded-lg p-3 shadow-sm max-sm:text-sm"
                        >
                          <div className="flex justify-between">
                            <div className="flex items-start space-x-3">
                              <img
                                src={getAvatarUrl(reply.author?.avatar)}
                                alt={
                                  reply.author ? reply.author.name : "Anonymous"
                                }
                                className="w-4 h-4 sm:w-8 sm:h-8 rounded-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = ProfileImage;
                                }}
                              />
                              <div className="flex-1 break-words">
                                <p className="font-semibold text-gray-800 max-sm:text-xs">
                                  {reply.author
                                    ? reply.author.name
                                    : "Anonymous"}
                                </p>
                                {/* <p className="text-gray-600 mt-1 max-sm:text-xs">
                                  {reply.content}
                                </p> */}
                                {editingReply[reply._id] ? (
                                  <div className="flex items-center max-sm:mt-2">
                                    <input
                                      type="text"
                                      value={editContent}
                                      onChange={(e) =>
                                        setEditContent(e.target.value)
                                      }
                                      className="flex-1 border rounded-full px-4 py-2 max-sm:px-2 max-sm:py-1 max-sm:text-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    />
                                    <button
                                      onClick={() =>
                                        handleEditReply(comment._id, reply._id)
                                      }
                                      className="bg-[#3e95fb] flex-shrink text-white rounded-full px-4 py-1 max-sm:px-2 max-sm:text-xs text-sm hover:bg-blue-400 transition duration-300 ml-2"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingReply({});
                                        setEditContent("");
                                      }}
                                      className="bg-gray-400 flex-shrink text-white rounded-full px-4 py-1 max-sm:px-2 max-sm:text-xs text-sm hover:bg-gray-600 transition duration-300 ml-2"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-gray-600 mt-1 max-sm:text-xs">
                                    {reply.content}
                                  </p>
                                )}
                              </div>
                            </div>
                            {currentUser?.id === reply.author?._id && (
                              <div className="flex space-x-3">
                                <p
                                  className="text-xs text-green-600 cursor-pointer"
                                  onClick={() => {
                                    setEditingReply({ [reply._id]: true });
                                    setEditContent(reply.content);
                                  }}
                                >
                                  <CiEdit className="text-lg" />
                                </p>

                                <p
                                  className="text-xs text-red-600 cursor-pointer"
                                  onClick={() =>
                                    handleDeleteReply(comment._id, reply._id)
                                  }
                                >
                                  <RiDeleteBin5Line className="text-lg" />
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Add Reply */}
                      {currentUser && (
                        <div className="ml-8 sm:ml-12 mt-3">
                          <div className="flex items-center space-x-2">
                            <img
                              src={getAvatarUrl(author?.avatar)}
                              alt={currentUser?.name}
                              className="w-4 h-4 sm:w-8 sm:h-8 rounded-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = ProfileImage;
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Reply"
                              value={replyContent[comment._id] || ""}
                              onChange={(e) =>
                                setReplyContent((prev) => ({
                                  ...prev,
                                  [comment._id]: e.target.value,
                                }))
                              }
                              className="flex-1 border rounded-full px-4 py-2 max-sm:px-2 max-sm:py-1 max-sm:text-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button
                              onClick={() => handleAddReply(comment._id)}
                              className="bg-[#3e95fb] flex-shrink text-white rounded-full px-4 py-2 max-sm:py-1 max-sm:px-2 max-sm:text-xs text-sm hover:bg-blue-400 transition duration-300"
                            >
                              <FaReplyAll className="md:text-xl" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* {displayedComments.length < comments.length && (
                    <div className="flex justify-center items-center">
                      <button
                        onClick={loadMoreComments}
                        className="mt-2 bg-[#3e95fb] text-white rounded-full px-4 py-2 text-sm hover:bg-blue-400 transition duration-300 max-sm:text-xs max-sm:py-1 max-sm:px-2"
                      >
                        View More Comments
                      </button>
                    </div>
                  )} */}

                  {/* Add New Comment */}
                  {currentUser && (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 w-full">
                        <img
                          src={getAvatarUrl(author.avatar)}
                          alt={currentUser?.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = ProfileImage;
                          }}
                        />

                        <input
                          type="text"
                          placeholder="Comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1 border rounded-full px-4 py-2 text-sm max-sm:text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 max-sm:px-2 max-sm:py-1"
                        />
                        <button
                          onClick={handleAddComment}
                          className="bg-[#3e95fb] flex-none text-white rounded-full max-sm:py-1 max-sm:px-2 max-sm:text-xs px-4 py-2 text-sm hover:bg-blue-400 transition duration-300"
                        >
                          <CiLocationArrow1 className="md:text-xl" />
                        </button>
                      </div>
                      {error && <p className="text-red-600 mt-2">{error}</p>}
                    </div>
                  )}
                </div>
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-8 lg:h-fit">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <div className="space-y-4">
                  {post && (
                    <SidebarPosts
                      category={post.category}
                      currentPostId={post._id}
                    />
                  )}
                </div>
              </div>
            </aside>
          </article>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
