import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";

const DeletePost = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, []);
  return (
    <div>
      {" "}
      {/* <Link to={`/posts/werwer/delete`}> */}
      <Link>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
          <MdDeleteSweep className="w-4 h-4 mr-2" />
          Delete
        </button>
      </Link>
    </div>
  );
};

export default DeletePost;
