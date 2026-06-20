"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAllUsers,
} from "@/services/userService";

export default function UsersPage() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers =
    async () => {

    const result =
      await getAllUsers();

    if (result.success) {

      setUsers(
        result.users
      );

    }

  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Users Management
      </h1>

      <table className="w-full border border-zinc-700">

        <thead>

          <tr>

            <th className="p-3">
              Photo
            </th>

            <th className="p-3">
              Name
            </th>

            <th className="p-3">
              Email
            </th>

            <th className="p-3">
              Role
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map(
            (user) => (

              <tr
                key={user.id}
                className="border-t border-zinc-700"
              >

                <td className="p-3">

                  <img
                    src={
                      user.photoURL
                    }
                    alt=""
                    className="
                    w-12
                    h-12
                    rounded-full
                    "
                  />

                </td>

                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.role}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}