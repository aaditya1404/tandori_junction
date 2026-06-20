"use client";

import Link from "next/link";
import Image from "next/image";
import NotificationDrawer from "@/components/NotificationDrawer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { signInWithGoogle, logoutUser } from "@/services/authService";
import { useCart } from "@/context/CartContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Fonts imports
import { Bonheur_Royale } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bonheurRoyale = Bonheur_Royale({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {

  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { totalCartItems, setCartOpen, } = useCart();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User Login Function
  const handleLogin = async () => {
    const result = await signInWithGoogle();

    if (!result.success) {
      alert(result.error);
      return;
    }

    if (!result.profileComplete) {
      router.replace("/complete-profile");
    } else {
      router.replace("/");
    }
  };

  // User Logout Function
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-zinc-800">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-around">

          {/* Logo of the restaurent */}
          <Link
            href="/"
            className={`${bonheurRoyale.className} text-4xl lg:text-5xl font-bold text-orange-500 flex items-center justify-center gap-1`}
          >
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              width={60}
              height={60}
              className="h-12 w-12 lg:h-14 lg:w-14"
            >
            </Image>
            Tandoori Junction
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-white">
            <li>
              <Link
                href="/"
                className="transition-all duration-300 ease-in-out hover:text-orange-500"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/menu"
                className="hover:text-orange-500 transition-all duration-300 ease-in-out"
              >
                Menu
              </Link>
            </li>



            <li>
              <Link
                href="/about"
                className="hover:text-orange-500 transition-all duration-300 ease-in-out"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="hover:text-orange-500 transition-all duration-300 ease-in-out"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Hamburger Button (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 transition-all duration-300"
          >
            {mobileMenuOpen ? (
              <X size={32} />
            ) : (
              <Menu size={32} />
            )}
          </button>

          {/* Desktop User Login / Logout Section */}
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
                  className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full"
                />
              </button>
              <Image
                src={user?.photoURL || "/images/user/user.png"}
                alt="Profile"
                height={50}
                width={50}
                onClick={() =>
                  setShowProfileMenu(
                    !showProfileMenu
                  )
                }
                className="rounded-full cursor-pointer border-2 border-orange-500"
              />

              {showProfileMenu && (
                <div
                  className="absolute top-16 right-0 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden"
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
                    className="block px-4 py-3 hover:bg-zinc-800"
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-zinc-800"
                  >
                    👤 Profile
                  </Link>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-800"
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
              className="hidden lg:block bg-orange-500 px-5 py-2 rounded-lg text-white cursor-pointer  transition-all duration-300 ease-in-out hover:scale-105 hover:bg-orange-600 active:scale-95"
            >
              Login
            </button>
          )}

        </div>

      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="fixed z-20 top-20 w-full overflow-hidden md:hidden border-b border-zinc-800 bg-black/50 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-5 space-y-4 text-white">

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <hr className="border-zinc-700" />

                  <div className="flex items-center gap-3">
                    <Image
                      src={user.photoURL || "/images/user/user.png"}
                      alt="Profile"
                      width={45}
                      height={45}
                      className="rounded-full border border-orange-500"
                    />

                    <div>
                      <p>{user.displayName}</p>
                      <p className="text-sm text-zinc-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/my-orders"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    👤 Profile
                  </Link>

                  <button
                    onClick={() => {
                      setCartOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    🛒 Open Cart ({totalCartItems})
                  </button>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-red-500 py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-orange-500 py-2 rounded-lg"
                >
                  Login
                </button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NotificationDrawer
        open={notificationOpen}
        onClose={() =>
          setNotificationOpen(false)
        }
      />
    </>
  );
}