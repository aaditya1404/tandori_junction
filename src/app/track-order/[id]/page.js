"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  subscribeToOrder,
} from "@/services/orderService";

export default function TrackOrderPage() {

  const params =
    useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!params?.id) return;

    const unsubscribe =
      subscribeToOrder(
        params.id,

        (orderData) => {

          setOrder(
            orderData
          );

          setLoading(
            false
          );

        }
      );

    return () =>
      unsubscribe();

  }, [params?.id]);

  if (loading) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!order) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Order Not Found
      </div>
    );

  }

  const status =
    order.status;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Track Order
        </h1>

        <p className="text-zinc-400 mb-10">
          Order #{order.id}
        </p>

        <div className="space-y-10">

          <div>
            ✅ Order Received
          </div>

          <div>
            {[
              "preparing",
              "out_for_delivery",
              "delivered",
            ].includes(status)
              ? "✅"
              : "⏳"}{" "}
            Preparing Food
          </div>

          <div>
            {[
              "out_for_delivery",
              "delivered",
            ].includes(status)
              ? "🚚"
              : "⏳"}{" "}
            Out For Delivery
          </div>

          <div
            className={
              status ===
              "delivered"
                ? ""
                : "text-zinc-500"
            }
          >
            🏠 Delivered
          </div>

        </div>

        <div
          className="
          mt-10
          bg-zinc-900
          p-6
          rounded-2xl
          "
        >

          <p className="text-zinc-400">
            Current Status
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            {status}
          </h2>

          <p className="mt-4 text-zinc-400">
            Total: ₹{order.total}
          </p>

          <p className="mt-2 text-zinc-400">
            Payment:
            {" "}
            {order.paymentMethod}
          </p>

        </div>

      </div>

    </div>
  );
}