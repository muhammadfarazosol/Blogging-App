import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assests/avatars/osolLogo.png";

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/anything`}>
      <div className="flex items-center">
        {/* author image */}
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={Avatar}
          alt="Profile Image"
        />
        <div className="ml-4">
          {/* author name */}
          <strong className="block font-medium text-gray-700 text-sm">
            By: Johanson Levinsiki
          </strong>
          {/* blog time posted */}
          <span className="text-sm text-gray-400">Just now</span>
        </div>
      </div>
    </Link>
  );
};

export default PostAuthor;
