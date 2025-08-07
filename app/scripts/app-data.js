export const data = [1, 2, 3, 4, 5];


// For Tab 1
export const summary = 'Results-driven IT Professional with a strong foundation in full-stack web development, systems optimization, and technical support, complemented by growing expertise in project management, change management, and process automation. Demonstrated ability to lead and support cross-functional initiatives, including ERP/CRM integrations, UAT/SAT execution, and transformation projects. Proficient in Agile methodologies, API integration, and responsive design. Recognized for effective communication, stakeholder coordination, and a proactive approach to continuous improvement across both technical and operational domains.'
export const jobs = [
    {id: 0, position: 'System Developer Specialist', company: 'Power Mac Center', start: 'Aug 2025', end: 'Present',
        icon: '/icons/pmc.png', color: '#db0099ff', location: 'Pasig City',
        summary: "I handle the end-to-end development of internal systems from analysis and coding to implementation and support. I collaborate with teams to build scalable, integrated solutions, maintain databases, and create technical documentation while supporting innovation through research and prototyping.",
        details: [
            "Participated in full system development lifecycle: analysis, design, development, testing, and implementation of internal enterprise applications.",
            "Developed and maintained system databases and ensured seamless integration between internal modules and external systems.",
            "Created system documentation, user manuals, and support materials to guide users and ensure system maintainability.",
            "Collaborated with cross-functional teams to gather requirements and deliver scalable, efficient system solutions.",
            "Researched and prototyped new technologies to support innovation and process improvements within the organization.",
        ]   
    },
    {id: 1, position: 'Programmer', company: 'SL Agritech Corporation', start: 'July 2023', end: 'June 2025',
        icon: '/icons/Slac.png', color: '#dbd700ff',location: 'Makati City',
        summary: "I developed and maintained enterprise systems, led new internal application builds, and worked closely with teams like HR and Accounting to deliver optimized digital workflows. I provided technical support and participated in Agile sprints using Scrum and Kanban to ensure timely, high-quality releases.",
        details: [
            'Designed, developed, and maintained enterprise software applications, including enhancements to legacy systems.',
            'Led the end-to-end development of new internal applications to streamline company operations and workflows.',
            'Collaborate with cross-functional teams (HR, Accounting, etc.) to identify system requirements, resolve issues, and optimize user experience.',
            'Delivered technical support and system troubleshooting to ensure business continuity and operational efficiency.',
            'Actively contributed to Agile development cycles, leveraging Scrum and Kanban methodologies to ensure timely and high-quality delivery.',

        ]    
    },
    {id: 2, position: 'AHAmatic Engineer Intern', company: 'Volenday Philippines Inc.', start: 'Feb 2023', end: 'April 2023',
        icon: '/icons/Volenday.png', color: '#b80000ff', location: 'Makati City',
        summary: "I built responsive web applications, integrated APIs for dynamic content, and participated in Agile sprints contributing to development cycles and real-time system improvements.",
        details: [
            'Developed well-structured, responsive web applications optimized for seamless user experience across desktop and mobile devices.',
            'Integrated APIs and database-driven content, enabling efficient data retrieval and real-time updates.',
            'Actively participated in team meetings and sprint discussions to track progress, provide updates, and contribute to problem-solving and project improvements.',
        ]    
    },

];

