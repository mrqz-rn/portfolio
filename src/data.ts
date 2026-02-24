export const jobs = [
    {id: 0, position: 'Systems Developer', company: 'Power Mac Center', start: 'Aug 2025', end: 'Present',
        icon: '/icons/pmc.png', color: '#db0099ff', location: 'Pasig City',
        summary: "I handle the end-to-end development of internal systems from analysis and coding to implementation and support. I collaborate with teams to build scalable, integrated solutions, maintain databases, and create technical documentation while supporting innovation through research and prototyping.",
        details: [
            "Handled the full system development lifecycle: analysis, design, development, testing, and implementation of internal enterprise applications.",
            "Designed and maintained system databases and ensured seamless integration between internal modules and external systems.",
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
    issuer: 'Google/Coursera', issued: '2022', details: ['']   
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

export const works = [
{
  id: 1,
  name: 'Basecamp TMS',
  desc: "Training Monitoring System",
  description: 'A web-based Training Monitoring System designed to streamline the scheduling, tracking, and reporting of training activities across teams. Supports role-based access for Trainers, Supervisors, Managers, Admins, and Directors to manage training records, certifications, and performance analytics.',
  tech: ['Web', 'Vue', 'Laravel', 'MariaDB',  'OTRS Integration', ],
  involvement: ['Design', 'Development', 'Testing', 'Deployment', 'Maintenance'],
  company: "PBSI",
  details: [
    // "As the Main Developer, I owned the project end-to-end — covering system architecture design, full-stack development, technical documentation, staging and production deployment, and ongoing system support.",
    "Built the entire platform with a role-based access control system governing six roles: Trainer, Supervisor, Assistant Supervisor, Manager/Admin, Director, and Guest — each with tailored access to training scheduling, calendar management, documentation, and reporting modules.",
    "Developed a Calendar View module giving each user a role-aware view of their training events, with support for Meetings and Leave entries, team-wide visibility for Supervisors and Managers, and training details displayed directly on each calendar entry.",
    "Designed and built an OTRS integration that automatically transfers customer and client training requests into TMS, allowing Managers to review, approve, and convert them into official training records — eliminating manual re-entry and streamlining the request-to-record workflow.",
    "Key features I developed include a real-time notification engine, an automated Planned → On-Going status transition system, and a trainer qualification engine that validates certifications and availability before allowing assignments.",
    "I also built a reporting and analytics module with PDF, Excel, and CSV exports, integrated Google Drive for training proof submission, and developed a performance and IDP monitoring dashboard for leadership — while maintaining documentation and providing continuous user support throughout."
  ],
  images: ['works/tms/img1.png','works/tms/img2.png','works/tms/img3.png']
},
    {
      id: 0, name: 'SPOTT', desc: "Sterling Paper Online Time Tracker",
      description: 'A mobile application that enables employees to accurately track their working hours. Serves as a digital Daily Time Record (DTR), streamlining time logging for improved efficiency and accuracy.',
      tech: ['Mobile', 'Web', 'Ionic', 'Vue', 'Codeigniter', 'MariaDB'],
      involvement: ['Design', 'Development', 'Production', 'Maintenance'],
      company: "SLAC",
      details: [
        "As the Lead Developer for the SPOTT application, I am responsible for overseeing the development and implementation of key system components. I develop separate, robust RESTful APIs dedicated to handling user data and attendance logs (attlogs), ensuring secure and efficient data storage and retrieval.",
        "I have collaborate closely with the Human Resources team to transition from manual attendance tracking to a fully digitalized timekeeping system. Provide continuous support to SPOTT users, actively gathering feedback, addressing concerns, and resolving issues in a timely manner. Coordinate with stakeholders to ensure that any application adjustments align with organizational goals and user expectations."
      ],
      images: ['works/w1/img1.jpg','works/w1/img2.png','works/w1/img3.png','works/w1/img4.png','works/w1/img5.png','works/w1/img6.png']
    },

    {
      id: 2, name: 'SWFS', desc: "Sterling Workforce System",
      description: 'A modern HRIS and payroll solution built to replace legacy systems. SWFS improves efficiency, accuracy, and user experience in managing employee data, timekeeping, and payroll processes.',
      tech: ['Vue', 'Codeigniter', 'MariaDB'],
      involvement: ['Development', 'Data Migration', 'Production', 'Maintenance'],
      company: "SLAC",
      details: [
        "As a key contributor to the development of the SWFS platform, I led the implementation of several major system modules and optimizations such as Alphalist Generation, BIR Tax Computation, Employee Clearance Processing, Last Pay Computation and more.",
        "Conducted a thorough review and restructuring of data models and business process flows to significantly improve system performance. These enhancements resulted in reduced processing times and improved overall system responsiveness.",
        "Led the migration of legacy data from the old payroll system to the newly designed database structure, ensuring data integrity, consistency, and seamless operation with the new system."
      ],
      images: [
        'works/w3/img1.png',
        'works/w3/img2.png',
        'works/w3/img3.png',
        'works/w3/img4.png',
      ]
    },

    {
      id: 3, name: 'ESS-PORTAL', desc: "Employee Self-Service Portal",
      description: "The ESS Portal is a proposed replacement for the organization's legacy timekeeping and HR request filing system. Built using modern technologies and designed with user experience in mind, this portal will serve as a centralized, self-service platform for employees and HR teams alike.",
      tech: ['Vue', 'Codeigniter', 'MySQL'],
      involvement: ['Development', 'Production', 'Maintenance'],
      company: "SLAC",
      details: [
        "As part of the E-PORTAL system development, I was tasked with implementing the process integration for employee Daily Time Record (DTR) logs in connection with the SPOTT application.",
        "Designed logic to automatically convert raw attendance logs into formatted DTR records for use in HR, payroll, and compliance reporting."
      ],
      images: [
        'works/w4/img1.png',
        'works/w4/img2.png',
     
      ]
    },

    {
      id: 4, name: 'OBS', desc: "Onboarding System",
      description: 'This application is designed to streamline and manage the entire recruitment and onboarding process for Human Resources (HR) departments. It provides a comprehensive platform that facilitates every stage of hiring, from job posting and application submission, all the way through to onboarding new employees.',
      tech: ['Vue', 'Codeigniter', 'MySQL'],
      involvement: ['Design', 'Development'],
      company: "SLAC",
      details: [
        "Restructured the application's data models to align with the organization's hierarchical structure, ensuring seamless integration with the Human Resource and Human Resource Information System (HHRIS). This included mapping positions, departments, and reporting lines accurately across systems.",
        "Redesigned and streamlined various internal workflows within the system to reduce redundancy, improve efficiency, and enhance user experience for recruiters and HR personnel."
      ],
      images: [
        'works/w5/img1.png',
        'works/w5/img2.png',
        'works/w5/img3.png',
      ]
    },

    {
      id: 5, name: 'Asia CEO Forum',
      description: 'The Asia CEO Forum is the premier national business event series in the Philippines, known for its influential gatherings and the annual Asia CEO Awards. It promotes the Philippines as a leading business destination and celebrates regional leadership excellence.',
      tech: ['NextJS', 'NoSQL'],
      involvement: ['Revamp', 'Enhancement'],
      company: "Volenday",
      details: [
        "Participated in the full migration of the existing website to the Next.js framework, leveraging its performance benefits, SEO capabilities, and modern development architecture.",
        "Ensured the original UI layout and design elements were retained to maintain brand consistency, while improving core functionalities for a smoother and more engaging user experience.",
      ],
      images: [
        'works/w6/img1.png',
        'works/w6/img2.png',
      ]
    },
  ];


export const projects = [
    {
      id: 0, name: 'E-Portfolio',
      description: 'A personal website designed to help me showcase my work and achievements in a professional manner online.',
      tech: ['NextJS', 'Tailwind'],
      images: ['project/portfolio/img1.png', 'project/portfolio/img2.png']
    },

    {
      id: 1, name: 'Juala De Amor',
      description: 'IoT-enabled smart cage system designed for pet bird owners who want to ensure optimal care, safety, and comfort for their avian companions.',
      tech: ['Android', 'Arduino', 'Firebase'],
      images: ['project/juala/img1.jpg', 'project/juala/img2.jpg', 'project/juala/img3.jpg', 'project/juala/img3.jpg', 'project/juala/img5.jpg']
    },

    {
      id: 2, name: 'ReCSys',
      description: 'An automated IoT-based smart drying system designed to help users conveniently dry clothes outdoors while protecting them from unpredictable weather conditions such as sudden rain or intense sunlight.',
      tech: ['Android', 'Arduino', 'Firebase'],
      images: ['project/recsys/img1.jpg', 'project/recsys/img2.jpg', 'project/recsys/img3.jpg', 'project/recsys/img4.jpg', 'project/recsys/img5.jpg']
    },

    {
      id: 3, name: 'QuickCharge-Fi',
      description: 'Budget-friendly charging and Wi-Fi solution aimed at students in shared spaces such as libraries, dormitories, study halls, and campus common areas. The system offers rapid device charging ports along with reliable Wi-Fi access, optimized for high user traffic at minimal cost.',
      tech: ['Android', 'Arduino', 'PHP', 'MySQL'],
      images: ['project/quick/img1.jpg', 'project/quick/img2.jpg', 'project/quick/img3.jpg', 'project/quick/img4.jpg', 'project/quick/img5.jpg','project/quick/img6.jpg','project/quick/img7.jpg']
    },

    {
      id: 4, name: 'BlueThunder',
      description: 'An E-commerce website with a CRUD for managging the products. ',
      tech: ['Bootstrap', 'PHP', 'MySQL'],
      images: ['project/bluethunder/img1.jpg', 'project/bluethunder/img2.jpg', 'project/bluethunder/img3.jpg']
    },
    {
      id: 5, name: 'Enrollment System',
      description: 'Simple CRUD application built with Java, featuring a database powered by MS Access. It provides an efficient solution for managing student enrollment data.',
      tech: ['Java', 'MS Access'],
      images: ['project/enroll/img1.png','project/enroll/img2.png','project/enroll/img3.png','project/enroll/img4.png']
    },
    {
      id: 6, name: 'EAITH',
      description: "EAITH is an engaging and challenging word-guessing game designed for play directly on your computer. It's a personalized take on the classic Hangman game, offering a fresh and entertaining twist on the traditional experience",
      tech: ['Java', 'MS Access'],
      images: ['project/eaith/img1.png','project/eaith/img2.png','project/eaith/img3.png']
    },
  ];

export const services = [
        {id: 1, name: 'Software and Development', color: "#2500caff",
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
           {id: 3, name: 'Consultation & Support', color: "#eff300ff",
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
        },
        {id: 2, name: 'Mobile & PC Service', color: "#00a516ff",
            jobs: [
                {id: 0, title: 'Hardware Diagnostics and Repair',
                description: 'Identifying and resolving physical issues with desktops and laptops including hard drives, RAM, motherboards, power supplies, and other components.'},
                {id: 1, title: 'Software Troubleshooting',
                description: 'Detection and resolution of system errors, application malfunctions, and operating system issues.'},
                {id: 2, title: 'OS Installation & Configuration',
                description: '  Fresh installation or reinstallation of operating system, along with driver setup and updates.'},
                {id: 3, title: 'Component Replacement & Upgrades',
                description: 'Replacement or upgrading of internal components such as SSDs, GPUs, CPUs, RAM, and cooling systems to optimize performance.'},
            ]
        },
        
     
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
        {id: 6, name: "Laravel", icon: "laravel.png"},
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
];

export function getMyStatus() {
    const currentHours = new Date().getHours();
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

    if (currentHours >= 23 || currentHours < 6) {
        return "I'm sleeping";
    }

    const currentSchedule = schedule.find(s => s.day === currentDay);
    if (!currentSchedule) return "Status Unknown";

    const startHour = new Date(`1970-01-01T${currentSchedule.start}`).getHours();
    const endHour = new Date(`1970-01-01T${currentSchedule.end}`).getHours();

    if (currentSchedule.type === "Rest") {
        return "I'm resting";
    } else if (startHour <= currentHours && endHour >= currentHours) {
        return "I'm grinding";
    } else if (startHour > currentHours) {
        return "I'm starting my day";
    } else if (endHour <= currentHours && endHour + 2 > currentHours) {
        return "I'm waiting to clock out";
    } else if (endHour <= currentHours) {
        return "I'm having free time";
    }
    return "Status Unknown";
}