import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ data }) => {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((item, index) => (
        <div key={index} className="text-black/50 text-xs font-black uppercase tracking-widest md:text-[10px]">
        <Link to={item.link} className="hover:text-black transition-colors">{item.name}</Link>
        {index !== data.length - 1 && <span className="px-2 text-black/20">/</span>}
      </div>      
      ))}
    </div>
  );
};

export default BreadCrumbs;
