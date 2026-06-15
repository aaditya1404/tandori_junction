"use client";

import { motion } from "framer-motion";

export default function AboutRestaurant() {
  return (
    <section className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          src="/restaurant.jpg"
          alt="restaurant"
          className="rounded-2xl"
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">
            Our Story
          </h2>

          <p className="text-zinc-300 leading-8">
            We serve authentic Indian, Chinese,
            Tandoori and Fast Food dishes prepared
            with fresh ingredients and traditional recipes.
          </p>
        </motion.div>

      </div>
    </section>
  );
}