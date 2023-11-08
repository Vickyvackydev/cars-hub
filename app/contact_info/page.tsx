"use client";
import Button from "@/components/Button";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { FaCheckCircle, FaPaperPlane, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";

import emailjs from "@emailjs/browser";
import Modal from "@/components/Modal";

const ContactUs = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState(false);
  const [formInput, setFormInput] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_qhf8h0w",
        "template_k3ha6q5",
        form.current,
        "uByOgMvBq3ZjNiPBI"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setModal(true);
          setSending(false);
          setFormInput({
            user_email: "",
            user_name: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
          setSending(false);
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const noDetails =
    formInput.user_email === "" ||
    formInput.user_name === "" ||
    formInput.message === "";

  return (
    <main className="pt-[10rem] flex justify-between lg:flex-row xxs:flex-col lg:px-24 xxs:px-20 pb-10 lg:pl-0 xxs:pl-0">
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
          <form
            ref={form}
            className="flex flex-col gap-5 pt-7 px-3"
            onSubmit={sendEmail}
          >
            <input
              type="text"
              name="user_name"
              placeholder="name"
              onChange={handleChange}
              value={formInput.user_name}
              className="border h-16 rounded-lg px-3 outline-none"
            />
            <input
              type="email"
              name="user_email"
              placeholder="email"
              onChange={handleChange}
              value={formInput.user_email}
              className="border  h-16 rounded-lg px-3 outline-none"
            />
            {/* <input type="text" name="name"/> */}
            <textarea
              name="message"
              placeholder="message"
              value={formInput.message}
              onChange={handleChange}
              rows={5}
              className="border rounded-lg px-3 pt-3 outline-none "
            />
          </form>
          <Button
            text={`${sending ? "sending.." : "Send message"}`}
            textStyles="text-white"
            btnStyles={`w-fit ${
              noDetails ? "bg-red-200" : "bg-red-400"
            } mt-6 py-3 rounded-lg ml-3 flex-row-reverse`}
            handleClick={sendEmail}
            disabled={noDetails}
          />
        </div>
      </motion.div>
      <Modal isOpen={modal} isClose={() => setModal(false)}>
        <div className="flex flex-col justify-center items-center gap-5">
          <span className="text-7xl text-red-400">
            <FaCheckCircle />
          </span>
          <div className="flex flex-col gap-3">
            <span className="text-2xl">Message sent</span>
            <p className="text-sm">
              We will review your message and get back to you as soon as
              possible, thanks for contacting
            </p>
          </div>
          <Button
            text="Ok, got it"
            textStyles="text-white"
            btnStyles="w-fit bg-red-400 mt-6 py-2 rounded-lg"
            handleClick={() => setModal(false)}
          />
        </div>
      </Modal>
    </main>
  );
};

export default ContactUs;
