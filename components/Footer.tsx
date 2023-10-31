"use client";
import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarker,
  FaPhoneAlt,
  FaCar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "./Modal";

interface props {
  title: string;
}
const footerLogo: props[] = [
  {
    title: "Follow us",
  },
];

const imageUrl = [
  {
    icon: <FaInstagram />,
  },
  {
    icon: <FaFacebook />,
  },
  {
    icon: <FaTwitter />,
  },
];
export const footerContact = [
  {
    title: "Contact us",
    link: "/HomePage/contact_info",
    label: [
      {
        text: "+234 8096014007",
        icon: <FaPhoneAlt />,
      },
      {
        text: "Zone 5,Eyita via Odogunyan, Lagos State",
        icon: <FaMapMarker />,
      },
    ],
  },
];

const Footer: React.FC = () => {
  const [terms, setTerms] = useState(false);
  const scrolltoId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <motion.footer
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 2 }}
      className="w-full pt-16 lg:px-24 xs:px-10 border"
    >
      <div className="flex justify-between items-center xs:flex-col lg:flex-row xs:gap-10 xs:items-start">
        <div className="max-w-xl">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex gap-4 ">
              <span className="text-5xl text-red-400">
                <FaCar />
              </span>
              <span className="text-3xl pt-2 font-semibold">
                Car's <span className="text-red-400">Hub</span>
              </span>
            </Link>

            <span className=" text-slate-900  text-start">
              {/* Getlinked Tech Hackathon is a technology innovation program
              established by a group of organizations with the aim of showcasing
              young and talented individuals in the field of technology */}
              Car's hub is one of the world's best leading car e-commerce
              website/blog, alot of exicting deals, lots of luxury cars,
              hyperformance vehicles, regular, even the world's classes vehicle,
              The Mercedes Benz, and lots more.. We believe you love what to
              see, why don't you add a car to your cart and let's ship your
              dream car to your door step, our payment process is fast and easy.
              <span className="text-red-400 font-medium">
                Thanks for your patronage.
              </span>
            </span>
          </div>

          <div className="flex text-slate-900 gap-3 lg:mt-24 xs:mt-12">
            {/* <span>Terms of Use</span>
            <Image src="/line.png" width={2} height={2} alt="line" />
            <span>privacy Policy</span> */}
            <span
              className="text-red-400 cursor-pointer"
              onClick={() => setTerms(true)}
            >
              Terms and conditions
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="">
            {footerLinks.map((item) => (
              <ul className="flex flex-col gap-3">
                <span className="font-medium text-red-400">{item.title}</span>
                <ul className="">
                  {item.link.map((links) => (
                    <li
                      key={links.href}
                      className="flex flex-col text-slate-900 pb-2 cursor-pointer"
                      onClick={() => scrolltoId(links.href)}
                    >
                      {links.label}
                    </li>
                  ))}
                </ul>
              </ul>
            ))}
          </div>

          <div className="flex justify-between items-center">
            {footerLogo.map((item) => (
              <div className="">
                <span className="text-red-400">{item.title}</span>
              </div>
            ))}

            {imageUrl.map((item, i) => {
              return (
                <div className="flex  px-3 " key={i}>
                  <span className="text-xl text-slate-700 hover:text-red-400 cursor-pointer">
                    {item.icon}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pb-16 max-w-[15rem]">
          {footerContact.map((item) => (
            <div className="flex flex-col gap-4 ">
              <span className="text-red-400">{item.title}</span>

              {item.label.map((details) => (
                <ul className="flex gap-4 ">
                  <span className="text-slate-700"> {details.icon}</span>
                  <span className="text-slate-900">{details.text}</span>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="flex justify-center items-center text-slate-900 pb-5 mt-4">
        All rights reserved. © car's hub Ltd.
      </span>
      <Modal isOpen={terms} isClose={() => setTerms(false)}>
        <div className="flex flex-col items-start gap-4">
          <span className="text-red-400"> Terms and Conditions</span>
          <p className="text-start">
            These terms and conditions outline the rules and regulation for the
            use of our website.
          </p>
          <p className="text-start">
            By accessing our website we believe that you have read our terms and
            conditions. Do not continue to use the site if you do not consider
            the terms and conditions applied.
          </p>

          <p className="text-start">
            The following statements applies to the privacy and disclaimer
            notice of any our client.
          </p>
          <span className="text-lg text-red-400">Use of our website</span>
          <p className="text-start">
            The content on our website is for general information and use alone,
            no refurbished content here, you contact the company and we would
            get back as soon as possible.
          </p>
          <p className="text-start">
            Each products listed on the site is not stolen, all products are
            either fairly used of new, no false statement on the use of our site
            would be accepted.
          </p>

          <span className="text-red-400 text-lg">Pricing and Payments</span>
          <p className="text-start">
            The prices on each of the vehicles listed in our website are legit
            price given direct from the manufactures, any other price that's is
            not here and confirmed in our site is formally not ours.
          </p>
          <p className="text-start">
            Payments of any vehicle bought or orderd can be made through our
            webiste payment method which is fast and easy to process.
          </p>
          <span className="text-red-400 text-lg">Delivery</span>
          <p className="text-start">
            Delivery of any vehicle purchased from our site, will be subject to
            the terms and conditions subject to the payment agreement and may
            vary based on the loaction, but we make our delivery fee to any
            location same amount for any amount of cars ordered or purchased
            from our site.
          </p>
          <span className="text-red-400 text-lg">Refund Policy</span>
          <p className="text-start">
            Refunds for vehicle purchased would be subjected to the terms and
            conditions outlined to the purchase agreement. Please refer to the
            specific terms provided during the purchase process.
          </p>
          <span className="text-red-400 text-lg">Change and Modification</span>
          <p className="text-start">
            We reserve the right to change these terms and conditions at any
            time. If you area dealer or a client, you should constantly check
            our website for any constant update,incase you might be familiar
            with the current version.
          </p>
          <span className="text-red-400 text-lg">Contact Information</span>
          <p className="text-start">
            If you have any questions about these terms and conditions, please
            contact us via the contact information provided in our website.
          </p>
        </div>
      </Modal>
    </motion.footer>
  );
};

export default Footer;
