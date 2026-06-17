"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  observeAuthState,
} from "@/services/authService";

import {
  subscribeToUserOrders,
} from "@/services/orderService";

export default function MyOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    let unsubscribeOrders;

    const unsubscribeAuth =
      observeAuthState(
        (user) => {

          if (!user) {

            setLoading(false);
            return;

          }

          unsubscribeOrders =
            subscribeToUserOrders(
              user.uid,

              (orders) => {

                setOrders(
                  orders
                );

                setLoading(
                  false
                );

              }
            );

        }
      );

    return () => {

      unsubscribeAuth();

      if (
        unsubscribeOrders
      ) {

        unsubscribeOrders();

      }

    };

  }, []);

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Orders...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-black text-white">

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

      <div className="max-w-6xl mx-auto px-6 py-12">

        {orders.length === 0 ? (

          <div
            className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-2xl
            p-10
            text-center
            "
          >
            No Orders Yet
          </div>

        ) : (

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

                      {order.createdAt?.seconds
                        ? new Date(
                            order.createdAt.seconds *
                            1000
                          ).toLocaleString()
                        : "N/A"}

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
                        order.status ===
                        "delivered"
                          ? "bg-green-500"
                          : order.status ===
                            "out_for_delivery"
                          ? "bg-purple-500"
                          : order.status ===
                            "preparing"
                          ? "bg-blue-500"
                          : "bg-orange-500"
                      }
                    `}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                <div className="mt-6">

                  <h3 className="font-semibold mb-3">
                    Ordered Items
                  </h3>

                  <div className="space-y-2">

                    {order.items?.map(
                      (item) => (

                        <div
                          key={item.name}
                          className="
                          flex
                          justify-between
                          "
                        >

                          <span>
                            {item.name}
                            {" × "}
                            {item.quantity}
                          </span>

                          <span>
                            ₹
                            {item.price *
                              item.quantity}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

                <div className="mt-6 flex gap-4">

                  <Link
                    href={`/track-order/${order.id}`}
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

        )}

      </div>

    </div>
  );
}