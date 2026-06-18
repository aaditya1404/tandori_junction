"use client";

import { useEffect, useMemo, useState } from "react";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [foodTypeFilter, setFoodTypeFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

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

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const matchesFoodType =
        foodTypeFilter === "All" ||
        item.foodType === foodTypeFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        (availabilityFilter === "Available"
          ? item.isAvailable
          : !item.isAvailable);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFoodType &&
        matchesAvailability
      );
    });
  }, [
    menuItems,
    searchTerm,
    categoryFilter,
    foodTypeFilter,
    availabilityFilter,
  ]);
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Menu Management
        </h1>

        <div className="flex flex-wrap gap-4 mb-6">

          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 w-72"
          />

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          >
            <option value="All">All Categories</option>
            <option value="Tandoor-items">
              Tandoor Items
            </option>
            <option value="Pakoda/Snacks">
              Pakoda / Snacks
            </option>
            <option value="Chowmein">
              Chowmein
            </option>
            <option value="Rolls">
              Rolls
            </option>
            <option value="Thali">
              Thali
            </option>
            <option value="Biryani">
              Biryani
            </option>
            <option value="Roti/Bread">
              Roti / Bread
            </option>
            <option value="Rice">
              Rice
            </option>
            <option value="Masala/Curry Items">
              Masala / Curry Items
            </option>
            <option value="Dal-Items">
              Dal Items
            </option>
            <option value="Momos">
              Momos
            </option>
            <option value="Dosa">
              Dosa
            </option>
            <option value="Pizza">
              Pizza
            </option>
            <option value="Burger">
              Burger
            </option>
          </select>

          <select
            value={foodTypeFilter}
            onChange={(e) =>
              setFoodTypeFilter(e.target.value)
            }
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          >
            <option value="All">
              All Food Types
            </option>
            <option value="Veg">
              Veg
            </option>
            <option value="Non Veg">
              Non Veg
            </option>
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) =>
              setAvailabilityFilter(e.target.value)
            }
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2"
          >
            <option value="All">
              All Status
            </option>
            <option value="Available">
              Available
            </option>
            <option value="Unavailable">
              Unavailable
            </option>
          </select>

          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All");
              setFoodTypeFilter("All");
              setAvailabilityFilter("All");
            }}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            Clear Filters
          </button>

        </div>

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
            <th className="p-3">FoodType</th>
            <th className="p-3">Available</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredMenuItems.map((item) => (
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
              <td className="p-3">{item.foodType}</td>

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