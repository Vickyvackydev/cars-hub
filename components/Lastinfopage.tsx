"use client";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import { FaCompass } from "react-icons/fa";
import { motion } from "framer-motion";

const LastInfoPage = () => {
  const scrolltoId = (scrollId: string) => {
    const element = document.getElementById(scrollId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="lg:px-24 xs:px-10 py-16 mb-9" id="overview">
      <div className="flex justify-between lg:flex-row xs:flex-col-reverse">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="relative"
        >
          <div className="lg:w-[700px] xs:w-[300px] lg:h-[500px] xs:h-[200px] bg-red-600 rounded-md lg:mt-0 xs:mt-5" />
          <Image
            src="/car_bg.jpg"
            width={1000}
            height={1000}
            alt=""
            className="absolute top-8 right-0 lg:left-8 xs:left-3"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
        >
          <div className="w-8 h-3 bg-red-600 rounded-md mb-5" />
          <div className="flex flex-col gap-5">
            <span className="text-5xl text-red-400 font-semibold">
              The World Of Cars
            </span>

            <p className="max-w-xs">
              We have lots of luxury cars here in car's hub, alot to explore,
              alot to keep in mind to purchase. We don't procastinate, we give
              you your taste of the best rides around the globe, and here in
              car's hub you'll get the best rides you have ever dreamed off.
            </p>
            <Button
              text="Explore Now"
              textStyles="text-white text-2xl"
              btnStyles="w-[13rem] bg-red-400 py-4 rounded-lg mt-4 gap-3"
              icon={<FaCompass />}
              iconStyles="pt-[0.3rem] text-white"
              handleClick={() => scrolltoId("products")}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LastInfoPage;
