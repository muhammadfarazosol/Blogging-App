import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // setCurrentUser(null);
  // navigate("/auth");
  useEffect(() => {
    // Clear user data and redirect to login
    setCurrentUser(null);
    navigate("/auth"); // Navigating after the component has rendered
  }, [navigate, setCurrentUser]);
  // return <></>;
  return null;
};

export default Logout;
