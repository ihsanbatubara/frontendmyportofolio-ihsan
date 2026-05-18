import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-20 pb-10 px-6 border-t-8 border-black overflow-hidden relative">
      {/* Decorative background text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/5 whitespace-nowrap pointer-events-none select-none uppercase">
        Let's Create
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">

          {/* Brand Section */}
          <div className="flex flex-col gap-6 max-w-sm">
            <Link to="/" className="flex items-center justify-center rounded-full w-16 h-16 bg-white text-black border-4 border-black text-2xl font-black shadow-[6px_6px_0px_#FFE600] hover:scale-110 transition-transform">
              MT
            </Link>
            <h2 className="text-3xl font-black uppercase tracking-tight leading-none">
              Building Digital <br />
              <span className="text-[#FFE600]">Experiences.</span>
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed">
              A passionate full-stack developer and designer focused on building scalable, user-centric digital solutions that solve real-world problems.
            </p>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            {/* Quick Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Navigation</h4>
              <ul className="flex flex-col gap-4 font-bold text-lg uppercase tracking-tight">
                <li><Link to="/" className="hover:text-[#FFE600] transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#FFE600] transition-colors">About</Link></li>
                <li><Link to="/project" className="hover:text-[#FFE600] transition-colors">Works</Link></li>
                <li><Link to="/contact" className="hover:text-[#FFE600] transition-colors">Contact</Link></li>


              </ul>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Connect</h4>
              <ul className="flex flex-col gap-4 font-bold text-lg uppercase tracking-tight">
                <li>
                  <a href="https://github.com/lalosianturi21" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFE600] transition-colors">
                    GitHub <FaGithub className="text-sm" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/tio-fulalo-simatupang-5b9547210/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFE600] transition-colors">
                    LinkedIn <FaLinkedin className="text-sm" />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/lalosianturi21" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FFE600] transition-colors">
                    Instagram <FaInstagram className="text-sm" />
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA / Location */}
            <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Status</h4>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="font-bold text-lg uppercase">Available for Hire</span>
              </div>
              <p className="text-gray-400 font-medium text-sm">
                Based in Indonesia, <br />
                Working Worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
            © {new Date().getFullYear()} Tio Fulalo. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs border-2 border-white shadow-[4px_4px_0px_#FFE600] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
          >
            Back to top <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
