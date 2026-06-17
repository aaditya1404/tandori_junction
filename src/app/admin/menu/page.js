"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { getAllMenuItems } from "@/services/menuService";
import { setMenuItems } from "@/redux/slices/menuSlice";

import { deleteMenuItem } from "@/redux/slices/menuSlice";
import { deleteMenuItemFromFirestore } from "@/services/menuService";
import {
  updateAvailability,
} from "@/services/menuService";

export default function MenuManagementPage() {
  const dispatch = useDispatch();

  const { menuItems } = useSelector((state) => state.menu);

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await getAllMenuItems();

      console.log(result);

      if (result.success) {
        dispatch(setMenuItems(result.data));
      }
    };

    fetchMenu();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmed) return;

    const result = await deleteMenuItemFromFirestore(id);

    if (!result.success) {
      alert(result.error);
      return;
    }

    dispatch(deleteMenuItem(id));

    alert("Menu item deleted successfully!");
  };
  const handleAvailability =
    async (
      id,
      currentStatus
    ) => {

      const result =
        await updateAvailability(
          id,
          !currentStatus
        );

      if (!result.success) {

        alert(result.error);
        return;

      }

      const updatedMenu =
        await getAllMenuItems();

      if (
        updatedMenu.success
      ) {

        dispatch(
          setMenuItems(
            updatedMenu.data
          )
        );

      }

    };
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Menu Management
        </h1>

        <Link
          href="/admin/menu/add"
          className="bg-orange-500 px-5 py-3 rounded-lg"
        >
          + Add Menu Item
        </Link>
      </div>

      <table className="w-full border border-zinc-700">
        <thead>
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Available</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {menuItems.map((item) => (
            <tr
              key={item.id}
              className="border-t border-zinc-700"
            >
              <td className="p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>

              <td className="p-3">{item.name}</td>

              <td className="p-3">{item.category}</td>

              <td className="p-3">₹{item.price}</td>

              <td className="p-3">{item.discount}%</td>

              <td className="p-3">
                {item.isAvailable ? "✅" : "❌"}
              </td>

              <td className="p-3 flex gap-2">

                <Link
                  href={`/admin/menu/edit/${item.id}`}
                  onClick={() =>
                    console.log(
                      "Edit clicked:",
                      item.id
                    )
                  }
                  className="
  bg-blue-500
  px-4
  py-2
  rounded-lg
  "
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleAvailability(
                      item.id,
                      item.isAvailable
                    )
                  }
                  className={
                    item.isAvailable
                      ? "bg-yellow-500 px-4 py-2 rounded-lg"
                      : "bg-green-500 px-4 py-2 rounded-lg"
                  }
                >
                  {
                    item.isAvailable
                      ? "Make Unavailable"
                      : "Make Available"
                  }
                </button>

                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="
    bg-red-500
    hover:bg-red-600
    px-4
    py-2
    rounded-lg
    "
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}