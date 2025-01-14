import { useEffect, useRef, useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Filter by category", path: "" },
  { name: "C++", path: "/posts/categories/Cpp" },
  { name: "Javascript", path: "/posts/categories/Javascript" },
  { name: "Python", path: "/posts/categories/Python" },
  { name: "Ruby", path: "/posts/categories/Ruby" },
  { name: "Node JS", path: "/posts/categories/Nodejs" },
  { name: "Java", path: "/posts/categories/Java" },
  { name: "Typescript", path: "/posts/categories/Typescript" },
  { name: "PHP", path: "/posts/categories/PHP" },
  // { name: "Ruby", path: "/posts/categories/Ruby" },
];

export default function Filter({ onFilter, onQueryChange }) {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (category.path) {
      navigate(category.path);
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/suggestions?title=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    fetchSuggestions(query);
  };

  const fetchPosts = async (query, isSuggestion = false) => {
    if (!query) {
      onFilter([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts/search?title=${query}`
      );
      onFilter(response.data);
      setSuggestions([]);
      setSearchInput("");
      if (onQueryChange) {
        onQueryChange(isSuggestion ? null : query); // Pass `null` for suggestions
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleSearch = () => {
    fetchPosts(searchInput);
    setSearchInput("");
    if (onQueryChange) {
      onQueryChange(searchInput);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-48" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white py-3 px-4 rounded-md flex justify-between items-center text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {selectedCategory.name}
            <FaChevronDown
              className={`text-gray-400 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-md shadow-lg z-10 overflow-hidden">
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => handleCategorySelect(category)}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-grow flex relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search for anything..."
            className="flex-grow px-4 py-3 bg-white text-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="bg-[#3e95fb] px-6 rounded-r-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <FaSearch className="text-white" />
          </button>
          {suggestions.length > 0 ? (
            <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg z-10">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion._id}
                  onClick={() => fetchPosts(suggestion?.title, true)}
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                >
                  {suggestion?.title}
                </div>
              ))}
            </div>
          ) : (
            searchInput && (
              <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg z-10">
                <div className="px-4 py-2 text-gray-500">
                  No suggestions found
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaChevronDown } from "react-icons/fa";

// const categories = [
//   { name: "Filter", path: "" },
//   { name: "C++", path: "/posts/categories/Cpp" },
//   { name: "Javascript", path: "/posts/categories/Javascript" },
//   { name: "Python", path: "/posts/categories/Python" },
//   { name: "Ruby", path: "/posts/categories/Ruby" },
//   { name: "Node JS", path: "/posts/categories/Nodejs" },
//   { name: "Java", path: "/posts/categories/Java" },
//   { name: "Typescript", path: "/posts/categories/Typescript" },
//   { name: "PHP", path: "/posts/categories/PHP" },
//   { name: "Ruby", path: "/posts/categories/Ruby" },
// ];

// export default function BlogFilter() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const navigate = useNavigate();

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsOpen(false);
//     if (category.path) {
//       navigate(category.path);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 rounded-lg">
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative w-full sm:w-48">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-full bg-white py-3 px-4 rounded-md flex justify-between items-center text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             {selectedCategory.name}
//             <FaChevronDown
//               className={`text-gray-400 transition-transform duration-300 ${
//                 isOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           {isOpen && (
//             <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-md shadow-lg z-10 overflow-hidden">
//               <div className="max-h-60 overflow-y-auto custom-scrollbar">
//                 {categories.map((category) => (
//                   <button
//                     key={category.name}
//                     onClick={() => handleCategorySelect(category)}
//                     className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex-grow flex">
//           <input
//             type="text"
//             placeholder="Search for anything..."
//             className="flex-grow px-4 py-3 bg-white text-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
//           />
//           <button className="bg-[#3e95fb] px-6 rounded-r-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-900">
//             <FaSearch className="text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// working search integrated posts
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaChevronDown } from "react-icons/fa";
// import axios from "axios";

// const categories = [
//   { name: "Filter", path: "" },
//   { name: "C++", path: "/posts/categories/Cpp" },
//   { name: "Javascript", path: "/posts/categories/Javascript" },
//   { name: "Python", path: "/posts/categories/Python" },
//   { name: "Ruby", path: "/posts/categories/Ruby" },
//   { name: "Node JS", path: "/posts/categories/Nodejs" },
//   { name: "Java", path: "/posts/categories/Java" },
//   { name: "Typescript", path: "/posts/categories/Typescript" },
//   { name: "PHP", path: "/posts/categories/PHP" },
//   { name: "Ruby", path: "/posts/categories/Ruby" },
// ];

// export default function BlogFilter() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [searchInput, setSearchInput] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const navigate = useNavigate();

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsOpen(false);
//     if (category.path) {
//       navigate(category.path);
//     }
//   };

//   const fetchSuggestions = async (query) => {
//     if (!query) return setSuggestions([]);
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/posts/suggestions`,
//         {
//           params: { title: query },
//         }
//       );
//       setSuggestions(response.data);
//     } catch (error) {
//       console.error("Error fetching suggestions", error);
//     }
//   };

//   const fetchPosts = async (query) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/posts/search`,
//         {
//           params: { title: query },
//         }
//       );
//       setPosts(response.data);
//       setSuggestions([]);
//     } catch (error) {
//       console.error("Error fetching posts", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const query = e.target.value;
//     setSearchInput(query);
//     fetchSuggestions(query);
//   };

//   const handleSuggestionClick = (title) => {
//     setSearchInput(title);
//     setSuggestions([]);
//     fetchPosts(title);
//   };

//   const handleSearch = () => {
//     fetchPosts(searchInput);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 rounded-lg">
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative w-full sm:w-48">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-full bg-white py-3 px-4 rounded-md flex justify-between items-center text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             {selectedCategory.name}
//             <FaChevronDown
//               className={`text-gray-400 transition-transform duration-300 ${
//                 isOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//           {isOpen && (
//             <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-md shadow-lg z-10 overflow-hidden">
//               <div className="max-h-60 overflow-y-auto custom-scrollbar">
//                 {categories.map((category) => (
//                   <button
//                     key={category.name}
//                     onClick={() => handleCategorySelect(category)}
//                     className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex-grow flex relative">
//           <input
//             type="text"
//             value={searchInput}
//             onChange={handleInputChange}
//             placeholder="Search for anything..."
//             className="flex-grow px-4 py-3 bg-white text-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-[#3e95fb] px-6 rounded-r-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
//           >
//             <FaSearch className="text-white" />
//           </button>
//           {suggestions.length > 0 && (
//             <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg z-10">
//               {suggestions.map((suggestion) => (
//                 <div
//                   key={suggestion._id}
//                   onClick={() => handleSuggestionClick(suggestion?.title)}
//                   className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
//                 >
//                   {suggestion?.title}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Render search results */}
//       <div className="mt-6">
//         {posts.length > 0 && (
//           <div>
//             <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
//             <ul>
//               {posts.map((post) => (
//                 <li key={post._id} className="mb-4">
//                   <h3 className="text-xl font-bold">{post.title}</h3>
//                   <p className="text-gray-600">{post.description}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// old code
// import { Link } from "react-router-dom";

// const Filter = () => {
//   return (
//     <div>
//       <ul className="flex flex-row justify-around space-x-3 my-3">
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/cpp">C++</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/javascript">Javascript</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/python">Python</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/Ruby">Ruby</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/nodejs">Node JS</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/java">Java</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/typescript">Typescript</Link>
//         </li>
//         <li className="border-2 border-black hover:bg-gray-200 hover:text-black px-4 text-white bg-gray-800">
//           <Link to="/post/categories/php">PHP</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Filter;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaSearch, FaChevronDown } from "react-icons/fa";

// const categories = [
//   { name: "Please Select", path: "" },
//   { name: "C++", path: "/post/categories/cpp" },
//   { name: "Javascript", path: "/post/categories/javascript" },
//   { name: "Python", path: "/post/categories/python" },
//   { name: "Ruby", path: "/post/categories/Ruby" },
//   { name: "Node JS", path: "/post/categories/nodejs" },
//   { name: "Java", path: "/post/categories/java" },
//   { name: "Typescript", path: "/post/categories/typescript" },
//   { name: "PHP", path: "/post/categories/php" },
// ];

// export default function BlogFilter() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsOpen(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-slate-900 text-black">
//       <div className="flex mb-4 mt-6">
//         <div className="relative w-48 mr-2">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="w-full bg-white py-2 px-4 rounded-l-md flex justify-between items-center"
//           >
//             {selectedCategory.name} <FaChevronDown className="text-black" />
//           </button>
//           {isOpen && (
//             <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg z-10">
//               {categories.map((category) => (
//                 <button
//                   key={category.name}
//                   onClick={() => handleCategorySelect(category)}
//                   className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="flex-grow flex">
//           <input
//             type="text"
//             placeholder="Search in blogs..."
//             className="flex-grow px-4 py-2 bg-white text-black rounded-l-md focus:outline-none"
//           />
//           <button className="bg-white px-4 rounded-r-md hover:bg-gray-100 transition-colors">
//             <FaSearch className="text-black" />
//           </button>
//         </div>
//       </div>

//       {selectedCategory.path && (
//         <Link
//           to={selectedCategory.path}
//           className="mt-2 inline-block bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
//         >
//           View {selectedCategory.name} Blogs
//         </Link>
//       )}
//     </div>
//   );
// }

// <div className="max-w-4xl mx-auto p-4 text-black">
//   <div className="flex my-4">
//     <div className="relative w-48 mr-2">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full bg-white py-2 px-4 rounded-l-md flex justify-between items-center"
//       >
//         {selectedCategory.name} <FaChevronDown className="text-black" />
//       </button>
//       {isOpen && (
//         <div className="absolute top-full left-0 w-full bg-white mt-1 rounded-md shadow-lg z-10">
//           {categories.map((category) => (
//             <button
//               key={category.name}
//               onClick={() => handleCategorySelect(category)}
//               className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//     <div className="flex-grow flex">
//       <input
//         type="text"
//         placeholder="Search"
//         className="flex-grow px-4 py-2 bg-white text-black rounded-l-md focus:outline-none"
//       />
//       <button className="bg-white px-4 rounded-r-md hover:bg-gray-100 transition-colors">
//         <FaSearch className="text-black" />
//       </button>
//     </div>
//   </div>
// </div>
