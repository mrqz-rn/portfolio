import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect } from 'react';


export default function Tab1() {
    const summary = 'A Programmer with hands-on experience in full-stack web development, system optimization, and technical support. Skilled in debugging, building user-focused web applications, and working with cross-functional teams. Proficient in Agile practices, API integration, and responsive design. Strong communicator with a background in hardware troubleshooting and customer service.'
    const jobs = [
        {id: 1, position: 'Programmer', company: 'SL Agritech Corporation', start: 'July 2023', end: 'June 2025',
          icon: '/icons/Slac.png',
            details: [
                'Designed, developed, and maintained enterprise software applications, including enhancements to legacy systems.',
                'Led the end-to-end development of new internal applications to streamline company operations and workflows.',
                'Collaborate with cross-functional teams (HR, Accounting, etc.) to identify system requirements, resolve issues, and optimize user experience.',
                'Delivered technical support and system troubleshooting to ensure business continuity and operational efficiency.',
                'Actively contributed to Agile development cycles, leveraging Scrum and Kanban methodologies to ensure timely and high-quality delivery.',

            ]    
        },
        {id: 2, position: 'AHAmatic Engineer Intern', company: 'Volenday Philippines Inc.', start: 'Feb 2023', end: 'April 2023',
            icon: '/icons/Volenday.png',
            details: [
                'Developed well-structured, responsive web applications optimized for seamless user experience across desktop and mobile devices.',
                'Integrated APIs and database-driven content, enabling efficient data retrieval and real-time updates.',
                'Actively participated in team meetings and sprint discussions to track progress, provide updates, and contribute to problem-solving and project improvements.',
            ]    
        },
        {id: 3, position: 'Freelance Technician', company: 'Part-time', start: 'May 2019', end: 'Present',
            icon: '/icons/person.png',
            details: [
                'Provide installation and setup of computer systems, software applications and peripherals.',
                'Diagnose and repaired hardware and software issues, upgrade and replaced defective or outdated component such as RAM, storage drives, lcd screens, battery, etc.',
            ]    
        },
        {id: 4, position: 'Dining Service Crew', company: 'Jolibee Foods Corp.', start: 'May 2019', end: 'April 2020',
            icon: '/icons/jb.png',
            details: [
                'Served and assist customers with their orders, and maintained cleanliness of the dining area',
            ]    
        },
    ];
    const education = [
        {id: 1, degree: 'Bachelor of Science in Computer Engineering', 
        school: 'Rizal Technological University', start: '2019', end: '2023', icon: '/icons/rtu.png',
            details: [
                "Dean's Lister 4rd Year First Semester", 
                "Dean's Lister 3rd Year Second Semester",
                "Dean's Lister 3rd Year First Semester ",
                "Academic Achiever 2nd Year Second Semester",
            ]    
        },
        {id: 2, degree: 'TVL - Computer Programming', 
        school: 'Antipolo City Senrior High School', start: '2017', end: '2019',  icon: '/icons/acshs.png',
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

        useEffect(() => {
            const dates = document.querySelectorAll('.vertical-timeline-element-date');
            dates.forEach((el) => el.remove()); // Remove all date spans after render
          }, []);
return(
    <div className="px-6 md:px-14">
        <h3 className="text-base font-bold border-b border-gray-700 py-2 white--text">CAREER SUMMARY</h3>
        <div className="py-2 px-8">
            <p className="text-sm text-justify white--text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {summary}</p>
        </div>

        <h3 className="text-base font-bold border-b border-gray-700 pb-2 py-4 white--text">EXPERIENCE</h3>
            <VerticalTimeline layout='1-column-left' 
            lineColor='#6c63ff'
             className='verticalTimeline' style={{padding: '1rem 0'}}>
              {jobs.map((item, index) => (
                <VerticalTimelineElement
                  key={index}
                  contentArrowStyle={{ borderRight: '7px solid  #18181b' }}
                  contentStyle={{ background: '#18181b', color: '#fff' }}
                  iconStyle={{ background: '#6c63ff', color: 'red' }}
                   icon={
                    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100%',width: '100%',
                      overflow: 'hidden',borderRadius: '50%',background: '#fff'}}>
                      <img
                        src={item.icon}
                        alt="icon"
                        style={{width: '100%', height: '100%', objectFit: 'contain', }}
                      />
                    </div>
                  }
                >
                                       
                  <div className='flex justify-between'>
                  <h3 className="text-normal font-semibold ">{item.position}</h3>
                  <h3>{item.start} - {item.end}</h3>
                  </div>

                  <h4 className="vertical-timeline-element-subtitle">{item.company}</h4>
                    <div>
                    {item.details.map((detail, idd) => (
                      <div key={`dt`+idd} className=''>
                        <span className="px-2 text-sm italic text-justify white--text font-normal">
                            • {detail}
                        </span>
                      </div>
                    ))}
                   </div>
                  <p>{item.description}</p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
      
        <h3 className="text-base font-bold border-b border-gray-700 py-2 white--text">EDUCATION</h3>
          <VerticalTimeline layout='1-column-left'  className='verticalTimeline' style={{padding: '1rem 0'}}>
              {education.map((item, index) => (
                <VerticalTimelineElement
                  key={index}
                  contentArrowStyle={{ borderRight: '7px solid  #18181b' }}

                  contentStyle={{ background: '#18181b', color: '#fff' }}
                  iconStyle={{ background: '#6c63ff', color: 'red' }}
                   icon={
                    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100%',width: '100%',
                      overflow: 'hidden',borderRadius: '50%',background: '#fff'}}>
                      <img
                        src={item.icon}
                        alt="icon"
                        style={{width: '100%', height: '100%', objectFit: 'contain', }}
                      />
                    </div>
                  }
                >
                                       
                  <div className='flex justify-between'>
                  <h3 className="text-normal font-semibold ">{item.degree}</h3>
                  <h3>{item.start} - {item.end}</h3>
                  </div>

                  <h4 className="vertical-timeline-element-subtitle">{item.school}</h4>
                    <div>
                    {item.details.map((detail, idd) => (
                      <div key={`dt`+idd} className=''>
                        <span className="px-2 text-sm italic text-justify white--text font-normal">
                            • {detail}
                        </span>
                      </div>
                    ))}
                   </div>
                  <p>{item.description}</p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
        

        <h3 className="text-base font-bold border-b border-gray-700 py-2 white--text">CERTIFICATIONS</h3>
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