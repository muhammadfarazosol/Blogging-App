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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const categories = [
  { name: "Filter", path: "" },
  { name: "C++", path: "/posts/categories/Cpp" },
  { name: "Javascript", path: "/posts/categories/Javascript" },
  { name: "Python", path: "/posts/categories/Python" },
  { name: "Ruby", path: "/posts/categories/Ruby" },
  { name: "Node JS", path: "/posts/categories/Nodejs" },
  { name: "Java", path: "/posts/categories/Java" },
  { name: "Typescript", path: "/posts/categories/Typescript" },
  { name: "PHP", path: "/posts/categories/PHP" },
  { name: "Ruby", path: "/posts/categories/Ruby" },
];

export default function BlogFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    if (category.path) {
      navigate(category.path);
    }
  };

  return (
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
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-48">
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
        <div className="flex-grow flex">
          <input
            type="text"
            placeholder="Search for anything..."
            className="flex-grow px-4 py-3 bg-white text-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          />
          <button className="bg-[#3e95fb] px-6 rounded-r-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-900">
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
