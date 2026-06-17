"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">
        Welcome, {user?.name || "Super Admin"}
      </h1>

      <p className="text-zinc-400 mb-8">
        Restaurant Management Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Total Users
          </h2>

          <p className="text-4xl font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Total Admins
          </h2>

          <p className="text-4xl font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-zinc-800 rounded-xl p-6">
          <h2 className="text-lg text-zinc-400">
            Menu Items
          </h2>

          <p className="text-4xl font-bold mt-3">
            0
          </p>
        </div>

        <div className="mt-10">
         <div className="mt-10 flex gap-4">

  <Link
    href="/admin/menu"
    className="
    inline-block
    bg-orange-500
    hover:bg-orange-600
    transition
    px-6
    py-3
    rounded-lg
    font-medium
    "
  >
    View All Menu
  </Link>

  <Link
    href="/admin/orders"
    className="
    inline-block
    bg-blue-500
    hover:bg-blue-600
    transition
    px-6
    py-3
    rounded-lg
    font-medium
    "
  >
    View Orders
  </Link>
  <Link
  href="/admin/users"
  className="
  inline-block
  bg-blue-500
  hover:bg-blue-600
  px-6
  py-3
  rounded-lg
  "
>
  View Users
</Link>

</div>
        </div>
      </div>
    </div>
  );
}