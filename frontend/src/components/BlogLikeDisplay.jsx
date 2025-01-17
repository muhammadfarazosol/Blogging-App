import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsHandThumbsUpFill } from "react-icons/bs";
import axios from "axios";

const BlogLikeDisplay = () => {
  const { id } = useParams();
  const [likes, setLikes] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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
    <div className={`${likes === 0 && "hidden"} border-t pt-4`}>
      <p className="text-gray-700 text-sm font-bold flex items-center gap-x-2">
        {" "}
        Loved by {likes} {likes === 1 ? "reader" : "readers"} ❤️
      </p>
    </div>
  );
};

export default BlogLikeDisplay;
