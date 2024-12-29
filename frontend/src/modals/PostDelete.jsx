import { AnimatePresence, motion } from "framer-motion";
import { CiTrash } from "react-icons/ci";
import { FiAlertCircle } from "react-icons/fi";

const DeletePostModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
              <CiTrash className="text-red-700" />
            </div>
            <p className="text-center">
              Are you sure you want to delete this post?
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={onClose}
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Nah
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`${
                  isLoading ? "bg-red-400" : "bg-red-600 hover:bg-red-400"
                } transition-colors text-white font-semibold w-full py-2 rounded`}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeletePostModal;
