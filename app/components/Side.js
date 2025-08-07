'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BorderBeam } from "./lightswind/border-beam"
import { GradientButton } from './lightswind/gradient-button'
import { getMyStatus } from '../scripts/app-data'

export default function Side() {
    const profile = {
        name: 'RON-RON MARQUEZ',
        position: 'System Developer Specialist',
        image: '/icons/user.jpg'
      };
      const info = [
        {id: 1, type: 'email', data: 'marquez.ronrons@gmail.com', image: '/icons/mail.png'},
        {id: 2, type: 'phone', data: '09487228657', image: '/icons/phone.png'},
        {id: 3, type: 'location', data: 'Antipolo City, Philippines', image: '/icons/map.png'},
      ];
      const socials = [
          {id: 1, name: 'Linkedin', image: '/icons/linkedin.png', url: 'https://www.linkedin.com/in/ronmarquez/'},
          {id: 2, name: 'Github', image: '/icons/github.png', url: 'https://github.com/mrqz-rn'},
          {id: 3, name: 'Facebook', image: '/icons/facebook.png', url: 'https://www.facebook.com/m.ron.ron13/'},
          {id: 4, name: 'Messenger', image: '/icons/messenger.jpg', url: 'https://m.me/m.ron.ron13'},
      ];
      const box = {
        width: 100,
        height: 100,
        backgroundColor: "#9911ff",
        borderRadius: 5,
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume/Resume.pdf';
        link.download = 'Ron Marquez Resume.pdf';
        link.click();

    };
    return (
        <>
        
            <div className="flex flex-col justify-between h-full">
                <div className='pb-4 md:pb-0'>
                    <div className=" h-full pt-4">
                        <div className='flex justify-center rounded-full relative w-45 h-45 mx-auto'>
                            <Image
                            src={profile.image} width={800} height={800} alt="Responsive Image" 
                            className={` w-45
                            rounded-full p-1 border-2 border-green-900 hover:border-green-700 cursor-pointer`}/>
                               <BorderBeam
                                size={100}
                                duration={2}
                                delay={0}
                                colorFrom="#006811ff"
                                colorTo="#00d400ff"
                                reverse={false}
                                borderThickness={10}
                                opacity={1}
                                glowIntensity={6}
                                beamBorderRadius={72}
                                pauseOnHover={false}
                                speedMultiplier={1}
                                />
                        </div>
                        <div className='py-4'>
                            <p className="text-center text-xl font-semibold text-blue-50 white--text">{profile.name}</p>
                            <p className="text-center text-base font-medium text-gray-300 gray--text">&lt; {profile.position} /&gt;</p>
                            <p className='white--text text-sm flex justify-center gray--text pt-4'>
                                <span className="wave text-2xl">👋🏼</span> <span className='content-center'>Open for part-time, service and commision</span>
                            </p>
                          
                        </div>
                     
                       
                            
                    </div>
                    
                </div>
             
                <div className='py-4 md:py-0'>
                    <div className="flex p-2 border-y border-gray-700 ">
                        {socials.map((soc) => (
                            <div key={soc.id} className="grow flex justify-center scale-100  duration-150 ease-in-out active:scale-95 ">
                                <Link key={soc.id} href={soc.url} target="_blank" rel="noopener noreferrer" className=''>
                                    <Image src={soc.image} width={50} height={50} alt="Icon" 
                                        className="w-14 md:w-12 p-1 rounded-full cursor-pointer border-2 border-blue-0 duration-150 ease-in-out hover:border-blue-700"/>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='p-6 md:p-2'>
                 
                    <div className='relative p-1 rounded-lg overflow-hidden border-1 border-gray-700 px-2 text-base'>
                        <p className="text-center text-blue-50 font-semibold py-1 white--text">Information</p>
                        {info.map((dt) => (
                        <div key={dt.id} className="flex items-center py-1 px-1">
                            <Image src={dt.image} width={38} height={38} alt="Icon"
                            className="p-1 "
                            />
                            <span className="ml-2 text-sm text-gray-300 break-words md:truncate md:w-[220px] gray--text">{dt.data}</span>
                        </div>
                        ))}
                    </div>
                </div>
            
                <div className='p-6 md:p-2 '>
                <GradientButton className="hover:scale-102 cursor-pointer duration-150 ease-in-out active:scale-95 w-full" 
                variant="ghost" size="sm" animationSpeed={2} glowEffect={true} glowSize={4}
                gradientColors={['#0034dfff', '#0027d3ff', '#000ed6ff', '#0b00a5ff', '#003bddff', '#1222fdff', '#002cbdff']}
                onClick={downloadResume}>
                    Download CV
                </GradientButton>
                </div>
            </div>
            
        </>
    )
}