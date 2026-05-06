import React from 'react';
import { SiLaravel, SiHtml5, SiCss3, SiJavascript, SiReact, SiNodedotjs, SiFigma, SiMysql, SiMongodb } from 'react-icons/si';

const skillsData = [
  { id: 1, name: 'HTML5', icon: <SiHtml5 size={40} /> },
  { id: 2, name: 'CSS3', icon: <SiCss3 size={40} /> },
  { id: 3, name: 'JavaScript', icon: <SiJavascript size={40} /> },
  { id: 4, name: 'React', icon: <SiReact size={40} /> },
  { id: 5, name: 'Laravel', icon: <SiLaravel size={40} /> },
  { id: 6, name: 'Node.js', icon: <SiNodedotjs size={40} /> },
  { id: 7, name: 'MySQL', icon: <SiMysql size={40} /> },
  { id: 8, name: 'MongoDB', icon: <SiMongodb size={40} /> },
  { id: 9, name: 'UI/UX Design', icon: <SiFigma size={40} /> },
];


const Skills = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 pt-10 pb-20" id="skills">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-down">

          <h2 className="text-4xl md:text-5xl font-black text-black uppercase mb-6 leading-tight">
            Professional <br /> Skills & Expertise
          </h2>
          <p className="text-lg font-medium text-gray-800 leading-relaxed mb-8 max-w-lg">
            I have expertise in Web Development and Android App Development, focusing on creating efficient, scalable, and user-friendly digital solutions using modern technologies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {skillsData.map((skill, index) => (
              <div 
                key={skill.id}
                data-aos="fade-down"
                data-aos-delay={index * 50}
                className="bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all flex flex-col items-center gap-3 group"
              >
                <div className="text-black group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="hidden md:block" data-aos="fade-down">

           <div className="bg-white border-2 border-black p-2 rounded-3xl shadow-[16px_16px_0px_#000]">
              <div className="bg-black rounded-2xl p-12 text-white flex flex-col gap-6">
                 <h3 className="text-3xl font-black italic uppercase">Learning Never Stops</h3>
                 <p className="text-gray-300 font-medium leading-relaxed">
                    I'm constantly exploring new tools and frameworks to stay ahead in the ever-evolving tech landscape.
                 </p>
                 <div className="flex gap-2 mt-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
