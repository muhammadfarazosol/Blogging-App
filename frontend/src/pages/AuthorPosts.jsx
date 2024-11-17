import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import NoPostFound from "../components/NoPostFound";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/users/${id}`
        );
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#c9dcf3] pt-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#c9dcf3]">
      <h2 className="blogs-heading">Insights from Our Featured Writers</h2>
      <div className="text-center mb-4">
        <Link to={"/authors"}>
          <button className="bg-[#3e95fb] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Go Back
          </button>
        </Link>
      </div>
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostItem
              id={post._id}
              key={post._id}
              description={post.description}
              thumbnail={post.thumbnail}
              category={post.category}
              title={post.title}
              authorID={post.creator}
              createdAt={post.createdAt}
            />
          ))}
        </section>
      ) : (
        <div>
          <NoPostFound />
        </div>
      )}
    </div>
  );
};

export default AuthorPosts;
