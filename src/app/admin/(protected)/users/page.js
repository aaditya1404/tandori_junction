"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllUsers } from "@/services/userService";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await getAllUsers();

      if (result.success) {
        setUsers(result.users);
      }
    };

    loadUsers();
  }, []);

  console.log(users)

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">
        Users Management
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-zinc-700">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-zinc-700 hover:bg-zinc-900 transition"
              >
                <td className="p-4">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.name || "User"}
                      width={50}
                      height={50}
                      className="rounded-full object-cover border border-zinc-700"
                      unoptimized
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center font-bold">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </td>

                <td className="p-4 font-medium">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
          >
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.name || "User"}
                  width={60}
                  height={60}
                  className="rounded-full object-cover border border-zinc-700"
                  unoptimized
                />
              ) : (
                <div className="w-15 h-15 rounded-full bg-zinc-700 flex items-center justify-center text-xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg truncate">
                  {user.name}
                </h2>

                <p className="text-sm text-zinc-400 break-all mt-1">
                  {user.email}
                </p>

                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center text-zinc-400 mt-10">
          No users found.
        </div>
      )}
    </div>
  );
}