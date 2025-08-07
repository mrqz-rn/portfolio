'use client';
import React from "react";
import Image from "next/image";
import Modal from "../Modal";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Dialog, DialogTrigger, DialogContent } from "../lightswind/dialog"
import { Button } from "../lightswind/button"
import { 
  Carousel2, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "../lightswind/carousel"
import { Card, CardContent } from "../lightswind/card"
import { works, projects } from "../../scripts/app-data.js";


export default function Tab2() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpen2, setIsModalOpen2] = React.useState(false);

  const [activeWork, setActiveWork] = React.useState(0);
  const [activeProject, setActiveProject] = React.useState(0);

  
  // Maintain active indexes for each work
  const [activeIndexes, setActiveIndexes] = React.useState(works.map(() => 0));
  // Store intervals for each work
  const intervalRefs = React.useRef({});
  // Maintain active indexes for each prroject
  const [activeIndexes2, setActiveIndexes2] = React.useState(projects.map(() => 0));
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

  const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mClass={" m-6 md:w-lg"}>
        <div className="px-6">
          <Image src={`/icons/${works[activeWork].company}.png`} width={50} height={50} alt="Icon"
            className="w-14 sm:w-12 md:w-12 rounded-full mb-4" />
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

      <h3 className="mx-6 md:mx-14 mb-6 text-lg font-bold border-b border-gray-700 py-2 white--text">EXPERIENCE</h3>
      <div className="px-6 md:px-20 md:grid md:grid-cols-3 md:gap-6 mb-6">
         {works.map((work, index) => (
            <div className="border-2 border-gray-700 rounded-lg p-3" key={index}>
              <Carousel responsive={responsive} infinite={true} autoPlay autoPlaySpeed={work.speed}  focusOnSelect={false}
                  arrows={false}> 
                  {work.images.map((image, idx) => (
                    <div key={idx} className="white--text min-h-[200px]" >
                        <Image
                        src={image}
                        layout="fill"
                        objectFit='contain'
                        alt={`Slider Image ${idx}`}
                        className="p-1 cursor-pointer transition-opacity duration-500 " />
                    </div>
                  ))}
                </Carousel>
                
                <div> 
                   <p className="text-lg font-semibold white--text">{work.name}</p>
                   <p className="px-2 py-1 text-sm white--text text-justify">
                    {work.description.length > 180 ? (
                      <span>
                        {work.description.slice(0, 180)}...{" "}
                      </span>
                    ) : (
                      work.description
                    )}
                   </p>
                </div>
                <div className="w-full flex flex-wrap py-1 px-1">
                  {work.tech.map((th, id) => (
                    <div key={id} className={`bg-blue-900 mx-1 rounded-lg p-1 px-2 text-sm white--text ${th}`}>{th}</div>
                  ))}
                </div>
                <Dialog className="">
                  <DialogTrigger asChild>
                    <Button variant="outlined" size="sm" className=" text-white cursor-pointer hover:text-blue-700">Learn More...</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-row w-6xl py-2">
                      <div className="basis-4/7 content-center">
                        <Carousel2>
                          <CarouselContent>
                            {work.images.map((image, idx) => (
                              <CarouselItem key={idx}>
                                <div className="relative max-h-[600px] ">
                                   <Card>
                                    <CardContent className="flex aspect-video items-center justify-center">
                                        <Image src={image} layout="fill" objectFit='contain'
                                          alt="Slider Image" className="p-1 cursor-pointer transition-opacity duration-500" />
                                    </CardContent>
                                  </Card>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel2>

                        </div>
                      <div className="basis-3/7">
                        <div className="pl-3"> 
                        <p className="text-lg font-semibold white--text">{work.name}  {work.desc ? `(${work.desc})` : ""}</p>
                        {/* <p className="text-base white--text">desc</p> */}
                        <p className="px-2 py-1 text-sm white--text text-justify">
                          {work.description}
                        </p>
                        <div className="py-3">
                          {work.detail.map((detail, index) => (
                            <p key={index} className="px-2 pb-1 text-sm white--text ">{detail}</p>
                          ))}
                        </div>
                        <p className="text-sm pt-1 font-semibold pb-3 white--text">Technologies:</p>
                        <div className="w-full flex flex-wrap py-1">
                          {work.tech.map((th, id) => (
                            <div key={id} className={`bg-blue-900 mx-1 rounded-lg p-1 px-2 text-sm white--text ${th}`}>{th}</div>
                          ))}
                        </div>

                        <p className="text-sm pt-1 font-semibold pb-3 white--text">Involvement:</p>
                        <div className=" w-full flex flex-wrap ">
                          {work.involvement.map((inv, ind) => (
                            <div key={ind} className="bg-blue-900 mx-1 max-w-fit rounded-lg p-1 text-sm white--text">{inv}</div>
                          ))}
                        </div>
                      </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                  <div className="md:w-6/9 pl-4 md:pt-0 pt-2" onClick={() => openModal(index)}>
                </div>
                </div>
        
         ))}

   

      </div>


      <h3 className="mx-6 md:mx-10 mb-6 text-lg font-bold border-b border-gray-700 py-2 white--text">PROJECTS</h3>
      <div className="px-6 md:px-20 md:grid md:grid-cols-2 md:gap-6 mb-6">
        {projects.map((project, index) => (
          <div key={index} className="md:flex mb-6 md:mb-0 border-2 border-gray-700 rounded-lg p-3">
            <div className="md:w-4/9 border-2 border-gray-700 rounded-lg transition-transform duration-300 ease-in-out">
             <Carousel responsive={responsive} infinite={true} autoPlay autoPlaySpeed={project.speed}  focusOnSelect={false}
                  arrows={false}> 
                  {project.images.map((image, idx) => (
                    <div key={idx} className="white--text h-40" >
                        <Image
                        src={image}
                        layout="fill"
                        objectFit='contain'
                        alt={`Slider Image ${idx}`}
                        className="p-1 cursor-pointer transition-opacity duration-500 " />
                    </div>
                  ))}
                </Carousel>

            </div>
            <div className="md:w-5/9 md:pl-4 pt-2 md:pt-0">
              <p className="font-semibold white--text">{project.name}</p>
              <p className="py-1 text-justify text-sm white--text">
                {project.description.length > 100 ? (
                  <span>
                    {project.description.slice(0, 100)}...{" "}
                    <span onClick={() => openModal2(index)}
                      className="text-blue-500 cursor-pointer "
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
                  <div key={id} className={`bg-blue-900 mx-1 rounded-lg p-1 px-2 text-sm white--text ${th}`}>{th}</div>
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