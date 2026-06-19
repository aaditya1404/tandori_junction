"use client";

import { motion } from "framer-motion";
import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  getBestSellers,
} from "@/services/analyticsService";
import {
  useCart,
} from "@/context/CartContext";

export default function BestSellers() {

  const [bestSellers,
    setBestSellers] =
    useState([]);
  const {
    addToCart,
  } = useCart();
  const router = useRouter();


  useEffect(() => {


    const loadBestSellers =
      async () => {

        const data =
          await getBestSellers();

        setBestSellers(
          data
        );

      };
    loadBestSellers();
  }, []);


  return (

    <section className="py-24 bg-black text-white">

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[0.3em] text-orange-500 text-sm font-semibold">
            Chef's Recommendation
          </p>

          <h2 className="mt-3 text-5xl font-bold text-white">
            Best Sellers
          </h2>

          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Our most loved dishes, freshly prepared and enjoyed by hundreds of customers.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {bestSellers.map(
            (dish) => (

              //             <motion.div
              //               key={dish.id || dish.name}
              //               whileHover={{
              //                 y: -10,
              //               }}
              //               className="
              //               bg-zinc-900
              //               rounded-2xl
              //               overflow-hidden
              //               border
              //               border-zinc-800
              //               "
              //             >

              //               <img
              //                 src={
              //                   dish.image ||
              //                   "/food-placeholder.jpg"
              //                 }
              //                 alt={dish.name}
              //                 onError={(e) => {
              //                   e.target.src =
              //                     "/food-placeholder.jpg";
              //                 }}
              //                 className="
              // h-60
              // w-full
              // object-cover
              // "
              //               />

              //               <div className="p-5">

              //                 <span
              //                   className="
              //                   bg-orange-600
              //                   text-xs
              //                   px-3
              //                   py-1
              //                   rounded-full
              //                   "
              //                 >
              //                   Best Seller
              //                 </span>

              //                 <h3
              //                   className="
              //                   text-xl
              //                   font-semibold
              //                   mt-4
              //                   "
              //                 >
              //                   {dish.name}
              //                 </h3>

              //                 <p
              //                   className="
              //                   text-gray-400
              //                   mt-2
              //                   "
              //                 >
              //                   Sold {dish.quantity} times
              //                 </p>

              //                 <div
              //                   className="
              //                   flex
              //                   justify-between
              //                   items-center
              //                   mt-4
              //                   "
              //                 >

              //                   <span
              //                     className="
              //                     text-orange-500
              //                     text-xl
              //                     "
              //                   >
              //                     ₹{dish.price || 0}
              //                   </span>

              //                   <button
              //                     onClick={() => {
              //                       console.log(dish);


              //                       addToCart(dish);
              //                     }}
              //                     className="
              // bg-orange-600
              // hover:bg-orange-700
              // px-4
              // py-2
              // rounded-lg
              // transition
              // "
              //                   >
              //                     Add To Cart
              //                   </button>

              //                 </div>

              //               </div>

              //             </motion.div>
              <motion.div
                key={dish.id || dish.name}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group overflow-hidden rounded-3xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image || "/food-placeholder.jpg"}
                    alt={dish.name}
                    onError={(e) => {
                      e.target.src = "/food-placeholder.jpg";
                    }}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                    🔥 Best Seller
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {dish.name}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    Ordered{" "}
                    <span className="text-orange-500 font-semibold">
                      {dish.quantity}
                    </span>{" "}
                    times
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-bold text-orange-500">
                      ₹{dish.price || 0}
                    </span>

                    <button
                      onClick={() => addToCart(dish)}
                      className="rounded-xl bg-orange-500 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:bg-orange-600 hover:scale-105 active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}

        </div>

      </div>

    </section>

  );

}