import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../../services/index/posts'
import { toast } from 'react-toastify'
import ErrorMessage from '../../../components/ErrorMessage'
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom'
import ProjectCard from "../../../components/ProjectCard";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import Pagination from "../../../components/Pagination";

import FeaturedProjectCard from "../../../components/FeaturedProjectCard";

const Articles = () => {
    const { pathname } = useLocation();
    const isProjectPage = pathname === "/project";
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError, isFetching } = useQuery({
        queryFn: () => getAllPosts("", currentPage, isProjectPage ? 6 : 7),
        queryKey: ["posts", currentPage, isProjectPage],
        onError: (error) => {
            toast.error(error.message);
            console.log(error)
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    // In project page, we might want to handle the featured post differently
    // but the user wants to "keep the look".
    // On page 1, we show 1 featured + 5 grid.
    // On page 2+, we could show 6 grid.
    const featuredPost = currentPage === 1 ? data?.data?.[0] : null;
    const gridPosts = currentPage === 1 ? data?.data?.slice(1) : data?.data;

    const totalPostsCount = parseInt(data?.headers?.["x-totalcount"] || "0");
    const totalPageCount = Math.ceil(totalPostsCount / (isProjectPage ? 6 : 7));

    return (
        <section className="w-full bg-[#f8f8f8] py-24 px-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                {/* Header Area */}
                <div className="w-full text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-black uppercase mb-6 leading-tight">Imagination Trumps <br />Knowledge</h2>
                </div>


                {/* Featured Project - Only on Page 1 or if not on project page */}
                {!isLoading && featuredPost && (
                    <FeaturedProjectCard post={featuredPost} />
                )}

                {/* Grid for Other Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mb-20">
                    {isLoading || isFetching ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="w-full h-[500px]">
                                <ArticleCardSkeleton />
                            </div>
                        ))
                    ) : isError ? (
                        <div className="col-span-full">
                            <ErrorMessage message="Couldn't fetch the posts data" />
                        </div>
                    ) : (
                        gridPosts?.map((post) => (
                            <ProjectCard
                                key={post._id}
                                post={post}
                            />
                        ))
                    )}
                </div>

                {/* Pagination or More Projects Button */}
                {isProjectPage ? (
                    <Pagination
                        onPageChange={(page) => setCurrentPage(page)}
                        currentPage={currentPage}
                        totalPageCount={totalPageCount}
                    />
                ) : (
                    <Link
                        to="/project"
                        className="group flex items-center gap-4 bg-yellow-300 text-black px-10 py-5 rounded-3xl font-black text-xl border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase tracking-widest active:scale-95"
                    >
                        <span>Explore All Works</span>
                        <FaArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                )}
            </div>
        </section>
    );
};


export default Articles;
