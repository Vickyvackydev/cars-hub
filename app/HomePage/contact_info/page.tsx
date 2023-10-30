"use client";
import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import { FaPaperPlane, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <main className="pt-[10rem] flex justify-between lg:flex-row xs:flex-col lg:px-24 xs:px-10 pb-10">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
      >
        <Image src="/audi_gt.png" width={700} height={700} alt="img" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
      >
        <div className="flex flex-col  justify-center items-center pb-4">
          <span className="text-3xl text-red-400">Send us a message</span>
          <span className="text-slate-900">
            We'll reach out as soon as we can
          </span>
        </div>
        <div className="lg:w-[500px] xs:w-full h-[400px] rounded-lg lg:px-10 xs:px-2">
          <form action="" className="flex flex-col gap-5 pt-7 px-3">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="border h-16 rounded-lg px-3 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              className="border  h-16 rounded-lg px-3 outline-none"
            />
            {/* <input type="text" name="name"/> */}
            <textarea
              name=""
              id=""
              placeholder="message"
              rows={5}
              className="border rounded-lg px-3 pt-3 outline-none "
            />
          </form>
          <Button
            text="Send message"
            textStyles="text-white"
            btnStyles="w-fit bg-red-400 mt-6 py-3 rounded-lg ml-3 flex-row-reverse"
            icon={<FaPaperPlane />}
            iconStyles="pt-[0.125rem] text-white"
          />
        </div>
      </motion.div>
    </main>
  );
};

export default ContactUs;
