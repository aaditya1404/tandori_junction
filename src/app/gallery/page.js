"use client";

import { motion } from "framer-motion";

const galleryItems = [
  {
    title: "Chicken Biryani",
  },
  {
    title: "Chicken Tikka",
  },
  {
    title: "Butter Chicken",
  },
  {
    title: "Veg Chowmein",
  },
  {
    title: "Paneer Tikka",
  },
  {
    title: "Mutton Biryani",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="py-20 text-center border-b border-zinc-800">

        <h1 className="text-5xl md:text-6xl font-bold">
          Food Gallery
        </h1>

        <p className="text-zinc-400 mt-4">
          Our most loved dishes
        </p>

      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-6">

          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="
              bg-gradient-to-br
              from-zinc-900
              to-zinc-800
              h-72
              rounded-2xl
              border
              border-zinc-700
              flex
              items-center
              justify-center
              text-center
              "
            >
              <div>
                <div className="text-6xl mb-4">
                  🍽️
                </div>

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}