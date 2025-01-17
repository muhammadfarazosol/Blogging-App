import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import axios from "axios";

const BlogReaction = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);
  const { currentUser } = useContext(UserContext);

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const reactionResponse = await axios.get(
          `${API_BASE_URL}/reactions/${id}`,
          {
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          }
        );
        setLikes(reactionResponse.data.likes);
        setDislikes(reactionResponse.data.dislikes);
        setUserReaction(reactionResponse.data.userReaction);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReaction();
  }, [id, currentUser, likes, dislikes]);

  const handleReaction = async (reactionType) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/reactions/${id}`,
        { reaction: reactionType },
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );

      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setUserReaction(reactionType);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center space-x-6 bg-[#c9dcf3] px-4 py-1 rounded-full shadow-md">
      <p className="text-gray-700 font-medium">Do you like this blog?</p>
      <button
        class={`py-1.5 px-3 ${
          userReaction === "like" ? "bg-green-600 text-white" : ""
        } hover:scale-105 hover:shadow text-center border border-black rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2`}
        onClick={() => handleReaction("like")}
      >
        <BsHandThumbsUp />
        <span className="text-black">{likes}</span>
      </button>

      <button
        class={`py-1.5 px-3 ${
          userReaction === "dislike" ? "bg-red-500 text-white" : ""
        } hover:scale-105 hover:shadow text-center border border-black rounded-md h-8 text-sm flex items-center gap-1 lg:gap-2`}
        onClick={() => handleReaction("dislike")}
      >
        <BsHandThumbsDown />
        <span className="text-black">{dislikes}</span>
      </button>
    </div>
  );
};

export default BlogReaction;
