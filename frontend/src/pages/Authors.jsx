import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import ProfileImage from "../assests/ProfileImage.svg";
import Loader from "../components/Loader";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/users`);
        setAuthors(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getAuthors();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#c9dcf3] pt-32">
        <Loader />
      </div>
    );
  }

  return (
    // <div className="bg-[#c9dcf3]">
    //   {authors.length > 0 ? (
    //     <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    //       {authors.map(({ _id: id, avatar, name, posts }) => {
    //         return (
    //           <div className="w-full my-10">
    //             <Link key={id} to={`/posts/users/${id}`}>
    //               <div>
    //                 <motion.div
    //                   className="flex flex-col justify-center max-w-xs mx-auto bg-gradient-to-r from-purple-50 to-indigo-100 shadow-xl rounded-xl p-5"
    //                   initial={{ opacity: 0, y: 20 }}
    //                   animate={{ opacity: 1, y: 0 }}
    //                   transition={{ duration: 0.5 }}
    //                   whileHover={{ scale: 1.05 }}
    //                 >
    //                   <motion.div
    //                     initial={{ scale: 0 }}
    //                     animate={{ scale: 1 }}
    //                     transition={{
    //                       delay: 0.2,
    //                       type: "spring",
    //                       stiffness: 200,
    //                     }}
    //                   >
    //                     <img
    //                       className="w-24 h-24 mx-auto shadow-xl rounded-full object-cover border-4 border-slate-800"
    //                       src={`http://localhost:5000/uploads/${avatar}`}
    //                       alt={`${name}'s profile picture`}
    //                     />
    //                   </motion.div>
    //                   <div className="text-center mt-5">
    //                     <motion.p
    //                       className="text-xl sm:text-2xl font-bold text-black mb-2"
    //                       initial={{ opacity: 0 }}
    //                       animate={{ opacity: 1 }}
    //                       transition={{ delay: 0.3 }}
    //                     >
    //                       {name}
    //                     </motion.p>
    //                     <motion.p
    //                       className="text-xs sm:text-base text-gray-700 pt-2 pb-4 px-5 w-auto inline-block border-b-2 border-gray-600"
    //                       initial={{ opacity: 0 }}
    //                       animate={{ opacity: 1 }}
    //                       transition={{ delay: 0.4 }}
    //                     >
    //                       Posts: {posts}
    //                     </motion.p>
    //                   </div>
    //                 </motion.div>
    //               </div>
    //             </Link>
    //           </div>
    //         );
    //       })}
    //     </section>
    //   ) : (
    //     <h2>No users found</h2>
    //   )}
    // </div>

    <div className="bg-[#c9dcf3] min-h-screen pt-10 pb-20">
      <h2 className="blogs-heading">Meet the Minds Behind the Words</h2>
      {authors.length > 0 ? (
        <section className="grid grid-cols-1 gap-y-32 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4">
          {authors.map(({ _id: id, avatar, name, posts }) => (
            <div className="relative w-full max-w-[280px] mx-auto">
              <Link key={id} to={`/posts/users/${id}`}>
                {/* Image Container */}
                <div className="rounded-[2rem] overflow-hidden h-[280px] relative border-2 border-[#3e95fb]">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      avatar
                        ? `http://localhost:5000/uploads/${avatar}`
                        : ProfileImage
                    }
                    alt={`${name}'s profile picture`}
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-[55%] mb-10y">
                  <div className="mx-4">
                    <div className="bg-[#4285F4] text-white rounded-tl-[1.25rem] rounded-br-[1.25rem] p-4 text-center shadow-lg">
                      <h3 className="text-xl font-semibold mb-1">{name}</h3>
                      <p className="text-sm text-white/90 mb-3">
                        Blogs Published: {posts}
                      </p>
                      <button className=" bg-white px-3 text-sm font-normal leading-6 text-[#4285F4] capitalize duration-100 transform border-[1px] rounded-lg cursor-pointer focus:outline-none hover:shadow-lg hover:-translate-y-1">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </section>
      ) : (
        <h2 className="text-center text-2xl text-gray-600 py-32">
          No users found
        </h2>
      )}
    </div>
  );
};

export default Authors;
