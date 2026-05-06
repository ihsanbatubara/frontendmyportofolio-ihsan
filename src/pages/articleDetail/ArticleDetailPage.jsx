import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import BreadCrumbs from "../../components/BreadCrumbs";
import CommentsContainer from "../../components/comments/CommentsContainer";
import MainLayout from "../../components/MainLayout";
import SocialShareButtons from "../../components/SocialShareButtons";
import { images, stables } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import parseJsonToHtml from "../../utils/parseJsonToHtml";
import Editor from "../../components/editor/Editor";

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Project", link: "/project" },
        { name: "Project title", link: `/project/${data.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="bg-[#f8f8f8] min-h-screen py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
            
            <article className="flex-1 bg-white border-4 border-black rounded-[40px] p-6 md:p-12 shadow-[16px_16px_0px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="mb-8">
                <BreadCrumbs data={breadCrumbsData} />
              </div>

              {/* Main Project Image */}
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-[32px] -z-10"></div>
                <img
                  className="rounded-[32px] w-full border-4 border-black object-cover aspect-video"
                  src={data?.photo ? data?.photo : images.samplePostImage}
                  alt={data?.title}
                />
              </div>

              {/* Category Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                {data?.categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/project?category=${category.name}`}
                    className="bg-yellow-300 border-2 border-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* Project Title */}
              <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter leading-tight mb-10">
                {data?.title}
              </h1>

              {/* Content / Editor */}
              <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-p:font-medium prose-p:text-gray-700">
                {!isLoading && !isError && (
                  <Editor content={data?.body} editable={false} />
                )}
              </div>

              {/* Action Buttons (Github/Demo if available in metadata?) */}
              {/* Assuming Github/Demo links might be in the project body or we could add them if they were in the data object */}

              {/* Comments Section */}
              <div className="mt-20 border-t-4 border-black pt-16">
                <h3 className="text-3xl font-black text-black uppercase tracking-tight mb-10">Feedback & Comments</h3>
                <CommentsContainer
                  comments={data?.comments}
                  className="mt-10"
                  logginedUserId={userState?.userInfo?._id}
                  postSlug={slug}
                />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex flex-col gap-10">
              {/* Share Card */}
              <div className="bg-white border-4 border-black rounded-[32px] p-8 shadow-[8px_8px_0px_#000]">
                <h2 className="text-xl font-black text-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">
                  Share This
                </h2>
                <SocialShareButtons
                  url={encodeURI(window.location.href)}
                  title={encodeURIComponent(data?.title)}
                />
              </div>

              {/* Suggested Posts Card */}
              <div className="bg-white border-4 border-black rounded-[32px] p-4 shadow-[8px_8px_0px_#000] overflow-hidden">
                <SuggestedPosts
                  header="More Projects"
                  posts={postsData?.data}
                  tags={data?.tags}
                  className="w-full"
                />
              </div>
            </aside>
          </div>
        </section>
      )}
    </>
  );
};

export default ArticleDetailPage;
