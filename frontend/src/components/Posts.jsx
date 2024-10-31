import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts`);
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, []);

  return (
    <div className="bg-slate-900">
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-slate-900">
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
        <h2 className="flex justify-center items-center font-bold text-2xl my-32 text-white">
          No posts found
        </h2>
      )}
    </div>
  );
};

export default Posts;
