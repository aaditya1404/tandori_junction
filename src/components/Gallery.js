"use client";

import { motion } from "framer-motion";

const images = [
  "/gallery/biryani.jpg",
  "/gallery/tandoori.jpg",
  "/gallery/paneer.jpg",
  "/gallery/chowmein.jpg",
  "/gallery/momos.jpg",
  "/gallery/burger.jpg",
];

export default function Gallery() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          Food Gallery
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Freshly prepared with authentic flavours
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              className="
              overflow-hidden
              rounded-2xl
              cursor-pointer
              "
            >
              <img
                src={image}
                alt="food"
                className="
                w-full
                h-80
                object-cover
                "
              />
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}