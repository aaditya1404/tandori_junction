"use client";

import menu from "@/data/menu";
import MenuNode from "./MenuNode";

export default function MenuSection() {
  return (
    <section
      className="
      py-24
      bg-zinc-950
      text-white
      "
    >
      <div className="max-w-6xl mx-auto px-6">

        <h2
          className="
          text-5xl
          font-bold
          text-center
          mb-16
          "
        >
          Our Menu
        </h2>

        {menu.map((item, index) => (
          <MenuNode
            key={index}
            item={item}
          />
        ))}

      </div>
    </section>
  );
}