"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { motion } from "framer-motion";

import { FaCompass } from "react-icons/fa";

const Hero = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count >= 70) {
        clearInterval(interval);
      } else {
        setCount(count + 1);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [count]);

  const scrolltoId = (scrollId: string) => {
    const element = document.getElementById(scrollId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-end items-end pr-5"
      >
        <span className="italic lg:text-4xl xs:text-2xl  font-semibold ">
          Explore your desired <span className="text-red-400">Ride</span>
        </span>
        <Image
          src="/arrow_pink.png"
          width={100}
          height={100}
          alt="line image"
        />
      </motion.div>

      <div className="flex flex-1 px-20 lg:flex-row xs:flex-col">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="flex flex-col gap-3 max-w-3xl "
        >
          <span className="lg:text-7xl xs:text-2xl lg:text-start xs:text-center font-semibold text-slate-900">
            Find The Models Of Your <span className="text-red-400">Dreams</span>
          </span>
          <p className="lg:text-lg xs:text-sm lg:text-start xs:text-center ">
            We deal in exotic cars around the globe, here in car's hub <br />
            you would get and admire your dream cars, all on low budget!
          </p>

          <Button
            text="Explore Now"
            textStyles="text-white text-2xl"
            btnStyles="w-[13rem] bg-red-400 py-4 rounded-lg mt-4 gap-3 xs:scale-90 lg:scale-110 lg:ml-0 xs:ml-5"
            icon={<FaCompass />}
            iconStyles="text-white pt-[0.4rem]"
            handleClick={() => scrolltoId("products")}
          />

          <div className="mt-6 lg:text-xl xs:text-sm lg:text-start xs:text-center">
            <span>
              We have over
              <span className="text-red-400 font-semibold"> {count}+</span>{" "}
              vehicles in our site
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="relative -z-10"
        >
          <Image
            src="/red_benz.png"
            width={700}
            height={700}
            alt="glow image"
            className="absolute ml-6 lg:right-[10rem] xs:right-[5rem] lg:top-0 xs:top-[7rem]"
          />
          <Image
            src="/tire.png"
            width={300}
            height={300}
            alt="man image"
            className="relative lg:ml-[20rem] xs:ml-20 mt-20"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
