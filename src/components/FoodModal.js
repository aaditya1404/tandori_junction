"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FoodModal({
  item,
  onClose,
}) {
  const { addToCart } = useCart();

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
          p-4
          z-50
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) =>
              e.stopPropagation()
            }
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            className="
            bg-zinc-900
            w-full
            max-w-lg
            rounded-3xl
            overflow-hidden
            border
            border-zinc-800
            "
          >
            {/* Header */}
            <div className="p-6">

              <div className="flex items-center gap-3 mb-3">

                {item.type === "veg" ? (
                  <span className="text-2xl">
                    🟢
                  </span>
                ) : (
                  <span className="text-2xl">
                    🔴
                  </span>
                )}

                <h2 className="text-3xl font-bold">
                  {item.name}
                </h2>

              </div>

              {/* Badge */}
              {item.badge && (
                <span
                  className="
                  bg-orange-500
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                >
                  🔥 {item.badge}
                </span>
              )}

              {/* Rating */}
              <div className="mt-4">
                ⭐⭐⭐⭐⭐
                <span className="ml-2 text-zinc-400">
                  4.8 Rating
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-zinc-400">
                {item.description ||
                  "Freshly prepared with authentic flavours and premium ingredients."}
              </p>

              {/* Price */}
              <div className="mt-6 text-3xl font-bold text-orange-500">
                ₹{item.price}
              </div>

              {/* Add Button */}
              <button
                onClick={() => {
                  addToCart(item);
                  onClose();
                }}
                className="
                w-full
                mt-6
                bg-orange-500
                hover:bg-orange-600
                py-4
                rounded-xl
                font-semibold
                "
              >
                Add To Cart
              </button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}