export const education = [
    {id: 1, degree: 'Bachelor of Science in Computer Engineering', location: "Boni, Mandaluyong City",
    school: 'Rizal Technological University', start: '2019', end: '2023', icon: '/icons/rtu.png', color: '#0033dbff',
        details: [
            "Dean's Lister 4rd Year First Semester", 
            "Dean's Lister 3rd Year Second Semester",
            "Dean's Lister 3rd Year First Semester ",
            "Academic Achiever 2nd Year Second Semester",
        ]    
    },
    {id: 2, degree: 'TVL - Computer Programming', location: "Antipolo City",
    school: 'Antipolo City Senrior High School', start: '2017', end: '2019',  icon: '/icons/acshs.png', color: '#00a838ff',
        details: [
            'Member of Student Academic Council', 
            'Computer Programming Strand Representative',
            'Outstanding Club Organization Achievement',
            'Outstanding Performance in Computer Programming'
        ]    
    },
];
export const certs = [
    {id: 0, title: 'Atlassian Agile Project Management Professional Certificate', 
    issuer: 'Atlassian', issued: '2025', details: ['']   
    },
    {id: 1, title: 'Technical Support Fundamentals', 
    issuer: 'Coursera', issued: '2022', details: ['']   
    },
    {id: 2, title: 'IP Addressing and Subnetting', 
    issuer: 'Udemy', issued: '2022', details: ['']   
    },
    {id: 3, title: 'Cisco Networking Foundation: Fundamentals of Cisco Networking', 
    issuer: 'LinkedIn', issued: '2022', details: ['']   
    },
    {id: 4, title: 'Computer System Servicing NC II', 
    issuer: 'TESDA', issued: '2019', details: ['']   
    },
];


// For Tab 2
export const works = [
    {
      id: 0, name: 'SPOTT', desc: "Sterling Paper Online Time Tracker",
      description: 'A mobile application that enables employees to accurately track their working hours. Serves as a digital Daily Time Record (DTR), streamlining time logging for improved efficiency and accuracy.',
      tech: ['Ionic', 'Vue', 'Codeigniter', 'MySQL'],
      involvement: ['Design', 'Development', 'Production', 'Maintenance'],
      company: "Slac",
      detail: [
        "As the Lead Developer for the SPOTT application, I am responsible for overseeing the development and implementation of key system components. I develop separate, robust RESTful APIs dedicated to handling user data and attendance logs (attlogs), ensuring secure and efficient data storage and retrieval.",
        "I have collaborate closely with the Human Resources team to transition from manual attendance tracking to a fully digitalized timekeeping system. Provide continuous support to SPOTT users, actively gathering feedback, addressing concerns, and resolving issues in a timely manner. Coordinate with stakeholders to ensure that any application adjustments align with organizational goals and user expectations."
      ],
      imagefit: 'contain',
      images: ['/works/w1/img1.jpg', '/works/w1/img2.png', '/works/w1/img3.png', '/works/w1/img4.png', '/works/w1/img5.png'], active: 0, speed: 2000
    },

    {
      id: 2, name: 'SWFS', desc: "Sterling Workforce System",
      description: 'A modern HRIS and payroll solution built to replace legacy systems. SWFS improves efficiency, accuracy, and user experience in managing employee data, timekeeping, and payroll processes.',
      tech: ['Vue', 'Codeigniter', 'MySQL'],
      involvement: ['Development', 'Data Migration', 'Production', 'Maintenance'],
      company: "Slac",
      detail: [
        "As a key contributor to the development of the SWFS platform, I led the implementation of several major system modules and optimizations such as Alphalist Generation, BIR Tax Computation, Employee Clearance Processing, Last Pay Computation and more.",
        "Conducted a thorough review and restructuring of select data models and business process flows to significantly improve system performance. These enhancements resulted in reduced processing times and improved overall system responsiveness.",
        "Led the migration of legacy data from the old payroll system to the newly designed database structure, ensuring data integrity, consistency, and seamless operation with the new system."
      ],
      imagefit: 'contain',
      images: ['/works/w3/img1.png', '/works/w3/img2.png', '/works/w3/img3.png', '/works/w3/img4.png'], active: 0, speed: 2000
    },

    {
      id: 3, name: 'ESS-PORTAL', desc: "Employee Self-Service Portal",
      description: "The ESS Portal is a proposed replacement for the organization's legacy timekeeping and HR request filing system. Built using modern technologies and designed with user experience in mind, this portal will serve as a centralized, self-service platform for employees and HR teams alike.",
      tech: ['Vue', 'Codeigniter', 'MySQL'],
      involvement: ['Development', 'Production', 'Maintenance'],
      company: "Slac",
      detail: [
        "As part of the E-PORTAL system development, I was tasked with implementing the process integration for employee Daily Time Record (DTR) logs in connection with the SPOTT application.",
        "Designed logic to automatically convert raw attendance logs into formatted DTR records for use in HR, payroll, and compliance reporting."
      ],
      imagefit: 'contain',
      images: ['/works/w4/img1.png', '/works/w4/img2.png'], active: 0, speed: 2000
    },

    {
      id: 4, name: 'OBS', desc: "Onboarding System",
      description: 'This application is designed to streamline and manage the entire recruitment and onboarding process for Human Resources (HR) departments. It provides a comprehensive platform that facilitates every stage of hiring, from job posting and application submission, all the way through to onboarding new employees.',
      tech: ['Vue', 'Codeigniter', 'MySQL'],
      involvement: ['Design', 'Development'],
      company: "Slac",
      detail: [
        "Restructured the application's data models to align with the organization's hierarchical structure, ensuring seamless integration with the Human Resource and Human Resource Information System (HHRIS). This included mapping positions, departments, and reporting lines accurately across systems.",
        "Redesigned and streamlined various internal workflows within the system to reduce redundancy, improve efficiency, and enhance user experience for recruiters and HR personnel."
      ],
      imagefit: 'contain',
      images: ['/works/w5/img1.png', '/works/w5/img2.png', '/works/w5/img3.png'], active: 0, speed: 2000
    },

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

    {
      id: 5, name: 'Asia CEO Forum',
      description: 'The Asia CEO Forum is the premier national business event series in the Philippines, known for its influential gatherings and the annual Asia CEO Awards. It promotes the Philippines as a leading business destination and celebrates regional leadership excellence.',
      tech: ['NextJS', 'NoSQL'],
      involvement: ['Revamp', 'Enhancement'],
      company: "Volenday",
      detail: [
        "Participated in the full migration of the existing website to the Next.js framework, leveraging its performance benefits, SEO capabilities, and modern development architecture.",
        "Ensured the original UI layout and design elements were retained to maintain brand consistency, while improving core functionalities for a smoother and more engaging user experience."
      ],
      imagefit: 'contain',
      images: ['/works/w6/img1.png', '/works/w6/img2.png'], active: 0, speed: 2000
    },
  ];


