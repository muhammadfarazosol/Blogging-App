import { MdEdit, MdDeleteSweep } from "react-icons/md";
import PostAuthor from "../components/PostAuthor";
import BlogImage from "../assests/assets/images/image1.jpg";
import { useContext, useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  // const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setPost(response?.data);
        // setCreatorID(response.data.creator);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {error && <p className="text-red-600">{error}</p>}
      {/* White container */}
      {post && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Author and Buttons */}
          <div className="flex justify-between items-center mb-8">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="flex space-x-2">
                <Link to={`/posts/${post?._id}/edit`}>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    <MdEdit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>

          {/* Image */}
          <div className="mb-8">
            <img
              src={`http://localhost:5000/uploads/${post.thumbnail}`}
              alt="Blog post cover"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            {post.title}
          </h1>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
