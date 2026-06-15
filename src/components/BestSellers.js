"use client";

import { motion } from "framer-motion";
import bestSellers from "@/data/bestSellers";

export default function BestSellers() {
  return (
    <section className="py-24 bg-black text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          Best Sellers
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Customer favourites from our kitchen
        </p>

        <div className="grid md:grid-cols-4 gap-8">

          {bestSellers.map((dish) => (
            <motion.div
              key={dish.id}
              whileHover={{ y: -10 }}
              className="
              bg-zinc-900
              rounded-2xl
              overflow-hidden
              border
              border-zinc-800
              "
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="
                h-60
                w-full
                object-cover
                "
              />

              <div className="p-5">

                <span
                  className="
                  bg-orange-600
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  "
                >
                  {dish.tag}
                </span>

                <h3 className="text-xl font-semibold mt-4">
                  {dish.name}
                </h3>

                <div className="flex justify-between items-center mt-4">

                  <span className="text-orange-500 text-xl">
                    ₹{dish.price}
                  </span>

                  <button
                    className="
                    bg-orange-600
                    px-4
                    py-2
                    rounded-lg
                    "
                  >
                    Order
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}