
import React from "react";
import { motion } from "framer-motion";

export default function Modal({ isOpen, onClose, mClass, children }) {

    React.useEffect(() => {
        const handleEsc = (event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
      }, [onClose]);
    
      if (!isOpen) return null;

    return (
        <>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 text-black"
        >
            <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-2xl shadow-xl p-6 relative ${mClass}`}
            >
                <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-3xl cursor-pointer"
                onClick={onClose}> &times; </button>
                {children}
            </motion.div>
        </motion.div>
        </>
    )
}
