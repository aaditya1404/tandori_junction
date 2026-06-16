"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { signInWithGoogle, logoutUser } from "@/services/authService";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import NotificationDrawer from "@/components/NotificationDrawer";

export default function Navbar() {

  const user = useSelector((state) => state.auth.user);
  const [showProfileMenu, setShowProfileMenu] =
  useState(false);
  const {
  totalCartItems,
  setCartOpen,
} = useCart();
const [notificationOpen, setNotificationOpen] =
  useState(false);

  const handleLogin = async () => {
    const result = await signInWithGoogle();

    if (!result.success) {
      alert(result.error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
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

       {user ? (
  <div className="relative hidden md:flex items-center gap-4">
            <button
  onClick={() =>
    setNotificationOpen(true)
  }
  className="relative text-2xl"
>
  🔔

  <span
    className="
    absolute
    -top-1
    -right-1
    bg-red-500
    w-4
    h-4
    rounded-full
    "
  />
</button>
            <Image
  src={user?.photoURL}
  alt="Profile"
  height={50}
  width={50}
  onClick={() =>
    setShowProfileMenu(
      !showProfileMenu
    )
  }
  className="
  rounded-full
  cursor-pointer
  border-2
  border-orange-500
  "
/>

{showProfileMenu && (
  <div
    className="
    absolute
    top-16
    right-0
    w-72
    bg-zinc-900
    border
    border-zinc-800
    rounded-2xl
    shadow-xl
    overflow-hidden
    "
  >
    <div className="p-4 border-b border-zinc-800">

      <h3 className="font-semibold">
        {user?.displayName}
      </h3>

      <p className="text-sm text-zinc-400">
        {user?.email}
      </p>

    </div>

    <Link
      href="/my-orders"
      className="
      block
      px-4
      py-3
      hover:bg-zinc-800
      "
    >
      📦 My Orders
    </Link>

   <Link
  href="/profile"
  className="
  block
  px-4
  py-3
  hover:bg-zinc-800
  "
>
  👤 Profile
</Link>

    <button
      onClick={() => setCartOpen(true)}
      className="
      w-full
      text-left
      px-4
      py-3
      hover:bg-zinc-800
      "
    >
      🛒 Open Cart
    </button>


  </div>
)}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-orange-500 px-5 py-2 rounded-lg text-white"
          >
            Login
          </button>
        )}

      </div>
      
    </nav>
    <NotificationDrawer
  open={notificationOpen}
  onClose={() =>
    setNotificationOpen(false)
  }
/>
</>
  );
}