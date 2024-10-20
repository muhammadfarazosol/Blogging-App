// import { useState, useEffect } from "react";
// import PostItem from "./PostItem";

// const FeaturedPosts = ({ fetchPosts }) => {
//   const [featuredPosts, setFeaturedPosts] = useState([]);

//   useEffect(() => {
//     // Fetch posts from backend (you should replace `fetchPosts` with your API call)
//     const getPosts = async () => {
//       try {
//         const posts = await fetchPosts(); // Fetching the posts from backend
//         const randomPosts = getRandomPostsForTheDay(posts, 3);
//         setFeaturedPosts(randomPosts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     getPosts();
//   }, []);

//   // Helper function to get the same random posts for the day
//   const getRandomPostsForTheDay = (posts, count) => {
//     const today = new Date().toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)
//     const seed = today
//       .split("-")
//       .reduce((acc, curr) => acc + parseInt(curr), 0); // Generate a seed from the date
//     const randomIndices = getUniqueRandomIndices(posts.length, count, seed);
//     return randomIndices.map((index) => posts[index]);
//   };

//   // Helper function to get unique random indices based on seed
//   const getUniqueRandomIndices = (max, count, seed) => {
//     let indices = [];
//     let random = seed;
//     while (indices.length < count) {
//       random = (random * 9301 + 49297) % 233280; // Simple random number generator with seed
//       const index = Math.floor((random / 233280) * max);
//       if (!indices.includes(index)) {
//         indices.push(index);
//       }
//     }
//     return indices;
//   };

//   return (
//     <div className="bg-slate-900">
//       {featuredPosts.length > 0 ? (
//         <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-slate-900">
//           {featuredPosts.map((post) => (
//             <PostItem
//               id={post.id} // Using _id from your data
//               key={post.id}
//               description={post.description} // Using description
//               thumbnail={post.thumbnail} // Using thumbnail
//               category={post.category} // Using category
//               title={post.title} // Using title
//               authorID={post.authorID} // Using creator as authorID
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

// export default FeaturedPosts;

import { useState } from "react";
import PostItem from "./PostItem";
import { DummyPosts } from "../data/Data";

const RecentPosts = () => {
  const [posts, setPosts] = useState(DummyPosts);
  const featuredPosts = posts.slice(0, 3);
  return (
    <div className="bg-slate-900">
      {featuredPosts.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-slate-900">
          {featuredPosts.map((post) => (
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

export default RecentPosts;
