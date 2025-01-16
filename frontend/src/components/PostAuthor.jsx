import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ProfileImage from "../assests/ProfileImage.svg";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <Link to={`/posts/users/${authorID}`}>
      <div className="flex items-center">
        {/* author image */}
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={
            author?.avatar
              ? `${APP_ASSESTS_URL}/uploads/${author?.avatar}`
              : ProfileImage
          }
          alt="Profile Image"
        />
        <div className="ml-4">
          {/* author name */}
          <strong className="block font-medium text-gray-700 text-xs">
            {author?.name}
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
