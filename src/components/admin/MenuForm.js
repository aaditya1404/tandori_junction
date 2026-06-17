"use client";

//import { useState } from "react";
import {
  useState,
  useEffect,
} from "react";

export default function MenuForm({
  onSubmit,
  loading = false,
  initialData = null,
}){
  const [formData, setFormData] =
  useState({
    name:
      initialData?.name || "",
    description:
      initialData?.description || "",
    price:
      initialData?.price || "",
    discount:
      initialData?.discount || "",
    category:
      initialData?.category || "",
    isAvailable:
      initialData?.isAvailable ??
      true,
  });
  useEffect(() => {

  if (!initialData) return;

  setFormData({
    name:
      initialData.name || "",
    description:
      initialData.description || "",
    price:
      initialData.price || "",
    discount:
      initialData.discount || "",
    category:
      initialData.category || "",
    isAvailable:
      initialData.isAvailable,
  });

}, [initialData]);
  const [image, setImage] = useState(null);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      image,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 rounded-xl p-6 space-y-5"
    >
      {/* Name */}
      <div>
        <label className="block mb-2">Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-zinc-700"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2">Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 rounded bg-zinc-700"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block mb-2">Price</label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-zinc-700"
        />
      </div>

      {/* Discount */}
      <div>
        <label className="block mb-2">Discount (%)</label>

        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-700"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2">Category</label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-zinc-700"
        >
          <option value="">Select Category</option>

          <option value="Starter">Tandoor Items</option>

          <option value="Main Course">Pakoda / Snacks</option>

          <option value="Dessert">Chowmein</option>

          <option value="Beverage">Rolls</option>

          <option value="Veg">Thali</option>

          <option value="Non Veg">Biryani</option>
          <option value="Non Veg">Roti / Bread</option>
          <option value="Non Veg">Rice</option>
          <option value="Non Veg">Masala / Curry Items</option>
          <option value="Non Veg">Dal Items</option>
          <option value="Non Veg">Momos</option>
          <option value="Non Veg">Dosa</option>
          <option value="Non Veg">Pizza</option>
          <option value="Non Veg">Burger</option>
        </select>
      </div>

      {/* Image */}
      <div>
        <label className="block mb-2">
          Upload Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
        />

        <label>Available</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg"
      >
        {loading ? "Saving..." : "Save Menu Item"}
      </button>
    </form>
  );
}