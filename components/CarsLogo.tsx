"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CarsLogo = () => {
  return (
    <div className="py-16 flex justify-center items-center lg:px-0 xs:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2.5 }}
      >
        <Image
          src="/cars_logo.png"
          width={1000}
          height={1000}
          className="object-contain"
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default CarsLogo;
