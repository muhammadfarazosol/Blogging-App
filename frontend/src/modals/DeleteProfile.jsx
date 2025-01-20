// import { AnimatePresence, motion } from "framer-motion";
// import { FiAlertCircle } from "react-icons/fi";

// const DeleteProfileModal = ({ isOpen, onClose, onConfirm }) => {
//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
//       >
//         <motion.div
//           initial={{ scale: 0, rotate: "12.5deg" }}
//           animate={{ scale: 1, rotate: "0deg" }}
//           exit={{ scale: 0, rotate: "0deg" }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-[#3e95fb] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
//         >
//           <FiAlertCircle className="text-white/10 rotate-12 text-[200px] absolute z-0 -top-24 -left-24" />
//           <div className="relative z-10">
//             <div className="bg-white w-12 h-12 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
//               <FiAlertCircle />
//             </div>
//             <h3 className="text-2xl font-bold text-center mb-2">OOPS 🤔</h3>
//             <p className="text-center">Are your sure you want to</p>
//             <p className="text-center mb-6">delete your profile?</p>
//             <div className="flex gap-2">
//               <button
//                 onClick={onClose}
//                 className="bg-red-600 hover:bg-red-400 transition-colors text-white font-semibold w-full py-2 rounded"
//               >
//                 Nah, go back
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
//               >
//                 Delete Profile
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default DeleteProfileModal;

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

const DeleteProfileModal = ({ isOpen, onClose, onConfirm }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      onConfirm(password);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-hidden cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#3e95fb] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <FiAlertCircle className="text-white/10 rotate-12 text-[200px] absolute z-0 -top-24 -left-24" />
          <div className="relative z-10">
            <div className="bg-white w-12 h-12 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">
              {isExpanded ? "Confirm Password" : "OOPS 🤔"}
            </h3>
            <p className="text-center mb-6">
              {isExpanded
                ? "Enter your password to confirm deletion"
                : "Are you sure you want to delete your profile?"}
            </p>
            {isExpanded && (
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-black"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-red-600 hover:bg-red-400 transition-colors text-white font-semibold w-full py-2 rounded"
              >
                {isExpanded ? "Delete" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteProfileModal;
