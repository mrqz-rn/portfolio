'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "../Modal";


export default function Tab2() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
     


    let intervalId = null;
    const projects = [
        {id: 10, name: 'E-Portfolio', 
        description: 'A personal website designed to help me showcase my work and achievements in a professional manner online.',
        tech: 'NextJS, Tailwind',
        imagefit: 'contain',
        images: ['/images/bluethunder/img1.jpg','/images/bluethunder/img2.jpg','/images/bluethunder/img3.jpg'], active: 0},
        {id: 0, name: 'Online Time Tracker', 
          description: 'A mobile application designed to facilitate employees in tracking their working hours. Served as a digital Daily Time Record (DTR), streamlines the process of logging work hours, ensuring accuracy and efficiency.',
          tech: 'Ionic, Vue, Codeigniter, MySQL ',
          imagefit: 'contain',
          images: ['/images/spott/img1.jpg','/images/spott/img2.png','/images/spott/img3.png','/images/spott/img4.png','/images/spott/img5.png','/images/spott/img6.png'], active: 0},
        {id: 2, name: 'BlueThunder', 
        description: 'An E-commerce website with a CRUD for managging the products. ',
        tech: 'Bootstrap, PHP, MySQL',
        imagefit: 'contain',
        images: ['/images/bluethunder/img1.jpg','/images/bluethunder/img2.jpg','/images/bluethunder/img3.jpg'], active: 0},
        {id: 3, name: 'SWFS', 
        description: 'SWFS is an advanced HRIS and Payroll System designed to replace outdated systems. Built with modern technologies, it enhances user experience, optimizes performance, and generates detailed reports. SWFS aims to improve productivity, accuracy in reporting, and streamline workflows within the organization.',
        tech: '',
        imagefit: 'contain',
        images: ['/images/project1.jpg','/images/project2.jpg'], active: 0},
        {id: 4, name: 'Enrollment System', 
        description: 'Simple CRUD application built with Java, featuring a database powered by MS Access. It provides an efficient solution for managing student enrollment data.',
        tech: 'JAVA, MS Access, MySQL',
        imagefit: 'contain',
        images: ['/images/enroll/img1.png','/images/enroll/img2.png','/images/enroll/img3.png'], active: 0},
        {id: 5, name: 'EAITH', 
        description: "EAITH is an engaging and challenging word-guessing game designed for play directly on your computer. It's a personalized take on the classic Hangman game, offering a fresh and entertaining twist on the traditional experience",
        tech: 'JAVA, MS Access, MySQL',
        imagefit: 'contain',
        images: ['/images/eaith/img1.png','/images/eaith/img2.png','/images/eaith/img3.png'], active: 0},
    ];
    const [activeIndexes, setActiveIndexes] = React.useState(
        projects.map(() => 0) // Maintain active indexes for each project
      );
    const intervalRefs = React.useRef({}); // Store intervals for each project

    const services = [
      {id: 0, name: 'Hardware', 
      details: ['PC/Laptop Troblehhooting & Repair','Component Replacement','Computer Installation','Mobile Repair & Component Replacement'],
      imagefit: 'contain'},
      {id: 1, name: 'Hardware', 
      details: ['PC/Laptop Troblehhooting & Repair','Component Replacement','Computer Installation','Mobile Repair & Component Replacement'],
      imagefit: 'contain'},
      {id: 2, name: 'Hardware', 
      details: ['PC/Laptop Troblehhooting & Repair','Component Replacement','Computer Installation','Mobile Repair & Component Replacement'],
      imagefit: 'contain'},
      {id: 3, name: 'Hardware', 
      details: ['PC/Laptop Troblehhooting & Repair','Component Replacement','Computer Installation','Mobile Repair & Component Replacement'],
      imagefit: 'contain'},
    ];
    return(
        <>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mClass={"w-lg"}>
          <h2 className="text-xl font-bold mb-4">Welcome!</h2>
          <p className="mb-4">This is a reusable modal in plain JavaScript.</p>
        </Modal>
        <div className="px-6">
          <h3 className="text-lg font-bold border-b border-gray-700 py-2">Services</h3>
          <div className="grid grid-cols-3 d-4 gap-4 pt-2">
            {services.map((service, index) => (
              <div key={index} className="p-2 border border-gray-700 rounded-lg hover:scale-102 transition-transform duration-300 ease-in-out">
                <p className="text-sm font-semibold text-center mb-1 pb-1 border-b border-gray-700">{service.name}</p>
                <div className="px-2">
                  {/* {service.details.map((detail, idd) => (
                  
                  ))} */}
                </div>
              
              </div>
            ))}
            <div className="p-2 border border-gray-700 rounded-lg hover:scale-102 transition-transform duration-300 ease-in-out"
            onClick={() => setIsModalOpen(true)}>
                <p className="text-sm font-semibold text-center mb-1 pb-1 border-b border-gray-700">Hardware</p>
                <div className="px-2">
                  <p className="text-sm">PC/Laptop Troblehhooting & Repair</p>
                  <p className="text-sm">Component Replacement</p>
                  <p className="text-sm">Computer Installation</p>
                  <p className="text-sm">Mobile Repair & Component Replacement</p>
                </div>
            </div>
            <div className="p-2 border border-gray-700 rounded-lg hover:scale-102 transition-transform duration-300 ease-in-out">

            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 d-4 px-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="p-2 m-3 border border-gray-700 rounded-lg hover:scale-102 transition-transform duration-300 ease-in-out"
              onMouseOver={() => {
                if (!intervalRefs.current[index]) { // Prevent multiple intervals
                  intervalRefs.current[index] = setInterval(() => {
                    setActiveIndexes((prevIndexes) => {
                      const newIndexes = [...prevIndexes];
                      newIndexes[index] =
                        newIndexes[index] >= project.images.length - 1 ? 0 : newIndexes[index] + 1;
                      return newIndexes;
                    });
                  }, 1800);
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
                    objectFit={project.imagefit}
                    alt="Project Image"
                    className="p-1 cursor-pointer transition-opacity duration-500 "
                  />
                </div>
              </motion.div>
              <p className="text-base font-semibold">{project.name}</p>
              <div className="max-h-25 px-2 overflow-y-auto custom-scrollbar">
                <p className="text-sm text-justify">{project.description}</p>
              </div>
              <p className="text-sm px-1 pt-1"> <span className="font-semibold">Tech:</span> {project.tech}</p>
            </div>
          ))}
      </div>
      </>
    )
    }