import React from 'react';
import { images } from '../constants';
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProjectCard = ({ post }) => {
    return (
        <div className="bg-white border-2 border-black rounded-[2rem] p-6 flex flex-col hover:shadow-[10px_10px_0px_#000] transition-all duration-300 w-full h-full shadow-[6px_6px_0px_#000]">
            {/* Image Container */}
            <div className="w-full aspect-video overflow-hidden rounded-2xl border-2 border-black mb-6">
                <img 
                    src={post.photo ? post.photo : images.samplePostImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            {/* Content Area */}
            <div className="flex flex-col flex-grow">
                <span className="text-pink-500 font-bold text-sm mb-2">
                    {post.categories?.[0]?.title || "Website Template"}
                </span>
                <h3 className="text-2xl font-black text-black mb-4 leading-tight">
                    {post.title}
                </h3>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <Link 
                    to={`/projectall/${post.slug}`} 
                    className="text-black font-bold border-b-2 border-black hover:pb-1 transition-all"
                >
                    Visit
                </Link>
                <a 
                    href={post.github || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl text-black hover:scale-110 transition-transform"
                >
                    <FaGithub />
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
