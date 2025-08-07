// import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect } from 'react';
import  ScrollList  from '../ui/scroll-list';
import  GlowingCards, { GlowingCard }  from "../ui/glowing-cards";
import { Button } from "../lightswind/button"
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent } from "../lightswind/dialog"
import { summary, jobs, education, certs } from "../../scripts/app-data.js";


export default function Tab1() {
    // const summary = 'A Programmer with hands-on experience in full-stack web development, system optimization, and technical support. Skilled in debugging, building user-focused web applications, and working with cross-functional teams. Proficient in Agile practices, API integration, and responsive design. Strong communicator with a background in hardware troubleshooting and customer service.'
 

        useEffect(() => {
            const dates = document.querySelectorAll('.vertical-timeline-element-date');
            dates.forEach((el) => el.remove()); // Remove all date spans after render
          }, []);
return(
    <div className="px-6 md:px-14">
        
          <h3 className="text-lg font-bold border-b border-gray-700 pb-2 py-4 white--text">EXPERIENCE</h3>
          <ScrollList className="mt-6"
            data={jobs}
            renderItem={(item, index) => (
              <GlowingCards className="my-6">
                <GlowingCard glowColor={item.color}>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <Image src={item.icon} alt="skills" width={30} height={30} className="rounded-full" />
                      <h3 className="text-normal font-semibold text-white content-center mx-2">{item.company}</h3>
                      <span className='text-sm italic white--text content-center'>- {item.location}</span>
                    </div>
                    <h3 className="text-normal text-white content-center">{item.start} - {item.end}</h3>
                  </div>
                  <h3 className="text-lg font-semibold text-white py-1">{item.position}</h3>
                  <p className='px-2 text-sm italic text-justify white--text font-normal'>
                    {item.summary}
                  </p>
                  <Dialog className="">
                    <DialogTrigger asChild>
                      <Button variant="outlined" size="sm" className=" text-white cursor-pointer hover:text-blue-700">Learn More...</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className='w-4xl text-white py-2'> 
                        <div className='flex justify-between'>
                        <div className='flex'>
                          <Image src={item.icon} alt="skills" width={30} height={30} className="rounded-full" />
                          <h3 className="text-normal font-semibold text-white content-center mx-2">{item.company}</h3>
                          <span className='text-sm italic white--text content-center'>- {item.location}</span>
                        </div>
                        <h3 className="text-normal text-white content-center">{item.start} - {item.end}</h3>
                      </div>
                      <h3 className="text-lg font-semibold text-white py-1">{item.position}</h3>
                      {/* <p className='px-2 text-sm italic text-justify white--text font-normal'>
                        {item.summary}
                      </p> */}
                      {item.details.map((detail, idd) => (
                        <div key={`dt`+idd} className=''>
                          <span className="px-2 text-sm italic text-justify white--text font-normal">
                              • {detail}
                          </span>
                        </div>
                      ))}
                      </div>
            
                    </DialogContent>
                  </Dialog>
                </GlowingCard>
              </GlowingCards>
            )}
            itemHeight={160}
          />

        <h3 className="text-lg font-bold border-b border-gray-700 py-2 white--text">EDUCATION</h3>
         <ScrollList className="mt-6"
            data={education}
            renderItem={(item, index) => (
              <GlowingCards className="my-6">
                <GlowingCard glowColor={item.color}>
                  <div className='flex justify-between'>
                    <div className='flex'>
                      <Image src={item.icon} alt="skills" width={30} height={30} className="rounded-full" />
                      <h3 className="text-normal font-semibold text-white content-center mx-2">{item.school}</h3>
                      <span className='text-sm italic white--text content-center'>- {item.location}</span>
                    </div>
                    <h3 className="text-normal text-white content-center">{item.start} - {item.end}</h3>
                  </div>
                  <h3 className="text-lg font-semibold text-white py-1">{item.degree}</h3>
                    {/* {item.details.map((detail, idd) => (
                      <div key={`dt`+idd} className=''>
                        <span className="px-2 text-sm italic text-justify white--text font-normal">
                            • {detail}
                        </span>
                      </div>
                    ))} */}
                </GlowingCard>
              </GlowingCards>
            )}
            itemHeight={160}
          />
          
        

        {/* <SlidingCards cards={cardItems} cardSize="w-20 h-20" className="mx-auto" />; */}
        <h3 className="text-lg font-bold border-b border-gray-700 py-2 white--text">CERTIFICATIONS</h3>
        <div className="py-2">
         {certs.map((cert) => (
             <div key={cert.id} className="mb-3">
                <div>
                    <p>
                        <span className="text-sm font-semibold white--text">{cert.title} </span>
                        <span className="text-sm white--text">| {cert.issuer} - {cert.issued}</span>
                    </p>
                </div>
            </div>
         ))}
        </div>
  </div>
)
}