"use client";
import { navbar } from "@/constants";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useHeaderShadow from "../hooks/useHeaderShadow";
import {
  FaBars,
  FaCar,
  FaPaperPlane,
  FaShoppingBag,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "./CartProvider";
import Button from "./Button";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [ismobile, setIsmobile] = useState(false);
  const [NavOpen, setNavOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const headerShadow = useHeaderShadow();
  const { cartItems, itemsAdded } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      const mobile = window.innerWidth <= 768;
      setIsmobile(mobile);
    }
  }, []);
  const handleScroll = () => {
    const section = document.querySelectorAll(
      "#intropage, #type, #products,#history, #overview"
    );
    section.forEach((sect) => {
      const lead = sect.getBoundingClientRect();
      if (lead.top > 0 && lead.top <= window.innerHeight) {
        setActiveComponent(sect.id);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToComponent = (componentId: string) => {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="lg:py-5 xs:py-3 lg:px-20 xs:px-3 fixed w-full bg-white z-20"
      style={{ boxShadow: headerShadow }}
    >
      <div className="flex flex-1 justify-between items-start">
        <div
          className="flex gap-4 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="lg:pt-[2.1rem] xs:pt-[2.5rem] lg:text-5xl xs:text-3xl text-red-400">
            <FaCar />
          </span>
          <span className="lg:text-3xl xs:text-xl pt-10 font-semibold">
            Car's <span className="text-red-400">Hub</span>
          </span>
        </div>
        <div
          className={`lg:w-0 xs:mt-8 lg:mt-0 flex  gap-10 lg:pt-9 xs:pt-4 lg:self-start xs:self-center lg:pl-[15rem] xs:pl-7 xs:absolute top-0 lg:static lg:flex-row xs:flex-col lg:bg-none xs:bg-white xs:w-full xs:pb-3 lg:pb-0  left-0 justify-center transition-all duration-200 ease-in  ${
            ismobile === true && NavOpen === false
              ? "top-20 shadow-sm"
              : "top-[-400px]"
          }`}
        >
          {ismobile === true && NavOpen === false ? (
            <ul className="flex xs:flex-col lg:flex-row gap-10 ">
              {navbar.map((item) => (
                <li
                  key={item.href}
                  onClick={() => {
                    scrollToComponent(item.href);
                    setNavOpen(!NavOpen);
                  }}
                  className={`cursor-pointer ${
                    activeComponent !== item.href
                      ? "text-[#333]"
                      : "text-red-400"
                  }`}
                >
                  {item.label.toUpperCase()}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex gap-10">
              {navbar.map((item) => (
                <li
                  key={item.href}
                  onClick={() => {
                    scrollToComponent(item.href);
                  }}
                  className={`cursor-pointer ${
                    activeComponent !== item.href
                      ? "text-[#333]"
                      : "text-red-400"
                  }`}
                >
                  {item.label.toUpperCase()}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          text="Get us"
          textStyles="text-white text-lg"
          btnStyles="bg-red-400 w-fit h-fit rounded-lg py-3 mt-6 lg:ml-[15rem] xs:ml-[5rem] flex gap-2 flex-row-reverse "
          icon={<FaPaperPlane />}
          iconStyles="text-white pt-[0.4rem]"
          handleClick={() => router.push("/contact_info")}
        />

        <Link
          href="/cart"
          className="w-10 h-10 rounded-full items-center flex justify-center bg-red-400 absolute lg:right-[5rem] xs:right-[2rem] lg:top-[15rem] xs:top-[13rem] lg:z-50 xs:-z-10"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {cartItems.length !== 0 ? (
            <span className="text-white font-medium">{itemsAdded}</span>
          ) : (
            <span className="text-white">
              <FaShoppingCart />
            </span>
          )}
        </Link>
        {hover && (
          <span className="top-[17rem] absolute right-3 bg-white w-fit h-fit rounded-lg px-3 py-1 text-red-400 shadow-md ">
            Your cart
          </span>
        )}
        <div className="hidden lg:hidden xs:block z-50  cursor-pointer pt-10 text-2xl">
          {/* <span onClick={() => setNavOpen((prev) => !prev)}>
            {NavOpen ? <FaTimes /> : <FaBars />}
          </span> */}

          {ismobile === true && NavOpen === false ? (
            <span onClick={() => setNavOpen(true)}>
              <FaTimes />{" "}
            </span>
          ) : (
            <span onClick={() => setNavOpen(false)}>
              <FaBars />
            </span>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
