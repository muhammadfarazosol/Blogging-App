import PostAuthor from "../components/PostAuthor";
import { useContext, useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import Loader from "../components/Loader";
import ProfileImage from "../assests/ProfileImage.svg";

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && <p className="text-red-600">{error}</p>}

        {post && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
              {currentUser?.id === post?.creator && (
                <div className="flex space-x-8">
                  <Link to={`/posts/${post?._id}/edit`}>
                    <button className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
                      <CiEdit className="w-5 h-5 mr-1" />
                      Edit
                    </button>
                  </Link>
                  <DeletePost postId={id} />
                </div>
              )}
            </div>

            <div className="mb-8">
              <img
                src={`http://localhost:5000/uploads/${post.thumbnail}`}
                alt="Blog post cover"
                className="w-full h-[300px] object-cover rounded-lg shadow-lg"
              />
            </div>

            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700">
              <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
            </div>

            {/* Comments Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Comments
              </h2>

              {displayedComments.map((comment) => (
                <div
                  key={comment._id}
                  className="mb-2 bg-gray-50 rounded-lg p-4 shadow"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={getAvatarUrl(comment.author?.avatar)}
                      alt={comment.author ? comment.author.name : "Anonymous"}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = ProfileImage;
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {comment.author ? comment.author.name : "Anonymous"}
                      </p>
                      <p className="text-gray-600 mt-1">{comment.content}</p>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="ml-12 mt-3 bg-white rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={getAvatarUrl(reply.author?.avatar)}
                          alt={reply.author ? reply.author.name : "Anonymous"}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = ProfileImage;
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {reply.author ? reply.author.name : "Anonymous"}
                          </p>
                          <p className="text-gray-600 mt-1">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Reply */}
                  <div className="ml-12 mt-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src={getAvatarUrl(author?.avatar)}
                        alt={currentUser?.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = ProfileImage;
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyContent[comment._id] || ""}
                        onChange={(e) =>
                          setReplyContent((prev) => ({
                            ...prev,
                            [comment._id]: e.target.value,
                          }))
                        }
                        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        onClick={() => handleAddReply(comment._id)}
                        className="bg-[#3e95fb] text-white rounded-full px-4 py-2 text-sm hover:bg-blue-400 transition duration-300"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {displayedComments.length < comments.length && (
                <div className="flex justify-center items-center">
                  <button
                    onClick={loadMoreComments}
                    className="mt-2 bg-[#3e95fb] text-white rounded-full px-4 py-2 text-sm hover:bg-blue-400 transition duration-300"
                  >
                    View More Comments
                  </button>
                </div>
              )}

              {/* Add New Comment */}
              <div className="mt-4">
                <div className="flex items-center space-x-2 w-full">
                  <img
                    src={getAvatarUrl(author.avatar)}
                    alt={currentUser?.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ProfileImage;
                    }}
                  />

                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-[#3e95fb] text-white rounded-full px-4 py-2 text-sm hover:bg-blue-400 transition duration-300"
                  >
                    Comment
                  </button>
                </div>
                {error && <p className="text-red-600 mt-2">{error}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
