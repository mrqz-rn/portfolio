

export default function Tab1() {
    const summary = 'Resourceful and results-driven Junior Developer with hands-on experience in full-stack web development, systems enhancement, and technical support. Proven ability to identify and solve complex bugs, streamline business processes through custom web applications, and collaborate with cross-functional teams to meet user needs. Skilled in agile development, responsive design, and API integration. Strong communicator with the ability to convey technical concepts to both technical and non-technical audiences. Also brings a solid background in hardware troubleshooting and customer service, demonstrating versatility and a problem-solving mindset across various roles.';
    const jobs = [
        {id: 1, position: 'Junior Programmer', company: 'SL Agritech Corporation', start: 'July 2023', end: 'Present',
            details: [
                'Demonstrated strong problem-solving skills by identifying and fixing bugs in existing system, and implementing enhancements that significantly improve functionality and performance.',
                'Employed agile methodologies to manage project timelines and deliverables, ensuring successful completion of development projects.',
                'Led the design and development of web applications aimed at streamlining company business process enabling all personnel to efficiently work and manage their work process in the system.',
                'Actively collaborated with end-users to gather insights and understand their requirements for change or modifications to existing programs ensuring that user needs were met effectively.',
                'Demonstrated effective communication skills in presenting and explaining technical concept to both technical and non-technical stakeholders.',

            ]    
        },
        {id: 2, position: 'Web Developer Intern', company: 'Volenday Philippines Inc.', start: 'Feb 2023', end: 'April 2023',
            details: [
                'Developed well-structured, responsive web applications optimized for seamless user experience across desktop and mobile devices.',
                'Integrated APIs and database-driven content, enabling efficient data retrieval and real-time updates.',
                'Actively participated in team meetings and sprint discussions to track progress, provide updates, and contribute to problem-solving and project improvements.',
            ]    
        },
        {id: 3, position: 'Freelance Technician', company: 'Part-time', start: 'May 2019', end: 'Present',
            details: [
                'Provide installation and setup of computer systems, software applications and peripherals.',
                'Diagnose and repaired hardware and software issues, upgrade and replaced defective or outdated component such as RAM, storage drives, lcd screens, battery, etc.',
            ]    
        },
        {id: 4, position: 'Dining Service Crew', company: 'Jolibee Foods Corp.', start: 'May 2019', end: 'April 2020',
            details: [
                'Served and assist customers with their orders, and maintained cleanliness of the dining area',
            ]    
        },
    ];
    const education = [
        {id: 1, degree: 'Bachelor of Science in Computer Engineering', 
        school: 'Rizal Technological University', start: '2019', end: '2023',
            details: [
                "Dean's Lister 4rd Year First Semester", 
                "Dean's Lister 3rd Year Second Semester",
                "Dean's Lister 3rd Year First Semester ",
                "Academic Achiever 2nd Year Second Semester",
            ]    
        },
        {id: 2, degree: 'TVL - Computer Programming', 
        school: 'Antipolo City Senrior High School', start: '2017', end: '2019',
            details: [
                'Member of Student Academic Council', 
                'Computer Programming Strand Representative',
                'Outstanding Club Organization Achievement',
                'Outstanding Performance in Computer Programming'
            ]    
        },
    ];
    const certs = [
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
return(
    <div className="h-[92vh] overflow-y-auto custom-scrollbar px-8">
        <h3 className="text-lg font-bold border-b border-gray-700 py-2">Career Summary</h3>
        <div className="py-2">
            <p className="text-base text-justify">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {summary}</p>
        </div>

        <h3 className="text-lg font-bold border-b border-gray-700 py-2">Experience</h3>
        <div className="py-2">
            {jobs.map((job) => (
                <div key={job.id} className="mb-3">
                    <div>
                        <p className="text-base font-semibold">{job.position}</p>
                        <p className="text-base">{job.company}  |  {job.start} - {job.end}</p>
                    </div>
                    <div>
                    {job.details.map((detail, idd) => (
                        <p key={`dt`+idd} className="text-sm pt-1 px-6 text-justify">
                            • {detail}
                        </p>

                    ))}
                   </div>
                    
                </div>
            ))}
        </div>
      
        <h3 className="text-lg font-bold border-b border-gray-700 py-2">Education</h3>
        <div className="py-2">
         {education.map((educ) => (
             <div key={educ.id} className="mb-3">
                <div>
                    <p className="text-base font-semibold">{educ.degree}</p>
                    <p className="text-base">{educ.school}  |  {educ.start} - {educ.end}</p>
                </div>
                <div>
                {educ.details.map((detail, idd) => (
                    <p key={`dt`+idd} className="text-sm pt-1 px-6 text-justify">
                        • {detail}
                    </p>
                ))}
                </div>
                
            </div>
         ))}
        </div>

        <h3 className="text-lg font-bold border-b border-gray-700 py-2">Certifications</h3>
        <div className="py-2">
         {certs.map((cert) => (
             <div key={cert.id} className="mb-3">
                <div>
                    <p>
                        <span className="text-base font-semibold">{cert.title} </span>
                        <span className="text-base">| {cert.issuer} - {cert.issued}</span>
                    </p>
                </div>
            </div>
         ))}
        </div>
  </div>
)
}