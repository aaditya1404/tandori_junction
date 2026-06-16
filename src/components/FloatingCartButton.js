"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FloatingCartButton() {
  const {
    cart,
    totalCartItems,
    setCartOpen,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (totalCartItems === 0) return null;

  return (
    <motion.button
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      whileHover={{
        scale: 1.05,
      }}
      onClick={() => setCartOpen(true)}
      className="
      fixed
      bottom-6
      right-6
      z-50
      bg-orange-500
      text-white
      px-5
      py-3
      rounded-full
      shadow-xl
      flex
      items-center
      gap-3
      "
    >
      <span>🛒</span>

      <span>
        {totalCartItems} Items
      </span>

      <span>|</span>

      <span>
        ₹{total}
      </span>
    </motion.button>
  );
}