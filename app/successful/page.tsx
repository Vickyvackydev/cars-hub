"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowAltCircleLeft,
  FaBackward,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

// const ratings = [
//   {
//     emoji: "😣",
//     rate: <FaStar />,
//   },
//   {
//     emoji: "😥",
//     rate: <FaStar />,
//   },
//   {
//     emoji: "🙁",
//     rate: <FaStar />,
//   },
//   {
//     emoji: "😊",
//     rate: <FaStar />,
//   },
//   {
//     emoji: "😀",
//     rate: <FaStar />,
//   },
// ];

const SuccessFull = () => {
  const router = useRouter();
  const [rateModal, setRateModal] = useState(false);
  const [rate, setRate] = useState({
    rate: "",
  });
  const [selectedRate, setSelectedRate] = useState<number | null>(null);
  const [showRate, setShowRate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRateModal(true);
    }, 2000);
  }, []);

  const handleCloseModal = () => {
    setRateModal(false);
  };

  const handleRatings = (rate: number) => {
    if (selectedRate === rate) {
      setSelectedRate(0);
    } else {
      setSelectedRate(rate);
    }
  };

  const handleRateModal = () => {
    setRateModal(false);
    setTimeout(() => {
      setShowRate(true);
    }, 1000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRate((prevRate) => ({
      ...prevRate,
      rate: value,
    }));
  };
  const ratings = ["😣", "😥", "🙁", "😊", "😀"];

  const emojiRated = (selectedRate: number) => {
    if (selectedRate === 1) {
      return "😣";
    } else if (selectedRate === 2) {
      return "😥";
    } else if (selectedRate === 3) {
      return "🙁";
    } else if (selectedRate === 4) {
      return "😊";
    } else if (selectedRate === 5) {
      return "😀";
    }
  };
  return (
    <div className="flex justify-between  xs:flex-col lg:flex-row pt-[10rem] lg:px-24 xs:px-10 bg-gif pb-5">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 1 }}
      >
        <Image src="/white.png" width={700} height={700} alt="img" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="border-[2px] border-gray-200 rounded-lg lg:w-[500px] xs:w-full h-full px-5 py-5 flex flex-col justify-center items-center gap-5"
      >
        <div className="">
          <span className="text-7xl text-red-400">
            <FaCheckCircle />
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-xl text-red-400 font-medium">
            Congratulations
          </span>
          <span className="text-2xl text-red-400 xs:text-center lg:text-start">
            Your Payment Was Successfull!!
          </span>
          <p className="text-lg text-red-400">Your ride is on it way 🎈🎉</p>
        </div>
        <div className="justify-center items-center flex flex-col gap-3">
          <span className="text-center text-red-400">
            Your can add more items to cart or remove paid items from cart
          </span>
          <Button
            text="Back to Home"
            textStyles="text-white"
            icon={<FaArrowAltCircleLeft />}
            iconStyles="text-white pt-[0.125rem]"
            btnStyles="bg-red-400 px-3 py-2 rounded-lg"
            handleClick={() => router.push("/HomePage")}
          />
        </div>
      </motion.div>
      <Modal isOpen={rateModal} isClose={handleCloseModal}>
        <div>
          <span className="text-xl text-[#333]"> Hi there 🖐, Rate us</span>
          <div className="grid grid-cols-5 mt-7">
            {[1, 2, 3, 4, 5].map((rate) => (
              <div
                className="flex flex-col items-center gap-4"
                onClick={() => handleRatings(rate)}
              >
                <span
                  className={`${
                    selectedRate >= rate ? "text-yellow-500" : ""
                  } cursor-pointer text-xl`}
                >
                  <FaStar />
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 mt-5">
            {ratings.map((rate) => (
              <span className="text-2xl">{rate}</span>
            ))}
          </div>

          <input
            type="text"
            className="border-b-2 outline-none mt-9 w-[20rem]"
            placeholder="say something about us"
            onChange={handleChange}
            value={rate.rate}
          />
          <div className="flex justify-center items-center mt-7">
            <Button
              text="Send Feedback"
              textStyles="text-white"
              btnStyles="px-3 py-2 bg-red-400 rounded-lg"
              handleClick={handleRateModal}
            />
          </div>
        </div>
      </Modal>

      <Modal isOpen={showRate} isClose={() => setShowRate(false)}>
        <div>
          {selectedRate && (
            <div className="mt-4">
              <span className="text-7xl">{`${emojiRated(selectedRate)}`}</span>
              <div className="text-center flex items-center justify-center text-2xl mt-4">
                <span>You rated us {selectedRate}</span>
                <span className="text-red-400 pb-1">
                  <FaStar />
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-5 mt-4">
            <span className="text-xl text-[#333]">
              <span className="text-red-400">Feedback:</span>{" "}
              {!rate.rate ? "No feedback" : rate.rate}
            </span>
            <span>
              {selectedRate <= 3
                ? "Sorry for any inconvienince, we have seen your complain we would work on that as soon as possible"
                : "Thank you 😊, Your response was recorded"}
            </span>
            <span>Thanks for your Feedback.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SuccessFull;
