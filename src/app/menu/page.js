"use client";

import { useState } from "react";
import menuData from "@/data/menu";
import FoodModal from "@/components/FoodModal";

export default function MenuPage() {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] =
        useState(null);

    const normalizedSearch = search.trim().toLowerCase();

    const filteredCategories = menuData.filter((category) =>
        category.children?.some((item) =>
            item.name.toLowerCase().includes(normalizedSearch)
        )
    );

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="py-20 text-center border-b border-zinc-800">
                <h1 className="text-5xl font-bold">
                    Our Menu
                </h1>

                <p className="text-zinc-400 mt-4">
                    Freshly prepared with authentic flavours
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search food..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="
            w-full
            p-4
            rounded-xl
            bg-zinc-900
            border
            border-zinc-800
            mb-12
            outline-none
            focus:border-orange-500
          "
                />
                <div className="flex flex-wrap gap-3 mb-12">
                    {menuData.map((category) => (
                        <a
                            key={category.name}
                            href={`#${category.name.replace(/\s+/g, "-")}`}
                            className="
        px-4
        py-2
        bg-zinc-900
        border
        border-zinc-800
        rounded-full
        hover:border-orange-500
        hover:text-orange-500
        transition
      "
                        >
                            {category.name}
                        </a>
                    ))}
                </div>

                {/* Categories */}
                {filteredCategories.map((category) => (
                    <div
                        id={category.name.replace(/\s+/g, "-")}
                        key={category.name}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-orange-500 mb-8">
                            {category.name}
                        </h2>

                        <div className="space-y-4">

                            {category.children
                                .filter((item) =>
                                    item.name
                                        .toLowerCase()
                                        .includes(normalizedSearch)
                                )
                                .map((item) => (
                                    <div
                                        key={item.name}
                                        onClick={() =>
                                            setSelectedItem(item)
                                        }
                                        className="
                                        cursor-pointer
                      flex
                      justify-between
                      items-center
                      bg-zinc-900
                      border
                      border-zinc-800
                      rounded-xl
                      p-5
                      hover:border-orange-500
                      transition
                    "
                                    >
                                        <h3 className="text-lg font-medium">
                                            {item.name}
                                        </h3>

                                        <span className="text-orange-500 font-bold">
                                            ₹{item.price}
                                        </span>
                                    </div>
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
            <FoodModal
      item={selectedItem}
      onClose={() => setSelectedItem(null)}
    />

        </div>
        
    );
    
}