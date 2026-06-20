"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul",
      review: "Amazing food and quick service.",
    },
    {
      name: "Priya",
      review: "Best biryani in town.",
    },
    {
      name: "Amit",
      review: "Loved the tandoori dishes.",
    },
    {
      name: "Sneha",
      review:
        "The ambience and food were absolutely incredible!",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide (resets whenever current changes)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [current, reviews.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <section className="bg-zinc-950 py-24 text-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-orange-500 text-sm font-semibold">
            Testimonials
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-zinc-400">
            Real experiences from our happy customers.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative mx-auto w-full max-w-4xl h-[350px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:p-10 flex flex-col justify-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (info.offset.x < -50) {
                  nextSlide();
                } else if (info.offset.x > 50) {
                  prevSlide();
                }
              }}
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -80,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {/* Stars */}
              <div className="text-orange-500 text-3xl mb-5">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-xl md:text-2xl leading-9 text-zinc-300 italic">
                &quot;{reviews[current].review}&quot;
              </p>

              {/* User */}
              <div className="mt-10 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xl">
                  {reviews[current].name[0]}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {reviews[current].name}
                  </h3>

                  <p className="text-zinc-500">
                    Verified Customer
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${current === index
                  ? "w-8 h-3 rounded-full bg-orange-500"
                  : "w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-500"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}