export const projects = [
    {
      id: 0, name: 'E-Portfolio',
      description: 'A personal website designed to help me showcase my work and achievements in a professional manner online.',
      tech: ['NextJS', 'Tailwind'],
      imagefit: 'contain',
      images: ['/project/portfolio/img1.png', '/project/portfolio/img2.png'], active: 0, speed: 2400
    },

    {
      id: 0, name: 'Juala De Amor',
      description: 'IoT-enabled smart cage system designed for pet bird owners who want to ensure optimal care, safety, and comfort for their avian companions.',
      tech: ['Android', 'Arduino', 'Firebase'],
      imagefit: 'contain',
      images: ['/project/juala/img1.jpg', '/project/juala/img2.jpg', '/project/juala/img3.jpg', '/project/juala/img4.jpg', '/project/juala/img5.jpg'], 
      active: 0, speed: 2400
    },

    {
      id: 0, name: 'ReCSys',
      description: 'An automated IoT-based smart drying system designed to help users conveniently dry clothes outdoors while protecting them from unpredictable weather conditions such as sudden rain or intense sunlight.',
      tech: ['Android', 'Arduino', 'Firebase'],
      imagefit: 'contain',
      images: ['/project/recsys/img1.jpg', '/project/recsys/img2.jpg', '/project/recsys/img3.jpg', '/project/recsys/img4.jpg', '/project/recsys/img5.jpg'],
       active: 0, speed: 2400
    },

    {
      id: 0, name: 'QuickCharge-Fi',
      description: 'Budget-friendly charging and Wi-Fi solution aimed at students in shared spaces such as libraries, dormitories, study halls, and campus common areas. The system offers rapid device charging ports along with reliable Wi-Fi access, optimized for high user traffic at minimal cost.',
      tech: ['Android', 'Arduino', 'PHP', 'MySQL'],
      imagefit: 'contain',
      images: ['/project/quick/img1.jpg', '/project/quick/img2.jpg', '/project/quick/img3.jpg', '/project/quick/img4.jpg',
        '/project/quick/img5.jpg', '/project/quick/img6.jpg'], active: 0, speed: 2400
    },

    {
      id: 1, name: 'BlueThunder',
      description: 'An E-commerce website with a CRUD for managging the products. ',
      tech: ['Bootstrap', 'PHP', 'MySQL'],
      imagefit: 'contain',
      images: ['/project/bluethunder/img1.jpg', '/project/bluethunder/img2.jpg', '/project/bluethunder/img3.jpg'], active: 0, speed: 2400
    },
    {
      id: 2, name: 'Enrollment System',
      description: 'Simple CRUD application built with Java, featuring a database powered by MS Access. It provides an efficient solution for managing student enrollment data.',
      tech: ['Java', 'MS Access'],
      imagefit: 'contain',
      images: ['/project/enroll/img1.png', '/project/enroll/img2.png', '/project/enroll/img3.png'], active: 0, speed: 2400
    },
    {
      id: 3, name: 'EAITH',
      description: "EAITH is an engaging and challenging word-guessing game designed for play directly on your computer. It's a personalized take on the classic Hangman game, offering a fresh and entertaining twist on the traditional experience",
      tech: ['Java', 'MS Access'],
      imagefit: 'contain',
      images: ['/project/eaith/img1.png', '/project/eaith/img2.png', '/project/eaith/img3.png'], active: 0, speed: 2400
    },
  ];





