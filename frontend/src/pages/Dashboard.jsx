import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);

  if (isLoading) {
    <p>Loading...</p>;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/users/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-[#c9dcf3] flex items-center justify-center min-h-screen py-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#c9dcf3]">
      <h2 className="blogs-heading">My Blogs</h2>
      {posts.length > 0 ? (
        <>
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-300 transform hover:scale-105 mx-10 mb-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:5000/uploads/${post.thumbnail}`}
                    alt="Avatar"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2 text-gray-800">
                    {post.title}
                  </h2>
                </div>
                <div
                  className={`px-6 pt-2 pb-4 transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <Link to={`/posts/${post._id}`}>
                      <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
                        <FaEye className="w-5 h-5 mr-1" />
                        View
                      </button>
                    </Link>
                    <Link to={`/posts/${post._id}/edit`}>
                      <button className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
                        <CiEdit className="w-5 h-5 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <DeletePost postId={post._id} />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <h2 className="flex justify-center text-white items-center font-bold text-2xl py-32">
          No posts found
        </h2>
      )}
    </div>
  );
};

export default Dashboard;
