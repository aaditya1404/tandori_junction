"use client";

import { motion } from "framer-motion";
import FoodModal from "@/components/FoodModal";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

import {
  getDeliveredOrdersCount,
} from "@/services/orderService";

import {
  subscribeToMenu,
} from "@/services/menuService";

import {
  getMenuHero,
} from "@/services/settingsService";

import {
  getTopSellingItems,
} from "@/services/analyticsService";

import {
  getRatingStats,
} from "@/services/reviewService";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [foodFilter, setFoodFilter] = useState("all");

  const { addToCart } = useCart();

  const [menuItems, setMenuItems] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [hero, setHero] = useState(null);

  const [deliveredOrdersCount, setDeliveredOrdersCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const normalizedSearch = search.trim().toLowerCase();

  const normalizeFoodType = (value = "") =>
    value
      .toLowerCase()
      .replace("-", "")
      .replace(/\s/g, "");

  const matchesFoodFilter = (foodType) => {
    if (foodFilter === "all") return true;

    const normalized = normalizeFoodType(foodType);

    if (foodFilter === "veg") {
      return normalized === "veg";
    }

    if (foodFilter === "nonveg") {
      return normalized === "nonveg";
    }

    return true;
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesCategory =
      activeCategory === "" || item.category === activeCategory;

    const matchesFoodType = matchesFoodFilter(item.foodType);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFoodType
    );
  });

  const filteredTopSelling = topSelling.filter((item) =>
    matchesFoodFilter(item.foodType)
  );

  const chefSpecials = [
    {
      name: "Chicken Biryani",
      price: 220,
      emoji: "🍗",
      foodType: "nonveg",
    },
    {
      name: "Paneer Tikka",
      price: 180,
      emoji: "🥗",
      foodType: "veg",
    },
    {
      name: "Chicken Tikka",
      price: 240,
      emoji: "🍖",
      foodType: "nonveg",
    },
    {
      name: "Veg Chowmein",
      price: 120,
      emoji: "🍜",
      foodType: "veg",
    },
  ];

  const filteredChefSpecials = chefSpecials.filter((dish) =>
    matchesFoodFilter(dish.foodType)
  );

  const loadHero = async () => {
    const result = await getMenuHero();

    if (result.success) {
      setHero(result.data);
    }
  };

  const loadTopSelling = async () => {
    const data = await getTopSellingItems();
    setTopSelling(data);
  };

  const loadRatings = async () => {
    const stats = await getRatingStats();

    setAverageRating(stats.averageRating);
    setTotalReviews(stats.totalReviews);
  };

  const loadDeliveredOrders = async () => {
    const result = await getDeliveredOrdersCount();

    if (result.success) {
      setDeliveredOrdersCount(result.count);
    }
  };

  useEffect(() => {
    loadHero();
    loadTopSelling();
    loadRatings();
    loadDeliveredOrders();

    const unsubscribe = subscribeToMenu((items) => {
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, []);

  const totalItems = menuItems.length;

  if (!hero) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      text-white
      bg-black
      bg-[radial-gradient(circle_at_top,rgba(255,115,0,0.15),transparent_40%)]
      "
    >
      {/* Header */}
      <div className="py-20 text-center border-b border-zinc-800">
        <h1 className="text-5xl md:text-6xl font-bold">
          Our Menu
        </h1>

        <p className="text-zinc-400 mt-4">
          Freshly prepared with authentic flavours
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-8">
          <div>
            <p className="text-2xl font-bold text-orange-500">
              {
                [...new Set(
                  menuItems.map((item) => item.category)
                )].length
              }
            </p>
            <p className="text-zinc-400 text-sm">
              Categories
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-orange-500">
              {totalItems}
            </p>
            <p className="text-zinc-400 text-sm">
              Dishes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Restaurant Hero */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
          mb-12
          bg-gradient-to-r
          from-orange-500/20
          via-red-500/10
          to-orange-500/20
          border
          border-orange-500/20
          rounded-3xl
          p-8
          overflow-hidden
          "
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div>
              <h2 className="text-4xl md:text-5xl font-bold">
                {hero.restaurantName}
              </h2>

              <p className="text-zinc-400 mt-3 text-lg">
                {hero.cuisine}
              </p>

              <div className="flex flex-wrap gap-6 mt-6">

                <div>
                  <p className="font-bold text-xl">
                    ⭐ {averageRating}
                  </p>

                  <p className="text-zinc-400 text-sm">
                    {totalReviews} Reviews
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xl">
                    🕒 {hero.deliveryTime}
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Delivery Time
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xl">
                    🍽️ {deliveredOrdersCount}
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Orders Delivered
                  </p>
                </div>

              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className="
                bg-orange-500/20
                border
                border-orange-500/30
                px-5
                py-3
                rounded-xl
                "
              >
                {hero.offer1}
              </div>

              <div
                className="
                bg-green-500/20
                border
                border-green-500/30
                px-5
                py-3
                rounded-xl
                "
              >
                {hero.offer2}
              </div>

              <div
                className="
                bg-blue-500/20
                border
                border-blue-500/30
                px-5
                py-3
                rounded-xl
                "
              >
                {hero.offer3}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Search */}
        <div
          className="
          sticky
          top-20
          z-30
          bg-black
          py-4
          mb-10
          relative
          "
        >
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              p-4
              pl-12
              rounded-2xl
              bg-zinc-900
              border
              border-zinc-800
              focus:border-orange-500
              outline-none
            "
          />

          <span className="absolute left-4 top-8">
            🔍
          </span>
        </div>

        {/* Veg / Non Veg Filter */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setFoodFilter("all")}
            className={`px-4 py-2 rounded-full ${
              foodFilter === "all"
                ? "bg-orange-500"
                : "bg-zinc-900"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFoodFilter("veg")}
            className={`px-4 py-2 rounded-full ${
              foodFilter === "veg"
                ? "bg-green-600"
                : "bg-zinc-900"
            }`}
          >
            🟢 Veg
          </button>

          <button
            onClick={() => setFoodFilter("nonveg")}
            className={`px-4 py-2 rounded-full ${
              foodFilter === "nonveg"
                ? "bg-red-600"
                : "bg-zinc-900"
            }`}
          >
            🔴 Non Veg
          </button>
        </div>

        {/* Popular Dishes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Popular Dishes
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {filteredTopSelling.map((item) => (
              <button
                key={item.name}
                className="
                bg-zinc-900
                p-4
                rounded-xl
                "
                onClick={() =>
                  document
                    .getElementById(item.name)
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                🔥 {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chef Specials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">
            Chef&apos;s Specials
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {filteredChefSpecials.map((dish) => (
              <motion.div
                key={dish.name}
                whileHover={{
                  scale: 1.05,
                }}
                className="
                min-w-[250px]
                bg-gradient-to-br
                from-zinc-900
                to-zinc-800
                rounded-3xl
                p-6
                border
                border-zinc-700
                "
              >
                <div className="text-6xl mb-4">
                  {dish.emoji}
                </div>

                <h3 className="text-xl font-bold">
                  {dish.name}
                </h3>

                <p className="text-orange-500 mt-2">
                  ₹{dish.price}
                </p>

                <button
                  className="
                  mt-4
                  bg-orange-500
                  px-4
                  py-2
                  rounded-xl
                  "
                >
                  View Dish
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Navigation */}
        <div
          className="
          sticky
          top-20
          z-40
          bg-black
          py-4
          mb-12
          flex
          flex-wrap
          gap-3
          border-b
          border-zinc-800
          "
        >
          <button
            onClick={() => setActiveCategory("")}
            className={`
              px-4 py-2 rounded-full
              ${
                activeCategory === ""
                  ? "bg-orange-500"
                  : "bg-zinc-900"
              }
            `}
          >
            All Categories
          </button>

          {[...new Set(menuItems.map((item) => item.category))].map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-4 py-2 rounded-full
                  ${
                    activeCategory === category
                      ? "bg-orange-500"
                      : "bg-zinc-900"
                  }
                `}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Menu Items by Category */}
        {[...new Set(filteredItems.map((item) => item.category))].map(
          (category) => (
            <div
              key={category}
              className="mb-20"
            >
              <h2
                className="
                text-4xl
                font-bold
                text-orange-500
                mb-8
                "
              >
                {category}
              </h2>

              <div className="space-y-4">
                {filteredItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <motion.div
                      id={item.name}
                      key={item.id}
                      className="
                      bg-zinc-900
                      border
                      border-zinc-700
                      rounded-xl
                      p-5
                      flex
                      justify-between
                      items-center
                      "
                    >
                      <div className="flex gap-5 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                          w-24
                          h-24
                          min-w-24
                          object-cover
                          rounded-xl
                          "
                        />

                        <div>
                          <h3 className="text-xl font-bold">
                            {item.name}
                          </h3>

                          <p className="text-zinc-400 mt-2">
                            {item.description}
                          </p>

                          <p className="text-orange-500 font-bold mt-2">
                            ₹{item.finalPrice}
                          </p>

                          {!item.isAvailable && (
                            <span
                              className="
                              bg-red-500
                              px-2
                              py-1
                              rounded-full
                              text-xs
                              "
                            >
                              Out Of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        disabled={!item.isAvailable}
                        onClick={() => addToCart(item)}
                        className={`
                          px-4
                          py-2
                          rounded-xl
                          ${
                            item.isAvailable
                              ? "bg-green-500"
                              : "bg-zinc-600 cursor-not-allowed"
                          }
                        `}
                      >
                        {item.isAvailable ? "Add" : "Unavailable"}
                      </button>
                    </motion.div>
                  ))}
              </div>
            </div>
          )
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-zinc-400">
              No items found
            </h2>
          </div>
        )}
      </div>

      {/* Modal */}
      <FoodModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}