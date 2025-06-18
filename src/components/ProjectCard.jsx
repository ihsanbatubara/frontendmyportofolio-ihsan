import React from 'react';
import { images, stables } from '../constants'
import { FaGithub, FaGlobe } from "react-icons/fa";

const ProjectCard = ({ post }) => {
    return (
        <>
            <div className="items" data-aos="fade-up">
                <div className="left">
                    <div className="img-project">
                        <img src={
                            post.photo
                                ? post.photo
                                : images.samplePostImage
                        } alt="title" />
                    </div>
                </div>
                <div className="rights">
                    <h2 className="project-title"> {post.title}</h2>
                    <p className="project-desc">{post.caption}</p>
                    <div className="buttons">
                        <a href={`${post.github}`} className="primary-btns">
                            <FaGithub className="mr-2" /> Github
                        </a>
                        <a href={`${post.demo}`} className="primary-btns">
                            <FaGlobe className="mr-2" /> Demo
                        </a>
                        <a href={`/projectall/${post.slug}`} className="primary-btns outline external-link">
                            <span>Preview</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {/* ))} */}
        </>
    );
};

export default ProjectCard;
