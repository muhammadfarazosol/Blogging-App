import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link to={`/posts/users/anything`}>
      <div className="flex items-center">
        {/* author image */}
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={`http://localhost:5000/uploads/${author?.avatar}`}
          alt="Profile Image"
        />
        <div className="ml-4">
          {/* author name */}
          <strong className="block font-medium text-gray-700 text-xs">
            By: {author?.name}
          </strong>
          {/* blog time posted */}
          <span className="text-xs text-gray-400">
            <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostAuthor;
