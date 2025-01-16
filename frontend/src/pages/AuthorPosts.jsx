import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import NoPostFound from "../components/NoPostFound";
import ProfileImage from "../assests/ProfileImage.svg";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const APP_ASSESTS_URL = import.meta.env.VITE_APP_ASSESTS_URL;

  useEffect(() => {
    const fetchAuthorAndPosts = async () => {
      setIsLoading(true);
      try {
        // Fetch author details
        const authorResponse = await axios.get(`${API_BASE_URL}/users/${id}`);
        setAuthor(authorResponse?.data);

        // Fetch posts by the author
        const postsResponse = await axios.get(
          `${API_BASE_URL}/posts/users/${id}`
        );
        setPosts(postsResponse?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchAuthorAndPosts();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#c9dcf3] pt-32">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#c9dcf3] pt-4">
      <h2 className="blogs-heading">Insights from our author</h2>

      {/* Author Details */}
      {author && (
        <>
          <div className="flex flex-col md:flex-row items-center bg-[#e1ebfa] rounded-lg shadow-lg p-6 md:p-10 mx-8">
            {/* Profile Detail Section */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{author.name}</h1>
              <p className="text-gray-600">{author.headline}</p>
              <hr className="my-3 border-gray-400" />
              <p className="text-gray-500 mb-2">{author.bio}</p>
            </div>
            {/* Profile Image Section */}
            <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-10">
              <img
                src={
                  author.avatar
                    ? `${APP_ASSESTS_URL}/uploads/${author.avatar}`
                    : ProfileImage
                }
                alt={author.name}
                className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
              />
              <p className="text-gray-400 text-sm text-center pt-3">Author</p>
              <p className="text-gray-400 text-sm py-2">
                Member since: {new Date(author.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Posts Section */}

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
      {/* <div className="text-center py-10">
        <Link to={"/authors"}>
          <button className="bg-[#3e95fb] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Go Back
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default AuthorPosts;
