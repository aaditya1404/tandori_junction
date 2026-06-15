"use client";

import categories from "@/data/categories";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {categories.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="
              bg-white
              rounded-xl
              overflow-hidden
              shadow-lg
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="
                h-56
                w-full
                object-cover
                "
              />

              <div className="p-4">

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}