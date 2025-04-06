'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function Tab2() {
    
    let intervalId = null;
    const projects = [
        {id: 0, name: 'test', images: ['/project1.jpg','/project2.jpg'], active: 0},
        {id: 1, name: 'test', images: ['/project1.jpg','/project2.jpg'], active: 0},
        {id: 2, name: 'test', images: ['/project1.jpg','/project2.jpg'], active: 0},
        {id: 3, name: 'test', images: ['/project1.jpg','/project2.jpg'], active: 0},
        {id: 4, name: 'test', images: ['/project1.jpg','/project2.jpg'], active: 0},
    ];

    const [activeIndexes, setActiveIndexes] = React.useState(
        projects.map(() => 0) // Maintain active indexes for each project
      );
      const intervalRefs = React.useRef({}); // Store intervals for each project

    return(
        <div className="grid grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="p-2 border border-gray-700 rounded-lg"
            onMouseOver={() => {
              if (!intervalRefs.current[index]) { // Prevent multiple intervals
                intervalRefs.current[index] = setInterval(() => {
                  setActiveIndexes((prevIndexes) => {
                    const newIndexes = [...prevIndexes];
                    newIndexes[index] =
                      newIndexes[index] >= project.images.length - 1 ? 0 : newIndexes[index] + 1;
                    return newIndexes;
                  });
                }, 2500);
              }
            }}
            onMouseOut={() => {
              clearInterval(intervalRefs.current[index]);
              intervalRefs.current[index] = null; // Reset stored interval
            }}
          >
            <motion.div
              className="pa-10 h-60 relative"
              key={activeIndexes[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0">
                <Image
                  src={project.images[activeIndexes[index]]}
                  layout="fill"
                  objectFit="cover"
                  alt="Project Image"
                  className="p-1 cursor-pointer transition-opacity duration-500 "
                />
              </div>
            </motion.div>
           
            {project.name}
          </div>
        ))}
      </div>
    )
    }