import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName
          ? "bg-black text-white translate-x-[2px] translate-y-[2px] shadow-none"
          : "bg-white text-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
      } flex items-center gap-x-3 px-5 py-4 border-2 border-black font-black text-xs uppercase tracking-widest transition-all active:scale-95`}
      onClick={() => setActiveNavName(name)}
    >
      <span className="text-xl">{icon}</span>
      {title}
    </NavLink>
  );
};

export default NavItem;
