import React from 'react';
import pictureAbout from '../../../assets/about.png';
import { useQuery } from '@tanstack/react-query';
import { getAllExperiences } from '../../../services/index/experiences';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';

const About = () => {
  const { data: experiences, isLoading, isError } = useQuery({
    queryKey: ['experiences'],
    queryFn: getAllExperiences,
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-10" id="about">

      {/* Huge Heading */}
      <div className="w-full flex justify-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1a1a1a] uppercase tracking-tight text-center">
          Passion Fuels Purpose!
        </h2>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">

        {/* Left: Biography */}
        <div className="flex flex-col gap-6 text-[#1a1a1a] order-2 md:order-1">
          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-500">
            Biography
          </h3>
          <div className="flex flex-col gap-4 text-base font-medium leading-relaxed text-gray-800">
            <p>
              Hi, I'm <span className="font-bold">Tio Fulalo</span>, a Bachelor of Informatics Engineering graduate with a strong passion for technology and digital innovation. I specialize in web and mobile application development, including AI-based solutions, and have hands-on experience with modern development tools and frameworks.
            </p>
            <p>
              I have contributed to multiple real-world projects, such as building responsive company profile websites, developing web-based health screening systems, and supporting IT infrastructure and digitalization initiatives. My expertise includes UI/UX design, full-stack development (using MySQL and MongoDB for database management), and data visualization, ensuring that every product is both functional and user-centered.
            </p>

            <p>
              I believe that great digital products are not just visually appealing, but also solve real problems efficiently. With a strong understanding of the software development life cycle and a commitment to continuous learning, I strive to create impactful and innovative solutions.
            </p>
          </div>
        </div>

        {/* Center: Brutalist Profile Card */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="relative -translate-x-3 md:translate-x-0">


            {/* The Hard Shadow Background */}
            <div className="absolute top-4 left-4 w-full h-full bg-black rounded-3xl -z-10"></div>
            {/* The Main Card */}
            <div className="bg-white p-6 border-2 border-black rounded-3xl w-full max-w-sm">
              <img
                src={pictureAbout}
                alt="Profile"
                className="w-full h-auto rounded-2xl object-cover aspect-[4/5] bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-8 md:gap-16 text-center md:text-right order-3 md:order-3 w-full md:h-full">
          <div className="flex flex-col flex-1 md:flex-none">
            <span className="text-4xl md:text-8xl font-black text-[#1a1a1a]">3+</span>
            <span className="text-xs md:text-lg font-bold text-gray-500 uppercase tracking-tight md:tracking-normal">Internships / Experience</span>
          </div>
          <div className="flex flex-col flex-1 md:flex-none">
            <span className="text-4xl md:text-8xl font-black text-[#1a1a1a]">10+</span>
            <span className="text-xs md:text-lg font-bold text-gray-500 uppercase tracking-tight md:tracking-normal">Projects Completed</span>
          </div>
          <div className="flex flex-col flex-1 md:flex-none">
            <span className="text-4xl md:text-8xl font-black text-[#1a1a1a]">2+</span>
            <span className="text-xs md:text-lg font-bold text-gray-500 uppercase tracking-tight md:tracking-normal">Years Experience</span>
          </div>
        </div>

      </div>

      {/* Experience Section */}
      <div className="mt-32 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-black text-[#1a1a1a] mb-16 text-center">
          Experience
        </h2>

        <div className="flex flex-col">
          {isLoading ? (
            <div className="flex flex-col gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-3xl"></div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-500 font-bold">Failed to load experiences.</div>
          ) : (
            experiences?.map((exp, index) => (
              <div key={exp._id || index} className="flex gap-6 md:gap-12 group">
                {/* Left: Timeline Line & Node */}
                <div className="flex flex-col items-center relative">
                  <div className="w-1 bg-black h-full group-last:h-12"></div>
                  <div className="absolute top-2 w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center z-10 shadow-[4px_4px_0px_#000]">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: exp.color || "#EA4C89" }}
                    ></div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="pb-16 flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {exp.title} <span style={{ color: exp.color || "#EA4C89" }}>@{exp.company}</span>
                  </h3>
                  <p className="text-gray-500 font-bold mt-1">
                    {exp.startDate} - {exp.endDate} | {exp.location}
                  </p>
                  <p className="mt-4 text-gray-800 font-medium leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default About;

