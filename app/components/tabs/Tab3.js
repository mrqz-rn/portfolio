import React from "react";
import Image from "next/image";
import Modal from "../Modal";
import Contact from "../Contact";


export default function Tab3() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const openModal = (index) => {
        setActiveWork(index);
        setIsModalOpen(true);
    };
    
    const services = [
        {id: 0, name: 'PC and Laptop Services',
            jobs: [
                {id: 0, title: 'Hardware Diagnostics and Repair',
                description: 'Identifying and resolving physical issues with desktops and laptops including hard drives, RAM, motherboards, power supplies, and other components.'},
                {id: 1, title: 'Software Troubleshooting',
                description: 'Detection and resolution of system errors, application malfunctions, and operating system issues.'},
                {id: 2, title: 'OOS Installation & Configuration',
                description: '  Fresh installation or reinstallation of operating system, along with driver setup and updates.'},
                {id: 3, title: 'Component Replacement & Upgrades',
                description: 'Replacement or upgrading of internal components such as SSDs, GPUs, CPUs, RAM, and cooling systems to optimize performance.'},
            ]
        },
        {id: 1, name: 'Programming and Development',
            jobs: [
                {id: 0, title: 'Commission-Based Projects',
                description: 'Development of software solutions tailored to specific client needs.'},
                {id: 1, title: 'Web & Mobile Applications',
                description: 'Design and development of user-friendly, responsive web and mobile apps using modern technologies.'},
                {id: 2, title: 'Microcontroller Programming',
                description: 'Development and deployment using Arduino and other microcontrollers, including sensor integration, motor control, and wireless communication.'},
                {id: 3, title: 'Circuit and Wiring Design',
                description: 'Designing and planning electrical circuits and wiring systems for functional and safe electronic devices.'},
            ]
        },
        {id: 2, name: 'Free Consultation & Student Support',
            jobs: [
                {id: 0, title: 'Project Planning & Guidance',
                description: 'Helping students refine their ideas into practical, structured, and achievable project plans.'},
                {id: 1, title: 'Technical Consultation',
                description: 'Providing insight into the tools, technologies, and approaches best suited for the desired outcome.'},
                {id: 2, title: 'Material Recommendations',
                description: "Assisting with the selection of appropriate components, development platforms, and resources tailored to the project's requirements."},
                {id: 3, title: 'Hands-on Support',
                description: 'Offering advice and support throughout the development cycle—from concept design and prototyping to final testing and deployment.'},
            ]
        }
    ]

    const techs = [
        {id: 0, category: "Development", items: [
            {id: 0, name: "HTML", icon: "html.png"},
            {id: 1, name: "CSS", icon: "css.png"},
            {id: 2, name: "Javascript", icon: "javascript.png"},
            {id: 3, name: "Next JS", icon: "next.png"},
            {id: 4, name: "Vue JS", icon: "vue.png"},
            {id: 5, name: "Ionic", icon: "ionic.png"},
            {id: 6, name: "TailwindCSS", icon: "tailwind.png"},
            {id: 7, name: "Vuetify", icon: "vuetify.png"},
            {id: 8, name: "Node JS", icon: "node-js.png"},
            {id: 9, name: "Php", icon: "php.png"},
            {id: 10, name: "MySQL", icon: "mysql.png"},
            {id: 11, name: "CodeIgniter", icon: "codeigniter.png"},
            {id: 12, name: "Java", icon: "java.png"},
        ]},
        {id: 1, category: "Tools", items: [
            {id: 0, name: "Git", icon: "git.png"},
            {id: 1, name: "Gitlab", icon: "gitlab.png"},
            {id: 2, name: "Github", icon: "github.png"},
            {id: 3, name: "Postman", icon: "postman.png"},
            {id: 4, name: "Playwright", icon: "playwright.png"},
            {id: 5, name: "Photoshop", icon: "photoshop.png"},
            {id: 6, name: "Figma", icon: "figma.png"},
        ]},
        {id: 2, category: "Familiar With", items: [
            {id: 0, name: "Arduino", icon: "arduino.png"},
            {id: 2, name: "C", icon: "c.png"},
            {id: 3, name: "C++", icon: "c+.png"},
            {id: 4, name: "Flutter", icon: "flutter.png"},
            {id: 5, name: "Visual Basic", icon: "vb.png"},
            {id: 6, name: "Firebase", icon: "firebase.png"},
        ]}
    ];

    const qualifications = [
        {id: 0, title: "Programming Capabilities", items: [
            {id: 0, text: "Proficiency in various programming languages/frameworks such as JavaScript, VueJS, NextJS, NodeJS, TailwindCSS, Java, MySQL and more."},
            {id: 1, text: "Consistently writes code that is clean, efficient, reusable, dynamic, and easy to maintain."},
        ]},
        {id: 1, title: "Critical Thinking & Analytical Abilities", items: [
             {id: 0, text: "Adept at analyzing complex technical problems and developing effective solutions."},
             {id: 1, text: "Capable of breaking down large-scale issues into smaller, more manageable components."},
        ]},
        {id: 2, title: "Software Development Practices", items: [
            {id: 0, text: "Well-versed in software development methodologies including Agile, Scrum, and Waterfall."},
            {id: 1, text: "Experienced in using version control systems such as Git (GitHub / GitLab)."},
        ]},
        {id: 3, title: "Debugging & Troubleshooting", items: [
             {id: 0, text: "Highly capable in debugging even unfamiliar codebases."},
             {id: 1, text: "Adept with tools and techniques for quickly isolating and resolving issues."},
        ]},
        {id: 4, title: "Communication & User Support", items: [
            {id: 0, text: "Offers direct support to both technical and non-technical users."},
            {id: 1, text: "Skilled in translating complex solutions into user-friendly guidance."},
            {id: 2, text: "Capable of handling user queries and delivering timely resolutions with clarity and empathy."},
        ]},
        {id: 5, title: "Soft Skills & Professional Conduct", items: [
            {id: 0, text: "Collaborative team player with a strong sense of ethics and professionalism."},
            {id: 1, text: "Committed to continuous learning and adaptability in fast-evolving tech environments."},
            {id: 2, text: "Strong communication, attention to detail, and mentoring capabilities."},
        ]},
    ];

    return(
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mClass={" m-6 md:w-lg"}>
                <div className="pt-2">

                </div>
            </Modal>
            <div className="px-6 md:px-14">
                <h3 className="mb-6 text-lg font-bold border-b border-gray-700 py-2">SERVICE OFFERED</h3>
                <div className="md:flex md:gap-5">
                {services.map((service) => (
                  <div key={service.id} className="p-4 border border-gray-700 rounded-lg text-justify mb-6 w-full">
                    <div className="flex justify-between">
                    <h4 className="text-base font-bold">{service.name}</h4>
                    <span className="mdi mdi-open-in-new text-xl text-blue-500 cursor-pointer scale-100 active:scale-75 transition duration-300 ease-in-out"/>
                    </div>
                    <ul className="md:list-disc md:list-inside">
                      {service.jobs.map((job) => (
                        <li key={job.id} className="text-sm py-1">
                          <span className="">{job.title}</span> 
                          {/* &nbsp; {job.description} */}
                        </li>
                      ))}
                    </ul>
                  </div>  
                ))}
                </div>


                <h3 className=" mb-6 text-lg font-bold border-b border-gray-700 py-2">SKILLS</h3>
                <div className="px-4 pt-4  border border-gray-700 rounded-lg mb-6"> 
                    {techs.map((tech) => (
                    <div key={tech.id} className="mb-4">
                        <h4 className="text-base font-bold mb-2">{tech.category}</h4>
                        <div className="w-full flex flex-wrap gap-6  ">
                        {tech.items.map((item) => (
                            <div key={item.id} className="items-center justify-center scale-100 hover:scale-110 transition duration-200 ease-in-out">
                                <div className="flex justify-center">
                                    <Image 
                                    src={`/tech/${item.icon}`} width={800} height={800} alt="Responsive Image" 
                                    className={`w-9 h-9 cursor-pointer object-contain`}/>
                                </div>
                                <p className="text-xs text-center pt-[2px]">{item.name}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>

                <h3 className=" mb-6 text-lg font-bold border-b border-gray-700 py-2">QUALIFICATIONS</h3>
                <div className="px-4 border-gray-700 rounded-lg mb-6">
                    {qualifications.map((qualification) => (
                    <div key={qualification.id} className="mb-4">
                        <h4 className="text-base font-bold mb-2">{qualification.title}</h4>
                        <ul className="list-disc list-inside">
                        {qualification.items.map((item) => (
                            <li key={item.id} className="text-sm">{item.text}</li>
                        ))}
                        </ul>
                    </div>
                    ))}
                </div>
                
                <p className="py-2 mb-4 text-sm text-gray-500 text-center">Skilled. Reliable. Ready to deliver!</p>
                {/* <Contact /> */}
            </div>
        </>
    )
    }