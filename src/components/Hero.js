"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="
      h-screen
      bg-[url('/hero.jpg')]
      bg-cover
      bg-center
      relative
      flex
      items-center
      "
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="
          text-6xl
          font-bold
          text-white
          "
        >
          Delicious Food
        </motion.h1>

        <p className="text-gray-200 mt-4 max-w-lg">
          Taste authentic Indian food with
          fresh ingredients and amazing flavour.
        </p>

        <div className="flex gap-4 mt-8">

          <button
            className="
            bg-orange-600
            px-6
            py-3
            rounded-lg
            text-white
            "
          >
            Order Now
          </button>

          <button
            className="
            border
            border-white
            text-white
            px-6
            py-3
            rounded-lg
            "
          >
            View Menu
          </button>

        </div>

      </div>
    </section>
  );
}