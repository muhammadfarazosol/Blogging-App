import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const EditPost = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);
  return <div>EditPost</div>;
};

export default EditPost;
