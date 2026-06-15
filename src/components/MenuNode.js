"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuNode({ item, level = 0 }) {
  const [open, setOpen] = useState(false);

  const hasChildren =
    item.children &&
    item.children.length > 0;

  return (
    <div
      className="mb-2"
      style={{
        marginLeft: `${level * 20}px`,
      }}
    >
      <div
        onClick={() =>
          hasChildren && setOpen(!open)
        }
        className="
        flex
        justify-between
        items-center
        cursor-pointer
        bg-zinc-900
        hover:bg-zinc-800
        p-4
        rounded-lg
        "
      >
        <span>{item.name}</span>

        {item.price && (
          <span className="text-orange-500">
            ₹{item.price}
          </span>
        )}

        {hasChildren && (
          <span>
            {open ? "-" : "+"}
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
          >
            {item.children.map(
              (child, index) => (
                <MenuNode
                  key={index}
                  item={child}
                  level={level + 1}
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}