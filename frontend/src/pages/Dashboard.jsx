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
import NoPostFound from "../components/NoPostFound";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

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
        const response = await axios.get(`${API_BASE_URL}/posts/users/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    <div className="bg-[#c9dcf3] min-h-screen pt-6">
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
                <Link to={`/posts/${post._id}`}>
                  <div className="relative">
                    <img
                      className="w-full h-48 object-cover"
                      src={`${APP_ASSESTS_URL}/uploads/${post.thumbnail}`}
                      alt="Avatar"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                  <div className="px-6 pt-2">
                    <Link to={`/posts/categories/${post.category}`}>
                      <span className="inline-block mb-2 text-xs font-semibold tracking-wide text-primary">
                        {post.category}
                      </span>
                    </Link>
                  </div>
                  <div className="px-6">
                    <h2 className="font-bold text-xl mb-2 text-gray-800">
                      {post.title}
                    </h2>
                    <p
                      className="mb-4 text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html:
                          post.description.length > 100
                            ? `${post.description.slice(0, 100)}...`
                            : post.description,
                      }}
                    />
                  </div>
                </Link>

                <div
                  className={`px-6 pb-4 transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <div className="flex justify-center space-x-20">
                    {/* <Link to={`/posts/${post._id}`}>
                      <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
                        <FaEye className="w-5 h-5 mr-1" />
                        View
                      </button>
                    </Link> */}
                    <Link to={`/posts/${post._id}/edit`}>
                      <button className="flex items-center justify-center w-full px-3 py-1 text-sm font-normal leading-6 text-green-500 capitalize duration-100 transform border-[1px] rounded-lg cursor-pointer border-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none border-text  hover:shadow-lg hover:-translate-y-1">
                        <CiEdit className="w-5 h-5 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <DeletePost postId={post._id} variant="alternative" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="-mt-9">
          <NoPostFound />
          <Link to={`/create`}>
            <div className="flex items-center justify-center">
              <button className="bg-black max-sm:mt-10 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                Create now
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
