"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import {
  FaTools,
  FaDollarSign,
  FaTruck,
  FaWrench,
  FaTags,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
const intro = [
  {
    heading: "Manufacturing",
    texts:
      "We manufacture varieties of vehicle, trucks, pickups, concepts, sports, corpe, luxury, hyper sports. We also create awesome home coach-like house, best called a mobile bus/coach. More you would see in our site.",
    btnTag: "Bring deals",
    btnIcon: <FaTags />,
    icon: <FaTools />,
  },
  {
    heading: "Business",
    texts:
      "We sell variety of our models, here in our website you would exotic models, all of what you see are on sales, we partner with different companies around the globe, promote other companies which also satisfies the growth of our company you can click the button below to partner with if you have a dream of a company. ",
    btnTag: "Partner with us",
    btnIcon: <FaUsers />,
    icon: <FaDollarSign />,
  },
  {
    heading: "Delivery",
    texts:
      "With all forms of doing business both locally and online, we don't think that without a quick means of delivery, business won't move. So while into our business we deliver exotic cars all around the globe, to local car dealers even private owners, click the button to order a varieties of our cars.",
    btnTag: "Order a car",
    btnIcon: <FaShoppingCart />,
    icon: <FaTruck />,
  },
  {
    heading: "Customizing",
    texts:
      "With all of what we do, we also give our customers what they best deserve from us, you dont love how your benz looks, contact us and get your car to look to your desired taste.",
    btnTag: "Bring deals",
    btnIcon: <FaTags />,
    icon: <FaWrench />,
  },
];
const Intropage = () => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 2 }}
      className="lg:px-24 xs:px-10 pt-9"
      id="intropage"
    >
      <div className="flex justify-between items-center">
        <div className="w-8 h-3 bg-red-400 rounded-lg "></div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="flex items-center justify-center gap-4 relative -z-10"
        >
          <span className=" lg:text-4xl xs:text-xl font-semibold text-slate-900 pt-3">
            Who Are We
          </span>
          <div className="w-8 h-3 bg-red-400 rounded-lg lg:block xs:hidden block"></div>
          <Image
            src="/cartoon.png"
            width={100}
            height={100}
            alt=""
            className="scale-x-[-1] lg:block xs:hidden block"
          />
        </motion.div>
        <div className="w-8 h-3 bg-red-400 rounded-lg "></div>
      </div>
      <div className="flex gap-5 mt-10 lg:flex-row xs:flex-col">
        {intro.map((item, i) => {
          if (i === 0) {
            return (
              <div
                key={i}
                className="border-2 lg:shadow-md xs:shadow-sm px-4 rounded-lg py-5 gap-7 w-full flex flex-col"
              >
                <div className="flex items-center justify-center flex-col gap-3">
                  <div className="w-16 h-16 rounded-full border border-red-400 flex justify-center items-center">
                    <span className="text-3xl text-red-400">{item.icon}</span>
                  </div>
                  <span className=" text-red-400 text-lg font-medium">
                    {item.heading}
                  </span>
                </div>
                <p className="text-slate-900 font-medium">{item.texts}</p>
                <div className="flex justify-center items-center mt-[3rem]">
                  <button
                    type="button"
                    className="w-fit h-fit bg-red-400 text-white px-5 py-3 rounded-lg flex gap-2"
                    onClick={() => router.push("/HomePage/contact_info")}
                  >
                    <span className="pt-1">{item.btnIcon}</span>
                    <span>{item.btnTag}</span>
                  </button>
                </div>
              </div>
            );
          } else if (i === 3) {
            return (
              <div
                key={i}
                className="border-2 lg:shadow-md xs:shadow-sm px-4 rounded-lg py-5 gap-5 w-full flex flex-col"
              >
                <div className="flex items-center justify-center flex-col gap-3">
                  <div className="w-16 h-16 rounded-full border border-red-400 flex justify-center items-center">
                    <span className="text-3xl text-red-400">{item.icon}</span>
                  </div>
                  <span className=" text-red-400 text-lg font-medium">
                    {item.heading}
                  </span>
                </div>
                <p className="text-slate-900 font-medium">{item.texts}</p>
                <div className="flex justify-center items-center mt-[5.3rem]">
                  <button
                    type="button"
                    className="w-fit h-fit bg-red-400 text-white px-5 py-3 rounded-lg flex gap-2"
                    onClick={() => router.push("/HomePage/contact_info")}
                  >
                    <span className="pt-1">{item.btnIcon}</span>
                    <span>{item.btnTag}</span>
                  </button>
                </div>
              </div>
            );
          } else if (i === 1) {
            return (
              <div
                key={i}
                className="border-2 lg:shadow-md xs:shadow-sm px-4 rounded-lg py-5 gap-5 w-full flex flex-col"
              >
                <div className="flex items-center justify-center flex-col gap-2">
                  <div className="w-16 h-16 rounded-full border border-red-400 flex justify-center items-center">
                    <span className="text-3xl text-red-400">{item.icon}</span>
                  </div>
                  <span className=" text-red-400 text-lg font-medium">
                    {item.heading}
                  </span>
                </div>
                <p className="text-slate-900 font-medium">{item.texts}</p>
                <div className="flex justify-center items-center mb-4">
                  <button
                    type="button"
                    className="w-fit h-fit bg-red-400 text-white px-5 py-3 rounded-lg flex gap-2"
                    onClick={() => router.push("/HomePage/contact_info")}
                  >
                    <span className="pt-1">{item.btnIcon}</span>
                    <span>{item.btnTag}</span>
                  </button>
                </div>
              </div>
            );
          }
          return (
            <div
              key={i}
              className="border-2 lg:shadow-md xs:shadow-sm px-4 rounded-lg py-5 gap-5 w-full flex flex-col"
            >
              <div className="flex items-center justify-center flex-col gap-3">
                <div className="w-16 h-16 rounded-full border border-red-400 flex justify-center items-center">
                  <span className="text-3xl text-red-400">{item.icon}</span>
                </div>
                <span className=" text-red-400 text-lg font-medium">
                  {item.heading}
                </span>
              </div>
              <p className="text-slate-900 font-medium">{item.texts}</p>
              <div className="flex justify-center items-center mt-4">
                <button
                  type="button"
                  className="w-fit h-fit bg-red-400 text-white px-5 py-3 rounded-lg flex gap-2"
                  onClick={() => router.push("/HomePage/contact_info")}
                >
                  <span className="pt-1">{item.btnIcon}</span>
                  <span>{item.btnTag}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Intropage;
