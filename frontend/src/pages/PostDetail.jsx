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

const COMMENTS_PER_PAGE = 1;

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

  const refreshComments = async () => {
    try {
      const commentsResponse = await axios.get(
        `http://localhost:5000/api/comments/posts/${id}`
      );
      setComments(commentsResponse.data);
      setDisplayedComments(
        commentsResponse.data.slice(0, COMMENTS_PER_PAGE * page)
      );
    } catch (error) {
      setError("Failed to load comments");
    }
  };

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const postResponse = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(postResponse.data);
        await refreshComments();
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/posts/${id}`,
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
      setDisplayedComments((prevDisplayed) => [
        newCommentWithUser,
        ...prevDisplayed.slice(0, COMMENTS_PER_PAGE - 1),
      ]);
    } catch (error) {
      setError("Failed to add comment");
    }
  };

  const handleAddReply = async (commentId) => {
    if (!replyContent[commentId]) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comments/${commentId}/replies`,
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

      setDisplayedComments((prevDisplayed) =>
        prevDisplayed.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...comment.replies, newReplyWithUser] }
            : comment
        )
      );
    } catch (error) {
      setError("Failed to add reply");
    }
  };

  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${currentUser?.id}`
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
    return avatar ? `http://localhost:5000/uploads/${avatar}` : ProfileImage;
  };

  const loadMoreComments = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = Math.min(startIndex + COMMENTS_PER_PAGE, comments.length);
    setDisplayedComments([
      ...displayedComments,
      ...comments.slice(startIndex, endIndex),
    ]);
    setPage(nextPage);
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
      <div className="mx-auto max-w-7xl px-4 py-8">
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
                  <p className="text-sm text-black font-semibold">Tag</p>
                  <span className="inline-flex rounded-lg bg-[#3e95fb] px-3 py-1 text-sm mt-2 font-medium text-white space-y-6">
                    {post.category}
                  </span>
                </div>
                {currentUser?.id === post?.creator && (
                  <div className="flex space-x-4 sm:space-x-8 border-t py-4">
                    <Link to={`/posts/${post?._id}/edit`}>
                      <button className="flex items-center justify-center w-full px-3 py-1 text-sm font-normal leading-6 text-green-500 capitalize duration-100 transform border-[1px] rounded-lg cursor-pointer border-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none border-text  hover:shadow-lg hover:-translate-y-1">
                        <CiEdit className="w-5 h-5 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <DeletePost postId={id} variant="alternative" />
                  </div>
                )}
              </div>
            </aside>
            {/* Post Detail Section */}
            <main className="min-w-0">
              <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <img
                    src={`http://localhost:5000/uploads/${post.thumbnail}`}
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
                  <h2 className="text-xl max-sm:text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    Comments
                  </h2>

                  {displayedComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="mb-4 bg-gray-50 rounded-lg p-4 shadow"
                    >
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
                            {comment.author ? comment.author.name : "Anonymous"}
                          </p>
                          <p className="text-gray-600 mt-1 max-sm:text-sm">
                            {comment.content}
                          </p>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies.map((reply) => (
                        <div
                          key={reply._id}
                          className="ml-6 sm:ml-12 mt-3 bg-white rounded-lg p-3 shadow-sm max-sm:text-sm"
                        >
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
                                {reply.author ? reply.author.name : "Anonymous"}
                              </p>
                              <p className="text-gray-600 mt-1 max-sm:text-xs">
                                {reply.content}
                              </p>
                            </div>
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

                  {displayedComments.length < comments.length && (
                    <div className="flex justify-center items-center">
                      <button
                        onClick={loadMoreComments}
                        className="mt-2 bg-[#3e95fb] text-white rounded-full px-4 py-2 text-sm hover:bg-blue-400 transition duration-300 max-sm:text-xs max-sm:py-1 max-sm:px-2"
                      >
                        View More Comments
                      </button>
                    </div>
                  )}

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
