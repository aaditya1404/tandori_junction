"use client";

import { motion } from "framer-motion";

export default function MenuNode({ item }) {

  return (

    <motion.div
      whileHover={{
        y: -8,
      }}
      className="
      bg-zinc-900
      rounded-2xl
      overflow-hidden
      border
      border-zinc-800
      shadow-xl
      "
    >

      <img
        src={
          item.image ||
          "/food-placeholder.jpg"
        }
        alt={item.name}
        className="
        h-56
        w-full
        object-cover
        "
      />

      <div className="p-5">

        <div className="flex justify-between items-start">

          <h3
            className="
            text-xl
            font-bold
            text-white
            "
          >
            {item.name}
          </h3>

          {!item.isAvailable && (

            <span
              className="
              text-red-500
              text-sm
              "
            >
              Out Of Stock
            </span>

          )}

        </div>

        <p
          className="
          text-zinc-400
          mt-3
          min-h-[48px]
          "
        >
          {item.description}
        </p>

        <div className="flex gap-2 mt-4">

          {item.isChefSpecial && (

            <span
              className="
              bg-purple-600
              px-3
              py-1
              rounded-full
              text-xs
              "
            >
              👨‍🍳 Chef Special
            </span>

          )}

        </div>

        <div
          className="
          flex
          justify-between
          items-center
          mt-6
          "
        >

          <div>

            <p
              className="
              text-orange-500
              text-2xl
              font-bold
              "
            >
              ₹
              {item.finalPrice ||
                item.price}
            </p>

          </div>

          <button
            className="
            bg-orange-500
            hover:bg-orange-600
            px-4
            py-2
            rounded-lg
            "
          >
            Add To Cart
          </button>

        </div>

      </div>

    </motion.div>

  );

}