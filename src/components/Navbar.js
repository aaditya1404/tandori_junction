"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <ul className="hidden md:flex items-center gap-8 text-white">
          <li>
            <Link
              href="/"
              className="hover:text-orange-500 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/menu"
              className="hover:text-orange-500 transition"
            >
              Menu
            </Link>
          </li>

          <li>
            <Link
              href="/gallery"
              className="hover:text-orange-500 transition"
            >
              Gallery
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-orange-500 transition"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="hover:text-orange-500 transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Order Button */}
        <button
          className="
          hidden md:block
          bg-orange-500
          px-5
          py-2
          rounded-lg
          text-white
          hover:bg-orange-600
          transition
          "
        >
          Order Now
        </button>

        {/* Mobile Button */}
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
        <div className="md:hidden bg-zinc-900 text-white">
          <div className="flex flex-col p-6 gap-4">

            <Link href="/">Home</Link>

            <Link href="/menu">Menu</Link>

            <Link href="/gallery">Gallery</Link>

            <Link href="/about">About</Link>

            <Link href="/contact">Contact</Link>

          </div>
        </div>
      )}
    </nav>
  );
}