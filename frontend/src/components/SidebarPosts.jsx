import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import demoImage from "../assests/assets/images/background.jpg";
import SkeletonLoader from "./SkeletonLoader";

const SidebarPosts = ({ category, currentPostId }) => {
  const [posts, setPosts] = useState([]);
  const [fallbackPosts, setFallbackPosts] = useState([]);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/categories/${category}`
        );
        const filteredPosts = response.data
          .filter((post) => post._id !== currentPostId)
          .slice(0, 3);

        setPosts(filteredPosts);
        setIsCategoryEmpty(filteredPosts.length === 0);
      } catch (error) {
        console.error("Error fetching category posts:", error);
        setIsCategoryEmpty(true);
      }
    };

    const fetchFallbackPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts`);
        const otherPosts = response.data
          .filter((post) => post._id !== currentPostId)
          .slice(0, 3);
        setFallbackPosts(otherPosts);
      } catch (error) {
        console.error("Error fetching fallback posts:", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      if (category) {
        await fetchPosts();
      }
      await fetchFallbackPosts();
      setIsLoading(false);
    };

    fetchData();
  }, [category, currentPostId]);

  return (
    <>
      {isLoading ? (
        <div>
          <SkeletonLoader />
        </div>
      ) : isCategoryEmpty ? (
        <>
          <h3 className="mb-4 text-sm font-semibold text-gray-600">
            You may also like
          </h3>
          {fallbackPosts.map((post) => (
            <div
              key={post._id}
              className="max-w-sm rounded-lg shadow dark:bg-gray-900 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg w-full h-full min-h-24 object-fill"
                src={`http://localhost:5000/uploads/${post.thumbnail}`}
                alt={post.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = demoImage;
                }}
              />
              <div className="p-2">
                <Link to={`/posts/${post._id}`}>
                  <h5 className="mb-2 text-[16px] font-bold tracking-tight dark:text-white">
                    {post.title}
                  </h5>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className="mb-4 text-sm font-semibold text-gray-600">
            Related Blogs on {category}
          </h3>
          {posts.map((post) => (
            <div
              key={post._id}
              className="max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg w-full h-full min-h-24 object-fill"
                src={`http://localhost:5000/uploads/${post.thumbnail}`}
                alt={post.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = demoImage;
                }}
              />
              <div className="p-2">
                <Link to={`/posts/${post._id}`}>
                  <h5 className="mb-2 text-[16px] font-bold tracking-tight dark:text-white">
                    {post.title}
                  </h5>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SidebarPosts;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import demoImage from "../assests/assets/images/background.jpg";

// const SidebarPosts = ({ category, currentPostId }) => {
//   const [posts, setPosts] = useState([]);
//   const [fallbackPosts, setFallbackPosts] = useState([]);
//   const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/posts/categories/${category}`
//         );
//         const filteredPosts = response.data
//           .filter((post) => post._id !== currentPostId)
//           .slice(0, 3);

//         setPosts(filteredPosts);
//         setIsCategoryEmpty(filteredPosts.length === 0);
//       } catch (error) {
//         console.error("Error fetching category posts:", error);
//         setIsCategoryEmpty(true);
//       }
//     };

//     const fetchFallbackPosts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/posts`);
//         const otherPosts = response.data
//           .filter((post) => post._id !== currentPostId)
//           .slice(0, 3);
//         setFallbackPosts(otherPosts);
//       } catch (error) {
//         console.error("Error fetching fallback posts:", error);
//       }
//     };

//     if (category) {
//       fetchPosts();
//       fetchFallbackPosts();
//     }
//   }, [category, currentPostId]);

//   return (
//     <>
//       {isCategoryEmpty ? (
//         <>
//           <h3 className="mb-4 text-sm font-semibold text-gray-600">
//             You may also like
//           </h3>
//           {fallbackPosts.map((post) => (
//             <div
//               key={post._id}
//               className="max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//             >
//               <img
//                 className="rounded-t-lg"
//                 src={`http://localhost:5000/uploads/${post.thumbnail}`}
//                 alt={post.title}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = demoImage;
//                 }}
//               />
//               <div className="p-2">
//                 <Link to={`/posts/${post._id}`}>
//                   <h5 className="mb-2 text-[16px] font-bold tracking-tight dark:text-white">
//                     {post.title}
//                   </h5>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <>
//           <h3 className="mb-4 text-sm font-semibold text-gray-600">
//             Related Blogs on {category}
//           </h3>
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="max-w-sm rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//             >
//               <img
//                 className="rounded-t-lg"
//                 src={`http://localhost:5000/uploads/${post.thumbnail}`}
//                 alt={post.title}
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = demoImage;
//                 }}
//               />
//               <div className="p-2">
//                 <Link to={`/posts/${post._id}`}>
//                   <h5 className="mb-2 text-[16px] font-bold tracking-tight dark:text-white">
//                     {post.title}
//                   </h5>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </>
//       )}
//     </>
//   );
// };

// export default SidebarPosts;
