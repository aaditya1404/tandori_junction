"use client";

import { useCart } from "@/context/CartContext";

export default function FavoritesPage() {
  const { addToCart } = useCart();

  const favorites = [
    {
      name: "Chicken Biryani",
      price: 220,
      type: "nonveg",
    },
    {
      name: "Paneer Tikka",
      price: 180,
      type: "veg",
    },
    {
      name: "Chicken Tikka",
      price: 260,
      type: "nonveg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <div className="border-b border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold">
            My Favorites
          </h1>

          <p className="text-zinc-400 mt-3">
            Your favourite dishes
          </p>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 gap-6">

          {favorites.map((item) => (
            <div
              key={item.name}
              className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6
              "
            >
              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold flex items-center gap-2">

                    {item.type === "veg"
                      ? "🟢"
                      : "🔴"}

                    {item.name}

                  </h2>

                  <p className="text-orange-500 mt-3">
                    ₹{item.price}
                  </p>

                </div>

                <div className="text-3xl">
                  ❤️
                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    addToCart(item)
                  }
                  className="
                  bg-orange-500
                  px-4
                  py-2
                  rounded-xl
                  "
                >
                  Add To Cart
                </button>

                <button
                  className="
                  bg-zinc-800
                  px-4
                  py-2
                  rounded-xl
                  "
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}