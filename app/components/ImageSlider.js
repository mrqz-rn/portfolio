"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
 

export default function ImageSlider({imageArray, mClass}) {
    const images = imageArray.map((imgSrc) => ({src: imgSrc,}));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const handleMouseOver = () => {
        setIsHovered(true);
      };
    
      // Handle mouse leave event
      const handleMouseLeave = () => {
        setIsHovered(false);
      };
    return (
        <>  
            <div className="">
                <div
                    className={`relative ${mClass}`}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        className=""
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}>
                        <Image
                        src={images[currentIndex].src}
                        layout="fill"
                        objectFit='contain'
                        alt={`Slider Image ${currentIndex + 1}`}
                        className="p-1 cursor-pointer transition-opacity duration-500 "/>
                    </motion.div>
                  
                     <button
                        className="absolute left-0 top-1/2 transform h-[40] rounded-full mx-0 hover:mx-3 text-gray-400/80 hover:text-white 
                        -translate-y-1/2 bg-gray-600/0 hover:bg-blue-600 px-2 group transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={prevSlide}>
                        <ChevronLeft className="" />
                    </button>
                    <button
                        className="absolute right-0 top-1/2 transform h-[40] rounded-full mx-0 hover:mx-3 text-gray-400/80 hover:text-white 
                        -translate-y-1/2 bg-gray-600/0 hover:bg-blue-600 p-2 group transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={nextSlide}>
                        <ChevronRight className="" />
                    </button>
                </div>
               
            
                <div className="flex justify-center">
                    {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-10 mx-1 ${
                        index === currentIndex
                            ? "bg-blue-500 rounded-xl"
                            : "bg-gray-300/70 rounded-xl"
                        } transition-all duration-500 ease-in-out`}
                    ></div>
                    ))}
                </div>
                </div>
        </>
    )
}