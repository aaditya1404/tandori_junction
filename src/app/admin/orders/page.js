"use client";

import { useEffect, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/orderService";

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    const result =
      await getAllOrders();

    if (result.success) {
      setOrders(result.orders);
    }
  };

  const handleStatusChange =
    async (
      orderId,
      status
    ) => {

    const result =
      await updateOrderStatus(
        orderId,
        status
      );

    if (result.success) {
      await loadOrders();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-5xl font-bold mb-10">
          Orders Management
        </h1>

        {orders.length === 0 && (
          <div
            className="
            bg-zinc-900
            p-10
            rounded-2xl
            "
          >
            No Orders Found
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

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Customer:
                    {" "}
                    {order.customerName}
                  </p>

                  <p className="text-zinc-400">
                    Phone:
                    {" "}
                    {order.phone}
                  </p>

                  <p className="text-zinc-400">
                    Payment:
                    {" "}
                    {order.paymentMethod}
                  </p>

                </div>

                <div>

                  <span
                    className="
                    bg-orange-500
                    px-4
                    py-2
                    rounded-full
                    "
                  >
                    {order.status}
                  </span>

                </div>

              </div>

              <div className="mt-6">

                <h3 className="font-semibold mb-2">
                  Delivery Address
                </h3>

                <p className="text-zinc-400">
                  {order.address}
                </p>

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

              <div
                className="
                mt-6
                border-t
                border-zinc-800
                pt-4
                flex
                justify-between
                items-center
                "
              >

                <div className="text-xl font-bold">
                  ₹{order.total}
                </div>

                <div className="flex gap-2 flex-wrap">

                  <button
                    onClick={() =>
                      handleStatusChange(
                        order.id,
                        "pending"
                      )
                    }
                    className="
                    bg-yellow-500
                    px-4
                    py-2
                    rounded-lg
                    "
                  >
                    Pending
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        order.id,
                        "preparing"
                      )
                    }
                    className="
                    bg-blue-500
                    px-4
                    py-2
                    rounded-lg
                    "
                  >
                    Preparing
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        order.id,
                        "out_for_delivery"
                      )
                    }
                    className="
                    bg-purple-500
                    px-4
                    py-2
                    rounded-lg
                    "
                  >
                    Out For Delivery
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        order.id,
                        "delivered"
                      )
                    }
                    className="
                    bg-green-500
                    px-4
                    py-2
                    rounded-lg
                    "
                  >
                    Delivered
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}