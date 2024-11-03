import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";
import axios from "axios";
import { CiTrash } from "react-icons/ci";

const DeletePost = ({ postId: id }) => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const token = currentUser?.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate(`/blogs`);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Couldn't delete post");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {" "}
      <Link onClick={() => removePost(id)}>
        <button className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200">
          <CiTrash className="w-5 h-5 mr-1" />
          Delete
        </button>
      </Link>
    </div>
  );
};

export default DeletePost;
