// import { AnimatePresence, motion } from "framer-motion";
// import { FiAlertCircle, FiEdit3 } from "react-icons/fi";
// import { useState } from "react";

// const Modal = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <section className="bg-[#0f172a] flex items-center justify-center py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-center"
//       >
//         <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
//           Join Our Community of
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
//             Passionate Writers!
//           </span>
//         </h2>
//         <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
//           Unleash your creativity, share your stories, and connect with fellow
//           writers from around the world. Start your journey today!
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setIsOpen(true)}
//           className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300 flex items-center justify-center mx-auto"
//         >
//           <FiEdit3 className="mr-2" />
//           Create your own blog
//         </motion.button>
//         <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
//       </motion.div>
//     </section>
//   );
// };

// const SpringModal = ({ isOpen, setIsOpen }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setIsOpen(false)}
//           className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: "12.5deg" }}
//             animate={{ scale: 1, rotate: "0deg" }}
//             exit={{ scale: 0, rotate: "0deg" }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
//           >
//             <FiAlertCircle className="text-white/10 rotate-12 text-[200px] absolute z-0 -top-24 -left-24" />
//             <div className="relative z-10">
//               <div className="bg-white w-12 h-12 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
//                 <FiAlertCircle />
//               </div>
//               <h3 className="text-2xl font-bold text-center mb-2">OOPS 🤔</h3>
//               <p className="text-center">Please log in to access all the</p>
//               <p className="text-center mb-6">
//                 features and continue your journey!
//               </p>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="bg-red-600 hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
//                 >
//                   Nah, go back
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Modal;

import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiEdit3 } from "react-icons/fi";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    if (currentUser) {
      navigate("/create");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <section className="bg-[#0f172a] flex items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Join Our Community of
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
            Passionate Writers!
          </span>
        </h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
          Unleash your creativity, share your stories, and connect with fellow
          writers from around the world. Start your journey today!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateBlog}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300 flex items-center justify-center mx-auto"
        >
          <FiEdit3 className="mr-2" />
          Create your own blog
        </motion.button>
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </motion.div>
    </section>
  );
};

const SpringModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/auth");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[200px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-12 h-12 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2">OOPS 🤔</h3>
              <p className="text-center">Please log in to access all the</p>
              <p className="text-center mb-6">
                features and continue your journey!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
