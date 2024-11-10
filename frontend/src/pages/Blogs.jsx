// import { useState, useEffect } from "react";
// import Posts from "../components/Posts";
// import Filter from "../components/Filter";
// import axios from "axios";

// const Blogs = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [isFiltered, setIsFiltered] = useState(false);

//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/posts");
//         setAllPosts(response.data);
//         setFilteredPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching all posts:", error);
//       }
//     };
//     fetchAllPosts();
//   }, []);

//   const handleFilteredPosts = (posts) => {
//     if (posts.length) {
//       setFilteredPosts(posts);
//       setIsFiltered(true);
//     } else {
//       setFilteredPosts(allPosts);
//       setIsFiltered(false);
//     }
//   };

//   const handleViewAll = () => {
//     setFilteredPosts(allPosts);
//     setIsFiltered(false);
//   };

//   return (
//     <div className="bg-[#c9dcf3]">
//       <Filter onFilter={handleFilteredPosts} />{" "}
//       {isFiltered ? (
//         <h1 className="blogs-heading">Search Results</h1>
//       ) : (
//         <h1 className="blogs-heading">Explore Our Blogs</h1>
//       )}
//       {isFiltered && (
//         <div className="text-center mt-4 mb-4">
//           <button
//             onClick={handleViewAll}
//             className="bg-[#3e95fb] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             View All Posts
//           </button>
//         </div>
//       )}
//       <Posts posts={filteredPosts} />
//       {/* Pagination  */}
//       <div className="flex justify-center space-x-1 dark:text-gray-800">
//         <button
//           title="previous"
//           type="button"
//           className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="w-4"
//           >
//             <polyline points="15 18 9 12 15 6"></polyline>
//           </svg>
//         </button>
//         <button
//           type="button"
//           title="Page 1"
//           className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-50 dark:text-violet-600 dark:border-violet-600"
//         >
//           1
//         </button>
//         <button
//           type="button"
//           className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100"
//           title="Page 2"
//         >
//           2
//         </button>
//         <button
//           type="button"
//           className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100"
//           title="Page 3"
//         >
//           3
//         </button>
//         <button
//           type="button"
//           className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-50 dark:border-gray-100"
//           title="Page 4"
//         >
//           4
//         </button>
//         <button
//           title="next"
//           type="button"
//           className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-50 dark:border-gray-100"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="w-4"
//           >
//             <polyline points="9 18 15 12 9 6"></polyline>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Blogs;

import { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Filter from "../components/Filter";
import axios from "axios";

export default function Blogs() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  const handleViewAll = () => {
    setFilteredPosts(allPosts);
    setIsFiltered(false);
    setCurrentPage(1);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="bg-[#c9dcf3]">
      <Filter onFilter={handleFilteredPosts} />
      {isFiltered ? (
        <h1 className="blogs-heading">Search Results</h1>
      ) : (
        <h1 className="blogs-heading">Explore Our Blogs</h1>
      )}
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
      <Posts posts={currentPosts} />
      {/* Pagination */}
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
    </div>
  );
}
