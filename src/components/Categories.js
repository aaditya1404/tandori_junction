"use client";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import {
  getPopularItems,
} from "@/services/analyticsService";

export default function Categories() {

  const [items,
    setItems] =
    useState([]);

  useEffect(() => {

    loadItems();

  }, []);

  const loadItems =
    async () => {

      const data =
        await getPopularItems();

      setItems(
        data
      );

    };

  return (

    <section className="py-20 bg-zinc-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2
          className="
          text-4xl
          font-bold
          text-center
          mb-12
          "
        >
          Most Ordered This Week
        </h2>

        {items.length === 0 ? (

          <div
            className="
            text-center
            text-gray-500
            "
          >
            No sales data available
          </div>

        ) : (

          <div
            className="
            grid
            md:grid-cols-3
            gap-8
            "
          >

            {items.map(
              (item) => (

                <motion.div
                  key={item.name}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                  bg-white
                  rounded-xl
                  overflow-hidden
                  shadow-lg
                  "
                >

               <img
  src={
    item.image &&
    item.image.trim() !== ""
      ? item.image
      : "https://images.unsplash.com/photo-1544025162-d76694265947"
  }
  alt={item.name}
  className="
  h-56
  w-full
  object-cover
  "
/>

                  <div className="p-4">

                    <h3
                      className="
                      text-xl
                      font-semibold
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                      text-gray-500
                      mt-2
                      "
                    >
                      {item.quantity}
                      {" "}
                      sold this week
                    </p>

                  </div>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}