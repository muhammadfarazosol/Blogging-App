// import PostAuthor from "../components/PostAuthor";
// import { useContext, useEffect, useState } from "react";
// import DeletePost from "./DeletePost";
// import { Link, useParams } from "react-router-dom";
// import { UserContext } from "../context/userContext";
// import axios from "axios";
// import { CiEdit } from "react-icons/ci";
// import Loader from "../components/Loader";

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   // const [creatorID, setCreatorID] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);
//   const { currentUser } = useContext(UserContext);

//   useEffect(() => {
//     const getPost = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/posts/${id}`
//         );
//         setPost(response?.data);
//         // setCreatorID(response.data.creator);
//       } catch (error) {
//         setError(error);
//       }
//       setIsLoading(false);
//     };
//     getPost();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="bg-[#c9dcf3] flex items-center justify-center min-h-screen py-32">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#c9dcf3]">
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         {error && <p className="text-red-600">{error}</p>}
//         {/* White container */}
//         {post && (
//           <div className="bg-white rounded-lg shadow-lg p-8">
//             {/* Author and Buttons */}
//             <div className="flex justify-between items-center mb-8">
//               <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
//               {currentUser?.id == post?.creator && (
//                 <div className="flex space-x-8">
//                   <Link to={`/posts/${post?._id}/edit`}>
//                     <button className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
//                       <CiEdit className="w-5 h-5 mr-1" />
//                       Edit
//                     </button>
//                   </Link>
//                   <DeletePost postId={id} />
//                 </div>
//               )}
//             </div>

//             {/* Image */}
//             <div className="mb-8">
//               <img
//                 src={`http://localhost:5000/uploads/${post.thumbnail}`}
//                 alt="Blog post cover"
//                 className="w-[800px] h-[300px] object-cover rounded-lg shadow-lg"
//               />
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl font-bold mb-6 text-gray-800">
//               {post.title}
//             </h1>

//             {/* Post Content */}
//             <div className="prose prose-lg max-w-none text-gray-700">
//               <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostDetail;

import PostAuthor from "../components/PostAuthor";
import { useContext, useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import Loader from "../components/Loader";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const postResponse = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(postResponse.data);

        // Fetch comments for the post
        const commentsResponse = await axios.get(
          `http://localhost:5000/api/comments/posts/${id}`
        );
        setComments(commentsResponse.data);
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
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
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

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...comment.replies, response.data] }
            : comment
        )
      );
      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
    } catch (error) {
      setError("Failed to add reply");
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
                className="w-[800px] h-[300px] object-cover rounded-lg shadow-lg"
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Comments
              </h2>

              {comments.map((comment) => (
                <div key={comment._id} className="mb-4">
                  <p>
                    <strong>{comment.author.name}</strong>: {comment.content}
                  </p>

                  {/* Replies */}
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="ml-6 mt-2">
                      <p>
                        <strong>{reply.author.name}</strong>: {reply.content}
                      </p>
                    </div>
                  ))}

                  {/* Add Reply */}
                  <div className="ml-6 mt-2">
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
                      className="border rounded p-1"
                    />
                    <button
                      onClick={() => handleAddReply(comment._id)}
                      className="ml-2 bg-blue-500 text-white rounded px-2 py-1"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Comment */}
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
