import React from "react";
import { motion } from "framer-motion";

const Transition = (OgComponent) => {
  return (props) => (
    <>
      <OgComponent {...props} />
      
      {/* 
         Hanya satu lapisan yang muncul saat transisi.
         Saat keluar (exit): Slide ke bawah menutupi layar.
         Saat masuk (entry): Slide ke bawah membuka layar.
      */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-[#1a1a1a] z-[9999] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
};

export default Transition;
