import React from 'react';
import { images } from '../constants';
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FeaturedProjectCard = ({ post }) => {
    return (
        <div className="w-full bg-white border-2 border-black rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-[6px_6px_0px_#000] md:shadow-[12px_12px_0px_#000] hover:shadow-[10px_10px_0px_#000] md:hover:shadow-[16px_16px_0px_#000] transition-all duration-500 mb-20 group">
            {/* Image Container */}
            <div className="w-full md:w-1/2 aspect-video overflow-hidden rounded-2xl border-2 border-black">
                <img 
                    src={post?.photo ? post?.photo : images.samplePostImage} 
                    alt={post?.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Content Area */}
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                <span className="text-pink-500 font-bold text-lg mb-4 block uppercase tracking-widest">
                    Featured Project
                </span>
                <h3 className="text-4xl md:text-5xl font-black text-black mb-6 leading-[1.1]">
                    {post?.title}
                </h3>
                <p className="text-gray-600 font-bold text-lg mb-10 leading-relaxed max-w-xl">
                    {post?.caption || "A feature-rich application using modern web technologies. Explore the details to see what makes this project special."}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <a 
                        href={post?.github || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-4xl text-black hover:scale-110 transition-all hover:rotate-12"
                    >
                        <FaGithub />
                    </a>
                    <Link 
                        to={`/projectall/${post?.slug}`} 
                        className="bg-black text-white px-10 py-4 rounded-2xl font-black text-lg border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
                    >
                        Visit Project
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjectCard;
