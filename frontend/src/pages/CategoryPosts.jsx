// import React, { useState } from "react";
// import { DummyPosts } from "../data/Data";
// import PostItem from "../components/PostItem";

// const CategoryPosts = () => {
//   const [posts, setPosts] = useState(DummyPosts);
//   return (
//     <div>
//       {posts.length > 0 ? (
//         <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <PostItem
//               id={post.id}
//               key={post.id}
//               description={post.desc}
//               thumbnail={post.thumbnail}
//               category={post.category}
//               title={post.title}
//               authorID={post.authorID}
//             />
//           ))}
//         </section>
//       ) : (
//         <h2 className="flex justify-center items-center font-bold text-2xl my-32">
//           No posts found
//         </h2>
//       )}
//     </div>
//   );
// };

// export default CategoryPosts;

import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Filter from "../components/Filter";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import NoPostFound from "../components/NoPostFound";

const CategoryPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [executedQuery, setExecutedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const { category } = useParams();

  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/categories/${category}`
        );
        setAllPosts(response?.data);
        setFilteredPosts(response?.data);
      } catch (error) {
        console.error("Error fetching category posts:", error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, [category]);

  const handleFilteredPosts = (posts) => {
    if (posts.length) {
      setFilteredPosts(posts);
      setIsFiltered(true);
    } else {
      setFilteredPosts(allPosts);
      setIsFiltered(false);
    }
    setCurrentPage(1);
  };

  const handleQueryChange = (query) => {
    setExecutedQuery(query);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#c9dcf3] pt-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#c9dcf3]">
      <div className="min-h-screen">
        <Filter
          onFilter={handleFilteredPosts}
          onQueryChange={handleQueryChange}
        />
        {isFiltered && (
          <div className="text-center">
            <Link to={"/blogs"}>
              <button className="bg-[#3e95fb] text-white px-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Clear Search Results
              </button>
            </Link>
          </div>
        )}
        {!isFiltered && (
          <div className="text-center">
            <Link to={"/blogs"}>
              <button className="bg-[#3e95fb] text-white px-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Clear Filter
              </button>
            </Link>
          </div>
        )}
        {isFiltered ? (
          <h1 className="blogs-heading">
            {executedQuery
              ? `Search Results for "${executedQuery}"`
              : "Search Results"}
          </h1>
        ) : (
          <h1 className="blogs-heading">Blogs in {category}</h1>
        )}
        {currentPosts.length > 0 ? (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
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
            ))}
          </section>
        ) : (
          <div>
            <NoPostFound />
          </div>
        )}
      </div>
      {/* Pagination */}

      {/* {isFiltered && ( */}
      <div className="flex justify-center space-x-1 dark:text-gray-800 py-4">
        <button
          title="previous"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            type="button"
            title={`Page ${index + 1}`}
            className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 ${
              currentPage === index + 1
                ? "text-[#3e95fb] border-[#3e95fb]"
                : "dark:border-gray-100"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          title="next"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      {/* )} */}
      {/* {!isFiltered && (
        <div className="text-center py-7">
          <Link to={"/blogs"}>
            <button className="bg-[#3e95fb] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Go Back
            </button>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default CategoryPosts;
