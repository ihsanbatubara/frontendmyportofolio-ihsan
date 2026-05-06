import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Transition from '../../components/Transition';
import { FaAward, FaExternalLinkAlt, FaCalendarAlt, FaBuilding } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getAllCertificates } from '../../services/index/certificates';
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton';
import Pagination from '../../components/Pagination';

const CertificatesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: certData, isLoading, isError, isFetching } = useQuery({
    queryKey: ['certificates', currentPage],
    queryFn: () => getAllCertificates("", currentPage, 6),
  });

  const totalPostsCount = parseInt(certData?.headers?.["x-totalcount"] || "0");
  const totalPageCount = Math.ceil(totalPostsCount / 6);

  return (
    <MainLayout>
      <section className="bg-[#f8f8f8] min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <div data-aos="fade-down" className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tighter leading-tight mb-6">
              Certifications & <br /> Achievements
            </h1>
            <p className="text-xl font-bold text-gray-500 max-w-2xl mx-auto leading-relaxed">
              A collection of my professional certifications, honors, and academic achievements that validate my expertise.
            </p>
          </div>

          {/* Certificates Grid */}
          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-[400px]">
                  <ArticleCardSkeleton />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-500 font-bold py-20">
              Failed to load certificates.
            </div>
          ) : certData?.data?.length === 0 ? (
            <div className="text-center text-gray-400 font-bold py-20">
              No certificates found.
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
                    {/* Certificate Image/Thumbnail */}
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
                      
                      <h3 className="text-2xl font-black text-black leading-tight group-hover:text-yellow-500 transition-colors uppercase">
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
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={totalPageCount}
                />
              )}
            </div>
          )}

          {/* Bottom CTA */}
          <div data-aos="fade-down" className="mt-32 text-center">
            <div className="bg-yellow-300 border-4 border-black p-12 rounded-[50px] shadow-[16px_16px_0px_#000] inline-block max-w-3xl">
               <h2 className="text-3xl md:text-5xl font-black text-black uppercase mb-6 leading-tight">
                  Ready to start a <br /> New project?
               </h2>
               <p className="text-lg font-bold text-black/70 mb-10">
                  I'm always open to discussing new opportunities and challenges.
               </p>
               <a 
                  href="/contact"
                  className="inline-block bg-black text-white font-black uppercase px-12 py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98]"
               >
                  Contact Me Now
               </a>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Transition(CertificatesPage);
