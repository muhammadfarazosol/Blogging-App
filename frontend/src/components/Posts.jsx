import { useState } from "react";
import PostItem from "./PostItem";
import { DummyPosts } from "../data/Data";

const Posts = () => {
  const [posts, setPosts] = useState(DummyPosts);
  return (
    <div className="bg-slate-900">
      {posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-slate-900">
          {posts.map((post) => (
            <PostItem
              id={post.id}
              key={post.id}
              description={post.desc}
              thumbnail={post.thumbnail}
              category={post.category}
              title={post.title}
              authorID={post.authorID}
            />
          ))}
        </section>
      ) : (
        <h2 className="flex justify-center items-center font-bold text-2xl my-32">
          No posts found
        </h2>
      )}
    </div>
  );
};

export default Posts;
