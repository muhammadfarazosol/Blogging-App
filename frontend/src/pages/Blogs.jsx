import { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";

const Blogs = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setAllPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };
    fetchAllPosts();
  }, []);

  // const handleFilteredPosts = (posts) => {
  //   setFilteredPosts(posts.length ? posts : allPosts);
  // };
  const handleFilteredPosts = (posts) => {
    if (posts.length) {
      setFilteredPosts(posts);
      setIsFiltered(true);
    } else {
      setFilteredPosts(allPosts);
      setIsFiltered(false);
    }
  };

  const handleViewAll = () => {
    setFilteredPosts(allPosts);
    setIsFiltered(false);
  };

  return (
    <div className="bg-[#c9dcf3]">
      <Filter onFilter={handleFilteredPosts} />{" "}
      <h1 className="blogs-heading">Explore Our Blogs</h1>
      {isFiltered && (
        <div className="text-center mt-4 mb-4">
          <button
            onClick={handleViewAll}
            className="bg-[#3e95fb] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            View All Posts
          </button>
        </div>
      )}
      <Posts posts={filteredPosts} />{" "}
    </div>
  );
};

export default Blogs;
