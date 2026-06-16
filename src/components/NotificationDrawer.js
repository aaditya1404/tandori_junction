"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function NotificationDrawer({
  open,
  onClose,
}) {
  const notifications = [
    {
      title: "Order Accepted",
      message:
        "Your Chicken Biryani order has been accepted.",
      time: "2 min ago",
    },
    {
      title: "Special Offer",
      message:
        "Use TANDOORI50 and get ₹50 OFF.",
      time: "10 min ago",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
            fixed
            inset-0
            bg-black/50
            z-40
            "
          />

          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="
            fixed
            right-0
            top-0
            h-screen
            w-96
            bg-zinc-950
            border-l
            border-zinc-800
            z-50
            p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              🔔 Notifications
            </h2>

            <div className="space-y-4">

              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="
                  bg-zinc-900
                  p-4
                  rounded-xl
                  "
                >
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    {item.message}
                  </p>

                  <p className="text-xs text-zinc-500 mt-3">
                    {item.time}
                  </p>
                </div>
              ))}

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}