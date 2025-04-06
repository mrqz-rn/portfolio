'use client';
import React from "react";
import Image from "next/image";


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
                }, 1000);
              }
            }}
            onMouseOut={() => {
              clearInterval(intervalRefs.current[index]);
              intervalRefs.current[index] = null; // Reset stored interval
            }}
          >
            <Image
              src={project.images[activeIndexes[index]]}
              width={500}
              height={300}
              alt="Project Image"
              className="p-1 cursor-pointer transition-opacity duration-500"
            />
            {project.name}
          </div>
        ))}
      </div>
    )
    }