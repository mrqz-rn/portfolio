import React from "react";
import Image from "next/image";
import Modal from "../Modal";
import { useRef } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from 'react-toastify';
import  GlowingCards, { GlowingCard }  from "../ui/glowing-cards";


import { services, techs, qualifications, skills} from "../../scripts/app-data.js";


export default function Tab3() {
     const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
        .sendForm("service_2xvphso", "template_mmgxojl", form.current, "rj6WqqdOkjuH-1iHf")
        .then(
            (result) => {
            email_notify();
            },
            (error) => {
            email_alert();
            }
        );
    };
    const email_notify = () => toast.success("Email sent successfully!", {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
    const email_alert = () => toast.error("Email failed to send!", {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const openModal = (index) => {
        setActiveWork(index);
        setIsModalOpen(true);
    };
    

    return(
        <>
            <div className="px-6 md:px-14">
                <h3 className="mb-6 text-lg font-bold border-b border-gray-700 py-2 white--text">SERVICE OFFERED</h3>
                   
                <div className="md:flex md:gap-5 mb-2">
                {services.map((service) => (
                    <GlowingCards className="" key={service.id} >
                        <GlowingCard glowColor={service.color}>
                            <div className="flex justify-between">
                                <h4 className="text-base font-bold white--text">{service.name}</h4>
                                </div>
                                <ul className="md:list-disc md:list-inside">
                                {service.jobs.map((job) => (
                                    <li key={job.id} className="text-sm py-1">
                                    <span className="white--text">{job.title}</span> 
                                    </li>
                                ))}
                                </ul>
                        </GlowingCard>
                    </GlowingCards>
                ))}
                </div>


                <h3 className=" mb-6 text-lg font-bold border-b border-gray-700 py-2 white--text">SKILLS</h3>
                <div className="grid grid-cols-2 gap-4 mb-2">
                    {skills.map((skill) => (
                         <GlowingCards className="" key={skill.id} >
                            <GlowingCard glowColor={skill.color}>
                                <h4 className="text-base font-bold mb-2 white--text">{skill.type}</h4>
                                <div className="w-full flex flex-wrap gap-4 ">
                                    {skill.items.map((item) => (
                                        <div key={item.id} className="items-center justify-center scale-100 transition duration-200 ease-in-out">
                                            <div className="flex justify-center">
                                                <Image 
                                                src={`/tech/${item.icon}`} width={800} height={800} alt="Responsive Image" 
                                                className={`w-9 h-9 cursor-pointer object-contain`}/>
                                            </div>
                                            <p className="text-xs text-center pt-[2px] white--text">{item.name}</p>
                                        </div>
                                    ))}
                                </div>
                               
                            </GlowingCard>
                        </GlowingCards>
                    ))}
                   
                </div>
             

                <h3 className=" mb-6 text-lg font-bold border-b border-gray-700 py-2 white--text">QUALIFICATIONS</h3>
                <div className="px-4 border-gray-700 rounded-lg mb-6">
                    {qualifications.map((qualification) => (
                    <div key={qualification.id} className="mb-4">
                        <h4 className="text-base font-bold mb-2 white--text">{qualification.title}</h4>
                        <ul className="list-disc list-inside">
                        {qualification.items.map((item) => (
                            <li key={item.id} className="text-sm white--text">{item.text}</li>
                        ))}
                        </ul>
                    </div>
                    ))}
                </div>
                
                {/* <Contact /> */}

                <h3 className=" mb-6 text-lg font-bold border-b border-gray-700 py-2 white--text">CONTACT ME</h3>
                <div className="flex mb-10">
                    <div className="p-4 w-2/5 ">
                        <div className="white--text min-h-[150px] flex justify-center" >
                            <Image
                             src='/icons/email.png'
                             width={300} height={300}
                            objectFit='contain'
                            alt={`Slider Image`}
                            className="p-1 cursor-pointer transition-opacity duration-500 " />
                        </div>
                    </div>
                    <div className="p-4 w-3/5 content-center">
                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <input name="user_name" placeholder="Your name" className="border rounded-lg  p-2 w-full white--text" required />
                            <input name="user_email" placeholder="Your email" type="email" className="border rounded-lg  p-2 w-full white--text" required />
                            <textarea name="message_text" placeholder="Your message" className="border rounded-lg  p-2 w-full white--text" required />
                            <button type="submit" className="bg-blue-600 scale-100 duration-150 ease-in-out cursor-pointer
                            active:scale-95 active:bg-blue-500 white--text px-4 py-2 rounded-lg w-full">Send Message</button>
                        </form> 
                    </div>
                </div>
                <ToastContainer/>

                <p className="py-2 mb-4 text-sm text-gray-500 text-center gray--text">Skilled. Reliable. Ready to deliver!</p>
            </div>
        </>
    )
    }