"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const {
    totalCartItems,
    setCartOpen,
  } = useCart();

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Menu",
      href: "/menu",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-orange-500"
        >
          Tandoori Junction
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? "text-orange-500"
                  : "text-white hover:text-orange-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer"
          >
            <span className="text-2xl">
              🛒
            </span>

            {totalCartItems > 0 && (
              <span
                className="
                absolute
                -top-2
                -right-2
                bg-orange-500
                text-white
                text-xs
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
                "
              >
                {totalCartItems}
              </span>
            )}
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() =>
            setIsOpen(!isOpen)
          }
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
          <div className="flex flex-col p-6 gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() =>
                  setIsOpen(false)
                }
                className={`${
                  pathname === link.href
                    ? "text-orange-500"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Cart */}
            <button
              onClick={() => {
                setCartOpen(true);
                setIsOpen(false);
              }}
              className="
              flex
              items-center
              gap-3
              text-white
              "
            >
              <span>🛒 Cart</span>

              {totalCartItems > 0 && (
                <span
                  className="
                  bg-orange-500
                  text-white
                  text-xs
                  px-2
                  py-1
                  rounded-full
                  "
                >
                  {totalCartItems}
                </span>
              )}
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}