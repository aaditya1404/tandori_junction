"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToAllOrders } from "@/services/orderService";

export default function AdminOrderAlert() {
  const [alertOrders, setAlertOrders] =
    useState([]);

  const previousOrderIdsRef =
    useRef(new Set());

  const hasMountedRef =
    useRef(false);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "/sounds/new-order.mp3"
    );

    audioRef.current.loop = true;

    const unsubscribe =
      subscribeToAllOrders(
        (ordersData) => {
          const safeOrders =
            ordersData || [];

          const currentIds =
            new Set(
              safeOrders.map(
                (order) => order.id
              )
            );

          // detect newly added pending orders
          if (
            hasMountedRef.current
          ) {
            const previousIds =
              previousOrderIdsRef.current;

            const justAddedOrders =
              safeOrders.filter(
                (order) =>
                  !previousIds.has(
                    order.id
                  ) &&
                  order.status ===
                    "pending"
              );

            if (
              justAddedOrders.length > 0
            ) {
              setAlertOrders(
                (prev) => [
                  ...prev,
                  ...justAddedOrders,
                ]
              );

              if (
                audioRef.current
              ) {
                audioRef.current
                  .play()
                  .catch(() => {});
              }
            }
          } else {
            hasMountedRef.current =
              true;
          }

          // remove alert orders once they are no longer pending
          setAlertOrders((prev) => {
            const updated =
              prev.filter(
                (alertOrder) => {
                  const liveOrder =
                    safeOrders.find(
                      (o) =>
                        o.id ===
                        alertOrder.id
                    );

                  return (
                    liveOrder &&
                    liveOrder.status ===
                      "pending"
                  );
                }
              );

            // stop sound if all alert orders are received/updated
            if (
              updated.length === 0 &&
              audioRef.current
            ) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }

            return updated;
          });

          previousOrderIdsRef.current =
            currentIds;
        }
      );

    return () => {
      unsubscribe();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const stopAlarm = () => {
    setAlertOrders([]);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (alertOrders.length === 0)
    return null;

  return (
    <div
      className="
      fixed
      bottom-6
      right-6
      z-[9999]
      w-[380px]
      bg-red-600
      text-white
      rounded-2xl
      shadow-2xl
      border
      border-red-400
      p-5
      animate-pulse
      "
    >
      <h2 className="text-xl font-bold">
        🚨 New Order Alert
      </h2>

      <p className="mt-2 text-sm">
        {alertOrders.length} pending
        new order
        {alertOrders.length > 1
          ? "s"
          : ""}{" "}
        waiting to be received.
      </p>

      <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
        {alertOrders.map((order) => (
          <div
            key={order.id}
            className="bg-black/20 rounded-xl p-3"
          >
            <p className="font-semibold">
              #{order.id}
            </p>

            <p className="text-sm">
              {
                order.customerName
              }
            </p>

            <p className="text-sm">
              ₹{order.total}
            </p>

            <p className="text-xs mt-1 text-red-100">
              Status: {order.status}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={stopAlarm}
          className="
            flex-1
            bg-white
            text-red-600
            font-bold
            px-4
            py-2
            rounded-xl
          "
        >
          Stop Alarm
        </button>
      </div>
    </div>
  );
}