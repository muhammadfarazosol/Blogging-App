// import { Link } from "react-router-dom";
// import PostAuthor from "./PostAuthor";

// const PostItem = ({
//   id,
//   category,
//   title,
//   description,
//   authorID,
//   thumbnail,
// }) => {
//   const shortDescription =
//     description.length > 70 ? description.substr(0, 70) + "..." : description;
//   const shortTitle = title.length > 25 ? title.substr(0, 25) + "..." : title;
//   return (
//     <div className=" px-5 py-10">
//       <article className="mx-auto flex max-w-md flex-col rounded-2xl bg-white shadow overflow-hidden">
//         {/* image div */}
//         <div className="w-full">
//           <img
//             className="w-full h-[220px] object-fit"
//             src={thumbnail}
//             alt={title}
//           />
//         </div>
//         <div className="p-4 sm:p-6">
//           {/* title */}
//           <Link to={`/posts/${id}`}>
//             <h3 className="mb-4 block text-2xl font-medium text-gray-700 hover:underline">
//               {shortTitle}
//             </h3>
//           </Link>
//           <p className="mb-6 text-gray-500">{shortDescription}</p>
//           <div className="flex items-center justify-between">
//             {/* Author pic and name and time div */}
//             <PostAuthor />
//             {/* Category div */}
//             <button className="ml-4 px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//               <Link to={`/posts/categories/${category}`}>{category}</Link>
//             </button>
//           </div>
//         </div>
//       </article>
//     </div>
//   );
// };

// export default PostItem;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  id,
  category,
  title,
  description,
  authorID,
  thumbnail,
}) => {
  const shortDescription =
    description.length > 70 ? description.substr(0, 70) + "..." : description;
  const shortTitle = title.length > 25 ? title.substr(0, 25) + "..." : title;

  return (
    <motion.div
      className="px-8 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.article
        className="mx-auto flex max-w-md flex-col rounded-2xl bg-white shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* image div */}
        <div className="w-full h-[220px] overflow-hidden">
          <motion.img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            src={thumbnail}
            alt={title}
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <div className="p-6">
          {/* category */}
          <Link to={`/posts/categories/${category}`}>
            <span className="inline-block mb-2 text-xs font-semibold tracking-wide text-primary uppercase">
              {category}
            </span>
          </Link>
          {/* title */}
          <Link to={`/posts/${id}`}>
            <h3 className="mb-3 text-2xl font-bold leading-tight text-gray-900 hover:text-primary transition-colors duration-200">
              {shortTitle}
            </h3>
          </Link>
          <p className="mb-4 text-gray-600">{shortDescription}</p>
          <div className="flex items-center justify-between">
            {/* Author pic and name and time div */}
            <PostAuthor authorID={authorID} />
            {/* Read More button */}
            <Link to={`/posts/${id}`}>
              <motion.button
                className="px-3 py-2 text-xs font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

export default PostItem;
