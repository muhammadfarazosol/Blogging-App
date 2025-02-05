import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import NoPostFound from "../components/NoPostFound";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, []);

  const recentPosts = posts
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#c9dcf3] pt-32">
        <Loader />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="bg-[#c9dcf3] py-12">
      <h2 className="blogs-heading">Explore Our Latest Blogs</h2>
      {recentPosts.length > 0 ? (
        <>
          <motion.section
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <PostItem
                  id={post._id}
                  key={post._id}
                  description={post.description}
                  thumbnail={post.thumbnail}
                  category={post.category}
                  title={post.title}
                  authorID={post.creator}
                  createdAt={post.createdAt}
                />
              </motion.div>
            ))}
          </motion.section>

          <Link to={"/blogs"}>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button className="px-6 py-3 bg-[#3e95fb] text-white border-2 border-white rounded-3xl text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                View All
              </button>
            </motion.div>
          </Link>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NoPostFound />
        </motion.div>
      )}
    </div>
  );
};

export default RecentPosts;
