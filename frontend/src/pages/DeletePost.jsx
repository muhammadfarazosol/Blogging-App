import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const DeletePost = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);
  return <div>Post has been deleted</div>;
};

export default DeletePost;
