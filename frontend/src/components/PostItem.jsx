import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostAuthor from "./PostAuthor";
import axios from "axios";
import { BsHandThumbsUpFill } from "react-icons/bs";

const PostItem = ({
  id,
  category,
  title,
  description,
  authorID,
  thumbnail,
  createdAt,
}) => {
  const shortDescription =
    description.length > 70 ? description.substr(0, 60) + "..." : description;
  const shortTitle = title.length > 20 ? title.substr(0, 20) + "..." : title;
  const date = new Date(createdAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const [likes, setLikes] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/reactions/${id}/likes`
        );
        setLikes(response.data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [id]);

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
          <Link to={`/posts/${id}`}>
            <motion.img
              className="w-full h-full object-fill transition-transform duration-300 ease-in-out hover:scale-110"
              src={`${APP_ASSESTS_URL}/uploads/${thumbnail}`}
              alt={title}
              whileHover={{ scale: 1.1 }}
            />
          </Link>
        </div>
        <div className="p-6">
          <div className="flex justify-between">
            {" "}
            <p className="inline-block text-xs font-semibold tracking-wide text-gray-500">
              {formattedDate}
            </p>
            <p className="flex items-center text-sm gap-x-1 font-semibold tracking-wide text-gray-500">
              <BsHandThumbsUpFill />
              {likes}
            </p>
          </div>
          {/* category */}
          <Link to={`/posts/categories/${category}`}>
            <span className="inline-block mb-2 text-xs font-semibold tracking-wide text-primary">
              {category}
            </span>
          </Link>
          {/* title */}
          <Link to={`/posts/${id}`}>
            <h3
              className="mb-3 text-2xl font-bold leading-tight text-gray-900 hover:text-primary transition-colors duration-200"
              title={title}
            >
              {shortTitle}
            </h3>
          </Link>
          <p
            className="mb-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />

          <div className="flex items-center justify-between">
            {/* Author pic and name and time div */}
            <PostAuthor authorID={authorID} createdAt={createdAt} />
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
