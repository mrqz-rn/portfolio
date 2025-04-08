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
    <div className="text-white w-full bg-zinc-950 text-blue-50 font-[montserrat]">
       {/* <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button> */}
     

      
      <div className="p-3 px-32 ">
        <div class="w-full flex justify-center p-1 rounded-[20px] bg-zinc-700">
          {tabs.map((tab) => (
            <div key={tab.id} class={`grow px-4 rounded-2xl whitespace-nowrap cursor-pointer
            transition-colors duration-150 ease-in-out text-center flex items-center justify-center
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
            className="w-full py-4 px-2"
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
    </div>
  );
}
