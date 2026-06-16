"use client";

import { useEffect, useState } from "react";

import {
  observeAuthState,
} from "@/services/authService";

import {
  getUserOrders,
} from "@/services/orderService";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsubscribe =
      observeAuthState(
        async (user) => {

          if (!user) {
            setLoading(false);
            return;
          }

          const result =
            await getUserOrders(
              user.uid
            );

          if (result.success) {
            setOrders(
              result.orders
            );
          }

          setLoading(false);

        }
      );

    return () => unsubscribe();

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

      <div className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold mb-10">
          My Orders
        </h1>

        {orders.length === 0 && (
          <div
            className="
            bg-zinc-900
            p-10
            rounded-2xl
            "
          >
            No Orders Yet
          </div>
        )}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="
              bg-zinc-900
              p-6
              rounded-2xl
              border
              border-zinc-800
              "
            >

              <h2 className="font-bold text-xl">
                Order #{order.id}
              </h2>

              <p className="mt-2">
                Status:
                <span className="ml-2 text-orange-500">
                  {order.status}
                </span>
              </p>

              <p className="mt-2">
                Total:
                ₹{order.total}
              </p>

              <p className="mt-2 text-zinc-400">
                Payment:
                {order.paymentMethod}
              </p>

              <div className="mt-4">

                <h3 className="font-semibold mb-2">
                  Items
                </h3>

                {order.items?.map(
                  (item) => (
                    <p
                      key={item.name}
                    >
                      {item.name}
                      {" × "}
                      {item.quantity}
                    </p>
                  )
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}