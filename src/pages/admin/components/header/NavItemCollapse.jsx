import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const NavItemCollapse = ({ title, children, icon, name, activeNavName, setActiveNavName }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsOpen(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="flex flex-col gap-1">
      <button
        className={`w-full flex items-center justify-between text-left px-5 py-4 border-2 border-black transition-all active:scale-95
        ${name === activeNavName ? "bg-black text-white translate-x-[2px] translate-y-[2px] shadow-none" : "bg-white text-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"}`}
        onClick={() => {
          setActiveNavName(name);
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="font-black uppercase text-xs tracking-widest">{title}</span>
        </div>
        {isOpen ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
      </button>

      {isOpen && (
        <div className="flex flex-col gap-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
