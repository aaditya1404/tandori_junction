"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  useRef,
  useEffect,
  useState,
} from "react";
import { getPopularItems } from "@/services/analyticsService";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Categories() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const [items, setItems] = useState([]);
  const [maxScroll, setMaxScroll] = useState(0);

  const { addToCart } = useCart();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxScroll]
  );

  useEffect(() => {
    const loadItems = async () => {
      const data = await getPopularItems();
      setItems(data);
    };

    loadItems();
  }, []);

  useEffect(() => {
    const calculateScroll = () => {
      if (!containerRef.current || !scrollRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const contentWidth = scrollRef.current.scrollWidth;

      setMaxScroll(Math.max(contentWidth - containerWidth, 0));
    };

    const timeout = setTimeout(calculateScroll, 200);

    window.addEventListener("resize", calculateScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", calculateScroll);
    };
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950"
      style={{
        height: `${Math.max(items.length * 60, 300)}vh`,
      }}
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
      >
        <div className="text-center mb-14 px-6">
          <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold text-sm">
            Customer Favorites
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Most Ordered This Week
          </h2>

          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Explore the dishes loved by our customers.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-zinc-400 text-lg">
            No sales data available
          </div>
        ) : (
          <motion.div
            ref={scrollRef}
            style={{ x }}
            className="flex gap-8 px-10 w-max"
          >
            {items.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="min-w-[300px] max-w-[300px] shrink-0 group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition-all duration-300 shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      item.image?.trim()
                        ? item.image
                        : "https://images.unsplash.com/photo-1544025162-d76694265947"
                    }
                    alt={item.name}
                    width={500}
                    height={500}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🔥 {item.quantity} Sold
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    Ordered{" "}
                    <span className="text-orange-500 font-semibold">
                      {item.quantity}
                    </span>{" "}
                    times this week.
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  >
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}