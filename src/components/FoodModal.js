"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FoodModal({
  item,
  onClose,
}) {
  const { addToCart } = useCart();

  if (!item) return null;

  return (
    <AnimatePresence>
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
          max-w-xl
          rounded-3xl
          border
          border-zinc-800
          overflow-y-auto
          max-h-[90vh]
          relative
          "
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
            absolute
            top-4
            right-4
            text-2xl
            text-zinc-400
            hover:text-white
            "
          >
            ✕
          </button>

          <div className="p-6">

            {/* Header */}
            <div className="flex items-center gap-3">

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
                inline-block
                mt-4
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

            {/* Reviews */}
            <div className="mt-8">

              <h3 className="text-xl font-bold mb-4">
                Reviews
              </h3>

              {item.reviews?.length > 0 ? (
                <div className="space-y-3">

                  {item.reviews.map(
                    (review, index) => (
                      <div
                        key={index}
                        className="
                        bg-zinc-800
                        p-4
                        rounded-xl
                        "
                      >
                        <p className="font-semibold">
                          {review.user}
                        </p>

                        <p>
                          {"⭐".repeat(
                            review.rating
                          )}
                        </p>

                        <p className="text-zinc-400 mt-2">
                          {review.comment}
                        </p>
                      </div>
                    )
                  )}

                </div>
              ) : (
                <p className="text-zinc-500">
                  No reviews yet.
                </p>
              )}

              {/* Review Form */}
             <h3 className="text-xl font-bold mb-4">
  Write a Review
</h3>

<textarea
  placeholder="Write your review..."
  className="
  w-full
  p-4
  bg-zinc-800
  rounded-xl
  outline-none
  "
/>

<button
  className="
  mt-4
  bg-orange-500
  px-5
  py-3
  rounded-xl
  font-semibold
  "
>
  Submit Review
</button>

<h3 className="text-xl font-bold mt-8 mb-4">
  Customer Reviews
</h3>
            </div>

            {/* Add To Cart */}
            <button
              onClick={() => {
                addToCart(item);
                onClose();
              }}
              className="
              w-full
              mt-8
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
    </AnimatePresence>
  );
}