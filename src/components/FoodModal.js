"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function FoodModal({
  item,
  onClose,
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="
          fixed
          inset-0
          bg-black/70
          flex
          items-center
          justify-center
          z-50
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="
            bg-zinc-900
            p-8
            rounded-2xl
            w-[400px]
            border
            border-zinc-700
            "
            initial={{
              scale: 0.5,
              opacity: 0,
              y: 50,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.5,
              opacity: 0,
              y: 50,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold">
              {item.name}
            </h2>

            <p className="text-orange-500 mt-4">
              ₹{item.price}
            </p>

            <p className="mt-4 text-zinc-400">
              Delicious food prepared fresh for you.
            </p>

            <button
              className="
              mt-6
              bg-orange-500
              px-4
              py-2
              rounded-lg
              "
            >
              Order Now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}