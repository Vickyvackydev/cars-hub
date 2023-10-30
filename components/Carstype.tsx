"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./cartype.css";
const cartype = [
  {
    image: "/white.png",
    label: "Benz",
  },
  {
    image: "/bmw_gold.png",
    label: "BMW",
  },
  {
    image: "/audi_r8.png",
    label: "Audi",
  },
  {
    image: "/lexus_gt.png",
    label: "Lexus",
  },
  {
    image: "/porsche_taycan.png",
    label: "Porsche",
  },
];

const Carstype = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(0);

  const handleSelected = (image: number) => {
    setSelectedImg(image);
  };
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    const slideImage = () => {
      setSelectedImg((prevImage) => (prevImage + 1) % cartype.length);
    };
    intervalRef.current = window.setInterval(slideImage, 5000);

    return () => window.clearInterval(intervalRef.current);
  }, [cartype.length]);

  return (
    <div
      className="lg:px-32 x:px-10  xs:pl-10 lg:pl-0 pt-20 bg-gray-500 bg-opacity-5 mt-16 flex justify-center items-center lg:flex-row xs:flex-col xs:relative"
      id="type"
    >
      <div className="flex">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
          className="relative -z-10"
        >
          <Image
            src="/red_circle.png"
            width={700}
            height={700}
            alt="image"
            className="opacity-60"
          />
          {cartype.map((item, index) => (
            <Image
              src={item.image}
              width={1000}
              height={1000}
              alt=""
              className={`absolute top-10 lg:right-[8rem] xs:right-[2rem]  -z-5 ${
                index === selectedImg ? "slide active" : "slide"
              }`}
            />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
          className="W-full h-full  flex flex-col border px-7 py-4 gap-3 rounded-lg shadow-box bg-white bg-opacity-30  lg:block xs:hidden"
        >
          <span className="text-2xl flex justify-center items-center font-medium">
            Models
          </span>
          <div className="flex flex-col gap-10">
            {cartype.map((item, i) => (
              <div
                className={`flex flex-1 gap-10 justify-between bg-gray-300 px-5 py-3 ${
                  i === selectedImg ? "text-red-400" : "text-gray-300"
                } rounded-lg bg-opacity-30 font-semibold`}
                key={i}
              >
                <span>{item.label}</span>
                <div
                  onClick={() => handleSelected(i)}
                  className={`w-7 h-7 rounded-2xl flex justify-center items-center ${
                    i === selectedImg ? "bg-green-400" : "bg-transparent"
                  } border-gray-300 border `}
                >
                  {i === selectedImg ? (
                    <Image
                      src="/checked.svg"
                      width={10}
                      height={10}
                      alt="check"
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Carstype;
