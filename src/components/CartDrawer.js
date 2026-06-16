"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    cartOpen,
    setCartOpen,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const deliveryFee = cart.length > 0 ? 40 : 0;
  const taxes = cart.length > 0 ? 20 : 0;

  const total =
    subtotal + deliveryFee + taxes;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="
            fixed
            inset-0
            bg-black/50
            z-40
            "
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 250,
            }}
            className="
            fixed
            right-0
            top-0
            h-screen
            w-96
            max-w-full
            bg-zinc-950
            border-l
            border-zinc-800
            p-6
            text-white
            overflow-y-auto
            z-50
            "
          >
            {/* Close Button */}
            <button
              onClick={() =>
                setCartOpen(false)
              }
              className="
              absolute
              top-4
              right-4
              text-xl
              "
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Your Cart
            </h2>

            {/* Empty Cart */}
            {cart.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">
                  🛒
                </div>

                <p className="text-zinc-400">
                  Your cart is empty
                </p>

                <p className="text-zinc-500 text-sm mt-2">
                  Add delicious dishes to begin
                </p>
              </div>
            )}

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.name}
                  className="
                  bg-zinc-900
                  p-4
                  rounded-xl
                  "
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-orange-500 mt-1">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          decreaseQty(item.name)
                        }
                        className="
                        bg-red-500
                        w-8
                        h-8
                        rounded
                        "
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.name)
                        }
                        className="
                        bg-green-500
                        w-8
                        h-8
                        rounded
                        "
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            {cart.length > 0 && (
              <>
                <div
                  className="
                  border-t
                  border-zinc-800
                  pt-5
                  mt-8
                  "
                >
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span>Taxes</span>
                    <span>₹{taxes}</span>
                  </div>

                  <div
                    className="
                    flex
                    justify-between
                    mt-4
                    text-xl
                    font-bold
                    "
                  >
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() =>
                    setCartOpen(false)
                  }
                  className="
                  block
                  mt-6
                  bg-orange-500
                  text-center
                  py-4
                  rounded-xl
                  font-semibold
                  hover:bg-orange-600
                  transition
                  "
                >
                  Proceed to Checkout
                </Link>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}