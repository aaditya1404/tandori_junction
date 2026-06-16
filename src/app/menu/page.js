


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import menuData from "@/data/menu";
import FoodModal from "@/components/FoodModal";
import { useCart } from "@/context/CartContext";


export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [foodFilter, setFoodFilter] = useState("all");
  const { addToCart } = useCart();

  const normalizedSearch = search.trim().toLowerCase();

  const filteredCategories = menuData.filter((category) =>
    category.children?.some((item) =>
      item.name.toLowerCase().includes(normalizedSearch)
    )
  );

  const totalItems = menuData.reduce(
    (acc, category) => acc + category.children.length,
    0
  );

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
              {menuData.length}
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
        Tandoori Junction
      </h2>

      <p className="text-zinc-400 mt-3 text-lg">
        North Indian • Chinese • Tandoor
      </p>

      <div className="flex flex-wrap gap-6 mt-6">

        <div>
          <p className="font-bold text-xl">
            ⭐ 4.8
          </p>

          <p className="text-zinc-400 text-sm">
            2300+ Reviews
          </p>
        </div>

        <div>
          <p className="font-bold text-xl">
            🕒 30-40 Min
          </p>

          <p className="text-zinc-400 text-sm">
            Delivery Time
          </p>
        </div>

        <div>
          <p className="font-bold text-xl">
            🍗 5000+
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
        🔥 Flat ₹100 OFF
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
        🚚 Free Delivery Above ₹499
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
        🎁 Free Drink Above ₹799
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

          <span className="absolute left-4 top-4">
            🔍
          </span>
        </div>
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
<div className="mb-16">

  <h2 className="text-3xl font-bold mb-6">
    Popular Dishes
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

   <button
  onClick={() =>
    document
      .getElementById("Biryani")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
>
  🔥 Chicken Biryani
</button>

    <button
  onClick={() =>
    document
      .getElementById("Biryani")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
>
  🔥 Chicken Biryani
</button>

   <button
  onClick={() =>
    document
      .getElementById("Biryani")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
>
  🔥 Chicken Biryani
</button>

  </div>

</div>
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mb-16"
>
  <h2 className="text-3xl font-bold mb-6">
    Chef's Specials
  </h2>

  <div className="flex gap-6 overflow-x-auto pb-4">

    {[
      {
        name: "Chicken Biryani",
        price: 220,
        emoji: "🍗",
      },
      {
        name: "Paneer Tikka",
        price: 180,
        emoji: "🥗",
      },
      {
        name: "Chicken Tikka",
        price: 240,
        emoji: "🍖",
      },
      {
        name: "Veg Chowmein",
        price: 120,
        emoji: "🍜",
      },
    ].map((dish) => (
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
          {menuData.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(category.name);

                document
                  .getElementById(
                    category.name.replace(/\s+/g, "-")
                  )
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className={`
                px-4
                py-2
                rounded-full
                border
                transition

                ${
                  activeCategory === category.name
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-zinc-900 border-zinc-800 text-white"
                }
              `}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Categories */}
        {filteredCategories.map((category) => (
          <div
            id={category.name.replace(/\s+/g, "-")}
            key={category.name}
            className="mb-20"
          ><motion.h2
  initial={{
    opacity: 0,
    y: 20,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.4,
  }}    
              viewport={{
                once: true,
              }}
              className="
                text-4xl
                font-bold
                text-orange-500
                mb-3
              "
            >
              {category.name}

              <span
                className="
                ml-3
                text-sm
                bg-orange-500
                px-3
                py-1
                rounded-full
                text-white
                align-middle
                "
              >
                {
  category.children.filter((item) =>
    foodFilter === "all"
      ? true
      : item.type === foodFilter
  ).length
}
              </span>
            </motion.h2>

            <div className="w-24 h-1 bg-orange-500 rounded-full mb-8" />

            <div className="space-y-4">
              {category.children
                .filter((item) => {
  const matchesSearch =
    item.name
      .toLowerCase()
      .includes(normalizedSearch);

  const matchesType =
    foodFilter === "all"
      ? true
      : item.type === foodFilter;

  return matchesSearch && matchesType;
})
                .map((item, index) => (
                  <motion.div
                    key={item.name}
                    onClick={() =>
                      setSelectedItem(item)
                    }
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="
                      cursor-pointer
                      flex
                      justify-between
                      items-center
                      bg-gradient-to-r
                      from-zinc-900
                      via-zinc-800
                      to-zinc-900
                      border
                      border-zinc-700
                      rounded-xl
                      p-5
                      shadow-lg
                     hover:border-orange-500
hover:shadow-orange-500/20
hover:shadow-2xl
                    "
                  >
                   <div className="flex items-center justify-between w-full">

  {/* Left */}
  <div className="flex-1">

    <div className="flex items-center gap-2">

      {item.type === "veg" ? (
        <span className="text-xl">🟢</span>
      ) : (
        <span className="text-xl">🔴</span>
      )}

      <h3 className="text-xl font-semibold">
        {item.name}
      </h3>

    </div>

    {item.badge && (
      <span
        className="
        inline-block
        mt-2
        bg-orange-500
        text-xs
        px-2
        py-1
        rounded-full
        "
      >
        🔥 {item.badge}
      </span>
    )}

    <p className="text-zinc-400 text-sm mt-2">
      Freshly prepared with authentic flavours
    </p>

    <div className="mt-3 flex items-center gap-3">

      <span className="text-yellow-400">
        ⭐ 4.8
      </span>

      <span className="text-orange-500 font-bold">
        ₹{item.price}
      </span>

    </div>

  </div>

  {/* Right Side */}
  <div
  className="
  w-32
  h-32
  rounded-2xl
  bg-gradient-to-br
  from-orange-500
  via-red-500
  to-orange-700
  flex
  items-center
  justify-center
  ml-6
  relative
  shadow-xl
  "
>
  <span className="text-5xl">
  {item.type === "veg"
    ? "🥗"
    : "🍗"}
</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(item);
      }}
      className="
      absolute
      -bottom-3
      bg-green-500
      hover:bg-green-600
      px-4
      py-2
      rounded-full
      font-semibold
      "
    >
      Add
    </button>

  </div>

</div>

                  <h3 className="text-lg font-medium">
  {item.name}
</h3>

<div className="flex items-center gap-3">

  <span
    className="
    bg-orange-500
    text-white
    px-4
    py-1
    rounded-full
    font-bold
    "
  >
    ₹{item.price}
  </span>

  <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart(item);
    }}
    className="
    bg-green-500
    hover:bg-green-600
    text-white
    px-4
    py-1
    rounded-full
    font-semibold
    "
  >
    Add
  </button>

</div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}

        {filteredCategories.length === 0 && (
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
        onClose={() =>
          setSelectedItem(null)
        }
      />
    </div>
  );
}