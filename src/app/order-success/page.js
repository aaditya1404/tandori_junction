"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  const orderId = "TJ1045";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div
        className="
        max-w-xl
        w-full
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-10
        text-center
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
            Order ID
          </p>

          <h2 className="text-2xl font-bold text-orange-500">
            #{orderId}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">

          <Link
            href={`/track-order?id=${orderId}`}
            className="
            bg-orange-500
            py-3
            rounded-xl
            font-semibold
            "
          >
            Track Order
          </Link>

          <Link
            href="/menu"
            className="
            bg-zinc-800
            py-3
            rounded-xl
            font-semibold
            "
          >
            Order More
          </Link>

        </div>
      </div>

    </div>
  );
}