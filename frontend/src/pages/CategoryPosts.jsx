// import React, { useState } from "react";
// import { DummyPosts } from "../data/Data";
// import PostItem from "../components/PostItem";

// const CategoryPosts = () => {
//   const [posts, setPosts] = useState(DummyPosts);
//   return (
//     <div>
//       {posts.length > 0 ? (
//         <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <PostItem
//               id={post.id}
//               key={post.id}
//               description={post.desc}
//               thumbnail={post.thumbnail}
//               category={post.category}
//               title={post.title}
//               authorID={post.authorID}
//             />
//           ))}
//         </section>
//       ) : (
//         <h2 className="flex justify-center items-center font-bold text-2xl my-32">
//           No posts found
//         </h2>
//       )}
//     </div>
//   );
// };

// export default CategoryPosts;

import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const fetchedPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/categories/${category}`
        );
        setPosts(response?.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchedPosts();
  }, [category]);

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

export default CategoryPosts;
