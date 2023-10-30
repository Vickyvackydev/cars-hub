"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export type Item = {
  id: number;
  img: string;
  name: string;
  price: number;
  model: string;
  class: string;
  stats: string;
  eng: string;
  spd: string;
  manufacturer: string;
  drive: string;
  hp: string;
  color: string;
};

type CartContextType = {
  cartItems: Item[];
  addTocart: (item: Item) => void;
  // removeFromCart: (item: Item) => void;
  totalPrice: number;
  itemsAdded: number;
  countitems: (id: number) => void;
  itemsListed: number[];
  handleDeleted: (item: Item) => void;
  itemTodelete: Item[];
  closeModal: () => void;
  confirmDelete: () => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addTocart: (item: Item) => {},
  // removeFromCart: (item: Item) => {},
  totalPrice: 0,
  itemsAdded: 0,
  countitems: (id: number) => {},
  itemsListed: [],
  handleDeleted: (item: Item) => {},
  closeModal: () => {},
  itemTodelete: [],
  confirmDelete: () => {},
});

export const useCart = () => useContext(CartContext);

type childrenProps = {
  children: React.ReactNode;
};
export const CartProvider = ({ children }: childrenProps) => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [itemsAdded, setItemsAdded] = useState<number>(0);
  const [itemTodelete, setItemTodelete] = useState<Item | null>(null);
  const [deleteCart, setDeleteCart] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
      setItemsAdded(JSON.parse(cartData).length);
    }
  }, []);

  const addTocart = (item: Item) => {
    const updatedItems = [...cartItems, item];
    setCartItems(updatedItems);
    setItemsAdded(updatedItems.length);
    setItemsAdded(itemsAdded + 1);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // const removeFromCart = (item: Item) => {
  //   const updatedCart = [...cartItems];
  //   const index = updatedCart.findIndex((cartItem) => cartItem.id !== item.id);

  //   if (index !== item.id) {
  //     updatedCart.splice(index, 1);
  //     setCartItems(updatedCart);
  //     setItemsAdded(updatedCart.length);
  //     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  //   }
  // };

  const handleDeleted = (item: Item) => {
    setDeleteCart(true);
    setItemTodelete(item);
  };

  const closeModal = () => {
    setDeleteCart(false);
  };
  const confirmDelete = (item: Item) => {
    if (itemTodelete) {
      // const updatedCart = cartItems.filter(
      //   (cartItem) => cartItem.id !== itemTodelete.id
      // );
      // setCartItems(updatedCart);
      // setItemsAdded(updatedCart.length);
      // localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      // const updatedCart = [...cartItems];
      // const index = cartItems.findIndex(
      //   (cartItem) => cartItem.id !== itemTodelete.id
      // );

      // if (index !== itemTodelete.id) {
      //   const updatedCart = [...cartItems];
      //   updatedCart.splice(index, +1);
      //   setCartItems(updatedCart);
      //   setItemsAdded(updatedCart.length);
      //   localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      // }

      const index = cartItems.findIndex(
        (cartItem) => cartItem.id === itemTodelete.id
      );
      if (index !== -1) {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        setItemsAdded(updatedCart.length);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    }
    setItemTodelete(null);
    closeModal();
  };
  const countitems = (id: number) => {
    return cartItems.filter((item) => item.id === id).length;
  };

  const itemsListed = Array.from(new Set(cartItems.map((item) => item.id)));
  const totalPrice = cartItems.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );
  const contextValue = {
    cartItems,
    addTocart,
    // removeFromCart,
    totalPrice,
    itemsAdded,
    countitems,
    itemsListed,
    handleDeleted,
    closeModal,
    confirmDelete,
    itemTodelete,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
