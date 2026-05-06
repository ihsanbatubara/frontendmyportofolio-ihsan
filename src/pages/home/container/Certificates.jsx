import React, { useState, useEffect } from 'react';
import { FaAward, FaExternalLinkAlt, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getAllCertificates } from '../../../services/index/certificates';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';
import Pagination from '../../../components/Pagination';

const Certificates = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: certData, isLoading, isError, isFetching } = useQuery({
    queryKey: ['certificates', currentPage],
    queryFn: () => getAllCertificates("", currentPage, 6),
  });

  // Calculate total pages from headers
  const totalPostsCount = parseInt(certData?.headers?.["x-totalcount"] || "0");
  const totalPageCount = Math.ceil(totalPostsCount / 6);

  useEffect(() => {
    // Optional: Scroll to top of section when page changes
  }, [currentPage]);

  return (
    <div className="mt-15">
      <h2 data-aos="fade-down" className="text-5xl md:text-8xl font-black text-[#1a1a1a] mb-16 text-center uppercase tracking-tighter">
        Certificates
      </h2>

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-[400px]">
              <ArticleCardSkeleton />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 font-bold">
          Failed to load certificates.
        </div>
      ) : certData?.data?.length === 0 ? (
        <div className="text-center text-gray-400 font-bold">
          No certificates added yet.
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full mb-16">
            {certData?.data?.map((cert, index) => (
              <div
                key={cert._id}
                data-aos="fade-down"
                data-aos-delay={index * 100}
                className="group relative bg-white border-4 border-black rounded-[40px] p-6 shadow-[12px_12px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all overflow-hidden"
              >
                {/* Image Thumbnail */}
                <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden border-2 border-black mb-6 bg-gray-50">
                  {cert.photo ? (
                    <img
                      src={cert.photo}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaAward className="text-gray-200 text-6xl" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaAward className="text-yellow-300 text-6xl drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
                      Verified
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-black leading-tight group-hover:text-yellow-500 transition-colors uppercase">
                    {cert.title}
                  </h3>

                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                      <FaBuilding className="text-black" />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                      <FaCalendarAlt />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center gap-3 bg-black text-white font-black uppercase py-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98]"
                    >
                      View Credential <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPageCount > 1 && (
            <div className="mt-8">
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={totalPageCount}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Certificates;
