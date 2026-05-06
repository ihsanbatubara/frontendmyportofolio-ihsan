import React from 'react';
import pictureHero from '../../../assets/developer-pic-1.png';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import lampIcon from '../../../assets/icon/lamp-icon.svg';
import { useQuery } from '@tanstack/react-query';
import { getPublicProfile } from '../../../services/index/users';

const Hero = () => {
    const { data: profileData } = useQuery({
        queryKey: ['public-profile'],
        queryFn: getPublicProfile,
    });

    return (
        <section className="w-full max-w-[1440px] mx-auto px-6 pt-4 md:pt-8 pb-12 md:pb-20 flex flex-col md:flex-row items-center justify-between gap-12 relative">

            {/* Left: Image & Spinning Text */}
            <div className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0 order-2 md:order-1">
                <div className="relative w-full max-w-lg xl:max-w-xl">
                    <img
                        src={pictureHero}
                        alt="Profile"
                        className="w-full h-auto drop-shadow-2xl"
                    />

                    {/* Spinning Badge */}
                    <div className="absolute -bottom-10 -left-10 md:-left-16 w-32 h-32 md:w-40 md:h-40">
                        <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                            <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                            <text className="text-[12px] font-bold uppercase">
                                <textPath href="#circlePath" startOffset="0%">
                                    Web Developer • UI/UX Designer •
                                </textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <a href="https://wa.me/6289502028789?text=Halo,%20apakah%20ini%20saudara%20Tio?" target="_blank" rel="noopener noreferrer" className="w-16 h-16 md:w-20 md:h-20 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold hover:scale-110 transition-transform cursor-pointer border-2 border-transparent hover:border-black hover:bg-white hover:text-black">
                                Hire Me
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Text & Buttons */}
            <div className="w-full md:w-1/2 flex flex-col items-start gap-6 order-1 md:order-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#1a1a1a] capitalize">
                    Building Smart Solutions With Code & Design
                </h1>
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    I am a full-stack developer with experience in web development, AI-based systems, and UI/UX design. I create scalable, responsive, and user-focused applications that solve real-world problems.
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-4">
                    <a
                        href={profileData?.resume || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold text-lg border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all"
                    >
                        Resume <FaExternalLinkAlt className="text-sm" />
                    </a>

                    <a
                        href="https://wa.me/6289502028789"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-lg underline underline-offset-4 decoration-2 hover:text-gray-600 transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>

            {/* Lightbulb Icon (Absolute Bottom Right) */}
            <div className="absolute bottom-10 right-10 hidden lg:block opacity-80 hover:scale-110 transition-transform cursor-pointer animate-pulse w-24 h-24">
                <img src={lampIcon} alt="Lamp Icon" className="w-full h-full object-contain" />
            </div>

        </section>
    );
};

export default Hero;
