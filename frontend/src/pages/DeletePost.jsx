import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";
import DeletePostModal from "../modals/PostDelete";

const DeletePost = ({ postId: id, variant = "default" }) => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        toast.success("Blog post deleted successfully");
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate(`/myposts/${currentUser.id}`);
        }
      }
    } catch (error) {
      toast.error(error.message || "Couldn't delete post");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    removePost();
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const buttonStyles = {
    default:
      "flex items-center text-red-500 hover:text-red-700 transition-colors duration-200",
    alternative:
      "flex items-center justify-center w-full px-3 py-1 text-sm font-normal leading-6 capitalize duration-100 transform border-[1px] rounded-lg cursor-pointer border-red-500 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-red-500 focus:outline-none border-text  hover:shadow-lg hover:-translate-y-1",
  };

  return (
    <div>
      <button onClick={handleDelete} className={buttonStyles[variant]}>
        <CiTrash className="w-5 h-5 mr-1" />
        Delete
      </button>

      <DeletePostModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DeletePost;
