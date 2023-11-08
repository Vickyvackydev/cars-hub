"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
const history = [
  {
    img: "/maybach_logo.jpg",
    date: "Maybach",
  },
  {
    img: "/brabus.jpg",
    date: "Brabus",
  },
  {
    img: "/maybach_cool.jpg",
    date: "Maybach corpe",
  },
  {
    img: "/benz.jpg",
    date: "Amg sport",
  },
];
const History = () => {
  const [date, setDate] = useState(false);
  return (
    <div
      className="lg:px-32 xs:px-10 xxs:px-[15rem] lg:pt-12  xs:pt-1 bg-gray-400 bg-opacity-10 lg:mt-12 xs:mt-1 pb-11 lg:pl-20 xxs:pl-3  "
      id="history"
    >
      <div className="flex gap-10 mt-10 py-10 lg:flex-row xs:flex-col xxs:flex-col">
        <motion.div
          className="max-w-lg "
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
        >
          <div className="flex gap-4 mt-1 -z-10">
            <span className="lg:text-5xl xs:text-2xl text-red-400 font-semibold pt-4">
              The History
            </span>
          </div>
          <p className="mt-3 font-medium text-slate-900">
            The history of cars dates back to the late 19th century. in 1885,
            Karl Benz developed the first practical automobile, the Benz patent
            Motorwagen, which had a gasoline-powered internal combusion engine.
            Shortly after, other pioneers such as Gottlieb Daimler and Wihelm
            Maybach, also contributed to the development of automobiles. In the
            early 20th century, production of cars became random, which made the
            introduction of Henry Ford's automobile , more and more version of
            automobiles came to existence until the recent decades where
            electric and high performance vehicles came to existence. Now here
            in Car's Hub, we have launched lot of these amazing invention from
            the recent years, for you to feed your eyes with lots and lots of
            amazing vehicles.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-5"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
        >
          {history.map((item, i) => (
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setDate(true)}
              onMouseLeave={() => setDate(false)}
            >
              <Image
                src={item.img}
                width={700}
                height={700}
                alt=""
                className="object-cover hover:scale-[1.1] transition-all rounded-lg duration-1000 "
              />
              {date && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-red-400 bg-opacity-50 p-4">
                    <span className="text-white font-semibold">
                      {item.date}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default History;
