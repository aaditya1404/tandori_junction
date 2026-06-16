"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { signInWithGoogle, logoutUser } from "@/services/authService";
import Image from "next/image";

export default function Navbar() {

  const user = useSelector((state) => state.auth.user);

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
          <div className="hidden md:flex items-center gap-3">
            
            <Image 
            src={user?.photoURL}
            alt="Image"
            height={50}
            width={50}
            className="rounded-full"
            ></Image>

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
  );
}