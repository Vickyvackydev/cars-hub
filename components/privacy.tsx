"use client";
import Image from "next/image";
import React from "react";
import { FaPhone, FaReply, FaTag } from "react-icons/fa";
import Button from "./Button";
import { Customers } from "@/constants";
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="lg:px-32 xs:px-10 mt-14 mb-20">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
      >
        <span className="flex justify-center items-center lg:text-3xl xs:text-xl italic text-red-400">
          <span className="scale-x-[-1]">
            <FaReply />
          </span>
          Customers Reports
          <span className="text-red-400">
            <FaReply />
          </span>
        </span>
      </motion.div>

      <motion.div
        className="flex mt-16 gap-5 relative lg:flex-row xs:flex-col"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
      >
        {Customers.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center w-full max-h-full border-2 gap-3 px-4 py-4 rounded-lg shadow-sm hover:scale-110 transition-all duration-300"
          >
            <div className="">
              <Image
                src={item.img}
                width={100}
                height={100}
                alt="image"
                className="rounded-full"
              />
            </div>
            <span className="text-xl text-red-400">{item.name}</span>
            <span className="text-red-400">
              <FaTag />
            </span>
            <p className=" text-slate-500 text-start">{item.text}</p>
            <Button
              text="Contact"
              textStyles="text-white"
              btnStyles="bg-red-400 px-3 py-2 mt-5 rounded-lg"
              icon={<FaPhone />}
              iconStyles="scale-x-[-1] pt-[0.125rem] text-white"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Privacy;
