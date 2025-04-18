'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "../Modal";


export default function Tab2() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isModalOpen2, setIsModalOpen2] = React.useState(false);

    const [activeWork, setActiveWork] = React.useState(0);
    const [activeProject, setActiveProject] = React.useState(0);

    const works = [
        {id: 0, name: 'SPOTT (Sterling Paper Online Time Tracker)', 
        description: 'A mobile application designed to facilitate employees in tracking their working hours. Served as a digital Daily Time Record (DTR), streamlines the process of logging work hours, ensuring accuracy and efficiency.',
        tech: ['Ionic', 'Vue', 'Codeigniter', 'MySQL'], 
        involvement: ['Design', 'Development', 'Production', 'Maintenance'],
        company: "Slac",
        detail: [
          "As the Lead Developer for the SPOTT application, I am responsible for overseeing the development and implementation of key system components. I develop separate, robust RESTful APIs dedicated to handling user data and attendance logs (attlogs), ensuring secure and efficient data storage and retrieval.",
          "I have collaborate closely with the Human Resources team to transition from manual attendance tracking to a fully digitalized timekeeping system. Provide continuous support to SPOTT users, actively gathering feedback, addressing concerns, and resolving issues in a timely manner. Coordinate with stakeholders to ensure that any application adjustments align with organizational goals and user expectations."
        ],
        imagefit: 'contain',
        images: ['/works/w1/img1.jpg','/works/w1/img2.png','/works/w1/img3.png','/works/w1/img4.png','/works/w1/img5.png'], active: 0},
        
        {id: 2, name: 'SWFS (Sterling Workforce System)', 
        description: 'SWFS is a next-generation Human Resource Information System (HRIS) and Payroll Management solution proposed to replace the organization’s outdated legacy systems. Developed using modern technologies and programming standards, SWFS is designed to improve operational efficiency, accuracy, and the overall user experience across HR and payroll functions.',
         tech: ['Vue', 'Codeigniter', 'MySQL'],
        involvement: ['Development', 'Data Migration', 'Production', 'Maintenance'],
        company: "Slac",
        detail: [
          "As a key contributor to the development of the SWFS platform, I led the implementation of several major system modules and optimizations such as Alphalist Generation, BIR Tax Computation, Employee Clearance Processing, Last Pay Computation and more.",
          "Conducted a thorough review and restructuring of select data models and business process flows to significantly improve system performance. These enhancements resulted in reduced processing times and improved overall system responsiveness.",
          "Led the migration of legacy data from the old payroll system to the newly designed database structure, ensuring data integrity, consistency, and seamless operation with the new system."
        ],
        imagefit: 'contain',
        images: ['/works/w3/img1.png','/works/w3/img2.png','/works/w3/img3.png','/works/w3/img4.png'], active: 0},
        
        {id: 3, name: 'ESS-PORTAL (Employee Self Service Portal) ', 
        description: "The ESS Portal is a proposed replacement for the organization's legacy timekeeping and HR request filing system. Built using modern technologies and designed with user experience in mind, this portal will serve as a centralized, self-service platform for employees and HR teams alike.",
         tech: ['Vue', 'Codeigniter', 'MySQL'],
        involvement: ['Development', 'Production', 'Maintenance'],
        company: "Slac",
        detail: [
          "As part of the E-PORTAL system development, I was tasked with implementing the process integration for employee Daily Time Record (DTR) logs in connection with the SPOTT application.",
          "Designed logic to automatically convert raw attendance logs into formatted DTR records for use in HR, payroll, and compliance reporting."
        ],
        imagefit: 'contain',
        images: ['/works/w4/img1.png','/works/w4/img2.png'], active: 0},
        
        {id: 4, name: 'Applicant Tracking System', 
        description: 'This application is designed to streamline and manage the entire recruitment and onboarding process for Human Resources (HR) departments. It provides a comprehensive platform that facilitates every stage of hiring, from job posting and application submission, all the way through to onboarding new employees.',
        tech: ['Vue', 'Codeigniter', 'MySQL'],
        involvement: ['Design', 'Development'],
        company: "Slac",
        detail: [
          ""
        ],
        imagefit: 'contain',
        images: ['/works/w5/img1.png','/works/w5/img2.png','/works/w5/img3.png'], active: 0},
        
        // {id: 1, name: 'SPGC WEBPOS', 
        // description: "A modern and web-based Point of Sale (POS) system proposed to replace the company's outdated POS infrastructure. Designed with scalability, integration, and real-time data accessibility in mind, SPGC WEBPOS will centralize all transaction data while seamlessly connecting with the organization’s HRIS and Payroll system (SWFS) for automated employee-related transactions.",
        // tech: ['Vue', 'Codeigniter', 'MySQL'],
        // involvement: ['Design', 'Development'],
        // company: "Slac",
        // detail: [
        //   ""
        // ],
        // imagefit: 'contain',
        // images: ['/works/project1.jpg'], active: 0},

        {id: 5, name: 'Asia CEO Forum', 
        description: 'The Asia CEO Forum is the premier national business event series in the Philippines, known for its influential gatherings and the annual Asia CEO Awards. It promotes the Philippines as a leading business destination and celebrates regional leadership excellence.',
        tech: ['NextJS', 'NoSQL'],
        involvement: ['Revamp', 'Enhancement'],
        company: "Volenday",
        detail: [
          "Participated in the full migration of the existing website to the Next.js framework, leveraging its performance benefits, SEO capabilities, and modern development architecture.",
          "Ensured the original UI layout and design elements were retained to maintain brand consistency, while improving core functionalities for a smoother and more engaging user experience."
        ],
        imagefit: 'contain',
        images: ['/works/w6/img1.png','/works/w6/img2.png'], active: 0},
    ];


    const projects = [
        {id: 0, name: 'E-Portfolio', 
        description: 'A personal website designed to help me showcase my work and achievements in a professional manner online.',
        tech: ['NextJS', 'Tailwind'],
        imagefit: 'contain',
        images: ['/project/portfolio/img1.png','/project/portfolio/img2.png'], active: 0},

        {id: 0, name: 'Juala De Amor', 
        description: 'IoT-enabled smart cage system designed for pet bird owners who want to ensure optimal care, safety, and comfort for their avian companions.',
        tech: ['Android', 'Arduino', 'Firebase'],
        imagefit: 'contain',
        images: ['/project/juala/img1.jpg','/project/juala/img2.jpg','/project/juala/img3.jpg','/project/juala/img4.jpg','/project/juala/img5.jpg'], active: 0},

        {id: 0, name: 'ReCSys', 
        description: 'An automated IoT-based smart drying system designed to help users conveniently dry clothes outdoors while protecting them from unpredictable weather conditions such as sudden rain or intense sunlight.',
        tech: ['Android', 'Arduino','Firebase'],
        imagefit: 'contain',
        images: ['/project/recsys/img1.jpg','/project/recsys/img2.jpg','/project/recsys/img3.jpg','/project/recsys/img4.jpg','/project/recsys/img5.jpg'], active: 0},

        {id: 0, name: 'QuickCharge-Fi', 
        description: 'Budget-friendly charging and Wi-Fi solution aimed at students in shared spaces such as libraries, dormitories, study halls, and campus common areas. The system offers rapid device charging ports along with reliable Wi-Fi access, optimized for high user traffic at minimal cost.',
        tech: ['Android', 'Arduino', 'PHP','MySQL'],
        imagefit: 'contain',
        images: ['/project/quick/img1.jpg','/project/quick/img2.jpg','/project/quick/img3.jpg','/project/quick/img4.jpg',
          '/project/quick/img5.jpg','/project/quick/img6.jpg','/project/quick/img7.jpg'], active: 0},

        {id: 1, name: 'BlueThunder', 
        description: 'An E-commerce website with a CRUD for managging the products. ',
        tech: ['Bootstrap', 'PHP', 'MySQL'],
        imagefit: 'contain',
        images: ['/project/bluethunder/img1.jpg','/project/bluethunder/img2.jpg','/project/bluethunder/img3.jpg'], active: 0},
        {id: 2, name: 'Enrollment System', 
        description: 'Simple CRUD application built with Java, featuring a database powered by MS Access. It provides an efficient solution for managing student enrollment data.',
        tech: ['Java', 'MS Access'],
        imagefit: 'contain',
        images: ['/project/enroll/img1.png','/project/enroll/img2.png','/project/enroll/img3.png'], active: 0},
        {id: 3, name: 'EAITH', 
        description: "EAITH is an engaging and challenging word-guessing game designed for play directly on your computer. It's a personalized take on the classic Hangman game, offering a fresh and entertaining twist on the traditional experience",
        tech: ['Java', 'MS Access'],
        imagefit: 'contain',
        images: ['/project/eaith/img1.png','/project/eaith/img2.png','/project/eaith/img3.png'], active: 0},
    ];
    
    // Maintain active indexes for each work
    const [activeIndexes, setActiveIndexes] = React.useState( works.map(() => 0) );
    // Store intervals for each work
    const intervalRefs = React.useRef({}); 
    // Maintain active indexes for each prroject
    const [activeIndexes2, setActiveIndexes2] = React.useState( projects.map(() => 0) );
    // Store intervals for each prroject
    const intervalRefs2 = React.useRef({}); 


    const openModal = (index) => {
      setActiveWork(index);
      setIsModalOpen(true);
    };
    const openModal2 = (index) => {
      setActiveProject(index);
      setIsModalOpen2(true);
    };
    return(
        <>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mClass={" m-6 md:w-lg"}>
            <div className="px-6">
              <Image src={`/icons/${works[activeWork].company}.png`} width={50} height={50} alt="Icon" 
              className="w-14 sm:w-12 md:w-12 rounded-full mb-4"/>
              <h2 className="text-base font-bold mb-4">{works[activeWork].name}</h2>
              <p className="mb-3 text-sm text-justify">{works[activeWork].description}</p>
              {works[activeWork].detail.map((detail, index) => (
                <p key={index} className="mb-3 text-sm text-justify">{detail}</p>
              ))}
            </div>
          </Modal>
          <Modal isOpen={isModalOpen2} onClose={() => setIsModalOpen2(false)} mClass={" m-6 md:w-lg"}>
              <div className="pt-2">
              <h2 className="text-base font-bold mb-4">{projects[activeProject].name}</h2>
              <p className="mb-3 text-sm text-justify">{projects[activeProject].description}</p>
              </div>
          </Modal>

          <h3 className="mx-6 md:mx-14 mb-6 text-lg font-bold border-b border-gray-700 py-2">EXPERIENCE</h3>
          <div className="px-6 md:px-20">
            {works.map((work, index) => (
                <div key={index} onClick={() => openModal(index)}
                onMouseOver={() => {
                  if (!intervalRefs.current[index]) { // Prevent multiple intervals
                    intervalRefs.current[index] = setInterval(() => {
                      setActiveIndexes((prevIndexes) => {
                        const newIndexes = [...prevIndexes];
                        newIndexes[index] =
                          newIndexes[index] >= work.images.length - 1 ? 0 : newIndexes[index] + 1;
                        return newIndexes;
                      });
                    }, 1500);
                  }
                }}
                onMouseOut={() => {
                  clearInterval(intervalRefs.current[index]);
                  intervalRefs.current[index] = null; // Reset stored interval
                }}
                className="md:flex border border-gray-700 rounded-lg p-3 mb-6 md:mb-10 cursor-pointer">
                  <div className="md:w-3/9 border border-gray-700 rounded-lg transition-transform duration-300 ease-in-out">
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
                          src={work.images[activeIndexes[index]]}
                          layout="fill"
                          objectFit={work.imagefit}
                          alt="Project Image"
                          className="p-1 cursor-pointer transition-opacity duration-500 "
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="md:w-6/9 pl-4 md:pt-0 pt-2">
                    <p className="font-semibold">{work.name}</p>
                    <p className="py-1 text-justify text-sm">
                      {work.description.length > 180 ? (
                        <span>
                          {work.description.slice(0, 180)}...{" "}
                          <span
                            className="text-blue-500 cursor-pointer"
                          >
                            Read more
                          </span>
                        </span>
                      ) : (
                        work.description
                      )}
                    </p>

                    <div className="w-full flex flex-wrap py-1">
                    {work.tech.map((th, id) => (
                        <div key={id} className={`bg-blue-900 mx-1 rounded-lg p-1 px-2 text-sm ${th}`}>{th}</div>
                      ))}
                    </div>

                    <p className="text-sm pt-1 font-semibold pb-1">Involvement:</p>
                    <div className=" w-full flex flex-wrap ">
                    {work.involvement.map((inv, ind) => (
                        <div key={ind} className="bg-blue-900 mx-1 max-w-fit rounded-lg p-1 text-sm">{inv}</div>
                      ))}
                    </div>
                  </div>
                </div>
            ))}
          </div>
         



          <h3 className="mx-6 md:mx-10 mb-6 text-lg font-bold border-b border-gray-700 py-2">PROJECTS</h3>
          <div className="px-6 md:px-20 md:grid md:grid-cols-2 md:gap-6 mb-6">
            {projects.map((project, index) => (
              <div key={index} className="md:flex mb-6 md:mb-0 border border-gray-700 rounded-lg p-3"
           
              onMouseOver={() => {
                if (!intervalRefs2.current[index]) { // Prevent multiple intervals
                  intervalRefs2.current[index] = setInterval(() => {
                    setActiveIndexes2((prevIndexes) => {
                      const newIndexes = [...prevIndexes];
                      newIndexes[index] =
                        newIndexes[index] >= project.images.length - 1 ? 0 : newIndexes[index] + 1;
                      return newIndexes;
                    });
                  }, 1500);
                }
              }}
              onMouseOut={() => {
                clearInterval(intervalRefs2.current[index]);
                intervalRefs2.current[index] = null; // Reset stored interval
              }}>
                <div className="md:w-4/9 border border-gray-700 rounded-lg transition-transform duration-300 ease-in-out">
                  <motion.div
                    className="pa-10 h-40 relative"
                    key={activeIndexes2[index]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={project.images[activeIndexes2[index]]}
                        layout="fill"
                        objectFit={project.imagefit}
                        alt="Project Image"
                        className="p-1 cursor-pointer transition-opacity duration-500 "
                      />
                    </div>
                  </motion.div>
                </div>
                <div className="md:w-5/9 md:pl-4 pt-2 md:pt-0">
                  <p className="font-semibold">{project.name}</p>
                  <p className="py-1 text-justify text-sm">
                    {project.description.length > 100 ? (
                      <span>
                        {project.description.slice(0, 100)}...{" "}
                        <span    onClick={() => openModal2(index)}
                          className="text-blue-500 cursor-pointer"
                        >
                          Read more
                        </span>
                      </span>
                    ) : ( 
                      project.description
                    )}  
                  </p>

                  <div className="w-full flex flex-wrap py-1">
                    {project.tech.map((th, id) => (
                      <div key={id} className={`bg-blue-900 mx-1 rounded-lg p-1 px-2 text-sm ${th}`}>{th}</div>
                    ))}
                  </div>  

                  {/* <p className="text-sm pt-1 font-semibold pb-1">Involvement:</p>
                  <div className="flex">
                    {project.involvement.map((inv, ind) => (
                      <div key={ind} className="bg-blue-900 mx-1 rounded-lg p-1 text-sm">{inv}</div>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}

          </div>
      </>
    )
    }