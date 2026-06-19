"use client";

import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  getBestSellers,
} from "@/services/analyticsService";

export default function MenuSection() {

  const [items,
    setItems] =
    useState([]);

  useEffect(() => {

    loadItems();

  }, []);

  const loadItems =
    async () => {

      const data =
        await getBestSellers();

      setItems(
        data
      );

    };

  return (

    <section className="py-24 bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          🔥 Popular Dishes
        </h2>

        <p className="text-center text-zinc-400 mb-14">
          Most loved dishes by our customers
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {items.map(
            (item) => (

              <motion.div
                key={item.id}
                whileHover={{
                  scale: 1.03,
                }}
                className="
                bg-zinc-900
                rounded-3xl
                overflow-hidden
                shadow-xl
                "
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                  h-64
                  w-full
                  object-cover
                  "
                />

                <div className="p-5">

                  <span
                    className="
                    bg-orange-500
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    "
                  >
                    Best Seller
                  </span>

                  <h3 className="text-2xl font-bold mt-4">
                    {item.name}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    Sold {item.quantity} times
                  </p>

                  <div className="mt-5 flex justify-between items-center">

                    <span className="text-orange-500 text-2xl font-bold">
                      ₹{item.price}
                    </span>

                    <button
                      className="
                      bg-orange-500
                      hover:bg-orange-600
                      px-5
                      py-2
                      rounded-xl
                      "
                    >
                      Order Now
                    </button>

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

        <div className="text-center mt-14">

          <a
            href="/menu"
            className="
            inline-block
            bg-white
            text-black
            px-8
            py-4
            rounded-xl
            font-semibold
            "
          >
            View Full Menu
          </a>

        </div>

      </div>

    </section>

  );

}