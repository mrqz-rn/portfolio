import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar() {
  
    const profile = {
      name: 'RON-RON MARQUEZ',
      position: 'Junior Programmer',
      image: '/icons/user.jpg'
    };
    const info = [
      {id: 1, type: 'email', data: 'test@gmail.com', image: '/icons/mail.png'},
      {id: 2, type: 'phone', data: '09346345234', image: '/icons/phone.png'},
      {id: 3, type: 'location', data: 'Makati City, Philippines', image: '/icons/map.png'},
    ];
    const socials = [
        {id: 1, name: 'Linkedin', image: '/icons/linkedin.png', url: 'https://www.google.com'},
        {id: 2, name: 'Github', image: '/icons/github.png', url: 'https://www.google.com'},
        {id: 3, name: 'Facebook', image: '/icons/facebook.png', url: 'https://www.google.com'},
        {id: 4, name: 'Messenger', image: '/icons/messenger.jpg', url: 'https://www.google.com'},
    ];

    return (
        <div className="min-h-screen w-85 bg-zinc-950 p-2 border-r border-gray-700 font-[montserrat] ">
          <div className='px-10 py-3'>
            <Image
              src={profile.image} width={45} height={45} alt="Responsive Image" layout="responsive"
              className={`rounded-full p-1 border-3 border-blue-900 shadow-md shadow-sky-300/50 hover:border-blue-700 cursor-pointer`}
            />
          </div>
          
          <div className='py-3'>
            <p className="text-center text-xl font-semibold text-blue-50">{profile.name}</p>
            <p className="text-center text-sm font-medium text-gray-300"> {profile.position} </p>
          </div>
          

          <div className="flex justify-center border-y border-gray-700 gap-3 my-3 mb-2 p-2">
            {socials.map((soc) => (
              <Link key={soc.id} href={soc.url} target="_blank" rel="noopener noreferrer">
                <Image src={soc.image} width={45} height={45} alt="Icon"
                  className="rounded-full p-1 cursor-pointer border-2 border-blue-0 duration-150 ease-in-out hover:border-blue-700"/>
              </Link>
            ))} 
          </div>

          <div className='p-2 border-1 rounded-lg border-gray-700 text-base my-8'>
            <p className="text-center text-blue-50 font-semibold py-1">Information</p>
            {info.map((dt) => (
            <div key={dt.id} className="flex items-center py-1 px-1">
              <Image src={dt.image} width={38} height={38} alt="Icon"
                className="p-1 "
              />
              <span className="ml-2 text-sm text-gray-300">{dt.data}</span>
            </div>
            ))}
          </div>
          <div className=' p-2 border border-gray-700 m-2 rounded-lg cursor-pointer text-center'>
            Download CV
          </div>
          {/* <button className="w-60 absolute bottom-0 text-center bg-blue-600 rounded-lg text-white font-semibold p-2 m-2 cursor-pointer
          hover:scale-102 transition-transform duration-300 ease-in-out">Download CV</button> */}
        </div>
    )
}