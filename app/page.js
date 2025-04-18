'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tab1 from "./components/tabs/Tab1";
import Tab2 from "./components/tabs/Tab2";
import Tab3 from "./components/tabs/Tab3";


export default function Home() {
  const [activeTab, setActiveTab] = React.useState(1);
  const tabs = [
    { id: 1, title: "Personal", icon: "mdi mdi-account", },
    { id: 2, title: "Project", icon: "mdi mdi-code-json", },
    { id: 3, title: "Others", icon: "mdi mdi-shape-square-plus", },
  ];
  const [isModalOpen, setIsModalOpen] = React.useState(false);



  return (
    <>
    <div className="md:hidden pt-6">
      <div className="text-xl font-bold pa-0 text-center py-2 bg-blue-500/70 text-white mb-5"> Personal </div>
      <Tab1/>
      <div className="text-xl font-bold pa-0 text-center py-2 bg-blue-500/70 text-white my-5"> Projects </div>
      <Tab2/>
      <div className="text-xl font-bold pa-0 text-center py-2 bg-blue-500/70 text-white my-5"> Others </div>
      <Tab3/>
    </div>


    <div className="hidden md:block relative">
      <div className="sticky top-0 backdrop-blur-xs z-50">
        <div className="px-32 pt-2 pb-3">
          <div className=" w-full p-1 flex rounded-[20px] bg-zinc-700">
            {tabs.map((tab) => (
                <div key={tab.id} className={`z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer rounded-2xl
                h-8 text-small rounded-small transition-colors duration-250 ease-in-out
                ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-slate-600 text-white "}`} 
                onClick={() => setActiveTab(tab.id)}>
                  <span className={`${tab.icon} text-lg font-medium px-2`}></span>
                  <span className=" text-sm font-medium pa-0">{tab.title}</span>
                </div>
              ))}
          </div>
        </div>
       

      </div>
      <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Triggers animation on change
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className=""
          >
            {activeTab === 1 && (
              <Tab1/>
            )}
            {activeTab === 2 && (
              <Tab2/>
            )}
            {activeTab === 3 && (
              <Tab3/>
            )}

          </motion.div>
        </AnimatePresence>
    </div>



    {/* <div className="text-white w-full text-blue-50 font-[montserrat] ">
       
     
     <div className="inline-flex w-full sticky top-0 z-50  backdrop-blur-sm bg-opacity-10 p-3 " >
          <div className="flex p-1 h-fit gap-2 items-center flex-nowrap  scrollbar-hide bg-default-100 rounded-medium w-full p-1 rounded-[20px] bg-zinc-700">
          {tabs.map((tab) => (
              
              <div key={tab.id} className={`z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer rounded-2xl
               h-8 text-small rounded-small transition-colors duration-250 ease-in-out
              ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-slate-600 text-white "}`} 
              onClick={() => setActiveTab(tab.id)}>
                 <span className={`${tab.icon} text-lg font-medium px-2`}></span>
                 <span className=" text-sm font-medium pa-0">{tab.title}</span>
              </div>
            ))}
          </div>  
      </div>
  
      <div className="">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Triggers animation on change
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {activeTab === 1 && (
              <Tab1/>
            )}
            {activeTab === 2 && (
              <Tab2/>
            )}
            {activeTab === 3 && (
              <Tab3/>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div> */}
    </>
  );
}
