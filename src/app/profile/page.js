"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const user = useSelector(
    (state) => state.auth.user
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Please Login First
          </h1>

          <Link
            href="/"
            className="
            bg-orange-500
            px-6
            py-3
            rounded-xl
            "
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <div
        className="
        bg-gradient-to-r
        from-orange-500/20
        via-red-500/10
        to-orange-500/20
        border-b
        border-zinc-800
        py-16
        "
      >
        <div className="max-w-6xl mx-auto px-6">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <Image
              src={user.photoURL}
              alt="Profile"
              width={120}
              height={120}
              className="
              rounded-full
              border-4
              border-orange-500
              "
            />

            <div>

              <h1 className="text-4xl font-bold">
                {user.displayName}
              </h1>

              <p className="text-zinc-400 mt-2">
                {user.email}
              </p>

              <div className="flex gap-8 mt-6">

                <div>
                  <p className="text-2xl font-bold text-orange-500">
                    12
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Orders
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-orange-500">
                    ₹4,520
                  </p>

                  <p className="text-zinc-400 text-sm">
                    Spent
                  </p>
                </div>

              </div>

              <div className="mt-5">
                <span
                  className="
                  bg-orange-500
                  px-4
                  py-2
                  rounded-full
                  "
                >
                  Premium Member
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Orders */}
          <Link
            href="/my-orders"
            className="
            bg-zinc-900
            p-6
            rounded-2xl
            border
            border-zinc-800
            hover:border-orange-500
            transition
            "
          >
            <div className="text-4xl mb-3">
              📦
            </div>

            <h2 className="text-xl font-semibold">
              My Orders
            </h2>

            <p className="text-zinc-400 mt-2">
              View previous orders
            </p>
          </Link>

          {/* Addresses */}
          <Link
            href="/profile/addresses"
            className="
            bg-zinc-900
            p-6
            rounded-2xl
            border
            border-zinc-800
            hover:border-orange-500
            transition
            "
          >
            <div className="text-4xl mb-3">
              📍
            </div>

            <h2 className="text-xl font-semibold">
              Addresses
            </h2>

            <p className="text-zinc-400 mt-2">
              Manage delivery addresses
            </p>
          </Link>

          {/* Favorites */}
          <Link
            href="/profile/favorites"
            className="
            bg-zinc-900
            p-6
            rounded-2xl
            border
            border-zinc-800
            hover:border-orange-500
            transition
            "
          >
            <div className="text-4xl mb-3">
              ❤️
            </div>

            <h2 className="text-xl font-semibold">
              Favorites
            </h2>

            <p className="text-zinc-400 mt-2">
              Saved dishes
            </p>
          </Link>

        </div>

        {/* Account Information */}
        <div
          className="
          mt-10
          bg-zinc-900
          rounded-2xl
          border
          border-zinc-800
          p-8
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="space-y-6">

            <div>
              <p className="text-zinc-400">
                Full Name
              </p>

              <p className="mt-1">
                {user.displayName}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Email
              </p>

              <p className="mt-1">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Account Type
              </p>

              <p className="mt-1">
                Google Account
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}