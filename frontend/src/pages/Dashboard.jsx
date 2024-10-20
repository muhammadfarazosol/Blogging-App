import { useState } from "react";
import { DummyPosts } from "../data/Data";
import { FaEye } from "react-icons/fa";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState(DummyPosts);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <h1 className="flex items-center justify-center text-3xl font-bold text-white pt-8">
            My Blogs
          </h1>

          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-300 transform hover:scale-105 m-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={post.thumbnail}
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
                    <Link to={`/posts/${post.id}`}>
                      <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200">
                        <FaEye className="w-5 h-5 mr-1" />
                        View
                      </button>
                    </Link>
                    <Link to={`/posts/${post.id}/edit`}>
                      <button className="flex items-center text-green-500 hover:text-green-700 transition-colors duration-200">
                        <CiEdit className="w-5 h-5 mr-1" />
                        Edit
                      </button>
                    </Link>
                    <Link to={`/posts/${post.id}/delete`}>
                      <button className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200">
                        <CiTrash className="w-5 h-5 mr-1" />
                        Delete
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <h2 className="flex justify-center items-center font-bold text-2xl my-32">
          No posts found
        </h2>
      )}
    </div>
  );
};

export default Dashboard;
