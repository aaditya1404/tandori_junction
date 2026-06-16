"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      px-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
        max-w-xl
        w-full
        text-center
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-10
        "
      >
        <div className="text-7xl mb-6">
          🎉
        </div>

        <h1 className="text-4xl font-bold">
          Order Placed Successfully
        </h1>

        <p className="text-zinc-400 mt-4">
          Thank you for ordering from
          Tandoori Junction
        </p>

        <div
          className="
          mt-8
          bg-zinc-800
          rounded-2xl
          p-5
          "
        >
          <p className="text-zinc-400">
            Order Number
          </p>

          <h2 className="text-3xl font-bold text-orange-500">
            #TJ1034
          </h2>
        </div>

        <div className="mt-8 space-y-4">

          <div className="flex items-center gap-3">
            ✅ Order Received
          </div>

          <div className="flex items-center gap-3">
            👨‍🍳 Preparing Food
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            🚚 Out For Delivery
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            🏠 Delivered
          </div>

        </div>

        <div className="flex gap-4 mt-10">

          <Link
            href="/menu"
            className="
            flex-1
            bg-zinc-800
            py-3
            rounded-xl
            "
          >
            Order More
          </Link>

          <Link
            href="/track-order"
            className="
            flex-1
            bg-orange-500
            py-3
            rounded-xl
            "
          >
            Track Order
          </Link>

        </div>
      </motion.div>
    </div>
  );
}