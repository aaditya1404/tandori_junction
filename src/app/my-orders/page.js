"use client";

import Link from "next/link";

export default function MyOrdersPage() {
  const orders = [
    {
      id: "TJ1034",
      total: 540,
      status: "Preparing",
      date: "15 Jun 2025",
    },
    {
      id: "TJ1033",
      total: 320,
      status: "Delivered",
      date: "12 Jun 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            My Orders
          </h1>

          <p className="text-zinc-400 mt-3">
            View all your previous orders
          </p>

        </div>
      </div>

      {/* Orders */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
              "
            >
              <div className="flex justify-between items-center flex-wrap gap-4">

                <div>
                  <h2 className="text-2xl font-bold">
                    #{order.id}
                  </h2>

                  <p className="text-zinc-400 mt-1">
                    {order.date}
                  </p>
                </div>

                <div>
                  <p className="text-orange-500 text-xl font-bold">
                    ₹{order.total}
                  </p>
                </div>

                <div>
                  <span
                    className={`
                    px-4
                    py-2
                    rounded-full
                    text-sm

                    ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }
                  `}
                  >
                    {order.status}
                  </span>
                </div>

              </div>

              <div className="mt-6 flex gap-4">

                <Link
                  href={`/track-order?id=${order.id}`}
                  className="
                  bg-orange-500
                  px-5
                  py-2
                  rounded-xl
                  "
                >
                  Track Order
                </Link>

                <button
                  className="
                  bg-zinc-800
                  px-5
                  py-2
                  rounded-xl
                  "
                >
                  Reorder
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}