import React from "react";
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../../services/index/posts'
import { toast } from 'react-toastify'
import ErrorMessage from '../../../components/ErrorMessage'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import ProjectCard from "../../../components/ProjectCard";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";

const Articles = () => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts("", 1, 6),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error)
        }
    });

    return (
        <section className="flex flex-col container mx-auto px-5 py-10">
            <div className='myproject' id='projects'>
                <div className="containers">
                    <h2 className='section-title'>Projects</h2>
                    <div className="all-items">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <ArticleCardSkeleton key={index} />
                            ))
                        ) : isError ? (
                            <ErrorMessage message="Couldn't fetch the posts data" />
                        ) : (
                            data?.data.map((post) => (
                                <ProjectCard
                                    key={post._id}
                                    post={post}
                                    className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Link
                to="/projectall"
                className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
            >
                <span>More Projects</span>
                <FaArrowRight className="w-3 h-3" />
            </Link>
        </section>
    );
};

export default Articles;