// For Tab 3
export const services = [
        {id: 0, name: 'PC and Laptop Services', color: "#00a516ff",
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
        {id: 1, name: 'Programming and Development', color: "#2500caff",
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
        {id: 2, name: 'Free Consultation & Student Support', color: "#eff300ff",
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
    ];
export const techs = [
        {id: 0, category: "Development", items: [
            {id: 0, name: "HTML", icon: "html.png"},
            {id: 1, name: "CSS", icon: "css.png"},
            {id: 2, name: "Javascript", icon: "javascript.png"},
            {id: 13, name: "Typescript", icon: "typescript.png"},
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
            // {id: 4, name: "Playwright", icon: "playwright.png"},
            {id: 5, name: "Photoshop", icon: "photoshop.png"},
            {id: 6, name: "Figma", icon: "figma.png"},
        ]},
        {id: 2, category: "Familiar With", items: [
            {id: 1, name: "Python", icon: "python.png"},
            {id: 0, name: "Arduino", icon: "arduino.png"},
            {id: 2, name: "C", icon: "c.png"},
            {id: 3, name: "C++", icon: "c+.png"},
            {id: 4, name: "Flutter", icon: "flutter.png"},
            {id: 5, name: "Visual Basic", icon: "vb.png"},
            {id: 6, name: "Firebase", icon: "firebase.png"},
        ]}
    ];
export const qualifications = [
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

export const skills = [
    {id: 0, type: "Language", color: "#00a516ff", items: [
        {id: 0, name: "HTML", icon: "html.png"},
        {id: 1, name: "CSS", icon: "css.png"},
        {id: 2, name: "Javascript", icon: "javascript.png"},
        {id: 3, name: "Typescript", icon: "typescript.png"},
        {id: 4, name: "PHP", icon: "php.png"},
        {id: 5, name: "Python", icon: "python.png"},
        {id: 6, name: "Java", icon: "java.png"},
        {id: 7, name: "C++", icon: "c+.png"},
        {id: 8, name: "Visual Basic", icon: "vb.png"},
    ]},
    {id: 1, type: "Framework", color: "#3b82f6", items: [
        {id: 0, name: "VueJS", icon: "vue.png"},
        {id: 1, name: "React", icon: "react.png"},
        {id: 2, name: "NextJS", icon: "next.png"},
        {id: 3, name: "Ionic", icon: "ionic.png"},
        {id: 4, name: "TailwindCSS", icon: "tailwind.png"},
        {id: 5, name: "Vuetify", icon: "vuetify.png"},
        // {id: 6, name: "NodeJS", icon: "ionic.png"},
        {id: 7, name: "Express", icon: "express.png"},
        {id: 8, name: "CodeIgniter", icon: "codeigniter.png"},
    ]},
    {id: 3, type: "Tools", color: "#ad00cfff", items: [
        {id: 0, name: "Git", icon: "git.png"},
        {id: 1, name: "Gitlab", icon: "gitlab.png"},
        {id: 2, name: "Github", icon: "github.png"},
        {id: 3, name: "Postman", icon: "postman.png"},
        {id: 5, name: "Photoshop", icon: "photoshop.png"},
        {id: 6, name: "Figma", icon: "figma.png"},
    ]},
    {id: 2, type: "Other Technologies / Platform", color: "#da6900ff", items: [
        {id: 0, name: "MySQL", icon: "mysql.png"},
        {id: 1, name: "AWS", icon: "aws.png"},
        {id: 2, name: "Firebase", icon: "firebase.png"},
    ]},
]

export const schedule = [
    {id: 0, type: "Rest",    day: "Saturday",   
        start: "10:00:00 AM", end: "02:00:00 PM",
        free_in: "08:00:00 AM", free_out: "05:00:00 PM"},
    {id: 1, type: "Regular", day: "Monday",     
        start: "08:00:00 AM", end: "05:00:00 PM",
        free_in: "07:00:00 PM", free_out: "09:30:00 PM"},
    {id: 2, type: "Regular", day: "Tuesday",    
        start: "08:00:00 AM", end: "05:00:00 PM",
        free_in: "07:00:00 PM", free_out: "09:30:00 PM"},
    {id: 3, type: "Regular", day: "Wednesday",  
        start: "08:00:00 AM", end: "05:00:00 PM",
        free_in: "07:00:00 PM", free_out: "09:30:00 PM"},
    {id: 4, type: "Regular", day: "Thursday",   
        start: "08:00:00 AM", end: "05:00:00 PM",
        free_in: "07:00:00 PM", free_out: "09:30:00 PM"},
    {id: 5, type: "Regular", day: "Friday",     
        start: "08:00:00 AM", end: "05:00:00 PM",
        free_in: "07:00:00 PM", free_out: "09:30:00 PM"},
    {id: 6, type: "Rest",    day: "Sunday",     
        start: "10:00:00 AM", end: "02:00:00 PM",},
]

export function getMyStatus() {
    const currentHours = new Date().getHours();
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

    const currentSchedule = schedule.find(s => s.day === currentDay);

    const endHour = new Date(`1970-01-01T${currentSchedule.end}`).getHours();
    if (currentSchedule.type === "Rest") {
        if(currentSchedule.start <= currentHours && endHour >= currentHours) {
            return "I'm resting";
        }
        return "I'm resting";
    } else if (currentSchedule.start <= currentHours && endHour >= currentHours) {
        return "I'm grinding";
    } else if (currentSchedule.start > currentHours) {
        return "I'm starting my day";
    } else if (endHour <= currentHours && endHour + 2 > currentHours) {
        return "I'm waiting to clock out";
    } else if (endHour <= currentHours) {
        return "I'm having free ";
    }
}

export default getMyStatus

