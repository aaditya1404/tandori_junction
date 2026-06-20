"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext =
  createContext();

export function CartProvider({
  children,
}) {
  const [cart, setCart] =
    useState([]);

  const [cartOpen, setCartOpen] =
    useState(false);

  const addToCart = (item) => {
    if (
      item.isAvailable === false
    ) {
      alert(
        "This item is currently unavailable"
      );
      return;
    }

    const existing = cart.find(
      (i) => i.name === item.name
    );

    if (existing) {
      setCart(
        cart.map((i) =>
          i.name === item.name
            ? {
                ...i,
                quantity:
                  i.quantity + 1,
              }
            : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQty = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (name) => {
    setCart(
      cart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalCartItems,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () =>
  useContext(CartContext);