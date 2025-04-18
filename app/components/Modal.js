
import React from "react";
import { motion,AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, mClass, children }) {
  const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        const handleEsc = (event) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
      }, [onClose]);

      if(isOpen){
        setTimeout(() => {
          setIsVisible(true);
        }, 150);
      }
     
      const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => {
          onClose();
        }, 125);
      }
      if (!isOpen) return null;

    return (
        <>

        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        onClick={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 text-white "
        >
          <AnimatePresence initial={false}>
            {isVisible ? (
                  <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      key="box"
                      className={`bg-zinc-800 rounded-2xl shadow-xl p-3 relative ${mClass}`}>
                        <div className="flex justify-end mb-[-14px]" >
                          <div onClick={closeModal}
                          className="bg-gray-300 rounded-full w-6 h-6 flex justify-center items-center text-xl pt-[2px] text-black cursor-pointer scale-100 active:scale-85">&times;</div>
                        </div>
                        <div >
                        {children}
                        </div>
                    

                  </motion.div>
                ) : null}
          </AnimatePresence>
         
        </motion.div>

        {/* <motion.div
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
                onClick={closeModal}> &times; </button>

                  <AnimatePresence initial={false}>
                  {isVisible ? (
                          <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                              style={{width: 100, height: 100,
                                backgroundColor: "#0cdcf7",
                                borderRadius: "10px"}}
                              key="box"
                          >
                            test
                            <button className="right-3 text-gray-500 hover:text-gray-800 text-3xl cursor-pointer"
                            onClick={() => setIsVisible(false)}> &times; </button>

                          </motion.div>
                        ) : null}
                  </AnimatePresence>
                  <motion.button
                      style=''
                      onClick={() => setIsVisible(!isVisible)}
                      whileTap={{ y: 1 }}
                  >
                      {isVisible ? "Hide" : "Show"}
                  </motion.button>
                  
                {children}
            </motion.div>
        </motion.div> */}
        </>
    )
}
