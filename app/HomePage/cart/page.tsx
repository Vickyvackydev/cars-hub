"use client";
import { Item, useCart } from "@/components/CartProvider";
import React, { useState, useEffect } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCheckCircle,
  FaDollarSign,
  FaEdit,
  FaFileDownload,
  FaFilePdf,
  FaPencilAlt,
  FaPlusCircle,
  FaSave,
  FaShoppingCart,
  FaTimes,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";
import "@/components/loader.css";

const generateShipId = (length: any) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const CartPage = () => {
  const router = useRouter();
  const [cartModal, setCartModal] = useState(false);
  const [deleteCart, setDeleteCart] = useState(false);
  const [pdfDownload, setPdfDownload] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [checkoutmodal, setCheckOutModal] = useState(false);
  const [randomId, setRandomId] = useState(generateShipId(6));
  const [displayDetails, setDisplayDetails] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [processModal, setProcessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);

  const {
    countitems,
    itemsListed,
    // removeFromCart,
    cartItems,
    totalPrice,
    closeModal,
    itemTodelete,
    handleDeleted,
    confirmDelete,
  } = useCart();

  const shippingFee = 2;
  const totalWithShip = totalPrice + shippingFee;

  const initialFormdata = {
    name: "",
    other: "",
    email: "",
    number: "",
    address: "",
    ship_add: "",
    card_no: "",
    exp_date: "",
  };

  const presentDate = new Date();

  const today = presentDate.toDateString();
  const [formData, setFormData] = useState(initialFormdata);
  const [time] = useState(new Date());

  const todayTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  // const IsThereData = () => {
  //   return !Object.values(formData).every((value) => value.trim() !== "");
  // };

  const IsThereData =
    formData.name === "" ||
    formData.other === "" ||
    formData.email === "" ||
    formData.address === "" ||
    formData.ship_add === "" ||
    formData.card_no.length !== 16 ||
    formData.exp_date.length !== 5 ||
    formData.number.length !== 11;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^(\d{0,2}\/)?(\d{0,2})$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        exp_date: value.replace(/^(\d{2})/, "$1/").replace(/\//, ""),
      }));
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,16}$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        card_no: value.slice(0, 16),
      }));
    }
  };

  const handleEdit = () => {
    setFormData({ ...formData });
    setFormModal(true);
    setDisplayDetails(false);
  };

  const handleCartDetailsModal = () => {
    setCartModal(true);
  };

  const handleFormClick = () => {
    setCartModal(false);
    setWaiting(true);

    const delay = 2000;
    setTimeout(() => {
      setFormModal(true);
      setWaiting(false);
    }, delay);
  };

  const handleDetails = () => {
    setFormModal(false);
    setWaiting(true);
    const delay = 3000;
    setTimeout(() => {
      setDisplayDetails(true);
      setWaiting(false);
    }, delay);
  };

  const handleCheckout = () => {
    setDisplayDetails(false);
    setWaiting(true);

    const delay = 3000;
    setTimeout(() => {
      setWaiting(false);
      setTimeout(() => {
        setCheckOutModal(true);
      }, 500);
    }, delay);
  };

  const handlePaymentModal = () => {
    setCheckOutModal(false);

    const delay = 3000;
    setTimeout(() => {
      setProcessModal(true);
      setLoading(true);
      setTimeout(() => {
        setProcessModal(false);
        setLoading(false);
      }, 7000);
      setTimeout(() => {
        setSuccess(true);
      }, 1000);
    }, delay);
  };
  const handleBackAfterReceipt = () => {
    setPdfModal(false);
    setSuccess(true);
  };
  const handlePdf = () => {
    setSuccess(false);

    setTimeout(() => {
      setPdfModal(true);
    }, 1000);
  };

  const handledownload = () => {
    setPdfModal(false);
    setTimeout(() => {
      setPdfDownload(true);
    }, 1000);
  };

  const MyDocument = () => {
    const itemsCounted = countitems(0);
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={styles.titleContainer}>
              <Text style={styles.content}>Full name:</Text>
              <Text style={styles.content}>Other name:</Text>
              <Text style={styles.content}>Email:</Text>
              <Text style={styles.content}>Phone number:</Text>
              <Text style={styles.content}>Home address:</Text>
              <Text style={styles.content}>Shipping add:</Text>
              <Text style={styles.content}>Card no.:</Text>
              <Text style={styles.content}>Card type:</Text>
              <Text style={styles.content}>Expiry date:</Text>
              <Text style={styles.content}>Shipping id:</Text>
              <Text style={styles.content}>Shipping fee:</Text>
              <Text style={styles.content}>Cars ordered:</Text>
              <Text style={styles.content}>Total amount:</Text>

              <Text style={styles.content}>From:</Text>
              <Text style={styles.content}>Payment status:</Text>
              <Text style={styles.content}>message:</Text>
              <Text style={styles.content}>Date:</Text>
              <Text style={styles.content}>Time:</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{formData.name}</Text>
              <Text style={styles.content}>{formData.other}</Text>
              <Text style={styles.content}>{formData.email}</Text>
              <Text style={styles.content}>{formData.number}</Text>
              <Text style={styles.content}>{formData.address}</Text>
              <Text style={styles.content}>{formData.ship_add}</Text>
              <Text style={styles.content}>{formData.card_no}</Text>
              <Text style={styles.content}>Visa</Text>
              <Text style={styles.content}>{formData.exp_date}</Text>
              <Text style={styles.content}>{randomId}</Text>
              <Text style={styles.content}>{"$ 2k"}</Text>
              <Text style={styles.content}>{cartItems.length}</Text>
              <Text style={styles.content}>{`$ ${totalWithShip}k`}</Text>
              <Text style={styles.content}>www.carshub.org</Text>
              <Text style={styles.content}>Successful</Text>
              <Text style={styles.content}>Transaction Approved</Text>
              <Text style={styles.content}>{today}</Text>
              <Text style={styles.content}>{todayTime}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#e4e4e4",
    },
    section: {
      margin: 10,
      padding: 10,
      display: "flex",
      flexGrow: 1,
      // flexDirection: "row",
      justifyContent: "space-between",
    },
    titleContainer: {
      width: "50%",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },

    contentContainer: {
      width: "50%",
      textAlign: "right",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    content: {
      fontSize: 14,
    },
  });
  return (
    <div>
      <div className="pt-[10rem] flex justify-center items-center flex-col gap-5 lg:px-32 xs:px-0">
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="text-4xl font-semibold  text-red-400"
        >
          Your cart
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 2 }}
          className="w-full h-full bg-white lg:shadow-md xs:shadow-none rounded-lg px-7 py-7"
        >
          {cartItems.length === 0 ? (
            <div className="py-20 px-20 flex justify-center items-center flex-col">
              <span className=" text-xl text-red-400 font-semibold">
                No Items Added
              </span>
              <p className="text-lg font-medium text-slate-700 ">
                Add items to your cart
              </p>
              <Button
                text="Add items"
                textStyles="text-white"
                btnStyles="bg-red-400 mt-10 py-2 px-3 rounded-lg gap-1"
                icon={<FaPlusCircle />}
                iconStyles="text-white pt-1"
                handleClick={() => router.push("/HomePage")}
              />
            </div>
          ) : (
            <div className="">
              {cartItems.map((item, i) => (
                <div key={i} className="grid grid-cols-3 gap-5 border-b-2 pb-6">
                  <div>
                    <img src={item.img} alt="" width={200} height={200} />
                  </div>
                  <div className="flex flex-col lg:pt-7 xs:-pt-1">
                    <span className="lg:text-xl xs:text-sm text-[#333] font-semibold pt-5">
                      {item.name}
                    </span>
                    <span className="lg:text-lg xs:text-xs font-medium text-red-400">
                      {item.class}
                    </span>
                  </div>

                  <div className="flex justify-between lg:pt-5 xs:pt-3 items-center flex-1">
                    <div className="flex justify-around flex-1 xs:flex-col lg:flex-row">
                      <span className="text-gray-400 xs:text-xs lg:text-lg">
                        {item.model}
                      </span>
                      <span className="text-red-400 font-semibold  xs:text-xs lg:text-lg">
                        {`$ ${item.price} K`}
                      </span>
                    </div>
                    <button
                      className="w-7 h-7 rounded-full flex justify-center items-center border border-red-400 hover:scale-90 transition-all"
                      onClick={() => {
                        setDeleteCart(true);
                        handleDeleted(item);
                      }}
                      // onClick={() => handleDeleted(item)}
                    >
                      <span>
                        <FaTimes />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-end justify-end py-5 gap-5 pr-20">
                <span className="text-gray-400 text-lg font-medium">
                  Total amount:
                </span>
                <span className="text-red-400 text-lg font-semibold">
                  {`$ ${totalPrice} k`}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 2 }}
        className="flex justify-center py-5 items-center lg:gap-[20rem] xs:gap-[5rem]"
      >
        {cartItems.length !== 0 && (
          <>
            <Button
              btnStyles="w-fit h-fit bg-red-400 shadow-sm py-3 px-5 rounded-md gap-2"
              textStyles="text-white pt-1"
              text="Add more"
              icon={<FaPlusCircle />}
              iconStyles="pt-[0.4rem] text-white"
              handleClick={() => router.push("/HomePage")}
            />
            <Button
              btnStyles="w-fit h-fit border-red-400 border-2 shadow-sm py-3 px-5 rounded-md gap-2"
              textStyles="text-red-400"
              text="Place order"
              icon={<FaShoppingCart />}
              iconStyles="pt-[0.25rem] text-red-400"
              handleClick={handleCartDetailsModal}
            />
          </>
        )}
      </motion.div>

      {/* Delete from cart modal */}

      <Modal isOpen={deleteCart} isClose={() => setDeleteCart(false)}>
        <div className="px-10">
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="flex justify-center items-center bg-red-400 w-16 h-16 rounded-full">
              <span className="text-3xl text-white ">
                <FaTrash />
              </span>
            </div>
            {itemTodelete !== null && (
              <div>
                <span className="text-red-400 text-xl">
                  Do you want to remove item from cart?
                </span>
                {/* <button onClick={() => confirmDelete()}>open</button>
                <button>close</button> */}
                <div className="flex justify-between items-center mt-8">
                  <Button
                    text="cancel"
                    textStyles="text-white"
                    icon={<FaTimesCircle />}
                    iconStyles="text-white pt-[0.130rem]"
                    handleClick={() => setDeleteCart(false)}
                    btnStyles="bg-red-400 px-3 py-2 rounded-lg gap-2"
                  />
                  {/* <Button text="Delete" handleClick={confirmDelete} /> */}
                  <button
                    onClick={() => {
                      setDeleteCart(false);
                      confirmDelete();
                    }}
                    className="bg-red-400 px-3 py-2 flex gap-2 rounded-lg text-white"
                  >
                    <span className=" pt-[0.125rem] ">
                      <FaTrash />
                    </span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* cartmodal */}

      <Modal isOpen={cartModal} isClose={() => setCartModal(false)}>
        <div className="px-10">
          <span className="text-red-400 text-xl font-semibold">
            Cart details
          </span>
          <div className="mt-6">
            {itemsListed.map((id) => (
              <div
                key={id}
                className="flex justify-between font-semibold pt-4 text-[#333]"
              >
                <span>{cartItems.find((item) => item.id === id)?.name}</span>
                <span>{`${countitems(id)}`}</span>
              </div>
            ))}
            <div className="flex flex-col">
              <div className="flex justify-between mt-7 text-red-400 text-lg">
                <span>Total cars added</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="mt-6">
                <span className="text-red-400 font-bold">
                  Total price: {`$ ${totalPrice} 000`}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  text={`${waiting ? "Please wait..." : "Proceed"}`}
                  textStyles="text-white"
                  btnStyles="bg-red-400 px-3 py-1 rounded-lg mt-7 "
                  handleClick={handleFormClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* form modal */}

      <Modal isOpen={formModal} isClose={() => setFormModal(false)}>
        <div className="px-10">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-red-400">
              Fill in the details
            </span>
            <p className="text-sm font-mono">
              Your <span className="text-red-400 ">shipping id</span> has being
              generated
            </p>
          </div>
          <div className="flex flex-col mt-6">
            <form action="">
              <div className="flex flex-col items-start gap-5 ">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="full name"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none text-slate-700"
                />

                <input
                  type="text"
                  name="other"
                  value={formData.other}
                  onChange={handleChange}
                  placeholder="other name"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />

                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />

                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="phone number"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="address"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />

                <input
                  type="text"
                  name="ship_add"
                  value={formData.ship_add}
                  onChange={handleChange}
                  placeholder="shipping address"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />

                <div>
                  <input
                    type="text"
                    name="card_no"
                    value={formData.card_no}
                    onChange={handleCardNumberChange}
                    placeholder="card no."
                    className="lg:w-[20rem] xs:w-[15rem] border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                  />
                  {formData.card_no.length !== 16 ? (
                    <span className="flex items-start text-xs text-red-500">
                      card no. must be 16 digit
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <input
                  type="text"
                  name="exp_date"
                  value={formData.exp_date}
                  onChange={handleDateChange}
                  placeholder="mm/yy"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />

                <input
                  type="text"
                  name="ship_id"
                  value={randomId}
                  placeholder="shipping id"
                  className="w-full border py-3 px-2 rounded-lg  placeholder:text-gray-300 outline-none"
                />
              </div>
            </form>

            <div className="flex justify-center items-center">
              <Button
                text={`${waiting ? "Processing..." : "Process details"}`}
                textStyles="text-white"
                btnStyles={`${
                  IsThereData ? "bg-red-100" : "bg-red-400"
                } px-3 py-2 rounded-lg mt-5`}
                handleClick={handleDetails}
                disabled={IsThereData}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* form details modal  */}

      <Modal isOpen={displayDetails} isClose={() => setDisplayDetails(false)}>
        <div>
          <span className="text-lg font-semibold text-red-400">
            Confirm details
          </span>
          <div className="flex justify-between  mt-8">
            <div className="flex flex-col items-start gap-5">
              <span>Full name:</span>
              <span>Other name:</span>
              <span>Email:</span>
              <span>Phone number:</span>
              <span>Home address:</span>
              <span className="xs:">Shipping add.:</span>
              <span>Card no.:</span>
              <span>Expiry date:</span>
              <span>Shipping id:</span>
              <span>Shipping fee:</span>
            </div>
            <div className="flex flex-col items-end gap-5 font-medium text-[#333]">
              <span>{formData.name}</span>
              <span>{formData.other}</span>
              <span>{formData.email}</span>
              <span>{formData.number}</span>
              <span>{formData.ship_add}</span>
              <span>{formData.address}</span>
              <span>{formData.card_no}</span>
              <span>{formData.exp_date}</span>
              <span>{randomId}</span>
              <span>{"$ 2k"}</span>
            </div>
          </div>
          <div className="flex justify-between mt-7 px-6">
            <Button
              text="Edit"
              textStyles="text-white"
              icon={<FaPencilAlt />}
              iconStyles="text-white pt-[0.125rem] "
              btnStyles="bg-red-400 py-2 px-2 rounded-lg px-7"
              handleClick={handleEdit}
            />
            <Button
              text={`${waiting ? "Please wait..." : "Checkout"}`}
              textStyles="text-white"
              icon={<FaArrowAltCircleRight />}
              iconStyles="text-white pt-[0.125rem]"
              btnStyles="bg-red-400 py-2 px-2 rounded-lg flex-row-reverse"
              handleClick={handleCheckout}
            />
          </div>
        </div>
      </Modal>

      {/* checkout modal */}

      <Modal isOpen={checkoutmodal} isClose={() => setCheckOutModal(false)}>
        <div className="">
          <div className="flex flex-col">
            <span className="text-lg text-red-400 font-semibold">
              Check out
            </span>
            <span className="text-sm text-red-400 font-mono">
              Confirm details to get your order
            </span>
          </div>
          <div className="flex justify-between mt-7 lg:px-6 xs:px-2">
            <div className="flex flex-col gap-5 items-start">
              <span>Name:</span>
              <span>Email:</span>
              <span>Phone no:</span>
              <span>Shipping add.:</span>
              <span>Shipping id:</span>
              <span>Total amount:</span>
            </div>
            <div className="flex flex-col gap-5 items-end text-[#333] font-medium">
              <span>{formData.name}</span>
              <span>{formData.email}</span>
              <span>{formData.number}</span>
              <span>{formData.ship_add}</span>
              <span>{randomId}</span>
              <span>{`$${totalWithShip} 000`}</span>
            </div>
          </div>
          <div className="flex items-center justify-center mt-9">
            <Button
              text="Pay now"
              textStyles="text-white"
              btnStyles="bg-red-400 py-2 px-2 rounded-lg flex-row-reverse"
              icon={<FaDollarSign />}
              iconStyles="text-white pt-[0.128rem]"
              handleClick={handlePaymentModal}
            />
          </div>
        </div>
      </Modal>

      {/* processing payment modal */}

      {processModal ? (
        <Modal isOpen={processModal} isClose={() => setProcessModal(false)}>
          <div>
            {loading && (
              <div className="flex flex-col gap-4">
                <span className="text-xl text-red-400 px-10 flex justify-center items-center">
                  Please wait while we process your payment
                </span>
                <div className="flex justify-center items-center">
                  <div className="loader flex justify-center items-center" />
                </div>
              </div>
            )}
          </div>
        </Modal>
      ) : (
        // success modal

        <Modal isOpen={success} isClose={() => setSuccess(false)}>
          <div className="flex flex-col gap-5">
            <span className="text-7xl text-red-400 flex justify-center items-center">
              <FaCheckCircle />
            </span>
            <div className="flex flex-col">
              <span className="text-3xl text-red-400">Congratulations</span>
              <span className="text-lg text-red-400 font-mono">
                Payment was successfull
              </span>
            </div>
            <div className="flex justify-between mt-6 px-6 ">
              <Button
                text="View receipt"
                textStyles="text-white"
                btnStyles="bg-red-400 py-2 px-3 rounded-lg"
                handleClick={handlePdf}
              />
              <Button
                text={`${waiting ? "please wait..." : "checkout page"}`}
                textStyles="text-white"
                btnStyles="bg-red-400 py-2 px-3 rounded-lg"
                handleClick={() => router.push("/HomePage/successful")}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* pdf modal */}

      <Modal isOpen={pdfModal} isClose={() => setPdfModal(false)}>
        <div>
          <span className="text-xl text-[#333] font-medium">RECEIPT</span>
        </div>
        <MyDocument />
        <span>Thanks for your patronage</span>
        <div className="flex justify-between px-5 mt-5">
          <Button
            text="Back"
            textStyles="text-white"
            btnStyles="bg-red-400 px-3 py-2 rounded-lg"
            icon={<FaArrowAltCircleLeft />}
            iconStyles="pt-[0.125rem] text-white"
            handleClick={handleBackAfterReceipt}
          />
          <Button
            text="Save"
            textStyles="text-white"
            btnStyles="bg-red-400 px-3 py-2 rounded-lg flex-row-reverse"
            icon={<FaSave />}
            iconStyles="pt-[0.125rem] text-white"
            handleClick={handledownload}
          />
        </div>
      </Modal>

      <Modal isOpen={pdfDownload} isClose={() => setPdfDownload(false)}>
        <div className="flex justify-center items-center flex-col">
          <div className=" flex flex-col gap-3 justify-center items-center">
            <div className="w-16 h-16 rounded-full bg-red-400 flex justify-center items-center">
              <span className="text-3xl text-white">
                <FaFileDownload />
              </span>
            </div>
            <span className="text-red-400 text-2xl ">
              Proceed to download your receipt
            </span>
          </div>

          <PDFDownloadLink
            document={<MyDocument />}
            fileName="receipt.pdf"
            className="bg-red-400 px-3 py-2 mt-7 text-white rounded-lg hover:scale-90 transition-all "
            onClick={() => setPdfDownload(false)}
          >
            {({ blob, url, loading, error }) => (
              <div className="flex gap-3 ">
                <span>{loading ? "loading document..." : "Download pdf"}</span>
                <span className="pt-[0.125rem]">
                  <FaFilePdf />
                </span>
              </div>
            )}
          </PDFDownloadLink>
        </div>
      </Modal>
    </div>
  );
};

export default CartPage;
