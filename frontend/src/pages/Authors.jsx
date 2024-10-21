import { useState } from "react";
import Avatar from "../assests/avatars/osolLogo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const authorsData = [
  {
    id: 1,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 10,
  },
  {
    id: 2,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 1,
  },
  {
    id: 3,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 5,
  },
  {
    id: 4,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 8,
  },
  {
    id: 5,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 4,
  },
  {
    id: 6,
    avatar: Avatar,
    name: "Muhammad Faraz",
    posts: 6,
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <div>
      {authors.length > 0 ? (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map(({ id, avatar, name, posts }) => {
            return (
              <div className="w-full my-10">
                <Link key={id} to={`/posts/users/${id}`}>
                  <div>
                    <motion.div
                      className="flex flex-col justify-center max-w-xs mx-auto bg-gradient-to-r from-purple-50 to-indigo-100 shadow-xl rounded-xl p-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <img
                          className="w-24 h-24 mx-auto shadow-xl rounded-full object-cover border-4 border-slate-800"
                          src={avatar}
                          alt={`${name}'s profile picture`}
                        />
                      </motion.div>
                      <div className="text-center mt-5">
                        <motion.p
                          className="text-xl sm:text-2xl font-bold text-black mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {name}
                        </motion.p>
                        <motion.p
                          className="text-xs sm:text-base text-gray-700 pt-2 pb-4 px-5 w-auto inline-block border-b-2 border-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          Posts: {posts}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      ) : (
        <h2>No users found</h2>
      )}
    </div>
  );
};

export default Authors;
