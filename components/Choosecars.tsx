"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaDollarSign,
  FaArrowAltCircleRight,
  FaShoppingCart,
  FaBookOpen,
  FaBook,
  FaInfoCircle,
  FaArrowAltCircleLeft,
  FaSearch,
} from "react-icons/fa";
import { Item, useCart } from "./CartProvider";
import Button from "./Button";
import { filterCars } from "@/constants";
import Modal from "./Modal";
import { motion } from "framer-motion";

const filters = [
  {
    label: "name",
  },
  {
    label: "model",
  },
  {
    label: "class",
  },
];

const Choosecars = () => {
  const [dropDown, setDropDown] = useState(false);
  const [allcars, setAllcars] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [cartText, setCartText] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const { addTocart } = useCart();
  const handleHover = (index: number) => {
    setCartText(index);
  };

  const handleFilterType = (value: string) => {
    setSelectedFilter(value);
    setDropDown(false);
  };

  const handleAddCars = () => {
    setAllcars(true);
  };

  const handleReduceCars = () => {
    setAllcars(false);
  };
  const handleOpen = (item: Item) => {
    setOpen(true);
    setSelectedItem(item);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const filteredCars = filterCars.filter((item) => {
    const filterTypeValue = item[selectedFilter];

    return (
      filterTypeValue &&
      filterTypeValue.toLowerCase().includes(filterValue.toLowerCase())
    );
  });

  const visiblecars = allcars ? filteredCars : filteredCars.slice(0, 16);

  return (
    <div className="lg:px-32 xs:px-8 pt-9 flex flex-col gap-5 " id="products">
      <div className="flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
          className="flex gap-3 xs:hidden lg:block"
        >
          <span className=" text-2xl text-slate-900 font-semibold pt-3">
            Choose Awesome Car
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
          className="border lg:w-[30rem] xs:w-[10rem] rounded-lg pl-3 py-3 outline-none flex gap-3"
        >
          <span className="pt-[0.125rem] text-red-400">
            <FaSearch />
          </span>
          <input
            type="text"
            value={filterValue}
            onChange={handleFilterValueChange}
            placeholder={`Search ${selectedFilter}`}
            className=" outline-none xs:w-[9rem] lg:w-full"
          />
        </motion.div>
        <motion.div
          className="flex gap-2 lg:flex-row xs:flex-col "
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1 }}
        >
          <span className="pt-1 lg:pl-0 xs:pl-3 block lg:block xs:hidden">
            Search by
          </span>
          <button
            type="button"
            className="w-fit h-fit flex bg-gray-100 px-5 py-1 rounded-lg gap-3"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <span>{selectedFilter}</span>
            <Image
              src="/arrow-down.svg"
              width={20}
              height={20}
              alt="arrow image"
              className="pt-[0.1rem]"
            />
          </button>

          {dropDown && (
            <div className="absolute flex flex-col gap-2 w-fit h-fit shadow-box rounded-lg border justify-center items-center py-4 top-8 right-1 px-2 mt-3 bg-white">
              {filters.map((item, i) => (
                <span
                  key={i}
                  className="hover:bg-gray-100 py-1 rounded-md relative w-full cursor-pointer px-7"
                  onClick={() => handleFilterType(item.label)}
                >
                  {item.label}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
      {visiblecars.length === 0 ? (
        <div className="flex justify-center items-center flex-col opacity-20 lg:text-5xl xs:text-3xl mt-8">
          <span>Oops!! </span>
          <p className="text-center">No result Found</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="flex flex-col gap-5"
        >
          <div className="grid lg:grid-cols-4  xs:grid-cols-1 lg:pl-16 xs:pl-0 mt-8 gap-5">
            {visiblecars.map((item) => (
              <div
                key={item.id}
                className="shadow-md w-full h-[300px] border-2 rounded-lg"
              >
                <div className="bg-gray-200 h-[150px] pt-4">
                  <Image
                    src={item.img}
                    width={300}
                    height={300}
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="px-5 mt-4 flex justify-between py-5 relative">
                  <div className="flex flex-col ">
                    <span className="text-lg font-bold text-[#333]">
                      {item.name}
                    </span>

                    <span className="text-[#333] font-semibold">
                      {item.class}
                    </span>
                    <span className="text-red-400">{item.model}</span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <button
                      onClick={() => handleOpen(item)}
                      className="bg-red-400 w-fit h-fit py-1 rounded-lg  flex  hover:scale-90 transition-all gap-3 text-white px-3"
                    >
                      <span className="pt-[0.25rem]">
                        <FaInfoCircle />
                      </span>
                      <span className="font-mono">details</span>
                    </button>

                    <div className="flex gap-5">
                      <span className="text-lg font-medium text-red-400">{`$ ${item.price}k`}</span>
                      <span
                        className="pt-1 cursor-pointer hover:scale-90 hover:text-red-400"
                        onMouseEnter={() => handleHover(item.id)}
                        onMouseLeave={() => setCartText(null)}
                        onClick={() => addTocart(item)}
                      >
                        <FaShoppingCart />
                      </span>
                    </div>
                    {cartText === item.id && (
                      <span className="absolute top-10 bg-white w-fit h-fit shadow-sm px-2 rounded-md text-red-400 font-medium">
                        {item.stats}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filterCars.length > 16 && !allcars ? (
            <div className="flex justify-center items-center ">
              <Button
                text="Show all"
                textStyles="text-white"
                btnStyles="w-fit h-fit bg-red-400 py-2 rounded-lg flex  hover:scale-90 transition-all gap-2 flex-row-reverse"
                icon={<FaArrowAltCircleRight />}
                iconStyles="text-white pt-[0.2rem]"
                handleClick={handleAddCars}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              <Button
                text="Show less"
                textStyles="text-white"
                btnStyles="w-fit h-fit bg-red-400 py-2 rounded-lg flex  hover:scale-90 transition-all gap-2 "
                icon={<FaArrowAltCircleLeft />}
                iconStyles="text-white pt-[0.2rem]"
                handleClick={handleReduceCars}
              />
            </div>
          )}
        </motion.div>
      )}

      <Modal isOpen={open} isClose={() => setOpen(false)}>
        <div>
          <div className="bg-gray-300 w-full h-full rounded-lg items-center justify-center flex">
            {selectedItem && (
              <Image src={selectedItem?.img} width={300} height={300} alt="0" />
            )}
          </div>
          <div className="pt-6">
            <span className="text-lg font-semibold text-red-400 text-center ">
              Car details
            </span>
            <div className="flex justify-between px-4 pt-4">
              <div className="flex flex-col items-start gap-4 text-gray-400  font-medium">
                <span> Name</span>
                <span>Class</span>
                <span>Model</span>
                <span> Price</span>
                <span>Engine</span>
                <span> Speed</span>
                <span> Manufacturer</span>
                <span>Drive</span>
                <span> Hp</span>
                <span>Color</span>
              </div>
              {selectedItem && (
                <div className="flex flex-col gap-4 items-end text-red-400  font-medium">
                  <span>{selectedItem.name}</span>
                  <span>{selectedItem.class}</span>
                  <span>{selectedItem.model}</span>
                  <span>{`$${selectedItem.price}k`}</span>
                  <span>{selectedItem.eng}</span>
                  <span>{selectedItem.spd}</span>
                  <span>{selectedItem.manufacturer}</span>
                  <span>{selectedItem.drive}</span>
                  <span>{selectedItem.hp}</span>
                  <span>{selectedItem.color}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Choosecars;
