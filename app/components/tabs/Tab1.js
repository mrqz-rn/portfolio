

export default function Tab1() {
    const jobs = [
        {id: 1, position: 'Lorem ipsum', company: 'Lorem ipsum', start: 'Jan 2024', end: 'Dec 2025',
            details: [
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
            ]    
        },
        {id: 2, position: 'Lorem ipsum', company: 'Lorem ipsum', start: 'Jan 2024', end: 'Dec 2025',
            details: [
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
            ]    
        },
        {id: 3, position: 'Lorem ipsum', company: 'Lorem ipsum', start: 'Jan 2024', end: 'Dec 2025',
            details: [
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.',
            ]    
        },
    ];
return(
    <div className="max-h-[86vh] overflow-y-scroll custom-scrollbar">
        <h3 className="text-lg font-bold border-b border-gray-700 py-2">Lorem ipsum</h3>
        <div className="py-2">
            <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, quibusdam.
            </p>
        </div>

        <h3 className="text-lg font-bold border-b border-gray-700 py-2">Lorem ipsum</h3>
        <div className="py-2">
            {jobs.map((job) => (
                <div key={job.id} className="mb-2">
                    <div>
                        <p className="text-base font-semibold">{job.position}</p>
                        <p className="text-base ">{job.company}  |  {job.start} - {job.end}</p>
                    </div>
                    <div>
                    {job.details.map((detail, idd) => (
                        <p key={`dt`+idd} className="text-sm">
                            • {detail}
                        </p>

                    ))}
                   </div>
                    
                </div>
            ))}
        </div>
      
  </div>
)
}